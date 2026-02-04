import type { ReactNode } from "react";

function FormRow({children , label , error} : {children : ReactNode; label: string; error : string | undefined}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="name" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      <span className="text-red-700">{error}</span>
    </div>
  );
}

export default FormRow;
