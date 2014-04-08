var ItemCategoryManagementAppViewModel = function(){
	var t = this;
	t.categoryList = ko.observableArray([]);
	t.itemList = ko.observableArray([]);

	t.makeListFunc('category'); //adds t.getCategoryList
	t.makeListFunc('item'); //adds t.getCategoryList


	t.activeCategory = ko.observable();
	t.activateCategory = function(categoryName){
		t.activeCategory(categoryName);
	};


	//init app data
	t.getCategoryList(function(){
		t.activateCategory(t.categoryList()[0]);
	});
	t.getItemList();

};

ItemCategoryManagementAppViewModel.prototype = {
	capFirstChar: function (string){
		//This function was brought to you by the number: StackOverflow
		//http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	makeListFunc: function(listName){
		var t = this,
			camelName = t.capFirstChar(listName),
			actionName = 'get' + camelName + 'List';
		t['get' + camelName + 'List'] = function(callback){
			$.get(
				'/lesson/1/' + actionName,
				function () {
					console.log(
						actionName + ':',
						arguments
					);
					//type: ko.observableArray
					t[listName + 'List'].apply(t, arguments);
					if(callback){
						callback();
					}
				}
			);
		};
	}
};

var myItemCategoryManagementAppViewModel = new ItemCategoryManagementAppViewModel();
ko.applyBindings(myItemCategoryManagementAppViewModel);