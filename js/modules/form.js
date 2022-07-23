"use strict";

function form(){

       

    // sending form

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы сами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const forms = document.querySelectorAll('form');
    forms.forEach(item => {
        bindPostData(item);
    });

    async function postData(url, data){

        const result = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: data,
            });
  
        return await result.json();
    }

    function bindPostData(form){

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);


            const formData = new FormData(form); // для formData в верстке всегда должны быть указаны атрибуты name

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {console.log(data);
                                statusMessage.remove();
                
                });
        });
               
    }
    

}

module.exports = form;