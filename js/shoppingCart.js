// JavaScript File
$(document).ready(function(){
    
    //global variables
    var rowNumber = 1;
    var item1Cost = 3.99;
    var item2Cost = 4.99;
    var item3Cost = 4.99;
    
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
        
        var itemCost = 0;
        var itemTotal = 0;
        //hardcoded values for now
        if(productNumber == 1){
            itemCost = item1Cost;
            itemTotal = item1Cost * quantity;
        }else if(productNumber == 2) {
            itemCost = item2Cost;
            itemTotal = item2Cost * quantity;
        }else if(productNumber == 3) {
            itemCost = item3Cost;
            itemTotal = item3Cost * quantity;
        }
        
        var htmlToAppend = `<tr id="row${rowNumber}">`;
        htmlToAppend += `<td>${productName}</td>`;
        htmlToAppend += `<td>${quantity}</td>`;
        htmlToAppend += `<td>${itemCost}</td>`;
        htmlToAppend += `<td>${itemTotal}</td>`;
        htmlToAppend += `<td><button type="button" class="btn btn-primary" id="delete${rowNumber}">Delete</button></td>`;
        htmlToAppend += `</tr>`;
        
        $('#shoppingCartTable tbody:last-child').append(htmlToAppend);
        var deleteId = `#row${rowNumber}`;
        $("#shoppingCartTable").on('click', deleteId, function() {
            removeItem(deleteId);
        })
    }
    
    //remove item
    
    function removeItem(id) {
        $(id).remove();
    }
    
    //update item
});