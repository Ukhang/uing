"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import { Button } from "@/components/animations/magnetic-button";
import DynamicIsland from "@/components/animations/dynamic-island";
import CodeBlock from "@/components/ui/code-block";

const DynamicIslandSection = () => {
  const [activeTab, setActiveTab] = useState("preview");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Dynamic Island
          </h3>
          <p className="text-custom-muted">
            A sleek, interactive UI inspired by iPhone 14 Pro&apos;s Dynamic Island.
            Tap to expand and reveal contextual info like calls or music with
            smooth spring animations.
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
        <div className="grid grid-cols-1 sm:px-4">
          <Viewport>
            <div className="flex flex-col justify-center items-center min-h-full">
              <DynamicIsland />
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
            pageName="dynamic-island.tsx"
            code={
              `"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Phone, Music, X } from "lucide-react";

export default function DynamicIsland() {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      layout
      onClick={() => setOpen(!open)}
      className="cursor-pointer flex items-center justify-between gap-4 bg-[#111110] dark:bg-[#FDFDFC] text-[#FFFFFF] dark:text-[#21201C] shadow-lg rounded-full px-4 py-2 w-auto"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ borderRadius: 9999 }}
    >
      <motion.div layout className="flex items-center gap-2">
        <motion.div layout>
          <Phone size={20} />
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium"
            >
              Incoming Call...
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <Music size={20} />
            <button className="hover:text-red-500 transition">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
`
            }
          />
        </div>
      )}
    </section>
  );
};

export default DynamicIslandSection;
