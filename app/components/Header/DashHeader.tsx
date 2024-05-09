import React from "react";
import { Button } from "../ui/button";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";

function DashHeader({ handleSearch, employee }: any) {
  return (
    <div className="">
      <div className="flex flex-col  justify-center items-center mb-24">
        <h1 className="text-2xl font-semibold">Search for an Candidate</h1>
        <p className="text-sm text-neutral-500">
          Search for an Candidate to view their profile
        </p>
      </div>
      <div className="flex items-center gap-5">
        <Button size="icon" variant="outline">
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="font-semibold text-lg md:text-xl">Employees</h1>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex px-2 items-center justify-start border rounded-md w-full">
            <input
              type="text"
              placeholder="Search for employees"
              className="border-0 outline-none font-bold text-ft-ts placeholder:italic bg-transparent w-full rounded-md"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const searchquery = e.currentTarget.value; 
                  handleSearch(searchquery);
                }
              }}
            />
            <SearchIcon
              className="h-5 w-5 mx-3"
              onClick={(e) => handleSearch(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashHeader;
