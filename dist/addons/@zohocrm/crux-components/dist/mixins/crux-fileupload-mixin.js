Lyte.Mixin.register("crux-fileupload-mixin", {
    getFileType : function(fileName){
		// var fileName = file.fileName;
		var extension = (fileName).substring(fileName.lastIndexOf(".") + 1).toLowerCase();

		var image = ["jpeg","jpg","gif","png","webp","bmp","svg"]; //No I18N
		var video = ["avi", "wmv", "mp4", "mpeg", "mpg", "mov", "flv", "mkv", "webm"]; //No I18N
		var audio = ["mp3", "ogg", "oga", "wma", "m4p", "m4a", "au", "3gp"]; //No I18N
		var docx = ["doc","docx","odt","rtf"]; //No I18N
		var ppt = ["odp", "pps", "pot", "pptx", "ppt"]; //No I18N
		var zip = ["zip","zipx","tar","gz","z","cab","rar","bz2","lzh","7z","img","iso"]; //No I18N
		var html = ["html","htm"]; //No I18N
		var pdf = ["pdf"]; //No I18N
		var excel = ["csv","xls","xlsx","ods","xlsm","sxc","tsv"]; //No I18N
		
		if(image.includes(extension)){
			return "image";  //No I18N
		} else if(pdf.includes(extension)){
			return "pdf"; //No I18N
		} else if(zip.includes(extension)){
			return "zip"; //No I18N
		} else if(video.includes(extension)){
			return "video"; //No I18N
		} else if(audio.includes(extension)){
			return "audio"; //No I18N
		} else if(docx.includes(extension)){
			return "docx"; //No I18N
		} else if(ppt.includes(extension)){
			return "ppt"; //No I18N
		} else if(excel.includes(extension)){
			return "xls"; //No I18N
		} else if(html.includes(extension)){
			return "html"; //No I18N
		}
		return "allfile"; //No I18N
	}
});

