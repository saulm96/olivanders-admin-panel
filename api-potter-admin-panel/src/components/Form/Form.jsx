import React, { useState } from 'react';

const Form = ({ item, onSubmit }) => {
    const [formData, setFormData] = useState(item || {});

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
            {Object.keys(item)
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
            <button type="submit">create</button>
        </form>
    );
};

export default Form;