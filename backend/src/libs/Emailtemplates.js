export const verificationEmailTemplate = (userName, verificationCode) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding:30px 10px;">
        
        <table width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; padding:25px;">
          
          <tr>
            <td align="center">
              <h2 style="color:#333; margin-bottom:5px;">Verify Your Email</h2>
              <p style="color:#555; font-size:14px; margin-top:0;">
                Hello <strong>${userName || "User"}</strong>,<br/>
                Thanks for joining <strong>Job Aspirations</strong>. Use the code below to verify your email.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:18px 0;">
              <div style="font-size:34px; font-weight:bold; letter-spacing:6px; color:#222;">
                ${verificationCode}
              </div>
              <p style="color:#777; font-size:13px;">This code will expire in 10 minutes.</p>
            </td>
          </tr>

          <tr>
            <td>
              <hr style="border:none; border-top:1px solid #eee;">
            </td>
          </tr>

          <tr>
            <td align="center">
              <p style="font-size:12px; color:#999;">
                If you didn't request this email, simply ignore it.
              </p>
            </td>
          </tr>

        </table>

        <p style="font-size:11px; color:#999; margin-top:10px;">
          © Job Aspirations — All Rights Reserved
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
`;

export const welcomeEmailTemplate = (userName) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Job Aspirations</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding:30px 10px;">
        
        <table width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; padding:25px;">
          
          <tr>
            <td align="center">
              <h2 style="color:#333; margin-bottom:5px;">Welcome Aboard 🎉</h2>
              <p style="color:#555; font-size:14px; margin-top:0;">
                Hey <strong>${userName || "User"}</strong>,<br/>
                Your account has been successfully created at <strong>Job Aspirations</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;">
              <p style="font-size:14px; color:#555; line-height:1.6; text-align:center;">
                You can now explore opportunities, build your profile, 
                and take the next big step in your career journey.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 10px 0;">
<a href="https://jobaspirations.in" target="_blank" rel="noopener noreferrer"
                 style="background:#007bff; color:white; padding:10px 20px; 
                 text-decoration:none; border-radius:5px; display:inline-block;">
                Get Started
              </a>
            </td>
          </tr>

          <tr>
            <td>
              <hr style="border:none; border-top:1px solid #eee; margin-top:20px;">
            </td>
          </tr>

          <tr>
            <td align="center">
              <p style="font-size:12px; color:#999;">
                Need help? Contact support anytime.
              </p>
            </td>
          </tr>

        </table>

        <p style="font-size:11px; color:#999; margin-top:10px;">
          © Job Aspirations — All Rights Reserved
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
`;


export const passwordResetEmailTemplate = (userName, resetUrl) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding:30px 10px;">
        
        <table width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; padding:25px;">
          
          <tr>
            <td align="center">
              <h2 style="color:#333; margin-bottom:5px;">Reset Your Password</h2>
              <p style="color:#555; font-size:14px; margin-top:0;">
                Hello <strong>${userName || "User"}</strong>,<br/>
                We received a request to reset your password for 
                <strong>Job Aspirations</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 0;">
              <a href="${resetUrl}" target="_blank" rel="noopener noreferrer"
                 style="
                   background:#dc3545;
                   color:#ffffff;
                   padding:12px 24px;
                   text-decoration:none;
                   border-radius:5px;
                   font-size:14px;
                   display:inline-block;
                 ">
                Reset Password
              </a>
              <p style="color:#777; font-size:13px; margin-top:12px;">
                This link will expire in <strong>15 minutes</strong>.
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <hr style="border:none; border-top:1px solid #eee;">
            </td>
          </tr>

          <tr>
            <td align="center">
              <p style="font-size:12px; color:#999;">
                If you did not request a password reset, you can safely ignore this email.
                Your account will remain secure.
              </p>
            </td>
          </tr>

        </table>

        <p style="font-size:11px; color:#999; margin-top:10px;">
          © Job Aspirations — All Rights Reserved
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
`;
