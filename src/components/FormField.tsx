import type { InputHTMLAttributes } from 'react';
import './FormField.css';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = ({ label, error, id, ...rest }: FormFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
      </label>
      <input id={id} className="form-field__input" {...rest} />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
};

export default FormField;