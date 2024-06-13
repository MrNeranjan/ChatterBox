'use client';

import Modal from "@/app/conversations/[conversationid]/components/Modal";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Input from "./Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "./button";

function SettingModal({ isOpen, onClose, currentUser }) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            username: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch("image");

    const handleUpload = (result) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true,
        });
    };

    const onSubmit = (data) => {
        setIsLoading(true);

        axios
            .post("/api/settings", data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Something went wrong"))
            .finally(() => setIsLoading(false));
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Your Settings</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <Input
                            disabled={isLoading}
                            label="Name"
                            id="name"
                            error={errors}
                            required
                            register={register}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Photo</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Image width="48" height="48" src={image || currentUser?.image || "/images/placeholder.png"} alt="Avatar" />
                            <CldUploadButton
                                options={{ maxFiles: 1 }}
                                onSuccess={handleUpload}
                                uploadPreset="akpbp5ha"
                            >
                                <Button disabled={false} secondary type="button" name="Change"/>
                            </CldUploadButton>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <Button name="Save" submit="submit" disabled={isLoading}/>
                        <Button name="Cancel" submit="submit" disabled={isLoading} onClick={onClose}/>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default SettingModal;
