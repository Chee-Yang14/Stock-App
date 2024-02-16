document.addEventListener('DOMContentLoaded', function(){
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
})

window.onload = function () {
const menu_btn = document.querySelector('.menu');
	const mobile_menu = document.querySelector('.mobile-nav');

	menu_btn.addEventListener('click', function () {
		menu_btn.classList.toggle('is-active');
		mobile_menu.classList.toggle('is-active');
	});
}



// $(document).ready(function(){
//     $('.modal').modal();
//   });