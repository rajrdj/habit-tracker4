# Habit Tracker

hosted url 
[Link to habit tracker ](https://habit-tracker4.vercel.app/)

A full-stack habit tracking application built with Next.js, MongoDB, and D3.js. This application allows users to create, track, and visualize their daily habits.

## Features

- **Create Habits**: Users can add new habits they want to track.
- **Track Daily Progress**: Mark habits as 'Done', 'Not Done', or 'None' for each day.
- **7-Day View**: See and update the status of each habit for the last 7 days.
- **Data Visualization**: Utilizes D3.js to create interactive charts showing habit completion over time.
- **Streak Tracking**: Keeps track of the current streak and total completions for each habit.
- **Delete Habits**: Remove habits that are no longer needed.
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing in any environment.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js with React
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Styling**: Tailwind CSS with Shadcn UI components
- **Data Visualization**: D3.js
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:

2.  Install dependencies:
3.  cd habit-tracker
npm install
3. Set up environment variables:
Create a `.env.local` file in the root directory and add your MongoDB URI:
MONGODB_URI=your_mongodb_uri_here
4. Run the development server:
5. npm run dev
Copy
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is set up for easy deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

Remember to add your `MONGODB_URI` as an environment variable in your Vercel project settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
