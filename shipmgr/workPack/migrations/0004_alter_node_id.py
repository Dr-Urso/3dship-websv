# Generated by Django 5.0.2 on 2024-03-12 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workPack', '0003_alter_workpack_parts_node_edge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
