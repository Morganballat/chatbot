import axios from 'axios';
import Message from "../classes/Message.js"
import { startLoadingAnimation } from '../public/js/ui.js'
import { currentDateTime } from '../public/js/date.js';

const MeteoApiKey = '49a396ca8c62abb324456a9db83dcc02';

export async function getWeather(bot, city)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MeteoApiKey}&units=metric&lang={fr}`;

    try
    {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const message = new Message(bot.name, bot.avatar, `Météo à ${city} : ${data.weather[0].description}, Température : ${data.main.temp}°C`, currentDateTime());
        startLoadingAnimation(message);

    } catch (error)
    {
        console.error(`${bot.name} : Erreur lors de la récupération des données météo :`, error.message);
        const message = new Message(bot.name, bot.avatar, 'Désolé, je ne peux pas récupérer la météo pour cette ville.', currentDateTime());
        startLoadingAnimation(message);
    }
}

export async function getSunset(bot, city)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MeteoApiKey}&units=metric&lang={fr}`;

    try
    {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const date = new Date(data.sys.sunset * 1000);

        const message = new Message(bot.name, bot.avatar, `Le coucher de soleil à ${city} aura lieu à : ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} h`, currentDateTime());
        startLoadingAnimation(message);

    } catch (error)
    {
        console.error(`${bot.name} : Erreur lors de la récupération des données:`, error.message);
        const message = new Message(bot.name, bot.avatar, 'Désolé, je ne peux pas récupérer le coucher de soleil pour cette ville. Vérifiez si elle existe et réessayez.', currentDateTime());
        startLoadingAnimation(message);
    }
}

export async function getHumidity(bot, city)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MeteoApiKey}&units=metric&lang={fr}`;

    try
    {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const message = new Message(bot.name, bot.avatar, `L'humidité' à ${city} est de : ${data.main.humidity} %`, currentDateTime());
        startLoadingAnimation(message);

    } catch (error)
    {
        console.error(`${bot.name} : Erreur lors de la récupération des données:`, error.message);
        const message = new Message(bot.name, bot.avatar, 'Désolé, je ne peux pas récupérer l\'humidité pour cette ville. Vérifiez si elle existe et réessayez.', currentDateTime());
        startLoadingAnimation(message);
    }
}