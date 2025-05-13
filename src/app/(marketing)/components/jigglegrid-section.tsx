"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import { Button } from "@/components/animations/magnetic-button";
import JiggleGrid from "@/components/animations/jiggle-grid";
import CodeBlock from "@/components/ui/code-block";

const JiggleGridSection = () => {
  const [activeTab, setActiveTab] = useState("preview");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Press & Hold Jiggle Mode
          </h3>
          <p className="text-custom-muted">
            Inspired by iOS Home Screen behavior. A delete button appears on the
            held icon—tap it to remove the app and exit jiggle mode.
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
              <JiggleGrid />
              <p className="text-xs text-custom-muted mt-4 text-center">
                Press and hold an app icon to <br /> enter jiggle mode.{" "}
              </p>
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
            pageName="jigglegrid-section.tsx"
            code={`
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const initialApps = [
  {
    icon: (
      <img
        src="https://logos-world.net/wp-content/uploads/2024/08/Notion-Logo.png"
        alt="Notion Logo"
        className="w-16 h-16 object-contain"
      />
    ),
    name: "Notion",
  },
  {
    icon: (
      <img
        src="https://images.icon-icons.com/2631/PNG/512/gmail_new_logo_icon_159149.png"
        alt="Gmail Logo"
        className="w-10 h-10 object-contain"
      />
    ),
    name: "Gmail",
  },
  {
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png?20210804221519"
        alt="VSCode Logo"
        className="w-8 h-8 object-contain"
      />
    ),
    name: "VSCode",
  },
  {
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
        alt="Spotify Logo"
        className="w-10 h-10 object-contain"
      />
    ),
    name: "WhatsApp",
  },
];

const jiggleKeyframes = {
  rotate: [-2, 2, -2],
  transition: {
    duration: 0.3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function JiggleGrid() {
  const [apps, setApps] = useState(initialApps);
  const [jiggleMode, setJiggleMode] = useState(false);
  const [targetDeleteIndex, setTargetDeleteIndex] = useState<number | null>(null);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handlePressStart = (index: number) => {
    const timer = setTimeout(() => {
      setJiggleMode(true);
      setTargetDeleteIndex(index);
    }, 500);
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    if (pressTimer) clearTimeout(pressTimer);
  };

  const deleteApp = (index: number) => {
    setApps(prev => prev.filter((_, i) => i !== index));
    setTargetDeleteIndex(null);
    setJiggleMode(false); // stop jiggle after delete
  };

  return (
    <div className="grid sm:grid-cols-4 grid-cols-2 gap-6">
      {apps.map((app, i) => (
        <motion.div
          key={i}
          onMouseDown={() => handlePressStart(i)}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={() => handlePressStart(i)}
          onTouchEnd={handlePressEnd}
          className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow flex items-center justify-center text-black"
          animate={jiggleMode ? jiggleKeyframes : { rotate: 0 }}
        >
          {targetDeleteIndex === i && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center shadow"
              onClick={() => deleteApp(i)}
            >
              <X size={12} />
            </motion.button>
          )}
          {app.icon}
        </motion.div>
      ))}
    </div>
  );
}
            `}
          />
        </div>
      )}
    </section>
  );
};

export default JiggleGridSection;
