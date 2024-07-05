import { currentDateTime } from '../public/js/date.js';
import { getAbility, getLocation, getType } from '../services/pokemonService.js';
import Message from './Message.js';
import { startLoadingAnimation } from '../public/js/ui.js'

export default class PokemonBot 
{

    constructor(name, avatar)
    {
        this.name = name;
        this.avatar = avatar;
        this.awaitingAbility = false;
        this.awaitingLocation = false;
        this.awaitingType = false;
    }

    handleInput(messageInput)
    {
        if (this.awaitingAbility)
        {
            const message = this.setMessageToApiAndResetStates(messageInput);
            getAbility(this, message.content.toLowerCase());
        } else if (this.awaitingLocation)
        {
            const message = this.setMessageToApiAndResetStates(messageInput);
            getLocation(this, message.content.toLowerCase());

        } else if (this.awaitingType)
        {
            const message = this.setMessageToApiAndResetStates(messageInput);
            getType(this, message.content.toLowerCase());

        } else
        {
            if (messageInput.content.toLowerCase().includes('ability'))
            {
                this.setMessageToUIAndSetStates(true, false, false, "De quel pokémon souhaitez-vous connaître les capacités ?", currentDateTime())
            } else if (messageInput.content.toLowerCase().includes('location'))
            {
                this.setMessageToUIAndSetStates(false, true, false, "De quel pokémon souhaitez-vous connaitre l'emplacement' ?", currentDateTime())
            } else if (messageInput.content.toLowerCase().includes('type'))
            {
                this.setMessageToUIAndSetStates(false, false, true, "De quel pokémon souhaitez-vous connaitre le type ?", currentDateTime())
            } else if (messageInput.content.toLowerCase().includes('botentouche'))
            {
                this.setMessageToUIAndSetStates(false, false, true, "Commandes pokemon: 'ability', 'type', 'location' (données d'api en anglais)", currentDateTime())
            }
        }
    }

    setMessageToApiAndResetStates(messageInput)
    {
        this.awaitingAbility = false;
        this.awaitingLocation = false;
        this.awaitingType = false;
        return new Message(this.name, this.avatar, messageInput.content, currentDateTime());
    }

    setMessageToUIAndSetStates(awaitingAbility, awaitingLocation, awaitingType, messageContent, date)
    {
        this.awaitingAbility = awaitingAbility;
        this.awaitingLocation = awaitingLocation;
        this.awaitingType = awaitingType;

        const message = new Message(this.name, this.avatar, messageContent, date)
        startLoadingAnimation(message);
    }
}
