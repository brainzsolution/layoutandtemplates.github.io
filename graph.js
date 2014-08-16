"use strict";
var x, y, max, minY, maxY, turningPoint, movement;

var toRad = function(e) {return (Math.PI * e) / 180}

var Page = 
{
	width: 0,
	height: 0,
	halfWidth: 0,
	halfHeight: 0,
}

var Canvas =
{	
	id: "",
	graph: "",
	color: 0,
	x: 0,
	y: 0,
	Scale: {x: 0, y: 0},
	Setter: function()
	{
		this.id.width = Page.width;
		this.id.height = Page.height;
	},
	Context: function()
	{
		this.graph = this.id.getContext("2d");
		this.graph.translate(Page.halfWidth, Page.halfHeight);
		this.graph.clearRect(-Page.halfWidth, -Page.halfHeight, Page.width, Page.height);
	}, 
	MidPoint: function()
	{
		this.graph.strokeStyle = "white";
		this.graph.lineWidth = 1;
		
		//X-axis
		this.graph.beginPath();
		this.graph.moveTo(-Page.halfWidth, 0);
		this.graph.lineTo(Page.halfWidth, 0);
		this.graph.stroke();
		this.graph.closePath();
		
		//Y-axis
		this.graph.beginPath();
		this.graph.moveTo(0, -Page.halfHeight);
		this.graph.lineTo(0, Page.halfHeight);
		this.graph.stroke();
		this.graph.closePath();
	},
	Point: function(x, y)
	{
		this.x = (Page.halfWidth / this.Scale.x) * x;
		this.y = (Page.halfHeight / this.Scale.y) * y;
		
		this.graph.strokeStyle = this.color;
		this.graph.lineWidth = 1;
		
		//this.graph.clearRect(-Page.halfWidth, -Page.halfHeight, Page.width, Page.height);
		
		//Draw point
		this.graph.beginPath();
		this.graph.moveTo(this.x, this.y);
		this.graph.lineTo(this.x + 1, this.y + 1);
		this.graph.stroke();
		this.graph.closePath();
		
		//console.log("here");
	}
}

var Quadratic = 
{
	x1: 0,
	x2: 0, 
	Solve: function(a, b, c)
	{
		var d = Math.pow(b, 2) - (4 * a * c);
		if (d < 0) alert("Equation has a complex root\n--------------------------------------------\n    Complex roots may cause discontinuity");
		else
		{
			this.x1 = (-b + Math.sqrt(d)) / (2 * a);
			this.x2 = (-b - Math.sqrt(d)) / (2 * a);
		}
	}
}

var Differentiate = 
{
	x1: 0,
	x2: 0,
	Degree2: function(a, b){return -b / (2 * a);},
	Degree3: function(a, b, c)
	{
		Quadratic.Solve(3 * a, 2 * b, c);
		this.x1 = Quadratic.x1;
		this.x2 = Quadratic.x2;
	}
}

var Graph = 
{
	SetScale: function(eType)
	{
		//Set x-scale
		if (Math.abs(Range.x1) > Math.abs(Range.x2)) Canvas.Scale.x = Math.abs(Range.x1);
		else Canvas.Scale.x = Math.abs(Range.x2);
		
		minY = eqn(Range.x1);
		maxY = eqn(Range.x2);
			
		//set y-scale
		if (Math.abs(minY) > Math.abs(maxY)) max = Math.abs(minY);
		else max = Math.abs(maxY);
	
		switch (eType)
		{
			case ("sin" || "cos"):
				if(Math.abs(Range.x1 - Range.x2) >= 180) max = 1;
				break;
			case ("quadratic"):
				turningPoint = eqn(Differentiate.Degree2(1, 2 ,1));
				if (Math.abs(turningPoint) > max) max = turningPoint;
				break;	
			case ("cubic"):
				Differentiate.Degree3(1, 999, 10);
				
				if (Math.abs(Differentiate.x1) > Math.abs(Differentiate.x2)) turningPoint = eqn(Differentiate.x1);
				else turningPoint = eqn(Differentiate.x2);
				
				if (Math.abs(turningPoint) > max) max = turningPoint;
				break;
		}
		Canvas.Scale.y = max;
	}
}

var Range = {x1: 0,x2: 0,}

//Input
function Equation()
{
	Range.x1 = -180
	Range.x2 = 180
	
	Graph.SetScale("sin");
	
	x = Range.x1;
	function timer(range, speed)
	{	
		for(x = range; x <= range + speed; x += 0.01)
		{	
			y = eqn(x);
			Canvas.Point(x, y);
			//x += 0.01;
		}
		movement = setTimeout(function(){timer(range += speed, speed)}, 1);
		if (x >= Range.x2) clearInterval(movement);return null;
	}
	timer(Range.x1, 0.25)
}

//Enter input here
var eqn = function(x){return Math.pow(Math.sin(toRad(x)), 1);/*Math.cos(toRad(x))*/}

function Resize()
{
	Page.width = document.body.offsetWidth;
	Page.height = document.body.offsetHeight;
	Page.halfWidth = Page.width / 2;
	Page.halfHeight = Page.height / 2;
	Canvas.Setter();
	Canvas.Context();
	Canvas.MidPoint();
	Canvas.color = "#00ffff";
	if (typeof movement != "undefined") clearInterval(movement)
	Equation();
}