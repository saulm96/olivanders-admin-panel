import React, { useEffect, useState } from 'react';
import apiCalls from '../../../utils/apiCalls.js';

import ActionButton from '../../../components/ActionButton/ActionButton';
import Modal from '../../../components/Modal/Modal';
import Form from '../../../components/Form/Form';


const Cores = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCalls.fetchApiList('core');
                setData(result);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await apiCalls.fetchApiDelete('core', id); 
            const updatedResult = await apiCalls.fetchApiList('core');
            setData(Array.isArray(updatedResult) ? updatedResult : []);
        } catch (error) {
            setError(error);
        }
    }
    const handleAddClick = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = ()=> {
        setIsModalOpen(false);
    };
    const handleFormSubmit = async (formData) => {
        try {
            await apiCalls.fetchApiCreate('core', formData);
            const updatedResult = await apiCalls.fetchApiList('core');
            setData(Array.isArray(updatedResult) ? updatedResult : [])
        } catch (error) {
            console.error('Something went wrong while creating the data: ', error);
        }
        setIsModalOpen(false);
    }

    return (
        <div>
            <h1>Cores</h1>
            <ActionButton text= "Add" onClick ={handleAddClick}/>
            {isModalOpen && <Modal onClose={handleCloseModal}>
                <p>Create a new Core</p>   
                <Form item={data[0] || {}} onSubmit={handleFormSubmit}/>
            </Modal>}
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <p><strong>Core ID:</strong> {item.core_id}</p>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Discover Date:</strong> {item.discover_date}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <ActionButton text= "Edit" />
                        <ActionButton text= "Delete" onClick={() => handleDelete(item.core_id)}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cores;