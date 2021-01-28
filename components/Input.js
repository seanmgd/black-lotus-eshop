import React from 'react'
import styles from '../styles/input.module.scss'

const Input = ({
  label,
  value,
  icon,
  type,
  onChange,
  invalid,
  touched,
  inputElementProps,
  ...props
}) => {
  const inputMapping = {
    input: (
      <input
        className={styles.inputElement}
        {...inputElementProps}
        invalid={invalid}
        touched={touched}
        value={value}
        onChange={onChange}
      />
    ),
    textarea: (
      <input
        className={styles.inputElement}
        {...inputElementProps}
        invalid={invalid}
        touched={touched}
        value={value}
        onChange={onChange}
        as="textarea"
      />
    ),
    select: (
      <input
        className={styles.inputElement}
        invalid={invalid}
        touched={touched}
        value={value}
        onChange={onChange}
        as="select"
      >
        {inputElementProps?.options?.map((option) => (
          <option key={value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </input>
    ),
  }
  return (
    <label className={styles.inputWrapper} {...props}>
      {label && <span className={styles.inputLabel}>{label}</span>}

      <div className={styles.inputField}>
        {inputMapping[type]}
        {icon}
      </div>
    </label>
  )
}

export default Input
