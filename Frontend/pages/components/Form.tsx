import { NextPage } from "next";
import React, { useState } from "react";
import InputField from "./InputField";
import frontCircle from "../../assets/frontCircle.svg";
import backCircle from "../../assets/backCircle.svg";
import Image from "next/image";
import NotionAuthButton from "./NotionAuth";
import axios from "axios";

export interface AuthType {
  canvasToken: string;
  domain: string;
  notionDb: string;
  notionToken: string;
  timeZone: string;
}

const HARD_CODED_DATA: AuthType = {
  canvasToken:
    "349~RqZkQfRjPwIAZVgGQ3sFYnRtE98Q1Ih5S6nWWJnwpsvDSgHYbPJsFS7pAwW17G8Q",
  domain: "https://csufullerton.instructure.com",
  notionDb: "6bb16c50206040f0bd7b84aa855cb116",
  notionToken: "secret_sj1CMfsYx1zORR5Z8uMrdTGjuMg5QPC3IfPGOmdfNTF",
  timeZone: "America/Los_Angeles",
};

const Form: NextPage = () => {
  const [canvasDomain, setCanvasDomain] = useState<string>("");
  const [canvasToken, setCanvasToken] = useState<string>("");
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
      await fetch("http://localhost:8000/assignments", {
        method: "POST",
        body: JSON.stringify(HARD_CODED_DATA),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
    } catch (err) {
      console.log(err);
    }
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
      <div className="absolute left-[-4em] w-[10em] h-[10em]">
        <Image src={frontCircle} alt="3d sphere" />
      </div>
      <div className="absolute right-[-4em] z-[-3] bottom-[-4em] w-[10em] h-[10em]">
        <Image src={backCircle} alt="3d sphere" />
      </div>
      <InputField placeholder="Canvas Domain" setState={setCanvasDomain} />
      <InputField placeholder="Canvas Token" setState={setCanvasToken} />
      <NotionAuthButton />
      <button
        type="submit"
        className=" mb-8 bg-pink-300 text-white font-semibold p-2 rounded-md hover:bg-pink-500 transition-all duration-400"
      >
        Continue
      </button>
    </form>
  );
};

export default Form;
