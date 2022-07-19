"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
                tabsContent = document.querySelectorAll('.tabcontent'),
                tabsParent = document.querySelector('.tabheader__items');
    
    class MenuItem{
        constructor(src, alt, title, description, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH();
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            if (this.classes.length === 0){
                element.classList.add('menu__item');   
            }
            else{
                this.classes.forEach(classValue => element.classList.add(classValue));
            }
            element.innerHTML = `   <img src=${this.src} alt=${this.alt}>
                                    <h3 class="menu__item-subtitle">${this.title}</h3>
                                    <div class="menu__item-descr">${this.description}</div>
                                    <div class="menu__item-divider"></div>
                                    <div class="menu__item-price">
                                        <div class="menu__item-cost">Цена:</div>
                                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                    </div>`;

            this.parent.append(element);
        }
    }
    
    
    // tabs
    function hideTabContent() {
        tabsContent.forEach( item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach( item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadLine = '2022-08-01';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24) ),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours= timer.querySelector('#hours'),
              minutes= timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timerInterval);
            }
        }
    }
    const modalBtns = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');


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

    setClock('.timer', deadLine);

    // get data from json.db and place it on page

    async function getDataToCards(url){

        const result = await fetch(url);

        if (!result.ok){
            alert(new Error(`"Coudn't fetch ${url}!`));
        }

        return await result.json();
    }


    getDataToCards("http://localhost:3000/cards")
        .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {       
            new MenuItem(img, altimg, title, descr, price, ".menu .container").render();
        });
    });


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
    


    // slider

    const Slides = document.querySelectorAll(".offer__slide");
    const NextSlider = document.querySelector(".offer__slider-next");
    const PrevSlider = document.querySelector(".offer__slider-prev");
    const currentSlide = document.querySelector("#current");
    const offerSliderWrapper = document.querySelector(".offer__slider-wrapper");
    const offerSliderField = document.querySelector(".offer__slider-field");
    const width = window.getComputedStyle(offerSliderWrapper).width;
    


    let SlideIndex = 1;
    let offset = 0;
    

    offerSliderField.style.width = 100 * Slides.length + "%";
    offerSliderField.style.display = "flex";
    offerSliderField.style.transition = "0.5s all";

    offerSliderWrapper.style.overflow = "hidden";

    NextSlider.addEventListener('click', event => {
        
        if (offset == +(width.slice(0, width.length - 2) * (Slides.length - 1))){
            offset = 0;
            SlideIndex = 1;
        }
        else{
            offset += +width.slice(0, width.length - 2);
            SlideIndex += 1;
        }
        offerSliderField.style.transform = `translateX(${-offset}px)`;

        if (Slides.length < 10){
            currentSlide.textContent = `0${SlideIndex}`;
        }else{
            currentSlide.textContent = `${SlideIndex}`;
        }
        
    });

    PrevSlider.addEventListener('click', event => {
        
        if (offset == 0) {
            offset = +(width.slice(0, width.length - 2) * (Slides.length - 1));
            SlideIndex = 4;
        } 
        else {
            offset -= +(width.slice(0, width.length - 2));
            SlideIndex -= 1;
        }
        offerSliderField.style.transform = `translateX(${-offset}px)`;
        currentSlide.textContent = SlideIndex;

        if (Slides.length < 10){
            currentSlide.textContent = `0${SlideIndex}`;
        }else{
            currentSlide.textContent = `${SlideIndex}`;
        }
    });


    // showSlide(1);

    // function showSlide(n){

    //     if (n < 1){
    //         SlideIndex = Slides.length;
    //     }
    //     else if (n > Slides.length){
    //         SlideIndex = 1;
    //     }
    //     else{
    //         SlideIndex = n;
    //     }


    //     Slides.forEach((value) => {
    //         value.style.display = "none";
    //     });

    //     Slides[SlideIndex - 1].style.display = "block";

    //     currentSlide.textContent = `0${SlideIndex}`;
    // }

    // function plusSlides(n){
    //     showSlide(SlideIndex += n);
    // }

    // PrevSlider.addEventListener('click', event => {
    //     plusSlides(-1);
    // });
    // NextSlider.addEventListener('click', event => {
    //     plusSlides(1);
    // });
    
    // calculater

    const result = document.querySelector(".calculating__result span");

    let sex = "female", 
               height, weight, age, 
               ratio = 1.375;

    function calculate(){

        if (!sex || !height || !weight || !age || !ratio){
            result.textContent = '_____';
            return;

        }

        console.log("*");
        if (sex === 'female'){
            result.textContent = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        }else{
            result.textContent = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        }
    }

    calculate();

    function getStaticInformation(parentSelector, activeClass){

        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {

                if (event.target.getAttribute('ratio-data')){
                    ratio = +event.target.getAttribute('ratio-data');
                }
                else{
                    sex = event.target.getAttribute("id");
                }
    
                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });
    
                event.target.classList.add(activeClass); 
                calculate();
            });
        });
    }

    function getDynamicInformation(Selector){

        const input = document.querySelector(Selector);

        input.addEventListener('input', ()=> {

            switch(input.getAttribute("id")){
                case "height":
                    height = +input.value;
                    break;
                
                case "weight":
                    weight = +input.value;
                    break;
                
                case "age":
                    age = +input.value;
                    break;
        
            }
            calculate();
        });


    }


    getStaticInformation("#gender", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
    // function getDynamicInformation()





    
    

});