$(document).ready(function () {

    showCategory();

    $('.owl_sametype').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 9000,
        responsiveClass:true,
        responsive: {
            0: {
                items:1,
            },
            490: {
                items: 2,
            },
            690: {
                items: 3,
            },
            900: {
                    items: 4 ,
            },
            1025: {
                items: 3,
            },
            1200: {
                items: 4,
            },
        }
    })
    
});


function onFormSubmit() {
 
    var Hoten = document.getElementById('hoten').value;
    var Email = document.getElementById('email').value;
    var Tieude = document.getElementById('tieude').value;
    var Textarea = document.getElementById('textarea').value;
    if(Hoten == "" && Email == "" && Tieude == "" && Textarea == "")
    {
        document.getElementById('error').innerHTML  = 'Vui lòng nhập thông tin';
    }
    else if (Hoten == "" && Email != "" && Tieude != "" && Textarea != "")
    {
        document.getElementById('error').innerHTML  = 'Vui lòng nhập họ tên';
    }
    else if (Hoten != "" && Email == "" && Tieude != "" && Textarea != "")
    {
        document.getElementById('error').innerHTML  = 'Vui lòng nhập Email';
    }
    else if (Hoten != "" && Email != "" && Tieude == "" && Textarea != "")
    {
        document.getElementById('error').innerHTML  = 'Vui lòng nhập tiêu đề';
    }
    else if (Hoten != "" && Email != "" && Tieude != "" && Textarea == "")
    {
        document.getElementById('error').innerHTML  = 'Vui lòng nhập nội dung';
    }
    else if (Hoten != "" && Email != "" && Tieude != "" && Textarea != "")
    {
        document.getElementById("modal").style.display = "none";
        location.reload();
    }
}



function openForm(){
    document.getElementById("modal").style.display = "block";
}

function closeForm(){
    document.getElementById("modal").style.display = "none";
}

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