import axios from "axios";

export const getRequest = async (resource, id = '' ) => {
    try{
        return await axios.get(`${process.env.REACT_APP_BACK_URL}/${resource}/${id}`)
    }catch(error){
        return { data: error, message: error.message }
    }
}

export const postRequest = async (resource, data) => {
    try{
        return await axios.post(`${process.env.REACT_APP_BACK_URL}/${resource}`, data)
    }catch(error){
        return { data: error, message: error.message }
    }
}

export const putRequest = async (resource, data) => {
    try{
        return await axios.put(`${process.env.REACT_APP_BACK_URL}/${resource}/${data.id}`, data)
    }catch(error){
        return { data: error, message: error.message }
    }
}

export const deleteRequest = async (resource, id) => {
    try{
        return await axios.delete(`${process.env.REACT_APP_BACK_URL}/${resource}/${id}`)
    }catch(error){
        return { data: error, message: error.message }
    }
    
}