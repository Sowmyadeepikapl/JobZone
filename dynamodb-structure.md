# 🧩 DynamoDB Structure - JobZone

## 📌 Table Name

**`Jobsearches`**

Stores user inputs and job listings matched from the JSearch API.

---

## 🗃️ Key Schema

| Field       | Type | Key Type           |
| ----------- | ---- | ------------------ |
| `email`     | S    | Partition Key (PK) |
| `timestamp` | S    | Sort Key (SK)      |

* Composite key allows storing multiple job searches per user.

---

## 📝 Attributes Stored

| Attribute Name    | Type | Description                               |
| ----------------- | ---- | ----------------------------------------- |
| `email`           | S    | User's email address                      |
| `name`            | S    | User's full name                          |
| `keywords`        | S    | Keywords used in the job search           |
| `location`        | S    | User's preferred location                 |
| `timestamp`       | S    | Time of the search (UNIX epoch string)    |
| `job_title`       | S    | Title of the job found                    |
| `company_name`    | S    | Employer name                             |
| `job_location`    | S    | Location of the job                       |
| `apply_link`      | S    | URL to apply for the job                  |
| `job_description` | S    | Truncated job description (max 500 chars) |

---

## 🔍 Example Item

```json
{
  "email": { "S": "pirateking@onepiece.com" },
  "timestamp": { "S": "1751042104" },
  "name": { "S": "Luffy" },
  "keywords": { "S": "React" },
  "location": { "S": "Bangalore" },
  "job_title": { "S": "Frontend Developer" },
  "company_name": { "S": "SunnyTech Solutions" },
  "job_location": { "S": "India" },
  "apply_link": { "S": "https://joblink.com/apply/123" },
  "job_description": { "S": "Join our dynamic frontend team building modern web apps with React..." }
}
```

---

## 🛡️ Best Practices

* Use **provisioned throughput** or **on-demand mode** depending on traffic.
* Set up **CloudWatch alarms** for throttling or read/write errors.
* Index `timestamp` for sorting/searching recent queries.

---

Ready to move on to → `lambda-function.md`?
