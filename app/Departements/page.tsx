"use client";
import DashHeader from "@/components/Header/DashHeader";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import "@/styles/pagination.css";
import Loader from "@/components/Loaders/Loader";
import ResponsivePagination from "react-responsive-pagination";
import Modal from "@/components/GlobalModal/Modal";
import GlobalButton from "@/components/GlobalButton/globalButton";
import { Plus } from "lucide-react";

import useAlert from "@/Hooks/useAlert";
function page() {
  interface Departement {
    Nom: string;
    totalCandidates: number;
    Description: string;
    manager: string;
    created_at: string;
  }
  let fetched: any;
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [departementToEdit, setDepartementToEdit] = useState<Departement>();
  const [data2, setData] = useState();
  const { alert, setAlert } = useAlert();
  const { alert: alert2, setAlert: setAlert2 } = useAlert();
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
  const AddDepartement = async (departement: any) => {
    try {
      const response = await fetch(`/api/Departement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departement),
      });
      if (!response.ok) {
        throw new Error("Failed to add departement");
      }
      const data = await response.json();
      console.log(data);
      setAlert2((prev) => ({ ...prev, isOpen: false }));
      setDepartementToEdit({
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
  const UpdateDepartement = async (departement: any) => {
    try {
      const response = await fetch(`/api/Departement`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(departement),
      });
      if (!response.ok) {
        throw new Error("Failed to update departement");
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
              handleSearch={filterDepartementsByName}
              employee={[]}
              Topic="Departement"
            />
            {data2 &&
            // @ts-ignore
            data2.data?.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 mb-5 gap-5 md:grid-cols-2 lg:grid-cols-3 w-[70%] mt-5 mx-auto">
                  {data2 &&
                    // @ts-ignore
                    data2?.data?.map((item: any) => (
                      <Card
                        Departement={item}
                        onClick={() => {
                          setDepartementToEdit(item);
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
          className="bg-blue-950 w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white mr-10"
          aria-label="add"
        >
          <Plus />
        </GlobalButton>
      </div>
      <Modal
        isOpen={alert.isOpen}
        onSubmit={() => {
          UpdateDepartement(departementToEdit);
          // console.log(departementToEdit);
          setAlert((prev) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => {
          setAlert((prev) => ({ ...prev, isOpen: false }));
        }}
        alertTitle={
          "Edit " + departementToEdit?.Nom + " Details" ||
          "Departement" + "Details"
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
          <label htmlFor="Nom">Name of departement</label>
          <input
            className="w-full p-2 border border-neutral-200 rounded-lg"
            type="text"
            id="Nom"
            name="Nom"
            value={departementToEdit?.Nom}
            onChange={(e) =>
              setDepartementToEdit((prev: any) => ({
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
            value={departementToEdit?.manager}
            onChange={(e) =>
              setDepartementToEdit((prev: any) => ({
                ...prev,
                manager: e.target.value,
              }))
            }
          />
        </div>
      </Modal>
      <Modal
        isOpen={alert2.isOpen}
        onSubmit={() => {
          AddDepartement(departementToEdit);
          // console.log(departementToEdit);
          setAlert2((prev: any) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => {
          setAlert2((prev: any) => ({ ...prev, isOpen: false }));
        }}
        alertTitle={"Add Departement"}
        alertDescription={"Add new departement"}
        submitBtnName={"Add"}
        cancelBtnName="Cancel"
        type="success"
        onClose={() => {
          setAlert2((prev: any) => ({ ...prev, isOpen: false }));
        }}
      >
        <div className="text-slate-900">
          <label htmlFor="Nom">Name of departement</label>
          <input
            required={true}
            className="w-full p-2 border border-neutral-200 rounded-lg"
            type="text"
            id="Nom"
            placeholder="Name of departement"
            name="Nom"
            value={departementToEdit?.Nom}
            onChange={(e) =>
              setDepartementToEdit((prev: any) => ({
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
            value={departementToEdit?.manager}
            onChange={(e) =>
              setDepartementToEdit((prev: any) => ({
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
            value={departementToEdit?.Description}
            onChange={(e) =>
              setDepartementToEdit((prev: any) => ({
                ...prev,
                Description: e.target.value,
              }))
            }
          />
        </div>
      </Modal>
    </div>
  );
}

export default page;
