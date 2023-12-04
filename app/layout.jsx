import Providers from "../store/provider";
import "./layout.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <Providers>
        <body> {children}</body>
      </Providers>
    </html>
  );
}
