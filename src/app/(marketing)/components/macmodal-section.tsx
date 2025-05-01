"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import UserInformationModal from "@/components/ui/userInformation-modal";
import SystemInformationModal from "@/components/ui/systemInformation-modal";
import { Button } from "@/components/animations/magnetic-button";
import CodeBlock from "@/components/ui/code-block";

const MacModalSection = () => {
  const [activeTab, setActiveTab] = useState("preview");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Mac Modal
          </h3>
          <p className="text-custom-muted">
            A clean, minimal modal component with smooth animations, inspired by
            the design aesthetics of MacBook system dialogs.
          </p>
        </div>
        <div className="min-w-[60px] flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            magnetic
            className="cursor-pointer"
            onClick={toggleTab}
          >
            {activeTab === "preview" ? "Code" : "Preview"}
          </Button>
        </div>
      </div>

      {activeTab === "preview" && (
        <div className="grid grid-cols-2 sm:gap-4 sm:px-4">
          <Viewport>
            <div className="flex justify-center items-center h-full">
              <UserInformationModal />
            </div>
          </Viewport>
          <Viewport>
            <div className="flex justify-center items-center h-full">
              <SystemInformationModal />
            </div>
          </Viewport>
        </div>
      )}

      {activeTab === "code" && (
        <div className="px-4">
          <h2 className="text-lg">Installation</h2>
          <p className="mt-4">Install the following dependencies:</p>
          <CodeBlock pageName="Terminal" code="pnpm i framer-motion" />

          <p className="mt-4">
            Copy and paste the following code into your project.
          </p>
          <CodeBlock
            pageName="modal-transition.tsx"
            code={`"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModalTransitionProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ModalTransition({
  isOpen,
  onClose,
  children,
  className,
}: ModalTransitionProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/15 dark:bg-black/50"

          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            layout="position"
            className={cn(
              "relative bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden max-w-md w-full m-2 sm:m-4 border",
              className
            )}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`}
          />

          <p className="mt-4">
            There are two modals here — one is the UserInformation modal and the
            other is the SystemInformation modal. You can copy and use the one
            you need.
          </p>
          <p className="mt-4">1. UserInformation Modal</p>
          <CodeBlock
            pageName="userInformation-modal.tsx"
            code={`"use client";

import React, { useState } from "react";
import { Button } from "../animations/magnetic-button";
import { ModalTransition } from "../animations/modal-transition";
import Image from "next/image";
import { X } from "lucide-react";

const UserInformationModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="cursor-pointer"
        magnetic
        size={"sm"}
      >
        View Profile
      </Button>
      <ModalTransition
        isOpen={open}
        onClose={() => setOpen(false)}
        className="bg-none backdrop-blur-sm max-w-xl w-full"
      >
        <div className="border-b-1 border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-[#2F2F2F]">
          <div className="flex">
            <button
              className="bg-red-400 rounded-full w-3.5 h-3.5 flex items-center justify-center group text-gray-800 shadow-sm transition-all duration-200 group"
              onClick={() => setOpen(false)}
            >
              <X
                size={"12"}
                className="group-hover:block group-focus:block hidden"
              />
            </button>
          </div>
        </div>
        <div className="bg-gray-100/80 dark:bg-[#171717]/80 p-4 py-14 text-[#111110] dark:text-[#FFFFFF]">
          <div className="max-w-lg w-full mx-auto">
            <div className="flex md:flex-row flex-col items-center justify-center gap-6 md:gap-12">
              {" "}
              <Image
                src={"/kite.png"}
                alt="Kite Tyler"
                width={150}
                height={150}
                className="rounded-full"
              />
              <div className="">
                <h4 className="text-3xl">
                  <span className="font-semibold">Kite</span> Tyler
                </h4>
                <span className="text-xs">Design Engineer</span>

                <div className="mt-2 space-y-1 text-xs">
                  <p>
                    <strong>Born:</strong> January 15, 1995
                  </p>
                  <p>
                    <strong>Location:</strong> Portland, Oregon
                  </p>
                  <p>
                    <strong>Email:</strong> kite.tyler@example.com
                  </p>
                  <p>
                    <strong>Phone:</strong> (555) 123-4567
                  </p>
                  <p>
                    <strong>Interests:</strong> Cycling, sketching, hiking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalTransition>
    </>
  );
};

export default UserInformationModal;
`}
          />

          <p className="mt-4">2. SystemInformation Modal</p>
          <CodeBlock
            pageName="systemInformation-modal.tsx"
            code={`"use client";

import React, { useState } from "react";
import { ModalTransition } from "../animations/modal-transition";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "../animations/magnetic-button";

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
`}
          />
        </div>
      )}
    </section>
  );
};

export default MacModalSection;
