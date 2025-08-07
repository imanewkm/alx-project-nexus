import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from django.db.models import Prefetch
from .models import Post, CraftCategory
from apps.users.schema import UserType
from apps.interactions.models import Comment

class CraftCategoryType(DjangoObjectType):
    class Meta:
        model = CraftCategory
        fields = ('id', 'name', 'description', 'created_at')

class PostType(DjangoObjectType):
    likes_count = graphene.Int()
    comments_count = graphene.Int()
    shares_count = graphene.Int()
    is_liked = graphene.Boolean()
    comments = graphene.List('apps.interactions.schema.CommentType')
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'author', 'craft_category', 'materials_used', 
                 'time_to_complete', 'price_range', 'is_for_sale', 'is_featured', 
                 'created_at', 'updated_at')
        interfaces = (relay.Node,)
        filter_fields = {
            'content': ['icontains'],
            'title': ['icontains'],
            'author': ['exact'],
            'craft_category': ['exact'],
            'is_for_sale': ['exact'],
            'is_featured': ['exact'],
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
    craft_categories = graphene.List(CraftCategoryType)
    posts_by_category = graphene.List(PostType, category_id=graphene.ID())
    featured_posts = graphene.List(PostType)
    
    def resolve_post(self, info, id):
        try:
            return Post.objects.select_related('author', 'craft_category').prefetch_related('likes', 'comments', 'shares').get(pk=id)
        except Post.DoesNotExist:
            return None
    
    def resolve_posts(self, info, **kwargs):
        return Post.objects.select_related('author', 'craft_category').prefetch_related('likes', 'comments', 'shares').all()
    
    def resolve_craft_categories(self, info):
        return CraftCategory.objects.all()
    
    def resolve_posts_by_category(self, info, category_id):
        return Post.objects.filter(craft_category_id=category_id).select_related('author', 'craft_category').prefetch_related('likes', 'comments', 'shares')
    
    def resolve_featured_posts(self, info):
        return Post.objects.filter(is_featured=True).select_related('author', 'craft_category').prefetch_related('likes', 'comments', 'shares')

class CreatePost(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)
        craft_category_id = graphene.ID()
        materials_used = graphene.String()
        time_to_complete = graphene.String()
        price_range = graphene.String()
        is_for_sale = graphene.Boolean()
    
    success = graphene.Boolean()
    post = graphene.Field(PostType)
    errors = graphene.List(graphene.String)
    
    def mutate(self, info, title, content, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            return CreatePost(success=False, post=None, errors=["Authentication required"])
        
        try:
            # Validate input
            if len(title.strip()) < 3:
                return CreatePost(success=False, post=None, errors=["Title must be at least 3 characters"])
            
            if len(content.strip()) < 10:
                return CreatePost(success=False, post=None, errors=["Content must be at least 10 characters"])
            
            # Create post with validation
            post = Post.objects.create(
                author=user,
                title=title.strip(),
                content=content.strip(),
                craft_category_id=kwargs.get('craft_category_id'),
                materials_used=kwargs.get('materials_used', ''),
                time_to_complete=kwargs.get('time_to_complete', ''),
                price_range=kwargs.get('price_range', ''),
                is_for_sale=kwargs.get('is_for_sale', False)
            )
            
            return CreatePost(success=True, post=post, errors=None)
            
        except Exception as e:
            return CreatePost(success=False, post=None, errors=[str(e)])

class UpdatePost(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        content = graphene.String()
        craft_category_id = graphene.ID()
        materials_used = graphene.String()
        time_to_complete = graphene.String()
        price_range = graphene.String()
        is_for_sale = graphene.Boolean()
    
    success = graphene.Boolean()
    post = graphene.Field(PostType)
    errors = graphene.List(graphene.String)
    
    def mutate(self, info, id, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            return UpdatePost(success=False, post=None, errors=["Authentication required"])
        
        try:
            post = Post.objects.get(pk=id, author=user)
            
            # Update fields if provided
            if 'title' in kwargs and kwargs['title']:
                if len(kwargs['title'].strip()) < 3:
                    return UpdatePost(success=False, post=None, errors=["Title must be at least 3 characters"])
                post.title = kwargs['title'].strip()
            
            if 'content' in kwargs and kwargs['content']:
                if len(kwargs['content'].strip()) < 10:
                    return UpdatePost(success=False, post=None, errors=["Content must be at least 10 characters"])
                post.content = kwargs['content'].strip()
            
            if 'craft_category_id' in kwargs:
                post.craft_category_id = kwargs['craft_category_id']
            
            if 'materials_used' in kwargs:
                post.materials_used = kwargs['materials_used']
            
            if 'time_to_complete' in kwargs:
                post.time_to_complete = kwargs['time_to_complete']
            
            if 'price_range' in kwargs:
                post.price_range = kwargs['price_range']
            
            if 'is_for_sale' in kwargs:
                post.is_for_sale = kwargs['is_for_sale']
            
            post.save()
            return UpdatePost(success=True, post=post, errors=None)
            
        except Post.DoesNotExist:
            return UpdatePost(success=False, post=None, errors=["Post not found or permission denied"])
        except Exception as e:
            return UpdatePost(success=False, post=None, errors=[str(e)])

class DeletePost(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
    
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    
    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated:
            return DeletePost(success=False, errors=["Authentication required"])
        
        try:
            post = Post.objects.get(pk=id, author=user)
            post.delete()
            return DeletePost(success=True, errors=None)
            
        except Post.DoesNotExist:
            return DeletePost(success=False, errors=["Post not found or permission denied"])
        except Exception as e:
            return DeletePost(success=False, errors=[str(e)])

class PostMutation(graphene.ObjectType):
    create_post = CreatePost.Field()
    update_post = UpdatePost.Field()
    delete_post = DeletePost.Field()