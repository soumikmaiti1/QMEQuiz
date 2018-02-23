var baseURL = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/";
var ASSOID = localStorage.getItem("ASSOID");
function getActiveRaceName() {
    var url = baseURL + "getactiverace";
        var method = "POST";
        var data = {
            "associationId": ASSOID
        }
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            /*---------------If one race is active get race name---------------*/
            $("#raceControlname1").html("The "+response.eventName+" Race Control");
            /*----------------------End---------------------------------*/
        }
        else {
            //do something here
        }
    });
}
function logoutAssociationportal() { 
    //localStorage.clear("");
    //localStorage.removeItem("activeRaceID");
    location.href = "index.html";
}
function logoutQMeportal() { 
    //localStorage.clear();
    location.href = "index.html";
}
function addAssociation() { 
    var assoname, username, password,adminname,email,phone1,phone2,phone3,urll;
    assoname = $(".assoName").val();
    adminname= $(".adminName").val();
    email = $(".email").val();
    phone1 = $(".phone1").val();
    phone2 = $(".phone2").val();
    phone3 = $(".phone3").val();
    urll = $(".urll").val();
    if (assoname == '') {
        $('.assoName').css('border-bottom', '1px solid red');
    }
    else if (adminname == '') {
        $('.adminName').css('border-bottom', '1px solid red');
    }
    else if (email == '') {
        $('.email').css('border-bottom', '1px solid red');
    }
    else if (phone1 == '') {
        $('.phone1').css('border-bottom', '1px solid red');
    }
    else if (phone2 == '') {
        $('.phone2').css('border-bottom', '1px solid red');
    }
    else if (phone3 == '') {
        $('.phone3').css('border-bottom', '1px solid red');
    }    
    else if (urll == '') {
        $('.urll').css('border-bottom', '1px solid red');
    }
    if (assoname != '') {
        $('.assoName').css('border-bottom', '1px solid #ccc');
    }
    if (adminname != '') {
        $('.adminName').css('border-bottom', '1px solid #ccc');
    }
    if (email != '') {
        $('.email').css('border-bottom', '1px solid #ccc');
    }
    if (phone1 != '') {
        $('.phone1').css('border-bottom', '1px solid #ccc');
    }
    if (phone2 != '') {
        $('.phone2').css('border-bottom', '1px solid #ccc');
    }
    if (phone3 != '') {
        $('.phone3').css('border-bottom', '1px solid #ccc');
    }
    if (urll != '') {
        $('.urll').css('border-bottom', '1px solid #ccc');
    }
    //alert(assoname+" "+adminname+" "+email+" "+phone+" "+urll);
    if (assoname != '' && adminname != '' && email != '' && phone1 != ''&& phone2 != ''&& phone3 != '' && urll!='') { 
        $('#logload').css("display", "block");
        var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/addassociation";
        var method = "POST";
        var data = {
        "associationName": assoname,
        "adminName": adminname,
        "email": email,
        "stdCode": phone1,
        "secondNumber": phone2,
        "phoneNumber":phone3,
        "organizationUrl":urll
        };     
        ajaxcall(url, method, data, function (response) {
            console.log(JSON.stringify(response));
            if (response.status == 1) { 
                $("#statusMsg").html('<h5 style="color:green;">'+(JSON.stringify(response.message)).replace(/"/g,"")+'</h5>');
                $('#logload').css("display", "none");
            } 
            else if (response.status == 0) { 
            $("#statusMsg").html('<h5 style="color:red;">'+(JSON.stringify(response.message)).replace(/"/g,"")+'</h5>');
            $('#logload').css("display", "none");
            }
        })
    }    
}


function ajaxcall(url,method,data,callback) { 

    var ajaxCaller = new function () {

        this.beforeSend = function (xhr) {

        
            //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        };
        this.done = function (result, textStatus, jqXHR) {
          
            if (result.Error) {

            } else {
                if (callback)
                    callback(result);
            }
        };

        this.fail = function (jqXHR, textStatus, errorThrown) {
           

            if (jqXHR.status == 0) {


            } else {

                if (errorThrown == "Unauthorized") {

                    return;
                }
                if (callback)
                    callback({
                        Error: 'error'
                    });
            }
            if (callback)
                callback({
                    result: 'error'
                });
           // console.log({Error: textStatus + ":" + errorThrown});
            try {

            } catch (e) {

            }


        };
    };

    ajaxCaller.beforeSend;
    $.ajax({
        url: url,
        type: method,
        async: true,
        headers: {'Content-Type':'application/json'},
        dataType: "json",
        data: JSON.stringify(data),
        beforeSend: ajaxCaller.beforeSend
    }).done(ajaxCaller.done).fail(ajaxCaller.fail);

}
function signin() {
    var assoid, adminuid, password;
    assoid = $(".assoID").val();
    adminuid = $(".adminUID").val();
    password = $(".usrPass").val();
    //alert(adminuid + "  " + password);
    if (assoid == '') {
        $('.assoID').css('border-bottom', '1px solid red');
    }
    else if (adminuid == '') {
        $('.adminUID').css('border-bottom', '1px solid red');
    }
    else if (password == '') {
        $('.usrPass').css('border-bottom', '1px solid red');
    }
    if (assoid != '') {
        $('.assoID').css('border-bottom', '1px solid green');
    }
    if (adminuid != '') {
        $('.adminUID').css('border-bottom', '1px solid green');
    }
    if (password != '') {
        $('.usrPass').css('border-bottom', '1px solid green');
    }
    localStorage.setItem("ASSOID", assoid);
    
    if (assoid != '' && adminuid != '' && password != '') { 
        $('#logload').css("display", "block");
        var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/associationlogin";
        var method = "POST";
        var data = {
            "associationId":assoid,
            "adminUid":adminuid,
            "password":password
        };
        ajaxcall(url, method, data, function (response) {
            console.log(response);
            if (response.status == 1) {
                localStorage.setItem("userName", response.userName);// this is Association/Organization name
                $('#logload').css("display", "none");
                /*-------------------------------------------------*/
                var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getassociationheaderlogo";
                var method = "POST";
                var data = {
                    "associationId": assoid
                };
                ajaxcall(url, method, data, function (response) {
                    console.log(response);
                    if (response.status == 1) {
                        console.log(response.fileUrl);
                        var llogo = '<img src='+response.fileUrl+' height="100%">';
                        //$(".logoholder").html(llogo);
                        localStorage.setItem("secondtimeLogodisplay", llogo);
                        //alert(localStorage.getItem("secondtimeLogodisplay"));
                        location.href = "Association_dashboard.html";
                    }
                    else {
						location.href = "Association_dashboard.html";
					}
                })
            /*-------------------------------------------------*/
                
            }
            else { 
                $('#logload').css("display", "none");
                $("#errLogin").html(response.message);
            }
           
        })
    }    
}
function signinQmePortal() { 
    var username, password;
    username = $(".QMeusrName").val();
    password = $(".QMeusrPass").val();
    //alert(username+"    "+password);
    if (username == '') {
        $('.QMeusrName').css('border-bottom', '1px solid red');
    }
    else if (password == '') {
        $('.QMeusrPass').css('border-bottom', '1px solid red');
    }
    if (username != '') {
        $('.QMeusrName').css('border-bottom', '1px solid green');
    }
    if (password != '') {
        $('.QMeusrPass').css('border-bottom', '1px solid green');
    }  
    if (username != '' && password != '') { 
        $('#logload').css("display", "block");
        var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/validateqmeusers";
        var method = "POST";
        var data = {
            "password": password,
            "username": username
        };
        
        ajaxcall(url, method, data, function (response) {
            console.log(response);
            if (response.status == 1) {
                localStorage.setItem("adminUsername",response.name);
                $('#logload').css("display", "none");
                location.href = "QMeportal_dashboard.html";
            }
            else { 
                $("#errLogin").html(response.message);
                $('#logload').css("display", "none");
            }
        })
    }
}
function getAllAssociations() {
    var qmetechmail = '';
    qmetechmail += '<button class="button button1" onClick="">';
    qmetechmail += 'Select Outgoing QMeTech Email';
    qmetechmail += '</button>';
    var uidpasswd = '';
    uidpasswd += '<button class="button button1" onClick="">';
    uidpasswd += 'Generate UID/PSWD';
    uidpasswd += '</button>';
    var x = '<table id="customers">';
    x += '<tr><th>Organization ID</th><th>Organization</th><th>Organization URL</th><th>Admin Name</th><th>Admin Email</th><th>Admin Phone</th><th>Admin UID</th><th>Admin Password</th></tr>';
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getallassociationsdetails";
    $('#logload').css("display", "block");
    $.get(url, function (response, status) {
        console.log(response);
        if ((response.associations).length > 0) {
            $("#outgoingqmetechmail").html(qmetechmail);
            $("#generateuidpasswd").html(uidpasswd);
            $.each(response.associations, function (k, v) {
                //console.log(v.associationName+(v.associationName).length);
                var str = (v.associationName).replace(/ /g,'%');
                
                x += '<tr onclick=makeTRClickable(\''+str+'\',\''+v.adminUid+'\',\''+v.pasword+'\',\''+v.adminEmail+'\',\''+v.organizationUrl+'\',\''+ v.adminName+'\',\''+ v.id+'\')><td width="9%">' + v.id + '</td>';
               
                x += '<td width="16%">' + v['associationName'] + '</td>';
                x += '<td>' + v.organizationUrl + '</td>';
                x += '<td>' + v.adminName + '</td>';
                x += '<td width="16%">' + v.adminEmail + '</td>';
                x += '<td>' + v.phoneNumber + '</td>';
                x += '<td>' + v.adminUid + '</td>';
                x += '<td>' + v.pasword + '</td>';
                //x += '<td><button class="button button5" onclick=createUidPasswd(\''+v.associationName+'\',\''+v.adminUid+'\')>Generate</button></td>';
                x+='</tr>';
               
            });
            x += '</table>';
            $(".headerMsg").html("Registered Organizations");
            $("#list2").html(x);
            $('#logload').css("display", "none");
        }
        else { 
            $(".headerMsg").html("No Organizations added yet");
            $('#logload').css("display", "none");
        } 
    });
}
function makeTRClickable(assoname,adminUid,adminpasswd,adminemail,organizationurl,adminname,orgid) {    
    //alert(assoname + adminUid);
    var ass = '';
    ass=assoname.replace(/%/g , " ");
    //alert(ass);
   var qmetechmail = '';
   qmetechmail += '<button class="button button2" onClick="">';
   qmetechmail += 'Select Outgoing QMeTech Email';
   qmetechmail += '</button>';
   var uidpasswd = '';
    if (adminUid != '') {
        uidpasswd += '<button class="button button1" onClick="">';
        uidpasswd += 'Generate UID/PSWD';
        uidpasswd += '</button>';
        $("#generateuidpasswd").html(uidpasswd);
        //alert('You already have Admin Uid and Password');
        var qmetechmail = '';
        //qmetechmail += '<button class="button button2">';
        qmetechmail += '<a class="button button2" href="https://mail.google.com/mail/?view=cm&fs=1&to=&su=Admin Details&body=Hi '+adminname+',%0a%0aPlease find the login details below%0a%0a%0a%0aAdmin UID: '+adminUid+'%0a%0aAdmin Password: '+adminpasswd+'%0a%0aAdmin Email: '+adminemail+'%0a%0aOrganization URL: '+organizationurl+'" style="color:#fff">Select Outgoing QMeTech Email</a>'; 
        //qmetechmail += 'Select Outgoing QMeTech Email';
        //qmetechmail += '</button>';
        $("#outgoingqmetechmail").html(qmetechmail);
    }
    else if (adminUid == "") { 
        uidpasswd += '<button class="button button2" onClick="createUidPass(\''+adminemail+'\',\''+adminname+'\',\''+organizationurl+'\',\''+orgid+'\')">';
        uidpasswd += 'Generate UID/PSWD';
        uidpasswd += '</button>'; 
        //$("#outgoingqmetechmail").html(qmetechmail);
        $("#generateuidpasswd").html(uidpasswd);
    } 
}

function createUidPass(adminEmail,adminName,organizationURL,orgid) {
   // alert('hello'+assoname);
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/generateadmindetails";
    var method = "POST";
    var data = {
        "associationId":orgid,
        "adminEmail":adminEmail,
        "adminName":adminName,
        "loginUrl":"http://qmequiz.s3-website-us-east-1.amazonaws.com"

    };
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            location.reload(true);
        }
        else { 
            location.reload(true);
            console.log(response.message);
        }
    })
}
function updateAssociation() { 
    var oldassoname, newassoname;
    oldassoname = $(".oldassoName").val();
    newassoname = $(".newassoName").val(); 
    if (oldassoname == '') {
        $('.oldassoName').css('border-bottom', '1px solid red');
    }
    else if (newassoname == '') {
        $('.newassoName').focus();
        $('.newassoName').css('border-bottom', '1px solid red');
    }
    $('#logload').css("display", "block");
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/updateassociationname";
    var method = "POST";
    var data = {
        "newName": newassoname,
        "oldName": oldassoname
    };
    
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
            $('#logload').css("display", "none");
        }
        else { 
            $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
            $('#logload').css("display", "none");
        }
       
    })


}
function getAllAssociationsforDelete() { 
                                            
    var x = '<table id="customers" align="center">';
    x += '<tr><th>Organization Name</th><th></th></tr>';
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getallassociations";
    $('#logload').css("display", "block");
    $.get(url, function(response, status){
        if ((response.associations).length > 0) {
            
            $.each(response.associations, function (k, v) {
                console.log(v.name);
                x += '<tr><td width="50%"><b>' + v.name + '</b></td><td  align="center"><a href="#ex1" class="btn btn-info btn-lg" rel="modal:open" onclick=getAssociationDelete(\''+v.name+'\');><span class="glyphicon glyphicon-trash"></span> Delete </a></td></tr>';   
            });
            x += '</table>';
            $(".headerMsg").html("Registered Organizations");
            $("#list4").html(x);
            $('#logload').css("display", "none");
        }
        else { 
            $(".headerMsg").html("No organizations added yet");
            $('#logload').css("display", "none");
        }
    });
}
function getAssociationDelete(assoname) { 
    var modalpopup = '';
    modalpopup += '<p style="color:#000">Are you sure you want to delete <b>'+assoname+'</b>?</p>';
    modalpopup += '<div style="padding-left:20%;"><a href="" rel="modal:close"><button class="buttonCancel">Cancel</button></a>';
    modalpopup += '<button class="buttonDelete" onclick="deleteAssociation(\''+assoname+'\')">Delete</button></div>';
    $("#ex1").html(modalpopup); 
}
function deleteAssociation(assoname) { 
    var modalpopup = '';
    modalpopup += '<p style="color:green;padding-left:20%;">Organization <b>'+assoname+'</b> is deleted.</p>';
    
    
    $('#logload').css("display", "block");
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/deleteassociation";
    var method = "POST";
    var data = {
        "associationName":assoname
    };
    
    ajaxcall(url, method, data, function (response) {
        console.log(response.status);
        $('#logload').css("display", "none");
        $("#ex1").html(modalpopup); 
        if (response.status == 1) {
            setTimeout(function () { 
            location.reload();
             }, 1000);
        }
        else { 
            $("#errLogin").html(response.message);
            $('#logload').css("display", "none");
        }
    })
}
function gettypeQuestion(elm) {
    var qtype = ($(elm).val());
    if (qtype == "mcq") {
        $("#noofalternativesFormcq").val('');
        $('#noofalternativesFormcq').attr('readonly', false);
        $('#noofalternativesFormcq').css('background-color' , '#fff');
    }
    else {
        $("#noofalternativesFormcq").val('0');
        $('#noofalternativesFormcq').attr('readonly', true);
        $('#noofalternativesFormcq').css('background-color' , '#D3D3D3');
    }
}
function createRace() { 
    var startTime = $(".startt").val();
    var endTime = $(".endd").val();
    var associationname = localStorage.getItem("userName");
    var ASSOID = localStorage.getItem("ASSOID");
    var racename = $("#raceName").val();  
    var rules = $("#rule").val();
    var noofexhibitors = $("#noofexhibitors").val();
    var maxnoofparticipants = $("#maxnoofparticipants").val();
    var noofcategories = $("#maxnoofcategories").val();
    var catagorySponsorSelect = $("#cataSponsorSelect option:selected").val();
    var noofDifficultylevels = $("#maxnoofDifficultylevels").val();
    var noofQuestionsdifficultylevels = $("#maxnoofQuestionsdifficultylevels").val();
    var typeofquestion = $("#typeofquestions option:selected").val();
    var noofalternativesFormcq = $("#noofalternativesFormcq").val();
    var hintsallowed = $("#cataHintsallowed option:selected").val();
    var imageVideoallowed = $("#cataImageVideoallowed option:selected").val();
    if(racename == '') {
        $('#raceName').css('border-bottom', '1px solid red');
    }
    else if (startTime == '') {
        $('.startt').css('border-bottom', '1px solid red');
    }
    else if (endTime == '') {
        $('.endd').css('border-bottom', '1px solid red');
    }
    else if(rules == '') {
        $('#rule').css('border-bottom', '1px solid red');
    }
    else if (noofexhibitors == '') {
        $('#noofexhibitors').css('border-bottom', '1px solid red');
    }
    else if (maxnoofparticipants == '') {
        $('#maxnoofparticipants').css('border-bottom', '1px solid red');
    }
    else if (noofcategories == '') {
        $('#maxnoofcategories').css('border-bottom', '1px solid red');
    }
    else if (catagorySponsorSelect=="Select") {
        $('#cataSponsorSelect').css('border-bottom', '1px solid red');
    }
    else if (noofDifficultylevels=='') {
        $('#maxnoofDifficultylevels').css('border-bottom', '1px solid red');
    }
    else if (noofQuestionsdifficultylevels=='') {
        $('#maxnoofQuestionsdifficultylevels').css('border-bottom', '1px solid red');
    }
    else if (typeofquestion=="") {
        $('#typeofquestions').css('border-bottom', '1px solid red');
    }
    else if (hintsallowed=="Select") {
        $('#cataHintsallowed').css('border-bottom', '1px solid red');
    }
    else if (imageVideoallowed=="Select") {
        $('#cataImageVideoallowed').css('border-bottom', '1px solid red');
    }
    if(racename != '') {
        $('#raceName').css('border-bottom', '1px solid #ccc');
    }
    if (startTime != '') {
        $('.startt').css('border-bottom', '1px solid #ccc');
    }
     if(endTime != '') {
        $('.endd').css('border-bottom', '1px solid #ccc');
    }
    if(rules != '') {
        $('#rule').css('border-bottom', '1px solid #ccc');
    }
    if (noofexhibitors != '') {
        $('#noofexhibitors').css('border-bottom', '1px solid #ccc');
    }
    if (maxnoofparticipants != '') {
        $('#maxnoofparticipants').css('border-bottom', '1px solid #ccc');
    }
    if (noofcategories!='') {
        $('#maxnoofcategories').css('border-bottom', '1px solid #ccc');
    }
    if (catagorySponsorSelect!="Select") {
        $('#cataSponsorSelect').css('border-bottom', '1px solid #ccc');
    }
    if (noofDifficultylevels!='') {
        $('#maxnoofDifficultylevels').css('border-bottom', '1px solid #ccc');
    }
    if (noofQuestionsdifficultylevels!='') {
        $('#maxnoofQuestionsdifficultylevels').css('border-bottom', '1px solid #ccc');
    }
    if (typeofquestion!="") {
        $('#typeofquestions').css('border-bottom', '1px solid #ccc');
    }
    if (hintsallowed!="Select") {
        $('#cataHintsallowed').css('border-bottom', '1px solid #ccc');
    }
    if (imageVideoallowed!="Select") {
        $('#cataImageVideoallowed').css('border-bottom', '1px solid #ccc');
    }
    if (startTime!=''&&endTime!=''&&racename!=''&&rules!=''&&noofexhibitors != ''&&maxnoofparticipants!=''&&noofcategories!=''&&catagorySponsorSelect!="Select"&&noofDifficultylevels!=''&&typeofquestion!=""&&hintsallowed!="Select"&&imageVideoallowed!="Select") { 
        //alert(noofcategories+"  "+catagorySponsorSelect+"   "+noofDifficultylevels+"  "+noofQuestionsdifficultylevels+"  "+typeofquestion+"  "+hintsallowed+"  "+imageVideoallowed);
          $('#logload').css("display", "block");
        var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/createrace";
             
    var method = "POST";
    var data = {
        "raceName":racename,
        "associationId": ASSOID,
        "raceRules": rules,
        "startDateTime": startTime,
        "endDateTime":endTime,
        "exhibitors":noofexhibitors,
        "noOfparticipants":maxnoofparticipants,
        "noOfcategory":noofcategories,
        "categorySponsor":catagorySponsorSelect,
        "noofDl":noofDifficultylevels,
        "noOfQuestions":noofQuestionsdifficultylevels,
        "questionType":typeofquestion,
        "hintsAllowed":hintsallowed,
        "imagesAllowed":imageVideoallowed,
        "noOfAlternatives":noofalternativesFormcq

    };
        ajaxcall(url, method, data, function (response) {
            console.log(response);
            if (response.status == 1) {
                $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
                $('#logload').css("display", "none");
            }
            else {
                $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
                $('#logload').css("display", "none");
            }
        });
    }    
}
function createTeam() { 
    var teamname = $("#teamnameId").val();
    var teampasswd = $("#teampasswdId").val();
    //var associationname = localStorage.getItem("userName");
    var ASSOID = localStorage.getItem("ASSOID");
    if (teamname == '') {
        $('#teamnameId').css('border-bottom', '1px solid red');
    }
    else if (teampasswd == '') {
        $('#teampasswdId').css('border-bottom', '1px solid red');
    }
    if (teamname != '') {
        $('#teamnameId').css('border-bottom', '1px solid #ccc');
    }
    if (teampasswd != '') {
        $('#teampasswdId').css('border-bottom', '1px solid #ccc');
    }
    if (teamname != '' && teampasswd != '') { 
        $('#logload').css("display", "block");
        var url = baseURL + "getactiverace";
        var method = "POST";
        var data = {
            "associationId": ASSOID
        }
        ajaxcall(url, method, data, function (response) {
            console.log(response);
            if (response.status == 1) {
                /*---------------If one race is active create team---------------*/
                var url = baseURL + "createteam";
                //var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/createteam";
                var method = "POST";
                var data = {
                    "teamName": teamname,
                    "password": teampasswd,
                    "associationId":ASSOID,
                    "raceId": response.eventId
                };
                    ajaxcall(url, method, data, function (response) {
                        console.log(response);
                        if (response.status == 1) {
                            $("#teamnameId").val('');
                            $("#teampasswdId").val('')
                            $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
                            $('#logload').css("display", "none");
                        }
                        else {
                            $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
                            $('#logload').css("display", "none");
                        }
                    });
                /*-------------------End----------------------*/
            } else {
                $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
                $('#logload').css("display", "none");
            }
        });
    }//end of team!=''   
}
function getAllTeams() { 
    var associationname = localStorage.getItem("userName");
    $('#logload').css("display", "block");
    var url = baseURL + "getactiverace";
    var method = "POST";
    var data = {
        "associationId": ASSOID
    }
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            /*---------------If one race is active get team details---------------*/
            var x = '<table id="customers" align:"center">';
            x += '<tr><th>Team No.</th><th>Team Name</th><th>Team Password</th></tr>';
            var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getteamdetails";
            $('#logload').css("display", "block");
        
            var method = "POST";
            var data = {
                "associationName": associationname,
                "raceId":response.eventId
            }; 
            ajaxcall(url, method, data, function (response) {
                console.log(response);
                if (response.teamDetails.length > 0) {
                    $.each(response.teamDetails, function (k, v) {
                        //x += '<tr><td width="20%">' + associationname + '</td>';
                        x += '<tr><td width="20%">' + (k + 1) + '</td>';
                        x += '<td >' + v.teamName + '</td>';
                        x += '<td >' + v.password + '</td></tr>';
                    });
                    x += '</table>';
                    $(".headerMsg").html("Registered Teams");
                    $("#listTeams").html(x);
                    $('#logload').css("display", "none");
                }
                else {
                    $(".headerMsg").html("No teams added yet");
                    $('#logload').css("display", "none");
                }
            });
            /*----------------------------End-----------------------------------------*/
        } else {
            $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
            $('#logload').css("display", "none");
        }
    });
}
function populateAssociations() { 
    var associationNames = '';
    associationNames += '<option>Registered Organizations</option>';
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getallassociations";
    $.get(url, function (response, status) {
        //console.log(response.associations);
        $('#logload').css("display", "block");
        if ((response.associations).length > 0) {
            
            $.each(response.associations, function (k, v) {
                //console.log(v.name);
                associationNames += '<option value="'+v.name+'">'+v.name+'</option>';
            });
            $("#allAssociations").html(associationNames);
            $('#logload').css("display", "none");
        }
        else { 
            alert('No associations added yet..');
        }
    });
}
function populateRacenames() { 
    var racenames = '';
    racenames += '<option>Select a race</option>';
    var associationname = localStorage.getItem("userName");
    $('#logload').css("display", "block");
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getracedetails";
    var method = "POST";
    var data = {
        "associationName": associationname,
    };
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if ((response.races).length > 0) {
            $.each(response.races, function (k, v) {
                racenames += '<option value="'+v.raceName+'" >'+v.raceName+'</option>';
            });
            
            $("#allRacenames").html(racenames);
            
            $('#logload').css("display", "none");
        }
        else {
            $('#logload').css("display", "none");
            alert('No races added yet');
        }
    })
}
function emptyMsg()
{
    $("#statusMsg").html('<h5 style="color:red;">Please Select a race</h5>');
}
function getRacename(elm)
{
    $("#statusMsg").html('');
    var x = '';
    var racename = $(elm).val();
    x += '<button class="button" onclick="savenewRacename(\''+racename+'\')">Save</button>';
    $("#savee").html(x);
}
function savenewRacename(rac)
{
    var associationname = localStorage.getItem("userName");
    var newracename = $("#newraceName").val();
    if (newracename=='')
    {
        $('#newraceName').css('border-bottom', '1px solid red');
    }  
    else if(newraceName!='')
    {
        $('#newraceName').css('border-bottom', '1px solid #ccc');
        if (rac != "Select a race") {
            //alert(associationname + " " + rac);
            $('#logload').css("display", "block");
            var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/updateracename";
            var method = "POST";
            var data = {
                "associationName":associationname,
                "oldRaceName":rac,
                "newRaceName":newracename
            };
            ajaxcall(url, method, data, function (response) {
                console.log(response);
                if (response.status == 1) {
                    $("#statusMsg").html('<h5 style="color:green;">'+(JSON.stringify(response.message)).replace(/"/g,"")+'</h5>');
                    $('#logload').css("display", "none");
                    location.reload(true);
                }
                else { 
                    $('#logload').css("display", "none");
                    $("#statusMsg").html('<h5 style="color:red;">'+(JSON.stringify(response.message)).replace(/"/g,"")+'</h5>');
                }
            })
        }
        else {
            $("#statusMsg").html('<h5 style="color:red;">Please Select a race</h5>');
        }
    }    
    
       
}
function getAssoname(elm) { 
    var assoname = ($(elm).val());
    localStorage.setItem("changeAssoname",assoname);
    var url ="https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getassociationadmindetails";
    $('#logload').css("display", "block");
    var method = "POST";
    var data = {
        "name": assoname
    }; 
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        $(".adminemail").val(response.associations.adminEmail);
        $(".adminname").val(response.associations.adminName);
        $(".phone1").val(response.associations.stdCode);
        $(".phone2").val(response.associations.secondNumber);
        $(".phone3").val(response.associations.phoneNumber);
        $(".adminurl").val(response.associations.organizationURL);
        $('#logload').css("display", "none");
    })
}
function updateAssociationdetails()
{
    var assoname = localStorage.getItem("changeAssoname");
    var changeAdminemail = $(".adminemail").val();
    var changeAdminname= $(".adminname").val();
    var phone1 = $(".phone1").val();
    var phone2 = $(".phone2").val();
    var phone3 = $(".phone3").val();
    var changeAdminurl = $(".adminurl").val();
    if (changeAdminemail!=''&&changeAdminname!=''&&changeAdminurl!='') {
        var url ="https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/updateassociationadmindetails";
        $('#logload').css("display", "block");
       
        var method = "POST";
        var data = {
                "name": assoname,
                "adminName": changeAdminname,
                "email": changeAdminemail,
                "stdCode": phone1,
                "secondNumber": phone2,
                "phoneNumber":phone3,
                "organizationUrl":changeAdminurl
        }; 
        ajaxcall(url, method, data, function (response) {
            if (response.status == 1) {
                $("#statusMsg").html('<h5 style="color:green;">' + (JSON.stringify(response.message)).replace(/"/g, "") + '</h5>');
                $('#logload').css("display", "none");
            }
            else { 
                $("#statusMsg").html('<h5 style="color:red;">'+(JSON.stringify(response.message)).replace(/"/g,"")+'</h5>');
                $('#logload').css("display", "none");
            }      
        }) 
    } else {
        $("#statusMsg").html('<h5 style="color:red;">Please select an organization</h5>');   
    }
}
function raceStatus() { 
    var associationname = localStorage.getItem("userName");
    $('#logload').css("display", "block");
    var x = '<table id="customers">';
    x += '<tr><th>Event Name</th><th>Event ID</th><th>End Time</th><th>Start Time</th><th>Status</th></tr>';
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getracedetails";
    var method = "POST";
    var data = {
        "associationName": associationname,
    };
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if ((response.races).length > 0) {
            $.each(response.races, function (k, v) {
                x += '<tr><td><b>' + v.raceName + '</b></td><td>' + v.raceId + '</td><td>' + v.endDateTime + '</td><td>' + v.startDateTime + '</td>';
                if (v.isenabled == 'Y') {
                    x += '<td><label class="switch"><input value="\'' + v.raceName + '\'" name="race" class="race-list" type="checkbox" id=chk' + k + ' checked><span class="slider round"></span></label></td>';
                    //localStorage.setItem("activeRaceID",v.raceId);
                    //alert(v.raceId+"in");
                } else { 
                    x += '<td><label class="switch"><input value="\'' + v.raceName + '\'" name="race" class="race-list" type="checkbox" id=chk' + k + '><span class="slider round"></span></label></td>';
                }    
                x += '</tr>';
            });
            x += '</table>';
            $(".headerMsg").html("Available events");
            $("#listRaces").html(x);
            $('#logload').css("display", "none");
        }
        else
        { 
            $(".headerMsg").html("No events available");
            $('#logload').css("display", "none");
        }    
        $('.race-list').on('change', function () {
            
            var togglestatus = $('.race-list').is(':checked');
            if (togglestatus == false)
            {
                togglestatus = 'N';
            }   
            else {
                togglestatus = 'Y';
            }
        /*-----------------AJAX call for setting one race----------*/
        var raceName = ($(this).attr("value")).replace(/'/g, "");
        var url ="https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/updateracestatus";
        $('#logload').css("display", "block");
        var method = "POST";
        var data = {
                "raceName": raceName,
                "associationName": associationname,
                "isEnabled": togglestatus
        }; 
        ajaxcall(url, method, data, function (response) {
        
            if (response.status == 1) {
                $("#statusMsg").html('<h5 style="color:green;">' + (JSON.stringify(response.message)).replace(/"/g, "") + '</h5>');
                $('#logload').css("display", "none");
                //location.reload();
                //localStorage.setItem("activeRaceID",v1.raceId);
                //alert(v.raceId+"out");
            }
            else { 
                $("#statusMsg").html('<h5 style="color:red;">'+(JSON.stringify(response.message)).replace(/"/g,"")+'</h5>');
                $('#logload').css("display", "none");
            }      
        })
            /*------------------------------------------------------------*/
        $('.race-list').not(this).prop('checked', false);  
        });
    })
}
function calenderPlot()
{
    $('#logload').css("display", "block");
    var x = '<table id="customers" align="center">';
    x += '<tr><th>Organization Details</th><th>Activities Status</th></tr>';
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/portalcalenderview";
    $('#logload').css("display", "block");
    $.get(url, function (response, status) {
        console.log(response.calenderView);
        $.each(response.calenderView, function (k, v) {
            x += '<tr><td width="50%"><b>Organization Name :</b> '+v.associationName+'<br><b>Race Name :</b> '+v.raceName+'<br><b>Race start time  :</b> '+v.startDateTime+'<br><b>Race end time :</b> '+v.endDateTime+'<br><b>Race ID :</b> '+v.raceId+'<br><br><b>Contact Person :</b> '+v.contactPerson+'<br><b>Email :</b> '+v.email+'<br><b>Phone No :</b> '+v.phoneNumber+'</td>';
            x += '<td align="center"><a onclick="showActivities(\''+v.associationId+'\')" style="cursor:pointer; text-decoration: underline;"><b>Activities</b></a></td></tr>';
        });
        x += '</table>';
        $(".calender").html(x);
        $('#logload').css("display", "none");
    });
}
function showActivities(assoid)
{
    localStorage.setItem("activitiesAssoID",assoid);
    location.href = "QMeportal_activities.html";
}
function showActivitiesdetails()
{
    var activitiesAssoID = localStorage.getItem("activitiesAssoID");
    //alert(activitiesAssoID);
}
function addCategory()
{
    $('#logload').css("display", "block");
    var ASSOID = localStorage.getItem("ASSOID");
    var url = baseURL+"getactiverace";
        var method = "POST";
        var data = {
            "associationId": ASSOID
            }
            
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            //alert(response.eventId);
            $('#logload').css("display", "none");
            /*---------------------If one race is active add category-------------------------------*/
            var categoryName = $("#cataName").val();
            if (categoryName == '') {
                $('#cataName').css('border-bottom', '1px solid red');
            }
            if (categoryName != '') {
                $('#cataName').css('border-bottom', '1px solid #ccc');
            }
            if (categoryName != '') { 
                $('#logload').css("display", "block");
                var url = baseURL+"addcategory";
                var method = "POST";
                var data = {
                    "name":categoryName,
                    "raceId": response.eventId
                };
                ajaxcall(url, method, data, function (response) {
                    console.log(response);
                    if (response.status == 1) {
                        $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
                        $("#cataName").val('');
                        $('#logload').css("display", "none");
                    }
                    else {
                        $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
                        $("#cataName").val('');
                        $('#logload').css("display", "none");
                    }
                });
            }
            /*---------------------------End------------------------------------*/
        }
        else {
            $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
            $('#logload').css("display", "none");
        }
   
    });    
}
function addDifficultyLevel()
{
    $('#logload').css("display", "block");
    var ASSOID = localStorage.getItem("ASSOID");
    var url = baseURL+"getactiverace";
        var method = "POST";
        var data = {
            "associationId": ASSOID
            }
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            $('#logload').css("display", "none");
            /*-------------If one race active add difficulty level--------------------*/
                var cataName = $("#categoryList option:selected").val();
                var difficultylevelName = $("#difficultylevelName").val();
                var quesvalue = $("#quesvalue").val();
                var hintPenalty = $("#hintPenalty").val();
                if (cataName == "Select Category") {
                    $("#statusMsg").html('<h5 style="color:red;">Please select a category.</h5>');
                }
                else
                if (difficultylevelName == '') {
                    $('#difficultylevelName').css('border-bottom', '1px solid red');
                }
                else if (quesvalue == '') {
                    $('#quesvalue').css('border-bottom', '1px solid red');
                }
                else if (hintPenalty == '') {
                    $('#hintPenalty').css('border-bottom', '1px solid red');
                }
                if (cataName != "Select Category") {
                    $("#statusMsg").html('');
                }
                if (difficultylevelName != '') {
                    $('#difficultylevelName').css('border-bottom', '1px solid #ccc');
                }
                if (quesvalue != '') {
                    $('#quesvalue').css('border-bottom', '1px solid #ccc');
                }
                if (hintPenalty != '') {
                    $('#hintPenalty').css('border-bottom', '1px solid #ccc');
                }
                if (cataName!="Select Category" &&difficultylevelName != '' && quesvalue != '' && hintPenalty != '') {
                    $('#logload').css("display", "block");
                   
                    var url = baseURL+"adddifficultylevel";
                    var method = "POST";
                    var data = {
                        "category":cataName,
                        "level": difficultylevelName,
                        "questionValue": quesvalue,
                        "hintPenelty": hintPenalty,
                        "raceId": response.eventId
                    };
                        
                    ajaxcall(url, method, data, function (response) {
                        console.log(response);
                        if (response.status == 1) {
                            $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
                            $("#difficultylevelName").val('');
                            $("#quesvalue").val('');
                            $("#hintPenalty").val('');
                            $('#logload').css("display", "none");
                        }
                        else {
                            $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
                            $("#difficultylevelName").val('');
                            $("#quesvalue").val('');
                            $("#hintPenalty").val('');
                            $('#logload').css("display", "none");
                        }
                    });
                }
            /*------------------------------End--------------------------------------*/
        }
        else {
            $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
            $('#logload').css("display", "none");
        }
    });
}
function createExhibitor() {
    $('#logload').css("display", "block");
    var ASSOID = localStorage.getItem("ASSOID");
    var url = baseURL+"getactiverace";
        var method = "POST";
        var data = {
            "associationId": ASSOID
            }
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            $('#logload').css("display", "none");
            /*-----------------If one race is active create Exhibitor------------*/
                var exhibitorName = $("#exhibitorName").val();
                var boothno = $("#boothnoID").val();
                var websiteURL = $("#urlID").val();
                var profile = $("#exhibitorProfileID").val();
                var title = $("#contactTitle option:selected").val();
                var contactname = $("#contactnameID").val();
                var countrycode = $("#phnID1").val();
                var areacode = $("#phnID2").val();
                var firstno = $("#phnID3").val();
                var lastno = $("#phnID4").val();
                var email = $("#emailID").val();
                
                if (exhibitorName == '') {
                    $('#exhibitorName').css('border-bottom', '1px solid red');
                }
                else if (boothno == '') {
                    $('#boothnoID').css('border-bottom', '1px solid red');
                }
                else if (websiteURL == '') {
                    $('#urlID').css('border-bottom', '1px solid red');
                }
                else if (profile == '') {
                    $('#exhibitorProfileID').css('border-bottom', '1px solid red');
                }
                else if (title == "") {
                    $('#contactTitle').css('border-bottom', '1px solid red');
                }
                else if (contactname == '') {
                    $('#contactnameID').css('border-bottom', '1px solid red');
                }
                else if (countrycode == '') {
                    $('#phnID1').css('border-bottom', '1px solid red');
                }
                else if (areacode == '') {
                    $('#phnID2').css('border-bottom', '1px solid red');
                }
                else if (firstno == '') {
                    $('#phnID3').css('border-bottom', '1px solid red');
                }
                else if (lastno == '') {
                    $('#phnID4').css('border-bottom', '1px solid red');
                }
                else if (email == '') {
                    $('#emailID').css('border-bottom', '1px solid red');
                }
                if (exhibitorName != '') {
                    $('#exhibitorName').css('border-bottom', '1px solid #ccc');
                }
                if (boothno != '') {
                    $('#boothnoID').css('border-bottom', '1px solid #ccc');
                }
                if (websiteURL != '') {
                    $('#urlID').css('border-bottom', '1px solid #ccc');
                }
                if (profile != '') {
                    $('#exhibitorProfileID').css('border-bottom', '1px solid #ccc');
                }
                if (title != "") {
                    $('#contactTitle').css('border-bottom', '1px solid #ccc');
                }
                if (contactname != '') {
                    $('#contactnameID').css('border-bottom', '1px solid #ccc');
                }
                if (countrycode != '') {
                    $('#phnID1').css('border-bottom', '1px solid #ccc');
                }
                if (areacode != '') {
                    $('#phnID2').css('border-bottom', '1px solid #ccc');
                }
                if (firstno != '') {
                    $('#phnID3').css('border-bottom', '1px solid #ccc');
                }
                if (lastno != '') {
                    $('#phnID4').css('border-bottom', '1px solid #ccc');
                }
                if (email != '') {
                    $('#emailID').css('border-bottom', '1px solid #ccc');
                }
                //alert(ASSOID + " " + activeRaceID);
                if (exhibitorName != '' && boothno!='' && websiteURL != '' && profile != '' && title != "" &&contactname != '' &&countrycode != '' && areacode != '' && firstno != '' && lastno!='' && email!='') {
                    //alert(exhibitorName +""+boothno+""+websiteURL+""+profile+""+title+""+contactname+""+countrycode+""+areacode+""+firstno+""+lastno+""+email);        
                    $('#logload').css("display", "block");
                    var url = baseURL + "addexhibitor";
                    var method = "POST";
                    var data = {
                        "associationId": ASSOID,
                        "raceId": response.eventId,
                        "exhibitorName": exhibitorName,
                        "boothNumber": boothno,
                        "url": websiteURL,
                        "profile": profile,
                        "contactName": contactname,
                        "contactTitle": title,
                        "countryCode": countrycode,
                        "areaCode": areacode,
                        "firstNumber": firstno,
                        "lastNumber": lastno,
                        "email": email
                    };
                    ajaxcall(url, method, data, function (response) {
                        console.log(response);
                        if (response.status == 1) {
                            $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
                            $('#logload').css("display", "none");
                        }
                        else {
                            $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
                            $('#logload').css("display", "none");
                        }
                    });
                }
            /*--------------------------End------------------------------*/
        }
        else {
            $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
            $('#logload').css("display", "none");
        }
    });
}
function getallCategories() {
    $('#logload').css("display", "block");
    var ASSOID = localStorage.getItem("ASSOID");
    var url = baseURL+"getactiverace";
        var method = "POST";
        var data = {
            "associationId": ASSOID
            }
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            //$('#logload').css("display", "none"); 
            /*----------------If one race is active, AJAX call to display all categories----------*/
            var allCata = '';
            allCata +='<option>Select Category</option>';
                var url = baseURL+"getassociationcategory";
                var method = "POST";
                var data = {
                    "raceId": response.eventId
                };
                ajaxcall(url, method, data, function (response) {
                    console.log(response);
                    if (response.status == 1) {
                        $('#logload').css("display", "none");
                        $.each(response.categoryList, function (k, v) {
                            allCata += '<option value='+v+'>'+v+'</option>'; 
                        });
                        $("#categoryList").html(allCata);
                    }
                    else {
                        $('#logload').css("display", "none");
                    }
                });
            /*-------------End----------------------*/
        }
        else {
            $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
            $('#logload').css("display", "none");   
        }
    });
}

