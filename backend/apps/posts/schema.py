import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from django.db.models import Prefetch
from .models import Post
from apps.users.schema import UserType
from apps.interactions.models import Comment

class PostType(DjangoObjectType):
    likes_count = graphene.Int()
    comments_count = graphene.Int()
    shares_count = graphene.Int()
    is_liked = graphene.Boolean()
    comments = graphene.List('apps.interactions.schema.CommentType')
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'author', 'craft_category', 'materials_used', 'time_to_complete', 'price_range', 'is_for_sale', 'is_featured', 'created_at', 'updated_at')
        interfaces = (relay.Node,)
        filter_fields = {
            'content': ['icontains'],
            'title': ['icontains'],
            'author': ['exact'],
            'craft_category': ['exact'],
            'created_at': ['gte', 'lte'],
        }
    
    def resolve_likes_count(self, info):
        return self.likes_count
    
    def resolve_comments_count(self, info):
        return self.comments_count
    
    def resolve_shares_count(self, info):
        return self.shares_count
    
    def resolve_is_liked(self, info):
        user = info.context.user
        return self.is_liked_by(user)
    
    def resolve_comments(self, info):
        return self.comments.select_related('author').all()

class PostConnection(relay.Connection):
    class Meta:
        node = PostType

class PostQuery(graphene.ObjectType):
    post = graphene.Field(PostType, id=graphene.ID())
    posts = DjangoFilterConnectionField(PostType)
    
    def resolve_post(self, info, id):
        try:
            return Post.objects.select_related('author').prefetch_related('likes', 'comments', 'shares').get(pk=id)
        except Post.DoesNotExist:
            return None
    
    def resolve_posts(self, info, **kwargs):
        return Post.objects.select_related('author').prefetch_related('likes', 'comments', 'shares').all()

class CreatePost(graphene.Mutation):
    class Arguments:
        content = graphene.String(required=True)
        image = graphene.String()  # Base64 encoded image or URL
    
    success = graphene.Boolean()
    post = graphene.Field(PostType)
    
    def mutate(self, info, content, image=None):
        user = info.context.user
        if not user.is_authenticated:
            return CreatePost(success=False, post=None)
        
        post = Post.objects.create(
            author=user,
            content=content,
            image=image
        )
        
        return CreatePost(success=True, post=post)

class PostMutation(graphene.ObjectType):
    create_post = CreatePost.Field()