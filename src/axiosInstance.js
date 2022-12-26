import axios from "axios"

const instance = axios.create({
    baseURL: "https://reviewphim.vesotuchononline.com/api",
})

export default instance
