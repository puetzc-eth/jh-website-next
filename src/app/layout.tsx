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
      <body>{children}</body>
    </html>
  )
}
