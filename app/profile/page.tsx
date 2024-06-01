"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import profileDefaultImage from "@/assets/images/profile.png";
import { Spinner } from "@/components/Spinner";
import { PropertyType } from "@/components/PropertyCard";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status == 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log("🚀 ~ fetchUserProperties ~ error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch if session is available
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirm) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.status === 200) {
        const updatedProperties = properties.filter((item) => item._id !== id);
        setProperties(updatedProperties);
        toast.success("Property deleted");
      } else {
        toast.error("Failed to delete property.");
      }
    } catch (error) {
      toast.error("Failed to delete property.");
    }
  };

  return (
    <section className="bg-blue-100">
      <div className="container m-auto py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <h1 className="mb-4 text-3xl font-bold">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="mx-20 mt-10 md:w-1/4">
              <div className="mb-4">
                <Image
                  className="mx-auto h-32 w-32 rounded-full md:mx-0 md:h-48 md:w-48"
                  src={profileImage || profileDefaultImage}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className="mb-4 text-2xl">
                <span className="block font-bold">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="block font-bold">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="mb-4 text-xl font-semibold">Your Listings</h2>
              {!isLoading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {isLoading ? (
                <Spinner loading={isLoading} />
              ) : (
                properties.map((item) => (
                  <div key={item._id} className="mb-10">
                    <Link href={`/property/${item._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        // @ts-ignore
                        src={item.images[0]}
                        alt=""
                        width={500}
                        height={100}
                        priority
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-gray-600">
                        {`Address: ${item.location.street} ${item.location.city}
                        ${item.location.state}`}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${item._id}/edit`}
                        className="mr-2 rounded-md bg-blue-100 px-3 py-3 text-primary hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        className="rounded-md bg-red-500 px-3 py-2 text-primary hover:bg-red-600"
                        type="button"
                        onClick={() => handleDeleteProperty(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}

              <div className="mb-10">
                <Link href="/property">
                  <Image
                    className="h-32 w-full rounded-md object-cover"
                    src="/images/properties/b1.jpg"
                    alt="Property 2"
                    width={200}
                    height={200}
                  />
                </Link>
                <div className="mt-2">
                  <p className="text-lg font-semibold">Property Title 2</p>
                  <p className="text-gray-600">Address: 456 Elm St</p>
                </div>
                <div className="mt-2">
                  <Link
                    href="/add-property"
                    className="mr-2 rounded-md bg-blue-100 px-3 py-3 text-primary hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    className="rounded-md bg-red-500 px-3 py-2 text-primary hover:bg-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
