from django.db.models.functions import datetime
from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from datetime import timedelta

from rest_framework.views import APIView

from .models import Node, Edge
from django.db.models import Max
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
class UpdateSchedule(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            start_date = data.get('start_date')
    
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
            self.calculate_dates(start_date)

            return JsonResponse({'message': 'Project schedule updated successfully'})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    def calculate_dates(self, start_date):
        # 基于拓扑排序的方法计算每个节点的日期
        nodes = Node.objects.annotate(max_end_date=Max('source__target__end_date')).order_by('max_end_date')

        for node in nodes:
            # 如果节点有依赖节点，则它的开始日期是依赖节点结束日期的下一天
            if node.source.exists():
                latest_end_date = node.source.aggregate(Max('target__end_date'))['target__end_date__max']
                if latest_end_date:
                    node.start_date = latest_end_date + timedelta(days=1)
                else:
                    node.start_date = start_date
            else:
                node.start_date = start_date

            if node.days_required is not None:
                node.end_date = node.start_date + timedelta(days=node.days_required - 1)
            node.save()
