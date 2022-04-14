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

setInterval(loadMessage,5000);
