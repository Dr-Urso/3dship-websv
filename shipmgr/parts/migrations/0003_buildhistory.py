# Generated by Django 5.0.2 on 2024-03-01 11:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parts', '0002_partgroups_alter_shipparts_issingle_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BuildHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('part', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parts.shipparts')),
            ],
        ),
    ]