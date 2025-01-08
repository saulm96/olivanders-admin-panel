import { data } from "react-router-dom";

async function fetchApiList(variable) {
    const baseUrl = 'http://localhost:3001/api/';
    const url = `${baseUrl}${variable}/list`;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

//Function to fetch the api with the DELETE method
async function fetchApiDelete(variable, id) {
    const baseUrl = 'http://localhost:3001/api/';
    const url = `${baseUrl}${variable}/${id}`;
    console.log(url)

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function fetchApiCreate(variable, data) {
    const baseUrl = 'http://localhost:3001/api/';
    const url = `${baseUrl}${variable}/new`;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const finalData = await response.json();
        return finalData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function fetchApiUpdate(variable, id, data) {
    const baseUrl = 'http://localhost:3001/api/';
    const url = `${baseUrl}${variable}/${id}`;


    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error(`HHTP error! status: ${response.status}`)
        }
        const finalData = await response.json();
        return finalData;
    } catch (error) {
        console.error('Error fetching Data: ', error);
        throw error;
    }
}


export const apiCalls = {
    fetchApiList,
    fetchApiDelete,
    fetchApiCreate,
    fetchApiUpdate
};
//export all functions in this file
export default apiCalls;