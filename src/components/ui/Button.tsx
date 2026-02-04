import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

function Button({ children, onClick, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-2 md:px-5 py-1 md:py-2 rounded
        hover:bg-indigo-600 hover:text-white cursor-pointer shadow
        ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
