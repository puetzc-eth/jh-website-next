import './globals.css'

export const metadata = {
  title: 'Jürgensen & Hillesheim',
  description: 'Schreinererei Jürgensen & Hillesheim GmbH in Düsseldorf',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
