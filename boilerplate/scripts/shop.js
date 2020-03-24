cdn.require(['jquery']).then( () => {

	let $form = $(this).find('form.cart');
	let $action = $(this).find('.js-form-action');
	let $itemCount = $(this).find('.js-form-item-count');
	let $itemRemove = $(this).find('.js-form-item-remove');
	let $submit = $(this).find('.js-form-submit');
	let $update = $(this).find('.js-form-update');

	const run = function(action) {
		$action.val(action);
		$form.submit();
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
})
