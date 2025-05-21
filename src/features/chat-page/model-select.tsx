"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/features/ui/select";

interface ModelSelectProps {
  models: Record<string, string>;
  defaultValue?: string;
}

export const ModelSelect = ({ models, defaultValue }: ModelSelectProps) => {
  return (
    <Select name="model" defaultValue={defaultValue}>
      <SelectTrigger className="w-[160px]" aria-label="Select model">
        <SelectValue placeholder="Model" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(models).map(([label, deployment]) => (
          <SelectItem value={deployment} key={deployment}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

