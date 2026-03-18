'use Strict';
var fs = require("fs");
module.exports = {
    debug: true,
    dist: "dist",
    dependencies : {
		"components" : [ ], //array of string path from dist
		"plugins" : [ ], //array of string path from dist
		"lyte" : [ ], //array of string path from dist
        "css" :[ ] //array of string path from dist
    },
    components: [
        // { "url": "components/javascript/welcome-comp.js","name" : "welcome-comp", "data": {something:"az1"} }
        // url -> path of component from dist (not mandatory)
        // name -> name of component
        // data -> data that can be passed to component
    ],
    databind: true, //data binding in client for server rendered component
    output: function(aobj){
        //callback to modify the server rendered content if needed and return the string

        // var htmlStr = "<html> ";
        // var obj = JSON.parse(aobj);
        // htmlStr+="\n <head>";
        // if(obj.css){
        //     for(var k in obj.css){
        //         htmlStr+="\n <style from-component='"+k+"'>"+obj.css[k]+"</style>"
        //     }
        // }
        // this.dependencies.lyte.forEach(function(itm){
        //     htmlStr+="\n <script src='dist_copy/"+itm+"'> </script>";
        // });
        // this.dependencies.plugins.forEach(function(itm){
        //     htmlStr+="\n <script src='dist_copy/"+itm+"'> </script>";
        // });
        // this.dependencies.components.forEach(function(itm){
        //     htmlStr+="\n <script src='dist_copy/"+itm+"'> </script>";
        // });
        // this.dependencies.css.forEach(function(itm){
        //     htmlStr+="\n <link rel='stylesheet' href='dist_copy/"+itm+"'/>";
        // })
        // htmlStr+="\n <script src='dist_copy/components/javascript/welcome-comp.js'></script>"
        // htmlStr+="\n </head>";
        // if(obj.components){
        //     htmlStr+="\n <body>";
        //     obj.components.forEach(element => {
        //         var htm = element.html.replaceAll(/lyte-rendered-ce/g, '');
        //         htmlStr+="\n" + htm;
        //     });
        //     htmlStr+="\n </body>";
        // } 
        // htmlStr += "\n </html>"
        // fs.writeFileSync("output.html", htmlStr.toString());
        return aobj;
    }
}
