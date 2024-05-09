import { streamToString } from "@/package/functions/StreamtoString";
import Departement from "../../../Models/Departements";
import connect from "../../../package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
async function GET(req: NextRequest) {
  try {
    await connect();
    const DepartementsData = await Departement.find({});
    // console.log(DepartementsData);

    return NextResponse.json({
      data: DepartementsData,
      message: "Hello from Departements",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// async function streamToString(stream: any) {
//   const chunks = [];
//   for await (const chunk of stream) {
//     chunks.push(chunk);
//   }
//   return Buffer.concat(chunks).toString("ascii");
// }
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
