import { FeaturedPropertyCard } from "@/components/FeaturedPropertyCard";
import { fetchFeaturedProperties } from "@/utils/requests";
import React from "react";

export const FeaturedProperties = async () => {
  const propertiesData = await fetchFeaturedProperties();

  return (
    propertiesData &&
    propertiesData.length > 0 && (
      <section className="bg-blue-50 px-4 pb-10 pt-6">
        <div className="container-xl m-auto lg:container">
          <h2 className="mb-6 text-center text-3xl font-bold text-blue-500">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {propertiesData?.map((item) => (
              <FeaturedPropertyCard key={item._id} property={item} />
            ))}
          </div>
        </div>
      </section>
    )
  );
};
