// "use server";
import connect from "@/package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import roles from "../../../Models/Roles";
import { streamToString } from "@/package/functions/StreamtoString";
async function GET(req: NextRequest) {
  try {
    await connect();
    const rolesData = await roles.find({});

    return NextResponse.json({
      data: rolesData,
      message: "Got Posts Here",
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
    const role = new roles(dataObj);
    await role.save();
    return NextResponse.json({ message: "Role Created" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { GET, POST};
