from django.db import models

# Create your models here.


class TrackableDateModel(models.Model):
    """Abstract model to Track the creation/updated date for a model."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Staff(TrackableDateModel):
    name = models.TextField(max_length=2000, null=True)
    slug = models.SlugField(max_length=2000, null=True,
                            unique=True, blank=False)
    email = models.EmailField(max_length=2000, null=True, unique=True)
    phone = models.TextField(max_length=2000, blank=True, null=True)
    image = models.ImageField(
        upload_to='staff/', default='/default.png', blank=True, null=True)

    def __unicode__(self):
        return self.name
