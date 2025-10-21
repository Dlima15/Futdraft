import * as React from "react";

export const Card = ({ children, className = "" }: any) => (
  <div className={`rounded-2xl border border-[#1C1C1C] bg-[#111] shadow-lg ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }: any) => (
  <div className="p-4 border-b border-[#1C1C1C]">{children}</div>
);

export const CardTitle = ({ children }: any) => (
  <h2 className="text-[#00FF7F] text-lg font-semibold">{children}</h2>
);

export const CardContent = ({ children }: any) => (
  <div className="p-4">{children}</div>
);
