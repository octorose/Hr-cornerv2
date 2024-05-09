// "use server";
import connect from "@/package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import pr from "../../../Models/Pr";

async function GET(req: NextRequest) {
  try {
    console.log("GET Request");
    
    await connect();
    
    // Fetch data from the database
    const prData = await pr.find({}); // Only fetch Pr_Id field and exclude _id field

    // Extract Pr_Ids from the fetched data
    const prIds = prData.map((item:any) => item["_doc"].Pr_Id);
    
    
    return NextResponse.json({
      data: prIds,
      message: "Got Pr_Ids Here",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { GET };
