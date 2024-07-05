import axios from 'axios';
import Message from "../classes/Message.js"
import { startLoadingAnimation } from '../public/js/ui.js'
import { currentDateTime } from '../public/js/date.js';

export async function getType(bot, pokemon)
{
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

    try
    {
        const response = await axios.get(apiUrl);
        const data = response.data;
        let typesStringify = "";
        if (data.types.length > 0)
        {
            data.types.map((type) =>
            {
                typesStringify += type.type.name + ' ';
            })
        }
        const message = new Message(bot.name, bot.avatar, `Le type de ${pokemon} est ${typesStringify}.`, currentDateTime());
        startLoadingAnimation(message);

    } catch (error)
    {
        console.error(`${bot.name} : Erreur lors de la récupération des données :`, error.message);
        const message = new Message(bot.name, bot.avatar, 'Désolé, je ne peux pas récupérer le type de ce pokémon.', currentDateTime());
        startLoadingAnimation(message);
    }
}

export async function getLocation(bot, pokemon)
{
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`;

    try
    {
        const response = await axios.get(apiUrl);
        const data = response.data;
        console.log(data);
        let locations = "";

        data.map((location) =>
        {
            const locationStringify = location.location_area.name.split('-').join(' ');
            locations += "<br>" + '- ' + locationStringify;
        })

        const message = new Message(bot.name, bot.avatar, `On retrouve ce Pokemon dans ces localités: ${locations}`, currentDateTime());
        startLoadingAnimation(message);

    } catch (error)
    {
        console.error(`${bot.name} : Erreur lors de la récupération des données:`, error.message);
        const message = new Message(bot.name, bot.avatar, 'Désolé, je ne peux pas récupérer l\'information concernant ce pokémon.', currentDateTime());
        startLoadingAnimation(message);
    }
}

export async function getAbility(bot, pokemon)
{
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
    try
    {
        const response = await axios.get(apiUrl);
        const data = response.data;
        let abilitiesStringify = "";
        if (data.abilities.length > 0)
        {
            data.abilities.map((ability) =>
            {
                abilitiesStringify += ability.ability.name + ', ';
            })
        }
        const message = new Message(bot.name, bot.avatar, `Les capacité de ${pokemon} sont ${abilitiesStringify}.`, currentDateTime());
        startLoadingAnimation(message);

    } catch (error)
    {
        console.error(`${bot.name} : Erreur lors de la récupération des données: `, error.message);
        const message = new Message(bot.name, bot.avatar, 'Désolé, je ne peux pas récupérer l\'information concernant ce pokémon.', currentDateTime());
        startLoadingAnimation(message);
    }
}