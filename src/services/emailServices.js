import axios from "axios"

export const SendEmail = async(requestBody) =>{
    try{
        const endpoint = import.meta.env.VITE_APP_CONTACTSEND;
        const response = await axios.post(endpoint, requestBody);
        return response;
    } catch(error) {
        console.error('Error sending email', error); 
        throw error;
    }
}