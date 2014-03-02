
require.config({
    baseUrl: 'js',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        //jQuery: 'libs/jquery/jquery',
        //bootstrap: 'libs/bootstrap/dist/js/bootstrap.min',
        async: 'libs/requirejs-plugins/src/async',
        goog: 'libs/requirejs-plugins/src/goog',
        angular : 'libs/angular/angular',
        moment : 'libs/momentjs/moment',
        ngAnimate : 'libs/angular-animate/angular-animate'//,
        //project : 'project'
    },
  shim: {
    //'jQuery': {'exports' : 'jQuery'},
    'angular' : {'exports' : 'angular'},    
    //'bootstrap': { deps:['jQuery']}
  }
});

require(['project'], function (app) {
  app.init();
});


function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { left: xPosition, top: yPosition };
}


function lazyLoadImage() {
	var doc = document.documentElement;
	var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	var windowHeight = document.documentElement.clientHeight || window.innerHeight;

	var windowBottom = windowTop + windowHeight;

	var divImg = document.querySelectorAll("[data-img]");
	var nodes = Array.prototype.slice.call(divImg, 0);

	// nodes is an array now.
	nodes.forEach(function(el) {
		if (windowBottom > getPosition(el).top && !el.classList.contains('imgLoading') && !el.classList.contains('imgLoaded')) {
			var elTmp = el;

			var imgTmp = document.createElement("img");
			imgTmp.src = elTmp.getAttribute("data-img");
			elTmp.classList.add("imgLoading");

			imgTmp.addEventListener('load', function() {
				elTmp.style.backgroundImage = "url('" + elTmp.getAttribute("data-img") + "')";
				elTmp.classList.add("imgLoaded");
			}, false);
		}

	});
}

