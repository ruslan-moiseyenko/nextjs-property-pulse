"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { MessageItem, MessageType } from "@/components/MessageItem";

export function MessagesList() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");

        if (response.status === 200) {
          const data = await response.json();

          setMessages(data);
        }
      } catch (error) {
        console.error("Error catching messages: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-6xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <h1 className="mb-4 text-3xl font-bold">Your Messages</h1>
          {messages.length === 0 ? (
            <p>No messages found</p>
          ) : (
            messages.map((message) => (
              <MessageItem key={message._id} message={message} />
            ))
          )}
          <div className="space-y-4"></div>
        </div>
      </div>
    </section>
  );
}
