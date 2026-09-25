# FitLog

FitLog is a responsive workout library and daily planning app. Browse exercises, inspect their details, save favorites, and build a focused plan of up to five workouts.

## Technologies

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4 and DaisyUI
- React Context API with `localStorage` persistence
- `react-hot-toast` notifications

## Features

- Responsive workout library with API-backed exercise cards
- Workout detail pages with equipment, difficulty, stats, and instructions
- Today's Plan and Saved tabs with live exercise, time, and calorie totals
- Five-workout daily plan limit with duplicate and limit notifications
- Mark workouts complete, remove items, and persist state across reloads
- Loading states, custom 404 page, responsive navigation, and toast feedback

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Run the checks used before deployment:

```bash
npm run lint
npm run build
```

## Routes

- `/` - Hero and workout library
- `/workouts/[id]` - Workout details
- `/my-plan` - Today's Plan and Saved workouts

## Live Demo

[Open the live FitLog app](https://fit-log-rk.vercel.app)



