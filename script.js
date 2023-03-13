'use strict';
//import { even } from './../../17-Modern-JS-Modules-Tooling/final/dist/script.75da7f30';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header=document.querySelector('header');
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((button)=>button.addEventListener('click',openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message=document.createElement('div');
message.setAttribute('class','cookie-message');
message.innerHTML="We use cookie for the improved functionality <button class='btn btn--close-cookie'>Got it </button>";
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click',()=>{
    message.remove();
});

document.querySelector('.btn--scroll-to').addEventListener('click',()=>{
  document.querySelector('#section--1').scrollIntoView({behavior : "smooth"});
});

let navLinks=document.querySelector('.nav__links');
console.log(navLinks);

navLinks.addEventListener("click",function(e){
e.preventDefault();
let section = e.target.getAttribute('href');
document.querySelector(section).scrollIntoView({behavior:"smooth"});
})

/*
navLinks.forEach((navLink)=>{
  
 
  navLink.addEventListener("click",(e)=>{
    console.log(navLink,"hello");
    e.preventDefault();
    console.log("Link");
   let section=navLink.getAttribute('href');
   console.log(section);
   
   document.querySelector(section).scrollIntoView({behavior:"smooth"});
  })
   
})

*/

let tabs=document.querySelector(".operations__tab-container").addEventListener("click",function(e){

  let value = e.target.closest(".operations__tab").getAttribute("data-tab");
  if(!value)
    return;
  let buttons=document.querySelectorAll('.operations__tab');
  console.log(buttons);
  buttons.forEach((button)=>button.classList.remove('operations__tab--active'));

  document.querySelector('.operations__tab--'+value).classList.add('operations__tab--active');
  console.log(document.querySelector('.operations__content--'+value));

let contents=document.querySelectorAll(".operations__content");
//console.log(contents);
contents.forEach((content)=>{
  content.classList.remove("operations__content--active");

})
document.querySelector('.operations__content--'+value).classList.add('operations__content--active');
});

//console.log(tabs);

document.querySelector('.nav__links').addEventListener("mouseover",(e)=>{
 // console.log(e.target);
  if(e.target.classList.contains('nav__link')){
 //   console.log("Isnide if")
     document.querySelectorAll('.nav__link').forEach(link=>{
      //console.log(link);
        if(e.target!==link){
        //  console.log("Inside inner if",link)
          link.style.opacity=0.5;
        }
     })
  }
})


document.querySelector('.nav__links').addEventListener("mouseout",(e)=>{
  // console.log(e.target);
  console.log(e.target,"out");
   if(e.target.classList.contains('nav__link')){
  //   console.log("Isnide if")
      document.querySelectorAll('.nav__link').forEach(link=>{
      
         if(e.target!==link){
        //   console.log("Inside inner out",link)
           link.style.opacity=1;
         }
      })
   }
 })

 let handleObserver = (entries,observer)=>{
  let nav=document.querySelector('.nav');
  console.log(nav);
  const [entry]=entries;
  if(!entry.isIntersecting)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
  console.log("Handler Observer");
   }

 let headerObserver=new IntersectionObserver(handleObserver,{root : null,threshold : 0, rootMargin :"100px"});
 headerObserver.observe(document.querySelector('.header'));


let sectionsObserver =new IntersectionObserver(handleSection,{root : null, threshold : 0.20 });

let sections = document.querySelectorAll('.section');

sections.forEach(section =>{
  section.classList.add('section--hidden');
})
sections.forEach(section=>{
     sectionsObserver.observe(section);
})
console.log(document.querySelectorAll('.section'));
function handleSection(entries,observer){
  
  console.log("hello");
  const [event] = entries;
  if(!event.isIntersecting)
    return;
  console.log(event);
  console.log(entries);
  event.target.classList.remove('section--hidden');
  observer.unobserve(event.target);
} 

let imageObserver = new IntersectionObserver(handleImage,{});

document.querySelectorAll('img[data-src]').forEach((image)=>{
  imageObserver.observe(image);
})

function handleImage(entries, observer){
    console.log("Handle Image");
    const [entry]=entries;
    if(!entry.isIntersecting)
      return;
    entry.target.classList.remove('lazy-img');
  
    entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
    console.log( entry.target.getAttribute('src'));
}




