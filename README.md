# MUT Power Monitor Dashboard (Frontend)

A modern dashboard built with **Next.js 15** and **React 18** for monitoring campus electricity usage. It displays a real-time overview, daily statistics, and half-hourly trend charts. The UI supports light and dark themes and is fully responsive. All data is fetched via helper functions in [`lib/api.ts`](lib/api.ts), which can be pointed to a real backend.

![Dashboard Screenshot](./assets/image-20250624143619393.png)

## Features

- **Live Overview** – latest power readings for each building
- **Charts** – daily summaries and half‑hourly trend lines
- **Theme Support** – toggle between light and dark modes using `next-themes`
- **Responsive Design** – built with Tailwind CSS to work on mobile and desktop

## Getting Started

### Prerequisites
- Node.js 18 or higher
- pnpm, npm or yarn

### Run Locally
1. Clone the repo and install dependencies
   ```bash
   git clone <repo-url>
   cd power_monitor_frontend
   npm install  # or pnpm install / yarn install
   ```
2. Start the development server
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build:
```bash
npm run build
npm start
```

### API Configuration
The base URL for API requests is set in [`lib/api.ts`](lib/api.ts) via the `BASE_URL` constant, which defaults to `http://192.168.1.100:8000`. Change this value to match your backend when deploying.

## Project Structure
```text
.
├── app/                # Next.js entry point and layout files
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── assets/             # Static images used in documentation
├── components/         # Reusable React components
│   ├── building-card.tsx
│   ├── daily-stats.tsx
│   ├── data-table.tsx
│   ├── half-hourly-chart.tsx
│   ├── live-summary.tsx
│   ├── navbar.tsx
│   ├── power-chart.tsx
│   ├── stats-overview.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/             # UI primitives
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                # API wrappers and utilities
│   ├── api.ts
│   └── utils.ts
├── public/             # Public assets served by Next.js
├── types/              # TypeScript type definitions
├── DEPLOYMENT.md       # Detailed deployment guide
└── ...                 # Config files (Next.js, Tailwind, TypeScript)
```

Each folder contains focused code: `app` defines the root layout, `components` holds UI pieces, `lib` abstracts API calls, and `types` stores shared interfaces.

## Deployment
See [`DEPLOYMENT.md`](DEPLOYMENT.md) for instructions on deploying to Vercel, Netlify, or Docker.

## License

This project is released under the [MIT](LICENSE) license.
