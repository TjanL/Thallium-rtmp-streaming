function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function changeColor() {
	if (dark == true) {
		$("body").css("background-color", "#212121");
		$("body").css("color", "#fff");
		$("#GrindPlayer").css("background-color", "#323232");

		$("nav").css("border-bottom", "1px solid #323232")
		$("#stream").css("border-bottom", "1px solid #323232")
		$("#viewers").css("border-top", "1px solid #323232")
	} else {
		$("body").css("background-color", "#fff");
		$("body").css("color", "#222");
		$("#GrindPlayer").css("background-color", "#eee");

		$("nav").css("border-bottom", "1px solid #eee")
		$("#stream").css("border-bottom", "1px solid #eee")
		$("#viewers").css("border-top", "1px solid #eee")
	}
	document.cookie = "dark=" + dark + ";path=/";
	dark = !dark;
}

var dark = (getCookie("dark") == "true");
if (dark == "") {
	dark = false;
}

$(document).ready(function() {changeColor();});
$("#dark").click(function() {changeColor();});