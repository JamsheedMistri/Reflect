function contains(needle, haystack) {
	if (haystack.indexOf(needle) !== -1) {
		return true;
	} else {
		return false;
	}
}

function chooseRandomExpression(array) {
	var index = Math.floor(Math.random() * array.length);
	return array[index];
}

function getTimeOfDay() {
	var date = new Date();
	if (date.getHours() >= 5 && date.getHours() <= 12) {
		return "morning";
	} else if (date.getHours() >= 13 && date.getHours() <= 18) {
		return "afternoon";
	} else if ((date.getHours() >= 19 && date.getHours() <= 23) || (date.getHours() >= 0 && date.getHours() <= 4)) {
		return "evening";
	}
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};