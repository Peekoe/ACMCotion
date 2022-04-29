import { NextPage } from "next";
import React, { useState } from "react";
import InputField from "./InputField";
import frontCircle from "../../assets/frontCircle.svg";
import backCircle from "../../assets/backCircle.svg";
import Image from "next/image";

const Form: NextPage = () => {
  const [canvasDomain, setCanvasDomain] = useState<string>("");
  const [canvasToken, setCanvasToken] = useState<string>("");
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const data = {
      canvasToken: canvasToken,
      canvasDomain: canvasDomain,
      timeZone: timeZone,
    };
    console.log(data);
  };
  return (
    <form
      onSubmit={(e) => submitForm(e)}
      className="relative mt-12 pt-12 rounded-md flex items-center flex-col justify-center"
      style={{
        width: "60%",
        background:
          "radial-gradient(134.27% 196.45% at 0% 0%, rgba(255, 102, 130, 0.7) 0%, rgba(196, 196, 196, 0) 100%, #FFFFFF 100%",
      }}
    >
      <div className="absolute left-[-4em] w-[9em] h-[9em]">
        <Image src={frontCircle} alt="3d sphere" />
      </div>
      <div className="absolute right-[-4em] z-[-3] bottom-[-4em] w-[9em] h-[9em]">
        <Image src={backCircle} alt="3d sphere" />
      </div>
      <InputField placeholder="Canvas Domain" setState={setCanvasDomain} />
      <InputField placeholder="Canvas Token" setState={setCanvasToken} />
      <button
        type="submit"
        className="mb-8 bg-white p-2 rounded-md hover:bg-pink-200 duration-400 transition-all"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
