"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPropertyById } from "@/utils/requests";
import { PropertyType } from "@/components/PropertyCard";
import { PropertyHeaderImage } from "@/components/PropertyHeaderImage";
import Link from "next/link";
import { PropertyInfo } from "@/components/PropertyInfo";

import { FaArrowLeft } from "react-icons/fa";
import { Spinner } from "@/components/Spiner";

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const propertyData = await fetchPropertyById(id);
        setProperty(propertyData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property not found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property?.images?.[0]} />
          <section>
            <div className="container m-auto px-6 py-6">
              <Link
                href="/properties"
                className="flex items-center text-blue-500 hover:text-blue-600"
              >
                <FaArrowLeft className="mr-2" />
                Back to Properties
              </Link>
            </div>
          </section>
          <PropertyInfo property={property} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
