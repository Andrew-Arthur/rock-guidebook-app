import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ReactNode } from 'react'

export default function Layout({
    children,
}: {
  children: ReactNode
}) {
    return (
        <html lang="en">
            <body className="h-screen w-screen m-0 p-0 overflow-hidden">
                {children}
            </body>
        </html>
    )
}
