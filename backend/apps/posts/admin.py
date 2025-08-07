from django.contrib import admin
from .models import Post, CraftCategory

@admin.register(CraftCategory)
class CraftCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name', 'description')
    ordering = ('name',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'craft_category', 'is_for_sale', 'is_featured', 'created_at')
    list_filter = ('craft_category', 'is_for_sale', 'is_featured', 'created_at')
    search_fields = ('title', 'content', 'author__username', 'materials_used')
    raw_id_fields = ('author',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'content', 'author')
        }),
        ('Craft Details', {
            'fields': ('craft_category', 'materials_used', 'time_to_complete', 'price_range')
        }),
        ('Status', {
            'fields': ('is_for_sale', 'is_featured')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def content_preview(self, obj):
        return obj.content[:50] + '...' if len(obj.content) > 50 else obj.content
    content_preview.short_description = 'Content'