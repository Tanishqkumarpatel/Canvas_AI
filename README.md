# Canvas AI 🎓 (In Progress)

An AI-powered study companion that connects to your Canvas LMS to help you learn smarter — not harder.

## What It Does

Canvas AI pulls your courses directly from Canvas and turns your lecture materials into an active learning experience:

- 📝 **Lecture Summaries** — Get concise summaries of your course content
- 🧠 **Flashcards** — AI-generated active recall cards from your notes
- ❓ **Practice Questions** — Quiz yourself before exams
- 🆘 **Homework Help** — Get guided hints without just being given the answer [In progress]

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | NextAuth.js (Google OAuth) |
| Database | PostgreSQL (Supabase) |
| AI | Gemini/Google AI Studio |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm
- Supabase account
- Google OAuth credentials

### Installation

```bash
git clone https://github.com/yourusername/canvas-ai
cd canvas-ai
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

DATABASE_URL=your-supabase-connection-string
```

### Database Setup

Run this in your Supabase SQL editor:

```sql
CREATE TABLE users (
  email TEXT PRIMARY KEY,
  canvas_url TEXT,
  canvas_token TEXT
);
```

### Run Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## How To Get Your Canvas API Token

1. Log in to your university Canvas account
2. Go to **Account → Settings**
3. Scroll to **Approved Integrations**
4. Click **New Access Token**
5. Copy the token and paste it in Canvas AI settings

## Project Structure

```
├── app/
│   ├── page.tsx               # Landing page
│   ├── auth/                  # Login page
│   ├── dashboard/             # Protected pages
│   │   ├── page.tsx           # Course dashboard
│   │   ├── courses/[id]/      # Individual course
│   │   └── settings/          # Canvas token settings
│   └── api/                   # Backend API routes
├── components/
│   ├── layout/                # Navbar, sidebar
│   ├── dashboard/             # Course cards
│   └── forms/                 # Settings form
└── lib/
    ├── db.ts                  # Database connection
    ├── files.ts               # Reading file, for backend
    ├── listAllFiles.ts        # listing mock courses for demo
    ├── Supabase.ts            # supabase connection for bucket
    └── actions.ts             # Server actions

```

## Status

🚧 **In Progress** — Core auth and dashboard complete. Canvas API integration and Homework AI feature coming soon.

## License

MIT
