// "use server";
import connect from "@/package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import Candidats from '../../../Models/Candidats';
import { NextApiRequest, NextApiResponse } from "next"; 
import {CandidatIdGenerator} from "@/package/functions/PendingCandidatIdGenerator";
import { streamToString } from "@/package/functions/StreamtoString";
async function GET(req: NextApiRequest) {
  try {
    await connect();
    const urlSearchParams = new URLSearchParams(req.url?.split("?")[1]);
    const page = urlSearchParams.get("page");
    console.log(page);
    const CandidatsData = await Candidats.find({})
      .skip((parseInt(page as string) - 1) * 10)
      .limit(10);
    const CandidatsCount = await Candidats.countDocuments({});
    //replace Candidats.ID = null to ""
    for (const candidat of CandidatsData) {
      if (candidat.ID === null) {
        candidat.ID = "Pending";
      }
    }

    
    return NextResponse.json({
      data: CandidatsData,
      count: CandidatsCount,
      message: "Hello from Employees",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connect();
    const data = await streamToString(req.body);
    const dataObj = JSON.parse(data);
    for (const key in dataObj) {    
      if (dataObj[key] === "" || dataObj[key] === null || dataObj[key] === undefined || dataObj[key] === 0) {
        if (key === "ID") {          
          dataObj[key] = null;
          continue;
        }
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
