import React, { FC } from "react";
import { Controller } from "react-hook-form";

interface TextAreaProps {
  name: string;
  type?: string;
  control: any;
  error: any;
  className?: string;
  placeholder?: string;
  rules?: any;
  showError?: boolean;
  errorTextColor?:string
}

const TextArea: FC<TextAreaProps> = ({
  control,
  error,
  name,
  className = "textarea-bordered textarea-primary textarea w-full",
  type = "text",
  placeholder = "",
  rules,
  showError = true,
  errorTextColor ='text-primary'
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <textarea
            {...field}
            className={className}
            placeholder={placeholder}
          />
        
        )}
      />
      {showError && (
        <p className={`py-1 text-sm ${errorTextColor}`}>
          {error[name] && error[name].message}
        </p>
      )}
    </>
  );
};

export default TextArea;