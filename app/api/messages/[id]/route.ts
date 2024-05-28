import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const dynamic = "force-dynamic";

//GET /api/messages/[id]
export const PUT = async (request: Request, { params }: { params: Params }) => {
  try {
    await connectDB();
    const { id } = params;
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser?.id) {
      return new Response("User ID is required.", {
        status: 401,
      });
    }

    const message = await Message.findById(id);
    if (!message) return new Response("Message not found", { status: 404 });

    // verify ownership
    if (message.recipient.toString() !== sessionUser.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    //Toggle read status
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error while getting a message:", error);
  }
};
