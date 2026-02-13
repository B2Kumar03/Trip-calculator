import nodemailer from "nodemailer";

// Create transporter (using Gmail as default, can be configured via env)
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER || "your-email@gmail.com",
      pass: process.env.EMAIL_PASS || "your-app-password",
    },
  });
};

// Send trip invitation email
export const sendTripInvitation = async (toEmail, tripName, tripDates, inviterName, tripId) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@tripexpense.com",
      to: toEmail,
      subject: `You've been invited to join ${tripName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #14D38E; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 24px; background: #14D38E; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Trip Invitation</h1>
            </div>
            <div class="content">
              <p>Hi there!</p>
              <p><strong>${inviterName}</strong> has invited you to join the trip:</p>
              <h2>${tripName}</h2>
              <p><strong>Dates:</strong> ${tripDates}</p>
              <p>Join the trip to start tracking and splitting expenses together!</p>
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/trip/${tripId}" class="button">View Trip</a>
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                If you didn't expect this invitation, you can safely ignore this email.
              </p>
            </div>
            <div class="footer">
              <p>© 2024 TripExpense. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        You've been invited to join ${tripName}
        
        Dates: ${tripDates}
        
        ${inviterName} has invited you to join this trip. Visit the app to start tracking expenses together!
        
        ${process.env.FRONTEND_URL || "http://localhost:5173"}/trip/${tripId}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${toEmail}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: error.message };
  }
};

// Send welcome email
export const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@tripexpense.com",
      to: toEmail,
      subject: "Welcome to TripExpense!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #14D38E; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; padding: 12px 24px; background: #14D38E; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to TripExpense!</h1>
            </div>
            <div class="content">
              <p>Hi ${userName},</p>
              <p>Welcome to TripExpense! Your account has been created successfully.</p>
              <p>Start managing your trip expenses with ease:</p>
              <ul>
                <li>Create trips and invite friends</li>
                <li>Track expenses and split bills</li>
                <li>Calculate settlements automatically</li>
                <li>Chat with your travel group</li>
              </ul>
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}" class="button">Get Started</a>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${toEmail}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    return { success: false, error: error.message };
  }
};
