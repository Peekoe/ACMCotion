import Image from "next/image";
import React from "react";
import CalendarIcon from "../../assets/calendar.svg";
import Logo from "../../assets/iconlogo.svg";
import BannerDecor from "../../assets/bannerDecor.svg";

export const Banner: React.FC = () => {
  return (
    <section className="grid grid-cols-[1.2fr,1.2fr,0.8fr] items-center py-7 w-[100%] rounded-xl h-[500px] bg-pink-500 text-white font-semibold">
      <div className="max-w-[24em] max-h-[24em] ml-10">
        <Image src={Logo} alt="Banner logo"/>
      </div>
      <div className="flex items-center flex-col text-center text-[2.25rem]">
        <BannerHeader />
      </div>
      <div className="absolute overflow-hidden right-[-2rem] top-[7rem]">
        <Image src={BannerDecor} alt="Banner decoration" />
      </div>
    </section>
  );
};

export const BannerHeader: React.FC = () => {
  return (
    <>
      <div className="mb-5">
        <p> Organize your classes </p>
        <p> in an easier way </p>
      </div>
      <Image src={CalendarIcon} alt="calendar icon"/>
      <button className="w-[40%] mt-5 cursor-pointer hover:bg-white/80 transition-ease-in-out duration-500 font-semibold text-[1.25rem] p-2 text-pink-500 bg-white rounded-xl">
        Get Started
      </button>
    </>
  );
};
