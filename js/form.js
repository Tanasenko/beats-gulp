(function () {
    const sendButton = document.querySelector('#loadButton');
const form = document.querySelector('.form');
const closeButton = document.querySelector('#close');
const message = document.querySelector('.message');
const title = document.querySelector('.message__title');


sendButton.addEventListener('click', e => {
    e.preventDefault();

    if(validateForm(form)) {
        const data = {
            name: form.elements.name.value,
            phone: form.elements.phone.value,
            comment: form.elements.comment.value,
            to: 'qwerty@mail.ru'
        };

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', () => {
            
            if (xhr.response == 'status:1') {
                message.style.display = 'flex';
                title.innerHTML = 'Cообщение отправлено'
                
            } else {
                message.style.display = 'flex';
                title.innerHTML = 'Ошибка';
            }
            
        });
    }

});

const validateForm = (form => {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }
    
    if (!validateField(form.elements.phone)) {
        valid = false;
    };

    if (!validateField(form.elements.comment)) {
        valid = false;
    };

    return valid;

});

const validateField = (field => {
    if (!field.checkValidity()) {
        field.nextElementSibling.textContent = field.validationMessage;
        return false;
    } else {
        field.nextElementSibling.textContent = '';
        return true;
    }

});


closeButton.addEventListener('click', e => {
    e.preventDefault();

    message.style.display = 'none';
});
})
