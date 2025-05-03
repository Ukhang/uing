"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CodeBlock({ code, pageName = "Terminal" }: { code: string; pageName?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-md border mt-4">
      <div className="border-b bg-[#FCFCFC] dark:bg-[#212121] rounded-t-md px-4 py-2 text-sm flex justify-between gap-4">
        <div>{pageName}</div>
        <button className="px-1 cursor-pointer relative w-5 h-5 text-gray-400 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200 transition duration-200" onClick={handleCopy}>
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-gray-800 dark:text-gray-200"
              >
                <Check size={16} />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Copy size={16} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      <pre className="p-4 bg-[#ffffff] dark:bg-[#1C1C1B] rounded-b-md overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;