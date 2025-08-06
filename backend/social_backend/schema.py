import graphene
from apps.users.schema import UserQuery
from apps.posts.schema import PostQuery, PostMutation
from apps.interactions.schema import InteractionMutation

class Query(UserQuery, PostQuery, graphene.ObjectType):
    pass

class Mutation(PostMutation, InteractionMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)