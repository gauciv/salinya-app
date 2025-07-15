### SALINYA - Dinadala ka sa linya kung saan ka tugma

A Next.js application helping Filipino BPO professionals transition to tech careers

## Features

- **Onboarding Flow**: Interactive assessment to match BPO skills with tech careers
- **Resume Upload**: AI-powered skill extraction from resumes
- **Career Matching**: Personalized tech career recommendations
- **Learning Roadmaps**: Customized learning paths based on assessment results

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- AWS Account

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd salinya-app
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your AWS Cognito configuration:
   ```env
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
   NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID=your-client-id
   NEXT_PUBLIC_AWS_REGION=us-east-1
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Authentication Flow

**User Journey**: Landing → Assessment → Results → Registration → Resume Upload (Optional) → Main App


## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── enhanced-resume-upload.tsx
│   └── ...
├── lib/                  # Utility functions
│   ├── amplify-config.ts # AWS Amplify configuration
│   └── utils.ts
├── public/               # Static assets
└── styles/              # Global styles
```

## Key Components

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

### Environment Variables

Required environment variables:

- `NEXT_PUBLIC_COGNITO_USER_POOL_ID`: Your Cognito User Pool ID
- `NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID`: Your Cognito App Client ID  
- `NEXT_PUBLIC_AWS_REGION`: AWS region (e.g., us-east-1)

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
1. Verify environment variables are correctly set
2. Check browser console for error messages
3. Review AWS CloudWatch logs for Cognito events
