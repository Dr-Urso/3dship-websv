from rest_framework import serializers

from parts.models import ShipParts


class PartsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipParts
        fields = ['partName', 'mesh']


class PartsExportSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipParts
        fields = '__all__'
