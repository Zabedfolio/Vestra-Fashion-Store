import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata = {
  title: "VESTRA | Modern Premium Fashion Store",
  description: "VESTRA offers high-quality, modern, and minimalist wardrobe essentials for Men, Women, and Kids. Shop clean styles today.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="font-body min-h-full flex flex-col antialiased bg-white">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
