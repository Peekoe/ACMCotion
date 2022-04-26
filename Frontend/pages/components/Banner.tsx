import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="flex justify-center py-7 w-[100%] rounded-xl h-[500px] bg-pink-500 text-white font-semibold">
      <div className="text-center text-[1.5rem]">
        <p> Organize your classes </p>
        <p> in an easier way </p>
      </div>
    </section>
  );
};

export default Banner;
