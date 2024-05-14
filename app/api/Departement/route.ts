import { streamToString } from "@/package/functions/StreamtoString";
import Departement from "../../../Models/Departements";
import connect from "../../../package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import Departements from '../../../Models/Departements';
import {  CandidateByDepartment } from "@/package/functions/CandidatsByDepartement";
async function GET(req: NextApiRequest) {
  try {
    await connect();
    const urlSearchParams = new URLSearchParams(req.url?.split("?")[1]);
    const page = urlSearchParams.get("page");
    console.log(page);
    const DepartementsData = await Departement.find({})
      .skip((parseInt(page as string) - 1) * 9)
      .limit(9);
    const DepartementsCount = await Departement.countDocuments({});
    //how many candidates we have in each departement
    const totalCandidatsbyDepartement = await CandidateByDepartment();
   const totalCandidatesMap = totalCandidatsbyDepartement?.reduce(
     (map, item) => {
       map[item._id] = item.totalCandidates;
       return map;
     },
     {}
   );
   // Map over DepartementsData and add totalCandidates to each department object
   const dataWithTotalCandidates = DepartementsData.map((department) => {
     return {
       ...department.toObject(), // Convert Mongoose document to plain object
       totalCandidates: totalCandidatesMap[department.Nom] || 0, // Add totalCandidates field, defaulting to 0 if not found
      };
    });



    return NextResponse.json({
      data: dataWithTotalCandidates,
      count: DepartementsCount,
      message: "Hello from Employees",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function POST(req: NextRequest) {
  try {
    await connect();
    const data = await streamToString(req.body);
    const dataObj = JSON.parse(data);
    for (const key in dataObj) {
      if (
        dataObj[key] === "" ||
        dataObj[key] === null ||
        dataObj[key] === undefined ||
        dataObj[key] === 0
      ) {
        dataObj[key] = "Pending";
      }
    }
    const departement = new Departement(dataObj);
    const savedDepartement = await departement.save();
    return NextResponse.json({
      data: savedDepartement,
      message: "Departement saved successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
async function PUT(req: NextRequest) {
  try {
    await connect();
    const data = await streamToString(req.body);
    const dataObj = JSON.parse(data);
    const departement = await Departement.findOneAndUpdate(
      { _id: dataObj._id },
      dataObj,
      { new: true }
    );
    return NextResponse.json({
      data: departement,
      message: "Departement updated successfully",
    });
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export { GET,POST,PUT};
