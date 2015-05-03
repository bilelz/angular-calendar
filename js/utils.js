function getPosition(element) {
	var xPosition = 0;
	var yPosition = 0;

	while (element) {
		xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}
	return {
		left : xPosition,
		top : yPosition
	};
}

function lazyLoadImage() {
	
	if(document.querySelectorAll("[data-img].imgNotLoading").length > 0){
		var doc = document.documentElement;
		var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
		var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		var windowHeight = document.documentElement.clientHeight || window.innerHeight;
	
		var windowBottom = windowTop + windowHeight;
	
		var divImg = document.querySelectorAll("[data-img].imgNotLoading");
		var nodes = Array.prototype.slice.call(divImg, 0);
	
		nodes.forEach(function(el) {
			var elTmp = el;
			if (windowBottom > getPosition(el).top) {
	
				var imgTmp = document.createElement("img");
	
				imgTmp.addEventListener('load', function() {
					elTmp.style.backgroundImage = "url('" + elTmp.getAttribute("data-img") + "')";
					elTmp.classList.add("imgLoaded");
					removeClass(elTmp,"imgLoading");
				}, false);
	
				imgTmp.src = elTmp.getAttribute("data-img");
				elTmp.classList.add("imgLoading");
				removeClass(elTmp,"imgNotLoading");
			}
	
		});
	}
}


function detailPageTitleEffect() {
	
	var el = document.getElementById("bigPicture");
	
	if(el != undefined){
		var doc = document.documentElement;
		var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
		var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		var windowHeight = document.documentElement.clientHeight || window.innerHeight;
	
		var windowBottom = windowTop + windowHeight;
	
		
		var imgBottom = getPosition(el).top + windowHeight;
	
		if (windowHeight > windowTop) {
			el.style.backgroundPosition = "center " + (0.5 * (imgBottom - windowBottom)) + "px";
	
			/*var percent = (windowHeight - windowTop) / windowHeight;
			
			document.getElementById("bigTitleContent").style.webkitTransform = "scale(" + percent + ")";
			document.getElementById("bigTitleContent").style.MozTransform = "scale(" + percent + ")";
			document.getElementById("bigTitleContent").style.transform = "scale(" + percent + ")";
			document.getElementById("bigTitleContent").style.opacity = percent;*/
		}
	}
}

function resizeBgAnimation(){
	/* reload bgAnimation after resize window  with the good width */
	if(document.querySelector("#bigTitleContent h1") != undefined){
		document.querySelector("#bigTitleContent h1").style.webkitAnimationPlayState = "paused";
		document.querySelector("#bigTitleContent h1").style.animationPlayState = "paused";
		
		document.querySelector("#bigTitleContent h1").style.webkitAnimationName = "";
		document.querySelector("#bigTitleContent h1").style.animationName = "";
		var timestamp = (new Date()).getTime();
		
		document.querySelector("#css-inline").innerHTML = "@-webkit-keyframes animBgResize"+timestamp+" {"
														+ "from { background-position-x: 0;}"
														+ "to { background-position-x: "+window.innerWidth+"px }} \n"
														+ "@keyframes animBgResize"+timestamp+" {"
														+ "from { background-position-x: 0;}"
														+ "to { background-position-x: "+window.innerWidth+"px }}";
		
		document.querySelector("#bigTitleContent h1").style.webkitAnimationName = "animBgResize"+timestamp;
		document.querySelector("#bigTitleContent h1").style.animationName = "animBgResize"+timestamp;
		document.querySelector("#bigTitleContent h1").style.webkitAnimationPlayState = "running";
		document.querySelector("#bigTitleContent h1").style.animationPlayState = "running";
	}
}



var lastScrollTop = 0;

function animNavbar(){
	var doc = document.documentElement;
	var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	
	
	if(windowTop > 50){
		addClass(document.querySelector("body"), "navScrolled");
	}else{
		removeClass(document.querySelector("body"), "navScrolled");
	}

	if (windowTop > lastScrollTop) {
		console.log("downscroll code");
		removeClass(document.querySelector("body"), "upscroll");
		addClass(document.querySelector("body"), "downscroll");
	} else {
		console.log("upscroll code");
		removeClass(document.querySelector("body"), "downscroll");
		addClass(document.querySelector("body"), "upscroll");
	}
   
   lastScrollTop = windowTop;

}

