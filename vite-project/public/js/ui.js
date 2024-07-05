import { addMessage } from '../../main.js';
import { addMessageToLocalStorage } from '../../utils/localStorage.js';
import HelpBot from '../../classes/HelpBot.js';
import Message from '../../classes/Message.js';
import { currentDateTime } from './date.js';

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

    if (assistantBtn)
    {
        assistantBtn.addEventListener('click', () =>
        {
            const message = new Message('Moi', '/public/images/user.jpg', "help", currentDateTime())
            const helpBot = new HelpBot("AssistantBot", "images/helper.jpg");
            helpBot.handleInput(message);
        });
    }
});
