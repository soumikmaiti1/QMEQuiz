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
    addParticipant : function(){
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var uname = $("#uname").val();
        var title = $("#title").val();
        var assoName=localStorage.getItem("userName");
        var eml = $("#eml").val();
        var phn = $("#phn").val();
        var tmName = $("#tmName").val();
        var associationId=localStorage.getItem("ASSOID");
        $("#allFields").find("input").removeClass("alert-danger");
        
        if(fname == "")
        {
             $("#fname").addClass("alert-danger");
             $("#fname").focus();
            
        }else if(lname == "")
        {
            $("#lname").addClass("alert-danger");
             $("#lname").focus();
            
        }else if(uname == "")
        {
            $("#uname").addClass("alert-danger");
             $("#uname").focus();
        }else if(title == "")
        {
            $("#title").addClass("alert-danger");
             $("#title").focus();
            
        }else if(organizName == "")
        {
            $("#organizName").addClass("alert-danger");
             $("#organizName").focus();
        }else if(eml == "")
        {
             $("#eml").addClass("alert-danger");
             $("#eml").focus();
            
        }else if(phn == "")
        {
            $("#phn").addClass("alert-danger");
             $("#phn").focus();
            
        }
        /* else if (tmName == "")
        {
             $("#tmName").addClass("alert-danger");
             $("#tmName").focus();
        } */
        else
        {
 var fname = $("#fname").val();
        var lname = $("#lname").val();
        var uname = $("#uname").val();
        var title = $("#title").val();
        var organizName = $("#organizName").val();
        var eml = $("#eml").val();
        var phn = $("#phn").val();
        var tmName = $("#tmName").val();
            var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/addparticipant";
            var method = "POST";
            var data = {"firstName":fname,"lastName":lname,"userName":uname,"title":title,"organization":assoName,"email":eml,"phoneNumber":phn,"teamName":tmName,"associationId":associationId};
            
            $qme.ajaxcall(url,method,data,function(response){
                console.log(response);
                if (response.status == 1) {
                    $("#statusMsg").html('<h5 style="color:green;">' + (response.message).replace(/"/g, "") + '</h5>');
                    //$('#logload').css("display", "none");
                    $qme.responsemsg(response.message);
                }
                else { 
                    $("#statusMsg").html('<h5 style="color:red;">' + (response.message).replace(/"/g, "") + '</h5>');
                    //$('#logload').css("display", "none");
                    $qme.responsemsg(response.message);
                }
            });
            
            //alert("Thanks for add participant");
        }
        
        
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
    getAllParticipate:function(){
    var x = '<table id="customers">';
    x += '<tr><th>ID</th><th>Gamer Name</th><th>User Name</th><th>Email</th><th>Phone</th><th>Organization</th><th>Team</th><th>Select to assign team</th></tr>';
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getallgamersdetails";
    //$('#logload').css("display", "block");
    
    var method="POST";
    var data={"name":localStorage.getItem("userName")};
     $qme.ajaxcall(url,method,data,function(response){

        if ((response.gamers).length > 0) {
            
            $.each(response.gamers, function (k, v) {
                //console.log(v.associationName);
                x += '<tr><td>' + k + '</td>';
                x += '<td>' + v["title"] +" "+v["firstname"]+" "+v["lastName"]+ '</td>';
                x += '<td>' + v["userName"] + '</td>';
                x += '<td>' + v.email + '</td>';
                x += '<td>' + v.phoneNumber + '</td>';
                x += '<td>' + v.organization + '</td>';
                x += '<td>' + v.teamName + '</td>';
                x += '<td><select id=pp'+k+' onChange="assignTeamname(this,\''+v.email+'\')">';
                
                /*------------This API is for populating team name---------------------------*/
                var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getteamdetails";
                var method = "POST";
                var data = {
                    "associationName": localStorage.getItem("userName")
                }; 
                $qme.ajaxcall(url, method, data, function (response) {
                    console.log(response);
                    var z = '';
                    z += '<option>Select team</option>';

                    if (response.teamDetails.length >= 0) {
                        $.each(response.teamDetails, function (k1, v1) {
                            z+='<option>'+v1.teamName+'</option>';
                        });
                        $("#pp"+k).html(z);
                    }
                    else { 
                        $(".headerMsg").html("No teams available");
                    } 
                })
                 /*------------end---------------------------*/

                x += '</select></td>';
                if (v.teamName != '')
                {
                    x += '<td> <button class="button1" onclick="unassignTeam(\''+v.email+'\',\''+ v.teamName+'\')">Unassign team</button></td>';
                }
                else {
                    x += '<td> <button class="button" onclick="unassignTeam(\''+v.email+'\',\''+ v.teamName+'\')">Unassign team</button></td>';
                }
                
                x +='</tr>';
               
            });
            x += '</table>';
            $(".headerMsg").html("Available Participants");
            $("#list2gamer").html(x);
//            $('#logload').css("display", "none");
        }
        else { 
            $(".headerMsg").html("No Participant added yet");
//            $('#logload').css("display", "none");
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