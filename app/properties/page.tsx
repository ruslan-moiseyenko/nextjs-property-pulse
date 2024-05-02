import React from "react";

import { PropertyCard, PropertyType } from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";

const PropertiesPage = async () => {
  const properties = await fetchProperties();
  console.log("🚀 ~ PropertiesPage ~ properties:", properties);

  properties?.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties?.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.map((item: PropertyType) => (
              <PropertyCard key={item._id} property={item as PropertyType} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
