/* uses knockout.js */

/** Issue:

Make sure to get this to in the build folder 
 **/

var ViewModel = function() {
	this.title = ko.observable('Neighborhood Map');
}

ko.applyBindings(new ViewModel());