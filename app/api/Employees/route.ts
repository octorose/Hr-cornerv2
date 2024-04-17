// "use server";

import { NextRequest, NextResponse } from "next/server";

async function GET(req: NextRequest) {
  console.log(req);
  
  return NextResponse.json(
    { key: "value" },
    {
      status: 200,
    }
  );
}

export { GET };
