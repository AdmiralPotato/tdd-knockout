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
		name: 'Bulk Goats (2 business days, 2+ goats only)',
		price: 2,
		bulkRequirement: 2
	},
	{
		name: 'Ultra Bulk Goats (2 business days, 4+ goats only)',
		price: 0,
		bulkRequirement: 4
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
	t.itemList = ko.observableArray([new Item()]);
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
	t.bulkRequirementsMet = ko.computed(function(){
		var requirementMap = {},
			requirementName,
			requirementValue,
			result = true;
		t.itemList().forEach(function(item){
			var method = item.shippingMethod();
			if(method.bulkRequirement){
				if(!requirementMap.hasOwnProperty(method.name)){
					requirementMap[method.name] = method.bulkRequirement;
				}
				requirementMap[method.name] -= 1;
			}
		});
		for(requirementName in requirementMap){
			if(requirementMap.hasOwnProperty(requirementName)){
				requirementValue = requirementMap[requirementName];
				if(requirementValue > 0){
					result = false;
				}
			}
		}
		return result;
	});
};

var myGoatShippersViewModel = new GoatShippersViewModel();

ko.applyBindings(myGoatShippersViewModel);