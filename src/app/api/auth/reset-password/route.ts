import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { hashPassword, generateTwoFactorSecret, generateBackupCodes } from '@/lib/auth';
import { sendEmail, generateTwoFactorRecoveryEmail } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { token, password, regenerateTwoFactor } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    if (regenerateTwoFactor && user.twoFactorEnabled) {
      // Regenerate 2FA secret and backup codes
      const { secret } = generateTwoFactorSecret();
      user.twoFactorSecret = secret;
      user.backupCodes = generateBackupCodes();

      // Send new backup codes via email
      await sendEmail(user.email, 'Your New 2FA Backup Codes', generateTwoFactorRecoveryEmail(user.backupCodes));
    }

    await user.save();

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}