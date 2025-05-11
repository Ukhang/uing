"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import { Button } from "@/components/animations/magnetic-button";
import CoverFlow from "@/components/animations/cover-flow";
import CodeBlock from "@/components/ui/code-block";

const CoverFlowSection = () => {
  const [activeTab, setActiveTab] = useState("preview");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Cover Flow
          </h3>
          <p className="text-custom-muted">
            Inspired by iTunes and older Finder, where album art or files are
            displayed with a 3D flipping effect.
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
              <CoverFlow />
              <span className="text-xs text-custom-muted mt-1">
                Hover and click on an album cover
              </span>
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
            pageName="cover-flow.tsx"
            code={`"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const defaultAlbums = [
  "https://lastfm.freetls.fastly.net/i/u/300x300/2c4113a4cf750427dd390f8a3b2b8dc9.jpg",
  "https://lastfm.freetls.fastly.net/i/u/300x300/33ee3c8333bf4c0ea0baebd003813cca.jpg",
  "https://lastfm.freetls.fastly.net/i/u/300x300/69d057194658d532af3d1576ec6ed7c4.jpg",
  "https://lastfm.freetls.fastly.net/i/u/300x300/248f5294bb1d1d9fc088f41768a84dc8.jpg",
  "https://lastfm.freetls.fastly.net/i/u/300x300/07886c9f2d41c38b81fb25b6e6f78491.jpg"
];

export default function CoverFlow({ albums = defaultAlbums }) {
  const [active, setActive] = useState(2);

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-10">
      <div className="relative w-full max-w-4xl h-72 flex items-center justify-center">
        {albums.map((src, i) => {
          const offset = i - active;
          const isActive = offset === 0;

          const scale = isActive ? 1 : 0.85;
          const translateX = offset * 130;
          const rotate = offset * 10;
          const zIndex = 20 - Math.abs(offset);
          const blur = Math.abs(offset) === 2 ? "blur-sm" : offset !== 0 ? "blur-xs" : "";

          return (
            <motion.img
              key={i}
              src={src}
              alt={\`album-\${i}\`}
              onClick={() => setActive(i)}
              className={\`absolute cursor-pointer rounded-xl shadow-xl object-cover transition-all duration-500 \${blur}\`}
              style={{
                width: "150px",
                height: "150px",
                transform: \`translateX(\${translateX}px) scale(\${scale}) rotateY(0deg) rotateZ(\${rotate}deg)\`,
                zIndex
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          );
        })}
      </div>
    </div>
  );
}`}
          />
        </div>
      )}
    </section>
  );
};

export default CoverFlowSection;
