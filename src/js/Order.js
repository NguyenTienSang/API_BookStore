var apiLoaiSP = "http://localhost:3000/api/loaisanpham";
var apiHoaDon = "http://localhost:3000/api/hoadon";
var apiCTHoaDon = "http://localhost:3000/api/chitiethoadon";
const apiProduct = 'http://localhost:3000/api/sanpham';

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


function fetchListCategoryBook() {
    fetch(apiLoaiSP)
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
            // htmlListCategoryBookPC += '<div class="item">'+
            //   '                    <div class="category">'+
            //   '                        <a onclick="FilterTypeBook('+ book[i].CategoryID +')" href="ProductType.html">'+ book[i].CategoryDescription +'</a>'+
            //   '                    </div>'+
            //   '                </div>';  

              htmlListCategoryBookTablet += '<div class="item">'+
              '     <div class="category">'+
              '              <a  onclick="FilterTypeBook('+ book[i].CategoryID +')" href="ProductType.html">'+ book[i].CategoryDescription +'</a>'+
              '     </div>'+
              '</div>';    
        }
        // var nodeDSSPPC = document.querySelector('.loaisach');
        // nodeDSSPPC.innerHTML += htmlListCategoryBookPC;

        var nodeDSSPTablet = document.querySelector('.category-child');
        nodeDSSPTablet.innerHTML += htmlListCategoryBookTablet;
    })
    .catch(error => {
        console.log(error);
    });
}

fetchListCategoryBook();


thongTinHoaDon();

async function thongTinHoaDon() {

    var hoaDon = new Object();
    const response1 = await fetch(apiHoaDon);
    const bill = await response1.json();

    const response2 = await fetch(apiCTHoaDon);
    const detailBill = await response2.json();


    const response3 = await fetch(apiProduct);
    const product = await response3.json();

    var htmlOrder = '';
    var tongTien = 0;
    for(var i=0; i<bill.length; i++) {
            // hoaDon = bill[i];
            // console.log('Địa chỉ : '+bill[i].Address+' Trạng thái : '+bill[i].Status+' Thời gian đặt : '+bill[i].Date);
            htmlOrder += '<div class="informationOrder">'+
            '                    <div class="address" style="width: 30%;">'+
            '                        <span>Địa chỉ :</span>'+
            '                        <p>'+bill[i].Address+'</p>'+
            '                    </div>'+
            '                    <div class="status" style="width: 30%;">'+
            '                        <span>Trạng thái :</span>'+
            '                        <p>'+bill[i].Status+'</p>'+
            '                    </div>'+
            '                    <div class="time" style="width: 40%;">'+
            '                        <span>Thời gian đặt hàng :</span>'+
            '                        <p>'+bill[i].Date+'</p>'+
            '                    </div>'+
            '                </div>'+
            '                <div class="headerProduct">'+
            '                    <ul>'+
            '                        <li style="width: 15%;">Hình ảnh</li>'+
            '                        <li style="width: 40%;">Tên sản phẩm</li>'+
            '                        <li style="width: 15%;">Giá</li>'+
            '                        <li style="width: 10%;">Số lượng</li>'+
            '                        <li style="width: 15%;">Thành tiền</li>'+
            '                    </ul>'+
            '                </div>'+
            '<div class="bodyProduct">';
            for(var j=0; j< detailBill.length; j++) {
                if(bill[i].OrderID === detailBill[j].OrderID) {
                    // console.log('Mã sách : '+ detailBill[j].bookID+ ' Kiểu dữ liệu : '+ typeof(detailBill[j].bookID)+ ' Số lượng : '+detailBill[j].Quantity);
                    for(var k=0; k< product.length; k++) {
                        // console.log(product[k].bookID+' Kiểu dữ liệu : '+typeof(product[k].bookID));
                        if(detailBill[j].bookID === product[k].bookID) {
                            htmlOrder+= '<div class="informationProduct">'+
                            '                        <div class="imageProduct" style="width: 15%;"><img src="'+ product[k].url +'" width="100px" height="120px" alt=""></div>'+
                            '                        <div class="nameProduct" style="width: 40%;">'+ product[k].Title +'</div>'+
                            '                        <div class="priceProduct" style="width: 15%;">'+ product[k].Price +' đ</div>'+
                            '                        <div class="numberProduct" style="width: 10%;">'+detailBill[j].Quantity+'</div>'+
                            '                        <div class="costProduct" style="width: 15%;">'+ product[k].Price*detailBill[j].Quantity +' đ</div>'+
                            '                    </div>';
                            tongTien+= product[k].Price*detailBill[j].Quantity;
                        }
                    }
                    
                }
            }
            htmlOrder+= '</div>';
    }

    htmlOrder+= ' <div class="sumCost">'+
    '        <span>Tổng tiền : </span>'+tongTien+' đ'+
    '  </div>';
    var nodeOrder = document.querySelector('.layout > .myOrder');
    nodeOrder.innerHTML = htmlOrder;
}


    