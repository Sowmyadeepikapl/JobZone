# 🧪 Lambda Setup - JobZone

This document outlines the step-by-step configuration of the AWS Lambda function for the **JobZone** project.

---

## 🪄 Overview

The Lambda function is the backend processor responsible for:

* Receiving user input via POST requests
* Querying the JSearch API for matching jobs
* Storing the job matches and user data into DynamoDB
* Returning matched jobs to the frontend

---

## 📦 Lambda Function File: `lambda_function.py`

Key responsibilities:

* Parses event body (JSON)
* Handles CORS headers correctly
* Formats API call for job search
* Iterates over results and stores them in DynamoDB

---

## 🛠️ Setup Steps

### 1. **Create a Lambda Function**

* Runtime: **Python 3.11**
* Permissions: Attach policy with DynamoDB full access or custom minimal permissions

### 2. **Upload Code**

* Either upload a ZIP file with all required packages (like `PyMuPDF`, if used), or use inline editor if it's a small script without external dependencies.
* Make sure environment variable `JSEARCH_API_KEY` is set in **Configuration > Environment Variables**.

### 3. **Add CORS Support**

Use dynamic headers to match frontend origin:

```python
headers = {
  "Access-Control-Allow-Origin": event.get("headers", {}).get("origin", "*"),
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST"
}
```

### 4. **Test Events (Sample)**

```json
{
  "name": "Sowmya",
  "email": "pirateking@onepiece.com",
  "keywords": "React",
  "location": "Bangalore"
}
```

---

## 🔌 Integration with API Gateway

* **Created an HTTP API**
* Added a route: `POST /jobzone_resume_matcher`
* Integrated it with the Lambda function
* Enabled **CORS** via the console (allowed origin: `http://localhost:3000` or `*` during development)
* Deployed to a stage named `jobzone`

### ✅ Invoke URL Example:

```
https://6qcq1ntgkf.execute-api.us-east-1.amazonaws.com/jobzone/jobzone_resume_matcher
```

---

## ✅ Result

* Jobs fetched successfully from JSearch API
* Stored in DynamoDB table `Jobsearches`
* Returned to frontend cleanly with proper headers

> Lambda logs in CloudWatch confirm correct flow: Event received → Parsed → Jobs found → Success ✅
