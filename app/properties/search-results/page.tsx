"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyType } from "@/components/PropertyCard";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { PropertyCard } from "@/components/PropertyCard";
import { Spinner } from "@/components/Spinner";
import { PropertySearchForm } from "@/components/PropertySearchForm";

const SearchResultsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const kindOfProperty = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `/api/properties/search?location=${location}&propertyType=${kindOfProperty}`,
        );
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.log(response.status);
          toast.error("Failed to fetch search results");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch search results");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, kindOfProperty]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-4 sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl m-auto px-4 py-6 lg:container">
            <Link
              href="/properties"
              className="mb-3 flex items-center text-blue-100 hover:underline"
            >
              <FaArrowAltCircleLeft className="mb-1 mr-2" />
              Back To Properties
            </Link>
            <h1 className="mb-4 text-2xl">Search Results</h1>
            {properties?.length === 0 ? (
              <p>Nothing found</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {properties?.map((item: PropertyType) => (
                  <PropertyCard
                    key={item._id}
                    property={item as PropertyType}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultsPage;
