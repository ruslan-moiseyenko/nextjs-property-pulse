import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/messages/unread-count
export const GET = async (request: Request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser?.id) {
      return new Response(JSON.stringify("User ID is required."), {
        status: 401,
      });
    }

    const { id: userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ GET ~ error while getting messages:", error);
    return new Response("Couldn't get unread messages count", { status: 500 });
  }
};
