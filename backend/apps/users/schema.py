import graphene
from graphene_django import DjangoObjectType
from .models import User

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'avatar', 'bio', 'created_at')

class UserQuery(graphene.ObjectType):
    user = graphene.Field(UserType, id=graphene.ID())
    users = graphene.List(UserType)
    me = graphene.Field(UserType)
    
    def resolve_user(self, info, id):
        try:
            return User.objects.get(pk=id)
        except User.DoesNotExist:
            return None
    
    def resolve_users(self, info):
        return User.objects.all()
    
    def resolve_me(self, info):
        user = info.context.user
        if user.is_authenticated:
            return user
        return None