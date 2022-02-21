import axios from "axios";

const API_URL = 'http://localhost:5000/api/goods/'

const createGoods = async (goodData, token) => {
    const config= {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goodData, config)

    return response.data
}

const getGoods = async (token) => {
    const config= {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteGood = async (goodId, token) => {
    const config= {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + goodId, config)

    return response.data
}

const goodsService = {
    createGoods,
    getGoods,
    deleteGood
}

export default goodsService