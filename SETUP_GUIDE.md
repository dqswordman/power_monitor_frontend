# Complete Setup Guide - MUT Power Dashboard

This guide will walk you through setting up the MUT Power Monitor Dashboard from scratch, even if you're new to web development.

## 🎯 Prerequisites Check

Before starting, let's make sure your system is ready:

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: At least 4GB (8GB recommended)
- **Storage**: 2GB free space
- **Internet**: Stable connection for downloading packages

## 📋 Step-by-Step Installation

### Step 1: Install Node.js and npm

Node.js is the runtime that powers our dashboard. npm is the package manager.

#### For Windows:

1. **Download Node.js**
   - Go to [https://nodejs.org](https://nodejs.org)
   - Download the "LTS" version (recommended)
   - Run the installer (.msi file)

2. **Installation Process**
   - Accept the license agreement
   - Choose installation directory (default is fine)
   - Make sure "Add to PATH" is checked
   - Click "Install"

3. **Verify Installation**
   - Open Command Prompt (cmd) or PowerShell
   - Type: \`node --version\`
   - Type: \`npm --version\`
   - You should see version numbers

#### For macOS:

**Option 1: Direct Download**
1. Visit [https://nodejs.org](https://nodejs.org)
2. Download the LTS version for macOS
3. Run the .pkg installer
4. Follow the installation wizard

**Option 2: Using Homebrew (Recommended)**
\`\`\`bash
# Install Homebrew first (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
\`\`\`

#### For Linux (Ubuntu/Debian):

\`\`\`bash
# Update package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version

# If versions are too old, use NodeSource repository:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
\`\`\`

### Step 2: Install Git (Version Control)

#### Windows:
1. Download from [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer with default settings
3. Verify: \`git --version\` in Command Prompt

#### macOS:
\`\`\`bash
# Using Homebrew
brew install git

# Or download from https://git-scm.com/download/mac
\`\`\`

#### Linux:
\`\`\`bash
sudo apt install git
\`\`\`

### Step 3: Install a Code Editor

**Recommended: Visual Studio Code**
1. Download from [https://code.visualstudio.com](https://code.visualstudio.com)
2. Install with default settings
3. Install helpful extensions:
   - TypeScript and JavaScript Language Features
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux/React-Native snippets

### Step 4: Create the Project

#### Option A: Clone from Repository (if available)
\`\`\`bash
# Navigate to your desired directory
cd Desktop  # or wherever you want the project

# Clone the repository
git clone https://github.com/your-username/mut-power-dashboard.git
cd mut-power-dashboard

# Install dependencies
npm install
\`\`\`

#### Option B: Create from Scratch

1. **Create Project Directory**
   \`\`\`bash
   # Navigate to your desired location
   cd Desktop  # Windows: cd C:\Users\YourName\Desktop

   # Create and enter project directory
   mkdir mut-power-dashboard
   cd mut-power-dashboard
   \`\`\`

2. **Initialize the Project**
   \`\`\`bash
   # Create package.json
   npm init -y

   # Install Next.js and React
   npm install next@14.0.0 react@^18 react-dom@^18

   # Install additional dependencies
   npm install axios@^1.6.0 recharts@^2.8.0 class-variance-authority@^0.7.0 clsx@^2.0.0 tailwind-merge@^2.0.0 next-themes@^0.2.1

   # Install development dependencies
   npm install -D typescript@^5 @types/node@^20 @types/react@^18 @types/react-dom@^18 autoprefixer@^10.0.1 postcss@^8 tailwindcss@^3.3.0
   \`\`\`

3. **Initialize Tailwind CSS**
   \`\`\`bash
   npx tailwindcss init -p
   \`\`\`

4. **Create Directory Structure**
   \`\`\`bash
   # Create main directories
   mkdir app components lib types
   mkdir components/ui

   # Create initial files
   touch app/layout.tsx app/page.tsx app/globals.css
   touch components/navbar.tsx
   touch lib/api.ts lib/utils.ts
   touch types/index.ts
   \`\`\`

### Step 5: Configure the Project

1. **Update package.json scripts**
   
   Open \`package.json\` and add/update the scripts section:
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

2. **Create TypeScript Configuration**
   
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
       "plugins": [{ "name": "next" }],
       "baseUrl": ".",
       "paths": { "@/*": ["./*"] }
     },
     "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
     "exclude": ["node_modules"]
   }
   \`\`\`

3. **Configure Tailwind CSS**
   
   Update \`tailwind.config.js\`:
   \`\`\`javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./pages/**/*.{js,ts,jsx,tsx,mdx}",
       "./components/**/*.{js,ts,jsx,tsx,mdx}",
       "./app/**/*.{js,ts,jsx,tsx,mdx}",
     ],
     darkMode: "class",
     theme: {
       extend: {},
     },
     plugins: [],
   }
   \`\`\`

### Step 6: Add the Dashboard Code

Now you'll need to copy all the component files from the previous code blocks. The main files you need:

1. \`app/layout.tsx\` - Root layout
2. \`app/page.tsx\` - Main dashboard
3. \`app/globals.css\` - Styles
4. \`components/\*\` - All component files
5. \`lib/api.ts\` - API configuration
6. \`types/index.ts\` - Type definitions

### Step 7: Configure Your Backend Connection

1. **Find Your Backend IP Address**
   
   On your backend server, run:
   \`\`\`bash
   # Linux/macOS
   ip addr show
   # or
   ifconfig
   
   # Windows
   ipconfig
   \`\`\`

2. **Update API Configuration**
   
   In \`lib/api.ts\`, replace the BASE_URL:
   \`\`\`typescript
   const BASE_URL = "http://YOUR_BACKEND_IP:8000"
   // Example: const BASE_URL = "http://192.168.1.100:8000"
   \`\`\`

### Step 8: Run the Dashboard

1. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Open in Browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the dashboard loading

## 🔧 Troubleshooting Common Issues

### Issue 1: "npm command not found"
**Solution**: Node.js wasn't installed properly or PATH wasn't updated
- Restart your terminal/command prompt
- Reinstall Node.js and ensure "Add to PATH" is checked

### Issue 2: "Permission denied" errors (Linux/macOS)
**Solution**: Fix npm permissions
\`\`\`bash
sudo chown -R $(whoami) ~/.npm
\`\`\`

### Issue 3: Port 3000 already in use
**Solution**: Use a different port
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Issue 4: API connection errors
**Solutions**:
- Verify backend server is running
- Check firewall settings
- Ensure correct IP address in \`lib/api.ts\`
- Try accessing API directly: \`http://YOUR_IP:8000\` in browser

### Issue 5: TypeScript errors
**Solution**: Install missing types
\`\`\`bash
npm install -D @types/react @types/react-dom
\`\`\`

## 🚀 Next Steps

Once your dashboard is running:

1. **Test all features**:
   - Live power summary updates
   - Chart interactions
   - Dark/light mode toggle
   - Responsive design on mobile

2. **Customize for your needs**:
   - Update building names
   - Adjust refresh intervals
   - Modify color schemes
   - Add new features

3. **Deploy to production**:
   - Build the project: \`npm run build\`
   - Deploy to Vercel, Netlify, or your server

## 📞 Getting Help

If you encounter issues:

1. **Check the console**: Open browser developer tools (F12) and look for errors
2. **Check terminal**: Look for error messages in your terminal
3. **Verify prerequisites**: Ensure all software is properly installed
4. **Check network**: Ensure backend API is accessible
5. **Review configuration**: Double-check all configuration files

## 🎉 Success!

If you can see the dashboard with live data, congratulations! You've successfully set up the MUT Power Monitor Dashboard.

The dashboard should show:
- ✅ Live power consumption data
- ✅ Interactive charts
- ✅ Dark/light mode toggle
- ✅ Responsive design
- ✅ Real-time updates

---

**Need more help?** Contact the development team or check the main README.md for additional information.
