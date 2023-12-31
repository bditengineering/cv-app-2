import "@/styles/globals.css";

export const metadata = {
  title: "BDIT CV Generator App",
  description: "bditengineering.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
