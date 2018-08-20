$('.btn-num-product-down').on('click', function (e) {
    e.preventDefault();
    var quantity = Number($(this).next().val());
    if (quantity > 1) {
        $(this).next().val(quantity - 1);
        var table_row = $(this).parent().parent().parent()[0];
        var itemName = table_row.children[1].textContent;
        var restaurantName = table_row.children[2].textContent;
        $.post("/updateCartItemQuantity", {
            itemName: itemName,
            restaurantName: restaurantName,
            itemQuantity: quantity - 1
        }).done((data) => {
            console.log(data);
            location.reload();
        }).fail((err) => {
            console.log(err)
        });

    }

});

$('.btn-num-product-up').on('click', function (e) {
    e.preventDefault();
    var quantity = Number($(this).prev().val());
    $(this).prev().val(quantity + 1);
    var table_row = $(this).parent().parent().parent()[0];
    var itemName = table_row.children[1].textContent;
    var restaurantName = table_row.children[2].textContent;
    $.post("/updateCartItemQuantity", {
        itemName: itemName,
        restaurantName: restaurantName,
        itemQuantity: quantity + 1
    }).done((data) => {
        console.log(data);
        location.reload();
    }).fail((err) => {
        console.log(err)
    });
});
$(document).ready(() => {

    var total_cartItemsCost = 0;
    $(".total-item-cost").each((index, object) => {
        var table_row = object.parentElement.parentElement;
        var itemCost = table_row.children[3].textContent;
        console.log(itemCost)
        console.log(table_row.children[4].children[0].children[0]);
        var itemQuantity = table_row.children[4].children[0].children[0].textContent;
        var total_itemCost = itemCost * itemQuantity;
        total_cartItemsCost = total_cartItemsCost + total_itemCost;
        $(".total-item-cost")[index].textContent = total_itemCost
        console.log($("total-item-cost").text())

    })
    $(".subtotal_cartItemsCost").text(total_cartItemsCost)
    var cartQuantity = $(".cartQuantity").text()
    if (cartQuantity > 0) {
        var total = 35 + total_cartItemsCost + total_cartItemsCost * 5 / 100;
        $(".TotalItemsCost").text(total);
    } else {
        $(".TotalItemsCost").text("0");
    }
})
$('#confirm-button').on('click', function () {
    var amount = $(".TotalItemsCost").text();
    $.post("./createPayment", {
            amount: amount
        })
        .done((url) => {
            window.location = url
            console.log(url)
        })
})
$(".remove-item").click(function (e) {
    e.preventDefault();
    var table_row = $(this).parent().parent()[0];
    var itemName = table_row.children[1].textContent;
    var restaurantName = table_row.children[2].textContent;
    $.post("/removeItemIncart", {
        itemName: itemName,
        restaurantName: restaurantName,
    }).done((data) => {
        location.reload();
    }).fail((err) => {
        console.log(err);
    });


})
