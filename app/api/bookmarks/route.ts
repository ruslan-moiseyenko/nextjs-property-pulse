import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET all bookmarks

export const GET = async () => {
  try {
    await connectDB();

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

    //Get users bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    return new Response("Couldn't get bookmarks", { status: 500 });
  }
};

//add new bookmark
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

    let message: string;
    // toggle bookmarks
    if (isBookmarked) {
      // If already bookmarked, remove it
      user.bookmarks?.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      // console.log("🚀 ~ POST ~ user:", user);
      if (!user.bookmarks) {
        user.bookmarks = [];
      }
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Couldn't add bookmarks", { status: 500 });
  }
};
