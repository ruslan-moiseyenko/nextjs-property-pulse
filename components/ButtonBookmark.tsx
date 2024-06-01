"use client";

import React, { FC, useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { PropertyType } from "@/components/PropertyCard";
import { useSession } from "next-auth/react";

type ButtonBookmarkProps = {
  property: PropertyType;
};

export const ButtonBookmark: FC<ButtonBookmarkProps> = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const checkBookmarkStatus = async () => {
      try {
        const response = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });

        if (response.status === 200) {
          const data = await response.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("Please sign in");
      return;
    }

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (isLoading)
    return (
      <button
        onClick={handleClick}
        className={`flex w-full items-center justify-center rounded-full  px-4 py-2 font-bold text-black outline`}
      >
        Loading...
      </button>
    );

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center justify-center rounded-full  ${isBookmarked ? "bg-red-500 hover:bg-red-600" : "bg-blue-100 hover:bg-blue-600"} px-4 py-2 font-bold text-white `}
    >
      <FaBookmark className=" mr-2"></FaBookmark>
      {isBookmarked ? "Delete From Bookmarks" : "Bookmark Property"}
    </button>
  );
};
