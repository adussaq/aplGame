(function () {
	"use strict";

	console.log('v0.0.0');

	let $main = $('#main');

	let buildCase = function () {
		console.log('buildCase');
	}

	// Create button function
	$('#startCards').click(function (evt) {
		evt.preventDefault();
		buildCase(0);
	});

	return;
}())