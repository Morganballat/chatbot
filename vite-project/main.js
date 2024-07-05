import Message from './classes/Message';
import WeatherBot from './classes/WeatherBot';
import { addMessageToLocalStorage, updloadConversation, clearLocalStorage } from './utils/localStorage';
import { currentDateTime } from './public/js/date';
import HelpBot from './classes/HelpBot';
import VideoGamesBot from './classes/VideoGamesBot';
import PokemonBot from './classes/PokemonBot';

const weatherBot = new WeatherBot("MétéoBot", "images/meteo.jpg");
const helpBot = new HelpBot("AssistantBot", "images/helper.jpg");
const videoGamesBot = new VideoGamesBot("Jeux vidéoBot", "images/videoGames.jpg");
const pokemonBot = new PokemonBot("PokemonBot", "images/pokeball.png")

const bots = [helpBot, weatherBot, videoGamesBot, pokemonBot];

let state = null;

const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messageList = document.getElementById('messageList');
const botList = document.getElementById('botList');
const resetBtn = document.getElementById('resetConversation');

document.addEventListener('DOMContentLoaded', () =>
{
    const conversationMessages = updloadConversation();
    if (conversationMessages && conversationMessages.length > 0)
    {
        conversationMessages.map((message) =>
        {
            addMessage(message);
        })
    }
})

resetBtn.addEventListener('click', () => 
{
    clearLocalStorage();
})

if (bots)
{
    bots.map((bot) => botList.innerHTML += `
<li class="p-2">
    <a href="#!" class="d-flex justify-content-between" id="${bot.name}Id">
        <div class="d-flex flex-row">
            <img src=${bot.avatar} alt="avatar"
                class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60">
                <div>
                    ${bot.name}
                </div>
        </div>
    </a>
</li>
`);
}

if (messageForm)
{
    messageForm.addEventListener('submit', function (event)
    {
        event.preventDefault();
        const messageText = messageInput.value.trim();

        if (messageText === '')
        {
            return;
        }

        const message = new Message('Moi', '/public/images/user.jpg', messageText, currentDateTime())
        addMessage(message);
        addMessageToLocalStorage(message);

        if (messageText === 'météo' || messageText === 'sunset' || messageText === 'humidity')
        {
            state = 'weatherBot';
            weatherBot.handleInput(message);
        } else if (messageText === 'rating' || messageText === 'alias' || messageText === 'release')
        {
            state = 'videoGamesBot';
            videoGamesBot.handleInput(message);
        } else if (messageText === 'ability' || messageText === 'type' || messageText === 'location')
        {
            state = 'pokemonBot';
            pokemonBot.handleInput(message);
        } else if (messageText === 'help')
        {
            state = null;
            helpBot.handleInput(message);

        } else if (messageText === 'botentouche')
        {
            state = null;
            weatherBot.handleInput(message);
            pokemonBot.handleInput(message);
            videoGamesBot.handleInput(message);
        } else if (state === 'weatherBot')
        {
            state = null;
            weatherBot.handleInput(message);

        } else if (state === 'videoGamesBot')
        {
            state = null;
            videoGamesBot.handleInput(message);

        } else if (state === 'pokemonBot')
        {
            state = null;
            pokemonBot.handleInput(message);
        } else
        {
            helpBot.handleInput(message);
        }

        messageInput.value = '';
    });
}


export function addMessage(message)
{
    let messageHTML = '';

    if (message.senderName === "Moi")
    {
        messageHTML = `
            <li class="d-flex justify-content-between mb-4">
                <img src=${message.senderAvatar} alt="avatar" class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
                <div class="card mask-custom w-100">
                    <div class="card-header d-flex justify-content-between p-3" style="border-bottom: 1px solid rgba(255,255,255,.3);">
                        <p class="fw-bold mb-0">${message.senderName}</p>
                        <p class="small mb-0"><i class="far fa-clock"></i> ${currentDateTime()}</p>
                    </div>
                    <div class="card-body">
                        <p class="mb-0">${message.content}</p>
                    </div>
                </div>
            </li>
        `;
    } else
    {
        messageHTML = `
            <li class="d-flex justify-content-between mb-4">
                <div class="card mask-custom w-100">
                    <div class="card-header d-flex justify-content-between p-3" style="border-bottom: 1px solid rgba(255,255,255,.3);">
                        <p class="fw-bold mb-0">${message.senderName}</p>
                        <p class="small mb-0"><i class="far fa-clock"></i> ${currentDateTime()}</p>
                    </div>
                    <div class="card-body">
                        <p class="mb-0">${message.content}</p>
                    </div>
                </div>
                <img src="${message.senderAvatar}" alt="avatar" class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
            </li>
        `;
    }

    messageList.innerHTML += messageHTML;
    messageList.gradientCustom = messageList.scrollHeight;
}
