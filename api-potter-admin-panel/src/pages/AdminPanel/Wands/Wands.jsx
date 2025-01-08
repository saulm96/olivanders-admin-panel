import React, { useEffect, useState } from 'react';
import apiCalls from '../../../utils/apiCalls.js';
import ActionButton from '../../../components/ActionButton/ActionButton';

const Wands = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiCalls.fetchApiList('wand');
                setData(result);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Wands</h1>
            <ActionButton text= "new" />
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <p><strong>Wand ID:</strong> {item.wand_id}</p>
                        <p><strong>Wandmaker Name:</strong> {item['wandmaker.name']}</p>
                        <p><strong>Wandmaker Last Name:</strong> {item['wandmaker.last_name']}</p>
                        <p><strong>Wood Name:</strong> {item.wood_name}</p>
                        <p><strong>Core Name:</strong> {item.core_name}</p>
                        <p><strong>Length:</strong> {item.length}</p>
                        <p><strong>Flexibility:</strong> {item.flexibility}</p>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <ActionButton text= "Edit" />
                        <ActionButton text= "Delete" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wands;