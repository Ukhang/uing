"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import { Button } from "@/components/animations/magnetic-button";
import { TextReveal } from "@/components/animations/text-reveal";
import { LoaderCircle } from "lucide-react";

const TextRevealSection = () => {
  const [activeTab, setActiveTab] = useState("preview");
  const [reloadKey, setReloadKey] = useState(0);

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  const handleReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Text Reveal
          </h3>
          <p className="text-custom-muted">
            A flexible and animated text element that reveals each character
            with a smooth spring motion as it enters the viewport.
          </p>
        </div>
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

      {activeTab === "preview" && (
        <div className="grid grid-cols-1 sm:px-4 relative">
          <Button
            variant={"ghost"}
            size={"sm"}
            className="absolute right-6 top-2 cursor-pointer"
            onClick={handleReload}
          >
            <LoaderCircle />
          </Button>
          <Viewport>
            <div className="flex justify-center items-center min-h-full" key={reloadKey}>
              <TextReveal
                text="Become who you are 🔥"
                className="font-medium text-lg"
              />
            </div>
          </Viewport>
        </div>
      )}

      {activeTab === "code" && (
        <div className="px-4">
          <p className="text-custom-muted">Code coming soon...</p>
        </div>
      )}
    </section>
  );
};

export default TextRevealSection;
