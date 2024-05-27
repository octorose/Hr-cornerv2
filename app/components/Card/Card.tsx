import React from 'react'

function Card({ Departement, onClick }:any) {
    
  const reformuledate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  };
  return (
    <div
      onClick={onClick}
      className="group bg-slate-50 border rounded-2xl p-5 mg:p-5 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(0,_0,_0,_0.1)] cursor-pointer hover:shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(0,_0,_0,_0.2)] transition-all duration-70000 ease-in-out "
    >
      <h1 className="text-lg text-neutral-500 font-semibold">
        {Departement.Nom}
      </h1>
      <div className="flex gap-1 mg:gap-10 justify-around">
        <div className="text-center">
          <p className="text-4xl mg:text-8xl text-orange-500 ">
            {Departement.totalCandidates}
          </p>
          <p className="text-sm text-blue-950 font-medium">Candidates</p>
        </div>
        <div className="bg-orange-500 w-[0.5%] rounded-xl "></div>
        <div className="gap-2 flex flex-col">
          {/* manager */}
          <div>
            <p className="text-1xl font-bold text-blue-950">Manager</p>
            <p className="text-sm text-blue-900">{Departement.manager}</p>
          </div>
          <div>
            <p className="text-1xl text-orange-500">Created at</p>
            <p className="text-sm text-orange-500">
              {reformuledate(Departement.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card