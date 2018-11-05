
function hidenav(){
	document.querySelectorAll(".mobileNavMenu")[0].style.display = 'none';
}
function unhidenav() {
	if (document.querySelectorAll(".mobileNavMenu")[0].style.display === 'none') {
		document.querySelectorAll(".mobileNavMenu")[0].style.display = 'block';
		/*console.log("now showing")*/
	}
	else {
		document.querySelectorAll(".mobileNavMenu")[0].style.display = 'none';
		/*console.log("now hiding")*/
	}
}
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(".menuButton")[0].addEventListener("click", unhidenav );
	document.querySelectorAll(".mobileNavItem")[0].addEventListener("click", hidenav );
	document.querySelectorAll(".mobileNavMenu")[0].style.display = 'none';
});
