import { addMessage } from '../../main.js';
import { addMessageToLocalStorage } from '../../utils/localStorage.js';
import HelpBot from '../../classes/HelpBot.js';
import Message from '../../classes/Message.js';
import { currentDateTime } from './date.js';
import PokemonBot from '../../classes/PokemonBot.js';
import WeatherBot from '../../classes/WeatherBot.js';
import VideoGamesBot from '../../classes/VideoGamesBot.js';

export function startLoadingAnimation(message)
{
    const loadingDotsElement = document.getElementById('loadingDots');
    let dots = '';

    const intervalId = setInterval(function ()
    {
        if (dots.length < 3)
        {
            dots += '.';
        } else
        {
            dots = '';
        }

        loadingDotsElement.textContent = `${message.senderName} est en train d'écrire${dots}`;
        scrollToBottom();
    }, 500);

    setTimeout(function ()
    {
        clearInterval(intervalId);
        loadingDotsElement.textContent = '';
        addMessage(message);
        addMessageToLocalStorage(message);

    }, 3000);
}

document.addEventListener('DOMContentLoaded', () =>
{
    const assistantBtn = document.querySelector("#AssistantBotId");
    const pokemonBtn = document.querySelector("#PokemonBotId");
    const weatherBtn = document.querySelector("#MeteoBotId");
    const videoGamesBtn = document.querySelector("#JeuxVideoBotId");

    if (assistantBtn)
    {
        botsHelpMessage(assistantBtn, "AssistantBot", HelpBot, "images/helper.jpg", "help");
    }

    if (pokemonBtn)
    {
        botsHelpMessage(pokemonBtn, "PokemonBot", PokemonBot, "images/pokeball.png", "botentouche");
    }

    if (weatherBtn)
    {
        botsHelpMessage(weatherBtn, "MeteoBot", WeatherBot, "images/meteo.jpg", "botentouche");
    }

    if (videoGamesBtn)
    {
        botsHelpMessage(videoGamesBtn, "JeuxVideoBot", VideoGamesBot, "images/videoGames.jpg", "botentouche");
    }

});

function botsHelpMessage(htmlBtn, botName, bot, picture, triggerWord)
{
    htmlBtn.addEventListener('click', () =>
    {
        const message = new Message('Moi', '/public/images/user.jpg', triggerWord, currentDateTime());
        const currentBot = new bot(botName, picture);
        currentBot.handleInput(message);
    });
}

export function scrollToBottom()
{
    var html = document.documentElement;
    if (html)
    {
        console.log(html.scrollheight);
        var maxScrollTop = html.scrollHeight - window.innerHeight;

        html.scrollTop = maxScrollTop;
    }
}
