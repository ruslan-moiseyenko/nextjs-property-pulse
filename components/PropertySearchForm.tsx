"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export function PropertySearchForm() {
  const [location, setLocation] = useState("");
  const [kindOfProperty, setKindOfProperty] = useState("All");

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!location.trim() && kindOfProperty === "All") {
      router.push("/properties");
    } else {
      const query = `?location=${location}&propertyType=${kindOfProperty}`;
      router.push(`/properties/search-results${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-3 flex w-full max-w-2xl flex-col items-center md:flex-row"
    >
      <div className="mb-4 w-full md:mb-0 md:w-3/5 md:pr-2">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          id="location"
          placeholder="Enter Location (City, State, Zip, etc)"
          className="w-full rounded-lg bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring focus:ring-blue-100"
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <select
          value={kindOfProperty}
          onChange={(e) => setKindOfProperty(e.target.value)}
          id="property-type"
          className="w-full rounded-lg bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring focus:ring-blue-100"
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-blue-100 px-6 py-3 text-primary hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-100 md:ml-4 md:mt-0 md:w-auto"
      >
        Search
      </button>
    </form>
  );
}
