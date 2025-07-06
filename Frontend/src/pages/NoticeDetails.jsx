import React from "react";
import "./NoticeDetails.css";

const NoticeDetails = ({ notice, onBack }) => {
  if (!notice) {
    return (
      <div className="notice-details-container">
        <div className="notice-details-header">
          <button className="back-btn" onClick={onBack}>
            ← Back to Notices
          </button>
        </div>
        <div className="notice-not-found">
          <h2>Notice not found</h2>
          <p>The requested notice could not be found.</p>
        </div>
      </div>
    );
  }

  // Generate full content based on notice type and title
  const getFullContent = (notice) => {
    switch (notice.id) {
      case 1:
        return {
          ...notice,
          fullContent: `
            <h3>Academic Calendar for Fall 2024</h3>
            <p>The Department of Computer Science and Engineering is pleased to announce the complete academic calendar for the Fall 2024 semester. This comprehensive schedule includes all important dates, deadlines, and events that students, faculty, and staff need to be aware of.</p>
            
            <h4>Key Dates:</h4>
            <ul>
              <li><strong>August 26, 2024:</strong> Fall semester begins</li>
              <li><strong>September 2, 2024:</strong> Last day to add courses</li>
              <li><strong>September 9, 2024:</strong> Last day to drop courses without penalty</li>
              <li><strong>October 14-15, 2024:</strong> Mid-semester break</li>
              <li><strong>November 4, 2024:</strong> Last day to withdraw from courses</li>
              <li><strong>December 9-13, 2024:</strong> Final examinations</li>
              <li><strong>December 16, 2024:</strong> Fall semester ends</li>
            </ul>
            
            <h4>Registration Information:</h4>
            <p>Course registration for Fall 2024 is now open. Students are advised to consult with their academic advisors before registering for courses. Please note that some courses have prerequisites that must be satisfied before enrollment.</p>
            
            <h4>Important Reminders:</h4>
            <ul>
              <li>All students must complete course registration before the deadline</li>
              <li>Late registration fees may apply after the specified dates</li>
              <li>Students are responsible for monitoring their academic progress</li>
              <li>Contact the department office for any registration issues</li>
            </ul>
            
            <h4>Contact Information:</h4>
            <p>For questions regarding the academic calendar or course registration, please contact the Department of Computer Science and Engineering at cse@university.edu or visit our office during business hours.</p>
          `,
          attachments: [
            { name: "Fall_2024_Academic_Calendar.pdf", size: "245 KB" },
            { name: "Course_Registration_Guide.pdf", size: "180 KB" },
          ],
        };
      case 2:
        return {
          ...notice,
          fullContent: `
            <h3>New Administrative Procedures</h3>
            <p>The Department of Computer Science and Engineering is implementing new administrative procedures to improve efficiency and better serve our students, faculty, and staff. These changes will take effect starting July 1, 2024.</p>
            
            <h4>Document Submission Process:</h4>
            <p>All document submissions must now be done through our new online portal. The following documents can be submitted electronically:</p>
            <ul>
              <li>Transcript requests</li>
              <li>Grade appeal forms</li>
              <li>Course waiver applications</li>
              <li>Research proposal submissions</li>
              <li>Internship approval forms</li>
            </ul>
            
            <h4>Approval Workflow:</h4>
            <p>The new approval workflow ensures faster processing times and better tracking of requests:</p>
            <ol>
              <li>Submit request through online portal</li>
              <li>Receive automatic confirmation email</li>
              <li>Department review (2-3 business days)</li>
              <li>Notification of approval/rejection</li>
              <li>Document processing and delivery</li>
            </ol>
            
            <h4>Office Hours and Contact:</h4>
            <p>The department office hours have been updated to better accommodate student needs:</p>
            <ul>
              <li><strong>Monday-Friday:</strong> 9:00 AM - 5:00 PM</li>
              <li><strong>Saturday:</strong> 10:00 AM - 2:00 PM</li>
              <li><strong>Emergency Contact:</strong> admin@cse.university.edu</li>
            </ul>
            
            <h4>Training Sessions:</h4>
            <p>Training sessions for the new procedures will be held on:</p>
            <ul>
              <li>July 8, 2024 - 2:00 PM (For Students)</li>
              <li>July 10, 2024 - 10:00 AM (For Faculty)</li>
              <li>July 12, 2024 - 3:00 PM (For Staff)</li>
            </ul>
          `,
          attachments: [
            { name: "New_Administrative_Procedures.pdf", size: "320 KB" },
            { name: "Online_Portal_User_Guide.pdf", size: "150 KB" },
          ],
        };
      case 3:
        return {
          ...notice,
          fullContent: `
            <h3>Department-Wide Announcements</h3>
            <p>The Department of Computer Science and Engineering is excited to share several important announcements and updates with our community. These updates reflect our ongoing commitment to excellence in education and research.</p>
            
            <h4>Upcoming Events:</h4>
            <ul>
              <li><strong>July 15, 2024:</strong> Annual CSE Research Symposium</li>
              <li><strong>July 22, 2024:</strong> Industry-Academia Collaboration Workshop</li>
              <li><strong>August 5, 2024:</strong> Welcome Reception for New Students</li>
              <li><strong>August 12, 2024:</strong> Faculty Research Presentation Series</li>
            </ul>
            
            <h4>New Faculty Appointments:</h4>
            <p>We are pleased to welcome new faculty members to our department:</p>
            <ul>
              <li>Dr. Sarah Johnson - Assistant Professor, Machine Learning</li>
              <li>Dr. Michael Chen - Associate Professor, Cybersecurity</li>
              <li>Dr. Emily Rodriguez - Assistant Professor, Software Engineering</li>
            </ul>
            
            <h4>Student Achievements:</h4>
            <p>Congratulations to our students for their outstanding achievements:</p>
            <ul>
              <li>Best Paper Award at International Conference on AI</li>
              <li>First Place in National Programming Competition</li>
              <li>Outstanding Research Award for Graduate Students</li>
            </ul>
            
            <h4>Research Updates:</h4>
            <p>Our department has secured several new research grants:</p>
            <ul>
              <li>$2M NSF grant for AI in Healthcare research</li>
              <li>$1.5M industry partnership for IoT security</li>
              <li>$800K grant for educational technology development</li>
            </ul>
            
            <h4>Community Engagement:</h4>
            <p>We encourage all members of our community to participate in upcoming events and activities. Your involvement helps make our department a vibrant and collaborative environment.</p>
          `,
          attachments: [
            { name: "Research_Symposium_Program.pdf", size: "280 KB" },
            { name: "New_Faculty_Profiles.pdf", size: "195 KB" },
          ],
        };
      default:
        return {
          ...notice,
          fullContent: `
            <h3>${notice.title}</h3>
            <p>${
              notice.description ||
              "Full details for this notice are not available at this time."
            }</p>
            
            <h4>Additional Information:</h4>
            <p>For more information about this notice, please contact the Department of Computer Science and Engineering.</p>
            
            <h4>Contact Details:</h4>
            <ul>
              <li>Email: cse@university.edu</li>
              <li>Phone: (555) 123-4567</li>
              <li>Office: Room 101, CSE Building</li>
            </ul>
          `,
          attachments: [],
        };
    }
  };

  const fullNotice = getFullContent(notice);

  const handleDownload = (attachment) => {
    // Simulate download
    alert(`Downloading ${attachment.name}...`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: fullNotice.title,
        text: fullNotice.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Notice link copied to clipboard!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="notice-details-container">
      <div className="notice-details-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Notices
        </button>
        <div className="notice-actions">
          <button className="action-btn" onClick={handleShare}>
            📤 Share
          </button>
          <button className="action-btn" onClick={handlePrint}>
            🖨️ Print
          </button>
        </div>
      </div>

      <div className="notice-details-content">
        <div className="notice-header">
          <h1 className="notice-title">{fullNotice.title}</h1>
          <div className="notice-meta">
            <span className={`notice-type ${fullNotice.type.toLowerCase()}`}>
              {fullNotice.type}
            </span>
            <span className="notice-date">
              {new Date(fullNotice.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {fullNotice.status && (
              <span className={`notice-status ${fullNotice.status}`}>
                {fullNotice.status === "active" ? "🟢 Active" : "🔴 Archived"}
              </span>
            )}
          </div>
        </div>

        <div className="notice-body">
          <div
            className="notice-content"
            dangerouslySetInnerHTML={{ __html: fullNotice.fullContent }}
          />
        </div>

        {fullNotice.attachments && fullNotice.attachments.length > 0 && (
          <div className="notice-attachments">
            <h3>Attachments</h3>
            <div className="attachments-list">
              {fullNotice.attachments.map((attachment, index) => (
                <div key={index} className="attachment-item">
                  <div className="attachment-info">
                    <span className="attachment-icon">📎</span>
                    <div className="attachment-details">
                      <span className="attachment-name">{attachment.name}</span>
                      <span className="attachment-size">{attachment.size}</span>
                    </div>
                  </div>
                  <button
                    className="download-btn"
                    onClick={() => handleDownload(attachment)}
                  >
                    ⬇️ Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="notice-footer">
          <div className="notice-info">
            <p>
              <strong>Department:</strong> Computer Science and Engineering
            </p>
            <p>
              <strong>Contact:</strong> cse@university.edu | (555) 123-4567
            </p>
          </div>
          <div className="notice-actions-mobile">
            <button className="action-btn mobile" onClick={handleShare}>
              📤 Share
            </button>
            <button className="action-btn mobile" onClick={handlePrint}>
              🖨️ Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetails;
