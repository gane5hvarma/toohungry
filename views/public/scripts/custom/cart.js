$('.block2-btn-addcart').each(function() {
    $(this).on('click', function () {
        var itemName = $(this).parents('.block2').find('.block2-name').text()
        itemName = itemName.trim();
        var restaurantName = $('.restaurant').text();
        restaurantName = restaurantName.trim();
        $(".header-icons-noti").each(function(){
           var cartQuantity=parseInt($(this).text())+1;
           $(this).text(cartQuantity);
        })

        $.post("/saveCartItem", {
            itemName: itemName,
            restaurantName:restaurantName
        }).done((data) => {
            console.log(data);
            swal(itemName, "is added to cart !", "success");

        }).fail((err) => {
            console.log(err)
        });

    });
});

$('.block2-btn-addwishlist').each(function () {
    var nameProduct = $(this).parent().parent().parent().find('.block2-name').html();
    $(this).on('click', function () {
        swal(nameProduct, "is added to wishlist !", "success");
    });
});
var cart_status=0;
var counter=0;
$(".js-show-header-dropdown").each(function(){
    
    

    $(this).on("click",function(){
        
        if (counter % 2 == 0 && cart_status == 0){
            counter = counter + 1;
            console.log("in counter")
            $.get("/getCartItems")
            .done((data)=>{
                var cartItemsCost=0;
                console.log(counter)
                    
                for(var cartItemIndex in data.items){
                    var cartItem=data.items[cartItemIndex];
                    cartItemsCost=cartItemsCost+(cartItem.itemCost*cartItem.itemQuantity);
                    console.log(cartItemsCost)
                    $(".header-cart-wrapitem").append( "<li class='header-cart-item'>"
                                                +"<div class='header-cart-item-img'>"
                                                + "<img src="+cartItem.itemImage + " alt='IMG'>"
                                                +"</div>"

                                                +"<div class='header-cart-item-txt'>"
                                                +   "<a href='#' class='header-cart-item-name'>"
                                                +      cartItem.itemName
                                                + "</a>"

                                                +  "<span class='header-cart-item-info'>"
                                                +     cartItem.itemQuantity +" x "+"$"+cartItem.itemCost
                                
                                                    +"</span>"
                                                +"</div>"
                                            +"</li>");
                $(".header-cart-total").text("total cost : "+cartItemsCost+" rs");
                }
                $(this).parent().find('.header-dropdown').toggleClass('show-header-dropdown');
                cart_status = 1;
                console.log(cart_status)
           
            })
        }
        else{

        }
    })
})
$(document).click(()=>{
   
    if (cart_status == 1 && counter % 2 == 1) {
        console.log("in document")
        console.log(cart_status)
        cart_status=0;
        counter=counter-1;
         $(".js-show-header-dropdown").parent().find('.header-dropdown').toggleClass('show-header-dropdown');
         $(".header-cart-wrapitem").children("li").remove();

    }
})
