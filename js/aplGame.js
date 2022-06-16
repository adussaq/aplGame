(function () {
	"use strict";

	console.log('v0.0.0');

	let $main = $('#main');

	let randomNumber = function (max) {
		//returns a number between 0 and max - 1
		return Math.floor(Math.random() * (max));
	}

	let generateUniqueRandomNumbers = function (n, max) {
		let ret = {};
		let retArr = [];
		if (n > max) {
			n = max;
		}
		while (retArr.length < n) {
			let num =randomNumber(max);
			if (!ret.hasOwnProperty(num)) {
				ret[num] = 1;
				retArr.push(num);
			}
		}
		return retArr;
	}

	let buildCase = function () {
		console.log('buildCase');
		$main.empty();
		$main.addClass('roundedWhite');
		let $card = $('<div>', {class:"card"}).appendTo($main);
		let title = $('<h1>', {text: "Is that an APL?"}).appendTo($card);
		$('<div>', {text: "(Scroll down to answer as needed.)"}).appendTo($card)
		let $images = $('<div>',{class: "row rowfill"}).appendTo($card);
		let $footer = $('<footer>',{class: "mt-auto"}).appendTo($card);
		let $btnGroup = $('<footer>',{class: "btn-group d-flex btnfill", role: "group"}).appendTo($footer)

		let imageArr = grabImages("cellavision", "APL", 0);

		imageArr.forEach(function (image) {
			$('<div>', {class: "col-6 col-sm-3 colfill"})
				.append($('<img>', {src: image[0], class: "imgFill " + image[1]}))
				.appendTo($images);
		});


		$('<button>', {type: "button", class: "btn btn-success w-100", text: "Its an APL"}).appendTo($btnGroup);
		$('<button>', {type: "button", class: "btn btn-warning w-100", text: "Lets FISH to find out"}).appendTo($btnGroup);
		$('<button>', {type: "button", class: "btn btn-danger w-100", text: "That is not an APL"}).appendTo($btnGroup);
	}

	let grabImages = function (imgType, caseType, index) {
		let caseObject = DATA[imgType][caseType][index];
		let imgArr = generateUniqueRandomNumbers(12, caseObject.imageCount)
			.map(num => [
				"./imgs/" + imgType + "/" + caseType + "/case" + index + "/img" + num + ".jpg",
				"imgFlip" + randomNumber(4) + randomNumber(4)
			]);
		return imgArr;
	}

	// Create button function
	$('#startCards').click(function (evt) {
		evt.preventDefault();
		buildCase(0);
	});

	return;
}())