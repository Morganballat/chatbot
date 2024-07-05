const resetBtn = document.getElementById('resetConversation');
if (resetBtn)
{
    resetBtn.addEventListener('click', () => 
    {
        clearLocalStorage();
    })
}


export function addMessageToLocalStorage(message)
{
    let conversations = JSON.parse(localStorage.getItem('conversations')) || [];

    conversations.push(message);

    localStorage.setItem('conversations', JSON.stringify(conversations));
}

export function updloadConversation()
{
    return JSON.parse(localStorage.getItem('conversations')) || [];

}

export function clearLocalStorage()
{
    localStorage.clear();
    location.reload();
}
