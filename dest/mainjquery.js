/*
    1 click menu mobile Show Nav , hambuger, 
    2 Resize Remove Menu Mobile > 769 (bang cai navbar a)
    3 Scroll = Header , Show Background dark , and < hide background dark
    4, in Footer , click back top
    5, language , click show option , option a to select span
    6, ScrollToHreff Click show underline - scroll , thieu scroll underline
    7, Popup Video
    8, FAQ button
    9 Slider Header
*/

//tim hieu render la biet , 
$(document).ready(function(){
    MenuMobile();
    ResizeMobile(); 
    ScrollBackground(); 
    BackToTop();
    Language();
    ScrollToHreff();
    PoPup();
    FaqButton();
    SliderHeader();
});


MenuMobile = () => {
    $(".header__language__box-mobile").click(function(){
        $(".mobilemenu").toggleClass("mobileshow");
    });
};

ResizeMobile = () => {
    $(window).resize(function() {
        let ResizeWidth = window.innerWidth,
        ResizeDevice = { // neu khach hang muon add them Feature thi them cai nay thoi
            ThanTable: 769, // = luon khi ma no show cai Navbar
        };
        if(ResizeWidth > ResizeDevice.ThanTable) return $(".mobilemenu").removeClass("mobileshow");
        
    });
};

ScrollBackground = () => {

    $(window).scroll(function(){
        let scrollY = window.pageYOffset,
            MainScroll = $(".main__slider").innerHeight(),
            HeaderScroll = $(".header").innerHeight();
        
        (scrollY > (MainScroll - HeaderScroll) 
            ? $(".header").addClass("screenbgc") 
            : $(".header").removeClass("screenbgc"));
    }); 
};