function addClass(el, className) {
	if (el.classList)
		el.classList.add(className);
	else
		el.className += ' ' + className;
}

function addClassId(id, className) {
	addClass(document.getElementById(id), className);
}

function removeClass(el, className) {
	if (el.classList)
		el.classList.remove(className);
	else
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function removeClassId(id, className) {
	removeClass(document.getElementById(id), className);
}

function handleOrientation(event) {
	var absolute = event.absolute;
	var alpha = event.alpha;
	var beta = event.beta;
	var gamma = event.gamma * 3;

	/*document.querySelector("#bigPicture").style.backgroundPosition = -gamma+"px 0px";*/
	var imgList = document.querySelectorAll("a.listBlock div.imgLoaded");
	for (var i = 0; i < imgList.length; i++) {
		imgList[i].style.backgroundRepeat = "repeat-x";
		imgList[i].style.backgroundPosition = -gamma + "px 0px";
	}
}

function showLoader() {
	document.getElementById("loader").style.display = "block";
}

function hideLoader() {
	document.getElementById("loader").style.display = "none";
}

var timeOut;
function scrollTop() {
	window.scrollTo(0, 0);
	/* if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
	 window.scrollBy(0,-50);
	 timeOut=setTimeout('scrollTop()',20);
	 }
	 else clearTimeout(timeOut);
	 */
	return false;
}

function scrollToContent() {
	var top = getPosition(document.getElementById("downinfo")).top;

	if (document.body.scrollTop != top || document.documentElement.scrollTop != top) {
		window.scrollBy(0, 1);
		timeOut = setTimeout('scrollToContent()', 20);
	} else
		clearTimeout(timeOut);

	return false;

}

/*Of course I can code this more programatically, but this seems good to me.*/
function sendAnimation($timeout, viewSlideIndex) {
	$timeout(function() {

		// $('#plate').removeClass('frontSend');
		removeClassId("plate", "frontSend");

		//$('#containerSend').removeClass('beginning');
		removeClassId("containerSend", "beginning");

		//$('.curvable').addClass('curved');
		addClassId('curvable1', 'curved');
		addClassId('curvable2', 'curved');
		addClassId('curvable3', 'curved');
		addClassId('curvable4', 'curved');

		$timeout(function() {
			//$('#containerSend').addClass('hover');
			addClassId('containerSend', 'hover');

			$timeout(function() {
				//$('#containerSend').addClass('fly_away_first');
				addClassId('containerSend', 'flyIt');

				$timeout(function() {
					//$('#containerSend').addClass('fly_away');
					//addClassId('containerSend','fly_away');

					$timeout(function() {
						
						// back to the home page
						viewSlideIndex.setViewIndex("addFly");
						document.querySelector("[href='.']").click();
						
						$timeout(function() {
							
							//$('#plate').addClass('frontSend');
							addClassId('plate', 'frontSend');
	
							//$('#containerSend').removeClass('fly_away fly_away_first hover').addClass('beginning');
							removeClassId("containerSend", "flyIt");
							removeClassId("containerSend", "fly_away_first");
							removeClassId("containerSend", "hover");
							addClassId('containerSend', 'beginning');
	
							//$('.curvable').removeClass('curved');
							removeClassId('curvable1', 'curved');
							removeClassId('curvable2', 'curved');
							removeClassId('curvable3', 'curved');
							removeClassId('curvable4', 'curved');
						}, 300);
					}, 1200);
				}, 600);
			}, 2000);
		}, 2800);
	}, 200);
}


function showSearchModal(){
	addClassId('searchModal', 'in');
	document.getElementById('searchModal').style.display = "block";
}


function initSearch() {
	var cx = '016804192128247599642:d0qom4-yukw';
	var gcse = document.createElement('script');
	gcse.type = 'text/javascript';
	gcse.async = true;
	gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(gcse, s);

	$('#searchModal').on('shown.bs.modal', function(e) {

		$(".gsc-search-button").remove();
		$("[name='search']").attr("type", "search").attr("placeholder", "Search...").focus();
	});
}

