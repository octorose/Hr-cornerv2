// "use server";
import connect from "@/package/MongoDb/db";
import { NextRequest, NextResponse } from "next/server";
import Departement from "../../../../Models/Departements";
async function GET(req: NextRequest) {
  try {
    await connect();
    const DepartementData = await Departement.find({});
    // console.log(DepartementData);

    return NextResponse.json({
      data: DepartementData,
      message: "Hello from Employees",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { GET };
