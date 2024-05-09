// "use server";
import connect from "@/package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import Candidats from "../../../Models/Candidats";
async function GET(req: NextRequest) {
  try {
    await connect();
    const CandidatsData = await Candidats.find({});
    // console.log(CandidatsData);
    
    return NextResponse.json({data:CandidatsData, message: "Hello from Employees" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
async function streamToString(stream: any) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}
async function POST(req: NextRequest) {
  try {
    await connect();
    const data = await streamToString(req.body);
    //fill every empty item in the data with Pending
    const dataObj = JSON.parse(data);
    for (const key in dataObj) {
      if (dataObj[key] === "") {
        dataObj[key] = "Pending";
      }
    }
    const candidat = new Candidats(dataObj);
    await candidat.save();
    
    return NextResponse.json({  message: "Candidat Created"});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { GET, POST };
