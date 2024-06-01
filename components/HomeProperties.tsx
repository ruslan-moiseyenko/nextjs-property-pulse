import React from "react";
import { PropertyCard } from "@/components/PropertyCard";
import Link from "next/link";
import { fetchProperties } from "@/utils/requests";

export const HomeProperties = async () => {
  const propertiesData = await fetchProperties();

  const resentProperties = propertiesData?.properties
    ?.sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <div>
      <section className="px-4 py-6">
        <div className="container-xl m-auto lg:container">
          <h2 className="mb-6 text-center text-3xl font-bold text-blue-100">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {resentProperties?.length === 0 ? (
              <p>Nothing found</p>
            ) : (
              resentProperties?.map((item) => (
                <PropertyCard key={item._id} property={item} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto my-10 max-w-lg px-6">
        <Link
          href="/properties"
          className="block rounded-xl bg-black px-6 py-4 text-center text-white hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </div>
  );
};
