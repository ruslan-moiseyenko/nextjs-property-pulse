import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";

// GET /api/properties/featured
export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    // pagination
    const properties = await Property.find({ is_featured: true });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (err) {
    return new Response("Couldn't get featured properties...", { status: 500 });
  }
};