function addSponsor() {
    var cataName = $("#categoryList option:selected").val();
    var yesno = $("#yesno option:selected").val();
    if (cataName == "Select Category") {
        $("#statusMsg").html('<h5 style="color:red;">Please select a category.</h5>');
    }
    else if (yesno =="Sponsored") {
        $("#statusMsg").html('<h5 style="color:red;">Select Yes or No.</h5>');
    }
    else {
        $("#statusMsg").html('');
        var cataName = $("#categoryList option:selected").val();
        var sponsorName = $("#sponsorName").val();
        if (sponsorName == '') {
            $('#sponsorName').css('border-bottom', '1px solid red');
        }
        if (sponsorName != '' && yesno!='') {
            $('#sponsorName').css('border-bottom', '1px solid #ccc');
            var ASSOID = localStorage.getItem("ASSOID");
            $('#logload').css("display", "block");
            var url = baseURL+"getactiverace";
                var method = "POST";
                var data = {
                    "associationId": ASSOID
                    }
            ajaxcall(url, method, data, function (response) {
                console.log(response);
                if (response.status == 1) {
                    /*---------------If one race is active add Sponsor---------------*/
                        var url = baseURL+"addsponsor";
                        var method = "POST";
                        var data = {                    
                        "associationId": ASSOID,
                        "raceId": response.eventId,
                        "category": cataName,
                        "sponsorName": sponsorName,
                        "isSponsored":yesno
                        };
                        ajaxcall(url, method, data, function (response) {
                            console.log(response);
                            if (response.status == 1) {
                                $('#logload').css("display", "none");
                                $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
                            }
                            else {
                                $('#logload').css("display", "none");
                                $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
                            }
                        });
                    /*------------End--------------------*/
                } else {
                    $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
                    $('#logload').css("display", "none");   
                }
            });
        }//end of sponsorName != ''
    }//end main else
}
function sendMessage()
{
    var ASSOID = localStorage.getItem("ASSOID");
    var subject = $("#subjectId").val();
    var message = $("#messageId").val();
    if (subject == '') {
        $("#subjectId").css('border-bottom', '1px solid red');
    }
    else if (message=='') {
        $("#messageId").css('border-bottom', '1px solid red');
    }
    if (subject != '') {
        $("#subjectId").css('border-bottom', '1px solid #ccc');
    }
    if (message != '') {
        $("#messageId").css('border-bottom', '1px solid #ccc');
    }
    if (subject != '' && message != '') {
        $('#logload').css("display", "block");
        var url = baseURL + "getactiverace";
        var method = "POST";
        var data = {
            "associationId": ASSOID
        }
        ajaxcall(url, method, data, function (response) {
            console.log(response);
            if (response.status == 1) {
                /*---------------If one race is active send message---------------*/
                var url = baseURL+"pushmessage";
                var method = "POST";
                var data = {                    
                    "eventName": response.eventName,
                    "subject": subject,
                    "text": message,
                    "associationId":ASSOID
                };
                ajaxcall(url, method, data, function (response) {
                    console.log(response);
                    if (response.status == 1) {
                        $('#logload').css("display", "none");
                        $("#subjectId").val('');
                        $("#messageId").val('');
                        $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
                    }
                    else {
                        $('#logload').css("display", "none");
                        $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
                    }
                });
                /*---------------------End------------------------------*/
            }
            else {
                $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
                $('#logload').css("display", "none");
            }
        });
    }//end of subjectId!=''     
}

