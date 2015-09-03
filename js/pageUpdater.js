var TimeExpression = /(\d+)(?:[.: ](\d\d))*\s*([aApP][.: ]?[mM][.: ]?)[ \[(]?([a-zA-Z]{3})[)\]]?/g;

function DateContainer() {
	this.Hours = 0;
	this.Minutes = 0;
	this.Seconds = 0;
	this.Milliseconds = 0;

	this.TimeZone = "";
};

var Times = [];

function Convert(str, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10) {
	console.group("A");
	console.log(str);
	console.log(p1);
	console.log(p2);
	console.log(p3);
	console.log(p4);
	console.log(p5);
	console.log(p6);
	console.log(p7);
	console.log(p8);
	console.log(p9);
	console.log(p10);
	console.groupEnd();

	var value = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

	var constructedNumber = new DateContainer();

	var isNumber = true;
	var currentIndex = 0;

	do {
		if (typeof value[currentIndex] == "undefined") {
			value[currentIndex] = 0;
		}

		isNumber = !isNaN(parseInt(value[currentIndex]));

		// Support only up to 4 numbers (hours, minutes, seconds, milliseconds)
		if (isNumber && currentIndex <= 4) {
			switch (currentIndex) {
				case 0:
					constructedNumber.Hours			= parseInt(value[currentIndex]);
					break;
				case 1:
					constructedNumber.Minutes		= parseInt(value[currentIndex]);
					break;
				case 2:
					constructedNumber.Seconds		= parseInt(value[currentIndex]);
					break;
				case 3:
					constructedNumber.Milliseconds	= parseInt(value[currentIndex]);
					break;
			}
		} else {
			isNumber = false;
		}

		currentIndex++;
	} while (isNumber);
	
	constructedNumber.TimeZone = value[currentIndex];

	Times.push(constructedNumber);

	return "Stunde: " + constructedNumber.Hours;
}

function ParsePage() {
	document.documentElement.innerHTML = document.documentElement.innerHTML.replace(TimeExpression, Convert);
}

function UpdatePage() {
	ParsePage();
}

window.onload = function () {
	UpdatePage();
}