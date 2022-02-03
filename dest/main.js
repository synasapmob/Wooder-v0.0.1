const rezizeDevice = {
    windows: 1920,
    tablet: 991,
    mobile: 767
};

/* 
    1 , MOBILE CLICK MENU , DESKTOP will auto remove MENU
    2 , AUTO ADD background dark
    3 , SCROLL TO TOP (FOOTER)
    4 , LANGUAGE SELECT show OPTION , CLICK OUTSIDE HIDE OPTION
    5 , ACTIVE HREF MENU NAVBAR
    6, FAQ after V , click button , show content
*/

///////////////////////////////////////////////////

///////////////////////////////////////////////////
//menu mobile
let hambuger = document.querySelector(".header__language__box-mobile"), // node hambuger has hide because screen desktop
      mobilemenu = document.querySelector(".mobilemenu") // navbar mobile

hambuger.addEventListener('click', function() { // function has call before user click language-mobile
    mobilemenu.classList.toggle("mobileshow") // if true mobileshow , if false mobile hide
});

window.addEventListener("resize", function(){
    let rezizeWidth = window.innerWidth;
    if(rezizeWidth > rezizeDevice.mobile){
        mobilemenu.classList.remove("mobileshow");
    }
});

///////////////////////////////////////////////////
// navgiation mobile
let header = document.querySelector(".header"),
    main__slider = document.querySelector(".main__slider");

let headerheight = header.clientHeight,
    sliderheight = main__slider.clientHeight;

document.addEventListener("scroll", function(){
    let scrollY = window.pageYOffset;
    (scrollY > (sliderheight - headerheight) ? scrollscreen(1)  : scrollscreen(2));

});

scrollscreen = (choose) => {
    if(choose == 1){  header.classList.add("screenbgc"); }
    if(choose == 2){  header.classList.remove("screenbgc"); }
}

///////////////////////////////////////////////////
// back to top
let backtotop = document.querySelector(".backtotop");
backtotop.addEventListener("click", function(){
    scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})
///////////////////////////////////////////////////
// language
let lang_select = document.querySelector(".header__language__box-select"), // gọi select ra
    lang_Current = document.querySelector(".header__language__box span"), // gọi span trong select
    lang_option = document.querySelector(".header__language__box-option"), // gọi option ra
    lang_items = document.querySelectorAll(".header__language__box-option a"); // gọi array của option ra

lang_select.addEventListener("click", function(e){
    lang_option.classList.toggle("active");
    e.stopPropagation();
});

lang_items.forEach(function(item){ // đầu vào của mảng là item
    item.addEventListener("click", function(){ // bắt sự kiện cho đầu vào của mảng
        
        let TextInner = this.textContent, // decration a variable = this (chính nó là item)
        TextOld = lang_Current.textContent; // decration a variable old handle changed item
        
        lang_Current.innerHTML = TextInner;; // thay thế span thành chính nó (this)
        this.innerHTML = TextOld; // thay thế this (item) thành Text cũ của span
        lang_option.classList.toggle("active"); // sau khi changed xong if true thì hide option di

    })
});

document.addEventListener("click", function(e){
    if(lang_option.matches(".active") == true){
        e.stopPropagation(); // ngưng nổi bọt
        lang_option.classList.toggle("active"); // option true thì nó destroy class active di thôi
    }
});
///////////////////////////////////////////////////
//scroll to HREF 

let ScrollHeaderHeight = document.querySelector(".header").offsetHeight, // lấy chiều cao header
    ScrollHref = document.querySelectorAll(".header__navbar a"), // lấy mảng của tất cả a
    Sections = new Array(); // lấy section gọi nó thành 1 mảng mới

function removeunderline(){
    ScrollHref.forEach(function(list_element){
        list_element.classList.remove("underline")  
    });
}

ScrollHref.forEach(function(element, index){

    let href = element.getAttribute('href'),// lấy href của phần tử bên trong mảng
        replace = href.replace("#", ''),//thay đổi # của phần tử thành emptry ''
        section = document.querySelector("." + replace);//nối chuỗi replace dc change trước đó vào nghĩa là home
        Sections.push(section); // push là dẫy , dẫy mảng section vô sections
    element.addEventListener("click", function(e){ // phần tử bên trong mảng là element bắt event
        
        e.preventDefault(); // loại bỏ chuyển trang 
        window.scrollTo({ // cửa số trình duyệt gọi hàm scrollTo 
            top: section.offsetTop - ScrollHeaderHeight , //lấy top/mr/pd/.. để check khoảng cách của nó và - height . , scroll tới
            behavior: "smooth"
        });
        removeunderline(); // check cái này này trước và nó sẽ remove class đó di
        this.classList.add("underline") // sau khi query hết thì đến lượt line này và nó sẽ thêm vô ..

        /* cách mà nó hoạt động là 
        click vô rồi thì nó xử lí để remove
        có 2 array , vì vậy nó sẽ scan hết 2 cái luôn , quét mỗi thứ 2 lần #home/products..
        kiểm tra mảng lần 1 nó sẽ ra dc các key là position... value ...
        kiểm tra mảng lần 2 nó sẽ xóa đi cácunder nhờ vào list_element (changed input ko là error nha)
        cuối cùng kiểm tra xong thì nó đi tiếp line new là add thằng underline vô chính nó (element)
        */
    })
});

document.addEventListener("scroll", function(){
    let sectionScroll = window.pageYOffset;
    Sections.forEach(function(element, index){
        if(sectionScroll > element.offsetTop
            && sectionScroll < element.offsetTop + element.offsetHeight) {

                // e.offsetop + e.offsetheight + 1708 , 17px
                // window.pageYOffset + e.offsetHeight 1653 16px
                // window.pageYOffset + e.offsettop 1598 15px
                // section.offsetHeight 1708, 17px trên attribute đồ á

            removeunderline();
            ScrollHref[index].classList.add("underline");
        }else {
            ScrollHref[index].classList.remove("underline");
        }

    })
});
///////////////////////////////////////////////////
//FAQ :VV

let FAQButton = document.getElementsByClassName("faq__list__anwser-button"),
    FAQContent = document.querySelector(".faq__list__anwser-content"),
    FAQTransition = true; // ý tưởng transition khi tắt

const FAQObject = Object.values(FAQButton);

for(let i = 0; i < FAQObject.length; i++){
    FAQObject[i].addEventListener("click", function(e){
        e.stopPropagation(); // tránh bug nối bọt :v
        
        if(e.target) { // khi user click vô , này ko bị delay á thử rồi ko có nó delay
            FAQContent =  this.nextElementSibling; // nút liền kề anh em 
            FAQContent.classList.toggle("faqshow"); // hiện text 
            this.classList.toggle("faqafter"); // hiện chữ V
        }
        
        //làm toán 3 ngôi dễ đọc
        FAQContent = (FAQContent.style.maxHeight == null) 
        ? FAQContent.style.maxHeight = null 
        : FAQContent.style.maxHeight = FAQContent.scrollHeight + "px";
        
    });
};