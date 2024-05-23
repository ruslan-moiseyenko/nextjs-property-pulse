import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

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

export const PUT = async (
  request: NextRequest,
  context: { params: Params },
) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.id) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id } = context.params;
    const userId = sessionUser.id;

    const formData = await request.formData();

    const amenities = formData.getAll("amenities");

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response("Property does not exist", { status: 404 });
    }

    // Verify ownership

    if (existingProperty.owner?.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //create data object for DB
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
      // images: [] as string[],
    };

    // update existing property in DB
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
    });
  }
};
