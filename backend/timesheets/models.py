from django.db import models


class Employee(models.Model):
    employee_id = models.IntegerField(unique=True)

    def __str__(self):
        return f"Employee(employee_id={self.employee_id})"


class Report(models.Model):
    report_id = models.IntegerField(unique=True)

    def __str__(self):
        return f"Report(report_id={self.report_id})"


class JobGroup(models.Model):
    name = models.CharField(max_length=10, unique=True)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"JobGroup(group_name={self.group_name}, hourly_rate={self.hourly_rate})"


class TimeReport(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, to_field='employee_id')

    report = models.ForeignKey(Report, on_delete=models.CASCADE, to_field='report_id')
    date = models.DateField()
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2)
    job_group = models.ForeignKey(JobGroup, on_delete=models.CASCADE, to_field='name')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"TimeReport(employee_id={self.employee_id}, date={self.date}, hours_worked={self.hours_worked}, job_group={self.job_group})"


class PayrollReport(models.Model):
    report_date = models.DateField(auto_now_add=True)
    total_employees = models.IntegerField()
    total_hours = models.DecimalField(max_digits=10, decimal_places=2)
    total_pay = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f"PayrollReport(report_date={self.report_date}, total_employees={self.total_employees}, total_hours={self.total_hours}, total_pay={self.total_pay})"
