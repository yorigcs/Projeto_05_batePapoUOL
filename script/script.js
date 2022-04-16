let user = '';

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
    
    user = document.querySelector('.userName').value;
    const username = {name: user};
    const userChat = 
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', username);

    const getHTML = document.querySelector('.addRemove');
    getHTML.innerHTML = 'Entrando...';
    

    userChat.then(sucesss);
    userChat.catch(isUserIdAlreadyused);

    function isUserIdAlreadyused(data) {
        let errorMSG = '';
        // Já tem um usuário online com esse nick
        if(data.response.status === 400) {
            errorMSG = `
            <p>Já há um usuário com esse nome!</p>
            <p>Por favor, escolha outro!</p>
            `;        
            getHTML.innerHTML = userAlreadyUsed;
            setInterval(() => window.location.reload(),3000);
        } else {
            errorMSG = 'Um erro desconhecido ocorreu';
            setInterval(() => window.location.reload(),3000);
        }
        
    }
    
    function sucesss(data) {
        document.querySelector('.init').innerHTML = '';
        document.querySelector('body').classList.remove('color');
        document.querySelector('header').classList.remove('hide');
        document.querySelector('footer').classList.remove('hide');
        loadMessage();
        setInterval(loadMessage,3000);
        setInterval(() => {
            axios.post(
                'https://mock-api.driven.com.br/api/v6/uol/status',username)
        },5000);
        
    }
    
}


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

    send.then(loadMessage);
    send.catch(errorf);
}


function errorf(erro) {
    console.log(erro.response.status);
}