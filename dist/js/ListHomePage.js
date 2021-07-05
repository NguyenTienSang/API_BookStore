var danhSachSanPham = localStorage.getItem('danhSachSanPham');
if(danhSachSanPham == null)
{
    danhSachSanPham = new Array();
}

loadIdBookToLocalStorage();
function loadIdBookToLocalStorage(){
    fetch("http://localhost:3000/api/sanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(dulieu => {
        // console.log(dulieu.data);
        const html = dulieu.map(book => {
               localStorage.setItem('bookID',book.bookID);
        })
    })
    .catch(error => {
        console.log(error);
    });
}

function fetchListCategoryBook() {
    // fetch("https://reqres.in/api/books")
    var count = 0;
    fetch("http://localhost:3000/api/loaisanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(dulieu => {
        // console.log(dulieu.data);
        const html = dulieu.map(book => {
                return `
                <div class="item">
                    <div class="category">
                        <a onclick="FilterTypeBook(${book.CategoryID})" href="ProductType.html">${book.CategoryDescription}</a>
                    </div>
                </div>
            `;
        }).join('');
        document.querySelector(".loaisach").insertAdjacentHTML("afterbegin", html);
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

function fetchListBookKN() {
    // fetch("https://reqres.in/api/books")
    var count = 0;
    fetch("http://localhost:3000/api/sanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(dulieu => {
        // console.log(dulieu.data);
        const html = dulieu.map(book => {
            if(book.CategoryID === 8 && count <12)
            {
                count++;
                return `
                    <div class="newbook col-md-3">
                        <div class="item">
                            <div class="choose" onclick="xemSanPham(${book.bookID})"><a class="shopping" href="ChiTietSanPham.html">Chi tiết</a></div>
                            <div class="item-book">
                                <a class="pass_link" onclick="xemSanPham(${book.bookID}) href="ChiTietSanPham.html">
                                    <div class="item-image">
                                        <img src="${book.url}" alt="">
                                    </div>
                            </div>
                            <div class="item-price">
                                <a class="item-price-book" href="javascript:void(0)"><p>${book.Title}</p></a>
                                <div class="item-price-infor">
                                    <div class="price-original">
                                        <p class="item-price-infor-orginal">${book.Price}₫</p>
                                    </div>
                                </div>
                                <div class="item-price-star">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <span>50</span>
                                    <img src="/src/img/finalproject/user.png" alt="">
                                </div>
                            </div> 
                        </div>  
                    </div>
            `;
            }
        }).join('');
        document.querySelector(".owl_sachmoi").insertAdjacentHTML("afterbegin", html);
    })
    .catch(error => {
        console.log(error);
    });

    $('.owl_sachmoi').owlCarousel({
        items: 4,
        loop: true,
        autoplay: true,
        autoplayTimeout: 9000,
        nav: true
    })
}

fetchListBookKN();


function fetchListForeignLanguage() {
    var count = 0;
    fetch("http://localhost:3000/api/sanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(dulieu => {
        // console.log(dulieu.data);
        const html = dulieu.map(book => {
            if(book.CategoryID === 9 && count <12)
            {
                count++;
                return `
                <div class="col-bestseller col-md-3">
                                        <div class="item">
                                            <div class="choose"><a class="shopping" href="ChiTietSanPham.html">Chi tiết</a></div>
                                            <div class="item-book">
                                                <div class="item-image">
                                                    <img src="${book.url}" alt="">
                                                </div>
                                            </div>
                                            <div class="item-price">
                                                <a class="item-price-book" href="javascript:void(0)"><p>${book.Title}</p></a>
                                                <div class="item-price-infor">
                                                    <div class="price-original">
                                                        <p class="item-price-infor-orginal">${book.Price}₫</p>
                                                    </div>
                                                </div>
                                                <div class="item-price-star">
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <span>50</span>
                                                    <img src="/src/img/finalproject/user.png" alt="">
                                                </div>
                                            </div>   
                                        </div>
                                    </div>
            `;
            }
        }).join('');
        document.querySelector(".owl_bestseller").insertAdjacentHTML("afterbegin", html);
    })
    .catch(error => {
        console.log(error);
    });
}

fetchListForeignLanguage();

function fetchListCodeBook() {
    var count = 0;
    fetch("http://localhost:3000/api/sanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(dulieu => {
        // console.log(dulieu.data);
        const html = dulieu.map(book => {
            if(book.CategoryID === 7)
            {
                count++;
                return `
                        <div class="col-giftbook">
                            <div class="item">
                                <a href=""><img src="${book.url}" alt=""></a>
                                    <div class="book">
                                        <a href=""><span>${book.Title}</span></a>
                                            <div class="star">
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                                            <div class="buy">Liên hệ</div>
                                    </div>
                            </div>
                        </div>
            `;
            }
        }).join('');
        document.querySelector(".owl_giftbook").insertAdjacentHTML("afterbegin", html);
    })
    .catch(error => {
        console.log(error);
    });
}

fetchListCodeBook();

function fetchListLiterary() {
    var count = 0;
    fetch("http://localhost:3000/api/sanpham")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    })
    .then(dulieu => {
        // console.log(dulieu.data);
        const html = dulieu.map(book => {
            if(book.CategoryID === 10)
            {
                count++;
                return `
                    <div class="book_shelf col-lg-6 col-md-4 col-sm-6">
                        <div class="item">
                            <a class="image_book" href="ChiTietSanPham.html">
                                <img src="${book.url}" alt="">
                            </a>
                            <div class="content">
                                <div class="name"><a href="ChiTietSanPham.html">${book.Title}</a></div>
                                <div class="star">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <div class="price">${book.Price}₫</div>
                            </div>
                        </div>
                    </div>  
            `;
            }
        }).join('');
        document.querySelector(".owl-list").insertAdjacentHTML("afterbegin", html);
    })
    .catch(error => {
        console.log(error);
    });
}

fetchListLiterary();


function xemSanPham(bookIDLook) {
    console.log('đã xem sách');
    console.log(bookIDLook);
    localStorage.setItem("bookIDLook",bookIDLook);
}
