from django.db.models.functions import datetime
from django.forms import model_to_dict
from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from datetime import timedelta

from django.core import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .logics import calculate_dates
from .models import Node, Edge
from django.db.models import Max
from django.views.decorators.csrf import csrf_exempt
import json

from .serializers import NodeSerializer, EdgeSerializer


class UpdateScheduleView(APIView):
    @csrf_exempt
    def post(self, request):

        start_date = request.POST.get('start_date')

        if not start_date:
            return JsonResponse({'error': 'Start date is required'}, status=400)

        start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()

        # 初始化节点的开始日期和结束日期
        nodes = Node.objects.all()
        for node in nodes:
            node.start_date = None
            node.end_date = None
            node.save()

        # 计算每个节点的最早开始日期和结束日期
        calculate_dates(start_date)

        return JsonResponse({'message': 'Project schedule updated successfully'})

class GetNodesView(APIView):
    @csrf_exempt
    def get(self, request):
        nodes = Node.objects.all()
        edges = Edge.objects.all()

        json_data1 = NodeSerializer(nodes, many=True).data
        json_data2 = EdgeSerializer(edges, many=True).data
        return JsonResponse({'nodes':json_data1, 'edges':json_data2 })