# 📧 Email Lambda Function – JobZone

This document explains how the "Send Email" functionality works when users click the email button in JobZone.

---

## 🔁 Overview

When a user opts to send matched job results via email, the frontend sends a POST request to a dedicated AWS Lambda function. This function formats the job data and sends a structured email to the user using an email service (like AWS SES or smtplib).

---

## 📬 Flow Diagram

```text
[Frontend Button Click]
        |
        v
  [API Gateway Endpoint: /emailzone]
        |
        v
 [Email Lambda (Python)]
        |
        v
[Email Sent to User via AWS SES / smtplib]

```
---

## 📥 Request Format

The frontend sends a POST request in this format:

```json
{
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "jobs": [
    {
      "title": "Frontend Developer",
      "company": "TechCorp",
      "location": "Remote",
      "url": "https://example.com/job123"
    },
    {
      "title": "Backend Engineer",
      "company": "CodeBase",
      "location": "Bangalore",
      "url": "https://example.com/job456"
    }
  ]
}
```
---

## 🧠 Lambda Responsibilities

- Extract user name, email, and job list from request body.
- Format job data into plain text or HTML (list of job cards).
- Use either:
  - `smtplib` with a verified sender email (Gmail, etc.), or
  - `boto3` with AWS SES to send email securely.
- Return a success/failure response to the frontend.

---

## 🔐 Environment Variables

| Variable Name   | Purpose                              |
|----------------|---------------------------------------|
| `SENDER_EMAIL`  | Verified sender email address         |
| `EMAIL_REGION`  | AWS region (if using AWS SES)         |
| `SMTP_PASS`     | App password for email (if needed)    |

> Make sure these are added securely in the Lambda's **Environment Variables** section.

---

## 🔍 Testing & Debugging

- Use **Postman** to send POST requests to the `/emailzone` API Gateway endpoint.
- Check Lambda logs in **CloudWatch** for errors or success messages.
- Verify email delivery and format from user’s inbox.

---

## ✅ Success Response

```json
{
  "statusCode": 200,
  "body": "Email sent successfully!"
}
