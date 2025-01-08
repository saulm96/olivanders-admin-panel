import React, { useEffect, useState } from 'react';
import apiCalls from '../../../utils/apiCalls.js';
import ActionButton from "../../../components/ActionButton/ActionButton";
import Modal from "../../../components/Modal/Modal";
import Form from "../../../components/Form/Form";

const Languages = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCalls.fetchApiList('language');
                setData(result);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    const handleAddClick = () => {
        setIsEditing(false);
        setCurrentLanguage(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (language) => {
        setIsEditing(true);
        setCurrentLanguage(language);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (isEditing) {
                await apiCalls.fetchApiUpdate("language", currentLanguage.language_id, formData);
            } else {
                await apiCalls.fetchApiCreate("language", formData);
            }
            const updatedResult = await apiCalls.fetchApiList("language");
            setData(Array.isArray(updatedResult) ? updatedResult : []);
        } catch (error) {
            console.error("Something went wrong while creating/updating the language");
        }
        setIsModalOpen(false);
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Languages</h1>
            <ActionButton text="Add" onClick={handleAddClick} />
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <p>{isEditing ? "Edit Language" : "Create a new Language"}</p>
                    <Form
                        item={currentLanguage || {}}
                        onSubmit={handleFormSubmit}
                        isEditing={isEditing}
                        fields={[
                            { name: 'name', label: 'Name', type: 'text', required: true },
                            { name: 'iso_code', label: 'ISO Code', type: 'text', required: true }
                        ]}
                    />
                </Modal>
            )}
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <p>Language ID: {item.language_id}</p>
                        <p>Name: {item.name}</p>
                        <p>ISO Code: {item.iso_code.toUpperCase()}</p>
                        <ActionButton text="Edit" onClick={() => handleEditClick(item)} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Languages;