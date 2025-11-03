import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-200">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-rose-400 focus:border-transparent transition"
      />
    </div>
  );
}
