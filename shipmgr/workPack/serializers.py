from rest_framework import serializers

from workPack import models


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Node
        fields = '__all__'

class EdgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Edge
        fields = '__all__'