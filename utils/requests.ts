import { PropertyType } from "@/components/PropertyCard";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

//fetch all properties
export async function fetchProperties(): Promise<PropertyType[] | undefined> {
  if (!apiDomain) return [];

  try {
    const res = await fetch(`${apiDomain}properties`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

//fetch single property

export async function fetchPropertyById(
  id: string,
): Promise<PropertyType | null> {
  if (!apiDomain) return null;

  try {
    const res = await fetch(`${apiDomain}properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
