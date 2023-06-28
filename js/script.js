
let body = document.body;

let main_el = body.querySelectorAll('main')[0];
let circles = body.querySelectorAll('.circles');
let sections = body.querySelectorAll('.sections');

let curent_section = 0;
let touchstart_y = 0;
let permission = true;
let circle_height_koef = 0.8;

if (window.innerHeight / window.innerWidth > 1)
    circle_height_koef = 0.4;

/*                  тестові бульбашки
document.getElementById('bubels').animate([
    {transform: 'translate3D(0, '+ window.screen.height +'px, 0)' },
    {transform: 'translate3D(30px, '+ (window.screen.height - (window.screen.height/2)) +'px, 0)' },
    {transform: 'translate3D(0px, 0, 0)' },
    {transform: 'translate3D(30px, -500px, 0)' },
    //...
  ], {
      duration: 5000,
  });;
*/

//console.log(window.screen.height);

// Стартова властивості рухомих декоративних кіл
circles[0].style = 'left: '+((1 - circle_height_koef * 0.3) * 100)/1.4+'%;'+
' top: '+(circle_height_koef * 100)/2*(-1)+'%;'+
' height: '+(window.innerHeight * circle_height_koef)+'px;'+
' width: '+(window.innerWidth * 0.5)+'px';

circles[1].style = 'left: '+(circle_height_koef - 1)/3 * 100+'%;'+
' top: '+((1 - circle_height_koef * 0.3) * 100)/1.2+'%;'+
' height: '+(window.innerHeight * (circle_height_koef - 0.1))+'px;'+
' width: '+(window.innerWidth * 0.55)+'px';
scrooll_to_section('up');
// ---------------

// отлавливание всех способов перелистывания
document.addEventListener("keydown", function(event){
    if (event.code == 'ArrowUp')
        scrooll_to_section("up")
    else if (event.code == 'ArrowDown')
        scrooll_to_section("down")
})
document.addEventListener("wheel", function(event){
    if (event.deltaY > 0)
        scrooll_to_section("down")
    else if (event.deltaY < 0)
        scrooll_to_section("up")
})
document.addEventListener("touchstart", function(event){
    touchstart_y = event.changedTouches[0].pageY;
})
document.addEventListener("touchend", function(event){
    if (event.changedTouches[0].pageY > touchstart_y && ((event.changedTouches[0].pageY - touchstart_y ) > 50))
        scrooll_to_section("up");
    else if (event.changedTouches[0].pageY < touchstart_y && ((touchstart_y - event.changedTouches[0].pageY) > 50))
        scrooll_to_section("down");
})
// ---------------

