# Generated by Django 4.0.3 on 2022-04-24 18:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0001_initial'),
        ('trips', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='accepted',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='trip',
            name='client',
            field=models.ForeignKey(blank=True, db_column='client_id', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='client_id', to='clients.client'),
        ),
        migrations.AlterField(
            model_name='trip',
            name='completed',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='trip',
            name='description',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='trip',
            name='dropofflat',
            field=models.DecimalField(blank=True, decimal_places=15, max_digits=30, null=True),
        ),
        migrations.AlterField(
            model_name='trip',
            name='dropofflng',
            field=models.DecimalField(blank=True, decimal_places=15, max_digits=30, null=True),
        ),
        migrations.AlterField(
            model_name='trip',
            name='pickuplat',
            field=models.DecimalField(blank=True, decimal_places=15, max_digits=30, null=True),
        ),
        migrations.AlterField(
            model_name='trip',
            name='pickuplng',
            field=models.DecimalField(blank=True, decimal_places=15, max_digits=30, null=True),
        ),
    ]
