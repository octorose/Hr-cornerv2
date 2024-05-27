import "./globals.css";
import Layout from "@/components/component/Layout";
import { getServerSession } from 'next-auth';
import Nav from "./components/Layout/Nav";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className=" overflow-y-scroll no-scrollbar ">
        <main className="">
          {session?(<Layout active="Home">{children}</Layout>):(
          <div>
            <Nav/>
            <h1 className="text-center">Please Login</h1>
          </div>)}
        </main>
      </body>
    </html>
  );
}



