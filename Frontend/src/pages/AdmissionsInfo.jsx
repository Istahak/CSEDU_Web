import React, { useState } from "react";
import "./AdmissionsInfo.css";

const AdmissionsInfo = ({ onBack }) => {
  const [selectedSection, setSelectedSection] = useState("application-process");

  const applicationProcess = [
    {
      step: 1,
      title: "Create an account on our application portal",
      description: "Visit our online application portal and create your account"
    },
    {
      step: 2,
      title: "Complete the online application form",
      description: "Fill out all required information accurately"
    },
    {
      step: 3,
      title: "Submit all required documents including transcripts and letters of recommendation",
      description: "Upload all necessary supporting documents"
    },
    {
      step: 4,
      title: "Pay the application fee",
      description: "Complete the payment process to submit your application"
    }
  ];

  const deadlines = [
    {
      program: "Undergraduate Programs",
      applicationDeadline: "March 31",
      decisionDate: "May 15"
    },
    {
      program: "Graduate Programs",
      applicationDeadline: "February 15",
      decisionDate: "April 1"
    },
    {
      program: "International Programs",
      applicationDeadline: "January 31",
      decisionDate: "March 15"
    },
    {
      program: "Spring Entry",
      applicationDeadline: "October 15",
      decisionDate: "November 30"
    }
  ];

  const requirements = [
    "Minimum cumulative GPA of 3.0 (on a 4.0 scale) or equivalent for the past program",
    "Official transcripts from all previously attended institutions",
    "Two letters of recommendation from academic or professional references",
    "Statement of Purpose",
    "English proficiency test scores (IELTS/TOEFL) for international students"
  ];

  const faqs = [
    {
      question: "What are the admission requirements?",
      answer: "Admission requirements vary by program level (e.g., Undergraduate, Master's, PhD, etc.). Please contact our admissions office for specific program requirements."
    },
    {
      question: "Can I apply for financial aid?",
      answer: "Yes, we offer various financial aid options including scholarships, grants, and student loans."
    },
    {
      question: "What are the language requirements?",
      answer: "International students must demonstrate English proficiency through IELTS or TOEFL scores."
    },
    {
      question: "When does the application process open?",
      answer: "Application periods vary by program. Please check our admissions calendar for specific dates."
    }
  ];

  const renderApplicationProcess = () => (
    <div className="content-section">
      <h2 className="section-title">Application Process</h2>
      <p className="section-description">
        Follow these steps to complete your application:
      </p>
      <div className="faqs-list">
        {applicationProcess.map((step) => (
          <div key={step.step} className="faq-item">
            <h4 className="faq-question">
              <span style={{
                background: '#4a90e2',
                color: 'white',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {step.step}
              </span>
              {step.title}
            </h4>
            <p className="faq-answer">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDeadlines = () => (
    <div className="content-section">
      <h2 className="section-title">Deadlines</h2>
      <p className="section-description" style={{ minHeight: '28px' }}></p>
      <div className="faqs-list">
        {deadlines.map((deadline, index) => (
          <div key={index} className="faq-item">
            <h4 className="faq-question">{deadline.program}</h4>
            <p className="faq-answer">
              <strong>Application Deadline:</strong> {deadline.applicationDeadline}<br/>
              <strong>Decision Date:</strong> {deadline.decisionDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRequirements = () => (
    <div className="content-section">
      <h2 className="section-title">Requirements</h2>
      <p className="section-description">
        Please ensure that you meet the following requirements for the next program:
      </p>
      <div className="faqs-list">
        {requirements.map((requirement, index) => (
          <div key={index} className="faq-item">
            <h4 className="faq-question">
              <span style={{
                color: '#28a745',
                marginRight: '0.5rem',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                ✓
              </span>
              Requirement {index + 1}
            </h4>
            <p className="faq-answer">{requirement}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFAQs = () => (
    <div className="content-section">
      <h2 className="section-title">FAQs</h2>
      <p className="section-description" style={{ minHeight: '28px' }}></p>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h4 className="faq-question">{faq.question}</h4>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="admissions-page">
      <div className="page-header">
        <button onClick={onBack} className="back-button">
          ← Back to Program Details
        </button>
      </div>

      <div className="admissions-header">
        <h1 className="page-title">Admissions Information</h1>
        <p className="page-subtitle">
          Everything you need to know about applying to our programs
        </p>
      </div>

      <div className="admissions-navigation">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${selectedSection === 'application-process' ? 'active' : ''}`}
            onClick={() => setSelectedSection('application-process')}
          >
            <span className="nav-icon">📝</span>
            Application Process
          </button>
          <button 
            className={`nav-tab ${selectedSection === 'deadlines' ? 'active' : ''}`}
            onClick={() => setSelectedSection('deadlines')}
          >
            <span className="nav-icon">📅</span>
            Deadlines
          </button>
          <button 
            className={`nav-tab ${selectedSection === 'requirements' ? 'active' : ''}`}
            onClick={() => setSelectedSection('requirements')}
          >
            <span className="nav-icon">📋</span>
            Requirements
          </button>
          <button 
            className={`nav-tab ${selectedSection === 'faqs' ? 'active' : ''}`}
            onClick={() => setSelectedSection('faqs')}
          >
            <span className="nav-icon">❓</span>
            FAQs
          </button>
        </div>
      </div>

      <div className="admissions-content">
        {selectedSection === 'application-process' && renderApplicationProcess()}
        {selectedSection === 'deadlines' && renderDeadlines()}
        {selectedSection === 'requirements' && renderRequirements()}
        {selectedSection === 'faqs' && renderFAQs()}
      </div>
    </div>
  );
};

export default AdmissionsInfo;
