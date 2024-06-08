import clsx from 'clsx'
import React from 'react'
import  './style.css'

export default function Input({id,label,type,autocomplete,disabled,error,register}) {

  return (
    <div className='Input_container'>
        <label>{label}</label>
        <input 
            id ={id}
            type={type}
            autoComplete={id}
            disabled={disabled}
            {...register(id,{required: true})}
            className={clsx(
                'Input_container_input_normal',
                error && 'Input_container_input_error',
                disabled && 'Input_container_input_disabled'
            )}
        />

    </div>
  )
}