function getExhibitorDetails() { 
    var associationname = localStorage.getItem("userName");
    var x = '<table id="customers">';
    x += '<tr><th>Exhibitor No.</th><th>Exhibitor Name</th><th>Booth No</th><th>Phone No.</th><th>Email</th><th>Name</th><th>EVent ID</th><th>Profile</th><th>URL</th></tr>';
    var url = baseURL + "getexhibitorsdetails";
    $('#logload').css("display", "block");
   
    var method = "POST";
    var data = {
        "associationId": ASSOID
    }; 
    ajaxcall(url, method, data, function (response) {
        console.log(response);
       if (response.exhibitors.length > 0) {
            $.each(response.exhibitors, function (k, v) {
                //x += '<tr><td width="20%">' + associationname + '</td>';
                x += '<tr><td>' + (k + 1) + '</td>';
                x += '<td >' + v.name + '</td>';
                x += '<td >' + v.boothNumber + '</td>';
                x += '<td >' + v.contactDetails + '</td>';
                x += '<td >' + v.contactEmail + '</td>';
                x += '<td >' + v.contactName + '</td>';
                x += '<td >' + v.eventId + '</td>';
                x += '<td >' + v.profile + '</td>';
                x += '<td >' + v.url + '</td></tr>';
            });
            x += '</table>';
            $(".headerMsg").html("Registered Exhibitors");
            $("#listExhibitors").html(x);
            $('#logload').css("display", "none");
        }
        else {
            $(".headerMsg").html("No Exhibitors added yet");
            $('#logload').css("display", "none");
        } 
    });
}