import { Roboto } from "next/font/google";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

export const metadata = {
  title: "Messenger",
  description: "Developed by Neranjan Pushpakumara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ToasterContext/>
        {children}
      </body>
    </html>
  );
}
