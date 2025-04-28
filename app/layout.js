import './globals.css';

export const metadata = {
  title: 'MovieTracker - Track your favorite movies and TV shows',
  description: 'Track your favorite movies and TV shows with MovieTracker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

