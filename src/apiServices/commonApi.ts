import axios from "axios";


export const fetchStatesAndCities = async (pincode: string) => {
    try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
        return response?.data[0]?.PostOffice
    } catch (error: any) {
        console.error('Error in fetching states and cities: ', error.message)
    }
}