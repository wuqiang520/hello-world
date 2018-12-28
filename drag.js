function drag(id){
	var obj = document.getElementById(id);
	var disX =0;
	var disY =0;
	obj.onmousedown = function(ev){
		disX = ev.pageX - obj.offsetLeft;
		disY = ev.pageY - obj.offsetTop;
		document.onmousemove = function(e){
			obj.style.left = e.pageX - disX + 'px';
			obj.style.top = e.pageY - disY +'px';
		}
	}
	document.onmouseup = function(){
		obj.onmousemove = null;
		obj.onmouseup = null;
	}
	return false;
}