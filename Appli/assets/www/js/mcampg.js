var panier=[];

var carte ={
	destinataires:[
		
	]
	
}


var image="";
var cadre="";
var sensPreview="recto";

var fond_carte = new Image();
fond_carte.src = "../images/dosCarte.png";
	
			
function getPhoto(){
    options={destinationType :  1,
                    sourceType : 1,
                    allowEdit: true}
    navigator.camera.getPicture(getPictureSuccess, getPictureFail, options); 

}

function getPhotoAlbum(){
    


	options={destinationType :  1,
                    sourceType : 0,
                    allowEdit: true}
    navigator.camera.getPicture(getPictureSuccess, getPictureFail, options); 
	
}

function getPictureFail(message) {
    alert('erreur: ' + message);
}

function getPictureSuccess(imageUri) {
	
	try{
	
		image=imageUri;
		$("#mycanvas").drawImage({source: imageUri,
								 x: 0,
								 y: 0,
								 height: 150,
								 width: 300,
								  fromCenter: false})
	}catch(err){
		alert(err);
	}

	$("#scroller").scrollview({"direction":"x"});
	$.mobile.changePage("#PersoCarte");
}

function drawCarte(nomcadre){
	$("#mycanvas").clearCanvas();
	$("#mycanvas").drawImage({source: image,
							 x: 0,
							 y: 0,
							 height: 150,
							 width: 300,
							  fromCenter: false});
	if (nomcadre !=""){
		$("#mycanvas").drawImage({source: nomcadre,
							 x: 0,
							 y: 0,
							 height: 150,
							 width: 300,
							fromCenter: false});
	}
	 cadre=nomcadre;
}

function dessinecarte2()
{
	$("#canvaapercu").clearCanvas();
	$("#canvaapercu").drawImage({source: image,
							 x: 0,
							 y: 0,
							 height: 150,
							 width: 300,
							  fromCenter: false});
	if (cadre !=""){
		$("#canvaapercu").drawImage({source: cadre,
							 x: 0,
							 y: 0,
							 height: 150,
							 width: 300,
							fromCenter: false});
	}

}

function voirapercu() 
{
	dessinecarte2();
	$.mobile.changePage("#apercu");
}

function preview(){
	var canvas = document.getElementById("mycanvas");
    
    srcRecto = canvas.toDataURL("image/png");
	var imgRecto= jQuery('<img/>',{src:srcRecto, height:"140px", width:"280px"});
	$("#recto").empty();
	$("#recto").append(imgRecto);
	$("#canvapreview").drawImage({source: fond_carte,
							 x: 0,
							 y: 0,
							 height: 150,
							 width: 300,
							  fromCenter: false});
    
	text=$("#textMessage")[0].value;
	var lines = text.split("\n");
	
	font = "'desyrel'";
	fontSize = 8;
	textColor = '#000000';
	/*versoCanvas.drawImage(fond_carte, 0, 0, 280, 140);
	var ctx = versoCanvas[0].getContext("2d"); 
	
	
	ctx.font = fontSize + "px " + font;
	ctx.fillStyle = textColor;
	for (i = 0; i < lines.length; i++) {
 		ctx.fillText(lines[i],10, i*fontSize+15);
	}
							  
	srcVerso = versoCanvas[0].toDataURL("image/png");
	var imgVerso= jQuery('<img/>',{src:srcVerso, height:"140px", width:"280px"});
	
	$("#verso").empty();
	$("#verso").append(imgVerso);
	$("#verso").hide();
	*/
	$.mobile.changePage("#Preview");
	
}

function flipCarte(){
	
	$("#flipbox").rotate3Di( 'toggle',2000,
        {
            sideChange: mySideChange
        });
	
}


    
function mySideChange(front) {
	
	if (front) {
		$("#recto").show();
		$("#verso").hide();
		
	} else {
		$("#recto").hide();
		$("#verso").show();
	}
}

function listDest(){
	
	if(carte.destinataires.length == 0){
		detailDest();
	}else{
		afficheListDest();
	}
	
	
}


function detailDest(num){
	
	if(num === undefined){
		$("#num").val("");
		$("#ligne1").val("");
		$("#ligne2").val("");
		$("#ligne3").val("");
		$("#ligne4").val("");
		$("#ligne5").val("");
		$("#ligne6").val("");
	}else{
		$("#num").val(num);
		$("#ligne1").val(carte.destinataires[num].ligne1);
		$("#ligne2").val(carte.destinataires[num].ligne2);
		$("#ligne3").val(carte.destinataires[num].ligne3);
		$("#ligne4").val(carte.destinataires[num].ligne4);
		$("#ligne5").val(carte.destinataires[num].ligne5);
		$("#ligne6").val(carte.destinataires[num].ligne6);
	}
	
	$('#fieldContent1 input[type="text"]').each(function () {
			$(this).fieldtag({markedClass: "markedClass"});
	});
	$.mobile.changePage("#Destinataire");
}



function addDest(){

	desti={};
	
	
	desti["ligne1"]= $("#ligne1").val();
	desti["ligne2"]= $("#ligne2").val();
	desti["ligne3"]= $("#ligne3").val();
	desti["ligne4"]= $("#ligne4").val();
	desti["ligne5"]= $("#ligne5").val();
	desti["ligne6"]= $("#ligne6").val();
	num = $("#num").val() ;
		   
	if (num ==""){
		carte.destinataires.push(desti);
	}else{
		carte.destinataires[num]=desti;
	}
	
	afficheListDest()
	
}
function afficheListDest(){
	$("#listedest").empty();
	for ( i=0; i < carte.destinataires.length; i++ )
	{
		desti=carte.destinataires[i];
		ligne='<li> <a href="#"><h6>'+desti.ligne1+'</h6></a></li>';
		$("#listedest").append(ligne);
	}
	
	$("#divListDest").scrollview({"direction":"y"});
	$.mobile.changePage("#listeDestinataires");
	$('#listedest').listview("refresh");
}

function touchMove(event) {
	  // Prevent scrolling on this element
	  event.preventDefault();
	  }
	  
	  
function cartePoste(){
	$("#scrollerPoste").scrollview({"direction":"y"});
	
	$.mobile.changePage("#cartePoste");
}

function carteposteChoix(photo){
	
	try{
	
		image=photo;
		$("#mycanvas").drawImage({source: photo,
								 x: 0,
								 y: 0,
								 height: 150,
								 width: 300,
								  fromCenter: false})
	}catch(err){
		alert(err);
	}
	$.mobile.changePage("#message");
}

$('#aide').live('pageshow', function(event, ui){
	$("#divListAide").scrollview({"direction":"y"});
});

// Gestion du panier

function dessinecarte()
{
	$("#canvaapercu2").clearCanvas();
	$("#canvaapercu2").drawImage({source: image,
							 x: 0,
							 y: 0,
							 height: 65,
							 width: 90,
							  fromCenter: false});
	if (cadre !=""){
		$("#canvaapercu2").drawImage({source: cadre,
							 x: 0,
							 y: 0,
							 height: 65,
							 width: 90,
							fromCenter: false});
	}

}

function addPanier()
{
	dessinecarte();
	$("#scroller2").scrollview({"direction":"x"});
	$.mobile.changePage("#panier");
}



function validerPanier()
{
	$.mobile.changePage("#cartePoste");
}



function Validation() {
				if (confirm("Confirmez-vous avoir les droits de diffusion de cette photo?"))
				{
				$.mobile.changePage("#connexion");
				}
			 }
			 

			 

	
	