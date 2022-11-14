import { getRequest, postRequest, deleteRequest, putRequest  } from './Request'

export const getResource = async (resource, id = '') => {
    return await getRequest(resource, id)
}

export const setResource = async (resource, data) => {
    console.log( resource, data )
    if( data.id ){
        console.log(data.id)
        return await putRequest(resource, data)
    }else{
        return await postRequest(resource, data)
    }
}

export const deleteResource = async (resource, id) => {
    return await deleteRequest(resource, id)
}