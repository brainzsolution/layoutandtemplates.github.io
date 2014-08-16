"use strict";
var Frame = 
{
	id: "",
	ListenToRightClick: function(openOrClose)
	{
		var e;
		e = window.event;
		
		e.returnValue = false;
		if (e.preventDefault) e.preventDefault();
		e.stopPropagation();
		
		
		//e.preventDefault ? e.preventDefault() : e.returnValue = false;
		
		if (e.button == 2) Frame.Open();
	},
	Close: function(sender)
	{
		setTimeout(function()
		{
			Frame.id.style.display = "none";
			sender.style.display = "none";
		}, 100);
	},
	Open: function()
	{
		setTimeout(function()
		{
			Frame.id.style.display = "block";
			btn.style.display = "block";
		}, 100);
	},
}