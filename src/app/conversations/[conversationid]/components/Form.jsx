'use client';

import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import UseConversation from '@/app/hooks/useConversation';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';

function Form() {
   
    const { conversationId,isOpen } = UseConversation();


    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: { message: '' } 
    });

    
    const onSubmit = (data)=> {


        setValue('message', '',{shouldValidate: true});

       
        axios.post('/api/messages', { 
                ...data, 
                conversationId: conversationId
            })
            .then(response => {
                console.log('Message sent successfully', response.data);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <div className="form_container">
            <HiPhoto size={30} color='var(--color-Azure)'/>
            <form onSubmit={handleSubmit(onSubmit)} className="form_container_form">
                <MessageInput
                    id ="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="write a message"
                />
                <button type="submit" className="form_container_form_button"><HiPaperAirplane size={18}/></button>
            </form>

        </div>
    );
}

export default Form;
