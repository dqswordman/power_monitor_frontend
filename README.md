# MUT Power Monitor Dashboard

A modern, responsive dashboard for real-time power monitoring across campus buildings at Mahanakorn University of Technology. Built with Next.js, TypeScript, and Tailwind CSS.

![Dashboard Preview](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=MUT+Power+Dashboard)

## ✨ Features

- 🔌 **Real-time Power Monitoring** - Live data from campus buildings
- 📊 **Interactive Charts** - Daily stats and half-hourly trends
- 🌙 **Dark/Light Mode** - Professional theme switching
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Optimized with Next.js 14
- 🎨 **Modern UI** - Glass morphism and gradient effects
- 📈 **Data Visualization** - Recharts integration
- 🔄 **Auto-refresh** - Real-time data updates

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

Check your versions:
\`\`\`bash
node --version  # Should be 18.0+
npm --version   # Should be 8.0+
git --version
\`\`\`

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/mut-power-dashboard.git
   cd mut-power-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Configure API endpoint**
   
   Open \`lib/api.ts\` and update the BASE_URL:
   \`\`\`typescript
   // Replace with your actual backend IP address
   const BASE_URL = "http://192.168.1.100:8000"
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Environment Setup from Scratch

### Step 1: Install Node.js

#### Windows:
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the setup wizard
3. Restart your terminal/command prompt

#### macOS:
\`\`\`bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
\`\`\`

#### Linux (Ubuntu/Debian):
\`\`\`bash
# Update package index
sudo apt update

# Install Node.js
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
\`\`\`

### Step 2: Set up the Project

1. **Create a new directory**
   \`\`\`bash
   mkdir mut-power-dashboard
   cd mut-power-dashboard
   \`\`\`

2. **Initialize the project**
   \`\`\`bash
   # Create package.json
   npm init -y
   
   # Install Next.js and dependencies
   npm install next@14.0.0 react@^18 react-dom@^18
   npm install axios@^1.6.0 recharts@^2.8.0
   npm install class-variance-authority@^0.7.0 clsx@^2.0.0 tailwind-merge@^2.0.0
   npm install next-themes@^0.2.1
   
   # Install dev dependencies
   npm install -D typescript@^5 @types/node@^20 @types/react@^18 @types/react-dom@^18
   npm install -D autoprefixer@^10.0.1 postcss@^8 tailwindcss@^3.3.0
   \`\`\`

3. **Initialize Tailwind CSS**
   \`\`\`bash
   npx tailwindcss init -p
   \`\`\`

4. **Create the project structure**
   \`\`\`bash
   mkdir -p app components lib types
   mkdir -p components/ui
   \`\`\`

### Step 3: Configure TypeScript

Create \`tsconfig.json\`:
\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

### Step 4: Configure Package Scripts

Update \`package.json\` scripts:
\`\`\`json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
\`\`\`

## 🔧 Configuration

### API Configuration

1. **Backend URL Setup**
   
   In \`lib/api.ts\`, configure your FastAPI backend:
   \`\`\`typescript
   const BASE_URL = "http://YOUR_BACKEND_IP:8000"
   \`\`\`

2. **API Endpoints**
   
   The dashboard expects these endpoints:
   - \`GET /summary?n=5\` - Live power summary
   - \`GET /daily-stats/summary\` - Daily statistics
   - \`GET /half-hourly/summary\` - Half-hourly data

### Environment Variables (Optional)

Create \`.env.local\` for environment-specific settings:
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://192.168.1.100:8000
NEXT_PUBLIC_REFRESH_INTERVAL=10000
\`\`\`

## 📁 Project Structure

\`\`\`
mut-power-dashboard/
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── daily-stats.tsx      # Daily power statistics chart
│   ├── half-hourly-chart.tsx # Half-hourly trends chart
│   ├── live-summary.tsx     # Live power summary cards
│   ├── navbar.tsx           # Navigation bar
│   ├── stats-overview.tsx   # Overview statistics
│   ├── theme-provider.tsx   # Theme context provider
│   └── theme-toggle.tsx     # Dark/light mode toggle
├── lib/
│   ├── api.ts              # API client and data fetching
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
\`\`\`

## 🎨 Customization

### Theme Colors

Modify \`app/globals.css\` to customize colors:
\`\`\`css
:root {
  --primary: 221.2 83.2% 53.3%;  /* Blue */
  --secondary: 210 40% 96%;       /* Light gray */
  /* Add your custom colors */
}
\`\`\`

### Chart Colors

Update chart colors in components:
\`\`\`typescript
const colors = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Emerald
  // Add your colors
]
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

### Docker Deployment

Create \`Dockerfile\`:
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

Build and run:
\`\`\`bash
docker build -t mut-power-dashboard .
docker run -p 3000:3000 mut-power-dashboard
\`\`\`

## 🔍 Troubleshooting

### Common Issues

1. **Node.js Version Error**
   \`\`\`bash
   # Update Node.js to version 18+
   nvm install 18
   nvm use 18
   \`\`\`

2. **API Connection Failed**
   - Check if backend server is running
   - Verify IP address in \`lib/api.ts\`
   - Check firewall settings

3. **Build Errors**
   \`\`\`bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

4. **TypeScript Errors**
   \`\`\`bash
   # Check TypeScript configuration
   npx tsc --noEmit
   \`\`\`

### Performance Issues

1. **Slow Loading**
   - Check network connection to API
   - Reduce refresh intervals
   - Optimize chart data size

2. **Memory Usage**
   - Limit data points in charts
   - Implement data pagination
   - Clear old data periodically

## 📚 API Documentation

### Expected API Response Formats

#### Live Summary (\`/summary?n=5\`)
\`\`\`json
{
  "Building A": 150.5,
  "Building B": 89.2,
  "Building C": 234.1
}
\`\`\`

#### Daily Stats (\`/daily-stats/summary\`)
\`\`\`json
{
  "buildings": ["Building A", "Building B", "Building C"],
  "daily_data": [
    {
      "date": "2024-01-01",
      "Building A": 145.2,
      "Building B": 87.3,
      "Building C": 221.8
    }
  ]
}
\`\`\`

#### Half-Hourly Data (\`/half-hourly/summary\`)
\`\`\`json
{
  "buildings": ["Building A", "Building B", "Building C"],
  "hourly_data": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "Building A": 142.1,
      "Building B": 85.6,
      "Building C": 218.9
    }
  ]
}
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline comments
- **Issues**: [GitHub Issues](https://github.com/your-username/mut-power-dashboard/issues)
- **Email**: support@mut.ac.th

## 🙏 Acknowledgments

- Mahanakorn University of Technology
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful chart components

---

**Made with ❤️ for MUT Campus Power Monitoring**
