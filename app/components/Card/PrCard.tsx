import React from "react";
import Departements from '../../../Models/Departements';

function Card({ Pr, onClick }: any) {
    let cloture = "Yes"
    console.log(Pr)
  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-gray-700/60 rounded-md p-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-1000 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)]"
    >
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">{Pr.Pr_Id}</h1>
        <div>
          { Pr.Cloture === "No" ? (
            <div className="bg-green-600 rounded-3xl w-2 h-2"></div>
          ) : Pr.Cloture === "Yes" ? (
            <div className="bg-red-600 rounded-3xl w-2 h-2"></div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-6 justify-start">
        <div className="text-center">
          <p className="text-9xl text-neutral-50 font-outline-2">{Pr.totalCandidates}</p>
          <p className="text-sm text-neutral-50">Candidates</p>
        </div>
        <div className="bg-white w-[0.5%] rounded-xl "></div>
        <div className="gap-2 flex flex-col">
          {/* manager */}
          <div>
            <p className="text-2xl text-neutral-400">Departement</p>
            <p className="text-sm text-neutral-400">{Pr.Departement}</p>
          </div>
          <div>
            <p className="text-2xl text-neutral-400">Validated at</p>
            <p className="text-sm text-neutral-400">{Pr.Validation_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
