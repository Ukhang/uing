"use client";

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
