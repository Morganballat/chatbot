import { currentDateTime } from '../public/js/date.js';
import { getWeather, getSunset, getHumidity } from '../services/weatherService.js';
import Message from './Message.js';
import { startLoadingAnimation } from '../public/js/ui.js'

export default class WeatherBot 
{

    constructor(name, avatar)
    {
        this.name = name;
        this.avatar = avatar;
        this.awaitingMeteo = false;
        this.awaitingSunset = false;
        this.awaitingHumidity = false;
    }

    handleInput(messageInput)
    {
        if (this.awaitingMeteo)
        {
            const message = this.setMessageToApiAndResetStates(messageInput);
            getWeather(this, message.content.toLowerCase());
        } else if (this.awaitingSunset)
        {
            const message = this.setMessageToApiAndResetStates(messageInput);
            getSunset(this, message.content.toLowerCase());

        } else if (this.awaitingHumidity)
        {
            const message = this.setMessageToApiAndResetStates(messageInput);
            getHumidity(this, message.content.toLowerCase());

        } else
        {
            if (messageInput.content.toLowerCase().includes('météo'))
            {
                this.setMessageToUIAndSetStates(true, false, false, "De quelle ville souhaitez-vous connaître la météo ?", currentDateTime())
            } else if (messageInput.content.toLowerCase().includes('sunset'))
            {
                this.setMessageToUIAndSetStates(false, true, false, "De quelle ville souhaitez-vous connaitre le coucher de soleil ?", currentDateTime())
            } else if (messageInput.content.toLowerCase().includes('humidity'))
            {
                this.setMessageToUIAndSetStates(false, false, true, "De quelle ville souhaitez-vous connaitre l'humidité ?", currentDateTime())
            } else if (messageInput.content.toLowerCase().includes('botentouche'))
            {
                this.setMessageToUIAndSetStates(false, false, true, "Commandes météo: 'météo', 'sunset', 'humidity'", currentDateTime())
            }
        }
    }

    setMessageToApiAndResetStates(messageInput)
    {
        this.awaitingMeteo = false;
        this.awaitingSunset = false;
        this.awaitingHumidity = false;
        return new Message(this.name, this.avatar, messageInput.content, currentDateTime());
    }

    setMessageToUIAndSetStates(awaitingMeteo, awaitingSunset, awaitingHumidity, messageContent, date)
    {
        this.awaitingMeteo = awaitingMeteo;
        this.awaitingSunset = awaitingSunset;
        this.awaitingHumidity = awaitingHumidity;

        const message = new Message(this.name, this.avatar, messageContent, date)
        startLoadingAnimation(message);
    }
}
