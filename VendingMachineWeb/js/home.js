$(document).ready(function (){

	loadItems();

	

});

function loadItems(){

	clearVendingItems();

	var vendingItems = $('#vending-items');

	$.ajax({

		type: 'GET',
		url: 'http://tsg-vending.herokuapp.com/items',
		success: function(itemArray) {
			$.each(itemArray, function(index, item) {
				var itemId = item.id;
				var name = item.name;
				var price = item.price;
				var quantity = item.quantity;

				 var row = '<div class="col-lg-4 col-md-6 px-1 py-2">';
					row += '<div class="card btn-outline-dark" onclick="sendItemToForm(' + itemId + ')">';
					row += '<div class="card-body">';
					row += '<p><i class="fas fa-box fa-2x"></i></p>';
					row += '<h5 class="card-title my-2" id="item-name">' + itemId + ' - ' + name + '</h5>';
					row += '<p class="card-text" id="item-price">$ ' + price + '</p>';
					row += '<p class="card-text" id="item-quantity">Quantity Left: '+ quantity + '</p></div></div></div>'
 

				vendingItems.append(row);

			});
		},
		error: function() {
			$('#errorMessages')
				.append($('<li>')
					.attr({class: 'list-group-item list-group-item-danger'})
					.text('Error calling web service.'));

		}

	});

}

function sendItemToForm(itemId) {
	$('#total-change').empty();
	$('#total-change').append('<p> </p>');

	
	$('#item-select').val(itemId);
	$('#item-select').readOnly = true;
}

function clearVendingItems() {
	$('#vending-items').empty();
}

function addDollar() {

	$('#total-change').empty();
	$('#total-change').append('<p> </p>');
	var userMoney = parseFloat($('#total-money').val());

	if (isNaN(userMoney)){
		$('#total-money').val(1);
	} else {
	var total = parseFloat(userMoney) + 1.00;
	$('#total-money').val(total.toFixed(2));
}
}

function addQuarter() {

	$('#total-change').empty();
	$('#total-change').append('<p> </p>');
	var userMoney = parseFloat($('#total-money').val());

	if (isNaN(userMoney)){
		$('#total-money').val(0.25);
	} else {
	var total = parseFloat(userMoney) + 0.25;
	$('#total-money').val(total.toFixed(2));
}
}

function addDime() {

	$('#total-change').empty();
	$('#total-change').append('<p> </p>');
	var userMoney = parseFloat($('#total-money').val());

	if (isNaN(userMoney)){
		$('#total-money').val(0.1);
	} else {
	var total = parseFloat(userMoney) + 0.1;
	$('#total-money').val(total.toFixed(2));
}
}

function addNickel() {

	$('#total-change').empty();
	$('#total-change').append('<p> </p>');
	var userMoney = parseFloat($('#total-money').val());

	if (isNaN(userMoney)){
		$('#total-money').val(0.05);
	} else {
	var total = parseFloat(userMoney) + 0.05;
	$('#total-money').val(total.toFixed(2));
}
}


function makeAPurchase() {

	var itemId = $('#item-select').val();
	var amount = $('#total-money').val();


		$.ajax({

		type: 'GET',
		url: 'http://tsg-vending.herokuapp.com/money/' + amount + '/item/' + itemId,
		success: function(data, status, jqXHR) {
			console.log(data)
			console.log(status)
		$('#total-change').append('<p>' + data.quarters + " Quarters</p>" 
			+ '<p>' + data.dimes + " Dimes" +'</p><p>' + data.nickels + " Nickels" + '</p><p>' + data.pennies + " Pennies</p>")
		$('#total-money').val(0)
		$('#messages').val("Thank You!");
	},
	
		error: function(data, status) {
			console.log(data.responseJSON.message)
			$('#messages').val(data.responseJSON.message);


	}
});


loadItems();
		
	}

function makeChange() {

	$('#item-select').val('');
	$('#messages').val('');

	var money = parseFloat($('#total-money').val())

	if(isNaN(money) || money ==0){
		$('#total-change').empty();
		$('#total-change').append('<p> </p>');
		return;
	}

	var numQuarters = 0;
	var numDimes = 0;
	var numNickels = 0;
	var numPennies = 0;

	var quarter = 0.25;
	var dime = 0.10;
	var nickel = 0.05;
	var penny = 0.01;

	while (money >= quarter) {
		money = money - quarter;
		numQuarters++;
	}
	while (money >= dime) {
		money = money - dime;
		numDimes++;
	}
	while (money >= nickel) {
		money = money - nickel;
		numNickels++;
	}
	while (money >= penny) {
		money = money - penny;
		numPennies++;
	}
	$('#total-change').empty();
	$('#total-change').append('<p>' + numQuarters + " Quarters</p>" 
			+ '<p>' + numDimes + " Dimes" +'</p><p>' + numNickels + " Nickels" + '</p><p>' + numPennies + " Pennies</p>")
	$('#total-money').val('');
}



