"use client";

import { Button, Input, Loader } from "@/components/ui";

export default function UIDemoPage() {
  return (
    <div className="p-8 space-y-4">
      <h1>UI Components Demo</h1>

      <Button>Generate Trip</Button>

      <Input
        label="Budget"
        placeholder="Enter budget"
      />

      <Loader />
    </div>
  );
}