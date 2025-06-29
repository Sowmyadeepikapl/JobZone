import React, { useState } from 'react';
import './JobZone.css';

function JobZone() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    keywords: '',
    location: '',
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('https://6qcq1ntgkf.execute-api.us-east-1.amazonaws.com/jobzone/jobzone_resume_matcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const raw = await response.json();
      const result = typeof raw.body === 'string' ? JSON.parse(raw.body) : raw;

      setJobs(result.jobs || []);
      setSuccessMessage(result.message || 'Jobs fetched successfully!');
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setSuccessMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('https://ohys38oou8.execute-api.us-east-1.amazonaws.com/emailzone/jobzone_send_email', {
         method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        keywords: formData.keywords,
        location: formData.location,
        jobs: jobs // <-- pass the matched jobs here 
        })
      });

      const raw = await response.json();
      const result = typeof raw.body === 'string' ? JSON.parse(raw.body) : raw;

      if (response.ok) {
        setSuccessMessage(result.message || 'Email sent successfully!');
      } else {
        console.error("Failed to send email:", result);
        setSuccessMessage('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSuccessMessage('Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <div className="top-bar">
        <h2 className="title-glow">Job Zone</h2>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <p className="tagline">Find jobs that suit you best ✨</p>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <input name="keywords" placeholder="Keywords (e.g. React, Python)" value={formData.keywords} onChange={handleChange} required />
        <input name="location" placeholder="Preferred Location" value={formData.location} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Matching...' : 'Match Jobs'}</button>
      </form>

      {successMessage && <p className="success-msg">{successMessage}</p>}

      {jobs.length > 0 && (
        <>
          <ul className="job-list">
            {jobs.map((job, index) => (
              <li key={index} className="job-card">
                <h4>{job.job_title}</h4>
                <p>{job.employer_name} — {job.job_location}</p>
                <p>{job.job_description.slice(0, 150)}...</p>
                <a href={job.job_google_link} target="_blank" rel="noopener noreferrer">Apply Now</a>
              </li>
            ))}
          </ul>

          <button className="send-email-btn" onClick={handleSendEmail} disabled={loading}>
            {loading ? 'Sending...' : '✉️ Send Matching Jobs to Email'}
          </button>
        </>
      )}
    </div>
  );
}

export default JobZone;

