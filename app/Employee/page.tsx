"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Swal from 'sweetalert2'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CardLineChart from "@/components/ui/charts/CardLineChart";
import CustomTable from "@/components/CustomTable/CustomTable";
import { useState } from "react";
import DashHeader from "@/components/Header/DashHeader";
import { absenciese } from "@/data/Absencies";

import useSWR from "swr";
import { Plus } from "lucide-react";
import GlobalButton from "@/components/GlobalButton/globalButton";
import useAlert from "@/Hooks/useAlert";
import Wallettype from "@/components/GlobalModal/Wallettype";

const Candidate = () => {
  const { alert, setAlert } = useAlert();
  const [formstep, setFormStep] = useState(1);
  interface Candidate {
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
  const [formdata, setFormdata] = useState<Candidate>({
    ID: 0,
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

  const { data, error } = useSWR<Candidate[]>(
    "/api/Candidates",
    async (url: any) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // setCandidate(data);
      return data;
    }
  );
  const {data:Prs, error:rolesError} = useSWR("/api/Pr", async (url: any) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log(data);
    
    return data;
  
  }
  );

  const isValidPr = (value: string) => {
        const inputElement = document.getElementById("prInput"); 

    if (Prs.data.includes(Number(value))) {
      console.log("Valid PR");
      inputElement.style.borderColor = "green"
      return true;
    } else {
      Toast.fire({
        icon:'warning',
        title:'Invalid PR Id'
      })
      console.log("Invalid PR");
      return false;
    }
  };
  const [Candidate, setCandidate] = useState<Candidate>();
  const handleSearch = (e: any) => {
    const search = data?.filter((item) => item.Nom === e);
    if (search !== undefined) {
      setCandidate(search[0]);
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
      {Candidate ? (
        <div>
          <DashHeader handleSearch={handleSearch} Candidate={Candidate} />
          <div className="grid gap-6 mt-4">
            <Card>
              <CardHeader className="flex items-center gap-4">
                <Image
                  src={Candidate?.pic}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div className="flex flex-col justify-center text-center">
                  <CardTitle className="text-base font-semibold">
                    {/* {Candidate?.Name} */}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {/* {Candidate?.Department} */}
                  </CardDescription>
                </div>
                <Button className="ml-auto" size="sm" variant="outline">
                  Edit Profile
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4">
                {Candidate && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold">Candidate ID</h3>
                      {/* <p className="text-sm">{Candidate.Id}</p> */}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Email</h3>
                      {/* <p className="text-sm">{Candidate.Email}</p> */}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Phone</h3>
                      {/* <p className="text-sm">{Candidate.Phone}</p> */}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Address</h3>
                      <p className="text-sm">{Candidate.Address}</p>
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
                  <CardDescription>Candidate Abcentisme</CardDescription>
                </CardHeader>
                <CardContent>
                  <CustomTable headres={headres} data2={absenciese} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <DashHeader handleSearch={handleSearch} Candidate={Candidate} />
          <div className="flex flex-col items-center justify-center mt-10 h-1/2">
            <h1 className="text-2xl font-semibold">Search for an Candidate</h1>
            <p className="text-sm text-neutral-500">
              Search for an Candidate to view their profile
            </p>
            <div>
              <div className="flex flex-row items-center gap-4 mt-4">
                <CustomTable
                  headres={[
                    "Nom",
                    "Prenom",
                    "Accepted",
                    "Pr_ID",
                    "Status",
                    "ApplicationSource",
                  ]}
                  data2={data}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <GlobalButton
          onClick={() =>
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
          color="primary"
          aria-label="add"
        >
          <Plus />
        </GlobalButton>
      </div>
      <Wallettype
        isOpen={alert.isOpen}
        onSubmit={async () => {
          if (formstep === 1) {
            setFormStep(2);
            return;
          } else {
            setAlert((prev) => ({ ...prev, isLoading: true }));
            console.log(formdata);
            await fetch("/api/Candidates", {
              method: "POST",
              body: JSON.stringify(formdata),
              headers: {
                "Content-Type": "application/json",
              },
            });
            // await addCandidat(alert.walletName, alert.walletAddress);
            setAlert((prev) => ({ ...prev, isLoading: false, isOpen: false }));
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
                onChange={(e) =>{
                  if(e.target.value.length >= 6 ){
                    setFormdata({ ...formdata, Pr_ID: Number(e.target.value) })
                            isValidPr(e.target.value);
                  }
                }
                }
              />
            </div>
            <input
              type="number"
              placeholder="Experience"
              className="h-12 p-2 border-gray-400 rounded"
              onChange={(e) =>{
  
                  setFormdata({ ...formdata, Experience: Number(e.target.value) })
          

              }
              }
            
            />
          </div>
        )}
      </Wallettype>
    </main>
  );
};

export default Candidate;
