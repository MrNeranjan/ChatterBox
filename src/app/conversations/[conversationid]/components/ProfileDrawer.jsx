'use client';

import React, { useMemo, Fragment,useState } from 'react';
import useOtherUser from '@/app/hooks/useOtherUser';
import { format } from 'date-fns';
import { Dialog, Transition,DialogPanel,TransitionChild } from '@headlessui/react';
import { IoClose, IoTrash } from 'react-icons/io5';
import Avatar from '@/app/pages/components/avatar';
import ConfirmModal from './ConfirmModal';
import useActiveList from '@/app/hooks/useActiveList';

function ProfileDrawer({ data, isOpen, onClose }) {

    const otherUser = useOtherUser(data);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const {members} = useActiveList();
    const isActive = members.indexOf(otherUser?.email) !== -1

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

    const title = useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name]);

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`;
        }
        return isActive ?'Active':'Offline';
    }, [data,isActive]);

    return (
        <>   
        <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={()=>setIsConfirmOpen(false)}
        />
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" style={{ position: 'relative', zIndex: 50 }} onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                    />
                </TransitionChild>

                <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                        <div style={{ pointerEvents: 'none', position: 'fixed', insetY: 0, right: 0, display: 'flex', maxWidth: '100%', paddingLeft: '10px' }}>
                            <TransitionChild
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel
                                    style={{
                                        pointerEvents: 'auto',
                                        width: '100vw',
                                        maxWidth: '28rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100vh',
                                            overflowY: 'auto',
                                            backgroundColor: 'white',
                                            padding: '6px 0',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <div style={{ padding: '0 4px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h2 style={{ fontSize: '1.125rem', fontWeight: '500', color: 'gray-900' }}>{title}</h2>
                                                <div style={{ marginLeft: '0.75rem', display: 'flex', height: '1.75rem', alignItems: 'center' }}>
                                                    <button
                                                        type="button"
                                                        onClick={onClose}
                                                        style={{
                                                            backgroundColor: 'white',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            borderRadius: '0.375rem',
                                                            padding: '0.5rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <span style={{ display: 'none' }}>Close panel</span>
                                                        <IoClose size={24} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ position: 'relative', flex: 1, padding: '6px 4px' }}>
                                            <div style={{ position: 'absolute', inset: 0, padding: '4px', border: '2px dashed rgba(200, 200, 200, 0.5)', height: '100%' }}>
                                                <Avatar user={otherUser} />
                                                <div style={{ marginTop: '16px' }}>
                                                    <h4>{title}</h4>
                                                    <p>{statusText}</p>
                                                    <p>{joinedDate}</p>
                                                </div>
                                                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setIsConfirmOpen(true)}>
                                                    <IoTrash size={32}  />
                                                    <p style={{ marginLeft: '8px' }}>Delete</p>
                                                </div>
                                                {data.isGroup && (
                                                    <div>
                                                        <div>
                                                            Emails
                                                        </div>
                                 
                                 
                                                        {data.users.map((user)=>user.email).join(", ")}
                                                    </div>
                                                )}
                                                {!data.isGroup && (
                                                    <div style={{ marginTop: '16px' }}>
                                                        <p>Email</p>
                                                        <p>{otherUser.email}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    );
}

export default ProfileDrawer;
