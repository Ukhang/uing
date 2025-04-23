"use client";

import React, { useState } from "react";
import { Button } from "../animations/MagneticButton";
import { ModalTransition } from "../animations/ModalTransition";
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
