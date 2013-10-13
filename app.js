document.addEventListener("DOMContentLoaded", function () {
  
  window.myInstaLax = new InstaLax();

  window.onscroll = function(){
  	var scroller = document.getElementById('scroller');
  	var sh = scroller.offsetHeight;
  	var indicator = document.getElementById('indicator');
  	var ww = document.documentElement.offsetWidth;
  	var wh = document.documentElement .offsetHeight;
  	var y = window.pageYOffset + wh;
  	var idHeight = (wh - (((sh - wh)- (y - wh)) * (wh / (sh - wh))));
  	indicator.style.height = idHeight + "px";
  	if(y >= sh) {
  		document.body.setAttribute('class', 'gocrazy');
  	} else {
  		document.body.removeAttribute('class');
  	}
  }

}, false);
