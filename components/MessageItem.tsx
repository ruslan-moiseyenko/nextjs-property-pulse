"use client";

import { dateFormat } from "@/utils/dateFormat";
import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { toast } from "react-toastify";

export type MessageType = {
  body: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  property: { _id: string; name: string };
  read: boolean;
  recipient: string;
  sender: { _id: string; username: string };
  updatedAt: string;
  _id: string;
};
type MessageItemProps = {
  message: MessageType;
};

export function MessageItem({ message }: MessageItemProps): JSX.Element {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: !isRead }),
      });

      if (response.status !== 200) {
        throw new Error("Failed to update message status");
      }

      const { read } = await response.json();

      setIsRead(read);
      setUnreadCount((prevCount: number) =>
        read ? prevCount - 1 : prevCount + 1,
      );
    } catch (error) {
      console.log("🚀 ~ handleReadClick ~ error:", error);
    }
  };
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (response.status !== 200) {
        toast.error("Could not delete message");
        throw new Error("Failed to delete message");
      }

      setIsDeleted(true);
      setUnreadCount((prevCount: number) =>
        isRead ? prevCount : prevCount - 1,
      );
      toast.success("Message deleted");
    } catch (error) {
      console.log("🚀 ~ handleReadClick ~ error:", error);
    }
  };

  if (isDeleted) {
    return <></>;
  }

  return (
    <div className="relative rounded-md border border-gray-200 bg-white p-4 shadow-md">
      {!isRead && (
        <div className="absolute right-2 top-2 rounded-md bg-yellow-500 px-1 py-1 text-white">
          New
        </div>
      )}
      <h2 className="mb-4 text-xl">
        <span className="font-bold">{`Property Inquiry: `}</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>{`Reply Email: `}</strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>{`Reply Phone: `}</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>{`Received: `}</strong> {dateFormat(message.createdAt)}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`${isRead ? "bg-gray-500" : "bg-blue-500  text-white"} mr-3 mt-4 rounded-md px-3 py-1`}
      >
        {`Mark As ${isRead ? "Unread" : "Read"}`}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 rounded-md bg-red-500 px-3 py-1 text-white"
      >
        Delete
      </button>
    </div>
  );
}
