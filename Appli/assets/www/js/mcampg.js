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
		image = "images/test.jpg";
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
		image = "images/test.jpg";
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
								  fromCenter: false})
	}catch(err){
		alert(err);
	}

	$("#scroller").scrollview({"direction":"x"});
	ScrollCadre(0);
	
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
							 position: "absolute",
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


// Gestion de l'aperçu de la carte postale
function preview(elem){
	var canvas = document.getElementById("mycanvas");
	var sign = document.getElementById("canvasSig");
    // Sur le mobile on ne recupére pas la signature a corriger donc.
    srcRecto = canvas.toDataURL("image/png");
	srcSign = sign.toDataURL("image/png");


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
		fontSize = 12;
		textColor = '#000000';
		var posy = 6;
		for (i = 0; i < lines.length; i++) {
		posy += 10;
	    $("#canvaverso").drawText({
						  fillStyle: textColor,
						  x: 10, 
						  y: posy,
						  text: lines[i],
						  align: "left",
						  baseline: "middle",
						  position: "absolute",
						  font: fontSize + "px " + font
						});
							
			}
	if (elem !=false)
	{
		$("#canvaverso").drawImage({source: srcSign, // trouver une autre source pour récupérer la signature
				 x: 80, //80
				 y: 110, //110
				 height: 25, //25
				 width: 50,  //50
				 position: "absolute",
				 fromCenter: false});
	}
	
       /*var ctx = versoCanvas[0].getContext("2d");
       ctx.drawImage(fond_carte, 0, 0, 280, 140);
       ctx.font = fontSize + "px " + font;
       ctx.fillStyle = textColor;
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

function afficheListDest() {
	$("#listedest").empty();
	for ( i=0; i < carte.destinataires.length; i++ )
	{
		desti=carte.destinataires[i];
		ligne='<li> <a href="javascript:ModifDest(\''+i+'\');" ><h6>'+desti.ligne1+'</h6></a><a href="javascript:DeleteC(\''+i+'\');"  data-theme="d" data-icon="delete">Supprimer contact</a></li>';
		$("#listedest").append(ligne);
	}
	$("#divListDest").scrollview({"direction":"y"});
	$.mobile.changePage("#listeDestinataires");
	$('#listedest').listview("refresh");
}

function DeleteC(lecontact)
{
	alert(desti[i]);
	$('#listedest').empty('lecontact');
	// $('#listedest').remove('lecontact');
	$('#listedest').listview("refresh");
	afficheListDest();
}

function ModifDest(num)
{
		$("#num").val(num);
		$("#ligne1").val(carte.destinataires[num].ligne1);
		$("#ligne2").val(carte.destinataires[num].ligne2);
		$("#ligne3").val(carte.destinataires[num].ligne3);
		$("#ligne4").val(carte.destinataires[num].ligne4);
		$("#ligne5").val(carte.destinataires[num].ligne5);
		$("#ligne6").val(carte.destinataires[num].ligne6);
	
	$('#fieldContent1 input[type="text"]').each(function () {
			$(this).fieldtag({markedClass: "markedClass"});
	});
	$.mobile.changePage("#Destinataire");
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
		$("#cartePo").clearCanvas();
		$("#cartePo").drawImage({source: photo,
								 x: 0,
								 y: 0,
								 height: 150,
								 width: 300,
								  fromCenter: false})
	}catch(err){
		alert(err);
	}
	$.mobile.changePage("#cartePoste");
}

$('#aide').live('pageshow', function(event, ui){
	$("#divListAide").scrollview({"direction":"y"});
});

// Gestion du panier, fonction a supprimer une fois l'enregistrement de carte effectué
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


// Gestion du panier à faire


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
					ligne='<li> <a href="javascript:addC('+i+');"><h6>'+nom+'</h6></a></li>';
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



// Interface Cadre


var themes =  [{theme:"Anniversaire", contenu:["cadres/anniv1.png", "cadres/anniv2.png", "cadres/anniv3.png", "cadres/anniv4.png", "cadres/anniv5.png", "cadres/anniv6.png"]},
			{theme:"Classique", contenu:["cadres/classique1.png", "cadres/classique2.png", "cadres/classique3.png", "cadres/classique4.png", "cadres/classique5.png", "cadres/classique6.png", "cadres/classique7.png", "cadres/classique8.png", "cadres/classique9.png", "cadres/classique10.png", "cadres/classique11.png", "cadres/classique12.png"]},
			{theme:"Evenement", contenu:["cadres/evenement1.png", "cadres/evenement2.png", "cadres/evenement3.png", "cadres/evenement4.png", "cadres/evenement5.png", "cadres/evenement6.png"]},
			{theme:"Fête", contenu:["cadres/fetes1.png", "cadres/fetes2.png", "cadres/fetes3.png", "cadres/fetes4.png", "cadres/fetes5.png", "cadres/fetes6.png"]},
		 	{theme:"Naissance", contenu:["cadres/naissance1.png", "cadres/naissance2.png", "cadres/naissance3.png", "cadres/naissance4.png", "cadres/naissance5.png", "cadres/naissance6.png"]},
		 	{theme:"Noel", contenu:["cadres/noel1.png", "cadres/noel2.png", "cadres/noel3.png", "cadres/noel4.png", "cadres/noel5.png", "cadres/noel6.png", "cadres/noel7.png"]},
		 	{theme:"Vacances", contenu:["cadres/vacances1.png", "cadres/vacances2.png", "cadres/vacances3.png", "cadres/vacances4.png", "cadres/vacances5.png", "cadres/vacances6.png"]},
			{theme:"Voeux", contenu:["cadres/voeux1.png", "cadres/voeux2.png", "cadres/voeux3.png", "cadres/voeux4.png", "cadres/voeux5.png"]}] ;

	
 function ScrollCadre(j)
 { 
		
		ligne2="";
		if (j < 0) j = 7;
		if (j > 7) j = 0;
		ligne ="";
		i = j -1;
		l = j + 1;
		$("#listecadre").empty();
		ligne = "<div data-role='header' data-theme='b' data-position='inline'><a href='javascript:ScrollCadre("+i+");' data-transition='none' data-iconpos='notext' data-icon='arrow-l'>Test</a><h1>"+themes[j].theme+"</h1><a href='javascript:ScrollCadre("+l+");' data-transition='none' data-iconpos='notext' data-icon='arrow-r' data-theme='b'>Test</a></div> ";		
		$("#listecadre").html(ligne);
			$("#listecadre2").empty();
				for (var k=0; k<themes[j].contenu.length; k++) 
				{
					ligne2 += '<div class="square" ><a href="javascript:drawCarte(\''+themes[j].contenu[k]+'\');"><img src="'+themes[j].contenu[k]+'" width="90" height="65" /></a></div>';
				}
			$("#divListCadre2").html(ligne2);
			$("#divListCadre2").scrollview({"direction":"x"});
			$('#listecadre2').listview("refresh");
			$.mobile.changePage("#PersoCarte");	
			$('#listecadre').listview("refresh");
 }
 
 