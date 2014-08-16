"use strict";
var inp, co_eff, power, span;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function ToTheNextTextBox(sender)
{
	alert (sender.ELEMENT_NODE);
}

function AutoWidth(sender)
{
	var w = sender.value.length * 1;
	sender.style.width = Math.sqrt(w) + "em";
	if (w == 0) sender.style.width = "1em";
}

function OnlyNumbers(sender)
{
	var key = window.event  || window.evt;
	var key_code = key.keyCode;// || k
	
	//console.log(key_code);
	var bol = (key_code > 47 && key_code < 58) || key_code == 8 || key_code == 46 || (key_code > 36 && key_code < 41) || key_code == 9;
	if (!bol) key.preventDefault();
	
	//Jump to the next textbox
	if (key_code == 9 || key_code == 32) ToTheNextTextBox(sender);
}

function setSimpleInputAttributes(sender)
{
	sender.className = "simpleInput";
	sender.type = "text";
	sender.setAttribute("maxlength", "9");
	sender.setAttribute("oninput", "AutoWidth(this)");
	sender.setAttribute("onkeypress", "OnlyNumbers(this)");
	sender.setAttribute("onkeydown", "OnlyNumbers(this)");
	sender.setAttribute("onkeyup", "OnlyNumbers(this)");
}

function Input(eType, degree)
{
	inp = document.getElementsByClassName("inputCol")[0];
	inp.innerHTML = "";
	co_eff = document.createElement("input");
	setSimpleInputAttributes(co_eff);
	
	span = document.createElement("span");
	span.innerHTML = "x";
	
	power = document.createElement("input");
	
	switch (eType)
	{
		case ("sin"):
			co_eff.setAttribute("placeholder", "a");
			var sinSpan = document.createElement("span");
			sinSpan.innerHTML = "sin";
			power.setAttribute("placeholder", "n");
			setSimpleInputAttributes(power);
			power.className += " sup";
			
			inp.appendChild(co_eff);
			inp.appendChild(sinSpan);
			inp.appendChild(power);
			inp.appendChild(span);
			break;
		case ("cos"):
			co_eff.setAttribute("placeholder", "a");
			var sinSpan = document.createElement("span");
			sinSpan.innerHTML = "cos";
			power.setAttribute("placeholder", "n");
			setSimpleInputAttributes(power);
			power.className += " sup";
			
			inp.appendChild(co_eff);
			inp.appendChild(sinSpan);
			inp.appendChild(power);
			inp.appendChild(span);
			break;
		case ("tan"):
			co_eff.setAttribute("placeholder", "a");
			var sinSpan = document.createElement("span");
			sinSpan.innerHTML = "tan";
			power.setAttribute("placeholder", "n");
			setSimpleInputAttributes(power);
			power.className += " sup";
			
			inp.appendChild(co_eff);
			inp.appendChild(sinSpan);
			inp.appendChild(power);
			inp.appendChild(span);
			break;
		case ("polynomial"):
			co_eff = new Array(degree);
			span = new Array(degree);
			power = new Array(degree);
			var plus = new Array(degree);
			
			for (var i = 0; i <= degree; i++)
			{
				co_eff[i] = document.createElement("input");
				co_eff[i].setAttribute("placeholder", alphabet[i]);
				
				power[i] = document.createElement("sup");
				power[i].innerHTML = degree - i;
				
				span[i] = document.createElement("span");
				span[i].innerHTML = "x";
				
				plus[i] = document.createElement("span");
				plus[i].className = "plus"
				plus[i].innerHTML = "+";
				
				if(i == degree) 
				{
					span[i].innerHTML = "";
					plus[i].className = ""
					plus[i].innerHTML = "";
				}
				if (degree - i == 1 || degree - i == 0) power[i].innerText = "";
				
				setSimpleInputAttributes(co_eff[i]);
				
				inp.appendChild(co_eff[i]);
				inp.appendChild(span[i]);
				inp.appendChild(power[i]);
				inp.appendChild(plus[i]);
			}
	}
}
function Load(sender)
{
	//Input("polynomial", 1);
}
function GetSelection(sender)
{
	switch (sender.value)
	{
		case "linear": Input("polynomial", 1); break;
		case "quadratic": Input("polynomial", 2); break;
		case "cubic": Input("polynomial", 3); break;
		case "sin": Input("sin"); break;
		case "cos": Input("cos"); break;
		case "tan": Input("tan"); break;
	}
}