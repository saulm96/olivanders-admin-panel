import React, { useEffect, useState } from 'react';
import fetchApiList from '../../../utils/apiCalls.js';
import ActionButton from '../../../components/ActionButton/ActionButton';

const Cores = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchApiList('core');
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
            <h1>Cores</h1>
            <ActionButton text= "New" />
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <p><strong>Core ID:</strong> {item.core_id}</p>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Discover Date:</strong> {item.discover_date}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <ActionButton text= "Edit" />
                        <ActionButton text= "Delete" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cores;