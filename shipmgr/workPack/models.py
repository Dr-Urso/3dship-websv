from django.db import models
from mptt.models import MPTTModel

from parts.models import ShipParts


# Create your models here.
class workPack(MPTTModel):
    name = models.CharField(max_length=20, null=True, blank=True)
    memo = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=20, null=True, blank=True)
    parent = models.ForeignKey('workPack', on_delete=models.PROTECT, null=True, blank=True, related_name='children')
    parts = models.ManyToManyField(to=ShipParts, blank=True)


class Node(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    days_required = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    workPack = models.ForeignKey('workPack', on_delete=models.PROTECT, null=True)



class Edge(models.Model):
    source = models.ForeignKey('Node', on_delete=models.PROTECT, null=True, related_name='source')
    target = models.ForeignKey('Node', on_delete=models.PROTECT, null=True, related_name='target')
