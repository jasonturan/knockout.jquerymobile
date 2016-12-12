ko.bindingHandlers.jqmMobile = {
    removeClass: function (element, regularExpression) {
        var btnClasses = _.filter(($(element).attr("class") || "").split(' '), function (className) {
            return new RegExp(regularExpression).test(className);
        });
        _.forEach(btnClasses, function (btnClass) { $(element).removeClass(btnClass) });
    }
}

ko.components.register('jqm-btn', {
    viewModel: function (params) {  
        this.options = params.options || {};
    },
    template: "<input type='button' data-bind='jqmButton: options' /> "   
});

ko.bindingHandlers.jqmButton = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var vm = bindingContext.$parent;
	    var options = valueAccessor();
	     if (options.value) { 
	         ko.bindingHandlers.value.init(element, function () { return options.value;}, allBindings, vm, bindingContext.$parentContext);
	         if (ko.isObservable(options.value)) {
	             options.value.subscribe(function () {
	                 ko.bindingHandlers.jqmButton.update(element, valueAccessor, allBindings, viewModel, bindingContext);
	             });
	         }
	     } 
	     if (options.disable) { 
	         if (ko.isObservable(options.disable)) {
	             options.disable.subscribe(function () {
	                 ko.bindingHandlers.disable.update(element, function () { return options.disable; }, allBindings, vm, bindingContext.$parentContext);
	                 ko.bindingHandlers.jqmButton.update(element, valueAccessor, allBindings, viewModel, bindingContext);
	             });
	         }
	     } 
	     var dataAttributes = options.jqmDataAttributes || {};
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
	         ko.bindingHandlers.click.init(element.parentElement, function () { return options.click; }, allBindings, vm, bindingContext.$parentContext);
	     }
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {          
        var options = valueAccessor();
        var dataAttributes = options.jqmDataAttributes || {};
        var buttonOptions = ko.mapping.toJS(dataAttributes);
        ko.bindingHandlers.jqmMobile.removeClass(element.parentElement, "^ui-btn-\\w+$");
        ko.bindingHandlers.jqmMobile.removeClass(element.parentElement, "^ui-btn-icon-\\w+$");
        $(element).button(buttonOptions);
        $(element).button('refresh')
    }
};