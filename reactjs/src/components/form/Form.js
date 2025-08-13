import React from 'react';
import FormSection from './FormSection';
import Button from '../common/Button';

const Form = ({ title, fields, onSubmit, error, buttonText, secondaryButton = null }) => (
  <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
    <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

    <FormSection fields={fields} />

    <Button type="submit" className="w-full mb-2">{buttonText}</Button>
    {secondaryButton && secondaryButton}
  </form>
);

export default Form;