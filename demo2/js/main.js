function left(){
	$(".tilecontent").find("div").each(function(){
		
		var classes = $(this).attr("class").split(" ");
		for(var i in classes){
			//alert(classes[i]);
			if(classes[i].indexOf("tile-postion") >=0) {
			 	$(this).removeClass(classes[i]);
			   classes[i] = classes[i].substring(0,classes[i].indexOf("tile-postion")+15)+"1";
			
			   

			   $(this).addClass(classes[i]);
			}
		}
	});
};

function Top(){
	$(".tilecontent").find("div").each(function(){
		
		var classes = $(this).attr("class").split(" ");
		for(var i in classes){
			//alert(classes[i]);
			if(classes[i].indexOf("tile-postion") >=0) {
			  // classes[i].replace
			   $(this).removeClass(classes[i]);
			
			   classes[i] = classes[i].substring(0,classes[i].indexOf("tile-postion")+13)+"1"+classes[i].substring(14,16);
			  
			   $(this).addClass(classes[i]);
			}
		}
	});
};

function right(){
	$(".tilecontent").find("div").each(function(){
		
		var classes = $(this).attr("class").split(" ");
		for(var i in classes){
			//alert(classes[i]);
			if(classes[i].indexOf("tile-postion") >=0) {
			  // classes[i].replace
			   $(this).removeClass(classes[i]);
			
			    classes[i] = classes[i].substring(0,classes[i].indexOf("tile-postion")+15)+"4";
			  
			   $(this).addClass(classes[i]);
			}
		}
	});
};

function bottom(){
	$(".tilecontent").find("div").each(function(){
	//	alert($(this).css("top"));
		if($(this).css("top")!="360px"){

			var classes = $(this).attr("class").split(" ");
			
			for(var i in classes){
	
				if(classes[i].indexOf("tile-postion") >=0) {
				 
				   $(this).removeClass(classes[i]);
				   
					//判断将要到达的位置有没有块
					for(var position=2; position<4;position++) {
						target = classes[i].substring(0,classes[i].indexOf("tile-postion")+13)+position+classes[i].substring(14,16);
						//alert($(".tilecontent").find("."+target).length);
						//这里有问题，不一定是最边缘的那个位置，而是应该判断，在这个方向上，还有没有块
						if($(".tilecontent").find("."+target).length > 0) {
							//如果有，再判断内容与这块的内容是否相等
							var sourcetxt = $(this).html();
							var targettxt = $(".tilecontent").find("."+target).html();
							
							if(sourcetxt == targettxt){
								//如果相等，则合并
								//alert(sourcetxt+"-"+targettxt);
								$(this).remove();
								$(".tilecontent").find("."+target).html($(".tilecontent").find("."+target).html()*2);

							}else{
								//如果不相等，则要移动的位置就不一样了。
								//还需要判断下面有几块，以及下面的几块可能会合并的问题，所以在遍历的时候是不是应该优先遍历下面的块？
								target = classes[i].substring(0,classes[i].indexOf("tile-postion")+13)+"4"+classes[i].substring(14,16);

							}
						}else{
							target = classes[i].substring(0,classes[i].indexOf("tile-postion")+13)+"4"+classes[i].substring(14,16);
							$(this).addClass(target);
						}
				   
					}
					

				
				 break;
				}
				
			}
		}
		
	});
};

$(document).keyup(function(e) {
	var id = e.keyCode;
	//e.preventDefault();

	switch(id) {
		case 37: 
				 left();
				 break;
		case 38: Top();
				 break;
		case 39: right();
				 break;
		case 40: 
				 bottom();
				 break;
	}
});