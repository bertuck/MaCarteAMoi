function initDessin(){
      clear();
      // for regular browsers
      document.onmousemove = function(e){
        dot(e.clientX, e.clientY);
      }
 
      // for iphone:
      document.ontouchmove = function(e) {
        // prevent scaling and sliding
        e.preventDefault();
        // draw dots at each touch point
        var leng = e.touches.length;
        for (var i = 0; i < leng; i++) {
          dot(e.touches[i].pageX, e.touches[i].pageY);
        }
      }
    $.mobile.changePage("#signature");
}

function clear(){

	var fond= "images/cadreSignaturePortrait.png";
    var canvas = document.getElementById("canvasSig");
    var c = canvas.getContext("2d");
    var TWO_PI = Math.PI * 2;
      c.fillStyle = "white"; // l'arriére plan
      c.fillRect(0, 0, canvas.width, canvas.height);			
	$("#canvasSig").drawImage({source: 'images/cadreSignaturePortrait.png',
				 height: 150,
				 width: 300,
				 position: "absolute",
				 fromCenter: false});
    } 
 
function dot(x, y){
	
    var canvas = document.getElementById("canvasSig");
    var c = canvas.getContext("2d");
    var TWO_PI = Math.PI * 2; // Definit le point de signature, cercle ou pas
    c.fillStyle = "rgba(0,0,0,0.3)"; // On definit la couleur de la signature, et son epaisseur
    c.beginPath();
    c.arc(x, y, 7, 0, TWO_PI, true);
    c.closePath();
    c.fill();
}

