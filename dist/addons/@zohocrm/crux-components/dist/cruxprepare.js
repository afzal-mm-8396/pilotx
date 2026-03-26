var pjson = require('./package.json');
var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'components/helpers/cruxUtils.js');
fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
    	arry = (data.toString().split('\n'));
    	arry.splice(arry.length-1,1);
    	arry.push('_cruxUtils.version = "'+pjson.version+'";');
    	fs.writeFile(filePath, arry.join('\n'), function(err) {
		    if(err) {
		        return err
		    }
		}); 
        // console.log('received data: ' + data);
    }
});
var execProcess = require("child_process").exec;
execProcess("git add components/helpers/cruxUtils.js &&  git commit -m \"version change\" && git push", function(err, response){
});

