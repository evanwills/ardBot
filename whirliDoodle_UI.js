if (typeof window.console !== 'object') {
	var Console = function () {
		"use strict";
		this.log = function () { };
		this.warn = function () { };
		this.error = function () { };
		this.info = function () { };
//		this.debug = function () { };
	};
	var console = new Console();
}

$('document').ready(function () {
//	'use strict';

	var config;


	function setRawValue() {
//		console.log($(this).val());
		var id = '',
			rawVal = 0;

		id = $(this).data('id');
		rawVal = ($(this).val() * 1);

		if ($(this).hasClass('course-input')) {
			rawVal +=  ($('#' + id + '_fine').val() * 1);
		} else {
			rawVal += ($('#' + id + '_course').val() * 1);
		}
		$('#' + id).val(rawVal);
		$('#' + id).data('lastval', rawVal);
	}

	function setRangeValues() {
		var id = $(this).attr('id'),
			val = $(this).val();
		console.log(val);
	}

	function insertFineControl() {
		var a = 0,
			findOutput = [
				new RegExp('\{\{ID\}\}', 'g'),			// 0
				new RegExp('\{\{NAME\}\}', 'g'),		// 1
				new RegExp('\{\{MIN\}\}', 'g'),			// 2
				new RegExp('\{\{MAX\}\}', 'g'),			// 3
				new RegExp('\{\{STEP\}\}', 'g'),		// 4
				new RegExp('\{\{MIN_SUB\}\}', 'g'),		// 5
				new RegExp('\{\{MAX_SUB\}\}', 'g'),		// 6
				new RegExp('\{\{STEP_SUB\}\}', 'g')	// 7
			],
			id = '',
			input = $(this).find('input'),
			max = $(input).attr('max'),
			max_sub = 0,
			min = $(input).attr('min'),
			min_sub = 0,
			replaceOutput = [],
			step = 0,
			step_sub = 0,
			tmp = 0,
			output = $('#fine-control').html();

		id = $(input).attr('id');

		if (min > max) {
			tmp = min;
			min = max;
			max = tmp;
		}

		if (min < 0 && max < 0) {
			step = min + max;
			step = -step;
		} else if (min >= 0 && max >= 0) {
			step = min + max;
		} else {
			step = -min + max;
		}
		if (step < 0) {
			step = -step;
		}
		step = step.replace(/[1-9](?=[1-9])/g, '0');
		step = (step / 1000);
		min_sub = -step;
		max_sub = step;
		step_sub = (step / 1000);

		$(input).addClass('raw-input');

		replaceOutput = [
			id,			// 0
			$(this).find('label').html().replace(':', ''),	// 1
			min,							// 2
			max,							// 3
			step,							// 4
			min_sub,						// 5
			max_sub,						// 6
			step_sub						// 7
		];

		for (a = 0; a < 8; a += 1) {
			output = output.replace(findOutput[a], replaceOutput[a]);
		}
		$(this).append(output);

		$('#' + id + '_fine, #' + id + '_course').on('change', setRawValue);
		$('#' + id).on('change', setRangeValues);
	}

	$('.fine-control').each(insertFineControl);

	config = {
		'v': {
			'boom-1-relative-length_wrap': {'sym': false, 'asym': false},
			'boom-2-length_wrap': {'sym': false, 'asym': true},
			'boom-3-length_wrap': {'sym': false, 'asym': false},
			'boom-4-length_wrap': {'sym': false, 'asym': false},
			'pivot-offset_boom-1_wrap':  {'sym': false, 'asym': false},
			'pivot-offset_boom-1_extra':  {'sym': false, 'asym': false},
			'pivot-offset_boom-2_wrap':  {'sym': false, 'asym': false},
			'sym': null
		},
		'y': {
			'boom-1-relative-length_wrap': {'sym': false, 'asym': false},
			'boom-2-length_wrap': {'sym': true, 'asym': true},
			'boom-3-length_wrap': {'sym': false, 'asym': false},
			'boom-4-length_wrap': {'sym': false, 'asym': false},
			'pivot-offset_boom-1_wrap':  {'sym': true, 'asym': true},
			'pivot-offset_boom-1_extra':  {'sym': false, 'asym': false},
			'pivot-offset_boom-2_wrap':  {'sym': false, 'asym': false},
			'sym': false
		},
		't': {
			'boom-1-relative-length_wrap': {'sym': true, 'asym': true},
			'boom-2-length_wrap': {'sym': false, 'asym': false},
			'boom-3-length_wrap': {'sym': false, 'asym': false},
			'boom-4-length_wrap': {'sym': false, 'asym': false},
			'pivot-offset_boom-1_wrap':  {'sym': true, 'asym': true},
			'pivot-offset_boom-1_extra':  {'sym': false, 'asym': false},
			'pivot-offset_boom-2_wrap':  {'sym': false, 'asym': false},
			'sym': true
		},
		'x': {
			'boom-1-relative-length_wrap': {'sym': false, 'asym': false},
			'boom-2-length_wrap': {'sym': false, 'asym': true},
			'boom-3-length_wrap': {'sym': true, 'asym': true},
			'boom-4-length_wrap': {'sym': false, 'asym': true},
			'pivot-offset_boom-1_wrap':  {'sym': true, 'asym': true},
			'pivot-offset_boom-1_extra':  {'sym': false, 'asym': true},
			'pivot-offset_boom-2_wrap':  {'sym': false, 'asym': true},
			'sym': null
		}
	};

	function boomShowHideFields() {
		var configState = 'v',
			symetrical = 'y',
			state = {},
			hideB2 = true,
			hidePO1 = true,
			hidePO2 = true;

		$('.boom-config').each(function () {
			if ($(this).is(':checked')) {
				configState = $(this).val();
			}
		});
		$('.is-symetrical').each(function () {
			if ($(this).is(':checked')) {
				symetrical = $(this).val();
			}
		});

		if (configState === 't') {
			state = config.t;
		} else if (configState === 'v') {
			state = config.v;
		} else if (configState === 'x') {
			state = config.x;
		} else if (configState === 'y') {
			state = config.y;
		}

		if (state.sym === true) {
			$('#is-symetrical_Y')[0].checked = true;
			symetrical = 'y';
		} else if (state.sym === false) {
			$('#is-symetrical_N')[0].checked = true;
			symetrical = 'n';
		}

		$.each(state, function(key, value) {
//			console.log('key = ', key);
//			console.log('value = ', value);
//			console.log('symetrical = ', symetrical);
			if (key !== 'sym') {
				if (symetrical === 'y' ) {
					if (value['sym'] === true) {
//						console.log('show ' + key);
						$('#' + key).removeClass('hide');
					} else {
//						console.log('hide ' + key);
						$('#' + key).addClass('hide');
					}
				} else {
					if (value['asym'] === true) {
//						console.log('show ' + key);
						$('#' + key).removeClass('hide');
					} else {
//						console.log('hide ' + key);
						$('#' + key).addClass('hide');
					}
				}
			}
		});

		console.log('config = ', config);
		console.log('configState = ', configState);
		console.log('symetrical = ', symetrical);
		console.log('state = ', state);

	}

	$('.boom-config, .is-symetrical').on('change', boomShowHideFields);
	$('#boom-config_V').trigger('change');
});