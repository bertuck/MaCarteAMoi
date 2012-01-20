var panier=[];

var carte ={
	destinataires:[
		
	]
	
}


var image="";
var cadre="";
var sensPreview="recto";

var fond_carte = "images/dosCarte.png";
/*
var BoService = "https://web.macarteamoi.net2-courrier.extra.laposte.fr/bomcam/services/xmlrpc";
var methodRpc = "system.connect";

   var request = new XmlRpcRequest(BoService, methodRpc);  
   //request.addParam(document.getElementById("n1").value);  
   //request.addParam(document.getElementById("n2").value);  
   var response = request.send();  
   alert(response.parseXML());  
*/
			
function getPhoto(){
	if(navigator.camera){
		options={destinationType :  1,
						sourceType : 1,
						allowEdit: true}
		navigator.camera.getPicture(getPictureSuccess, getPictureFail, options); 
	}else{
		image = "images/skin03.png";
		getPictureSuccess(image);
	}
	
    

}

function getPhotoAlbum(){
    if(navigator.camera){
		options={destinationType :  1,
                    sourceType : 0,
                    allowEdit: true}
		navigator.camera.getPicture(getPictureSuccess, getPictureFail, options); 
	}else{
		image = "images/skin03.png";
		getPictureSuccess(image);
	}
	
	
	
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
								  fromCenter: false});
		Canvas2Image.saveAsPNG($("#mycanvas"));
								
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
	$.mobile.changePage("#PersoCarte");
	
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


	var imgRecto= jQuery('<img/>',{src:srcRecto, height:"217px", width:"320px"});
	
	$("#canvarecto").drawImage({source: image,
							 x: 0,
							 y: 0,
							 height: 140,
							 width: 280,
							 fromCenter: false});
	$("#canvaverso").drawImage({source: fond_carte,
							 x: 0,
							 y: 0,
							 height: 140,
							 width: 280,
							 fromCenter: false});
	text=$("#textMessage")[0].value;
	var lines = text.split("\n");
	
	font = "'desyrel'";
	fontSize = 8;
	textColor = '#000000';
	
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
				$.mobile.changePage("#message");
				}
			 }

			 
			 
			 
// Gestion Contact
			function onBodyLoad()
			{		
				document.addEventListener("deviceready",onDeviceReady,false);
			}
			
			function touchMove(event) {
				event.preventDefault();
			 }
			 
			 // contact
			 
    function onDeviceReady() {
        // specify contact search criteria
        var options = new ContactFindOptions();
        options.filter="";          // empty search string returns all contacts
        options.multiple=true;      // return multiple results
		ListeContacts={};
		
        filter = ["displayName","addresses"];   // return contact.displayName field

        // find contacts
        navigator.contacts.find(filter, afficheListC, onError, options);

    }


	function afficheListC(contacts)
	{
				ListeContacts=contacts;
				$("#listec").empty();
		        for (var i=0; i<contacts.length; i++) 
				{
				dest=contacts[i].addresses;
				nom=contacts[i].displayName;
				if(dest!=null)
					{
						for (var j=0; j<dest.length; j++) 
						{
							Address=contacts[i].addresses[j].streetAddress;
							Locality=contacts[i].addresses[j].locality;
							Region=contacts[i].addresses[j].region;
							PCode=contacts[i].addresses[j].postalCode;
							Country=contacts[i].addresses[j].country;
							// ligne='<li> <a href="javascript:addC('+adresse+');"><h6>'+nom+'</h6></a></li>';
							ligne='<li> <a href="javascript:addC('+i+');"><h6>'+nom+'</h6></a></li>';
// Si on a cliqué sur le "li" alors sauvegarder ses données.

							$("#listec").append(ligne);

						}
					}
				}
			
		$("#divListC").scrollview({"direction":"y"});
		$.mobile.changePage("#listeCt");
		$('#listec').listview("refresh");

	}

function addC(numContact) 
{
	dest=ListeContacts[numContact].addresses;
	desti={};
	desti["ligne1"]= ListeContacts[numContact].displayName;
	desti["ligne2"]= dest[0].streetAddress;
	desti["ligne3"]= dest[0].region;
	desti["ligne4"]= dest[0].locality;
	desti["ligne5"]= dest[0].postalCode;
	desti["ligne6"]= dest[0].country;
	num = $("#num").val() ;
		   
	if (num ==""){
		carte.destinataires.push(desti);
	}else{
		carte.destinataires[num]=desti;
	}
	afficheListDest()
}

    // onSuccess: Get a snapshot of the current contacts
    //


    // onError: Failed to get the contacts
    //
    function onError(contactError) {
        alert('Error!');
    }
