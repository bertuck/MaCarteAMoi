var urlBO="https://web.macarteamoi.net2-courrier.extra.laposte.fr/bomcam/services/xmlrpc";
var sessId="";
var idClient="";



function BOConnect(){
    var request = new XmlRpcRequest(urlBO, "system.connect");
    var response = request.send();  
    rep = response.parseXML();
    sessId = rep.sessid;
}

function loginBO(userName,password){
    if (sessId=="") BOConnect();
    param = [userName,password];
    rep=AppelXmlRpc("user.login",param);
    idClient = rep.user.uid;
}

function createUser(nom,prenom,password,mail){
    if (sessId=="") BOConnect();
    format="json";
    param = [format,[nom,prenom,password,mail]];
    rep=AppelXmlRpc("user.save",param,"json");
    if(rep != false) {
        idClient = rep.user.uid;
        alert(idClient);
    }
}

function getCGU(){
    param = [];
    rep=AppelXmlRpc("mk_mcam_services_contenus.cgv",param,"json");
    if(rep != false) {
        idClient = rep.user.uid;
        alert(idClient);
    }
}



function AppelXmlRpc(method,arrayParam){
    var request = new XmlRpcRequest(urlBO, method);
    
    request.addParam(sessId);
   
    for(i in arrayParam){
        request.addParam(param[i]);
    }
    var response = request.send();  
    rep = response.parseXML();
    if (rep.faultCode){
        alert(rep.faultString);
        return false;
    }
    return rep;
    
}