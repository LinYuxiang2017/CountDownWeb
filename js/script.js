$(function() {
	$('#time').css('height', window.innerHeight * 0.5);
	$('#buttons').css('height', window.innerHeight * 0.5 - parseInt($("#buttons").css('margin-top')));

	var input = $('.text-input');
	var input1 = input.eq(0);
	var input2 = input.eq(1);
	var buttons = $('#buttons .button');
	var start = buttons.eq(0);
	var pause = buttons.eq(1);
	var reset = buttons.eq(2);

	function processBothInput() {
		if(input2.val() < 0) {
			input2.val("0")
		}

		if(input2.val() > 0 || input1.val() > 0) {
			reset.addClass('button-on-focus');
		} else {
			reset.removeClass('button-on-focus');
		}
	}

	input2.on('keyup', function() {
		if(input2.val() >= 60) {
			input2.val("59");
		}
		processBothInput();
	})

	input1.on('keyup', function() {
		processBothInput();
	})

	var timer = null;
	start.bind('click', function() {
		clearInterval(timer);
		input1.attr('disabled', 'true');
		input2.attr('disabled', 'true');
		if(input1.val() === "") input1.val(0);
		if(input2.val() === "") input2.val(0);
		start.removeClass('button-on-focus');
		pause.addClass('button-on-focus');
		reset.addClass('button-on-focus');

		timer = setInterval(function() {
			if(input1.val() == 0 && input2.val() == 0) {
				alert("Stop");
				reset.trigger('click');
			} else {
				if(input2.val() <= 0) {
					input2.val(60);
					input1.val(input1.val() - 1);
				}
				input2.val(input2.val() - 1);
			}
		}, 1000)
	})

	pause.bind('click', function() {
		clearInterval(timer);
		pause.removeClass('button-on-focus');
		start.addClass('button-on-focus');
	})

	reset.bind('click', function() {
		start.addClass('button-on-focus');
		pause.removeClass('button-on-focus');
		reset.removeClass('button-on-focus');
		input1.removeAttr('disabled').attr('placeholder', '00').val('');
		input2.removeAttr('disabled').attr('placeholder', '00').val('');
		clearInterval(timer);
	})

})