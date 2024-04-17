"use client";
import Layout from "@/components/component/Layout";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import PieChart from "@/components/ui/charts/PieChart";

// import { ResponsiveBar } from "@nivo/bar";
// import { ResponsiveLine } from "@nivo/line";

import CardBarChat from "@/components/ui/charts/CardBarChart";
import CardLineChart from "@/components/ui/charts/CardLineChart";
export default function Home() {
  const data = [
    { name: "CNHI", value: 400 },
    { name: "C1", value: 300 },
    { name: "Volvo", value: 300 },
    { name: "C3", value: 200 },
  ];
  return (
    <main>
        <div>
          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Employee Satisfaction
              </CardTitle>
              <SmileIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +74% from last month
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                The employee satisfaction score has increased by 74% compared to
                the previous month.
              </p>
              <CardBarChat />
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Team Productivity
              </CardTitle>
              <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Meeting deadlines
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                The team productivity rate is at 92%, ensuring timely completion
                of tasks.
              </p>
              <CardLineChart />
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Sales Performance
                </CardTitle>
                <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$250K</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Quarterly revenue
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  The sales performance has reached $250K this quarter,
                  exceeding expectations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Customer Feedback
                </CardTitle>
                <MessageCircleIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Average rating
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Customers have rated our services at 4.8, reflecting high
                  satisfaction levels.
                </p>
                <PieChart data={data} />
              </CardContent>
            </Card>
          </div>
        </div>
    </main>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

function SmileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
