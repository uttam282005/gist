import { ChangeEvent } from "react";

interface InputBox {
  label: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputBox = ({ label, placeholder, onChange }: InputBox) => {
  return (
    <div>
      <div className="font-semibold text-md mb-1 font-sans"> {label} </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          className="mb-3 border border-gray-300 placeholder:text-sm placeholder:text-gray-300 rounded-md px-2 pb-1 sadow-sm h-9 w-80 focus:border-gray-400"
        />
      </div>
    </div>
  );
};
