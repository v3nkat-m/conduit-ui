import React, { useState } from 'react'

export default function Input({ label, value, onChange }) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        type='text'
        id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
