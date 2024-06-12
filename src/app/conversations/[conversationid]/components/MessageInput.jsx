'use client'

import React from 'react'

function MessageInput({ id, register, errors, required, placeholder,type}) {



  return (
    <div className='MessageInput_container'>
      <input
        id={id}
        type={type}
        {...register(id, { required })}
        placeholder={placeholder}
        className='MessageInput_input'
        autoComplete={id}
      />
    </div>
  )
}

export default MessageInput
