# Generated by Django 4.0.3 on 2022-04-18 11:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('client_type', '0004_rename_driver_client_type_type'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=250)),
                ('last_name', models.CharField(max_length=250)),
                ('email', models.CharField(max_length=250)),
                ('address', models.CharField(max_length=250)),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='client_type.client_type')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
