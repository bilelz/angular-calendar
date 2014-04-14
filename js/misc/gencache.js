var page = require('webpage').create();
var page = require('webpage').create();  
var fs = require('fs');
page.viewportSize = {width: 1600, height: 900};
page.paperSize = {
	format: 'A4', 
  orientation: "landscape"
};

var args = [];
console.log(args.length);

page.open('http://127.0.0.1:81/', function (status) {
	console.log(args.length);
	if (status !== 'success') {
	        console.log('Unable to access network');
	    } else {
			setTimeout(function(){
				var pageIdList = page.evaluate(function() {
					var nodes = ['http://127.0.0.1:81/'],matches = document.querySelectorAll("a.listBlock");

		            for(var i = 0; i < matches.length; i++) {
		            	
		                nodes.push(matches[i].href);
		            }
		
		            return nodes;
			  	});
					  args = pageIdList;
							
							next_page();
					  
				},5000);
			}
	
});

function handle_page(pageUrl){
	page.open(pageUrl, function (status) {
		console.log("page.open:"+pageUrl);
		var pageId = page.evaluate(function() {
			if(document.location.pathname.split("/")[document.location.pathname.split("/").length-1] == ""){
				return "index";
			}
		    return document.location.pathname.split("/")[document.location.pathname.split("/").length-1];
		  });
		console.log(pageId);
	    if (status !== 'success') {
	    	console.log('Unable to access network');
		} else {
	    	console.log("waiting full loading page...");
	    	setTimeout(function(){
	    		//remove js script
	    		
	    		
	    		page.evaluate(function() {
					var matches = document.querySelectorAll("script");

		            for(var i = 0; i < matches.length; i++) {
		            	matches[i].parentNode.removeChild(matches[i]);
		            }
		            
			  	});
	    		
				fs.write('js/misc/cache/'+pageId+'.html', "<cache/>"+page.content, 'w');
				page.render('js/misc/cache/'+pageId+'.png');
				var title = page.evaluate(function() {
					return document.title;
				});
				console.log("Done:"+title);
				setTimeout(next_page,100);
			},10000);
									    	
	    }
	});
}
var i=0;
function next_page(){
	console.log();
	console.log("iteration:"+i);
    //var file=args.shift();
    //if(!file){phantom.exit(0);}
    if(i==args.length){
    	phantom.exit(0);
    }
    var file=args[i++];
    handle_page(file);
}
