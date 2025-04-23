import React, { ReactNode } from "react";

interface ViewportProps {
  children: ReactNode;
}

const Viewport: React.FC<ViewportProps> = ({ children }) => {
  return (
    <div className="border-y sm:border-x sm:border-y sm:rounded-xl p-4 min-h-[348px] bg-white dark:bg-[#0D0D0B]">
      {children}
    </div>
  );
};

export default Viewport;
