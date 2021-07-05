var CategoryID = parseInt(localStorage.getItem("CategoryID"));
function fetchListCategoryBook() {
    fetch("http://localhost:3000/api/loaisanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(book => {
        var htmlProductType = '';
        var htmlLinkLine = '';
        var htmlListCategoryBookTablet = '';
        for(var i=0;i<book.length; i++) {
            htmlProductType += '<a href="ProductType.html" onclick="FilterTypeBook('+ book[i].CategoryID +')">'+ book[i].CategoryDescription +'</a>';

            htmlListCategoryBookTablet += '<div class="item">'+
              '     <div class="category">'+
              '              <a  onclick="FilterTypeBook('+ book[i].CategoryID +')" href="ProductType.html">'+ book[i].CategoryDescription +'</a>'+
              '     </div>'+
              '</div>';    

            if(book[i].CategoryID === CategoryID) {
                htmlLinkLine += '<i class="fas fa-chevron-right"></i>'+
                '                <a href="ProductType.html">'+ book[i].CategoryDescription +'</a>';
            }
        }
        var nodeListProductType =  document.querySelector(".book-item");
        nodeListProductType.innerHTML = htmlProductType;

        var nodeLinkLine = document.querySelector(".layout .link-line ul li:last-child");
        nodeLinkLine.innerHTML = htmlLinkLine;

        var nodeDSSPTablet = document.querySelector('.category-child');
        nodeDSSPTablet.innerHTML += htmlListCategoryBookTablet;
        // console.log(htmlListCategoryBookTablet);
    })
    .catch(error => {
        console.log(error);
    });
}

fetchListCategoryBook();


function fetchListTypeBook() {
    var count = 0;
    fetch("http://localhost:3000/api/sanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(book => {
        var htmlProductType = '';
        for(var i=0; i<book.length; i++) {
            if(book[i].CategoryID === CategoryID) {
                htmlProductType += ' <div class="newbook col-md-3">'+
                '                                        <div class="item">'+
                '                                            <div class="choose" onclick="xemSanPham('+ book[i].bookID +')"><a class="shopping" href="ChiTietSanPham.html">Chi tiết</a></div>'+
                '                                            <div class="item-book">'+
                '                                                <div class="item-image">'+
                '                                                    <img src="'+ book[i].url +'" alt="">'+
                '                                                </div>'+
                '                                            </div>'+
                '                                            <div class="item-price">'+
                '                                                <a class="item-price-book" onclick="xemSanPham('+ book[i].bookID +')" href="ChiTietSanPham.html"><p>'+ book[i].Title +'</p></a>'+
                '                                                <div class="item-price-infor">'+
                '                                                    <div class="price-original">'+
                '                                                        <p class="item-price-infor-orginal">'+ book[i].Price +' ₫</p>'+
                '                                                    </div>'+
                '                                                </div>'+
                '                                                <div class="item-price-star">'+
                '                                                    <i class="fas fa-star"></i>'+
                '                                                    <i class="fas fa-star"></i>'+
                '                                                    <i class="fas fa-star"></i>'+
                '                                                    <i class="fas fa-star"></i>'+
                '                                                    <i class="fas fa-star"></i>'+
                '                                                    <span>50</span>'+
                '                                                    <img src="/src/img/finalproject/user.png" alt="">'+
                '                                                </div>'+
                '                                            </div>   '+
                '                                        </div>'+
                '                                    </div>';
            }
        }
       
       var nodeProductType =  document.querySelector(".owl_manager");
       nodeProductType.innerHTML = htmlProductType;
    })
    .catch(error => {
        console.log(error);
    });
}

fetchListTypeBook();

function FilterTypeBook(CategoryID)
{
    localStorage.setItem("CategoryID",CategoryID);
}

function xemSanPham(bookIdLook) {
    console.log(bookIdLook);
    localStorage.setItem("bookIdLook",bookIdLook);  
}

showCategory();

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