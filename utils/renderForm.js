import React from 'react'
import Input from '../components/Input'

export const renderForm = (formElements, inputChange) =>
  formElements.map((formElement) => (
    <Input
      key={formElement.id}
      type={formElement.config.elementType}
      inputElementProps={formElement.config.elementConfig}
      value={formElement.config.value}
      label={formElement.config.label}
      invalid={!formElement.config.valid}
      touched={formElement.config.touched}
      onChange={(event) => inputChange(event, formElement.id)}
    />
  ))
