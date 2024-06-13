'use client'

import React from 'react'
import ReactSelect from 'react-select'
function Select({label,value,onChange,options,disabled}) {
  return (
    <div>
        <label>
            {label}
        </label>
        <div>
            <ReactSelect
                isDisabled ={disabled}
                value={value}
                onChange={onChange}
                isMulti
                options={options}
                menuPortalTarget={document.body}
                styles={{
                    menuPortal:(base)=>({
                        ...base,
                        zIndex:9999
                    })
                    
                }}
            
            />
        </div>
    </div>
  )
}

export default Select
