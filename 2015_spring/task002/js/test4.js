function $(selector) {
	var type = selector[0];
	switch(type) {
		"#": function(){
				return document.getElementById(selector.substring(0,selector.length-1));
			 };
		".": function(){
				return document.getElementsByClassName(selector.substring(0,selector.length-1)[0]);
			 };
		"[": function(){
				for()
			 };

	}
}

