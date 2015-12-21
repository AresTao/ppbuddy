$(function() {
	$(document).on('focusin', '.field, textarea', function() {
		if(this.title==this.value) {
			this.value = '';
		}
	}).on('focusout', '.field, textarea', function(){
		if(this.value=='') {
			this.value = this.title;
		}
	});

	$('#navigation ul li:last , .footer-nav ul li:last').addClass('last')
	$('.cols .col:last').addClass('last-col')

	$(".section-bottom .col ul li:even").addClass("bg");
});
