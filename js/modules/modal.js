"use strict";

function modal(){
    const modalBtns = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');

    const modalTimerId = setTimeout(openModal, 5000);

    window.addEventListener('scroll', showModalByScroll);
    // {once: true}
    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight + 1 >= document.
            documentElement.scrollHeight){
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
        }
    }


    function openModal(){
        modalWindow.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal(){
        modalWindow.classList.toggle('show');
        document.body.style.overflow = '';
    }
    modalBtns.forEach(item => {
        item.addEventListener('click', openModal);
    });

    modalClose.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (event) =>{
        const target = event.target;
        if (target === modalWindow){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalWindow.classList.contains('show')){
            closeModal();
        }
    });
}

module.exports = modal;