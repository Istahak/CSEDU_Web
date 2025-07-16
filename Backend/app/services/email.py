"""
Email service for sending notifications
"""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Optional
from app.core.config import settings


class EmailService:
    """Email service for sending emails"""
    
    def __init__(self):
        self.smtp_server = getattr(settings, 'SMTP_HOST', None)
        self.smtp_port = getattr(settings, 'SMTP_PORT', 587)
        self.smtp_user = getattr(settings, 'SMTP_USER', None)
        self.smtp_password = getattr(settings, 'SMTP_PASSWORD', None)
        self.use_tls = getattr(settings, 'SMTP_TLS', True)
    
    def send_email(
        self,
        to_emails: List[str],
        subject: str,
        body: str,
        is_html: bool = False
    ) -> bool:
        """
        Send email to recipients
        """
        if not self.smtp_server or not self.smtp_user:
            print("Email configuration not set up")
            return False
        
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.smtp_user
            msg['To'] = ', '.join(to_emails)
            msg['Subject'] = subject
            
            # Add body
            if is_html:
                msg.attach(MIMEText(body, 'html'))
            else:
                msg.attach(MIMEText(body, 'plain'))
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                if self.use_tls:
                    server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            return True
            
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
    
    def send_welcome_email(self, email: str, name: str) -> bool:
        """
        Send welcome email to new user
        """
        subject = f"Welcome to {settings.PROJECT_NAME}!"
        body = f"""
        Hello {name},
        
        Welcome to {settings.PROJECT_NAME}! We're excited to have you on board.
        
        Best regards,
        The {settings.PROJECT_NAME} Team
        """
        
        return self.send_email([email], subject, body)
    
    def send_password_reset_email(self, email: str, reset_token: str) -> bool:
        """
        Send password reset email
        """
        subject = "Password Reset Request"
        body = f"""
        You have requested a password reset.
        
        Use this token to reset your password: {reset_token}
        
        If you did not request this, please ignore this email.
        
        Best regards,
        The {settings.PROJECT_NAME} Team
        """
        
        return self.send_email([email], subject, body)


# Global email service instance
email_service = EmailService()
