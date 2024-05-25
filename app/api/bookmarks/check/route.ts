import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser?.id) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id: userId } = sessionUser;

    // Find user in DB
    const user = await User.findById(userId);

    if (!user) {
      return new Response("User is not found", { status: 401 });
    }

    let isBookmarked = user?.bookmarks?.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ POST check ~ error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
