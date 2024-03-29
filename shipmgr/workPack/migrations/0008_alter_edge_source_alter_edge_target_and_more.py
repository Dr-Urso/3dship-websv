# Generated by Django 5.0.2 on 2024-03-13 11:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workPack', '0007_workpack_days'),
    ]

    operations = [
        migrations.AlterField(
            model_name='edge',
            name='source',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='source', to='workPack.node'),
        ),
        migrations.AlterField(
            model_name='edge',
            name='target',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='target', to='workPack.node'),
        ),
        migrations.AlterField(
            model_name='node',
            name='workPack',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='workPack.workpack'),
        ),
        migrations.AlterField(
            model_name='workpack',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='workPack.workpack'),
        ),
    ]
