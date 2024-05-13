import connectDB from "@/config/database";
import Property from "@/models/Property";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";


//GET /api/properties/user/:userId
export const GET = async (request: Request, { params }: Params) => {
  try {
    await connectDB();
    const userId = params.userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    return new Response("Something went wrong...", { status: 500 });
  }
};
