import React, { useState } from "react";
import "./AdmissionsInfo.css";

const programAdmissionsData = {
  undergraduate: {
    applicationProcess: [
      { step: 1, title: "Create an account on our application portal", description: "Visit our online application portal and create your account" },
      { step: 2, title: "Complete the online application form", description: "Fill out all required information accurately" },
      { step: 3, title: "Submit all required documents including transcripts and letters of recommendation", description: "Upload all necessary supporting documents" },
      { step: 4, title: "Pay the application fee", description: "Complete the payment process to submit your application" }
    ],
    deadlines: [
      { program: "Undergraduate Programs", applicationDeadline: "March 31", decisionDate: "May 15" }
    ],
    requirements: [
      "HSC/A-Level with Mathematics and Physics",
      "Minimum GPA of 4.0 (out of 5.0)",
      "Admission Test Score",
      "Official transcripts from all previously attended institutions",
      "Two letters of recommendation from academic or professional references",
      "English proficiency test scores (IELTS/TOEFL) for international students"
    ],
    faqs: [
      { question: "What are the admission requirements for undergraduate programs?", answer: "Admission requirements for undergraduate programs include HSC/A-Level with Mathematics and Physics, minimum GPA of 4.0, and admission test score." },
      { question: "Can I apply for financial aid?", answer: "Yes, we offer various financial aid options including scholarships, grants, and student loans for undergraduate students." },
      { question: "What are the language requirements?", answer: "International students must demonstrate English proficiency through IELTS or TOEFL scores." },
      { question: "When does the application process open for undergraduate programs?", answer: "Applications for undergraduate programs typically open in January and close on March 31." }
    ]
  },
  graduate: {
    applicationProcess: [
      { step: 1, title: "Register on the graduate portal", description: "Create your graduate application account online" },
      { step: 2, title: "Submit academic transcripts and CV", description: "Upload all required documents and your CV" },
      { step: 3, title: "Provide research proposal (if required)", description: "Submit your research proposal for research-based programs" },
      { step: 4, title: "Pay the application fee", description: "Complete the payment process to submit your application" }
    ],
    deadlines: [
      { program: "Graduate Programs", applicationDeadline: "February 15", decisionDate: "April 1" }
    ],
    requirements: [
      "Bachelor's degree or equivalent from an accredited institution",
      "Minimum GPA of 3.2 (on a 4.0 scale)",
      "Academic transcripts and CV",
      "Two academic/professional references",
      "Research proposal (for research-based programs)",
      "English proficiency test scores (IELTS/TOEFL) for international students"
    ],
    faqs: [
      { question: "Is a research proposal required for graduate programs?", answer: "A research proposal is required for research-based graduate programs like MSc by Research and PhD." },
      { question: "Can I apply with a 3-year degree?", answer: "Some graduate programs may accept 3-year degrees. Please check specific program requirements or contact admissions." },
      { question: "Are interviews required for graduate programs?", answer: "Some graduate programs may require interviews as part of the selection process." },
      { question: "What is the minimum GPA for graduate programs?", answer: "The minimum GPA for graduate programs is 3.2 (on a 4.0 scale) or equivalent." }
    ]
  },
  international: {
    applicationProcess: [
      { step: 1, title: "Create an international applicant account", description: "Register on our international admissions portal" },
      { step: 2, title: "Submit transcripts and English proficiency scores", description: "Upload all required documents and test scores" },
      { step: 3, title: "Provide proof of financial support", description: "Submit bank statements or affidavits as required" },
      { step: 4, title: "Pay the application fee", description: "Complete the payment process to submit your application" }
    ],
    deadlines: [
      { program: "International Programs", applicationDeadline: "January 31", decisionDate: "March 15" }
    ],
    requirements: [
      "Equivalent of a high school diploma or bachelor's degree (as required)",
      "Official transcripts (translated if not in English)",
      "English proficiency test scores (IELTS/TOEFL)",
      "Proof of financial support",
      "Copy of passport",
      "Visa documentation (if applicable)"
    ],
    faqs: [
      { question: "Do I need a visa to study?", answer: "Yes, international students require a student visa. We provide support for the visa application process." },
      { question: "Are scholarships available for international students?", answer: "Some scholarships are available for international students. Check our website for details and eligibility." },
      { question: "What documents must be translated?", answer: "All transcripts and certificates not in English must be officially translated by certified translators." },
      { question: "Can I work while studying as an international student?", answer: "International students may work part-time as per visa regulations and local laws." }
    ]
  }
};

const AdmissionsInfo = ({ onBack, programId = "undergraduate" }) => {
  const [selectedSection, setSelectedSection] = useState("application-process");

  // Get the appropriate data based on programId
  const admissionsData = programAdmissionsData[programId] || programAdmissionsData["undergraduate"];

  const renderApplicationProcess = () => (
    <div className="content-section">
      <h2 className="section-title">Application Process</h2>
      <p className="section-description">
        Follow these steps to complete your application:
      </p>
      <div className="faqs-list">
        {admissionsData.applicationProcess.map((step) => (
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
        {admissionsData.deadlines.map((deadline, index) => (
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
        Please ensure that you meet the following requirements for this program:
      </p>
      <div className="faqs-list">
        {admissionsData.requirements.map((requirement, index) => (
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
        {admissionsData.faqs.map((faq, index) => (
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
      {/* <div className="page-header">
        <button onClick={onBack} className="back-button">
          ← Back to Program Details
        </button>
      </div> */}

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
