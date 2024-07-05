import axios from 'axios';
import Message from "../classes/Message.js"
import { startLoadingAnimation } from '../public/js/ui.js'
import { currentDateTime } from '../public/js/date.js';

const videoGamesApiKey = '83dd9379fe37437096f997b48f7c3d5e';

export async function getRating(bot, game)
{
    const apiUrl = `https://api.rawg.io/api/games/${game}?key=${videoGamesApiKey}`;

    try
    {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const message = new Message(bot.name, bot.avatar, `La note de ${data.name} est de ${data.rating}/5.`, currentDateTime());
        startLoadingAnimation(message);

    } catch (error)
    {
        console.error(`${bot.name} : Erreur lors de la récupération des données du jeu :`, error.message);
        const message = new Message(bot.name, bot.avatar, 'Désolé, je ne peux pas récupérer les données de ce jeu. L\'avez-vous bien orthographié?', currentDateTime());
        startLoadingAnimation(message);
    }
}

export async function getAliases(bot, game)
{
    const apiUrl = `https://api.rawg.io/api/games/${game}?key=${videoGamesApiKey}`;

    try
    {
        const response = await axios.get(apiUrl);
        const data = response.data;
        let aliasesStringify = "";
        if (data.alternative_names.length > 0)
        {
            data.alternative_names.map((alias) =>
            {
                aliasesStringify += alias + ' ';
            })
        }

        const message = new Message(bot.name, bot.avatar, `Les aliases de ${data.name} sont ${aliasesStringify}.`, currentDateTime());
        startLoadingAnimation(message);

    } catch (error)
    {
        console.error(`${bot.name} : Erreur lors de la récupération des données du jeu :`, error.message);
        const message = new Message(bot.name, bot.avatar, 'Désolé, je ne peux pas récupérer les données de ce jeu. L\'avez-vous bien orthographié?', currentDateTime());
        startLoadingAnimation(message);
    }
}

export async function getRelease(bot, game)
{
    const apiUrl = `https://api.rawg.io/api/games/${game}?key=${videoGamesApiKey}`;

    try
    {
        const response = await axios.get(apiUrl);
        const data = response.data;

        const message = new Message(bot.name, bot.avatar, `La date de sortie de ${data.name} est ${data.released}.`, currentDateTime());
        startLoadingAnimation(message);
    } catch (error)
    {
        console.error(`${bot.name} : Erreur lors de la récupération des données du jeu :`, error.message);
        const message = new Message(bot.name, bot.avatar, 'Désolé, je ne peux pas récupérer les données de ce jeu. L\'avez-vous bien orthographié?', currentDateTime());
        startLoadingAnimation(message);
    }
}