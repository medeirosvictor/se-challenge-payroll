import logging
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import service_add_time_report, service_generate_payroll_report

logger = logging.getLogger(__name__)

# Create your views here.


@api_view(['GET'])
def health_check(request):
    return Response({
        'status': 'ok',
        'message': 'Backend is running!'
    })


@api_view(['POST'])
def add_time_report(request):
    logger.info("Time report upload initiated")
    if 'file' not in request.FILES:
        return Response({'status': 'error', 'message': 'No file provided'}, status=400)
    file = request.FILES['file']
    if not file.name.lower().endswith('.csv'):
        return Response({'status': 'error', 'message': 'Invalid file format. Please upload a CSV file.'}, status=400)
    logger.info(f"Uploading time report file: {file.name}")
    service_add_time_report(file)
    return Response({
        'status': 'success',
        'message': 'Time report added successfully!'
    })


@api_view(['GET'])
def generate_payroll_report(request):
    logger.info("Payroll report retrieval or generation initiated")
    payroll_report = service_generate_payroll_report()
    logger.info(f"Payroll report generated with: {payroll_report}")
    return Response({
        "payrollReport": payroll_report
    })
