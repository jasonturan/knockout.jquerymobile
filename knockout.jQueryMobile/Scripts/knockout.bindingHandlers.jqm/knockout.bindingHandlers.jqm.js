ko.bindingHandlers.jqmMobile = {
    removeClass: function (element, regularExpression) {
        var btnClasses = _.filter(($(element).attr("class") || "").split(' '), function (className) {
            return new RegExp(regularExpression).test(className);
        });
        _.forEach(btnClasses, function (btnClass) { $(element).removeClass(btnClass) });
    }
}

ko.bindingHandlers.jqmButton = {
	 init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {	     	    
	     var options = valueAccessor(); 
	     if (options.value) { 
	         ko.bindingHandlers.value.init(element,  options.value, allBindings, viewModel, bindingContext);
	         if (ko.isObservable(options.value)) {
	             options.value.subscribe(function () {
	                 ko.bindingHandlers.jqmButton.update(element, valueAccessor, allBindings, viewModel, bindingContext);
	             });
	         }
	     }
	     if (options.disable) { 
	         if (ko.isObservable(options.disable)) {
	             options.disable.subscribe(function () {
	                 ko.bindingHandlers.disable.update(element, options.disable, allBindings, viewModel, bindingContext);
	                 ko.bindingHandlers.jqmButton.update(element, valueAccessor, allBindings, viewModel, bindingContext);
	             });
	         }
	     }

	     var dataAttributes = allBindings().jqmDataAttributes || {};
	     for (var propertyName in dataAttributes) {
	         var property =dataAttributes[propertyName]; 
	         if (ko.isObservable(property)) {
	             property.subscribe(function (newValue) {  
	                 ko.bindingHandlers.jqmButton.update(element, valueAccessor, allBindings, viewModel, bindingContext);
	             });
	         }
	     }
	     var buttonOptions = ko.mapping.toJS(dataAttributes);
	     $(element).button(buttonOptions);
	     if (options.click) {  
	         ko.bindingHandlers.click.init(element.parentElement, function () { return options.click; }, allBindings, viewModel, bindingContext);
	     }
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {          
         
        var dataAttributes = allBindings().jqmDataAttributes || {};
        var buttonOptions = ko.mapping.toJS(dataAttributes);
        ko.bindingHandlers.jqmMobile.removeClass(element.parentElement, "^ui-btn-\\w+$");
        ko.bindingHandlers.jqmMobile.removeClass(element.parentElement, "^ui-btn-icon-\\w+$");
        $(element).button(buttonOptions);
        $(element).button('refresh')
    }
};