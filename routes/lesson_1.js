var ItemCategoryManagementApp = function(app){
	var t = this;

	//Just quickly and dirtily mocking up an application persistence mechanism
	t.categoryList = ['Earth', 'Mars', 'Venus'];
	t.itemList = ['Billy', 'BillyJoe', 'BillyBob'];

	t.configureListCrud(app, 'category');
	t.configureListCrud(app, 'item');

};

ItemCategoryManagementApp.prototype = {
	sendList: function(res, list){
		res.type('json');
		res.send(JSON.stringify(list));
	},
	addItemToList: function(res, list, item){
		var t = this;
		if(item && list.indexOf(item) === -1){
			list.push(item);
		}
		t.sendList(res, list);
	},
	removeItemFromList: function(res, list, item){
		var t = this;
		if(item && list.indexOf(item) !== -1){
			list.remove(item);
		}
		t.sendList(res, list);
	},
	renameItemInList: function(res, list, oldName, newName){
		var t = this,
			index;
		if(oldName && newName){
			index = list.indexOf(oldName);
			if(index !== -1){
				list[index] = newName;
			}
		}
		t.sendList(res, list);
	},
	capFirstChar: function (string){
		//This function was brought to you by the number: StackOverflow
		//http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	configureListCrud: function(app, listName){
		var t = this,
			camelName = t.capFirstChar(listName);
		app.get('/lesson/1/get' + camelName + 'List', function(req, res){
			t.sendList(res, t[listName + 'List']);
		});
		app.get('/lesson/1/add' + camelName, function(req, res){
			var itemName = req.query[listName + 'Name'],
				list = t[listName + 'List'];
			console.log(req.path, req.query);
			t.addItemToList(res, list, itemName);
		});
		app.get('/lesson/1/remove' + camelName, function(req, res){
			var itemName = req.query[listName + 'Name'],
				list = t[listName + 'List'];
			console.log(req.path, req.query);
			t.removeItemFromList(res, list, itemName);
		});
		app.get('/lesson/1/rename' + camelName, function(req, res){
			var oldName = req.query['old' + camelName + 'Name'],
				newName = req.query['new' + camelName + 'Name'],
				list = t[listName + 'List'];
			console.log(req.path, req.query);
			t.renameItemInList(res, list, oldName, newName);
		});
	}
};

exports.init = function(app){
	return new ItemCategoryManagementApp(app);
};