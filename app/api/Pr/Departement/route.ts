import connect from "@/package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import pr from "../../../../Models/Pr";
import { streamToString } from "@/package/functions/StreamtoString";
import { CandidaturesByPr } from "@/package/functions/CandidaturesByPr";
import Departements from "../../../../Models/Departements";

async function GET(req: NextRequest) {
  try {
    await connect();
    const urlSearchParams = new URLSearchParams(req.url?.split("?")[1]);
    const Departement = urlSearchParams.get("departement");

    const PrByDepartement = await pr.find({ Departement: Departement });
    const prIds = PrByDepartement.map((item: any) => item["_doc"].Pr_Id);
    const bypr = await CandidaturesByPr();
    //add bypr to prData
    PrByDepartement.forEach((item: any) => {
      item["_doc"].totalCandidates = bypr?.find(
        (x: any) => x.Pr_ID === item["_doc"].Pr_Id
      )?.totalCandidature;
    });
    return NextResponse.json({
      data: prIds,
      data2: PrByDepartement,
      message: "Got Pr_Ids Here",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { GET };
