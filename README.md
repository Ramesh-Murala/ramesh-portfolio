# Ramesh Murala — Portfolio

A single-page React portfolio (Tailwind + Framer Motion) built on top of Create React App / CRACO.

## Setup
```bash
cd frontend
yarn install        # or: npm install
cp .env.example .env
yarn start          # runs on http://localhost:3000
```

## Build
```bash
yarn build          # outputs to frontend/build
```

## Deploy
The `frontend/build` folder is fully static — drop it on Vercel, Netlify,
Cloudflare Pages, GitHub Pages, S3, or any static host.

## Stack
- React 19 + React Router 7
- Tailwind CSS 3 + shadcn/ui primitives (in `src/components/ui`)
- Framer Motion (animations)
- Lucide React (icons)

## Resume PDF
Replace `frontend/public/Ramesh_Murala_Resume.pdf` with your own copy if needed.
