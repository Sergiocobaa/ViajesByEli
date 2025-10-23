import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth-context';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Viajes by Eli",
  description: "Viajes by eli",
  icons: {
    icon: "/iocono.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    // AÑADE ESTA PROP AQUÍ
    <html lang="es" suppressHydrationWarning>
      <head>
        <script src="https://tweakcn.com/live-preview.min.js"></script>
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider> 
            <Navbar />
            <div className="pt-24 content-padding"> 
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
