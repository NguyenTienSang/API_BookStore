addNew.onclick = (e) => {
    e.preventDefault()
    let CustomerID = document.querySelector("#orderCusID").value;
    let Address = document.querySelector("#orderAdd").value;
    let Status = document.querySelector("#orderStatus").value;
    let data =
    {
        CustomerID,
        Address,
        Status
    }
    createOr(data, () => {
        getOrder(renderOrder);
    })
}


function createOr(data, callback) {
var options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};

fetch(OrderAPI, options)
    .then(function (response) {
        response.json();
    })
    .then(callback)
    .then(showSuccessToast())
    .catch(reject => showErrorToast())
}


function getOrder(callback) {
fetch(OrderAPI)
    .then(response =>
        response.json()
    )
    .then(callback)
    .catch(reject => {
        console.log(reject);
    });
}


function renderOrder(orders) {
    let list = document.querySelector('.content__table')
    var html = `<tr>
                    <th>OrderID</th>
                    <th>CustomerID</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>`;
    var htmls = orders.map(function (order) {
        return `<tr class='OrderID-${order.OrderID}'>
                    <td>${order.OrderID}</td>
                    <td class="OrderCusID">${order.CustomerID}</td>
                    <td class="OrderDate">${order.Date}</td>
                    <td class="OrderAdd">${order.Address}</td>
                    <td class="OrderStatus">${order.Status}</td>
                    <td>
                        <div class="btn__group">
                            <div class="btn btn--editOrder" onclick= "handlerEditOr(${order.OrderID})">
                                <p>Edit</p>
                            </div>
                            <div class="btn btn--delete" onclick="deleteOr(${order.OrderID})">
                                <p>Delete</p>
                            </div>
                            <div class="btn btn--DetailOrder" onclick="handlerGetDetailOrder(${order.OrderID})">
                                <p>Detail</p>
                            </div>
                        </div>
                    </td>
                </tr>`
    })
    list.innerHTML = html + htmls.join('');
}