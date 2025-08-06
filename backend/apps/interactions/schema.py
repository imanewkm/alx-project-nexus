import graphene
from graphene_django import DjangoObjectType
from django.db import IntegrityError
from .models import Like, Comment, Share
from apps.posts.models import Post

class CommentType(DjangoObjectType):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'post', 'created_at', 'updated_at')

class LikeType(DjangoObjectType):
    class Meta:
        model = Like
        fields = ('id', 'user', 'post', 'created_at')

class ShareType(DjangoObjectType):
    class Meta:
        model = Share
        fields = ('id', 'user', 'post', 'created_at')

class LikePost(graphene.Mutation):
    class Arguments:
        post_id = graphene.ID(required=True)
    
    success = graphene.Boolean()
    post = graphene.Field('apps.posts.schema.PostType')
    
    def mutate(self, info, post_id):
        user = info.context.user
        if not user.is_authenticated:
            return LikePost(success=False, post=None)
        
        try:
            post = Post.objects.get(pk=post_id)
            like, created = Like.objects.get_or_create(user=user, post=post)
            
            if not created:
                # Already liked, so unlike
                like.delete()
            
            return LikePost(success=True, post=post)
        except Post.DoesNotExist:
            return LikePost(success=False, post=None)

class UnlikePost(graphene.Mutation):
    class Arguments:
        post_id = graphene.ID(required=True)
    
    success = graphene.Boolean()
    post = graphene.Field('apps.posts.schema.PostType')
    
    def mutate(self, info, post_id):
        user = info.context.user
        if not user.is_authenticated:
            return UnlikePost(success=False, post=None)
        
        try:
            post = Post.objects.get(pk=post_id)
            Like.objects.filter(user=user, post=post).delete()
            return UnlikePost(success=True, post=post)
        except Post.DoesNotExist:
            return UnlikePost(success=False, post=None)

class CreateComment(graphene.Mutation):
    class Arguments:
        post_id = graphene.ID(required=True)
        content = graphene.String(required=True)
    
    success = graphene.Boolean()
    comment = graphene.Field(CommentType)
    
    def mutate(self, info, post_id, content):
        user = info.context.user
        if not user.is_authenticated:
            return CreateComment(success=False, comment=None)
        
        try:
            post = Post.objects.get(pk=post_id)
            comment = Comment.objects.create(
                author=user,
                post=post,
                content=content
            )
            return CreateComment(success=True, comment=comment)
        except Post.DoesNotExist:
            return CreateComment(success=False, comment=None)

class SharePost(graphene.Mutation):
    class Arguments:
        post_id = graphene.ID(required=True)
    
    success = graphene.Boolean()
    post = graphene.Field('apps.posts.schema.PostType')
    
    def mutate(self, info, post_id):
        user = info.context.user
        if not user.is_authenticated:
            return SharePost(success=False, post=None)
        
        try:
            post = Post.objects.get(pk=post_id)
            share, created = Share.objects.get_or_create(user=user, post=post)
            return SharePost(success=True, post=post)
        except Post.DoesNotExist:
            return SharePost(success=False, post=None)
        except IntegrityError:
            # Already shared
            return SharePost(success=True, post=post)

class InteractionMutation(graphene.ObjectType):
    like_post = LikePost.Field()
    unlike_post = UnlikePost.Field()
    create_comment = CreateComment.Field()
    share_post = SharePost.Field()