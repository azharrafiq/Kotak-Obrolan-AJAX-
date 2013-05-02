/*  	Kotak Obrolan	(AJAX)		*/
/*		Oleh Azhar Rafiq			*/
/*
The MIT License (MIT)

Copyright (c) 2012-2013 Azhar Rafiq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

function buatPermintaan() {
    var XmlHttpObject;
    
    if (window.XMLHttpRequest) { 
        XmlHttpObject = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
        XmlHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return XmlHttpObject;
}

var httpObrolan = buatPermintaan();
var httpBaru = buatPermintaan();
function cek(){
	
	return true;
}
function kirim() {
if(document.getElementById('obrolan').value=="")
	{
	return false;
	}else{
  //Penyaringan karakter
	isi  = document.getElementById("obrolan").value;
	ini1 = isi.replace(":","%3A");
	ini2 = ini1.replace("#","%23");
	ini3 = ini2.replace("!","%21");
	ini4 = ini3.replace("$","%24");
	ini5 = ini4.replace("+","%2B");
	ini6 = ini5.replace(">","%3E%1D");
	ini7 = ini6.replace("'","%27");
	ini = ini7.replace("%3A//","%3A%2F%2F");
	//ini = ini.replace(/(\S{10})/g,"$1*kode92xe*");
	//digantikan dengan %7F
	isiLagi = ini.replace("&","%26");
    httpObrolan.open('get', 'ajax/obrolan.php?isi='+isiLagi);
    httpObrolan.onreadystatechange = function proses() {
    if(httpObrolan.readyState == 1){	
		document.getElementById('isian').style.display = "none";
		document.getElementById('proses').style.display = "block";
	}
    if(httpObrolan.readyState == 4){	
        var response = httpObrolan.responseText;
        document.getElementById('jendelaObrolan').innerHTML = response;
        document.getElementById('isian').style.display = "block";
        document.getElementById('proses').style.display = "none";
        document.getElementById('jendelaObrolan').scrollTop = document.getElementById('jendelaObrolan').scrollHeight;
    }
}
    httpObrolan.send(null);
    document.getElementById('jendelaObrolan').scrollTop = document.getElementById('jendelaObrolan').scrollHeight;
    document.getElementById("obrolan").value = "";
}
}
window.onload=function (){

		httpObrolan.open('get', 'ajax/obrolan.php');
		httpObrolan.onreadystatechange = function proses() {
		if(httpObrolan.readyState == 4){
			var response = httpObrolan.responseText;
			document.getElementById('jendelaObrolan').innerHTML = response;
			document.getElementById('jendelaObrolan').scrollTop = document.getElementById('jendelaObrolan').scrollHeight;
		}
		}
		httpObrolan.send(null);
		//Menentukan lamanya diam/"idle" untuk mengunduh kotak Obrolan kembali
		setInterval(function(){prosesAmbil()},9500);
		
		document.getElementById('jendelaObrolan').scrollTop = document.getElementById('jendelaObrolan').scrollHeight;
}

function prosesAmbil() {
httpBaru.open('get', 'ajax/obrolan.php');
httpBaru.onreadystatechange = function proses(){
if(httpBaru.readyState == 4){	

document.getElementById('jendelaObrolan').innerHTML = httpBaru.responseText;

}
}
httpBaru.send(null);

} 
