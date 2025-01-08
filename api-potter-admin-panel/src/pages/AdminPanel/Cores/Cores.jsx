import React, { useEffect, useState } from 'react';
import apiCalls from '../../../utils/apiCalls.js';
import ActionButton from '../../../components/ActionButton/ActionButton';

const Cores = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

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

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Cores</h1>
            <ActionButton text= "Add" />
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