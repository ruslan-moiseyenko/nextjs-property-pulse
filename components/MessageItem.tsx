import { dateFormat } from "@/utils/dateFormat";
import React from "react";

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
  return (
    <div className="relative rounded-md border border-gray-200 bg-white p-4 shadow-md">
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
      <button className="mr-3 mt-4 rounded-md bg-blue-500 px-3 py-1 text-white">
        Mark As Read
      </button>
      <button className="mt-4 rounded-md bg-red-500 px-3 py-1 text-white">
        Delete
      </button>
    </div>
  );
}
