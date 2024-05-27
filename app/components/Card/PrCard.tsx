import React from "react";

function Card({ Pr, onClick }: any) {

  return (
    <div
      onClick={onClick}
      className="group bg-slate-50 border rounded-2xl p-5 mg:p-5 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(0,_0,_0,_0.1)] cursor-pointer hover:shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(0,_0,_0,_0.2)] transition-all duration-70000 ease-in-out "
    >
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">{Pr.Pr_Id}</h1>
        <div>
          {Pr.Cloture === "No" ? (
            <div className="bg-green-600 rounded-3xl w-2 h-2"></div>
          ) : Pr.Cloture === "Yes" ? (
            <div className="bg-red-600 rounded-3xl w-2 h-2"></div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex gap-1 mg:gap-10 justify-around">
        <div className="text-center">
          <p className="text-6xl mg:text-8xl text-orange-500">
            {Pr.totalCandidates}
          </p>
          <p className="text-sm text-blue-950 font-medium">Candidates</p>
        </div>
        <div className="bg-orange-500 w-[0.5%] rounded-xl "></div>
        <div className="gap-2 flex flex-col">
          {/* manager */}
          <div>
            <p className="text-1xl font-bold text-blue-950">Departement</p>
            <p className="text-sm text-blue-900">{Pr.Departement}</p>
          </div>
          <div>
            <p className="text-1xl text-orange-500">Validated at</p>
            <p className="text-sm text-orange-500">{Pr.Validation_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
