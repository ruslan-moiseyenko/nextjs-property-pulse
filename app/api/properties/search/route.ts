import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/search
export const GET = async (request: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const kindOfProperty = searchParams.get("propertyType");

    const locationPattern = new RegExp(location ? location : "", "i");

    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // only check for property type if it's not "All"

    if (kindOfProperty && kindOfProperty !== "All") {
      const typePattern = new RegExp(kindOfProperty, "i");
      //@ts-ignore
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("Couldn't find any properties...", { status: 500 });
  }
};