BackToTop = () => {
    $(".backtotop").click(function() {
        scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
};

Language = () => {
    $(".header__language__box-select").click(function(){
        $(".header__language__box-option").toggleClass("active");
    });
    // phai tach rieng ra , neu call in score select thi se select all
    $(".header__language__box-option a").click(function(e){
        e.preventDefault();
        $(".header__language__box-option").removeClass("active");


        let InnerTextSpan = $(this).html(), // element tag a
            InnerTextSpanOld = $(".header__language__box-select span").html(); // element tag span

    
        $(".header__language__box-select span").html(InnerTextSpan); // span se thay doi thanh chinh no (this)
        $(this).html(InnerTextSpanOld); // chinh no (this) se lay value old of span tag , neu ko su dung ${this} se bug select all
        
        //localstorage test thoi nha anh oi
        localStorage.clear();
        localStorage.LocalLanguage = InnerTextSpan; // setItem no la
    });
    
    $('.header__language__box-select span').html(localStorage.LocalLanguage);
};

ScrollToHreff = () => {

    RemoveUnderline = () => {
        $(".header__navbar a").each(function(list_element){
            $(this).removeClass("underline");
        });
    };
    $(".header__navbar a").each(function(index, element){
    
        let SectionPush = new Array(),
            Href = $(this).attr("href"), // lay Attributes HREF cua Tag <a nha
            Replace = Href.replace("#", ""), // replace cai # trong tag a = emtry
            GetClassName = $("." + Replace); // query to a Class + Replace # = emtry
        
        SectionPush.push(GetClassName); // ko them let vi se bi Redeclation
        
        $(this).click("click", function(e){            
            window.scrollTo({
                top: GetClassName.offset().top - $(".header").outerHeight(),
                behavior: "smooth"
            });
            e.preventDefault();
            RemoveUnderline();
            $(this).addClass("underline");
        });
        //thieu scroll show underline
    });
};

PoPup = () => {
    
    $(".products__quality__list__item__image-play").click("click", function(e){
        e.preventDefault();
        let Href = $(this).attr("data-video-id"); // get link href (attribute)
        $(".popup-video").css("display", "flex"); // for div popup
        
        $(".item-popup iframe").attr("src", "https://www.youtube.com/embed/" + Href); // replace attribute

        $(".popup-video").click("click", function(){ // popup la full screen , so click = hide
            $(this).css("display", "none"); // div parent hide
            $(".item-popup iframe").attr("src", ""); // value of attr = emtry
        });
        
        $(".item-close").click("click", function(){ // btn close
            $(".popup-video").css("display", "none"); // div parent hide
            $(".item-popup iframe").attr("src", ""); // value of attr = emtry
        });
    });
};

// dang xu li lai cai nay em tim hoai ko ra :((
FaqButton = () => {

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
};

// con loi F5 show 3 cai
// slider img3 delay cham
SliderHeader = () => {

    let $carousel = $(".slider__wrap");
    $carousel.flickity({
        contain: true, // theo bo khung
        wrapAround: true, // too like for
        prevNextButtons: false, // hide button default
    
        on:{
            ready: function(){
                let Dotted = $(".flickity-page-dots"), // call Flickity CSS
                    ApDotted = $(".main__bottom-left-dotted"); // call class dotted div
                Dotted.appendTo(ApDotted); // phuong thuc appendTo
            },
            change: function(index){
                let Number = $(".main__bottom-left-number"), // call div number ra
                    IndexPage = index + 1; // input la array nen phai +1 de skip 0
                    InnerNumber = Number.html(IndexPage.toString().padStart(2, 0)); // convert toString + padStart
                    Number.html(`<h2>${InnerNumber.html()}</h2>`)
            }
        }
    });
    $(".main__bottom-right-button.prev").on("click", function(){  $carousel.flickity("previous"); });
    $(".main__bottom-right-button.next").on("click", function(){  $carousel.flickity("next"); });
};

// xu li trang web load xong moi tai
// var initPhotoSwipeFromDOM = function(gallerySelector) {
//     var parseThumbnailElements = function(el) {
//         var thumbElements = el.childNodes,
//             numNodes = thumbElements.length,
//             items = [],
//             figureEl,
//             linkEl,
//             size,
//             item;
//         for(var i = 0; i < numNodes; i++) {
//             figureEl = thumbElements[i]; // <figure> element
//             if(figureEl.nodeType !== 1) {
//                 continue;
//             }
//             linkEl = figureEl.children[0]; // <a> element
//             size = linkEl.getAttribute('data-size').split('x');
//             item = {
//                 src: linkEl.getAttribute('href'),
//                 w: parseInt(size[0], 10),
//                 h: parseInt(size[1], 10)
//             };
//             if(figureEl.children.length > 1) {
//                 item.title = figureEl.children[1].innerHTML; 
//             }
//             if(linkEl.children.length > 0) {
//                 // <img> thumbnail element, retrieving thumbnail url
//                 item.msrc = linkEl.children[0].getAttribute('src');
//             } 
//             item.el = figureEl; // save link to element for getThumbBoundsFn
//             items.push(item);
//         }
//         return items;
//     };
//     var closest = function closest(el, fn) {
//         return el && ( fn(el) ? el : closest(el.parentNode, fn) );
//     };
//     var onThumbnailsClick = function(e) {
//         e = e || window.event;
//         e.preventDefault ? e.preventDefault() : e.returnValue = false;
//         var eTarget = e.target || e.srcElement;
//         var clickedListItem = closest(eTarget, function(el) {
//             return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
//         });
//         if(!clickedListItem) {
//             return;
//         }
//         var clickedGallery = clickedListItem.parentNode,
//             childNodes = clickedListItem.parentNode.childNodes,
//             numChildNodes = childNodes.length,
//             nodeIndex = 0,
//             index;
//         for (var i = 0; i < numChildNodes; i++) {
//             if(childNodes[i].nodeType !== 1) { 
//                 continue; 
//             }
//             if(childNodes[i] === clickedListItem) {
//                 index = nodeIndex;
//                 break;
//             }
//             nodeIndex++;
//         }
//         if(index >= 0) {
//             openPhotoSwipe( index, clickedGallery );
//         }
//         return false;
//     };
//     var photoswipeParseHash = function() {
//         var hash = window.location.hash.substring(1),
//         params = {};
//         if(hash.length < 5) {
//             return params;
//         }
//         var vars = hash.split('&');
//         for (var i = 0; i < vars.length; i++) {
//             if(!vars[i]) {
//                 continue;
//             }
//             var pair = vars[i].split('=');  
//             if(pair.length < 2) {
//                 continue;
//             }           
//             params[pair[0]] = pair[1];
//         }
//         if(params.gid) {
//             params.gid = parseInt(params.gid, 10);
//         }
//         return params;
//     };
//     var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
//         var pswpElement = document.querySelectorAll('.pswp')[0],
//             gallery,
//             options,
//             items;
//         items = parseThumbnailElements(galleryElement);
//         options = {
//             galleryUID: galleryElement.getAttribute('data-pswp-uid'),
//             getThumbBoundsFn: function(index) {
//                 var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
//                     pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
//                     rect = thumbnail.getBoundingClientRect(); 

//                 return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
//             },
//             showAnimationDuration : 0,
//             hideAnimationDuration : 0
//         };
//         if(fromURL) {
//             if(options.galleryPIDs) {
//                 for(var j = 0; j < items.length; j++) {
//                     if(items[j].pid == index) {
//                         options.index = j;
//                         break;
//                     }
//                 }
//             } else {
//                 options.index = parseInt(index, 10) - 1;
//             }
//         } else {
//             options.index = parseInt(index, 10);
//         }
//         if( isNaN(options.index) ) {
//             return;
//         }
//         if(disableAnimation) {
//             options.showAnimationDuration = 0;
//         }
//         gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
//         gallery.init();
//     };
//     var galleryElements = document.querySelectorAll( gallerySelector );
//     for(var i = 0, l = galleryElements.length; i < l; i++) {
//         galleryElements[i].setAttribute('data-pswp-uid', i+1);
//         galleryElements[i].onclick = onThumbnailsClick;
//     }
//     var hashData = photoswipeParseHash();
//     if(hashData.pid && hashData.gid) {
//         openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
//     }
// };

// $(window).load(function () {
//     initPhotoSwipeFromDOM('.carousel-img');
// });