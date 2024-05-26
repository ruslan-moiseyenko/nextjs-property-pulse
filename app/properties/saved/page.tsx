"use client";

import React, { useEffect, useState } from "react";
import { PropertyCard, PropertyType } from "@/components/PropertyCard";
import { Spinner } from "@/components/Spinner";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await fetch("/api/bookmarks");
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.log(response.status);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  useEffect(() => {
    console.log(properties);
  }, [properties]);
  return isLoading ? (
    <Spinner loading={isLoading} />
  ) : (
    <section className="px-4 py-6">
      <div className="text-center">
        <h1 className="mb4  text-2xl">Saved Properties</h1>
      </div>
      <div className="container-xl m-auto px-4 py-6 lg:container">
        {properties?.length === 0 ? (
          <div>No saved properties found</div>
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

export default SavedPropertiesPage;
