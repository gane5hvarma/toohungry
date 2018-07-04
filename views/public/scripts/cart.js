var $itemQuantityInput = $('input.item-quantity');
var $cartForm = $('#cart-form');

// update cart total on load
updateCartTotal();

$itemQuantityInput.bind('click keydown keyup', function(evt) {
    //prevent form from submitting when enter pressed on one of input elements
    if(evt.keyCode == 13 && evt.type === 'keydown') {
        evt.preventDefault();
        evt.stopPropagation();
    }
    var itemCost = $(this).attr('data-item-cost');
    var itemCostText = $(this).closest('.card-body').children('.item-cost');
    itemCostText.text($(this).val() * itemCost);
    updateCartTotal();
});

$('button.delete-item-btn').click(function(evt) {
    /*TODO
    * delete the item with the id from user info
    */
    $(this).closest('.card').remove();
    $itemQuantityInput = $('input.item-quantity');
    updateCartTotal();
});

function updateCartTotal() {
    var sum = 0;
    for(var i = 0; i < $itemQuantityInput.length; i++) {
        sum = sum + $itemQuantityInput[i].value * $itemQuantityInput[i].getAttribute('data-item-cost');
    }
    $('#cart-total').text(sum);
}