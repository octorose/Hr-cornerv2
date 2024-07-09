import "./globals.css";
import Layout from "@/components/component/Layout";
import { getServerSession } from "next-auth";
import Nav from "@/components/Layout/Nav"; // Ensure correct import path
import { MacbookScroll } from "@/components/ui/macbookscroll"; // Ensure correct import path
import Link from "next/link";
import { classNames } from '../package/utils';
import homepage from '../app/Images/Homepage.png';
import Network from "./components/Network/network";
import Provide from "./components/Network/Provide";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const greetingbyTime = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Good Morning Leoni's Recruiter";
    } else if (hours < 18) {
      return "Good Afternoon Leoni's Recruiter";
    } else {
      return "Good Evening Leoni's Recruiter";
    }
  }
  const title = "Unlock the Full Potential: Experience Leoni's Recruitment Corner by Logging In";
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="overflow-y-scroll no-scrollbar ">
        <main className="overflow-hidden ">
          {session ? (
            <Layout active="Home">{children}</Layout>
          ) : (
            <div className="bg-gradient-to-t from-white to-slate-300 h-full w-screen overflow-hidden">
             
                <Nav title={title} greeting={greetingbyTime()}/>
          
              <MacbookScroll
                // showGradient={true}
                title="Login To have the full experience "
                badge={<Badge />}
                src={homepage}
              />
              <Provide />
              <Network />
            </div>
          )}
        </main>
      </body>
    </html>
  );
}

const Badge = () => {
  return (
    <div className="flex justify-center h-20 items-center ">
      <Link className="flex items-center font-semibold" href="#">
        <div className="flex  justify-start items-center gap-1">
          <div className="flex ml-auto font-extrabold font-outline-2 text-blue-950 text-2xl items-center gap-4">
            LEONI
          </div>
          <div className="flex ml-auto items-center bg-orange-500 text-white rounded-lg px-1 py-1 gap-4">
            'S CORNER
          </div>
        </div>
      </Link>
    </div>
  );
};
