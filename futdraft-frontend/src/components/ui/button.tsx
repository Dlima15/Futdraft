import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className = "",
  children,
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#00FF7F]";
  const variants = {
    default: "bg-[#00FF7F] text-black hover:opacity-80",
    outline:
      "border border-[#00FF7F] text-[#00FF7F] hover:bg-[#00FF7F] hover:text-black",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
