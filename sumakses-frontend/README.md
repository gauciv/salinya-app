# SUMAKSES - Tech Career Transition Platform

A Next.js application helping Filipino BPO professionals transition to tech careers, now with AWS Cognito authentication.

## Features

- **Onboarding Flow**: Interactive assessment to match BPO skills with tech careers
- **AWS Cognito Authentication**: Secure user registration and sign-in
- **Resume Upload**: AI-powered skill extraction from resumes
- **Career Matching**: Personalized tech career recommendations
- **Learning Roadmaps**: Customized learning paths based on assessment results

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- AWS Account (for Cognito setup)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd sumakses-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # AWS Cognito
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
   NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=your-client-id
   NEXT_PUBLIC_AWS_REGION=us-east-1
   
   # Resume Analyzer Backend
   NEXT_PUBLIC_RESUME_API_URL=https://rks9izrci1.execute-api.ap-southeast-2.amazonaws.com/Prod
   ```

4. **Set up AWS Cognito**:
   Follow the detailed guide in `COGNITO-SETUP.md`

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Authentication Flow

The application now uses AWS Cognito for secure authentication:

1. **User Journey**: Landing → Assessment → Results → Cognito Registration → Resume Upload (Optional) → Main App
2. **Cognito Features**: 
   - Email-based registration
   - Email verification
   - Secure password requirements
   - User attribute management

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── cognito-auth.tsx  # Cognito authentication
│   ├── enhanced-resume-upload.tsx
│   └── ...
├── lib/                  # Utility functions
│   ├── amplify-config.ts # AWS Amplify configuration
│   └── utils.ts
├── public/               # Static assets
└── styles/              # Global styles
```

## Key Components

- **CognitoAuth**: Handles user registration, email verification, and sign-in
- **EnhancedResumeUpload**: AI-powered resume processing with skill extraction
- **EpicOnboardingFlow**: Interactive assessment and career matching
- **MainApp**: Main application dashboard

## Development

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Configuration

### AWS Cognito Setup

See `COGNITO-SETUP.md` for detailed instructions on:
- Creating a Cognito User Pool
- Configuring authentication settings
- Setting up email verification
- Environment variable configuration

### Environment Variables

Required environment variables:

**AWS Cognito:**
- `NEXT_PUBLIC_COGNITO_USER_POOL_ID`: Your Cognito User Pool ID
- `NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID`: Your Cognito App Client ID  
- `NEXT_PUBLIC_AWS_REGION`: AWS region (e.g., us-east-1)

**Resume Analyzer Backend:**
- `NEXT_PUBLIC_RESUME_API_URL`: Resume analyzer API endpoint
- `NEXT_PUBLIC_RESUME_API_KEY`: API key (if required)

### Still Need to Gather:

1. **Test API Response Format**:
   ```bash
   curl -X POST https://rks9izrci1.execute-api.ap-southeast-2.amazonaws.com/Prod/upload-resume \
     -F "file=@sample-resume.pdf"
   ```

2. **Check CORS Configuration**:
   - AWS Console → API Gateway → Your API → Resources → Enable CORS
   - Verify frontend domain is allowed

3. **Verify API Key Requirement**:
   - AWS Console → API Gateway → Your API → API Keys
   - Add to `.env.local` if required

4. **Check CloudWatch Logs**:
   - AWS Console → CloudWatch → Log groups → Lambda function logs
   - Note actual response structure for integration

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- AWS Amplify
- Netlify
- Railway
- DigitalOcean App Platform

## Security

- User authentication handled by AWS Cognito
- Secure password requirements enforced
- Email verification required for account activation
- Environment variables for sensitive configuration
- No user credentials stored in application code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For setup issues:
1. Check `COGNITO-SETUP.md` for AWS configuration
2. Verify environment variables are correctly set
3. Check browser console for error messages
4. Review AWS CloudWatch logs for Cognito events