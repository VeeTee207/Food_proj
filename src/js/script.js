window.addEventListener('DOMContentLoaded', () =>{
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabContent.forEach((item) => {
            item.style.display = 'none';
            // item.classList.add('hide');
            // item.classList.remove('show');
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');            
        });
    }

    function showTabContent(i=0) {
        tabContent[i].style.display = 'block';
        // tabContent.classList.add('show');
        // tabContent.classList.add('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {

            tabs.forEach((item, i) => {
                if (target === item) {
                    console.log(i);
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

});

