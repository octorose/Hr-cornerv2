
import { getServerSession } from "next-auth/next";
import { options } from "@/api/auth/[...nextauth]";

const getSessionFromContext = async (context: any) => {
  const session = await getServerSession(
    context.req,
    context.res,
    options as any
  );
  return session;
};

export default getSessionFromContext;
