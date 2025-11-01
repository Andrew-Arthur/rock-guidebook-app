import "./globals.css"
import "mapbox-gl/dist/mapbox-gl.css"
import "@radix-ui/themes/styles.css"
import { ReactNode } from "react"
import { Theme, ThemePanel } from "@radix-ui/themes"

export const HEADER_HEIGHT = 48

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="h-screen w-screen m-0 p-0 overflow-hidden">
                {
                    <Theme>
                        {children}
                        <ThemePanel />
                    </Theme>
                }
            </body>
        </html>
    )
}
