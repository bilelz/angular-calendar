var page = require('webpage').create();  
var fs = require('fs');
page.viewportSize = {width: 1600, height: 900};
page.paperSize = {
	format: 'A4', 
  orientation: "landscape"
};
page.open('http://127.0.0.1:81/The_Next_Web_Europe_Conference_2014_tnwconference/5mv3tco1uaq9ccjau868vrb0c8', function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
    	console.log("waiting full loading page...");
    	setTimeout(function(){
    		fs.write('js/misc/cache/1.html', page.content, 'w');
	    	page.render('js/misc/cache/1.png');
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