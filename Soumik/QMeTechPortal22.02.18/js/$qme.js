var baseURL = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/";   
$qme = {
    showloader:function(){
        $("#logload").show();
    },
    hideloader:function(){
        $("#logload").hide();
    },
    clearval:function(){
        $("#allFields").find("input").each(function (i, v) { $(v).val(''); });
        hh();
    },
    addParticipant: function () {
        var ASSOID = localStorage.getItem("ASSOID");
        $('#logload').css("display", "block");
        var url = baseURL + "getactiverace";
        var method = "POST";
        var data = {
            "associationId": ASSOID
        }
        ajaxcall(url, method, data, function (response) {
            console.log(response);
            if (response.status == 1) {
                /*---------------If one race is active Add participant---------------*/
                var fname = $("#fname").val();
                var lname = $("#lname").val();
                var uname = $("#uname").val();
                var title = $("#contactTitle option:selected").val();
                var assoName=localStorage.getItem("userName");
                var eml = $("#eml").val();
                var phn = $("#phn").val();
                var tmName = $("#tmName").val();
                var associationId=localStorage.getItem("ASSOID");
                $("#allFields").find("input").removeClass("alert-danger");
                if(title == "Select")
                {
                    $('#contactTitle').css('border-bottom', '1px solid red');
                }
                else if(fname == "")
                {
                    $('#fname').css('border-bottom', '1px solid red');
                    
                }else if(lname == "")
                {
                    $('#lname').css('border-bottom', '1px solid red');
                    
                }else if(uname == "")
                {
                    $('#name').css('border-bottom', '1px solid red');
                }else if(eml == "")
                {
                    $('#eml').css('border-bottom', '1px solid red');
                    
                }else if(phn == "")
                {
                    $('#phn').css('border-bottom', '1px solid red');
                }
                if(title != "Select")
                {
                    $('#contactTitle').css('border-bottom', '1px solid #ccc');
                }
                if(fname != "")
                {
                    $('#fname').css('border-bottom', '1px solid #ccc');
                    
                }
                if (lname != "")
                {
                    $('#lname').css('border-bottom', '1px solid #ccc');
                    
                }
                if (uname != "")
                {
                    $('#name').css('border-bottom', '1px solid #ccc');
                }
                if (eml != "")
                {
                    $('#eml').css('border-bottom', '1px solid #ccc');
                    
                }
                if (phn != "")
                {
                    $('#phn').css('border-bottom', '1px solid #ccc');
                }    
                if(fname!=''&&lname!=''&&uname!=''&&eml!=''&&phn!='')
                {   
                    $('#logload').css("display", "block");
                    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/addparticipant";
                    var method = "POST";
                    var data = {
                        "firstName": fname,
                        "lastName": lname,
                        "userName": uname,
                        "title": title,
                        "organization": assoName,
                        "email": eml,
                        "phoneNumber": phn,
                        "teamName": tmName,
                        "associationId": associationId,
                        "raceId":response.eventId
                    };
                    
                    $qme.ajaxcall(url,method,data,function(response){
                        console.log(response);
                        if (response.status == 1) {
                            $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
                            $('#logload').css("display", "none");
                            $qme.responsemsg(response.message);
                        }
                        else { 
                            $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
                            $('#logload').css("display", "none");
                            $qme.responsemsg(response.message);
                        }
                    });
                }
                /*----------------------------End---------------------------------------*/
            } else {
                $('#logload').css("display", "none");
                $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
            }
        });
    
    },
    
    ajaxcall:function(url,method,data,callback) { 

    var ajaxCaller = new function () {

        this.beforeSend = function (xhr) {

        $qme.showloader();
            //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        };
        this.done = function (result, textStatus, jqXHR) {
          $qme.hideloader();  
          
            if (result.Error) {

            } else {
                if (callback)
                    callback(result);
            }
        };

        this.fail = function (jqXHR, textStatus, errorThrown) {
           $qme.hideloader(); 

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

},

   
    responsemsg:function(msg){
        $("#resMsg").html(msg);
        $('#myModal').modal();
        $qme.clearval();
    },
    getAllParticipate: function () {
        var associationname = localStorage.getItem("userName");
        var ASSOID=localStorage.getItem("ASSOID");
        $('#logload').css("display", "block");
        var url = baseURL + "getactiverace";
        var method = "POST";
        var data = {
            "associationId": ASSOID
        }
        ajaxcall(url, method, data, function (response) {
            console.log(response.eventId);
            if (response.status == 1) {
                /*---------------If one race is active get Participant details---------------*/
                var x = '<table id="customers">';
                x += '<tr><th>Participant</th><th>User Name</th><th>Email</th><th>Phone</th><th>Team</th><th>Assign Team</th><th>Unassign <br>Team</th></tr>';
                var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getallgamersdetails";
                //$('#logload').css("display", "block");
                
                var method="POST";
                var data = {
                    "name": localStorage.getItem("userName"),
                    "raceId":response.eventId
                };
                 $qme.ajaxcall(url,method,data,function(response){
                     
                    if (response.status == "1") {
                        $.each(response.gamers, function (k, v) {
                            //console.log(v.associationName);
                            x += '<td width="10%">' +v["firstname"]+" "+v["lastName"]+ '</td>';
                            x += '<td width="10%">' + v["userName"] + '</td>';
                            x += '<td width="15%">' + v.email + '</td>';
                            x += '<td width="15%">' + v.phoneNumber + '</td>';
                            //x += '<td>' + v.organization + '</td>';
                            x += '<td width="15%">' + v.teamName + '</td>';
                            x += '<td  width="15%"><select id=pp'+k+' onChange="assignTeamname(this,\''+v.email+'\')">';
                            
                            /*------------This API is for populating team name---------------------------*/
                            
                            var ASSOID=localStorage.getItem("ASSOID");
                            $('#logload').css("display", "block");
                            var url = baseURL + "getactiverace";
                            var method = "POST";
                            var data = {
                                "associationId": ASSOID
                            }
                            ajaxcall(url, method, data, function (response) {
                                console.log(response.eventId);
                                if (response.status == 1) {
                                    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getteamdetails";
                                    var method = "POST";
                                    var data = {
                                        "associationName": localStorage.getItem("userName"),
                                        "raceId":response.eventId
                                    }; 
                                    $qme.ajaxcall(url, method, data, function (response) {
                                        console.log(response + "bbbbbbb");
                                        var z = '';
                                        z += '<option>Select team</option>';
                    
                                        if (response.teamDetails.length >= 0) {
                                            $.each(response.teamDetails, function (k1, v1) {
                                                z += '<option>' + v1.teamName + '</option>';
                                            });
                                            $("#pp" + k).html(z);
                                        }
                                        else {
                                            $(".headerMsg").html("No teams available");
                                        }
                                    });
                                    
                                }
                            });
                            
                             /*------------end---------------------------*/
            
                            x += '</select></td>';
                            if (v.teamName != '')
                            {
                                //x += '<td> <button class="button1" onclick="unassignTeam(\''+v.email+'\',\''+ v.teamName+'\')">Unassign team</button></td>';
                                x += '<td width="7%" align="center"> <img src="images/unassign.png" height="30px" width="30px" onclick="unassignTeam(\''+v.email+'\',\''+ v.teamName+'\')"></td>';
                            }
                            else {
                                x += '<td width="7%" align="center"> <img src="images/assign.png" height="30px" width="30px" onclick="unassignTeam(\''+v.email+'\',\''+ v.teamName+'\')"></td>';
                               // x += '<td> <button class="button" onclick="unassignTeam(\''+v.email+'\',\''+ v.teamName+'\')">Unassign team</button></td>';
                            }
                            x +='</tr>';
                           
                        });
                        x += '</table>';
                        $(".headerMsg").html("Registered Participants");
                        $("#list2gamer").html(x);
            //            $('#logload').css("display", "none");
                    }
                    else { 
                        $(".headerMsg").html("No Participant added yet");
            //            $('#logload').css("display", "none");
                    }
                });
                /*---------------------------------End-------------------------------------------*/
            }
            else {
                $('#logload').css("display", "none");
                $("#statusMsg").html('<h5 style="color:red;">No Participants Registered for this race.</h5>');
            }
        });

    }
};
function assignTeamname(elm,email) { 
    var teamname = ($(elm).val());
    var ASSOID=localStorage.getItem("ASSOID");
    //alert(teamname + email + ASSOID);
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/assignteams";
            var method = "POST";
            var data = {
                "participantEmail": email,
                "associationId": ASSOID,
                "teamName":teamname
            }; 
            $qme.ajaxcall(url, method, data, function (response) {
                console.log(response);
                if (response.status == 1) {
                    $("#statusMsg").html('<h5 style="color:green;">' + (JSON.stringify(response.message)).replace(/"/g, "") + '</h5>');
                    setTimeout(function(){ location.reload(); }, 1000);
                 }
                 else { 
                    $("#statusMsg").html('<h5 style="color:red;">' + (JSON.stringify(response.message)).replace(/"/g, "") + '</h5>');   
                 } 
            })
}
function unassignTeam(email, teamname) { 
    if (teamname != '')
    {
        var ASSOID=localStorage.getItem("ASSOID");
        var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/unassignteam";
            var method = "POST";
            var data = {
                "participantEmail": email,
                "associationId": ASSOID
            }; 
            $qme.ajaxcall(url, method, data, function (response) {
                console.log(response);
                if (response.status == 1) {
                    $("#statusMsg").html('<h5 style="color:green;">' + (JSON.stringify(response.message)).replace(/"/g, "") + '</h5>');
                    setTimeout(function(){ location.reload(); }, 1000);
                 }
                 else { 
                    $("#statusMsg").html('<h5 style="color:red;">' + (JSON.stringify(response.message)).replace(/"/g, "") + '</h5>');   
                 } 
            })
    }
    else {
        $("#statusMsg").html('<h5 style="color:red;">' + "No team is assigned" + '</h5>');      
    }
}
function populateTeamNames() {
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
            var x = '<option value="">Select Team</option>';
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
                        x += '<option value='+v.teamName+'>' + v.teamName + '</option>';
                    });
                    $("#tmName").html(x);
                    $('#logload').css("display", "none");
                }
                else {
                    $('#logload').css("display", "none");
                }
            });
            /*----------------------------End-----------------------------------*/
        } else {
            $("#statusMsg").html('<h5 style="color:red;">Please activate atleast one race to continue.</h5>');
            $('#logload').css("display", "none");
        }
    });
}