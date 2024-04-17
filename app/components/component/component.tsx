import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import UserPlusIcon from "../ui/Icons/UserPlusIcon";
import pic from "@/Images/profile.jpg";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import SideBar from "../Layout/Sidebar";
import Nav from "../Layout/Nav";
import CardLineChart from "../ui/charts/CardLineChart";
import CustomTable from "../CustomTable/CustomTable";
import { useState } from "react";
import DashHeader from "../Header/DashHeader";

export function Component() {
  interface Employee {
    Name: string;
    Email: string;
    Phone: string;
    Address: string;
    Id: string;
    Department: string;
    pic: any;
  }
  const dataemployee = [
    {
      Name: "John Doe",
      Email: "John.Doe@Leoni.com",
      Phone: "+1 234-567-8900",
      Address: "1234 Elm Street, Springfield, IL 62701",
      Id: "2245882",
      Department: "Engineering",
      pic: pic,
    },
    {
      Name: "Jane Doe",
      Email: "Jane.Doe@Leoni.com",
      Phone: "+1 234-567-8900",
      Address: "1234 Elm Street, Springfield, IL 62701",
      Id: "2245382",
      Department: "HR Management",
      pic: pic,
    },
  ];
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
    setEmployee(filtered[0]);
  };
  const headres = ["Date", "Time", "Reason", "Status"];
  const absenciese = [
    {
      data: "2021-10-10",
      time: "08:00 - 17:00",
      reason: "Sick Leave",
      status: "Pending",
    },
    {
      data: "2021-10-10",
      time: "08:00 - 17:00",
      reason: "Sick Leave",
      status: "Pending",
    },
    {
      data: "2021-10-10",
      time: "08:00 - 17:00",
      reason: "Sick Leave",
      status: "Approved",
    },
  ];
  return (
    <div>
      {employee ? (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <SideBar />
          <div className="flex flex-col">
            <Nav />
            <main className="flex flex-1 flex-col gap-1 p-4 md:gap-8 md:p-6">
              <DashHeader handleSearch={handleSearch} employee={employee} />
              <div className="grid gap-6">
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
            </main>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid w-full lg:grid-cols-[280px_1fr]">
            <SideBar />
            <div className="flex flex-col">
              <Nav />
              <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <DashHeader handleSearch={handleSearch} employee={employee} />
                <div className="flex flex-col items-center justify-center  h-1/2">
                  <h1 className="text-2xl font-semibold">
                    Search for an employee
                  </h1>
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
              </main>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
