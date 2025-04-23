"use client";

import React, { useState } from "react";
import { ModalTransition } from "../animations/ModalTransition";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../animations/MagneticButton";

const SystemInformationModal = () => {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState("overview");

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="cursor-pointer"
        magnetic
        size={"sm"}
      >
        View system Info
      </Button>
      <ModalTransition
        isOpen={open}
        onClose={() => setOpen(false)}
        className="bg-none backdrop-blur-sm max-w-xl w-full"
      >
        <div className="border-b-1 border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-[#2F2F2F]">
          {" "}
          <div className="flex items-center justify-between gap-4">
            <button
              className="bg-red-400 rounded-full w-3.5 h-3.5 flex items-center justify-center group text-gray-800 shadow-sm transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              <X
                size={"12"}
                className="group-hover:block group-focus:block hidden"
              />
            </button>
            <div className="text-xs flex items-center border rounded hover:bg-gray-50 dark:hover:bg-[#444343] transition-all duration-200">
              {["overview", "display", "storage"].map((item) => (
                <button
                  key={item}
                  className={cn(
                    "px-2 py-1 focus:outline-1 focus:rounded-[3px]",
                    panel === item &&
                      "bg-gray-200 dark:bg-[#222121] rounded-[3px]"
                  )}
                  onClick={() => setPanel(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
            <div></div>
          </div>
        </div>

        <div className="bg-gray-100/80 dark:bg-[#171717]/80 p-4 py-14 text-[#111110] dark:text-[#FFFFFF]">
          {" "}
          {panel === "overview" && (
            <div className="max-w-lg w-full mx-auto">
              <div className="flex md:flex-row flex-col items-center justify-center gap-6 md:gap-12">
                <Image
                  src={"/arch-linux.png"}
                  alt="Arch Linux"
                  width={170}
                  height={170}
                />
                <div>
                  <h4 className="text-2xl md:text-3xl">
                    <span className="font-semibold">Arch</span> Linux
                  </h4>
                  <span className="text-xs">Version: 5.0.0</span>
                  <div className="mt-2 text-xs">
                    <ul className="list-disc ml-5 space-y-0.5">
                      <li>
                        <strong>Processor:</strong> AMD Ryzen 9 7950X
                      </li>
                      <li>
                        <strong>Memory:</strong> 64GB DDR5 RAM
                      </li>
                      <li>
                        <strong>Storage:</strong> 2TB NVMe SSD + 4TB HDD
                      </li>
                      <li>
                        <strong>GPU:</strong> NVIDIA RTX 4080
                      </li>
                      <li>
                        <strong>Kernel:</strong> 6.8.3-arch1-1
                      </li>
                      <li>
                        <strong>Desktop Environment:</strong> KDE Plasma 6
                      </li>
                      <li>
                        <strong>Package Manager:</strong> Pacman
                      </li>
                      <li>
                        <strong>Uptime:</strong> 4 days, 6 hours
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          {panel === "display" && (
            <div className="max-w-lg w-full mx-auto">
              <div className="flex flex-col items-center justify-center gap-6 md:gap-12">
              <Image
                  src={"/pc.png"}
                  alt="pc"
                  width={200}
                  height={200}
                />
                <div className="text-center">
                  <h4 className="text-2xl md:text-3xl text-center">
                    <span className="font-semibold">Display</span>
                  </h4>
                  <div className="mt-2 text-xs space-y-1">
                    13.3-inch (1440 × 900)
                  </div>
                </div>
              </div>
            </div>
          )}
          {panel === "storage" && (
            <div className="max-w-lg w-full mx-auto">
              <div className="flex md:flex-row flex-col md:items-start items-center justify-center gap-6 md:gap-12">
              <Image
                  src={"/hard-drive.png"}
                  alt="hard drive"
                  width={100}
                  height={100}
                  className=""
                />
                <div className="text-xs">
                  <h4 className="text-2xl md:text-3xl">
                    <span className="font-semibold">Storage</span>
                  </h4>
                  <div className="mt-2 space-y-0.5">
                    <p>
                      <strong>Primary:</strong> 2TB Samsung 980 Pro (NVMe)
                    </p>
                    <p>
                      <strong>Secondary:</strong> 4TB Seagate Barracuda (HDD)
                    </p>
                    <p>
                      <strong>Mount Points:</strong>
                    </p>
                    <ul className="list-disc ml-6">
                      <li>/ (root) - 500GB</li>
                      <li>/home - 1.5TB</li>
                      <li>/data - 4TB</li>
                    </ul>
                    <p>
                      <strong>Filesystem:</strong> Btrfs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ModalTransition>
    </>
  );
};

export default SystemInformationModal;
