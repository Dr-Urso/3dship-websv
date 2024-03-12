from datetime import timedelta
from django.db.models import Max
from .models import Node, Edge
import datetime

def calculate_dates(start_date):

    # 获取所有节点，并初始化它们的入度计数
    nodes = Node.objects.all()
    in_degrees = {node.id: 0 for node in nodes}

    # 计算每个节点的入度（有多少边指向该节点）
    for edge in Edge.objects.all():
        in_degrees[edge.target_id] += 1

    # 初始化队列，包含所有入度为0的节点ID（即可以立即开始的任务）
    queue = [node_id for node_id, degree in in_degrees.items() if degree == 0]

    # 初始化节点的开始日期字典
    start_dates = {node.id: None for node in nodes}

    while queue:
        node_id = queue.pop(0)  # 从队列中获取一个节点ID
        node = Node.objects.get(id=node_id)  # 根据ID获取节点对象

        # 确定节点的开始日期
        if not start_dates[node_id]:  # 如果节点的开始日期尚未设置
            start_dates[node_id] = start_date
        node_start_date = start_dates[node_id]
        node_end_date = node_start_date + timedelta(days=node.days_required - 1) if node.days_required else node_start_date

        # 更新节点的开始和结束日期
        node.start_date = node_start_date
        node.end_date = node_end_date
        node.save()

        # 更新所有由当前节点出发的边的目标节点
        for edge in Edge.objects.filter(source_id=node_id):
            target_id = edge.target_id
            in_degrees[target_id] -= 1  # 减少目标节点的入度
            if in_degrees[target_id] == 0:
                queue.append(target_id)  # 如果目标节点的入度变为0，加入队列
                # 计算并更新目标节点的可能的最早开始日期
                potential_start_date = node_end_date + timedelta(days=1)
                if not start_dates[target_id] or start_dates[target_id] < potential_start_date:
                    start_dates[target_id] = potential_start_date

