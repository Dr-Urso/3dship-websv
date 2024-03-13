from django.contrib import admin



# Register your models here.

from .models import workPack, Node, Edge
from mptt.admin import MPTTModelAdmin

admin.site.register(workPack, MPTTModelAdmin)
admin.site.register(Node)
admin.site.register(Edge)


