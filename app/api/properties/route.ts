import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (request: Request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    return new Response("Something went wrong...", { status: 500 });
  }
};
