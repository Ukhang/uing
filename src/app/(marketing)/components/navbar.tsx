import { Button } from "@/components/animations/magnetic-button";
import React from "react";
import { Github } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full lg:fixed top-0 left-0">
      <nav className="flex items-center justify-end p-4 gap-4">
        <Button
          magnetic
          size={"sm"}
          className="cursor-pointer bg-gradient-to-t from-[#a5e8bb] to-[#c8f8d8] hover:from-[#a9f0c1] hover:to-[#c8f8d8] dark:from-[#97d5ac] dark:to-[#b1dcbf] text-black dark:text-black border dark:hover:from-[#a5e8bb] dark:hover:to-[#c8f8d8] border-[#99e0b3] dark:border-[#87c59e] text-shadow"
        >
          <Github /> Github star
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
