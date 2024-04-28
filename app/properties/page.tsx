import React from "react";
import propertiesDB from "@/data/properties.json";
import Image from "next/image";

import { PropertyCard, PropertyType } from "@/components/PropertyCard";

const PropertiesPage = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {propertiesDB.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {propertiesDB.map((item) => (
              <PropertyCard key={item._id} property={item as PropertyType} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
