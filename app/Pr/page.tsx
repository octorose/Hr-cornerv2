"use client";
import DashHeader from "@/components/Header/DashHeader";
import React, { useEffect, useState } from "react";
import PrCard from "@/components/Card/PrCard";
import "@/styles/pagination.css";
import Loader from "@/components/Loaders/Loader";
import ResponsivePagination from "react-responsive-pagination";
import Modal from "@/components/GlobalModal/Modal";
import GlobalButton from "@/components/GlobalButton/globalButton";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import useAlert from "@/Hooks/useAlert";
function page() {
  interface Pr {
    Nom: string;
    Pr_Id:number | null;
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
      console.log(data);

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
      setAlert2((prev) => ({ ...prev, isOpen: false }));
      setPrToEdit({
        Nom: "",
        Pr_Id:null,
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
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    iconColor: "red",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const filterPrsByDepartment = async (department: string) => {
    try {
      const response = await fetch(
        `/api/Pr/Departement?departement=${department}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);

      setData(data);
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
              handleSearch={filterPrsByDepartment}
              employee={[]}
              Topic="Pr"
            />
            {data2 &&
            // @ts-ignore
            data2.data2?.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 mb-5 gap-5 md:grid-cols-2 lg:grid-cols-3 w-[70%] mt-5 mx-auto">
                  {data2 &&
                    // @ts-ignore
                    data2?.data2?.map((item: any) => (
                      <PrCard
                        Pr={item}
                        onClick={() => {
                          console.log(item);

                          setPrToEdit(item);
                          setAlert((prev) => ({ ...prev, isOpen: true }));
                        }}
                      />
                    ))}
                </div>
                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
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
      <Modal
        isOpen={alert.isOpen}
        onSubmit={() => {
          UpdatePr(PrToEdit);
          // console.log(PrToEdit);
          setAlert((prev) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => {
          setAlert((prev) => ({ ...prev, isOpen: false }));
        }}
        //@ts-ignore
        alertTitle={"Edit " + PrToEdit?.Pr_Id + " Details" || "Pr" + "Details"}
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
            value={PrToEdit?.Pr_Id === null ? "" : PrToEdit?.Pr_Id}
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
      </Modal>
      <Modal
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
      </Modal>
    </div>
  );
}

export default page;
