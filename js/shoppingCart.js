// JavaScript File
$(document).ready(function(){
    
    //global variables
    var rowNumber = 1;
    var item1Cost = 39.99;
    var item2Cost = 49.99;
    var item3Cost = 49.99;
    var tax = 0.0725;
    
    //array for shopping cart items
    var shoppingCartItems = [];
    
    $("#item1Buy").on("click", function() {
        var quantity = $("#item1Qty").val();
        addItem("Shoes", 1, quantity);
    })
    
    $("#item2Buy").on("click", function() {
        var quantity = $("#item2Qty").val();
        addItem("Sunglasses", 2, quantity);
    })
    
    $("#item3Buy").on("click", function() {
        var quantity = $("#item3Qty").val();
        addItem("Watch", 3, quantity);
    })
    
    
    //add item
    //productNumber, quantity, cost
    function addItem(productName, productNumber, quantity) {
        
        var quantityInt = parseInt(quantity);
        
        var shoppingCartItem = 
        {
            "id" : productNumber,
            "productName": productName,
            "quantity": quantityInt,
            "itemTotal": 0
        }
        
        var found = false;
        var index = -1;
        for(var i = 0; i < shoppingCartItems.length; i++) {
            if(shoppingCartItems[i].id == productNumber) {
                shoppingCartItems[i].quantity += shoppingCartItem.quantity;
                found = true;
                index = i;
                break;
            }
        }
        if(found == false){
            //add to shopping cart array
            //add new table row
            shoppingCartItems.push(shoppingCartItem);
        
            var itemCost = 0;
            var itemTotal = 0;
            var imgSrc = "";
            //hardcoded values for now
            if(productNumber == 1){
                itemCost = item1Cost;
                itemTotal = item1Cost * quantityInt;
                imgSrc += "shoes-sml.jpg";
            }else if(productNumber == 2) {
                itemCost = item2Cost;
                itemTotal = item2Cost * quantityInt;
                imgSrc += "sunglasses-sml.jpg";
            }else if(productNumber == 3) {
                itemCost = item3Cost;
                itemTotal = item3Cost * quantityInt;
                imgSrc += "watch-sml.jpg";
            }
            
            shoppingCartItem.itemTotal = itemTotal;
            
            var htmlToAppend = `<tr id="row${rowNumber}">`;
            htmlToAppend += `<td><img src="img/${imgSrc}" class="img-fluid"></td>`;
            htmlToAppend += `<td>${productName}</td>`;
            htmlToAppend += `<td id="quantity${rowNumber}">${quantityInt}</td>`;
            htmlToAppend += `<td id="itemCost${rowNumber}">${itemCost}</td>`;
            htmlToAppend += `<td id="itemTotal${rowNumber}">${itemTotal}</td>`;
            htmlToAppend += `<td><button type="button" class="btn btn-primary" id="delete${rowNumber}">Delete</button></td>`;
            htmlToAppend += `</tr>`;
            
            $('#shoppingCartTable tbody:last-child').append(htmlToAppend);
            var deleteId = `#row${rowNumber}`;
            $("#shoppingCartTable").on('click', deleteId, function() {
                removeItem(deleteId, productNumber);
            })
            var priceId = `#price${productNumber}`;
            $(priceId).removeClass('price').addClass('price-selected');
            var buttonId = `#item${productNumber}Buy`;
            $(buttonId).html("Buy More");
            $(buttonId).removeClass('btn-primary').addClass('btn-success');
            rowNumber++;
            updateTotals();
        }else {
            //update existing
            var quantityInt = shoppingCartItems[index].quantity;
            var itemCost = 0;
            var itemTotal = 0;
            //hardcoded values for now
            if(productNumber == 1){
                itemCost = item1Cost;
                itemTotal = item1Cost * quantityInt;
            }else if(productNumber == 2) {
                itemCost = item2Cost;
                itemTotal = item2Cost * quantityInt;
            }else if(productNumber == 3) {
                itemCost = item3Cost;
                itemTotal = item3Cost * quantityInt;
            }
            shoppingCartItems[index].itemTotal = itemTotal;
            var quantitySelector = `#quantity${index+1}`;
            var itemTotalSelector = `#itemTotal${index+1}`;
            $(quantitySelector).html(quantityInt);
            $(itemTotalSelector).html(itemTotal);
            updateTotals();
        }
        
    }
    
    //remove item
    
    function removeItem(id, productId) {
        $(id).remove();
        for(var i = 0; i < shoppingCartItems.length; i++) {
            if(shoppingCartItems[i].id == productId) {
                shoppingCartItems.splice(i, 1);
            }
        }
        rowNumber--;
        updateTotals();
        var priceId = `#price${productId}`;
        $(priceId).removeClass('price-selected').addClass('price');
        var buttonId = `#item${productId}Buy`;
        $(buttonId).html("Buy");
        $(buttonId).removeClass('btn-success').addClass('btn-primary');
    }
    
    function updateTotals() {
        var subTotal = 0.00;
        for(var i = 0; i < shoppingCartItems.length; i++) {
            subTotal += shoppingCartItems[i].itemTotal;
        }
        var salesTax = subTotal * tax;
        var total = subTotal + salesTax;
        $("#subtotal").html(subTotal.toFixed(2));
        $("#salesTax").html(salesTax.toFixed(2));
        $("#total").html(total.toFixed(2));
    }
    
    //update item
});