# 🌐 API Gateway Configuration - JobZone

## 🧩 Purpose

This document outlines how the API Gateway is configured to route requests from the React frontend to the Lambda backend, ensuring proper CORS setup and reliable invocation.

---

## 🔧 API Gateway Setup

### ✅ Step 1: Create an HTTP API

* Go to the **Amazon API Gateway** console.
* Choose **HTTP API** (not REST API).
* Click **Build** and proceed.

### ✅ Step 2: Define the Route

* Route: `POST /jobzone_resume_matcher`
* Integration: Connect this route to your deployed **Lambda function**.

### ✅ Step 3: Enable CORS

* Allowed origins: `http://localhost:3000`
* Allowed methods: `OPTIONS, POST`
* Allowed headers: `Content-Type`
* Max age: `3600`

### ✅ Step 4: Deploy

* Create a **Stage**: `jobzone`
* Deploy the route to this stage
* You'll receive an **Invoke URL** like:

  ```
  ```

[https://6qcq1ntgkf.execute-api.us-east-1.amazonaws.com/jobzone](https://6qcq1ntgkf.execute-api.us-east-1.amazonaws.com/jobzone)

````

---

## 📥 Lambda Integration
- Ensure your Lambda function handler supports CORS:
  ```python
  headers = {
      "Access-Control-Allow-Origin": origin or "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST"
  }
````

* The origin is extracted from `event.get('headers', {}).get('origin', '*')`
* This ensures that both **preflight OPTIONS** and **POST** requests are handled properly.

---

## 🛡️ Troubleshooting

* **Missing `Access-Control-Allow-Origin`** → Double-check both Lambda and API Gateway CORS settings
* **404 error** → Make sure the route and deployed stage match the frontend URL
* **Duplicate CORS header** → Ensure you're not setting CORS headers both in Lambda and via API Gateway if you're using CORS from integration

---

## 🧪 Example Test Event for Lambda

```json
{
  "version": "2.0",
  "routeKey": "POST /jobzone_resume_matcher",
  "rawPath": "/jobzone_resume_matcher",
  "headers": {
    "origin": "http://localhost:3000",
    "content-type": "application/json"
  },
  "body": "{\"name\":\"Luffy\",\"email\":\"pirateking@onepiece.com\",\"keywords\":\"React\",\"location\":\"Bangalore\"}"
}
```

---

## ✅ Summary

API Gateway acts as the bridge between the frontend and backend. With properly configured routes, integrations, and CORS, it ensures a smooth serverless experience for JobZone users.

Next up? → `lambda-function.md`?
