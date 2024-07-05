import { startLoadingAnimation } from '../public/js/ui.js'
import Message from './Message.js';
import { currentDateTime } from '../public/js/date.js';

export default class HelpBot 
{

    constructor(name, avatar)
    {
        this.name = name;
        this.avatar = avatar;
    }

    handleInput(messageInput)
    {
        if (messageInput.content.toLowerCase().includes('help'))
        {
            const helpMessage = "Bonjour!<br><br>Concernant la météo :<br>- Afin de consulter la météo d'une ville, tapez 'météo'.<br>- Afin de consulter l'heure de coucher du soleil dans une ville, tapez 'sunset'.<br>- Afin de consulter le taux d'humidité d'une ville, tapez 'humidity'. <br><br>Concernant les jeux vidéos :<br>- Afin de consulter la note d'un jeu vidéo, tapez 'rating'.<br>- Afin de consulter les noms alternatif d'un jeu vidéo, tapez 'alias'.<br>- Afin de consulter la date de sortie d'un jeu vidéo, tapez 'release'.<br><br>Concernant les pokemons :<br>- Afin de consulter les capacités d'un pokémon, tapez 'ability'.<br>- Afin de consulter le type d'un pokémon, tapez 'type'.<br>- Afin de consulter où trouver un pokémon, tapez 'location'. <br><br>Enfin, Si vous préférez des commandes simplifiées, résumées par les bots, tapez 'botentouche'. <br><br>Hasta la vista!";
            const message = new Message(this.name, this.avatar, helpMessage, currentDateTime())

            startLoadingAnimation(message);
        } else
        {
            const message = new Message(this.name, this.avatar, "qu'essayez-vous de dire? Tapez 'help' pour avoir la liste des commandes", currentDateTime())

            startLoadingAnimation(message);
        }

    }

}
