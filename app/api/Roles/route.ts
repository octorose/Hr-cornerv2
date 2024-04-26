// "use server";
import connect from "@/package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import roles from "../../../Models/Roles";
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

export { GET };
