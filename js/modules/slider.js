"use strict";

function slider() {
    // slider

    const Slides = document.querySelectorAll(".offer__slide");
    const NextSlider = document.querySelector(".offer__slider-next");
    const PrevSlider = document.querySelector(".offer__slider-prev");

    const currentSlide = document.querySelector("#current");
    const totalSlide = document.querySelector("#total");

    const offerSliderWrapper = document.querySelector(".offer__slider-wrapper");
    const offerSliderField = document.querySelector(".offer__slider-field");
    const width = window.getComputedStyle(offerSliderWrapper).width;

    let SlideIndex = 1;
    let offset = 0;

    if (Slides.length < 10){
        totalSlide.textContent = `0${Slides.length}`;
    }else{
        totalSlide.textContent = Slides.length;
    }

    offerSliderField.style.width = 100 * Slides.length + "%";
    offerSliderField.style.display = "flex";
    offerSliderField.style.transition = "0.5s all";

    offerSliderWrapper.style.overflow = "hidden";

    NextSlider.addEventListener('click', event => {

        const dots = document.querySelectorAll(".dot");
        
        if (offset == +(width.slice(0, width.length - 2) * (Slides.length - 1))){
            offset = 0;
            SlideIndex = 1;
        }
        else{
            offset += +width.slice(0, width.length - 2);
            SlideIndex += 1;
        }
        offerSliderField.style.transform = `translateX(${-offset}px)`;

        dots.forEach((dot) => {
            dot.classList.remove('active-dot');
            if (dot.getAttribute("slide-index") == SlideIndex){
                dot.classList.add("active-dot");
            }
        });

        if (Slides.length < 10){
            currentSlide.textContent = `0${SlideIndex}`;
        }else{
            currentSlide.textContent = `${SlideIndex}`;
        }
        
    });

    PrevSlider.addEventListener('click', event => {

        const dots = document.querySelectorAll(".dot");
        
        if (offset == 0) {
            offset = +(width.slice(0, width.length - 2) * (Slides.length - 1));
            SlideIndex = Slides.length;
        } 
        else {
            offset -= +(width.slice(0, width.length - 2));
            SlideIndex -= 1;
        }
        offerSliderField.style.transform = `translateX(${-offset}px)`;
        currentSlide.textContent = SlideIndex;

        dots.forEach((dot) => {
            dot.classList.remove('active-dot');

            if (dot.getAttribute("slide-index") == SlideIndex){
                dot.classList.add("active-dot");
            }
        });

        if (Slides.length < 10){
            currentSlide.textContent = `0${SlideIndex}`;
        }else{
            currentSlide.textContent = `${SlideIndex}`;
        }
    });


    // dots for slider
    function createDots(){

        const placeDots = document.createElement("ol");
        const parentSelector = document.querySelector(".offer__slider-wrapper");
        placeDots.classList.add("position");

        for (let i = 1; i <= Slides.length; i++){

            const dot = document.createElement('li');
            dot.classList.add("dot");
            dot.setAttribute("slide-index", i);

            if (i == 1){
                dot.classList.add("active-dot");
            }

            placeDots.appendChild(dot);
        }
        parentSelector.appendChild(placeDots);    
    }

    createDots();


    const dots = document.querySelectorAll(".dot");

    dots.forEach(dot => {
        dot.addEventListener("click", (event) => {
            dots.forEach(dot => {
                dot.classList.remove("active-dot");
            });       
            event.target.classList.add("active-dot");  

            SlideIndex = +event.target.getAttribute("slide-index");
            offset = +(width.slice(0, width.length - 2) * (SlideIndex - 1));

            offerSliderField.style.transform = `TranslateX(${-offset}px)`;

            if (Slides.length < 10){
                currentSlide.textContent = `0${SlideIndex}`;
            }else{
                currentSlide.textContent = `${SlideIndex}`;
            }
        });
    });  

}

module.exports = slider;