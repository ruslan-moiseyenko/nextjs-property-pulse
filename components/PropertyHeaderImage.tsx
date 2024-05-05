import Image from "next/image";
import React, { FC } from "react";

type PropertyImageHeaderType = {
  image: string;
};

export const PropertyHeaderImage: FC<PropertyImageHeaderType> = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={`/images/properties/${image}`}
            alt=""
            className="h-[400px] w-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};
