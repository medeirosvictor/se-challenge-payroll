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
    logger.debug(f"Request FILES: {request}")
    if 'file' not in request.FILES:
        return Response({'status': 'error', 'message': 'No file provided'}, status=400)
    service_add_time_report(request.FILES['file'])
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
