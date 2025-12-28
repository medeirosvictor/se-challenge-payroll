from datetime import timedelta


def get_biweekly_periods(emp_reports):
    if not emp_reports:
        return []

    records = list(emp_reports.values('date', 'hours_worked'))
    for r in records:
        if isinstance(r['date'], str):
            r['date'] = datetime.strptime(r['date'], "%Y-%m-%d").date()

    start_date = records[0]['date']
    for r in records:
        r['biweek'] = ((r['date'] - start_date).days // 14)

    periods = []
    grouped = {}
    for r in records:
        biweek = r['biweek']
        grouped.setdefault(biweek, []).append(r)

    for biweek, group in grouped.items():
        period_start = start_date + timedelta(days=biweek * 14)
        period_end = period_start + timedelta(days=13)
        total_hours = sum(g['hours_worked'] for g in group)
        periods.append({
            'start_date': period_start,
            'end_date': period_end,
            'hours_worked': total_hours
        })
    return periods
