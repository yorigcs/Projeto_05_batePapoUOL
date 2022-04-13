function loadMessage() {
    const load = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    load.then(ms);
}

function ms(data) {
    console.log(data);
}

loadMessage();