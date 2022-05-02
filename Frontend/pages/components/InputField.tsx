import Image from "next/image";
import React, { useState } from "react";
import questionIcon from "../../assets/question.svg";

interface InputProps {
  type: string;
  placeholder: string;
  icon?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: React.FC<InputProps> = (props) => {
  const { type, placeholder, setState } = props;

  const [msgCanvasDomain, setMsgCanvasDomain] = useState<boolean>(false);
  const [msgCanvasToken, setMsgCanvasToken] = useState<boolean>(false);

  const showCanvasDomain = () => {
    setMsgCanvasDomain(true);
  };

  const hideCanvasDomain = () => {
    setMsgCanvasDomain(false);
  };

  const showCanvasToken = () => {
    setMsgCanvasToken(true);
  };

  const hideCanvasToken = () => {
    setMsgCanvasToken(false);
  };
  return (
    <>
      <input
        onChange={(e) => setState(e.target.value)}
        type="text"
        className="w-[40%] rounded-md p-2 bg-pink-200 placeholder-pink-300"
        placeholder={placeholder}
      />
      <div className="flex justify-end mb-12 mt-5 h-[23px] w-[42%]">
        {msgCanvasDomain ? (
          <p className="absolute right-10 top-[9rem] bg-black text-white p-2 rounded-md">
            Enter your canvas domain ( check step 1 )
          </p>
        ) : (
          <p></p>
        )}
        {msgCanvasToken ? (
          <p className="absolute right-10 bottom-40 bg-black text-white p-2 rounded-md">
            Enter your canvas token ( check step 2 )
          </p>
        ) : (
          <p></p>
        )}
        <Image
          src={questionIcon}
          className="cursor-pointer"
          alt="question icon"
          onMouseEnter={
            type == "domain"
              ? () => showCanvasDomain()
              : () => showCanvasToken()
          }
          onMouseLeave={
            type == "domain"
              ? () => hideCanvasDomain()
              : () => hideCanvasToken()
          }
        />
      </div>
    </>
  );
};

export default InputField;
