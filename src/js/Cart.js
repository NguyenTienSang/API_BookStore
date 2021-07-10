var apiSanPham = "http://localhost:3000/api/sanpham";
var apiLoaiSP = "http://localhost:3000/api/loaisanpham";
var apiKhachHang = "http://localhost:3000/api/khachhang";
var apiOrder = 'http://localhost:3000/api/hoadon';
var apiOrderDetail = 'http://localhost:3000/api/chitiethoadon';

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
              htmlListCategoryBookTablet += '<div class="item">'+
              '     <div class="category">'+
              '              <a  onclick="FilterTypeBook('+ book[i].CategoryID +')" href="ProductType.html">'+ book[i].CategoryDescription +'</a>'+
              '     </div>'+
              '</div>';    
        }
        var nodeDSSPTablet = document.querySelector('.category-child');
        nodeDSSPTablet.innerHTML += htmlListCategoryBookTablet;
    })
    .catch(error => {
        console.log(error);
    });
}

fetchListCategoryBook();


hienThiDanhSachItemGioHang();

async function hienThiDanhSachItemGioHang() {
    /*Bước 1: Lấy danh sách item giỏ hàng dưới local storage lên*/
    var danhSachItemGioHang = layGioHangTuLocalStorage();
    /*Bước 2: Chuyển danh sách item giỏ hàng thành HTML */
    var HTML = await chuyenDanhSachItemGioHangSangHTML(danhSachItemGioHang);
    var nodeGioHang = document.getElementById('cart-body');
    nodeGioHang.innerHTML= HTML;
    var sanPham = new Object();
    var tongTien = 0;
    for(var i =0 ;i< danhSachItemGioHang.length; i++) {

        sanPham = await laySanPhamTheoId(danhSachItemGioHang[i].idSanPham);
        tongTien+= await parseInt(sanPham.Price) * parseInt(danhSachItemGioHang[i].soLuong);
    }

    var nodeTongTien= document.querySelector('.sumCount');
    nodeTongTien.innerHTML= tongTien + ' đ'; 
}

function decrementButton(bookID,Price,stt) {
    var danhSachItemGioHang = layGioHangTuLocalStorage();
    var  decrementButton = document.querySelectorAll('.item-product  > .box-input > #cart-book');
    if(decrementButton[stt].value > 1) {
      decrementButton[stt].value--;
        var tongTien = document.querySelectorAll('.item-product  > .price > #product-price');
        tongTien[stt].innerHTML = parseInt(Price) * decrementButton[stt].value + ' đ';
        var nodeTongTien= document.querySelector('.sumCount');
        nodeTongTien.innerHTML= parseInt(nodeTongTien.innerHTML) - parseInt(Price)+ ' đ';
        for(var i =0 ;i< danhSachItemGioHang.length; i++) {
            if(danhSachItemGioHang[i].idSanPham === bookID) {
                danhSachItemGioHang[i].soLuong -=  (parseInt(danhSachItemGioHang[i].soLuong) - parseInt(decrementButton[stt].value));
                luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang);
            }
        }
    }
}

function incrementButton(bookID,Price,stt) {
    var danhSachItemGioHang = layGioHangTuLocalStorage();
    var  incrementButton = document.querySelectorAll('.item-product  > .box-input > #cart-book');
    if(incrementButton[stt].value < 100) {
        incrementButton[stt].value++;
        var tongTien = document.querySelectorAll('.item-product  > .price > #product-price');
        tongTien[stt].innerHTML = parseInt(Price) * incrementButton[stt].value + ' đ';
        var nodeTongTien= document.querySelector('.sumCount');
        nodeTongTien.innerHTML= parseInt(nodeTongTien.innerHTML) + parseInt(Price)+ ' đ'; 

        for(var i =0 ;i< danhSachItemGioHang.length; i++) {
            if(danhSachItemGioHang[i].idSanPham === bookID) {
                console.log('incrementButton : '+incrementButton[stt].value);
                console.log('danhSachItemGioHang : '+danhSachItemGioHang[i].soLuong);
                danhSachItemGioHang[i].soLuong = parseInt(danhSachItemGioHang[i].soLuong) + (parseInt(incrementButton[stt].value) - parseInt(danhSachItemGioHang[i].soLuong));
                luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang);
            }
        }
    }
    else {
        incrementButton[stt].value = 100;
    }
    
}


