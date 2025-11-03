# Minglee

Full-stack social app (React + Vite frontend, Node/Express + MongoDB backend).

This repository contains two folders: `frontend/` and `backend/`.

This README explains how to run the project locally, what environment variables are required, and recommended deployment options using GitHub (CI/CD) and popular hosting providers.

---

## Project structure

- `backend/` — Express API, Mongoose models, Cloudinary uploader, authentication, mailer.
- `frontend/` — React app (Vite), Redux Toolkit, pages and components.

## Prerequisites

- Node.js (18+ recommended)
- npm or yarn
- A MongoDB Atlas cluster (or any MongoDB instance)
- (Optional) Cloudinary account for media uploads
- (Optional) Gmail account with an app password for nodemailer (or another SMTP service)

## Local development

1. Clone the repo and open the workspace root:

```powershell
git clone <your-repo-url>
cd Minglee
```

2. Install dependencies

```powershell
cd backend
npm install
cd ../frontend
npm install
```

3. Create environment variables

Create a `.env` file in `backend/` containing (example):

```
PORT=8000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=some_secret
EMAIL=your@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Notes:

- `EMAIL_PASS` should be an app password if using Gmail and 2FA.
- Cloudinary is optional but required for uploading media in this app.

4. Start backend and frontend in separate terminals

Backend:

```powershell
cd backend
npm run dev
```

Frontend:

```powershell
cd frontend
npm run dev
```

Open the frontend dev server (usually http://localhost:5173) in the browser.

## Build for production

Frontend build (static assets):

```powershell
cd frontend
npm run build
```

The build output will be in `frontend/dist`.

Backend production:

- Ensure environment variables are set on the host.
- Serve static frontend assets (optional) by copying `frontend/dist` into `backend/public` or configure your hosting accordingly.

## Deploying with GitHub

There are multiple ways to deploy. Below are recommended approaches using GitHub as the code host and either managed hosts for the runtime.

1. Frontend: Deploy to Vercel / Netlify (recommended)

- Connect the GitHub repository to Vercel or Netlify.
- Set the build command to `npm run build` and publish directory to `dist` (for Vite).
- These services will auto-deploy on push.

2. Frontend: Deploy to GitHub Pages (static site)

- Use a GitHub Actions workflow to build and push `frontend/dist` to the `gh-pages` branch.
- Example workflow (add to `.github/workflows/deploy-frontend.yml`):

```yaml
name: Build and Deploy Frontend to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      - name: Build
        run: |
          cd frontend
          npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

3. Backend: Deploy to Render / Railway / Heroku (recommended)

- These providers support connecting directly to your GitHub repository and will build and deploy the Node app.
- Steps (Render example):
  1. Create a new Web Service on Render and connect your GitHub repo.
  2. Set the build command to `npm install` and start command to `node index.js` or `npm run start` depending on your setup.
  3. Add environment variables in the Render dashboard (MONGO*URI, JWT_SECRET, EMAIL, EMAIL_PASS, CLOUDINARY*\*).

Note: If you use a single host for both frontend and backend, copy the built frontend assets into `backend/public` and serve them with Express (or configure a static host).

## GitHub Secrets and Environment

When using GitHub Actions or a host, set these values in the host's environment configuration or GitHub Secrets (if using Actions to deploy):

- `MONGO_URI`
- `JWT_SECRET`
- `EMAIL` (if using mail)
- `EMAIL_PASS` (app password for Gmail)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

## Troubleshooting

- 500 on upload endpoints: make sure `CLOUDINARY_*` and `EMAIL_*` are set, `backend/public` exists and is writable, and the backend can access the internet to reach Cloudinary.
- API auth issues: confirm the frontend sends requests with `withCredentials: true` and the backend sets cookies correctly (CORS and cookie settings).
- Vite dev bundling errors: ensure no server-side-only modules (mongoose, cloudinary server SDK, fs) are imported into the frontend code. Keep such imports in `backend/`.

## Helpful scripts

- `backend`: `npm run dev` — nodemon restart during development.
- `frontend`: `npm run dev` — Vite dev server.
- `frontend`: `npm run build` — build static frontend assets.

## Next steps for GitHub deployment (recommended quick path)

1. Push your repo to GitHub.
2. Deploy backend to Render (connect repo and set environment variables).
3. Deploy frontend to Vercel or Netlify (connect repo and point to `frontend` folder build settings), or use the GitHub Pages action above.

If you want, I can:

- Add the GitHub Actions workflow file for frontend (I can create `.github/workflows/deploy-frontend.yml`).
- Add a sample `render.yaml` or `Dockerfile` for a single-host deployment.

Tell me which deployment target you prefer for frontend and backend (Vercel/Netlify/GitHub Pages for frontend; Render/Railway/Heroku/Azure for backend) and I will generate the matching GitHub Actions workflow or deployment config.

---

Good luck with the deploy — tell me which providers you prefer and I'll create the CI files for you.
