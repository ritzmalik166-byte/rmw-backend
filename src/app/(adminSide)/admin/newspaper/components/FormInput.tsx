"use client";

import React from "react";
import styles from "./FormInput.module.css";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  min?: number;
  step?: string;
  accept?: string;
  options?: string[];
  textarea?: boolean;
  rows?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  error,
  placeholder,
  min,
  step,
  accept,
  options,
  textarea = false,
  rows = 4,
}) => {
  const renderInput = () => {
    if (options) {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (textarea) {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={`${styles.textarea} ${error ? styles.inputError : ""}`}
        />
      );
    }

    return (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        step={step}
        accept={accept}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
    );
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {renderInput()}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};


