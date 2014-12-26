"use strict";
var table = document.getElementsByClassName("body")[0];
var thead = document.getElementsByClassName("header")[0];
var tbody = document.getElementsByClassName("container")[0];
var tfoot = document.getElementsByClassName("footer")[0];

var table_height = table.offsetHeight;
var thead_height = thead.offsetHeight;
var tfoot_height = tfoot.offsetHeight;

var tbody_height = 0.9 * (table_height - (thead_height + tfoot_height));

tbody.style.minHeight = tbody_height + "px";
