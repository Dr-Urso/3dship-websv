from django.db import models

# Create your models here.


class ShipParts(models.Model):
    mesh = models.IntegerField()
    partName = models.CharField(max_length=50)
    statusIndex = models.IntegerField(default=0)
    status = models.CharField(max_length=100)
    progress = models.IntegerField(default=0)
    isSingle = models.BooleanField(default=False)

class PartGroups(models.Model):
    startWith = models.CharField(max_length=20)
    name = models.CharField(max_length=20)
