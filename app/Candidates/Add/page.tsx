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
    ID: number;
    Nom: string;
    Prenom: string;
    Date_naissance: string;
    CV_Select: string;
    Date_CV_Selection: string;
    Sexe: string;
    Addresse: string;
    manager: string;
    Experience: number;
    Pr_ID: number;
    Type_contract: string;
    Status: string;
    Date_creation_Contract: string;
    ApplicationSource: string;
    Accepted: string;
    AcceptedE1: string;
    AcceptedE2: string;
    AcceptedE3: string;
  }
  interface Employee {
    id: number;
    name: string;
    // Add other properties as needed
  }

  const { data, error } = useSWR<Employee[]>(
    "/api/Employees",
    async (url: any) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // setEmployee(data);
      return data;
    }
  );
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
    // setEmployee(filtered[0] as Employee);
  };


  return (
    <main>
    
    </main>
  );
};

export default Employee;
