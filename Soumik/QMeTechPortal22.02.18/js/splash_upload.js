var associationID = localStorage.getItem("ASSOID");
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

function upload_splash() {  
    var file = '';
    var fileChooser = document.getElementById('file-chooser');  
    if (fileChooser.value == '')
    {
        $("#statusMsg").html('<h5 style="color:red;">Please upload SplashScreen</h5>');       
    }
    else
    {
        $("#statusMsg").html('');    
        file = fileChooser.files[0];
        var fileExtension = (fileChooser.files.item(0).type);
        var n = fileExtension.indexOf("/");
        fileExtension=fileExtension.substring(n + 1)
        fileExtension = '.' + fileExtension;
        var flag = 0;
        var allowed_extensions = [ ".jpeg", ".png", ".jpg"];
        for(var i = 0; i <allowed_extensions.length; i++)
        {
            if(allowed_extensions[i]==fileExtension)
            {
                flag = 1;
                break;
            }
            else {
                flag = 0;
            }
        }
        if (flag == 1) {
            var _URL = window.URL || window.webkitURL;
            var img = new Image();
            img.src = _URL.createObjectURL(file);
            var ssize = file.size;
            img.onload = function () {
                //alert(this.width + " " + this.height + " " + ssize);
                if( this.height>this.width){// Portrait image upload
                    if ((this.width >= 200 && this.height >= 320) && (this.width <= 1080 && this.height <= 1920)) {
                        if (ssize <= 2097152) {
                            $('#logload').css("display", "block");
                            var file = fileChooser.files[0];
                            if (file) {
                                AWS.config.update({
                                    "accessKeyId": "AKIAIDM5BLPOZ7ENN4GQ",
                                    "secretAccessKey": "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",
                                    "region": "us-west-2"
                                });
                                var s3 = new AWS.S3();
                                var params = {
                                    Bucket: 'qmequizbackend',
                                    Key: associationID + '-splashScreen',
                                    ContentType: fileExtension,
                                    Body: file,
                                    ACL: 'public-read'
                                };
                                s3.putObject(params, function (err, res) {
                                    if (err) {
                                        alert("Error uploading data: ", err);
                                        $('#logload').css("display", "none");
                                    } else {
                                        //alert("Successfully uploaded data");
                                        /*---------------Call AJAX to upload file with ID--------------------*/
                                        
                                        var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/uploadsplashscreen";
                                        var method = "POST";
                                        var data = {
                                            "associationId": associationID
                                        };
                                        ajaxcall(url, method, data, function (response) {
                                            console.log(response);
                                            if (response.message == 1) {
                                                $("#statusMsg").html('<h5 style="color:green;">' + (JSON.stringify(response.status)).replace(/"/g, "") + '</h5>');
                                                $('#logload').css("display", "none");
                                                /*============Show the uploaded image after 2 seconds=====================*/
                                                setTimeout(function () {
                                                    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getassociationsplashscreen";
                                                    var method = "POST";
                                                    var data = {
                                                        "associationId": associationID
                                                    };
                                                    ajaxcall(url, method, data, function (response) {
                                                        console.log(response);
                                                        if (response.status == 1) {
                                                            location.reload();
                                                            var llogo = '<img src=' + response.fileUrl + ' height="auto" width="100%">';
                                                            $(".splashimg").html(llogo);
                                                        }
                                                        else {
                
                                                        }
                                                    })
                                                }, 2000);
                                                /*==============End===================*/
                                            }
                                            else {
                                                $('#logload').css("display", "none");
                                                $("#statusMsg").html('<h5 style="color:red;">' + (JSON.stringify(response.status)).replace(/"/g, "") + '</h5>');
                                            }
                                                
                                        })
                                        /*---------------End ---------------------*/
                                    }
                                });
                            } else {
                                alert('Nothing to upload.');
                            }
                        }//file size checking 
                        else {
                            $("#statusMsg").html('<h5 style="color:red;">File size exceeds it&#39;s max limit.</h5>');
                        }
                    }//image width/height checking    
                    else {
                        $("#statusMsg").html('<h5 style="color:red;">Image resolution must fit within specified limit.</h5>');
                    }
                }//end of only Portrait image upload
                else {
                        $("#statusMsg").html('<h5 style="color:red;">Please upload portratit image only.</h5>');
                }
            }//end img.onload()
        }//end if for flag==1
        else {
            $("#statusMsg").html('<h5 style="color:red;">Please upload a valid image file.</h5>');
            //$('#file-chooser').css('border-bottom', '1px solid red');
        }
        }    
        
}
function normalDisplaySplash() { 
    $('#logload').css("display", "block");
    var url = "https://ph3oc4vgi0.execute-api.us-west-2.amazonaws.com/dev/getassociationsplashscreen";
    var method = "POST";
    var data = {
        "associationId": associationID
    };
    ajaxcall(url, method, data, function (response) {
        console.log(response);
        if (response.status == 1) {
            var llogo = '<img src='+response.fileUrl+' height="100%">';
            $(".splashimg").html(llogo);
            $('#logload').css("display", "none");
        }
        else {
            $('#logload').css("display", "none");
        }
    })
}