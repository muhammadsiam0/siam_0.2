# Secure File Storage

A secure and comprehensive file storage website built with Next.js, supporting images, PDFs, videos, voice notes, and other document formats.

## Features

- User authentication with strong password protection
- Two-factor authentication (2FA) via authenticator app
- Secure file storage with Cloudinary
- Email notifications for password reset and 2FA recovery
- User-friendly file manager interface
- Backup options for 2FA codes recovery

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **File Storage**: Cloudinary
- **Authentication**: JWT, bcrypt
- **2FA**: speakeasy
- **Email**: Resend

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
RESEND_API_KEY=your-resend-api-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server: `npm run dev`

## Deployment

This app is optimized for free hosting on Vercel.

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## Free Hosting Setup

- **Frontend/Backend**: Vercel (free tier)
- **Database**: MongoDB Atlas (free tier)
- **File Storage**: Cloudinary (free tier with 25GB storage, 25GB monthly bandwidth)
- **Email**: Resend (free tier with 3,000 emails/month)

## Security Features

- Password hashing with bcrypt
- JWT tokens for session management
- 2FA with TOTP (Time-based One-Time Password)
- Backup codes for 2FA recovery
- Secure file uploads with Cloudinary
- Email verification for new accounts

## Usage

1. Register with email and password
2. Verify email via link sent to your inbox
3. Log in and set up 2FA for enhanced security
4. Upload files securely
5. Manage your files with the intuitive interface

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-2fa` - Verify 2FA token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/setup-2fa` - Setup 2FA
- `POST /api/files/upload` - Upload file
- `GET /api/files/list` - List user files
- `DELETE /api/files/delete/[id]` - Delete file
