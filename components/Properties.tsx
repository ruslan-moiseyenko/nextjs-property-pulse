"use client";
import { PropertyCard, PropertyType } from "@/components/PropertyCard";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Pagination } from "@/components/Pagination";

export const Properties = () => {
  const [properties, setProperties] = useState<PropertyType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`,
        );
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data.properties);
          setTotalItems(data.total);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return isLoading ? (
    <Spinner />
  ) : (
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
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </section>
  );
};
