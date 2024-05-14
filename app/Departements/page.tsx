"use client";
import DashHeader from "@/components/Header/DashHeader";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import "@/styles/pagination.css";
import Loader from "@/components/Loaders/Loader";
import ResponsivePagination from "react-responsive-pagination";
function page() {
  let fetched: any;
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data2, setData] = useState();

  const fetchData = async () => {
    try {
      setisLoading(true);
      const response = await fetch(`/api/Departement?page=${currentPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data);
      setisLoading(false);
    } catch (error) {
      console.error(error);
    }
    return data2;
  };
  const filterDepartementsByName = async (searchquery: string) => {
    try {
      setisLoading(true);
      const response = await fetch(`/api/Departement/All`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const filteredData = {
        data: data.data.filter((item: any) =>
          item.Nom.toLowerCase().includes(searchquery.toLowerCase())
        ),
      };
      // @ts-ignore
      setData(filteredData);
      setisLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const perpage = 10;
  const totalPages = Math.ceil((data2 as any)?.count / perpage);
  useEffect(() => {
    fetched = fetchData();
    console.log(fetched);
  }, [currentPage]);
  return (
    <div>
      {!isLoading ? (
        <div>
          <DashHeader
            handleSearch={filterDepartementsByName}
            employee={[]}
            Topic="Departement"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-[70%] mt-10 mx-auto">
            {data2 &&
              // @ts-ignore
              data2?.data?.map((item: any) => <Card Departement={item} />)}
          </div>
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={(newpage) => setCurrentPage(newpage)}
          />
        </div>
      ) : (
        <Loader key={"Loader_v0"} />
      )}
    </div>
  );
}

export default page;
