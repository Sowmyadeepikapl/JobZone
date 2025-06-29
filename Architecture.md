# 🧱 Architecture Overview - JobZone

## 📌 Goal

Provide a clear architectural understanding of the JobZone platform — how different services and components interact across the stack.

---

## 🧭 High-Level Architecture Diagram

```text
          +--------------------+
          |   React Frontend  |
          | (JobZone.jsx)     |
          +--------+----------+
                   |
                   | HTTP POST (user input)
                   v
          +--------+----------+
          |   API Gateway     |
          |   (CORS enabled)  |
          +--------+----------+
                   |
                   | Lambda Invocation
                   v
          +--------+----------+
          |   AWS Lambda       |
          | (lambda_function.py)
          +--------+----------+
                   |
        +----------+-----------+
        |                      |
        v                      v
 JSearch API         DynamoDB (Jobsearches)
 (Job Listings)      (User & job match data)
```

---

## ⚙️ Component Breakdown

### 1. **React Frontend**

* Collects user inputs (name, email, skills, location)
* Sends POST request to API Gateway
* Renders job listings returned from the backend
* Has neon-themed dark mode toggle

### 2. **Amazon API Gateway**

* Acts as the entry point to your backend
* Connects HTTP requests to Lambda function
* Stage created: `/jobzone`
* CORS configured to allow `http://localhost:3000`

### 3. **AWS Lambda**

* Backend logic written in Python
* Parses input, formats query to JSearch API
* Stores response data in DynamoDB
* Handles CORS headers dynamically

### 4. **JSearch API (via RapidAPI)**

* External job search API
* Requires API key (stored as environment variable)
* Responds with job listings based on keyword + location

### 5. **DynamoDB**

* NoSQL table used to store:

  * User info (name, email)
  * Search details (keywords, location, timestamp)
  * Job listing results (title, company, etc.)

---

## 🔐 Security & Access

* **IAM Role** grants Lambda access to DynamoDB
* **Environment Variables** securely store secrets like API keys
* CORS properly enforced on both API Gateway & Lambda

---

## 🛠️ DevOps Additions (Planned)

* Add CI/CD with AWS CodePipeline
* Monitor Lambda logs using CloudWatch
* Terraform/IaC setup for auto-deployment

---

## ✅ Summary

The JobZone architecture follows a clean serverless pattern with clear boundaries:
Frontend → API Gateway → Lambda → (External API + DB). This setup allows fast, cost-efficient, and scalable deployment using modern DevOps practices.

---

Want to move on to the next doc? → `api-gateway-config.md`?
