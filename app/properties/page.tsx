import React from "react";

import { PropertyCard, PropertyType } from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";

const PropertiesPage = async () => {
  const properties = await fetchProperties();

  properties?.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return (
    <section className="px-4 py-6">
      <div className="container-xl m-auto px-4 py-6 lg:container">
        {properties?.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
