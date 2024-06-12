'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import UseConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

function ConfirmModal({ isOpen, onClose }) {
    const router = useRouter();
    const { conversationId } = UseConversation();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose();
                router.push('/conversations');
                router.refresh();
            })
            .catch(() => toast.error('Failed to delete conversation'))
            .finally(() => setIsLoading(false));

        

    }, [conversationId, onClose, router]);

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: 'center' }}>
                    <FiAlertTriangle size={64} color="red" />
                    <h1 style={{ marginTop: '16px', fontSize: '1.25rem', fontWeight: 'bold' }}>Are you sure you want to delete this conversation?</h1>
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                        <button
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                opacity: isLoading ? 0.5 : 1,
                            }}
                            disabled={isLoading}
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                        <button
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'gray',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                opacity: isLoading ? 0.5 : 1,
                            }}
                            disabled={isLoading}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ConfirmModal;
