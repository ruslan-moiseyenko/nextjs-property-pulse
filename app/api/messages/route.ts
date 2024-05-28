import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET /api/messages
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

    const messages = await Message.find({ recipient: userId })
      .populate("sender", "username")
      .populate("property", "name");

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error while getting messages:", error);
    return new Response("Something went wrong...", { status: 500 });
  }
};
//POST /api/messages
export const POST = async (request: Request) => {
  try {
    await connectDB();

    const { name, email, phone, message, propertyId, recipient } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser?.id) {
      return new Response(
        JSON.stringify({ message: "Please login to send a message" }),
        { status: 401 },
      );
    }
    const { id: userId } = sessionUser;

    //forbid to send message to self
    if (recipient === userId) {
      return new Response("You can't send message to yourself", {
        status: 400,
      });
    }

    //@ts-ignore
    const messageDoc = await Message.create({
      recipient,
      name,
      email,
      phone,
      property: propertyId,
      body: message,
      sender: userId,
      read: false,
    });

    await messageDoc.save();

    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ POST ~ message send error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
};