async function chuyenDanhSachItemGioHangSangHTML(danhSachItemGioHang) {
    var htmlTong = '';
    for(var i=0; i< danhSachItemGioHang.length; i++){
        htmlTong = htmlTong + await chuyenDoiTuongItemGioHangSangHTML(danhSachItemGioHang[i],i);
    }
    return htmlTong;
}


async function chuyenDoiTuongItemGioHangSangHTML(itemGioHang,stt) {
    var sanPham = await laySanPhamTheoId(itemGioHang.idSanPham);
    var tongTien = sanPham.Price * parseInt(itemGioHang.soLuong);
    var html = '';
    html+= '<div class="item-product">'+
'                        <div class="image" style="width: 10%">'+
'                                <img id="image-product" src="'+ sanPham.url +'" alt="">'+
'                        </div>'+
'                        <div class="name" style="width: 31%">'+sanPham.Title +' </div>'+
'                        <div class="cost" style="width: 16%">'+
'                            <span class="product-cost">'+ sanPham.Price +' đ</span>'+
'                        </div>'+
'                       <div class="box-input"   style="width: 14%">'+
'                           <label for="name"></label>'+
'                           <div class="dec button" onclick="decrementButton('+ sanPham.bookID +','+ sanPham.Price +','+ stt +')">-</div>'+
'                           <input type="text"  id="cart-book" value="'+ itemGioHang.soLuong +'" class="input-field">'+
'                           <div class="inc button" onclick="incrementButton('+ sanPham.bookID +','+ sanPham.Price +','+ stt +')">+</div>'+
'                        </div>'+
'                        <div class="price" style="width: 15%">'+
'                            <span class="product-price" id="product-price">'+ tongTien +' đ</span>'+
'                        </div>'+
'                        <div class="delete" onclick="xoaItemDSGioHang('+ sanPham.bookID +','+ sanPham.Price +','+ itemGioHang.soLuong +')" style="width: 7%; display: flex;justify-content: center;padding-left: 12px;"><i class="far fa-trash-alt"></i></div>'+
'                    </div>    ';

    return html;
}


async function laySanPhamTheoId(idSanPham) {
var sanPham = new Object();
    const response = await fetch(apiSanPham);
    const book = await response.json();
    for(var i=0; i<book.length; i++) {
        if(book[i].bookID == idSanPham){
            sanPham = book[i];
        }
    }
    return sanPham;
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


function layDanhSachSanPhamDuoiLocalStorage() {
    /* Bước 1: Load json */
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    /* Bước 2: Chuyển json thành đối tượng */
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
    return danhSachSanPham;
}


function luuDanhSachItemGioHangVaoLocalStorage(danhSachItemGioHang) {
    /*Bước 1: Chuyển thành chuỗi json*/
    var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);
    /*Bước 2: Lưu vào local storage*/  
    localStorage.setItem('gioHang',jsonDanhSachItemGioHang);
} 


// Xóa item trong danh sách giỏ hàng
async function xoaItemDSGioHang(idItemXoa,giaItemXoa,soLuongItemXoa) {
    var danhSachItemGioHang = layGioHangTuLocalStorage();
    //Thực hiện xóa giỏ hàng dưới LocalStorage
    localStorage.removeItem('gioHang');
    var HTML = await chuyenDanhSachItemXoaGioHangSangHTML(danhSachItemGioHang,idItemXoa);
    var nodeGioHang = document.getElementById('cart-body');
    console.log('HTML : '+HTML);
    nodeGioHang.innerHTML= HTML;

    var nodeTongTien= document.querySelector('.sumCount');

    console.log('Tổng giá : '+nodeTongTien.innerHTML);
    console.log('Giá trừ : '+parseInt(giaItemXoa)*(soLuongItemXoa));

    nodeTongTien.innerHTML= (parseInt(nodeTongTien.innerHTML) - parseInt(giaItemXoa)*(soLuongItemXoa)) + ' đ'; 
    location.reload();
}



