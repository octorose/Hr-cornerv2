import { it } from "node:test";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "@/styles/pagination.css";
import useAlert from "@/Hooks/useAlert";
import Wallettype from "@/components/GlobalModal/Wallettype";
import { EditIcon, Loader2 } from "lucide-react";
import Loader from "@/components/Loaders/Loader";
import DashHeader from "../Header/DashHeader";
interface FormData {
  [key: string]: string; // Define the type of formData to have string keys and string values
}
interface TableHeaderProps {
  header: string;
  index: number;
  totalHeaders: number;
}
const TableHeader: React.FC<TableHeaderProps> = ({
  header,
  index,
  totalHeaders,
}) => {
  const isFirst = index === 0;
  const isLast = index === totalHeaders - 1;

  const classNames = `py-3.5 pl-4 pr-3 text-center font-medium text-sm text-neutral-500
  ${isFirst ? "rounded-l-xl" : ""}
  ${isLast ? "rounded-r-xl" : ""}`;

  return <th className={classNames}>{header}</th>;
};

function CustomTable({ headres  }: { headres: string[],data2?:any }) {
  const perpage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [phase, setPhase] = useState(1);
  const [editMode, setEditMode] = useState(Array(15).fill(false));
  const [data2, setData] = useState();
  const [CandidatetoEdit, setCandidatetoEdit] = useState({} as any);
  let fetched: any;
  const totalPages = Math.ceil((data2 as any)?.count / perpage);
  const { alert, setAlert } = useAlert();
  const handleEdit = (index: any) => {
    const updatedEditMode = [...editMode];
    if (updatedEditMode[index]) {
      updatedEditMode[index] = false;
    } else {
      updatedEditMode[index] = true;
    }
    setEditMode(updatedEditMode);
  };
  const SetToFalse = () => {
    setEditMode(Array(15).fill(false));
  };
const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  key: string
) => {
  setCandidatetoEdit((prevCandidatetoEdit:any) => ({
    ...prevCandidatetoEdit,
    [key]: event.target.value,
  }));
};

  const renderPhaseFields = (fields: any) => (
    <div className="grid grid-cols-2 gap-5 p-4">
      {Object.keys(fields).map((key, index) => (
        <div key={index} className="text-slate-900">
          <div>
            <h2 className="font-semibold">{key}</h2>
            {editMode[index] ? (
              <input
                type="text"
                onChange={(event) => handleInputChange(event, key)}
                className="w-full p-2 border border-neutral-200 rounded-lg"
              />
            ) : (
              <div className="flex flex-row items-center justify-between">
                <h2>
                  {CandidatetoEdit[key]?.toString().length > 10
                    ? CandidatetoEdit[key].toString().slice(0, 6) + "..."
                    : CandidatetoEdit[key]}
                </h2>
                <EditIcon
                  className="w-6 h-6"
                  onClick={() => handleEdit(index)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  const personalInfo = {
    Nom: CandidatetoEdit.Nom,
    Prenom: CandidatetoEdit.Prenom,
    Date_naissance: CandidatetoEdit.Date_naissance,
    Addresse: CandidatetoEdit.Addresse,
    Sexe: CandidatetoEdit.Sexe,
  };
  const ApplicationInfo = {
    CV_Select: CandidatetoEdit.CV_Select,
    ApplicationSource: CandidatetoEdit.ApplicationSource,
    Pr_ID: CandidatetoEdit.Pr_ID,
    Candidt_Decline: CandidatetoEdit.Candidt_Decline,
  };
  const InterviewsInfo = {
    Accepted: CandidatetoEdit.Accepted,
    AcceptedE1: CandidatetoEdit.AcceptedE1,
    AcceptedE2: CandidatetoEdit.AcceptedE2,
    AcceptedE3: CandidatetoEdit.AcceptedE3,
  };
  const ProfessionalInfo = {
    ID: CandidatetoEdit.ID,
    Status: CandidatetoEdit.Status,
    Date_creation_Contrat: CandidatetoEdit.Date_creation_Contrat,
    Type_contract: CandidatetoEdit.Type_contract,
  };
  const UpdateCandidate = async (CandidatetoEdit: any) => {
    try {
      const response = await fetch(`/api/Candidates/Update?id=${CandidatetoEdit.ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CandidatetoEdit),
      });
      if (!response.ok) {
        throw new Error("Failed to update candidate");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

const fetchData = async () => {
  try {
    setisLoading(true);
    const response = await fetch(`/api/Candidates?page=${currentPage}`);
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
const filterCandidateByName = async (name: string) => {
  console.log(data2);
  
  try{
  setisLoading(true);
  const allCandidates = await fetch("/api/Candidates/All");
  if(!allCandidates.ok){
    throw new Error("Failed to fetch data")
  }
  const data = await allCandidates.json();
  const filtreddata =  {
    data: data.data.filter((candidate:any) => candidate.Nom.toLowerCase().includes(name.toLowerCase()))
  }
  console.log(filtreddata);
  // @ts-ignore
    setData(filtreddata);
    setisLoading(false);
      console.log(data2);

  } catch (error) {
    console.error(error);
  }
  return data2;
};
  useEffect(() => {
    fetched = fetchData();
    console.log(fetched);
  }, [currentPage]);
    const handleSubmit =async () => {
      if (phase === 3) {
        SetToFalse();
        console.log("Submit form with data:", CandidatetoEdit);
        await UpdateCandidate(CandidatetoEdit);
        setCurrentPage(currentPage);
        fetchData();
        setAlert((prev) => {
          return {
            ...prev,
            isOpen: false,
          };
        });
      } else {
        setPhase(phase + 1);
        SetToFalse();
      }
    };
  return (
    <div className="w-full mx-[10%]">
      {!isLoading ? (
        <div>
          <DashHeader handleSearch={filterCandidateByName} Candidate={data2} />
          <div className="flex justify-center">
            <table className=" ">
              <thead className="rounded-t-xl rounded-b-xl">
                <tr className="rounded-lg h-12 flex-shrink-0 bg-ft-gray-dark-blue rounded-t-xl rounded-b-xl">
                  {headres?.map((header, index) => (
                    <TableHeader
                      key={index}
                      header={header}
                      index={index}
                      totalHeaders={headres.length}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {data2 &&
                  // @ts-ignore
                  data2?.data?.map(
                    (item: any, index: React.Key | null | undefined) => (
                      <tr
                        key={index}
                        className="p-2 text-center rounded-t-lg rounded-b-lg text-neutral-500 hover:border-ft-lt/30 cursor-pointer"
                      >
                        {Object.values(item).map((value, index) =>
                          index < headres.length ? (
                            <td
                              key={index}
                              className="py-4 px-6 border-b border-neutral-200"
                              onClick={() => {
                                console.log(
                                  item["Date_naissance"].toString().slice(0, 6)
                                );
                                setCandidatetoEdit(item),
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
                                  });
                              }}
                            >
                              {item[headres[index]]}
                            </td>
                          ) : null
                        )}
                      </tr>
                    )
                  )}
              </tbody>
            </table>
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
      <Wallettype
        isOpen={alert.isOpen}
        onSubmit={() => {
          handleSubmit();
        }}
        onCancel={() => {
          setAlert((prev) => ({ ...prev, isOpen: false }));
        }}
        alertTitle={
          "Edit " + CandidatetoEdit?.Nom + " Details" || "Candidate" + "Details"
        }
        alertDescription={"Edit "}
        submitBtnName={phase === 3 ? "Submit" : "Next"}
        cancelBtnName="Cancel"
        type="success"
        onClose={() => {
          setAlert((prev) => ({ ...prev, isOpen: false }));
          setPhase(1);
        }}
      >
        {phase === 1 && renderPhaseFields(personalInfo)}
        {phase === 2 && renderPhaseFields(ApplicationInfo)}
        {phase === 3 && renderPhaseFields(InterviewsInfo)}
      </Wallettype>
    </div>
  );
}

export default CustomTable;
