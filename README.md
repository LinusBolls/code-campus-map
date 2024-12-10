# CODE Campus Map

A map that draws from both Google Calendar and the CODE Learning Platform API to render live data about room usage for the campus of CODE University of Applied Sciences. Intended to run on a TV screen.

## Getting Started

Create a file `.env` and fill it with values that look like the values in `.env.example`

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You'll need to sign in with your CODE Google account.

![Screenshot 1](/docs/screenshot-1.png)
![Screenshot 2](/docs/screenshot-2.png)

## How it works

Currently, we only pull data from two of the CODE Google Calendars to see Google Events that are currently in progress. In the future, we will also pull data from the CODE Learning Platform (intranet of CODE University) to show additional info about events.
