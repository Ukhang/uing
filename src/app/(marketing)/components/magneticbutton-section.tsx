"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import { Button } from "@/components/animations/magnetic-button";

const MagneticButtonSection = () => {
  const [activeTab, setActiveTab] = useState("preview");

  const toggleTab = () => {
    setActiveTab((prevTab) => (prevTab === "preview" ? "code" : "preview"));
  };

  return (
    <section className="mt-20 space-y-5">
      <div className="flex items-start justify-between gap-4 px-4">
        <div className="space-y-3">
          <h3 className="font-medium text-custom-primary tracking-wide text-lg">
            Magnetic Button
          </h3>
          <p className="text-custom-muted">
            A dynamic, interactive button component that subtly
            &quot;attracts&quot; the cursor or mouse pointer when hovered over.
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
            <div className="flex justify-center items-center min-h-full">
              <Button size={"sm"} magnetic className="cursor-pointer">
                Catch Me!
              </Button>
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

export default MagneticButtonSection;
