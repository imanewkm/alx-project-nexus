from django.db import models
from django.conf import settings

class CraftCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Craft Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name

class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=200, help_text="Title of your craft")
    content = models.TextField(max_length=2000, help_text="Description of your craft")
    
    # Craft-specific fields
    craft_category = models.ForeignKey(CraftCategory, on_delete=models.SET_NULL, null=True, blank=True)
    materials_used = models.CharField(max_length=300, blank=True, help_text="Materials used in this craft")
    time_to_complete = models.CharField(max_length=50, blank=True, help_text="e.g., 2 hours, 1 week")
    price_range = models.CharField(max_length=50, blank=True, help_text="e.g., $20-$50")
    is_for_sale = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['author', '-created_at']),
            models.Index(fields=['craft_category', '-created_at']),
            models.Index(fields=['is_featured', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.title} by {self.author.username}"
    
    @property
    def likes_count(self):
        return self.likes.count()
    
    @property
    def comments_count(self):
        return self.comments.count()
    
    @property
    def shares_count(self):
        return self.shares.count()
    
    def is_liked_by(self, user):
        if not user.is_authenticated:
            return False
        return self.likes.filter(user=user).exists()

class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='posts/')
    alt_text = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'created_at']
        indexes = [
            models.Index(fields=['post', 'order']),
        ]
    
    def __str__(self):
        return f"Image {self.order} for {self.post.title}"