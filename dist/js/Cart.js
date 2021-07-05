// var CategoryID = parseInt(localStorage.getItem("CategoryID"));
// function fetchListCategoryBook() {
//     // fetch("https://reqres.in/api/users")
//     var count = 0;
//     fetch("http://localhost:3000/api/loaisanpham")
//     .then(response => {
//         if(!response.ok) {
//             throw Error("ERROR");
//         }
//         return response.json();
//     })
//     .then(dulieu => {
//         const html = dulieu.map(user => {
//                 return `
//                 <a href="LanhDaoVaQuanLy.html">${user.CategoryDescription}</a>
//             `;
//             // }
//         }).join('');
//         document.querySelector(".book-item").insertAdjacentHTML("afterbegin", html);
        
//         const html1 = dulieu.map(user => {
//             if(user.CategoryID === CategoryID)
//             {
//                 return `
//                 <i class="fas fa-chevron-right"></i>
//                 <a href="Category_LanhDaoVaQuanLy.html">${user.CategoryDescription}</a>
//             `;
//             }
//         }).join('');
//         document.querySelector(".layout .link-line ul li:last-child").insertAdjacentHTML("afterbegin", html1);
//     })
//     .catch(error => {
//         console.log(error);
//     });
// }

// fetchListCategoryBook();






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
        const html = dulieu.map(user => {
            if(user.CategoryID === CategoryID)
                return `
                    <div class="newbook col-md-3">
                            <div class="item">
                                <div class="choose"><a class="shopping" href="">Chi tiết</a></div>
                                <div class="item-book">
                                    <a class="pass_link" href="/Book_PhuongThuc_Amazon.html">
                                        <div class="item-image">
                                            <img src="${user.url}" alt="">
                                        </div>
                                </div>
                                    <div class="item-price">
                                        <a class="item-price-book" href="/Book_PhuongThuc_Amazon.html"><p>${user.Title}</p></a>
                                        <div class="item-price-infor">
                                            <div class="price-original">
                                                <p class="item-price-infor-orginal">${user.Price}₫</p>
                                            </div>
                                        </div>
                                        <div class="item-price-star">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <span>50</span>
                                            <img src="/assets/img/user.png" alt="">
                                        </div>
                                    </div>   
                                </a>
                                </div>
                    </div>
            `;
        }).join('');
        document.querySelector(".owl_manager").insertAdjacentHTML("afterbegin", html);
    })
    .catch(error => {
        console.log(error);
    });
}

fetchListCodeBook();

