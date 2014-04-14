var page = require('webpage').create();  
var fs = require('fs');
page.viewportSize = {width: 1600, height: 900};
page.paperSize = {
	format: 'A4', 
  orientation: "landscape"
};

page.open('http://127.0.0.1:81/', function (status) {
	
	
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
	    	console.log("title:"+title);
	    	console.log("done");
	    	phantom.exit();
    	},10000);
    	
        //var p = page.evaluate(function () {
           // return document.getElementsByTagName('html')[0].innerHTML
        //});
        //console.log(p);
    }
    
    
    
    
});