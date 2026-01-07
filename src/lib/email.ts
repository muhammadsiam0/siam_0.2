import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const data = await resend.emails.send({
      from: 'FileStorage <noreply@yourdomain.com>', // Replace with your verified domain
      to,
      subject,
      html,
    });
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export function generateVerificationEmail(token: string): string {
  return `
    <h1>Verify Your Email</h1>
    <p>Click the link below to verify your email address:</p>
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}">Verify Email</a>
  `;
}

export function generatePasswordResetEmail(token: string): string {
  return `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}">Reset Password</a>
  `;
}

export function generateTwoFactorRecoveryEmail(codes: string[]): string {
  return `
    <h1>Your 2FA Backup Codes</h1>
    <p>Here are your backup codes. Store them securely:</p>
    <ul>
      ${codes.map(code => `<li>${code}</li>`).join('')}
    </ul>
    <p>Each code can be used only once.</p>
  `;
}