'use client';

import { Fragment } from 'react';
import { Dialog, Transition,DialogPanel,TransitionChild } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';

function Modal({ isOpen, onClose, children }) {
    
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" style={{ position: 'relative', zIndex: 50 }} onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                </TransitionChild>

                <div style={{ position: 'fixed', inset: 0, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', minHeight: '100%', alignItems: 'center', justifyContent: 'center', padding: '16px', textAlign: 'center' }}>
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 scale-95"
                            enterTo="opacity-100 translate-y-0 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 scale-100"
                            leaveTo="opacity-0 translate-y-4 scale-95"
                        >
                            <DialogPanel style={{
                                width: '100%',
                                maxWidth: '28rem',
                                transform: 'translate-y-0 scale-100',
                                overflow: 'hidden',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                padding: '24px',
                                textAlign: 'left',
                                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
                                transition: 'all 200ms ease-in-out'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '0',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IoClose size={24} aria-hidden="true" />
                                    </button>
                                </div>
                                <div style={{ marginTop: '16px' }}>
                                    {children}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default Modal;
