from datetime import timedelta, datetime
import re


def get_biweekly_periods(emp_reports):
    """
    Given a selection of TimeReport objects for a single employee,
    returns a list of biweekly periods with total hours worked in each period.
    """
    if not emp_reports:
        return []

    records = list(emp_reports.values('date', 'hours_worked'))
    start_date = records[0]['date']

    # Basically get the very first date of work and use it like
    # start_date divided by 14, depending on the date will return a number, say 1
    # this means that from the start date to that date it will be in the second biweek period
    # if it is 3, then it is in the 4th biweek period, and so on.
    for r in records:
        r['biweek'] = ((r['date'] - start_date).days // 14)


    # loop will create a group of biweekly periods based on the biweek number from above
    periods = []
    grouped = {}
    for r in records:
        biweek = r['biweek']
        grouped.setdefault(biweek, []).append(r)

    # then, for each of those groups create the start and end date based on the biweek number
    # and sum the hours worked in that period
    for biweek, group in grouped.items():
        # get two week window (the dates) of earch biweek period
        period_start = start_date + timedelta(days=biweek * 14)
        period_end = period_start + timedelta(days=13)
        total_hours = sum(g['hours_worked'] for g in group)
        periods.append({
            'start_date': period_start,
            'end_date': period_end,
            'hours_worked': total_hours
        })
    return periods


def get_time_report_id(file_name: str) -> int:
    """
    Extracts the report ID from the given filename.
    Expected filename format: "time-report-<report_id>.csv"
    """
    match = re.search(r'time-report-(\d+)', file_name)
    if match:
        return int(match.group(1))
    else:
        raise ValueError("Filename does not match expected format 'time-report-<report_id>.csv'")
