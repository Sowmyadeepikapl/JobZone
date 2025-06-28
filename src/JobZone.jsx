import React, { useState, useEffect } from 'react';
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
  const [success, setSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://6qcq1ntgkf.execute-api.us-east-1.amazonaws.com/jobzone/jobzone_resume_matcher',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const raw = await response.json();
      const result = typeof raw.body === 'string' ? JSON.parse(raw.body) : raw;
      setJobs(result.jobs || []);
      setSuccess(true);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setErrorMessage('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`form-container ${darkMode ? 'dark' : 'light'}`}>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle theme"
      >
        {darkMode ? '🌞' : '🌙'}
      </button>

      <h2 className="title-glow">Job Zone</h2>
      <p className="tagline">Find jobs that suit you best ✨</p>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="keywords"
          placeholder="Keywords (e.g. React, Python)"
          value={formData.keywords}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Preferred Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Match Jobs</button>
      </form>

      {loading && <p>Matching...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {success && jobs.length > 0 && (
        <ul className="job-list">
          {jobs.map((job, index) => (
            <li key={index} className="job-card">
              <h4>{job.job_title}</h4>
              <p>
                <strong>{job.company_name}</strong> — {job.job_location}
              </p>
              <p>{job.job_description}</p>
              <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </li>
          ))}
        </ul>
      )}

      {success && jobs.length === 0 && <p>No matching jobs found.</p>}
    </div>
  );
}

export default JobZone;


