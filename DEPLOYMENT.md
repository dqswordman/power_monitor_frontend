# Deployment Guide - MUT Power Dashboard

This guide covers different deployment options for the MUT Power Monitor Dashboard.

## 🚀 Deployment Options

### 1. Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy Next.js applications.

#### Prerequisites
- GitHub account
- Code pushed to GitHub repository

#### Steps

1. **Prepare Your Repository**
   \`\`\`bash
   # Initialize git (if not done)
   git init
   git add .
   git commit -m "Initial commit"
   
   # Push to GitHub
   git remote add origin https://github.com/yourusername/mut-power-dashboard.git
   git push -u origin main
   \`\`\`

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Configure settings:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: \`npm run build\`
     - Output Directory: .next
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add any required variables:
     \`\`\`
     NEXT_PUBLIC_API_BASE_URL=http://your-backend-ip:8000
     \`\`\`

4. **Custom Domain** (optional)
   - Go to Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### 2. Netlify

Another popular option for static site deployment.

#### Steps

1. **Build the Project**
   \`\`\`bash
   npm run build
   npm run export  # If using static export
   \`\`\`

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop your \`out\` folder (or connect GitHub)
   - Configure build settings:
     - Build command: \`npm run build\`
     - Publish directory: \`.next\`

### 3. Docker Deployment

For containerized deployment on any server.

#### Create Dockerfile

\`\`\`dockerfile
# Use Node.js 18 Alpine image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

#### Create .dockerignore

\`\`\`
node_modules
.next
.git
*.md
Dockerfile
.dockerignore
\`\`\`

#### Build and Run

\`\`\`bash
# Build the image
docker build -t mut-power-dashboard .

# Run the container
docker run -p 3000:3000 mut-power-dashboard

# Or with environment variables
docker run -p 3000:3000 -e NEXT_PUBLIC_API_BASE_URL=http://192.168.1.100:8000 mut-power-dashboard
\`\`\`

### 4. Traditional Server Deployment

Deploy on your own Linux server.

#### Prerequisites
- Linux server (Ubuntu/CentOS/etc.)
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy

#### Steps

1. **Prepare the Server**
   \`\`\`bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install nginx -y
   \`\`\`

2. **Deploy the Application**
   \`\`\`bash
   # Clone your repository
   git clone https://github.com/yourusername/mut-power-dashboard.git
   cd mut-power-dashboard
   
   # Install dependencies
   npm install
   
   # Build the application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "mut-dashboard" -- start
   pm2 save
   pm2 startup
   \`\`\`

3. **Configure Nginx**
   
   Create \`/etc/nginx/sites-available/mut-dashboard\`:
   \`\`\`nginx
   server {
       listen 80;
       server_name your-domain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`
   
   Enable the site:
   \`\`\`bash
   sudo ln -s /etc/nginx/sites-available/mut-dashboard /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   \`\`\`

4. **SSL Certificate** (optional but recommended)
   \`\`\`bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx -y
   
   # Get SSL certificate
   sudo certbot --nginx -d your-domain.com
   \`\`\`

## 🔧 Environment Configuration

### Production Environment Variables

Create \`.env.production\`:
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://your-production-backend:8000
NEXT_PUBLIC_REFRESH_INTERVAL=10000
NODE_ENV=production
\`\`\`

### Build Optimization

Update \`next.config.js\` for production:
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For Docker
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Image optimization
  images: {
    unoptimized: true // If using static export
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['recharts', 'lucide-react']
  }
}

module.exports = nextConfig
\`\`\`

## 📊 Monitoring and Maintenance

### Health Checks

Create a health check endpoint in \`app/api/health/route.ts\`:
\`\`\`typescript
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
}
\`\`\`

### Logging

For PM2 deployment:
\`\`\`bash
# View logs
pm2 logs mut-dashboard

# Monitor
pm2 monit
\`\`\`

### Backup Strategy

\`\`\`bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "backup_$DATE.tar.gz" /path/to/mut-power-dashboard
\`\`\`

## 🚨 Troubleshooting Deployment Issues

### Common Issues

1. **Build Failures**
   \`\`\`bash
   # Clear cache and rebuild
   rm -rf .next node_modules
   npm install
   npm run build
   \`\`\`

2. **API Connection Issues**
   - Check firewall rules
   - Verify backend accessibility
   - Update CORS settings on backend

3. **Performance Issues**
   - Enable gzip compression
   - Optimize images
   - Use CDN for static assets

4. **Memory Issues**
   \`\`\`bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   \`\`\`

### Security Checklist

- [ ] Use HTTPS in production
- [ ] Set proper CORS headers
- [ ] Hide sensitive information
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated
- [ ] Set up proper firewall rules

## 📈 Performance Optimization

### Build Optimization

\`\`\`bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
\`\`\`

### Caching Strategy

Configure caching headers in \`next.config.js\`:
\`\`\`javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }
        ]
      }
    ]
  }
}
\`\`\`

---

Choose the deployment method that best fits your infrastructure and requirements. Vercel is recommended for simplicity, while Docker provides more control and flexibility.
