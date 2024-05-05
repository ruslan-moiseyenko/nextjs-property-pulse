import connectDB from "@/config/database";
import Property from "@/models/Property";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (request: Request, context: { params: Params }) => {
  const id = context.params.id;

  try {
    await connectDB();

    const property = await Property.findOne({ _id: id });

    if (!property) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong...", { status: 500 });
  }
};