// функция перелистывания между секциями
function scrooll_to_section(direction){    
    // запобіжник, не дає перелистувати секції частіше ніж в 1100 мс.
    if (permission)
        setTimeout(function(){ permission = true; }, 1100);
    else if (!permission)
        return false;
    permission = false;
    // ---------------    

    // змінюємо секцію на сусідню
    if (direction == "up" && curent_section != 0){
        //console.log('scroll up section, curent_section = '+curent_section);
        sections[curent_section].style = 'top: 100%; left: 0;';
        sections[curent_section - 1].style = 'top: 0; left: 0;';
        curent_section -= 1;
    }
    else if (direction == "down" && curent_section != (sections.length - 1)){
        //console.log('scroll bot section, curent_section = '+curent_section);
        sections[curent_section].style = 'top: -100%; left: 0;';
        sections[curent_section + 1].style = 'top: 0; left: 0;';
        curent_section += 1;
    }
    //console.log('end scrool, curent_section = '+curent_section);
    // ---------------

    // рухаємо декоративні кола
    switch (curent_section) {
        case 0:{
            //console.log('секція перша, кільця відповідно до неї');
            circles[0].style = 'left: '+(0.8 * 100)/1.4+'%;'+
            ' top: '+(circle_height_koef * 100)/2*(-1)+'%;'+
            ' height: '+(window.innerHeight * circle_height_koef)+'px;'+
            ' width: '+(window.innerWidth * 0.5)+'px';

            circles[1].style = 'left: '+(circle_height_koef - 1)/3 * 100+'%;'+
            ' top: '+((1 - circle_height_koef * 0.3) * 100)/1.2+'%;'+
            ' height: '+(window.innerHeight * (circle_height_koef - 0.1))+'px;'+
            ' width: '+(window.innerWidth * 0.55)+'px';
            break;
        }
        case 1:{
            //console.log('секція друга, кільця відповідно до неї');
            circles[0].style = 'left: '+(circle_height_koef - 1)/3 * 100+'%;'+
            ' top: '+(circle_height_koef * 100)/2*(-1)+'%;'+
            ' height: '+(window.innerHeight * circle_height_koef)+'px;'+
            ' width: '+(window.innerWidth * 0.5)+'px';

            circles[1].style = 'left: '+((0.8/1.15) * 100)+'%;'+
            ' top: '+(0.8 * 100)/1.2+'%;'+
            ' height: '+(window.innerHeight * (circle_height_koef - 0.1))+'px;'+
            ' width: '+(window.innerWidth * 0.55)+'px';
            break;
        }
        case 2:{
            // console.log('секція третя, кільця відповідно до неї');
            circles[0].style = 'left: '+(50-((1 - circle_height_koef + 0.3)*50))+'%;'+
            ' top: '+(circle_height_koef * 100)/2*(-1)+'%;'+
            ' height: '+(window.innerHeight * circle_height_koef)+'px;'+
            ' width: '+(window.innerWidth * (1 - circle_height_koef + 0.3))+'px';

            circles[1].style = 'left: '+(50-25)+'%;'+
            ' top: '+(circle_height_koef * 100)/2*(-1)+'%;'+
            ' height: '+(window.innerHeight * circle_height_koef)+'px;'+
            ' width: '+(window.innerWidth * 0.5)+'px';
            break;
        }
        case 3:{
            // console.log('секція четверта, кільця відповідно до неї');
            circles[0].style = 'left: '+(50-25)+'%;'+
            ' top: '+(circle_height_koef * 100)/2*(-1)+'%;'+
            ' height: '+(window.innerHeight * circle_height_koef)+'px;'+
            ' width: '+(window.innerWidth * 0.5)+'px';

            circles[1].style = 'left: '+(50-((1 - circle_height_koef + 0.3)*50))+'%;'+
            ' top: '+(circle_height_koef * 100)/2*(-1)+'%;'+
            ' height: '+(window.innerHeight * circle_height_koef)+'px;'+
            ' width: '+(window.innerWidth * (1 - circle_height_koef + 0.3))+'px';
            break;
        }
        case 4:{
            //console.log('секція п’ята, кільця відповідно до неї');
            circles[0].style = 'left: '+50+'%;'+
            ' top: '+(circle_height_koef * 100)/3*(-1)+'%;'+
            ' height: '+(window.innerHeight * (circle_height_koef - 0.15))+'px;'+
            ' width: '+(window.innerWidth * (1 - circle_height_koef + 0.4))+'px';

            circles[1].style = 'left: '+50+'%;'+
            ' top: '+(0.8 * 100)/1.5+'%;'+
            ' height: '+(window.innerHeight * circle_height_koef)+'px;'+
            ' width: '+(window.innerWidth * (1 - circle_height_koef + 0.4))+'px';
            break;
        }
        case 5:{
            //console.log('секція шоста, кільця відповідно до неї');
            circles[0].style = 'left: '+50+'%;'+
            ' top: '+(100 * (-1))+'%;'+
            ' height: '+(window.innerHeight * (circle_height_koef - 0.1))+'px;'+
            ' width: '+(window.innerWidth * 0.8)+'px';

            circles[1].style = 'left: '+(50-35)+'%;'+
            ' top: '+(0.8 * 100)/2+'%;'+
            ' height: '+(window.innerHeight * (circle_height_koef + 0.1))+'px;'+
            ' width: '+(window.innerWidth * 0.7)+'px';
            break;
        }
      }    
      // ---------------
}
// -------------------







/*                               OLD DOC
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
        body.style.overflow = 'hidden';

        display_status = true;
        menu_nav.classList.add('hide_menu');
        setTimeout(function(){
            menu_nav.classList.remove('hide_menu');
            menu_nav.classList.add('active_menu');
            menu_nav.classList.add('show_menu');
         }, 685);
         setTimeout(function(){ menu_nav.classList.remove('show_menu') }, 690+690);              
    } else {
        body.style.overflow = 'auto';

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
*/