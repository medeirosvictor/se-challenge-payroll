# Wave - Payroll Challenge Application

### Victor Medeiros

Frontend: ReactJS + TypeScript
Backend: Python + Django
BD: SQLite

#### How to run the app

`docker-compose up --build -d`

The current docker configuration will make the application ready to be seen in action at
[http://localhost:5173/](http://localhost:5173/)

#### Documentation and Notes on the project

##### Requested through challenge

_How did you test that your implementation was correct?_

- I created multiple CSVs that followed or not followed the requirements and tested the "rails" on the application to check that my constraints were being respected
- Did some type-hints and used typescript to have a more safe system overall
- I used the bundle on other pcs to make sure delivery of the assignment would be smoother
  _If this application was destined for a production environment, what would you add or change?_
- Add robust testing scenarios and add to the build, since payroll information is very sensitive the app would need to handle that
  data very robustly.
- I would change the design lol
- Better management of the payroll generation (also mentioned on the response below)
  _What compromises did you have to make as a result of the time constraints of this challenge?_
- Did not apply testing builds
- Better route and db caching (for example a more comprehensive payroll generation report -> saving and getting a diff to know if its needed to run the pipeline again to save resources) as of now everytime this is clicked the generation function does it from "scratch"
