
let user = prompt('Digite seu nome:');
    
let username = { name: user};


function loadMessage() {
    const load = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    load.then(loading);
}


function loading(data) {
    
    const dataUsers = data.data;
    let renderUsers = document.querySelector('main');
    renderUsers.innerHTML = '';

    for(let i =0; i < dataUsers.length; i++) {
        if(dataUsers[i].type === 'status') {
            renderUsers.innerHTML += `
            <div class="status">
            <span class="time">(${dataUsers[i].time})</span>
            <span class="from">${dataUsers[i].from}</span>
            <span class="text">${dataUsers[i].text}</span>
            </div>
            `;
        } else if (dataUsers[i].type === 'message') {
            renderUsers.innerHTML += `
            <div class="message">
            <span class="time">(${dataUsers[i].time})</span>
            <span class="from">${dataUsers[i].from}</span>
            <span>para</span>
            <span class="to">${dataUsers[i].to}:</span>
            <span class="text">${dataUsers[i].text}</span>
            </div>
            `;
        } else {
            renderUsers.innerHTML += `
            <div class="private_message">
            <span class="time">(${dataUsers[i].time})</span>
            <span class="from">${dataUsers[i].from}</span>
            <span>para</span>
            <span class="to">${dataUsers[i].to}:</span>
            <span class="text">${dataUsers[i].text}</span>
            </div>
            `;
        }
        
    }
}

function enterChat() {
    const userChat = 
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', username);

    userChat.then(sucesss);
    userChat.catch(isUserIdAlreadyused);

    function isUserIdAlreadyused(data) {
        user = prompt('Digite seu nome:');
        enterChat();
    }
    
    function sucesss(data) {
        setInterval(() => {
            axios.post(
                'https://mock-api.driven.com.br/api/v6/uol/status',username)
        },5000);
        
    }
    
}


enterChat();

setInterval(loadMessage,3000);


function sendMsgToServer() {
    let msgContent = document.querySelector('.sendMessage');
    sendMessage(msgContent.value);
    msgContent.value ='';

}
function sendMessage(message) {
    

    let messageContent = {
        from: user,
	    to: "Todos",
	    text: message,
	    type: "message" // ou "private_message" para o bônus
    }


    const send = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',messageContent);


}