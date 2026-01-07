import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyTwoFactorToken, generateToken } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { userId, token, backupCode } = await request.json();

    if (!userId || (!token && !backupCode)) {
      return NextResponse.json({ error: 'User ID and token or backup code are required' }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user || !user.twoFactorEnabled) {
      return NextResponse.json({ error: 'Invalid user or 2FA not enabled' }, { status: 400 });
    }

    let isValid = false;
    if (token) {
      isValid = verifyTwoFactorToken(user.twoFactorSecret!, token);
    } else if (backupCode) {
      const index = user.backupCodes.indexOf(backupCode);
      if (index !== -1) {
        user.backupCodes.splice(index, 1);
        await user.save();
        isValid = true;
      }
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token or backup code' }, { status: 401 });
    }

    const jwtToken = generateToken({ userId: user._id, email: user.email });
    return NextResponse.json({ token: jwtToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}