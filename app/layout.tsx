import "./globals.css";
import Layout from "@/components/component/Layout";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="bg-slate-600 overflow-y-scroll no-scrollbar ">
        <main className="">
          <Layout active="Home">{children}</Layout>
        </main>
      </body>
    </html>
  );
}



