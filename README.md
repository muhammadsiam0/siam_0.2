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

- **Frontend/Backend**: Next.js 16.1.1 with App Router
- **Database**: MongoDB with Mongoose
- **File Storage**: Cloudinary (25GB free storage)
- **Authentication**: JWT + bcrypt
- **2FA**: speakeasy (TOTP)
- **Email**: Resend (3,000 emails/month free)
- **Styling**: Tailwind CSS v4 with PostCSS

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`:

```env
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
RESEND_API_KEY=your-resend-api-key
NEXT_PUBLIC_BASE_URL=https://your-domain.com
PORT=10000
```

4. Run development server: `npm run dev`

## Production Deployment

### Build Commands
```bash
npm run build    # Build for production
npm run start    # Start production server
npm run type-check  # TypeScript validation
```

### Deploy to Render
1. Push code to GitHub
2. Connect Render to your repository
3. Set environment variables in Render dashboard
4. Set build command: `npm run build`
5. Set start command: `npm run start`

### Deploy to Vercel
1. Push code to GitHub
2. Connect Vercel to your repository
3. Set environment variables in Vercel dashboard
4. Deploy

### Environment Variables Required
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `RESEND_API_KEY`: Resend API key for emails
- `NEXT_PUBLIC_BASE_URL`: Your production domain
- `PORT`: Port for the server (optional, defaults to 3000)

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
