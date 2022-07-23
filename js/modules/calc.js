"use strict";

function calc() {

    // calculater

    const result = document.querySelector(".calculating__result span");

    let sex, height, weight, age, ratio;
    
    if (localStorage.getItem("sex")){
        sex = localStorage.getItem("sex");
    }else{
        sex = "female";
        localStorage.setItem("sex", sex);
    }

    if (localStorage.getItem("ratio")){
        sex = localStorage.getItem("ratio");
    }else{
        console.log("+");
        ratio = 1.375;
        localStorage.setItem("ratio", ratio);
    }

    function initBtnsStaticInfo(selector, activeClass){

        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {

            element.classList.remove(activeClass);
            if (localStorage.getItem("sex") === element.getAttribute("id")){
                element.classList.add(activeClass);
            }
            if (localStorage.getItem("ratio") === element.getAttribute("ratio-data")){
                element.classList.add(activeClass);
            }
        });

    }

    initBtnsStaticInfo("#gender div", "calculating__choose-item_active");
    initBtnsStaticInfo(".calculating__choose_big div", "calculating__choose-item_active");
    

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
        console.log(elements);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {

                if (event.target.getAttribute('ratio-data')){
                    ratio = +event.target.getAttribute('ratio-data');
                    localStorage.setItem("ratio", +event.target.getAttribute('ratio-data'));
                }
                else{
                    sex = event.target.getAttribute("id");
                    localStorage.setItem("sex", event.target.getAttribute("id"));
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

            if (input.value.match(/\D/g)){
                input.style.border = "1px solid red";
            }else{
                input.style.border = "none";
            }

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

}

module.exports = calc;