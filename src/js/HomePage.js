$(document).ready(function () {

    showCategory();

    $('.owl_sliderbanner').owlCarousel({
        items:1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 9000,
        nav: true
    })

    

    $('.owl_sachmoi').owlCarousel({
        items: 4,
        loop: true,
        autoplay: true,
        autoplayTimeout: 9000,
    })
    $('.owl_giftbook').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 7000,
    })
    $('.owl_bestseller').owlCarousel({
        items: 2,   
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsiveClass:true,
        responsive: {
            0: {
                items:1,
            },
            440: {
                items: 2,
            },
            635: {
                items: 3,
            },
            840: {
                    items: 4 ,
            },
            1025: {
                items: 3,
            },
            1130: {
                items: 4,
            },
        }
    })
    $('.owl-list').owlCarousel({
        items: 2,   
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsiveClass:true,
        responsive: {
            0: {
                items:1,
            },
            560: {
                items: 2,
            },
            800: {
                items: 3,
            },
            1024: {
                items: 2,
            },
        }
    })
    $('.owl_customer_review').owlCarousel({
        items: 1,   
        loop: true,
        autoplay: true,
        autoplayTimeout: 4500,
    })
    // $('.owl_public').owlCarousel({
    //     items: 3,   
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 5000,
    // })
    $('.owl_recruitment').owlCarousel({
        items: 2, 
        loop: true,
        margin:10,
        responsiveClass:true,
        responsive: {
            0: {
                items:1,
            },
            500: {
                items: 2,
            },
            700: {
                items: 3,
            },
            992: {
                items: 2,
            },
            
        }
    })
});




function showCategory() {
    $('.icon-bar>.menu').click(function(){
        if($(this).hasClass('active')){
            $('.menu-child').slideUp();
             $(this).removeClass('active');
        }else {
            $('.menu-child').slideDown();
             $('.icon-bar>.menu').removeClass('active');
             $(this).addClass('active');
        }
     });


    $('.icon-bar>.danhmuc').click(function(){
        if($(this).hasClass('active')){
            $('.category-child').slideUp();
             $(this).removeClass('active');
             if($('.category-child>.item').hasClass('active')){
                $('.category-child>.item').children('.sub-menu').slideUp();
                $('.category-child>.item').removeClass('active');
            }
        }else {
            $('.category-child').slideDown();
             $('.icon-bar>.danhmuc').removeClass('active');
             $(this).addClass('active');
        }
     });

     //Đóng khi click bên ngoài
     $(document).on("click", function(event){
        if(!$(event.target).closest(".icon-bar>.menu").length && !$(event.target).closest(".menu-child>ul>li").length){
            $(".menu-child").slideUp();
            $(".icon-bar>.menu").removeClass('active');
        }
    });

    $(document).on("click", function(event){
        if(!$(event.target).closest(".icon-bar>.danhmuc").length 
        && !$(event.target).closest(".category-child>.item>.category").length
        && !$(event.target).closest(".category-child>.item>.sub-menu>li").length
        ){
            $(".category-child").slideUp();
            $(".icon-bar>.danhmuc").removeClass('active');
            if($('.category-child>.item').hasClass('active')){
                $('.category-child>.item').children('.sub-menu').slideUp();
                $('.category-child>.item').removeClass('active');
            }
        }
    });
 

    $('.category-child>.item').click(function(){
       if($(this).hasClass('active')){
            $(this).children('.sub-menu').slideUp();
            $(this).removeClass('active');
       }else {
            $('.sub-menu').slideUp();
            $(this).children('.sub-menu').slideDown();
            $('.category-child>.item').removeClass('active');
            $(this).addClass('active');
       }
    });
}