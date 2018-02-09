function logoutAssociationportal() { 
    localStorage.clear();
    location.href = "Association_login.html";
}
function logoutQMeportal() { 
    localStorage.clear();
    location.href = "index.html";
}
function addAssociation() { 
    var assoname, username, password,adminname,email,phone,urll;
    assoname = $(".assoName").val();
    adminname= $(".adminName").val();
    email = $(".email").val();
    phone = $(".phone").val();
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
    else if (phone == '') {
        $('.phone').css('border-bottom', '1px solid red');
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
    if (phone != '') {
        $('.phone').css('border-bottom', '1px solid #ccc');
    }
    if (urll != '') {
        $('.urll').css('border-bottom', '1px solid #ccc');
    }
    if (assoname != '' && adminname != '' && email != '' && phone != '' && urll!='') { 
        $('#logload').css("display", "block");
        var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/addassociation";
        var method = "POST";
        var data = {
        "associationName": assoname,
        "adminName": adminname,
        "email": email,
        "phoneNumber": phone,
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
    localStorage.setItem("ASSOID",assoid);
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
                location.href = "Association_dashboard.html";
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
                
                x += '<tr onclick=makeTRClickable(\''+str+'\',\''+v.adminUid+'\',\''+v.pasword+'\',\''+v.adminEmail+'\',\''+v.organizationUrl+'\')><td width="9%">' + v.id + '</td>';
               
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
function makeTRClickable(assoname,adminUid,adminpasswd,adminemail,organizationurl) {    
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
        alert('You already have Admin Uid and Password');
        var qmetechmail = '';
        //qmetechmail += '<button class="button button2">';
        qmetechmail += '<a class="button button2" href="https://mail.google.com/mail/?view=cm&fs=1&to=&su=Admin Details&body=Admin UID: '+adminUid+'%0a%0aAdmin Password: '+adminpasswd+'%0a%0aAdmin Email: '+adminemail+'%0a%0aOrganization URL: '+organizationurl+'" style="color:#fff">Select Outgoing QMeTech Email</a>'; 
        //qmetechmail += 'Select Outgoing QMeTech Email';
        //qmetechmail += '</button>';
        $("#outgoingqmetechmail").html(qmetechmail);
    }
    else if (adminUid == "") { 
        uidpasswd += '<button class="button button2" onClick="createUidPass(\''+assoname+'\')">';
        uidpasswd += 'Generate UID/PSWD';
        uidpasswd += '</button>'; 
        //$("#outgoingqmetechmail").html(qmetechmail);
        $("#generateuidpasswd").html(uidpasswd);
    } 
}

function createUidPass(assoname) {
   // alert('hello'+assoname);
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/generateadmindetails";
    var method = "POST";
    var data = {
        "associationName":assoname
    };
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            location.reload(true);
        }
        else { 
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
             }, 2000);
        }
        else { 
            $("#errLogin").html(response.message);
            $('#logload').css("display", "none");
        }
    })
}
function createRace() { 
    var startTime = $(".startt").val();
    var endTime = $(".endd").val();
    var associationname=localStorage.getItem("userName");
    var racename = $("#raceName").val();  
    var rules = $("#rule").val();
    if (startTime == '') {
        $('.startt').css('border-bottom', '1px solid red');
    }
    else if(endTime == '') {
        $('.endd').css('border-bottom', '1px solid red');
    }
    else if(racename == '') {
        $('#raceName').css('border-bottom', '1px solid red');
    }
    else if(rules == '') {
        $('#rule').css('border-bottom', '1px solid red');
    }
    if (startTime != '') {
        $('.startt').css('border-bottom', '1px solid #ccc');
    }
     if(endTime != '') {
        $('.endd').css('border-bottom', '1px solid #ccc');
    }
    if(racename != '') {
        $('#raceName').css('border-bottom', '1px solid #ccc');
    }
    if(rules != '') {
        $('#rule').css('border-bottom', '1px solid #ccc');
    }
    if (startTime!=''&&endTime!=''&&racename!=''&&rules!='') { 
    $('#logload').css("display", "block");
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/createrace";
    var method = "POST";
    var data = {
        "raceName":racename,
        "associationName": associationname,
        "rules": rules,
        "startDateTime": startTime,
        "endDateTime":endTime

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
}
function createTeam() { 
    var teamname = $("#teamnameId").val();
    var teampasswd = $("#teampasswdId").val();
    var associationname=localStorage.getItem("userName");
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
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/createteam";
    var method = "POST";
    var data = {
        "teamName": teamname,
        "password": teampasswd,
        "associationName": associationname
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
}
function getAllTeams() { 
    var associationname = localStorage.getItem("userName");
    var x = '<table id="customers">';
    x += '<tr><th>Association Name</th><th>Team Name</th><th>Team Password</th></tr>';
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getteamdetails";
    $('#logload').css("display", "block");
   
    var method = "POST";
    var data = {
        "associationName": associationname
    }; 
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.teamDetails.length >= 0) {
            $.each(response.teamDetails, function (k, v) {
                x += '<tr><td width="20%">' + associationname + '</td>';
                x += '<td >' + v.teamName + '</td>';
                x += '<td >' + v.password + '</td></tr>';
            });
            x += '</table>';
            $(".headerMsg").html("Available teams");
            $("#listTeams").html(x);
            $('#logload').css("display", "none");
        }
        else { 
            $(".headerMsg").html("No teams added yet");
            $('#logload').css("display", "none");
        } 
    })
}
function populateAssociations() { 
    var associationNames = '';
    associationNames += '<option>Select an Organization</option>';
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
function getRacename(elm)
{
    var x = '';
    var racename = $(elm).val();
    x += '<button class="button" onclick="savenewRacename(\''+racename+'\')">Save</button>';
    $("#savee").html(x);
    
    
}
function savenewRacename(rac)
{
    var associationname = localStorage.getItem("userName");
    if (rac != "Select a race") {
        alert(associationname + " " + rac);
    }
    else {
        alert("Please Select a race");
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
        $(".adminphone").val(response.associations.phoneNumber);
        $(".adminurl").val(response.associations.organizationURL);
        $('#logload').css("display", "none");
    })
}
function updateAssociationdetails()
{
    var assoname = localStorage.getItem("changeAssoname");
    var changeAdminemail = $(".adminemail").val();
    var changeAdminname= $(".adminname").val();
    var changeAdminphone = $(".adminphone").val();
    var changeAdminurl = $(".adminurl").val();
    var url ="https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/updateassociationadmindetails";
    $('#logload').css("display", "block");
   
    var method = "POST";
    var data = {
            "name": assoname,
            "adminName": changeAdminname,
            "email": changeAdminemail,
            "phoneNumber": changeAdminphone,
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
}
function raceStatus() { 
    var associationname=localStorage.getItem("userName");
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
                    //localStorage.setItem("prevraceName",v.raceName);
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
            
        /*-----------------AJAX call for setting one race----------*/
        var raceName = ($(this).attr("value")).replace(/'/g, "");
          
            
        var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getracedetails";
        var method = "POST";
        var data = {
            "associationName": associationname,
        };
                ajaxcall(url, method, data, function (response) {
                    if ((response.races).length > 0) {
                        $.each(response.races, function (k, v) {  /*Marker Loop100*/
                                if (v.raceName == raceName) {
                                        var url ="https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/updateracestatus";
                                        $('#logload').css("display", "block");

                                        var method = "POST";
                                        var data = {
                                                "raceName": raceName,
                                                "associationName": associationname,
                                                "isEnabled": 'Y'
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
                                    }
                                else
                                { 
                                        var url ="https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/updateracestatus";
                                        $('#logload').css("display", "block");
                                            var method = "POST";
                                            var data = {
                                                    "raceName": v.raceName,
                                                    "associationName": associationname,
                                                    "isEnabled": 'N'
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
                                }    
                                            });//end Marker Loop100 
                                    }
                                })
            /*------------------------------------------------------------*/
        $('.race-list').not(this).prop('checked', false);  
        });
    })
}



