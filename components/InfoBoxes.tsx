import { InfoBox } from "@/components/InfoBox";
import React from "react";

export const InfoBoxes = () => {
  return (
    <>
      <section>
        <div className="container-xl m-auto lg:container">
          <div className="grid grid-cols-1 gap-4 rounded-lg p-4 md:grid-cols-2">
            <InfoBox
              buttonInfo={{
                text: "Browse Properties",
                link: "/properties",
                backgroundColor: "bg-black",
              }}
              heading="For Renters"
              backgroundColor="bg-gray-100"
              textColor=""
            >
              Find your dream rental property. Bookmark properties and contact
              owners.
            </InfoBox>
            <InfoBox
              buttonInfo={{
                text: "Add Property",
                link: "/properties/add",
                backgroundColor: "bg-blue-100",
              }}
              heading="For Property Owners"
              backgroundColor="bg-blue-100"
              textColor=""
            >
              List your properties and reach potential tenants. Rent as an
              airbnb or long term.
            </InfoBox>
          </div>
        </div>
      </section>
    </>
  );
};
