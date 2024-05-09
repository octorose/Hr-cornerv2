// "use server";
import connect from "@/package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import pr from "../../../Models/Pr";
import { streamToString } from "@/package/functions/StreamtoString";

async function GET(req: NextRequest) {
  try {
    console.log("GET Request");
    
    await connect();
    const prData = await pr.find({}); 
    const prIds = prData.map((item:any) => item["_doc"].Pr_Id);
    
    return NextResponse.json({
      data: prIds,
      message: "Got Pr_Ids Here",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
async function POST(req: NextRequest) {
  try{
    console.log("POST Request");
    await connect();
    const data = await streamToString(req.body);
    const dataObj = JSON.parse(data);
    const prObj = new pr(dataObj);
    await prObj.save();
    return NextResponse.json({ message: "Pr Created" });
  }
  catch(error:any){
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
async function PUT(req: NextRequest) {
  try {
    console.log("PUT Request");
    await connect();
    const data = await streamToString(req.body);
    const dataObj = JSON.parse(data);
    const prObj = await pr.findOneAndUpdate(
      { Pr_Id: dataObj.Pr_Id },
      dataObj,
      { new: true }
    );
    return NextResponse.json({ message: "Pr Updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { GET,POST,PUT };
