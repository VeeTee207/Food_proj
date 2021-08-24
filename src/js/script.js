
window.addEventListener('DOMContentLoaded', () =>{
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabContent.forEach((item) => {
            // item.style.display = 'none';
            // substitute in-line to class 
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');            
        });
    }

    function showTabContent(i=0) {
        // tabContent[i].style.display = 'block';
        // substitute in-line to class 
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer ----- sales counter

    const deadline = '2022-01-15'; // set at tth day from now

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
        // reminder -- 1 sec is 1000 mSec
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    // add  0 in front of number
    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    // set counter on screen
    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();  // elemonate screen blinkink while loading page

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);
            
            // either way is ok  --- textContent  or innerHTML
            // days.innerHTML = getZero(t.days);
            // hours.innerHTML = getZero(t.hours);
            // minutes.innerHTML = getZero(t.minutes);
            // seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // set clases for cards menu
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); // mean -- .menu .container
            this.transfer = 2.5; // USD to BYR rate
            this.changeToBYR(); 
        }
        
// USD to BYR conveter
        changeToBYR() {
            this.price = this.price * this.transfer; 
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> $/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // substitute html coding + css styling to js code for menu cards 
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        // 'menu__item',
        // 'big',
    ).render();

// just create object new MenuCard without referal to any variable -- another options for object creation
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container",
        // 'menu__item',
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container",
    ).render();






   // Modal window to buttons Связаться с нами
   const modalTrigger = document.querySelectorAll('[data-modal]'),
   modal = document.querySelector('.modal'),
   modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide'); 
        //    modal.classList.toggle('show'); // option toogle
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);    // to prevent second opening  
    }

    modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
    });

    function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    //    modal.classList.toggle('show'); // option toogle
    document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
    });

    // close modal window by ESC key,  keyDown - any key press
    document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) { 
        closeModal();
    }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
    // check if user get bottom off the page
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            // to make sure it done only once not many
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


       // forms
       const forms = document.querySelectorAll('form');
       const message = {
           loading: 'img/form/spinner.svg',
        //    loading: 'Loading ...',
   
           success: 'Thanks! We will contact you',
           failure: 'Something goes wrong ...',
       };
       forms.forEach(item => {
           postData(item);
       });
   
       // we use 2 formats - 1)formData, 2) JSON. The type of format depends on format needed for backEnd
       function postData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
   
               let statusMessage = document.createElement('img');
               statusMessage.src = message.loading;
               statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
               form.insertAdjacentElement('afterend', statusMessage);
   
               const request = new XMLHttpRequest();
               request.open('POST', 'server.php');
               // data format formData does not need header - no setRequestHeader
               request.setRequestHeader('Content-type', 'apllcatiom/json');
   
               const formData = new FormData(form);
   
               // working with JSON data now
               const object = {};
               formData.forEach(function(value, key){
                   object[key] = value;
               });
   
               const json = JSON.stringify(object);
               request.send(json);
   
               // request.send(formData);
   
               request.addEventListener('load', ()=> {
                   if (request.status === 200) {
                       console.log(request.response);
                       showThanksModal(message.success);
                       form.reset();
                       statusMessage.remove();
                       setTimeout(() => {
                           statusMessage.remove();
                       }, 5000);
                   }
                   else {
                       showThanksModal(message.failure);
                   }
               });
           });  
       }

       function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }


});





