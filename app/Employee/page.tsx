"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import CardLineChart from "@/components/ui/charts/CardLineChart";
import CustomTable from "@/components/CustomTable/CustomTable";
import { use, useEffect, useState } from "react";
import DashHeader from "@/components/Header/DashHeader";
import { absenciese } from "@/data/Absencies";
import { dataemployee } from "@/data/Dataemployee";
import useSWR from "swr";
const Employee = () => {
  interface Employee {
    Name: string;
    Email: string;
    Phone: string;
    Address: string;
    Id: string;
    Department: string;
    pic: any;
  }
interface Employee {
  id: number;
  name: string;
  // Add other properties as needed
}
// useEffect(() => {
//   async function fetchData() {
//     const response = await fetch("/api/Employees");
 
//     console.log(response);}
//     fetchData();
// }, []);
// Fetch data using SWR
const { data, error } = useSWR<Employee[]>("/api/Employees", async (url:any) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
});
  const [employee, setEmployee] = useState<Employee>();
  const handleSearch = (e: any) => {
    const search = e.target.value;
    if (search === "") {
      setEmployee(undefined);
    }
    const filtered = dataemployee.filter((employee) => {
      return (
        employee.Name.toLowerCase().includes(search.toLowerCase()) ||
        employee.Email.toLowerCase().includes(search.toLowerCase()) ||
        employee.Phone.toLowerCase().includes(search.toLowerCase()) ||
        employee.Address.toLowerCase().includes(search.toLowerCase()) ||
        employee.Id.toLowerCase().includes(search.toLowerCase()) ||
        employee.Department.toLowerCase().includes(search.toLowerCase())
      );
    });
    setEmployee(filtered[0] as Employee);
  };
  const headres = ["Date", "Time", "Reason", "Status"];



  return (
    <main>

        {employee ? (
          <div>
            <DashHeader handleSearch={handleSearch} employee={employee} />
            <div className="grid gap-6 mt-4">
              <Card>
                <CardHeader className="flex items-center gap-4">
                  <Image
                    src={employee?.pic}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div className="flex flex-col justify-center text-center">
                    <CardTitle className="text-base font-semibold">
                      {employee?.Name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {employee?.Department}
                    </CardDescription>
                  </div>
                  <Button className="ml-auto" size="sm" variant="outline">
                    Edit Profile
                  </Button>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {employee && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold">Employee ID</h3>
                        <p className="text-sm">{employee.Id}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">Email</h3>
                        <p className="text-sm">{employee.Email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">Phone</h3>
                        <p className="text-sm">{employee.Phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">Address</h3>
                        <p className="text-sm">{employee.Address}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <div className="flex w-full justify-centre gap-6">
                <Card className="w-1/2">
                  <CardHeader>
                    <CardTitle>Performance</CardTitle>
                    <CardDescription>Performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardLineChart />
                  </CardContent>
                </Card>
                <Card className="w-1/2">
                  <CardHeader>
                    <CardTitle>Absenteeism</CardTitle>
                    <CardDescription>Employee Abcentisme</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomTable headres={headres} data={absenciese} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <DashHeader handleSearch={handleSearch} employee={employee} />
            <div className="flex flex-col items-center justify-center mt-10 h-1/2">
              <h1 className="text-2xl font-semibold">Search for an employee</h1>
              <p className="text-sm text-neutral-500">
                Search for an employee to view their profile
              </p>
              <div className="flex items-center gap-4 mt-4">
                <CustomTable
                  headres={[
                    "Name",
                    "Email",
                    "Phone",
                    "Address",
                    "ID",
                    "Department",
                  ]}
                  data={dataemployee}
                />
              </div>
            </div>
          </div>
        )}

    </main>
  );
};
// import Page from "./sign-in";
// import getSessionFromContext from "@services/getServerSession";

// export async function getServerSideProps(context: any) {
//   const session: any = await getSessionFromContext(context);

//   // session.
//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/sign-in",
//       },
//       props: {},
//     };
//   }

//   const userId = session?.token?.uid;
//   return {
//     redirect: {
//       permanent: false,
//       destination: `/dashboard/${userId}`,
//     },
//     props: {},
//   };
// }

export default Employee;
