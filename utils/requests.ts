import { PropertyType } from "@/components/PropertyCard";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

const emptyResponse = { properties: [], total: 0 };

//fetch all properties
export async function fetchProperties(): Promise<
  { properties: PropertyType[]; total: number } | undefined
> {
  if (!apiDomain) return emptyResponse;

  try {
    const res = await fetch(`${apiDomain}properties`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (err) {
    console.error(err);
    return emptyResponse;
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
    console.error(err);
    return null;
  }
}
