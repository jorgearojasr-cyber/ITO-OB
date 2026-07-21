"use client";

import { useState } from "react";
import styles from "./ToggleGroup.module.css";

type ToggleGroupOption = { value: string; label: string };

type ToggleGroupProps = {
  name: string;
  options: ToggleGroupOption[];
  defaultValue: string;
  onChange?: (value: string) => void;
};

export function ToggleGroup({ name, options, defaultValue, onChange }: ToggleGroupProps) {
  const [value, setValue] = useState(defaultValue);

  function handleSelect(nextValue: string) {
    setValue(nextValue);
    onChange?.(nextValue);
  }

  return (
    <div className={styles.group} role="radiogroup">
      <input type="hidden" name={name} value={value} />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          className={option.value === value ? `${styles.option} ${styles.optionOn}` : styles.option}
          onClick={() => handleSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
