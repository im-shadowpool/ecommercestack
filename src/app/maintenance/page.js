export const metadata = {
  title: 'Site Under Maintenance',
  robots: { index: false, follow: false },
}


export default function MaintenancePage() {
  return (
    <html>
      <head>
        <title>Site Under Maintenance</title>
        <meta name="robots" content="noindex" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f9fafb',
            flexDirection: 'column',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔧 We'll Be Back Soon</h1>
          <p style={{ fontSize: '1.125rem', color: '#555' }}>
            Our site is currently undergoing scheduled maintenance.
            <br />
            We appreciate your patience.
          </p>
        </div>
      </body>
    </html>
  )
}
