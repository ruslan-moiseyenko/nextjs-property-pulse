import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

import React from "react";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return session.user;
  } catch (err) {
    console.log("🚀 ~ getSessionUser ~ err:", err);
    return null;
  }
};
