import React, { useState, useEffect } from 'react';

const Form = ({ item = {}, onSubmit, isEditing }) => {
    const [formData, setFormData] = useState({
        name: '',
        discover_date: '',
        description: '',
        ...item
    });

    useEffect(() => {
        setFormData({
            name: '',
            discover_date: '',
            description: '',
            ...item
        });
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(formData)
                .filter((key) => !key.toLowerCase().includes('id')) 
                .map((key) => (
                    <div key={key}>
                        <label>{key}</label>
                        {key === 'description' ? (
                            <textarea
                                name={key}
                                value={formData[key] || ''}
                                onChange={handleChange}
                            />
                        ) : (
                            <input
                                type="text"
                                name={key}
                                value={formData[key] || ''}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}
            <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default Form;