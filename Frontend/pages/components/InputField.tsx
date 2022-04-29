import Image from "next/image";
import React from "react";
import questionIcon from "../../assets/question.svg";

interface InputProps {
  placeholder: string;
  icon?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: React.FC<InputProps> = (props) => {
  const { placeholder, setState } = props;
  return (
    <>
      <input
        onChange={(e) => setState(e.target.value)}
        type="text"
        className="w-[40%] rounded-md p-2 bg-pink-200 placeholder-pink-300"
        placeholder={placeholder}
      />
      <div className="flex justify-end mb-12 mt-5 h-[23px] w-[42%]">
        <Image src={questionIcon} className="cursor-pointer" alt="question icon" />
      </div>
    </>
  );
};

export default InputField;
