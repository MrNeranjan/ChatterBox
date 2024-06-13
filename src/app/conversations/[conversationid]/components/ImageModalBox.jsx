'use client'

import React from 'react'
import Modal from './Modal'
import Image from 'next/image'

function ImageModalBox({isOpen,onClose,src}) {
    if(!src){
        return null
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div style={{width:"80%", height:"80%"}}>
            <Image
                alt='image'
                src={src}
                width={500}
                height={500}
            />
        </div>
    </Modal>
  )
}

export default ImageModalBox
