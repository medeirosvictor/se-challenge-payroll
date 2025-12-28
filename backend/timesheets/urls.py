from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('payroll/add-time-report/', views.add_time_report, name='add_time_report'),
    path('payroll/generate-payroll-report/', views.generate_payroll_report, name='generate_payroll_report'),
]
