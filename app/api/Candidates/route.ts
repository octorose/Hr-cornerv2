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

async function POST(req: NextRequest) {
  try {
    await connect();

    return NextResponse.json({  message: "Candidat Created"+req.body});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { GET, POST };
