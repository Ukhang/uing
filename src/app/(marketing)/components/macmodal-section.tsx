"use client";

import { useState } from "react";
import Viewport from "@/components/ui/ViewPort";
import UserInformationModal from "@/components/ui/userInformation-modal";
import SystemInformationModal from "@/components/ui/systemInformation-modal";
import { Button } from "@/components/animations/magnetic-button";

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
          <p className="text-custom-muted">Code coming soon...</p>
        </div>
      )}
    </section>
  );
};

export default MacModalSection;
