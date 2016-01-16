



(function($) {

	$.fn.uploadPreview = function(options) {
		
		return this.each(function() {
			$(this).attr('accept', 'image/*');

			var target = options.previewTarget;

			$(this).change(function() {
				if (! this.files || ! this.files[0]) {
        	return false;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
          $(target).attr('src', e.target.result);
        };

        reader.readAsDataURL(this.files[0]);
			});

		});

	};

}(jQuery));