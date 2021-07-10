//Tìm kiếm sản phẩm
//getting all required elements
var apiSanPham = "http://localhost:3000/api/sanpham";
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const iconSearching = document.querySelector(".icon");
inputBox.value = "";
search();
async function search() {
const res =  await fetch(apiSanPham);
const states = await res.json();
const suggestions = new Array();
for(var i=0; i< states.length; i++) {
    suggestions.push(states[i].Title);
}
//If user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        emptyArray = suggestions.filter((data) => {
            //filtering array value and user char to lowercase and return only those
            // word/sent which are starts with user entered word
            return (data.toLocaleLowerCase()).includes(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data) =>{
            return data = '<li>'+ data +'</li>'
        });
        searchWrapper.classList.add("active");//Show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for(let i=0; i<allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick","select(this)");
        }
        // iconSearching.setAttribute("onclick","SaveSearchText(inputBox.value)")
    }else {
        searchWrapper.classList.remove("active");//hide autocomplete box
    }
    SaveSearchText(inputBox.value);
}
}


function select(element) {
    let selectUserData = element.textContent;
    inputBox.value = selectUserData; //passing the user selected list item data in textfield
    SaveSearchText(inputBox.value);
}

function showSuggestions(list) {
    let listData;
    if(!list.length) {
        userValue = inputBox.value;
        listData = '<li>'+userValue+'</li>';
    }else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

function SaveSearchText(TextTyping) {
    localStorage.setItem('TextTyping',TextTyping);
}