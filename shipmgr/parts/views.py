from django.forms import model_to_dict
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView

from parts.serializers import PartsSerializer, PartsExportSerializer
from . import models


# Create your views here.


class ImportGltfView(APIView):
    def get(self, request):
        request_data = json.loads(request.body)
        nodes = request_data['nodes']
        for node in nodes:
            d = {'partName': node['name'], 'mesh': node['mesh']}

            serializer = PartsSerializer(data=d)
            if serializer.is_valid():
                serializer.save()
        return Response(nodes)

class GetPartPropView(APIView):
    def get(self,request):
        name = request.GET['name']
        print(name)
        node = models.ShipParts.objects.get(partName__contains=name)
        resp = {"name": node.partName, "progress": node.progress, "status": node.status}
        return Response(resp)

class PartsView(APIView):

    def put(self, request):

        mesh = request.data.get('Mesh')
        progress = request.data.get('Progress')
        Status = request.data.get('Status')
        node = models.ShipParts.objects.get(mesh=mesh)
        if progress:
            node.progress = progress
        if Status:
            node.status = Status
        node.save()
        return Response(status=status.HTTP_200_OK)

    def get(self, request):

        nodes = models.ShipParts.objects.all()
        data = {"nogroup": []}
        groups = models.PartGroups.objects.all()
        for node in nodes:
            single = 1
            for group in groups:
                if node.partName.find(group.startWith) != -1:
                    if group.name not in data:
                        data[group.name] = []

                    data[group.name].append(model_to_dict(node))
                    single = 0
                    break
            if single == 1:
                data['nogroup'].append(model_to_dict(node))
        resp = []
        for (key, value) in data.items():
            resp.append({"group": key, "data": value})
        return Response(resp)


class UnityView(APIView):
    def get(self, request):
        nodes = models.ShipParts.objects.all()
        data = []

        for node in nodes:
            prop = {
                "status": node.status,
                "progress": node.progress
            }
            single = {
                "name": node.partName,
                "index": node.statusIndex,
                "prop": json.dumps(prop),
                "single": node.isSingle,
                "mesh" : node.mesh,
            }
            data.append(single)

        resp = {"Status": 1, "Data": data}
        rresp = {"data":resp}
        return Response(rresp)

class BigDataView(APIView):
    def get(self, request):
        count = models.ShipParts.objects.count()
        countFinished = models.ShipParts.objects.filter(progress=100).count()
        countGroup = models.PartGroups.objects.count()


        res = {"count": count, "countFinished":countFinished, "countGroup":countGroup}
        return Response(res)