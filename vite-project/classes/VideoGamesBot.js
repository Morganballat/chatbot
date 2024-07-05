// 83dd9379fe37437096f997b48f7c3d5e

import { currentDateTime } from '../public/js/date.js';
import { getRelease, getAliases, getRating } from '../services/videoGamesService.js';
import Message from './Message.js';
import { startLoadingAnimation } from '../public/js/ui.js'

export default class VideoGamesBot 
{
    constructor(name, avatar)
    {
        this.name = name;
        this.avatar = avatar;
        this.awaitingRating = false;
        this.awaitingRelease = false;
        this.awaitingAlias = false;
    }

    handleInput(messageInput)
    {
        if (this.awaitingRating)
        {
            const message = this.setMessageToApiAndResetStates(messageInput);
            getRating(this, message.content.toLowerCase());
        } else if (this.awaitingRelease)
        {
            const message = this.setMessageToApiAndResetStates(messageInput);
            getRelease(this, message.content.toLowerCase());

        } else if (this.awaitingAlias)
        {
            const message = this.setMessageToApiAndResetStates(messageInput);
            getAliases(this, message.content.toLowerCase());

        } else
        {
            if (messageInput.content.toLowerCase().includes('rating'))
            {
                this.setMessageToUIAndSetStates(true, false, false, "De quel jeu souhaitez vous avoir la note ?", currentDateTime())
            } else if (messageInput.content.toLowerCase().includes('release'))
            {
                this.setMessageToUIAndSetStates(false, true, false, "De quel jeu souhaitez vous avoir la date de sortie ?", currentDateTime())
            } else if (messageInput.content.toLowerCase().includes('alias'))
            {
                this.setMessageToUIAndSetStates(false, false, true, "De quel jeu souhaitez vous avoir les noms alternatifs ?", currentDateTime())
            } else if (messageInput.content.toLowerCase().includes('botentouche'))
            {
                this.setMessageToUIAndSetStates(false, false, true, "Commandes jeu vidéo: 'rating', 'release', 'alias'", currentDateTime())
            }
        }
    }

    setMessageToApiAndResetStates(messageInput)
    {
        this.awaitingRating = false;
        this.awaitingRelease = false;
        this.awaitingAlias = false;
        return new Message(this.name, this.avatar, messageInput.content, currentDateTime());
    }

    setMessageToUIAndSetStates(awaitingRating, awaitingRelease, awaitingAlias, messageContent, date)
    {
        this.awaitingRating = awaitingRating;
        this.awaitingRelease = awaitingRelease;
        this.awaitingAlias = awaitingAlias;

        const message = new Message(this.name, this.avatar, messageContent, date)
        startLoadingAnimation(message);
    }
}
