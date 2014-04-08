var shippingMethodList = [
	{
		name: 'Slow Goat (10 business days)',
		price: 5
	},
	{
		name: 'Economy Goat (5 business days)',
		price: 10
	},
	{
		name: 'Super Goat (1 business day)',
		price: 100
	}
];

var Item = function(){
	var t = this;
	t.name = 'Billy';
	t.shippingMethod = ko.observable(shippingMethodList[0]);
	t.methodPrice = ko.computed(function(){
		var price = t.shippingMethod().price;
		return price ? "$" + price.toFixed(2) : 'Free';
	});
};

var GoatShippersViewModel = function(){
	var t = this;
	t.itemList = ko.observableArray([]);
	t.addItem = function(){
		t.itemList.push(new Item());
	};
	t.removeItem = function(){
		var item = this;
		t.itemList.remove(item);
	};
	t.shippingTotal = ko.computed(function(){
		var total = 0;
		t.itemList().forEach(function(item){
			total += item.shippingMethod().price;
		});
		return total.toFixed(2);
	});
};

var myGoatShippersViewModel = new GoatShippersViewModel();

ko.applyBindings(myGoatShippersViewModel);