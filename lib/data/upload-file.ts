import axios from 'axios'

const baseAPI = process.env.NEXT_PUBLIC_API;
export const uploadImageToServer = async (images: FormData) => {
    const response = await axios(`${baseAPI}/api/v1/files/upload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: images
    })
    return response;
}
