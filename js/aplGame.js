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

	let buildCase = function (dataObj) {
		console.log('buildCase');
		$main.empty();

		let $card = $('<div>', {class:"card"}).appendTo($main);
		let title = $('<h1>', {text: "Is that an APL?"}).appendTo($card);
		$('<div>', {text: "(Scroll down to answer as needed.)"}).appendTo($card)
		let $images = $('<div>',{class: "row rowfill img-magnifier-container"}).appendTo($card);
		let $footer = $('<footer>',{class: "mt-auto"}).appendTo($card);
		let $btnGroup = $('<footer>',{class: "btn-group d-flex btnfill", role: "group"}).appendTo($footer)

		let imageArr = grabImages(dataObj);

		imageArr.forEach(function (image, index) {
			let $img = $('<img>', {id: "imageHolderMag" + index, src: image[0], class: "imgFill " + image[1]});
			$('<div>', {class: "col-6 col-sm-3 colfill"})
				.append($img)
				.appendTo($images);
			// makeMagnifier("imageHolderMag" + index, 3);
			// addToolTip($img[0]);
		});


		$('<button>', {type: "button", class: "btn btn-success w-100", text: "Its an APL"})
			.click(answerResponse(dataObj, "APL")).appendTo($btnGroup);
		$('<button>', {type: "button", class: "btn btn-warning w-100", text: "Lets FISH to find out"})
			.click(answerResponse(dataObj, "pAPL")).appendTo($btnGroup);
		$('<button>', {type: "button", class: "btn btn-danger w-100", text: "That is not an APL"})
			.click(answerResponse(dataObj, "nAPL")).appendTo($btnGroup);
	}

	let answerResponse = function (dataObj, response) {
		return function (evt) {
			evt.preventDefault();
			if (dataObj.caseType === response) {
				console.log("Nailed it!! The diagnosis was " + dataObj.diagnosis + "!");
			}
			if (response === "APL") {
				if (dataObj.caseType === "pAPL") {
					// called APL for possible APL
					console.log("So close, this was an APL mimic, the diagnosis was " + dataObj.diagnosis);
				} else {
					// called APL for not APL
					console.log("Might want to hedge your bets, this was " + dataObj.diagnosis + "!");
				}

			} else if (response === "pAPL") {
				// repsonse is possible APL, FISH
				if (dataObj.caseType === "APL") {
					console.log("Glad you decided to go FISHing, this was " +  dataObj.diagnosis + "!");
				} else {
					// other option is not APL
					console.log("Better safe than sorry, this was " + dataObj.diagnosis + "!");
				}
			} else {
				// response is nAPL, ie not APL
			}
			console.log("you clicked me");
		};
	};

	let addToolTip = function (element) {
		let $newElem = $(element.outerHTML).removeClass("imgFill").addClass("tooltipImg");

		const tooltip = new bootstrap.Tooltip(element, {
			title: $newElem[0].outerHTML,
			html: true,
			boundary: $main[0]
		})
	}

	let makeMagnifier = function (imgID, zoom) {
		//possible edit: https://www.therogerlab.com/sandbox/pages/how-to-magnify-an-html-element-in-javascript?s=0ea4985d74a189e8b7b547976e7192ae.bed70530af6f69d50b5f5d5c4d9c4de7

		var img, glass, w, h, bw;
		img = document.getElementById(imgID);
		/*create magnifier glass:*/
		glass = document.createElement("DIV");
		glass.setAttribute("class", "img-magnifier-glass");
		/*insert magnifier glass:*/
		img.parentElement.insertBefore(glass, img);
		/*set background properties for the magnifier glass:*/
		glass.style.backgroundImage = "url('" + img.src + "')";
		glass.style.backgroundRepeat = "no-repeat";
		glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
		bw = 3;
		w = glass.offsetWidth / 2;
		h = glass.offsetHeight / 2;
		/*execute a function when someone moves the magnifier glass over the image:*/
		glass.addEventListener("mousemove", moveMagnifier);
		img.addEventListener("mousemove", moveMagnifier);
		/*and also for touch screens:*/
		glass.addEventListener("touchmove", moveMagnifier);
		img.addEventListener("touchmove", moveMagnifier);
		function moveMagnifier(e) {
			var pos, x, y;
			/*prevent any other actions that may occur when moving over the image*/
			e.preventDefault();
			/*get the cursor's x and y positions:*/
			pos = getCursorPos(e);
			x = pos.x;
			y = pos.y;
			/*prevent the magnifier glass from being positioned outside the image:*/
			if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
			if (x < w / zoom) {x = w / zoom;}
			if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
			if (y < h / zoom) {y = h / zoom;}
			/*set the position of the magnifier glass:*/
			glass.style.left = (x - w) + "px";
			glass.style.top = (y - h) + "px";
			/*display what the magnifier glass "sees":*/
			glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
		}
		function getCursorPos(e) {
			var a, x = 0, y = 0;
			e = e || window.event;
			/*get the x and y positions of the image:*/
			a = img.getBoundingClientRect();
			/*calculate the cursor's x and y coordinates, relative to the image:*/
			x = e.pageX - a.left;
			y = e.pageY - a.top;
			/*consider any page scrolling:*/
			x = x - window.pageXOffset;
			y = y - window.pageYOffset;
			return {x : x, y : y};
		}
	};

	let grabImages = function (dataObj) {
		let imgArr = generateUniqueRandomNumbers(12, dataObj.imageCount)
			.map(num => [
				"./imgs/" + dataObj.imageType + "/" + dataObj.caseType + "/" + dataObj.case + "/img" + num + ".jpg",
				"imgFlip" + randomNumber(4) + randomNumber(4)
			]);
		return imgArr;
	}

	// Create button function
	$('#startCards').click(function (evt) {
		evt.preventDefault();
		buildCase(DATA[0]);
	});

	return;
}())