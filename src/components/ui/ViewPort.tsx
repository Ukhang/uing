"use client";

import React, { ReactNode, useState } from "react";
import { Button } from "../animations/magnetic-button";
import { LoaderCircle } from "lucide-react";

interface ViewportProps {
  children: ReactNode;
  reload?: boolean;
}

const Viewport: React.FC<ViewportProps> = ({ children, reload }) => {
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <div
      key={reload ? reloadKey : undefined}
      className="border-y sm:border-x sm:border-y sm:rounded-xl p-4 min-h-[348px] bg-white dark:bg-[#0D0D0B] relative"
    >
      {reload && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 cursor-pointer"
          onClick={handleReload}
        >
          <LoaderCircle />
        </Button>
      )}
      {children}
    </div>
  );
};

export default Viewport;
