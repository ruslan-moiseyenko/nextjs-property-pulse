"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import { PropertyType } from "@/components/PropertyCard";

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Promise<PropertyType | null>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  }, [id]);

  return <div>PropertyPage</div>;
};

export default PropertyPage;
