let body = document.body;

// Всплывающий зелёный фонон на больших картинках ----------------
let big_img = body.querySelectorAll('.big_img');
for (let i = 0; i < big_img.length; i++)
{
    big_img[i].addEventListener("mouseenter", Show_pop_up);
    big_img[i].addEventListener("mouseleave", Hide_pop_up);
}

function Show_pop_up(event){
    if (event.target.classList.contains('big_img_target_1'))
    {
        body.querySelector('.big_img_target_1 div').style.display = "block";
    }
    else if (event.target.classList.contains('big_img_target_2'))
    {
        body.querySelector('.big_img_target_2 div').style.display = "block";
    }
    else if (event.target.classList.contains('big_img_target_3'))
    {
        body.querySelector('.big_img_target_3 div').style.display = "block";
    }
    else if (event.target.classList.contains('big_img_target_4'))
    {
        body.querySelector('.big_img_target_4 div').style.display = "block";
    }
}
function Hide_pop_up(event){
    if (event.target.classList.contains('big_img_target_1'))
    {
        body.querySelector('.big_img_target_1 div').style.display = "none";
    }
    else if (event.target.classList.contains('big_img_target_2'))
    {
        body.querySelector('.big_img_target_2 div').style.display = "none";
    } 
    else if (event.target.classList.contains('big_img_target_3'))
    {
        body.querySelector('.big_img_target_3 div').style.display = "none";
    }
    else if (event.target.classList.contains('big_img_target_4'))
    {
        body.querySelector('.big_img_target_4 div').style.display = "none";
    } 
}
// -------------------


// Выезжающее меню ----------------
let menu_nav = document.getElementById('menu');
let menu_icon = document.getElementById('menu_icon');
let display_status = false;
menu_icon.addEventListener("click", Menu_controll);

function Menu_controll(){    
    //console.log(menu_nav);
    if (!display_status) {
        display_status = true;
        menu_nav.classList.add('hide_menu');
        setTimeout(function(){
            menu_nav.classList.remove('hide_menu');
            menu_nav.classList.add('active_menu');
            menu_nav.classList.add('show_menu');
         }, 685);
         setTimeout(function(){ menu_nav.classList.remove('show_menu') }, 690+690);              
    } else {
        display_status = false;
        menu_nav.classList.add('hide_menu');
        setTimeout(function(){
            menu_nav.classList.remove('active_menu');
            menu_nav.classList.remove('hide_menu');
            menu_nav.classList.add('show_menu');
         }, 685);
         setTimeout(function(){ menu_nav.classList.remove('show_menu') }, 690+690);   
    }
}
// -------------------


// слайдер ----------------
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: { el: '.swiper-pagination' }
  });
//------------------------------


// обработка нажатия кнопок меню ----------------
let menu = body.querySelector('header nav ul');
let description_unit = body.querySelector('.description');
let work_unit = body.querySelector('.works');
let shop_unit = body.querySelector('.shop');
let contact_unit = body.querySelector('.contact');

let menu_button_ABOUT_US = body.querySelector('ABOUT_US');
menu.addEventListener("click", menu_button_click);

function menu_button_click(event){
    //console.log(event.target);
    if (event.target.classList.contains('ABOUT_US'))
    {
        Menu_controll();
        description_unit.scrollIntoView({block: "center", behavior: "smooth"});
    } else if (event.target.classList.contains('WORK'))
    {
        Menu_controll();
        work_unit.scrollIntoView({block: "start", behavior: "smooth"});
    } else if (event.target.classList.contains('SHOP'))
    {
        Menu_controll();
        shop_unit.scrollIntoView({block: "start", behavior: "smooth"});
    } else if (event.target.classList.contains('CONTACT'))
    {
        Menu_controll();
        contact_unit.scrollIntoView({block: "center", behavior: "smooth"});
    }
}
//------------------------------



// прячем/показываем панель навигации при скролинге ----------------
window.addEventListener('scroll', test);
let old_scroll_y = 0, current_top = -1000;
function test(event){
    if (innerWidth < 767){
        if (current_top == -1000)
            current_top = window.getComputedStyle(menu_nav).top.replace('px', '');
        else
            current_top = menu_nav.style.top.replace('px', '');

        if (window.scrollY > old_scroll_y && current_top != -90) // крутим в низ
        {
            current_top -= (window.scrollY - old_scroll_y);
            if (current_top < -90){
                current_top = -90;
            }
        }
        else if (window.scrollY < old_scroll_y && current_top != 0) // крутим вверх
        {
            current_top = (old_scroll_y - window.scrollY) - (current_top * -1);
            if (current_top > 0){
                current_top = 0;
            }
        }

        old_scroll_y = window.scrollY;
        menu_nav.style.top = current_top +'px';
    }
}
//------------------------------