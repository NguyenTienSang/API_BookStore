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


 function fetchLookBook() {
    var count = 0;
    fetch("http://localhost:3000/api/sanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(book => {
        //Lấy id book vừa click từ localstorage lên
        var bookIdLook = localStorage.getItem('bookIdLook');
        var html = '';
    
        for(var i=0; i<book.length; i++)
        {
            if(book[i].bookID === parseInt(bookIdLook))
            {
                html += '<div class="image-book col-md-5">'+
            '                            <div class="main">'+
            '                                <img src="'+ book[i].url +'" alt="">'+
            '                            </div>'+
            '                            <div class="child">'+
            '                                <img src="" alt="">'+
            '                            </div>'+
            '                            '+
            '                        </div>'+
            '                        <div class="script-book col-md-7">'+
            '                            <h5>'+ book[i].Title +'</h5>'+
            '                            <div class="price-original"><h5>Giá : </h5><span>' + book[i].Price + ' ₫</span></div>'+
            '                            <div class="description"><p>'+ book[i].BookDescription +'</p></div>'+
            '                            <div class="buy-book">'+
            '                                <input class="number-book" id="number-book" type="number" value="1" min=1 max=100>'+
            '                                <button onclick="onClickDuaVaoGioHang('+ book[i].bookID +')" class="buy-now"><i class="fas fa-shopping-cart"></i>THÊM VÀO GIỎ HÀNG</button>'+  
            '                            </div>'+
            '                            <div class="social-media">'+
            '                                <ul>'+
            '                                    <li><a class="facebook" href="http://facebook.com"><i class="fab fa-facebook-f"></i>Facebook</a></li>'+
            '                                    <li><a class="twitter" href="https://twitter.com"><i class="fab fa-twitter"></i>Twitter</a></li>'+
            '                                    <li><a class="google" href="https://google.com"><i class="fab fa-google-plus-g"></i>Google+</a></li>'+
            '                                    <li><a class="instagram" href="https://instagram.com"><i class="fab fa-instagram"></i>Instagram</a></li>'+
            '                                </ul>'+
            '                            </div>'+
            '                        </div>';

          
            var nodeGioHang = document.getElementById('content-book');
            nodeGioHang.innerHTML += html;
            var nodeLinkLine = document.querySelector('.link-line >  .ul-link-line > .li-link-line > .a-link-line');
            nodeLinkLine.innerHTML = book[i].Title;
            console.log(book[i].Title);
            // var soLuong = document.getElementById('number-book').value;
            // console.log('Soluong : '+soLuong);
           
        }
        }
    })
    .catch(error => {
        console.log(error);
    });

}

fetchLookBook();



async function onClickDuaVaoGioHang(idSanPham){



   var soLuong = document.getElementById('number-book').value;

   var danhSachItemGioHang = layGioHangTuLocalStorage();

   var coTonTaiTrongDanhSachItemGioHang = false;
   for(var i =0; i<danhSachItemGioHang.length; i++) {
       var itemGioHangHienTai = danhSachItemGioHang[i];
       /*Nếu tồn tại, thì tăng số lượng*/
       if(itemGioHangHienTai.idSanPham === idSanPham){
        //    console.log('danhSachItemGioHang : '+danhSachItemGioHang[i].soLuong+' kieu dl : '+typeof(danhSachItemGioHang[i].soLuong));
        //    console.log('so luong : '+soLuong+' kieu dl : '+typeof(soLuong));
            danhSachItemGioHang[i].soLuong = parseInt(danhSachItemGioHang[i].soLuong) + parseInt(soLuong);
            coTonTaiTrongDanhSachItemGioHang = true;
       }
   }

//    Nếu không tồn tại -> tạo ra đối tượng và thêm vào danh sách item giỏ hàng
   if(coTonTaiTrongDanhSachItemGioHang == false){
        var itemGioHang = TaoDoiTuongItemGioHang(idSanPham,soLuong);
        danhSachItemGioHang.push(itemGioHang);
   }
  
    // Bước 5: Lưu trữ lại vào local storage
    luuGioHangVaoLocalStorage(danhSachItemGioHang);
    
    setTimeout(function done(){
        document.querySelector('.order-success').style.display = 'none';
        // localStorage.removeItem('gioHang'); 
    },1000);
    document.querySelector('.order-success').style.display = 'block'

}

function layGioHangTuLocalStorage() {
    var gioHang = new Array();
    //TODO: truy cập ào local storage để lấy giỏ hàng
    /* Bước 1: Lấy json */
    var jsonGioHang = localStorage.getItem('gioHang');

    /* Bước 2: Chuyển json thành đối tượng giỏ hàng */
    if(jsonGioHang != null){
        gioHang = JSON.parse(jsonGioHang);
    }
    return gioHang;
}

function TaoDoiTuongItemGioHang(idSanPham,soLuong) {
    var itemGioHang = new Object();
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;
    return itemGioHang;
}

function luuGioHangVaoLocalStorage(gioHang) {
    /* Bước 1: Chuyển giỏ hàng thành json */
    var jsonGioHang = JSON.stringify(gioHang);
    /* Bước 2: Lưu json xuống local storage */
    localStorage.setItem('gioHang', jsonGioHang);
}


function fetchListCategoryBook() {
    fetch("http://localhost:3000/api/loaisanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(book => {
        var htmlListCategoryBookPC = '';
        var htmlListCategoryBookTablet = '';
        for(var i=0; i<book.length; i++)
        {
            htmlListCategoryBookPC += '<div class="item">'+
              '                    <div class="category">'+
              '                        <a onclick="FilterTypeBook('+ book[i].CategoryID +')" href="ProductType.html">'+ book[i].CategoryDescription +'</a>'+
              '                    </div>'+
              '                </div>';  

              htmlListCategoryBookTablet += '<div class="item">'+
              '     <div class="category">'+
              '              <a  onclick="FilterTypeBook('+ book[i].CategoryID +')" href="ProductType.html">'+ book[i].CategoryDescription +'</a>'+
              '     </div>'+
              '</div>';    
        }
        var nodeDSSPPC = document.querySelector('.loaisach');
        nodeDSSPPC.innerHTML += htmlListCategoryBookPC;

        var nodeDSSPTablet = document.querySelector('.category-child');
        nodeDSSPTablet.innerHTML += htmlListCategoryBookTablet;
    })
    .catch(error => {
        console.log(error);
    });
}

fetchListCategoryBook();

function FilterTypeBook(CategoryID)
{
    localStorage.setItem("CategoryID",CategoryID);
}


