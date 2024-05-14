import React from 'react'

function Card({ Departement }:any) {
    

  return (
    <div className="group bg-white dark:bg-gray-700/60 rounded-md p-2 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-1000 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)]">
      <h1 className="text-lg font-semibold">{Departement.Nom}</h1>
      <div className="flex gap-10 justify-start">
        <div className='text-center'>
          <p className="text-9xl text-neutral-50 font-outline-2">
            {Departement.totalCandidates}
          </p>
          <p className="text-sm text-neutral-50">Candidates</p>
        </div>
        <div className="bg-white w-[0.5%] rounded-xl "></div>
        <div className='gap-2 flex flex-col'>
          {/* manager */}
          <div>
              <p className="text-2xl text-neutral-400">manager</p>
              <p className="text-sm text-neutral-400">{Departement.manager}</p>
          </div>
          <div>
              <p className="text-2xl text-neutral-400">Created at</p>
              <p className="text-sm text-neutral-400">{Departement.created_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card