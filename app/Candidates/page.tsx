"use client";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";

import Select from "@mui/material/Select";
import CustomTable from "@/components/CustomTable/CustomTable";
import { useState } from "react";

import useSWR from "swr";
import { Plus } from "lucide-react";
import GlobalButton from "@/components/GlobalButton/globalButton";
import useAlert from "@/Hooks/useAlert";
import Modal from "@/components/GlobalModal/Modal";

const Candidate = ({ searchParams }: any) => {
  const { alert, setAlert } = useAlert();

  const [formstep, setFormStep] = useState(1);

  interface Candidate {
    ID: string | null;
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
  const [formdata, setFormdata] = useState<Candidate>({
    ID: null,
    Nom: "",
    Prenom: "",
    Date_naissance: "",
    CV_Select: "",
    Date_CV_Selection: "",
    Sexe: "",
    Addresse: "",
    manager: "",
    Experience: 0,
    Pr_ID: 0,
    Type_contract: "",
    Status: "",
    Date_creation_Contract: "",
    ApplicationSource: "",
    Accepted: "",
    AcceptedE1: "",
    AcceptedE2: "",
    AcceptedE3: "",
  });

  const { data: Candidates, error } = useSWR(
    "/api/Candidates",
    async (url: any) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    }
  );

  const { data: Prs, error: rolesError } = useSWR(
    "/api/Pr",
    async (url: any) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    }
  );

  const isValidPr = (value: string) => {
    const inputElement = document.getElementById("prInput");

    if (Prs.data.includes(Number(value))) {
      if (inputElement !== null) {
        inputElement.style.borderColor = "green";
        return true;
      }
    } else {
      Toast.fire({
        icon: "warning",
        title: "Invalid PR Id",
      });
      return false;
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    iconColor: "orange",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
  const headres = ["Date", "Time", "Reason", "Status"];
  return (
    <main>
      <div className="">
        <div className="flex flex-col  mt-2 h-1/2">
          <div className="">
            <div className="flex  flex-row  gap-4 ">
              <CustomTable
                headres={[
                  "Nom",
                  "Prenom",
                  "Accepted",
                  "Pr_ID",
                  "Status",
                  "ApplicationSource",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <GlobalButton
          onClick={() =>
            // setCurrentPage((prev) => {
            //   return prev + 1;
            // })
            setAlert((prev) => {
              return {
                ...prev,
                onCancel: () => {
                  setAlert((prev) => {
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
        onSubmit={async () => {
          if (formstep === 1) {
            setFormStep(2);
            return;
          } else {
            setAlert((prev) => ({ ...prev, isLoading: true }));
            await fetch("/api/Candidates", {
              method: "POST",
              body: JSON.stringify(formdata),
              headers: {
                "Content-Type": "application/json",
              },
            });
            // mutate();
            setAlert((prev) => ({ ...prev, isLoading: false, isOpen: false }));
            setFormStep(1);
          }
        }}
        onCancel={() => {
          setAlert((prev) => ({ ...prev, isOpen: false }));
          setFormStep(1);
        }}
        alertTitle={"Adding a Candidat"}
        alertDescription={
          formstep === 1
            ? "Enter the Candidat's Personal details"
            : "Enter the Candidat's Professional details"
        }
        submitBtnName={formstep === 1 ? "Next" : "Submit"}
        cancelBtnName="Cancel"
        // disableSubmitBtn={}
        // disableCancelBtn={}
        type="success"
        onClose={() => {
          setAlert((prev) => ({ ...prev, isOpen: false }));
          setFormStep(1);
        }}
      >
        {formstep === 1 ? (
          <div className="text-slate-800 mt-5 grid gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Name"
                className="h-12 p-2"
                onChange={(e) =>
                  setFormdata({ ...formdata, Nom: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="First Name"
                className="h-12 p-2"
                onChange={(e) =>
                  setFormdata({ ...formdata, Prenom: e.target.value })
                }
              />
            </div>
            <FormControl className="">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={}
                label="Gender"
                onChange={(e) =>
                  setFormdata({ ...formdata, Sexe: e.target.value as string })
                }
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
            <input
              type="Date"
              placeholder="Birthday"
              max={7}
              className="h-12"
              onChange={(e) =>
                setFormdata({ ...formdata, Date_naissance: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              className="h-12 p-2"
              onChange={(e) =>
                setFormdata({ ...formdata, Addresse: e.target.value })
              }
            />
          </div>
        ) : (
          <div className="text-slate-800 mt-5 grid gap-4">
            <FormControl className="">
              <InputLabel id="demo-simple-select-label">Accepted</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={}
                label={"Accepted"}
                defaultValue={"Pending"}
                onChange={(e) => {
                  setFormdata({
                    ...formdata,
                    Accepted: e.target.value as string,
                  });
                }}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="">
              <InputLabel id="demo-simple-select-label">
                Application Source
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={}
                label={"Application Source"}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    ApplicationSource: e.target.value as string,
                  })
                }
              >
                <MenuItem value={"Taleo"}>Taleo</MenuItem>
                <MenuItem value={"Linkedin"}>Linkedin</MenuItem>
                <MenuItem value={"Rekrute"}>Rekrute</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
                <MenuItem value={"Indeed"}>Indeed</MenuItem>
              </Select>
            </FormControl>
            <div className="flex gap-2">
              <input
                id="prInput"
                type="number"
                placeholder="PR"
                max={6}
                className="h-14 w-full p-2 border border-gray-400 rounded"
                onChange={(e) => {
                  if (e.target.value.length >= 6) {
                    setFormdata({ ...formdata, Pr_ID: Number(e.target.value) });
                    isValidPr(e.target.value);
                  }
                }}
              />
            </div>
            <input
              type="number"
              placeholder="Experience"
              className="h-12 p-2 border-gray-400 rounded"
              onChange={(e) => {
                setFormdata({
                  ...formdata,
                  Experience: Number(e.target.value),
                });
              }}
            />
          </div>
        )}
      </Modal>
    </main>
  );
};

export default Candidate;
