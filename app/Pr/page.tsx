"use client";
import DashHeader from "@/components/Header/DashHeader";
import React, { useEffect, useState } from "react";
import PrCard from "@/components/Card/PrCard";
import "@/styles/pagination.css";
import Loader from "@/components/Loaders/Loader";
import ResponsivePagination from "react-responsive-pagination";
import Wallettype from "@/components/GlobalModal/Wallettype";
import GlobalButton from "@/components/GlobalButton/globalButton";
import { Plus } from "lucide-react";

import useAlert from "@/Hooks/useAlert";
function page() {
  interface Pr {
    Nom: string;
    totalCandidates: number;
    Description: string;
    manager: string;
    created_at: string;
  }
  let fetched: any;
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [PrToEdit, setPrToEdit] = useState<Pr>();
  const [data2, setData] = useState();
  const { alert, setAlert } = useAlert();
  const { alert: alert2, setAlert: setAlert2 } = useAlert();
  const fetchData = async () => {
    try {
      setisLoading(true);
      const response = await fetch(`/api/Pr?page=${currentPage}`);
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
  const AddPr = async (Pr: any) => {
    try {
      const response = await fetch(`/api/Pr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Pr),
      });
      if (!response.ok) {
        throw new Error("Failed to add Pr");
      }
      const data = await response.json();
      console.log(data);
      setAlert2((prev) => ({ ...prev, isOpen: false }));
      setPrToEdit({
        Nom: "",
        totalCandidates: 0,
        Description: "",
        manager: "",
        created_at: "",
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  const filterPrsByName = async (searchquery: string) => {
    try {
      setisLoading(true);
      const response = await fetch(`/api/Pr/All`);
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
  const UpdatePr = async (Pr: any) => {
    try {
      const response = await fetch(`/api/Pr`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Pr),
      });
      if (!response.ok) {
        throw new Error("Failed to update Pr");
      }
      const data = await response.json();
      console.log(data);
      setAlert((prev) => ({ ...prev, isOpen: false }));
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetched = fetchData();
    console.log(fetched);
  }, [currentPage]);
  return (
    <div>
      <div>
        {!isLoading ? (
          <div>
            <DashHeader
              handleSearch={filterPrsByName}
              employee={[]}
              Topic="Pr"
            />
            {data2 &&
            // @ts-ignore
            data2.data2?.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-[70%] mt-10 mx-auto">
                  {data2 &&
                    // @ts-ignore
                    data2?.data2?.map((item: any) => (
                      <PrCard
                        Pr={item}
                        onClick={() => {
                          setPrToEdit(item);
                          setAlert((prev) => ({ ...prev, isOpen: true }));
                        }}
                      />
                    ))}
                </div>
                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={(newpage) => setCurrentPage(newpage)}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center h-[70vh]">
                <h1 className="text-2xl text-gray-400">No Data Found</h1>
              </div>
            )}
          </div>
        ) : (
          <Loader key={"Loader_v0"} />
        )}
      </div>
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <GlobalButton
          onClick={() =>
            // setCurrentPage((prev) => {
            //   return prev + 1;
            // })
            setAlert2((prev) => {
              return {
                ...prev,
                onCancel: () => {
                  setAlert2((prev) => {
                    return {
                      ...prev,
                      isOpen: false,
                    };
                  });
                },
                isOpen: true,
              };
            })
          }
          className="bg-[#045dbb] w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white mr-10"
          aria-label="add"
        >
          <Plus />
        </GlobalButton>
      </div>
      <Wallettype
        isOpen={alert.isOpen}
        onSubmit={() => {
          UpdatePr(PrToEdit);
          // console.log(PrToEdit);
          setAlert((prev) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => {
          setAlert((prev) => ({ ...prev, isOpen: false }));
        }}
        alertTitle={
          "Edit " + PrToEdit?.Nom + " Details" ||
          "Pr" + "Details"
        }
        alertDescription={"Edit "}
        submitBtnName={"Edit"}
        cancelBtnName="Cancel"
        type="success"
        onClose={() => {
          setAlert((prev) => ({ ...prev, isOpen: false }));
        }}
      >
        <div className="text-slate-900">
          <label htmlFor="Nom">Name of Pr</label>
          <input
            className="w-full p-2 border border-neutral-200 rounded-lg"
            type="text"
            id="Nom"
            name="Nom"
            value={PrToEdit?.Nom}
            onChange={(e) =>
              setPrToEdit((prev: any) => ({
                ...prev,
                Nom: e.target.value,
              }))
            }
          />
          <label htmlFor="totalCandidates">Manager</label>
          <input
            className="w-full p-2 border border-neutral-200 rounded-lg"
            type="text"
            id="manager"
            name="manager"
            value={PrToEdit?.manager}
            onChange={(e) =>
              setPrToEdit((prev: any) => ({
                ...prev,
                manager: e.target.value,
              }))
            }
          />
        </div>
      </Wallettype>
      <Wallettype
        isOpen={alert2.isOpen}
        onSubmit={() => {
          AddPr(PrToEdit);
          // console.log(PrToEdit);
          setAlert2((prev: any) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => {
          setAlert2((prev: any) => ({ ...prev, isOpen: false }));
        }}
        alertTitle={"Add Pr"}
        alertDescription={"Add new Pr"}
        submitBtnName={"Add"}
        cancelBtnName="Cancel"
        type="success"
        onClose={() => {
          setAlert2((prev: any) => ({ ...prev, isOpen: false }));
        }}
      >
        <div className="text-slate-900">
          <label htmlFor="Nom">Name of Pr</label>
          <input
            required={true}
            className="w-full p-2 border border-neutral-200 rounded-lg"
            type="text"
            id="Nom"
            placeholder="Name of Pr"
            name="Nom"
            value={PrToEdit?.Nom}
            onChange={(e) =>
              setPrToEdit((prev: any) => ({
                ...prev,
                Nom: e.target.value,
              }))
            }
          />
          <label htmlFor="manager">Manager</label>
          <input
            required={true}
            className="w-full p-2 border border-neutral-200 rounded-lg"
            type="text"
            id="manager"
            placeholder="Manager"
            name="manager"
            value={PrToEdit?.manager}
            onChange={(e) =>
              setPrToEdit((prev: any) => ({
                ...prev,
                manager: e.target.value,
              }))
            }
          />
          <label htmlFor="Description">Description</label>
          <input
            className="w-full p-2 border border-neutral-200 rounded-lg"
            type="text"
            id="Description"
            placeholder="Description if needed"
            name="Description"
            value={PrToEdit?.Description}
            onChange={(e) =>
              setPrToEdit((prev: any) => ({
                ...prev,
                Description: e.target.value,
              }))
            }
          />
        </div>
      </Wallettype>
    </div>
  );
}

export default page;
