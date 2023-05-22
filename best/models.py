from django.db import models

# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=100)
    url_yt = models.URLField(max_length=1000)
    points = models.IntegerField(default=0)
    html_link = models.CharField(max_length=1000)
