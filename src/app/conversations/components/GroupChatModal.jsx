'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Modal from '../[conversationid]/components/Modal';
import Input from '@/app/pages/components/Input';
import Select from './Select';
import Button from '@/app/pages/components/button';

function GroupChatModal({
    isOpen,
    users,
    onClose
}) {
    const routers = useRouter();
    const [isLoading,setIsLoading] = useState(false);

    const {register,handleSubmit,setValue,watch,errors} = useForm({
        defaultValues:{
            name:'',
            members:[]
        }

    })

    const members = watch('members')

    const onSubmit = (data)=>{
        setIsLoading(true);

        axios.post('/api/conversations',{
            ...data,
            isGroup:true
        })
        .then(()=>{
            routers.refresh();
            onClose();
        })
        .catch(()=>toast.error("Something went wrong!"))
        .finally(()=>setIsLoading(false))

    }

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>
                    Create a Group chat
                </h2>
                <p>
                    Create a group chat with more then 2 people.
                </p>
                <Input
                    register={register}
                    label="Name"
                    id="Name"
                    disabled={isLoading}
                    required
                    errors={errors}
                />
                <Select
                    disabled={isLoading}
                    label="Members"
                    options={users.map((user)=>({
                        value:user.id,
                        label:user.name
                    }))}
                    onChange={(value)=> setValue('members',value,{
                        shouldValidate:true
                    })}
                    value={members}
                
                />
                <div>
                    <Button disabled={isLoading} name="Cancel" onClick={onClose} type="button" secondary/>
                    <Button disabled={isLoading} name="Create" onClick={onClose} type="submit" />
                </div>
            </div>

        </form>

    </Modal>
  )
}

export default GroupChatModal
