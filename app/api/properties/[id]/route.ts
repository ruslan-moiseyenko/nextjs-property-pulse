import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (request: Request, context: { params: Params }) => {
  const id = context.params.id;

  try {
    await connectDB();

    const property = await Property.findOne({ _id: id });

    if (!property) return new Response("Property not found", { status: 404 });

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    return new Response("Something went wrong...", { status: 500 });
  }
};

export const DELETE = async (request: Request, context: { params: Params }) => {
  const propertyId = context.params.id;

  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.id) {
      return new Response("User ID is required", { status: 401 });
    }

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) return new Response("Property not found", { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== sessionUser.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted", { status: 200 });
  } catch (err) {
    return new Response("Something went wrong...", { status: 500 });
  }
};
