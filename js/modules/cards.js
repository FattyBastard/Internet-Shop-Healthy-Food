"use strict";

function cards() {

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

}

module.exports = cards;