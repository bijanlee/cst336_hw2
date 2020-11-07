// JavaScript File
$(document).ready(function(){
    
    //global variables
    var rowNumber = 1;
    var item1Cost = 3.99;
    var item2Cost = 4.99;
    var item3Cost = 4.99;
    
    //array for shopping cart items
    var shoppingCartItems = [];
    
    $("#item1Buy").on("click", function() {
        var quantity = $("#item1Qty").val();
        addItem("Carton of Eggs", 1, quantity);
    })
    
    $("#item2Buy").on("click", function() {
        var quantity = $("#item2Qty").val();
        addItem("Loaf of Bread", 2, quantity);
    })
    
    $("#item3Buy").on("click", function() {
        var quantity = $("#item3Qty").val();
        addItem("Gallon of Milk", 3, quantity);
    })
    
    
    //add item
    //productNumber, quantity, cost
    function addItem(productName, productNumber, quantity) {
        
        var quantityInt = parseInt(quantity);
        
        var shoppingCartItem = 
        {
            "id" : productNumber,
            "productName": productName,
            "quantity": quantityInt
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
            
            var htmlToAppend = `<tr id="row${rowNumber}">`;
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
            rowNumber++;
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
            var quantitySelector = `#quantity${index+1}`;
            var itemTotalSelector = `#itemTotal${index+1}`;
            $(quantitySelector).html(quantityInt);
            $(itemTotalSelector).html(itemTotal);
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
    }
    
    //update item
});