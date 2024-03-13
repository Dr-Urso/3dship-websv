import pandas
from django.db.models.functions import datetime
from django.forms import model_to_dict
from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from datetime import timedelta

from django.core import serializers
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from .logics import calculate_dates, build_tree
from .models import Node, Edge, workPack
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
        return JsonResponse({'nodes': json_data1, 'edges': json_data2})


class WorkpackView(APIView):
    @csrf_exempt
    def get(self, request):
        root_nodes = workPack.objects.root_nodes()
        trees = build_tree(root_nodes[0])
        return JsonResponse(trees)

    @csrf_exempt
    def post(self, request):
        workPack.objects.all().delete()
        Edge.objects.all().delete()
        Node.objects.all().delete()
        excel_file = request.FILES['file']
        if not excel_file:
            return Response({'error': '请上传Excel文件'}, status=status.HTTP_400_BAD_REQUEST)
        packs = pandas.read_excel(excel_file, sheet_name='工作包').sort_values(by=['层数'], ascending=True)
        print(packs)
        root = workPack.objects.create(name='项目整体')
        root.save()
        for _, pk in packs.iterrows():
            pack = pk.to_dict()
            workpack = workPack.objects.create(name=pack['工作包名称'], days=pack['所需天数'])
            if pandas.isnull(pack['母包']):
                workpack.parent = workPack.objects.get(name='项目整体')
                workpack.save()
            if not (pandas.isnull(pack['母包'])):
                try:
                    parent = workPack.objects.get(name=pack['母包'])
                    workpack.parent = parent
                    workpack.save()
                except workPack.DoesNotExist:
                    print(f"未找到父包：{pack['母包']}")
        nodes = pandas.read_excel(excel_file, sheet_name='顶点')
        for _, node in nodes.iterrows():
            ndm = Node.objects.create(name = node['名称'], days_required=node["所需天数（前面的求和）"])
            ndm.workPack = workPack.objects.get(name=node['绑定工作包名称'])
            ndm.save()
        edges = pandas.read_excel(excel_file, sheet_name='边')
        for _, edge in edges.iterrows():
            egm = Edge.objects.create()
            egm.source = Node.objects.get(name=edge['起点'])
            egm.target = Node.objects.get(name=edge['终点'])
            egm.save()
        return JsonResponse({'status': 'ok'})
