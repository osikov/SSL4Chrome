'use strict';

//alert(window.getSelection().toString());
function enc(f) 
{
	var f = document.getElementById("f1");
	if (f.p.value == '')
	{
		alert('Please enter password...');
		return;
	}
	f.t.value = GibberishAES.enc(f.t.value, f.p.value);
}

function dec(f)
{
	var f = document.getElementById("f1");
	if (f.p.value == '')
	{
		alert('Please enter password...');
		return;
	}
	try 
	{
		f.t.value = GibberishAES.dec(f.t.value, f.p.value);
	}
	catch(err)
	{
		alert('Wrong password...');
	}
}

document.getElementById('be').addEventListener('click', enc);
document.getElementById('bd').addEventListener('click', dec);


function doCrypt()
{
	var f = dec;
	
	//
	var text = document.getElementById('t').value;
	text = text.split("\n");
	for(var i in text)
	{
		var line = text[i].trim();
		if (line == '') continue;
		if (line.length == 64 && line.indexOf(' ') == -1)
			continue;
		if (line.length < 64 && line.endsWith('=') && line.indexOf(' ') == -1)
			continue;
		f = enc;
	}
	f();
}

document.addEventListener("keydown", function(e) {
	if (e.ctrlKey && e.keyCode == 13)
	{
		doCrypt();
	}
});	
	
chrome.runtime.onMessage.addListener(function (request, sender, value)
{
	document.getElementById("t").value = request.selectedText;
	chrome.runtime.onMessage.removeListener(window.onSelection);
});

chrome.tabs.executeScript({ file: "getsel.js" });
