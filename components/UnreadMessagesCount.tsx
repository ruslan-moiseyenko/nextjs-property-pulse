"use client";

import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

export function UnreadMessagesCount() {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch("/api/messages/unread-count");
        if (response.status === 200) {
          const count = await response.json();
          setUnreadCount(count);
        }
      } catch (error) {
        console.error("Error fetching unread count: ", error);
      }
    };
    fetchUnreadCount();
  }, [setUnreadCount]);

  return unreadCount > 0 ? (
    <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-white">
      {unreadCount}
    </span>
  ) : null;
}
