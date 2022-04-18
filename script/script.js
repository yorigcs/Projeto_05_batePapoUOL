let messageContent = {
	from: "nome do usuário",
	to: "Todos",
	text: "mensagem digitada",
	type: "message" // ou "private_message" para o bônus
};

const getHTML = document.querySelector('.addRemove');

function enterChat() {
    
    user = document.querySelector('.userName').value;
    messageContent.from = user;

    const username = {name: messageContent.from };
    const userChat = 
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', username);

    //pre-loading
    getHTML.innerHTML = `
    <div class="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <div>Entrando...</div>
  `;
    

    userChat.then(sucesss);
    userChat.catch(handleError);
    
    function sucesss(data) {
        document.querySelector('.init').innerHTML = '';
        document.querySelector('body').classList.remove('color');
        document.querySelector('header').classList.remove('hide');
        document.querySelector('footer').classList.remove('hide');
        loadMessage();
        getOnlineUsers();
        setInterval(loadMessage,3000);
        setInterval(getOnlineUsers,10000);
        setInterval(() => {
            axios.post(
                'https://mock-api.driven.com.br/api/v6/uol/status',username);
                
                
        },5000);
        
    }
    
}

function handleError(error) {
    let errorMSG = '';
    switch(error.response.status) {
        // Já tem um usuário online com esse nick
        case 400:
            errorMSG = `
            <p>Já há um usuário com esse nome!</p>
            <p>Por favor, escolha outro!</p>
            `;
            break;
        default:
            errorMSG = 'Um erro desconhecido ocorreu';
            break;  
    }
    getHTML.innerHTML = errorMSG;
    setInterval(() => window.location.reload(),3000);
}

function loadMessage() {
    const load = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    load.then(loading);


    function loading(users) {
    
        const dataUsers = users.data;
        let renderUsers = document.querySelector('main');
        //Clear
        renderUsers.innerHTML = '';
        
        for(let i =0; i < dataUsers.length; i++) {

            switch(dataUsers[i].type) {
                case 'message': {
                    renderUsers.innerHTML += `
                    <div class="message element">
                    <span class="time">(${dataUsers[i].time})</span>
                    <span class="from">${dataUsers[i].from}</span>
                    <span>para</span>
                    <span class="to">${dataUsers[i].to}:</span>
                    <span class="text">${dataUsers[i].text}</span>
                    </div>
                    `;
                    break;
                    }
                
                    
                case 'private_message': {
                    if(dataUsers[i].from === messageContent.from 
                        || dataUsers[i].to === messageContent.from ) {

                            renderUsers.innerHTML += `
                            <div class="private_message element">
                            <span class="time">(${dataUsers[i].time})</span>
                            <span class="from">${dataUsers[i].from}</span>
                            <span>para</span>
                            <span class="to">${dataUsers[i].to}:</span>
                            <span class="text">${dataUsers[i].text}</span>
                            </div>
                            `;
                            break;
                        }
                    
                    }
                default: {
                    renderUsers.innerHTML += `
                    <div class="status element">
                    <span class="time">(${dataUsers[i].time})</span>
                    <span class="from">${dataUsers[i].from}</span>
                    <span class="text">${dataUsers[i].text}</span>
                    </div>
                    `;
                    break;
                }
                    
            }
            

        }
        document.querySelectorAll('.element')[99].scrollIntoView();
    }

}


function getOnlineUsers() {
    let allOnlineUsers = [];
    const getOnlineusers = axios.get(
        'https://mock-api.driven.com.br/api/v6/uol/participants');
    
        getOnlineusers.then(getusers);
        getOnlineusers.catch(handleError);
        
        
        function getusers(users){
            allOnlineUsers = [];
            const onlineUsers = users.data;
            for(let i = 0; i < onlineUsers.length; i++) {
                allOnlineUsers.push(onlineUsers[i].name);
            }
            console.log(allOnlineUsers);
            
            renderOnlineUsers(allOnlineUsers);
            
        }
        
}

function renderOnlineUsers(onlineUsers) {
    let divcontent = ``;

    const divUsers = document.querySelector('.users');
    divUsers.innerHTML = '';

    for(let i = 0 ; i < onlineUsers.length; i++) {

        divcontent = 
        `<div class="userscontent" onclick="selectUser(this)">
                <div class="userOnlineName">
                    <ion-icon name="people"></ion-icon>
                    <span class="username">${onlineUsers[i]}</span>
                </div>
                <ion-icon class="hide" name="checkmark"></ion-icon>
            </div>
        </div>`;

        divUsers.innerHTML += divcontent;

    }

}

function selectUser(element) {
    const getCheck =document.querySelector('.userscontent .hide.check');
    const getUser = element.querySelector('.username').innerHTML;
    messageContent.to = getUser;
    if(getCheck) {
        getCheck.classList.remove('check');
    }

    element.querySelector('.hide').classList.add('check');
    
}

function selectType(element) {
    const getCheck =document.querySelector('.type .hide.check');
    const getType = element.querySelector('span').innerHTML;
    if(getType === 'Reservadamente') {
        messageContent.type = 'private_message';
    } else {
        messageContent.type = 'message';
    }
    if(getCheck) {
        getCheck.classList.remove('check');
    }

    element.querySelector('.hide').classList.add('check');
    
}


function sendMsgToServer() {
    let msgContent = document.querySelector('.sendMessage');
    sendMessage(msgContent.value);
    msgContent.value ='';

}
function sendMessage(message) {
    messageContent.text = message;
    const send = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',messageContent);

    send.then(loadMessage);
}





function showListUsers() {
    document.querySelector('.listOnlineUsers').style.height = '100%';

}

function hideListUsers() {
    document.querySelector('.listOnlineUsers').style.height = '0';

}

function allowEnterButton() {
    document.querySelector('.userName').addEventListener('keydown',
(event) => {
    if(event.key === 'Enter') {
        enterChat();
    }
});


document.querySelector('.sendMessage').addEventListener('keydown',
(event) => {
    if(event.key === 'Enter') {
        sendMsgToServer();
    }
});
}
allowEnterButton();