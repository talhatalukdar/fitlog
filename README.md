# FitLog — Workout Library

FitLog is a responsive workout library and personal workout-planning web application built with Next.js. Users can browse a library of workouts pulled from a REST API, view detailed exercise instructions, build a daily workout plan, save exercises for later, and track completed workouts — all persisted locally in the browser.

## Live Demo

https://fitlog-six-sigma.vercel.app/

## GitHub Repository

https://github.com/talhatalukdar/fitlog

## Technologies

- Next.js 16 (App Router)
- React 19
- JavaScript
- Tailwind CSS v4
- React Toastify
- Lucide React
- REST API
- Local Storage
- React Context API

## Features

1. **Workout Library** — browses all workouts from a REST API and displays them as responsive cards with images, category tags, equipment, duration, calories, and ratings.
2. **Dynamic Workout Details** — a dedicated details page for each workout with full specifications, step-by-step instructions, and quick actions.
3. **Today's Plan & Saved for Later** — add workouts to today's plan or save them for later. Today's Plan is limited to five exercises, while saved workouts are tracked separately.
4. **My Plan Dashboard** — a dedicated `/my-plan` page with live summary metrics for exercises, minutes, and calories, plus Today's Plan and Saved tabs.
5. **Search & Sort** — search workouts by name or muscle group and sort by duration, calories, or rating.
6. **Local Storage Persistence** — plan, saved workouts, and completed workouts persist after page reloads.
7. **Toast Notifications** — provides feedback for add, save, complete, and remove actions.
8. **Fully Responsive** — works across desktop, tablet, and mobile screen sizes.
9. **Custom 404 Page** — displays a custom not-found page for invalid routes.

## API

FitLog loads workout data from:

```text
https://api.abcz.workers.dev/api/fitlog
```

Individual workout details are loaded using:

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/talhatalukdar/fitlog.git
cd fitlog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

```text
src/
├── app/
│   ├── my-plan/
│   │   └── page.js
│   ├── workout/
│   │   └── [id]/
│   │       └── page.js
│   ├── layout.js
│   ├── not-found.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Hero.js
│   ├── WorkoutCard.js
│   ├── CategoryPills.js
│   ├── StatsRow.js
│   ├── SearchBar.js
│   ├── SortDropdown.js
│   └── Loader.js
├── context/
│   └── PlanContext.js
└── lib/
    └── api.js

public/
├── banner.png
└── logo.png
```

## Author

**Md Talha Talukdar**

Computer Science & Engineering  
American International University-Bangladesh (AIUB)