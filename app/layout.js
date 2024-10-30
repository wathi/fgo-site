import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="p-10 bg-blue-50">
          <h1 className="text-xl text-blue-600">
            <Link href={`/`}>FGO Site</Link>
          </h1>
        </nav>
        <div className="px-10">{children}</div>
      </body>
    </html>
  );
}
