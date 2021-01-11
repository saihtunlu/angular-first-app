from django.db import models
from staff.models import Staff


class TrackableDateModel(models.Model):
    """Abstract model to Track the creation/updated date for a model."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Attendance(TrackableDateModel):
    staff = models.ForeignKey(Staff, related_name='attendances',
                              null=True, blank=True, on_delete=models.CASCADE)
