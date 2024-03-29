# Generated by Django 5.0.3 on 2024-03-12 08:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parts', '0007_remove_shipparts_workpack'),
        ('workPack', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='workpack',
            name='level',
            field=models.PositiveIntegerField(default=0, editable=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workpack',
            name='lft',
            field=models.PositiveIntegerField(default=0, editable=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workpack',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='children', to='workPack.workpack'),
        ),
        migrations.AddField(
            model_name='workpack',
            name='parts',
            field=models.ManyToManyField(blank=True, null=True, to='parts.shipparts'),
        ),
        migrations.AddField(
            model_name='workpack',
            name='rght',
            field=models.PositiveIntegerField(default=0, editable=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='workpack',
            name='status',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='workpack',
            name='tree_id',
            field=models.PositiveIntegerField(db_index=True, default=0, editable=False),
            preserve_default=False,
        ),
    ]
