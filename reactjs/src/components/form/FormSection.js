import React from 'react';
import Label from '../common/Label';
import InputField from '../common/InputField';

const FormSection = ({ fields }) => (
  <>
    {fields.map((field, index) => (
      <div key={index} className="mb-4">
        <Label>{field.label}</Label>
        <InputField
          type={field.type}
          value={field.value}
          onChange={field.onChange}
          placeholder={field.placeholder}
        />
      </div>
    ))}
  </>
);

export default FormSection;