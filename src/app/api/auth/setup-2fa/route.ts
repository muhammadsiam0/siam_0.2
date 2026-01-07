import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyToken, generateTwoFactorSecret, generateBackupCodes } from '@/lib/auth';
import { sendEmail, generateTwoFactorRecoveryEmail } from '@/lib/email';
import qrcode from 'qrcode';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.twoFactorEnabled) {
      return NextResponse.json({ error: '2FA already enabled' }, { status: 400 });
    }

    const { secret, otpauthUrl } = generateTwoFactorSecret();
    user.twoFactorSecret = secret;
    user.twoFactorEnabled = true;
    user.backupCodes = generateBackupCodes();
    await user.save();

    // Generate QR code
    const qrCodeDataURL = await qrcode.toDataURL(otpauthUrl);

    // Send backup codes via email
    await sendEmail(user.email, 'Your 2FA Backup Codes', generateTwoFactorRecoveryEmail(user.backupCodes));

    return NextResponse.json({ otpauthUrl, qrCodeDataURL, backupCodes: user.backupCodes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}