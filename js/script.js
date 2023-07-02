// window.onload = function(){ alert('усі ресурси успішно завантажені'); }
window.onerror = function(msg, url, lineNo, columnNo, error) { alert(msg+'\n'+url+'\n'+lineNo+'\n'+columnNo+'\n'+error); }

let body = document.body;

let main_el = body.querySelectorAll('main')[0];
let circles = body.querySelectorAll('.circles');
let sections = body.querySelectorAll('.sections');
let menu = body.querySelectorAll('.nav_panel');
let menu_buttons = body.querySelectorAll('.nav_item');

let curent_section = 0;
let touchstart_y = 0;
let permission = true;
let circle_height_koef = 0.8;
let active_button_css = 'right: -20%; transform: scale(0.9); border: 3px solid rgb(50, 50, 50);';
let not_active_button_css = 'right: -5%; transform: scale(1); border: 2px solid rgb(50, 50, 50);';

// невеличка адаптивність для рухомих кіл
if (window.innerHeight / window.innerWidth > 1)
    circle_height_koef = 0.4;

// установление своего vh
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
// ----------------------------- 

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


// размещаем кнупки навигации и вешаем обработчик нажатий
for (let i = 0; i < menu_buttons.length; i++){    
    menu_buttons[i].style = 'top: '+ (30 * (i + 1)-22)+'%';
    menu_buttons[i].addEventListener("click", click_on_menu_button);
    // первая кнопка сразу активна
    if (i == 0)
        menu_buttons[i].style = menu_buttons[i].style.cssText+'right: -20%;';
}

// функция нажатия на кнопку навигации
function click_on_menu_button(event){
    for (let i = 0; i < menu_buttons.length; i++){
        if (menu_buttons[i].childNodes[0] == event.target){
            switch (i) {
                case 0:{
                    scrooll_to_section(0);
                    break;
                }
                case 1:{
                    scrooll_to_section(2);
                    break;
                }
                case 2:{
                    scrooll_to_section(sections.length - 1);
                    break;
                }
            } 
        }
    }
}
// ----------------


// отлавливание всех событий-способов перелистывания
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
    if (event.changedTouches[0].pageY > touchstart_y && ((event.changedTouches[0].pageY - touchstart_y ) > 80))
        scrooll_to_section("up");
    else if (event.changedTouches[0].pageY < touchstart_y && ((touchstart_y - event.changedTouches[0].pageY) > 80))
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
        sections[curent_section].style = 'bottom: -100%; left: 0; opacity: 0;';
        sections[curent_section - 1].style = 'bottom: 0; left: 0; opacity: 1;';
        curent_section -= 1;
    }
    else if (direction == "down" && curent_section != (sections.length - 1)){
        sections[curent_section].style = 'bottom: 100%; left: 0; opacity: 0;';
        sections[curent_section + 1].style = 'bottom: 0; left: 0; opacity: 1;';
        curent_section += 1;
    }
    // або листаємо до секції вказаної через кнопку навігації
    else if (direction == 0 || direction == 2 || direction == (sections.length - 1)){
        if (curent_section < direction){
            for( let i = curent_section; i < direction; i++)
                sections[i].style = 'bottom: 100%; left: 0; opacity: 0;';
            sections[direction].style = 'bottom: 0; left: 0; opacity: 1;';
            curent_section = direction;
        } else if (curent_section > direction){
            for (let i = curent_section; i > direction; i--)
                sections[i].style = 'bottom: -100%; left: 0; opacity: 0;';
            sections[direction].style = 'bottom: 0; left: 0; opacity: 1;';
            curent_section = direction;
        }      
    }
    // ---------------

    // рухаємо декоративні кола та кнопки навігації
    // обнуляємо позиції кнопок 
    for (let i = 0; i < menu_buttons.length; i++)
        menu_buttons[i].style = menu_buttons[i].style.cssText + not_active_button_css;
    // задаємо нові позиції для кіл та кнопок
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

            menu_buttons[0].style = menu_buttons[0].style.cssText + active_button_css;
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

            menu_buttons[0].style = menu_buttons[0].style.cssText + active_button_css;
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

            menu_buttons[1].style = menu_buttons[1].style.cssText + active_button_css;
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

            menu_buttons[1].style = menu_buttons[1].style.cssText + active_button_css;
            break;
        }
        // case 4:{
        //     //console.log('секція п’ята, кільця відповідно до неї');
        //     circles[0].style = 'left: '+50+'%;'+
        //     ' top: '+(circle_height_koef * 100)/3*(-1)+'%;'+
        //     ' height: '+(window.innerHeight * (circle_height_koef - 0.15))+'px;'+
        //     ' width: '+(window.innerWidth * (1 - circle_height_koef + 0.4))+'px';

        //     circles[1].style = 'left: '+50+'%;'+
        //     ' top: '+(0.8 * 100)/1.5+'%;'+
        //     ' height: '+(window.innerHeight * circle_height_koef)+'px;'+
        //     ' width: '+(window.innerWidth * (1 - circle_height_koef + 0.4))+'px';

        //     menu_buttons[1].style = menu_buttons[1].style.cssText+'right: -20%;';
        //     break;
        // }
        case (sections.length - 1):{
            //console.log('остання секція, кільця відповідно до неї');
            circles[0].style = 'left: '+50+'%;'+
            ' top: '+(100 * (-1))+'%;'+
            ' height: '+(window.innerHeight * (circle_height_koef - 0.1))+'px;'+
            ' width: '+(window.innerWidth * 0.8)+'px';

            circles[1].style = 'left: '+(50-35)+'%;'+
            ' top: '+(0.8 * 100)/2+'%;'+
            ' height: '+(window.innerHeight * (circle_height_koef + 0.1))+'px;'+
            ' width: '+(window.innerWidth * 0.7)+'px';
            if (window.innerWidth < 770)
                circles[1].style = 'left: '+2.5+'%;'+
                ' top: '+50+'%;'+
                ' height: '+(window.innerHeight * (circle_height_koef + 0.25))+'px;'+
                ' width: '+(window.innerWidth * 0.95)+'px';

            menu_buttons[2].style = menu_buttons[2].style.cssText + active_button_css;
            break;
        }
      }    
      // ---------------
}
// -------------------


