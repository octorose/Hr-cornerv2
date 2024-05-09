import Candidats from "../../../../Models/Candidats";
import { NextApiRequest, NextApiResponse } from "next";
import connect from "@/package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import { streamToString } from "@/package/functions/StreamtoString";


//update candidat
async function PUT(req: NextApiRequest , NextApiResponse: NextApiResponse) {
  try {
    await connect();
    const data = await streamToString(req.body);
    console.log(data);
    
    const dataObj = JSON.parse(data);
    const candidat = await Candidats.findOneAndUpdate(
      { ID: dataObj.ID },
      dataObj,
      { new: true }
    );
    return NextResponse.json({ message: "Candidat Updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export { PUT };