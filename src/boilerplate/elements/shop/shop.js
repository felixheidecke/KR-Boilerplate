define(['jquery'], function($) {
	jQuery.fn.krShop = function() {
		var $action, $form, $itemCount, $itemRemove, $submit, $update, callback, run;
		$form = $(this).find('form.cart');
		$action = $(this).find('.js-form-action');
		$itemCount = $(this).find('.js-form-item-count');
		$itemRemove = $(this).find('.js-form-item-remove');
		$submit = $(this).find('.js-form-submit');
		$update = $(this).find('.js-form-update');
		callback = function() {
			console.log('itemCount: ' + $itemCount.val());
			console.log('action: ' + $action.val());
		};
		run = function(action) {
			$action.val(action);
			$form.submit();
			return callback();
		};
		$update.on('click', function(e) {
			e.preventDefault();
			return run('update');
		});
		$itemCount.on('change', function(e) {
			e.preventDefault();
			return run('update');
		});
		$submit.on('click', function(e) {
			e.preventDefault();
			return run('payment');
		});
		return $itemRemove.on('click', function(e) {
			return e.preventDefault();
		});
	};

});