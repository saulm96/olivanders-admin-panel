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
        console.log(response)
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
export const apiCalls = {
    fetchApiList,
    fetchApiDelete
};
//export all functions in this file
export default apiCalls;