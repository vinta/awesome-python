/* Copyright (c) 2010
 * @author Laurence Wheway
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * @version 1.2.0
 */
(function($) {
	jQuery.extend({
		isOnScreen: function(box, container) {
			//ensure numbers come in as intgers (not strings) and remove 'px' is it's there
			for(var i in box){box[i] = parseFloat(box[i])};
			for(var i in container){container[i] = parseFloat(container[i])};

			if(!container){
				container = {
					left: $(window).scrollLeft(),
					top: $(window).scrollTop(),
					width: $(window).width(),
					height: $(window).height()
				}
			}

			if(	box.left+box.width-container.left > 0 &&
				box.left < container.width+container.left &&
				box.top+box.height-container.top > 0 &&
				box.top < container.height+container.top
			) return true;
			return false;
		}
	})


	jQuery.fn.isOnScreen = function (container) {
		for(var i in container){container[i] = parseFloat(container[i])};

		if(!container){
			container = {
				left: $(window).scrollLeft(),
				top: $(window).scrollTop(),
				width: $(window).width(),
				height: $(window).height()
			}
		}

		if(	$(this).offset().left+$(this).width()-container.left > 0 &&
			$(this).offset().left < container.width+container.left &&
			$(this).offset().top+$(this).height()-container.top > 0 &&
			$(this).offset().top < container.height+container.top
		) return true;
		return false;
	}
})(jQuery);
