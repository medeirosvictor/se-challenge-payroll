# Wave Payroll Challenge Application

**Author:** Victor Medeiros

---

## Tech Stack

- **Frontend:** ReactJS + TypeScript
- **Backend:** Python + Django
- **Database:** SQLite

---

## How to Run the App

```bash
docker-compose up --build -d
```

The application will be available at: [http://localhost:5173/](http://localhost:5173/)

---

## Documentation & Project Notes

### Challenge Requirements

**How did you test that your implementation was correct?**

- Created multiple CSVs (valid and invalid) to test application constraints.
- I used type hints and TypeScript for a safer system.
- Also Tested the bundle on other PCs to ensure smooth delivery.
- Added loggers to the application for easier debugging

**If this application was destined for a production environment, what would you add or change?**

- I would probably add robust testing scenarios and integrate them into the build process.
- Redesign the UI lol
- Enhance payroll generation management (see below).

**What compromises did you have to make due to time constraints?**

- Did not implement automated testing builds.
- Did not add advanced route and DB caching (caching payroll reports and only regenerating when needed). Currently, each payroll generation runs the calculation from scratch.

---
