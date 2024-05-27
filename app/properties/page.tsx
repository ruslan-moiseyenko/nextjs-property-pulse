import React from "react";

import { PropertyCard, PropertyType } from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import { PropertySearchForm } from "@/components/PropertySearchForm";

const PropertiesPage = async () => {
  const properties = await fetchProperties();

  properties?.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-4 sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
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
    </>
  );
};

export default PropertiesPage;
