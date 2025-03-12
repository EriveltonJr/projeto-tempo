import {API_KEY} from "@env";

const BASE_URL = "https://api.weatherapi.com/v1";

export async function getWeather(city: any) {
    try {
        const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar clima:", error);
        return null;
    }
}