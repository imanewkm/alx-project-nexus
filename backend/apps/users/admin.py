from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Follow

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Crafter Information', {
            'fields': ('craft_specialization', 'location', 'website', 'is_verified_crafter', 'avatar', 'bio')
        }),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Crafter Information', {
            'fields': ('email', 'craft_specialization', 'location', 'website', 'is_verified_crafter')
        }),
    )
    list_display = ('username', 'email', 'craft_specialization', 'location', 'is_verified_crafter', 'is_staff')
    list_filter = BaseUserAdmin.list_filter + ('is_verified_crafter', 'craft_specialization')
    search_fields = ('username', 'email', 'craft_specialization', 'location')

@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ('follower', 'following', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('follower__username', 'following__username')
    raw_id_fields = ('follower', 'following')
    readonly_fields = ('created_at',)