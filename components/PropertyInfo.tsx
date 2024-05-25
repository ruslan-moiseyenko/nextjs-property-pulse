import { ButtonBookmark } from "@/components/ButtonBookmark";
import { ButtonsShare } from "@/components/ButtonsShare";
import { PropertyType } from "@/components/PropertyCard";
import { PropertyContactForm } from "@/components/PropertyContactForm";
import { PropertyDetails } from "@/components/PropertyDetails";
import React, { FC } from "react";

export type PropertyInfoType = {
  property: PropertyType;
};

export const PropertyInfo: FC<PropertyInfoType> = ({ property }) => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto px-6 py-10">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-70/30">
          <PropertyDetails property={property} />

          {/* <!-- Sidebar --> */}
          <aside className="space-y-4">
            <ButtonBookmark property={property} />
            <ButtonsShare property={property} isPrimary={false}>
              Share Property
            </ButtonsShare>

            <PropertyContactForm property={property} />
          </aside>
        </div>
      </div>
    </section>
  );
};
