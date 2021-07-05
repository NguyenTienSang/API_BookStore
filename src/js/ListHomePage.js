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

function fetchListBook() {
    fetch("http://localhost:3000/api/sanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(book => {
        var htmlkn = '';
        var htmlnn = '';
        var htmllt = '';
        var htmlvh = '';
        var countkn = 0;
        var countnn = 0;
        var countcb = 0;
        var countvh = 0;
        for(var i=0; i<book.length; i++) {
            //Lọc sách kỹ năng
            if(book[i].CategoryID === 8 && countkn < 13){
                countkn++;
                htmlkn += ' <div class="newbook col-md-3">'+
                '                        <div class="item">'+
                '                            <div class="choose" onclick="xemSanPham('+ book[i].bookID +')"><a class="shopping" href="ChiTietSanPham.html">Chi tiết</a></div>'+
                '                            <div class="item-book">'+
                '                                    <div class="item-image">'+
                '                                        <img src="'+ book[i].url +'" alt="">'+
                '                                    </div>'+
                '                            </div>'+
                '                            <div class="item-price">'+
                '                                <a class="item-price-book" onclick="xemSanPham('+ book[i].bookID +') href="ChiTietSanPham.html"><p>'+ book[i].Title +'</p></a>'+
                '                                <div class="item-price-infor">'+
                '                                    <div class="price-original">'+
                '                                        <p class="item-price-infor-orginal">'+ book[i].Price +' ₫</p>'+
                '                                    </div>'+
                '                                </div>'+
                '                                <div class="item-price-star">'+
                '                                    <i class="fas fa-star"></i>'+
                '                                    <i class="fas fa-star"></i>'+
                '                                    <i class="fas fa-star"></i>'+
                '                                    <i class="fas fa-star"></i>'+
                '                                    <i class="fas fa-star"></i>'+
                '                                    <span>50</span>'+
                '                                    <img src="/src/img/finalproject/user.png" alt="">'+
                '                                </div>'+
                '                            </div> '+
                '                        </div>  '+
                '          </div>';
            }
            //Lọc sách ngoại ngữ
            else if(book[i].CategoryID === 9 && countnn < 12){
                countnn++;
                htmlnn += ' <div class="col-bestseller col-md-3">'+
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
            //Lọc sách lập trình
            else if(book[i].CategoryID === 7 && countcb < 20){
                countcb++;
                htmllt += '<div class="col-giftbook">'+
                '                            <div class="item">'+
                '                                <a href=""><img src="'+ book[i].url +'" alt=""></a>'+
                '                                    <div class="book">'+
                '                                        <a href=""><span>'+ book[i].Title +'</span></a>'+
                '                                            <div class="star">'+
                '                                                <i class="fas fa-star"></i>'+
                '                                                <i class="fas fa-star"></i>'+
                '                                                <i class="fas fa-star"></i>'+
                '                                                <i class="fas fa-star"></i>'+
                '                                                <i class="fas fa-star"></i>'+
                '                                            </div>'+
                '                                            <div class="buy">Liên hệ</div>'+
                '                                    </div>'+
                '                            </div>'+
                '                        </div>';
            }
             //Lọc sách văn học
             else if(book[i].CategoryID === 10 && countvh < 6){
                countvh++;
                htmlvh += '<div class="book_shelf col-lg-6 col-md-4 col-sm-6">'+
                '                        <div class="item">'+
                '                            <a class="image_book" href="ChiTietSanPham.html">'+
                '                                <img src="'+ book[i].url +'" alt="">'+
                '                            </a>'+
                '                            <div class="content">'+
                '                                <div class="name"><a href="ChiTietSanPham.html">'+ book[i].Title +'</a></div>'+
                '                                <div class="star">'+
                '                                    <i class="fas fa-star"></i>'+
                '                                    <i class="fas fa-star"></i>'+
                '                                    <i class="fas fa-star"></i>'+
                '                                    <i class="fas fa-star"></i>'+
                '                                    <i class="fas fa-star"></i>'+
                '                                </div>'+
                '                                <div class="price">'+ book[i].Price +' ₫</div>'+
                '                            </div>'+
                '                        </div>'+
                '                    </div>  ';
            }
        }

        //Sách kỹ năng
        var nodeSKN = document.querySelector('.sachmoi');
        nodeSKN.innerHTML += htmlkn;
        //Sách ngoại ngữ
        var nodeSNN = document.querySelector('.bestseller');
        nodeSNN.innerHTML += htmlnn;
         //Sách lập trình
         var nodeSLT = document.querySelector('.owl_giftbook');
         nodeSLT.innerHTML += htmllt;
         //Sách văn học
         var nodeSVH = document.querySelector('.list-vh');
         nodeSVH.innerHTML += htmlvh;
       
    })
    .catch(error => {
        console.log(error);
    });

}

fetchListBook();


function xemSanPham(bookIdLook) {
    localStorage.setItem("bookIdLook",bookIdLook);  
}