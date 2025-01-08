import React, { useEffect, useState } from 'react';
import fetchApiList from '../../../utils/apiCalls.js';
import ActionButton from "../../../components/ActionButton/ActionButton";

const Languages = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchApiList('language');
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
            <h1>Languages</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <p>Language ID: {item.language_id}</p>
                        <p>Name: {item.name}</p>
                        <p>iso code: {item.iso_code.toUpperCase()}</p>
                        <ActionButton text= "Edit" />
                        <ActionButton text= "Delete" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Languages;