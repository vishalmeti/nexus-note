import Image from "next/image";
import React from "react";

const Heros = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/documents.png"
            fill
            className="objet-contain dark:hidden"
            alt="Documents"
          />
          <Image
            src="/documents-dark.png"
            fill
            className="objet-contain hidden dark:block"
            alt="Documents"
          />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image
            className="object-conatin dark-hidden"
            alt="reading"
            src="/reading.png"
            fill
          />
          <Image
            className="object-conatin hidden dark:block"
            alt="reading"
            src="/reading-dark.png"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Heros;
