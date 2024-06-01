"use client";

import { PropertyType } from "@/components/PropertyCard";
import { useSession } from "next-auth/react";
import React, { FC } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

type PropertyContactFormProps = {
  property: PropertyType;
};

export const PropertyContactForm: FC<PropertyContactFormProps> = ({
  property,
}) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      email,
      message,
      phone,
      recipient: property.owner,
      propertyId: property._id,
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        toast.success("Message sent successfully");
        setIsSubmitted(true);
      } else if (response.status === 400 || response.status === 401) {
        const responseData = await response.json();
        toast.error(responseData?.message);
      } else {
        toast.error("Error sending message");
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      toast.error("Error sending message");
    } finally {
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-6 text-xl font-bold">Contact Property Manager</h3>
      {!session ? (
        <p className="mb-4 text-red-500">Please login to send a message</p>
      ) : isSubmitted ? (
        <p className="mb-4 text-green-500">Your message has been sent!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="message"
            >
              Message:
            </label>
            <textarea
              className="focus:shadow-outline h-44 w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
              id="message"
              placeholder="Enter your message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
          </div>
          <div>
            <button
              className="focus:shadow-outline flex w-full items-center justify-center rounded-full bg-blue-100 px-4 py-2 font-bold text-primary hover:bg-blue-600 focus:outline-none"
              type="submit"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