async function chuyenDanhSachItemXoaGioHangSangHTML(danhSachItemGioHang,IdItemXoa) {
    var htmlTong = '';
    var newDanhSachGioHang;
    newDanhSachGioHang = new Array();
    for(var i=0; i< danhSachItemGioHang.length; i++){
        if(parseInt(danhSachItemGioHang[i].idSanPham) !== IdItemXoa)
        {
            htmlTong = htmlTong + await chuyenDoiTuongItemGioHangSangHTML(danhSachItemGioHang[i]);
            newDanhSachGioHang.push(danhSachItemGioHang[i]);
        }
    }
    //Lưu danh sách giỏ hàng mới vào loalStorage
    if(newDanhSachGioHang.length !== 0){    
        var jsonDanhSachGioHang = JSON.stringify(newDanhSachGioHang);
        localStorage.setItem('gioHang',jsonDanhSachGioHang); 
    }
    return htmlTong;
}


function orderSuccess1() {
    orderSuccess();
    

    setTimeout(function  sa(){
        createDetailOrder();
    },2000);
}
//------------------------- Tạo hóa đơn
function orderSuccess() {
    createOrder();
    setTimeout(function done(){
        document.querySelector('.order-success').style.display = 'none';
        // localStorage.removeItem('gioHang'); 
        // location.reload();
    },1000);
    document.querySelector('.order-success').style.display = 'block';
    // alert('Đặt hàng thành công');
}
//-------------------------------------- new
async function createOrder() {
   //Tạo đơn hàng
    //Lấy id khách hàng
    // var CustomerID = localStorage.getItem('idUser');
    var CustomerID = 9;
    var  Address = "";
    var Status = "Chờ xác nhận";
    var Email = "";
    //Lấy địa chỉ khách hàng
    await  getAddress();

    async function getAddress() {
        try {
            const response = await fetch(apiKhachHang);
            const customer = await response.json();
            for(var i=0; i<customer.length; i++) {
                if(customer[i].CustomerID === parseInt(CustomerID)){
                    Address = customer[i].Address;
                    Email = customer[i].Email;
                }
            } 
        } catch (error) {
            console.log("Fail: ", error.message);
        }
    }

    await createOrderProduct();
    async function createOrderProduct() {
        let data =
        {
            CustomerID,
            Address,
            Status
        } 
        createOr(data, () => {
            console.log('1'); 
        })
        await Email.send({
            Host : "smtp.gmail.com",
            Username : "tiensang0007@gmail.com",
            Password : "QuamonthayTru123",
            To : `${Email}`,
            From : "tiensang0007@gmail.com",
            Subject : "Đơn hàng đã được đặt thành công",
            Body : "Thông tin chi tiết xem tại cửa hàng"
        }).then(
            (message) => alert("Gửi mail thành công")
          );
    }
}


function createOr(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(apiOrder, options)
        .then(function (response) {
            response.json();
        })
        .then(callback)
        .then()
        .catch(error => {
            console.log(error);
        });
}


//Tạo chi tiết hóa đơn
async function createDetailOrder() {
        await getIdOrder();
        async function getIdOrder() {
            try {
                var apiOrder2 = 'http://localhost:3000/api/hoadon';
                const response = await fetch(apiOrder2);
                const order = await response.json();
                var OrderID = 0;
                var bookID=0;
                var Quantity=0;

                OrderID = order[order.length-1].OrderID;
                  var danhSachItemGioHang = layGioHangTuLocalStorage();

                    for(var i =0 ;i< danhSachItemGioHang.length; i++) {
                        bookID =  danhSachItemGioHang[i].idSanPham;
                        Quantity =   danhSachItemGioHang[i].soLuong;
                        
                        let data =
                        {
                            OrderID,
                            bookID,
                            Quantity
                        }     

                        let url = apiOrderDetail + '/' + OrderID;
                        CreateOrderDetail(data, url, () => {
                            GetDetailOrder(OrderID);
                        })
                    }
            } catch (error) {
                console.log("Fail: ", error.message);
            }
           
        }
        //Thực hiện xóa giỏ hàng dưới LocalStorage
        await localStorage.removeItem('gioHang');
        // await location.reload();


}

//-------------------------------------------
function createOr(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    fetch(apiOrder, options)
        .then(function (response) {
            response.json();
        })
        .catch(reject => {
            console.log(reject);
        });
    }


// xử lí form detailOrder
function CreateOrderDetail(data, url) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(data);
    console.log(url);
    fetch(url, options)
        .then(function (response) {
            response.json();
        })
        .catch(reject => {
            console.log(reject);
        });
}




function GetDetailOrder(id) {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(apiOrderDetail + '/' + id, options)
        .then(response =>
            response.json()
        )
        .catch(reject => {
            console.log(reject);
        });

}



//------ CHI TIẾT ĐƠN HÀNG