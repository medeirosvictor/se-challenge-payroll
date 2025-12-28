from django.db.models import Sum
from timesheets.models import (TimeReport, PayrollReport, Employee, Report, JobGroup)
from django.core.files.uploadedfile import UploadedFile
from django.db import transaction
from .utils import get_biweekly_periods
import pandas as pd
from datetime import datetime
import re
from io import StringIO
import logging
logger = logging.getLogger(__name__)


def service_add_time_report(csvFile: UploadedFile) -> list[TimeReport]:
    """
    Adds a new time report to the database.
    """
    if not csvFile.name.endswith('.csv'):
        raise ValueError("Invalid file format. Please upload a CSV file.")

    filename = csvFile.name  # e.g., "time-report-42.csv"
    logger.debug(f"Processing CSV file: {filename}")
    match = re.search(r'time-report-(\d+)', filename)
    if match:
        report_id = int(match.group(1))
        if Report.objects.filter(report_id=report_id).exists():
            raise ValueError(f"Report with ID {report_id} already exists.")
    else:
        raise ValueError("Invalid file name format. Expected 'time-report-<number>.csv'.")
    csv_data = csvFile.read().decode('utf-8')
    df = pd.read_csv(StringIO(csv_data))

    time_reports = []
    with transaction.atomic():
        # Strip info of row
        for _, row in df.iterrows():
            employee_id = int(row['employee id'])
            date = datetime.strptime(row['date'], "%d/%m/%Y").date()
            hours_worked = float(row['hours worked'])
            job_group = row['job group'].strip()

            time_report = TimeReport.objects.create(
                report=Report.objects.get_or_create(report_id=report_id)[0],
                employee=Employee.objects.get_or_create(employee_id=employee_id)[0],
                date=date,
                hours_worked=hours_worked,
                job_group=JobGroup.objects.get(name=job_group)
            )
            time_reports.append(time_report)

    return time_reports


def service_generate_payroll_report() -> PayrollReport:
    """
    Generates a payroll report based on existing time reports.
    """

    job_group_rates = JobGroup.objects.all().values_list('name', 'hourly_rate')
    logger.debug(f"job_group_rates: {job_group_rates}")
    data = {"employeeReports": []}

    for employee in TimeReport.objects.values('employee_id').distinct():
        # For each employee, agreggate biweekly hours and pay in a dictionary
        amount_paid = 0
        emp_reports = TimeReport.objects.filter(employee_id=employee['employee_id']).order_by('date')

        emp_reports = TimeReport.objects.filter(employee_id=employee['employee_id']).order_by('date')
        biweekly_periods = get_biweekly_periods(emp_reports)

        for period in biweekly_periods:
            period_start = period['start_date']
            period_end = period['end_date']
            hours_worked = period['hours_worked']
            # Get job group for this period (assuming single job group per employee)
            job_group = emp_reports.filter(date__range=(period_start, period_end)).first().job_group
            rate = dict(job_group_rates).get(job_group.name, 0)
            logger.debug(f"rate: {rate}")
            pay_for_period = hours_worked * rate
            amount_paid += pay_for_period

            data['employeeReports'].append({
                'employeeId': employee['employee_id'],
                "payPeriod": {
                    "startDate": period_start.strftime("%Y-%m-%d"),
                    "endDate": period_end.strftime("%Y-%m-%d"),
                },
                "amountPaid": amount_paid,
            })
    return data
