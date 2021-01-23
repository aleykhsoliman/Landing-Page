/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navUL = document.getElementById('navbar__list');
const fragment = document.createDocumentFragment();
const topButton = document.querySelector('#topButton');








/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function hideNav(e,time=0) {
    setTimeout(()=>{e.style.cssText = 'opacity:0;'},time);
}

function showNav(e) {
    e.style.cssText = 'opacity:1;'
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
for(section of sections){
    const sectionLink = document.createElement('li');
    sectionLink.classList.add('menu__link');
    sectionLink.textContent = section.getAttribute('data-nav');
    fragment.appendChild(sectionLink);
}
navUL.appendChild(fragment);

// Will hide the navbar after 2 seconds from loading the page.
setTimeout(()=>{
    hideNav(navUL,2000);
})


// links  
const links = document.querySelectorAll('#navbar__list li');

// Add class 'active' to section when near top of viewport
window.onscroll = function(){

  
    for(section of sections){

        //for Check if the Section has the Active Class
        const activeClass = section.classList.contains('your-active-class');

        //Check if the section is between 0 & 400 from the top of window
        if(section.getBoundingClientRect().top < 400 && section.getBoundingClientRect().top >=0 && !activeClass){

            //Give the section class active
            section.classList.add('your-active-class');

            //Set link of section as active
            for(link of links){
                if(link.textContent==section.getAttribute('data-nav')){
                    link.classList.add('active__link');
                    break;
                }
            }            
        }

        //Check if the section is out of active range (0 -> 400)
        else if((section.getBoundingClientRect().top > 400 || section.getBoundingClientRect().top <0) && activeClass){

            //remove the active class from section
            section.classList.remove('your-active-class');  

            //remove active from link of section
            for(link of links){
                if(link.textContent==section.getAttribute('data-nav')){
                    link.classList.remove('active__link');
                    break;
                }
            }      
        }
    }

    // for check if the button contains the active class
    const topBtnActive = topButton.classList.contains('active');
    // to show the top button after 400px
    if(window.pageYOffset >= 400 && !topBtnActive){
        topButton.classList.add('active');
    }else if(window.pageYOffset < 400 && topBtnActive){
        topButton.classList.remove('active');
    }
    
};



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click
for(link of links){
    link.addEventListener('click',function(){
        for(section of sections){
            if(this.textContent==section.getAttribute('data-nav')){
                section.scrollIntoView();
                break;
            }
        }
    });
}

// Scroll to the top of the window
topButton.addEventListener('click',() => {
    window.scrollTo(0,0);
})

 