// ініціалізація слайдера ----------------
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
});
//------------------------------

// анімація літер на першій секції при завантаженні та при натисканні
let span_el = body.querySelectorAll('.section_1 span');
for (let i = 0; i < span_el.length; i++){    
    setTimeout(function(){ span_el[i].classList.add('start_animate_span'); }, (i*50));
    setTimeout(function(){ span_el[i].classList.remove('start_animate_span'); }, (i*50 + 700));
}
body.querySelectorAll('.section_1')[0].addEventListener('click', click_to_span_el);
function click_to_span_el(event){
    for (let i = 0; i < span_el.length; i++)
        if (event.target == span_el[i])
        for (let i = 0; i < span_el.length; i++){    
            setTimeout(function(){ span_el[i].classList.add('start_animate_span'); }, (i*50));
            setTimeout(function(){ span_el[i].classList.remove('start_animate_span'); }, (i*50 + 700));
        }
}
//------------------------------


// бульбашки
let li_el_for_bubels = body.querySelectorAll('.section_3 li');
let bubel = document.getElementById('bubels');
body.querySelectorAll('.section_3')[0].addEventListener('click', go_bubels)

let buble_size = 'auto 100%';
if (window.innerWidth < 1024)
    buble_size = '100% auto';

let pos_create_coef = 1.3;
if (window.innerHeight < 800)
    pos_create_coef = 1.9;

let buble_step = 30, buble_back_step = 30;

function go_bubels(event){
    for (let i = 0; i < li_el_for_bubels.length; i++)
        if (event.target.textContent == li_el_for_bubels[i].textContent){
            console.log(event.target.textContent);

            let bubel_copy = bubel.cloneNode(true);
            bubel_copy.style = 'top: 0%; left: '+Math.round(Math.random()*100)/pos_create_coef+'%';

            // задаємо BG
            switch (event.target.textContent) {
                case 'HTML':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/HTML.png') 0 0/"+buble_size+" no-repeat;";
                    break;
                }
                case 'CSS, SCSS':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/sass.png') 0 0/"+buble_size+" no-repeat;";
                    break;
                }
                case 'JavaScript (скоро додам сюди React)':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/js.png') 0 0/"+buble_size+" no-repeat;";
                    break;
                }
                case 'PHP':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/php.png') 0 0/"+buble_size+"  no-repeat;";
                    break;
                }
                case 'SQL':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/sql.png') 0 0/"+buble_size+"  no-repeat;";
                    break;
                }
                case 'C#':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/language_c.png') 0 0/"+buble_size+"  no-repeat;";
                    break;
                }
                case 'Uniy':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/Unity.png') 0 0/"+buble_size+"  no-repeat;";
                    break;
                }
                case 'Git':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/git.png') 0 0/"+buble_size+"  no-repeat;";
                    break;
                }
                case 'GitHub':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/git_hub.png') 0 0/"+buble_size+"  no-repeat;";
                    break;
                }
                case 'Photoshop':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/Photoshop.png') 0 0/"+buble_size+"  no-repeat;";
                    break;
                }
                case 'Blender':{
                    bubel_copy.style = bubel_copy.style.cssText +
                    "background: url('./image/technologi/blender.png') 0 0/"+buble_size+"  no-repeat;";
                    break;
                }
            }
            
            buble_step = Math.round(Math.random()*50);
            if (window.innerWidth > 1024)
                buble_step = buble_step * 2;

            buble_back_step = Math.round(Math.random()*50);
            if (window.innerWidth > 1024)
                buble_back_step = buble_back_step * 2;
            
            if (Math.random() > 0.5)
                buble_back_step = buble_back_step * -1;
            else
                buble_step = buble_step * -1;
            
            bubel_copy.animate([
                {transform: 'translate3D(0, '+ window.screen.height +'px, 0)' },
                {transform: 'translate3D('+buble_step+'px, '+ (window.screen.height - (window.screen.height/2)) +'px, 0)' },
                {transform: 'translate3D('+buble_back_step+'px, 0, 0)' },
                {transform: 'translate3D('+buble_step+'px, -500px, 0)' },
                //...
              ], { duration: 5000,}
            );
            setTimeout(function(){ bubel_copy.remove(); }, 4800);
            main_el.append(bubel_copy);
        }
}
//------------------------------