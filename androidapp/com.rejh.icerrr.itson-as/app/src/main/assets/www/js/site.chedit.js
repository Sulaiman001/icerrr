if(!site){var site={};}
site.chedit={};site.chedit.init=function(station_id_to_edit,askedAboutStationName,askedAboutNowplaying,checkedPlayability,isPlayable){loggr.debug("------------------------------------");loggr.debug("site.chedit.init()");site.ui.hideloading();site.lifecycle.add_section_history("#editstation");site.ui.gotosection("#editstation");$("#editstation input[name='station_url']")[0].onchange=function(evt){site.chedit.askedAboutNowplaying=false;site.chedit.checkedPlayability=false;site.chedit.isPlayable=false;site.chedit.stationUrlChanged=true;if(!$("#editstation input[name='station_name']")[0].value){site.ui.showtoast("Checking stream...");$("#editstation .actions .save").css("display","block");site.chedit.check(true,true);}}
$("#editstation img.station_icon")[0].onchange=function(evt){if(!$("#editstation input[name='station_icon']")[0].value){$("#editstation img.station_icon").attr("src",$("#editstation input[name='station_icon']")[0].value.trim());}}
site.chedit.stationUrlChanged=false;if(station_id_to_edit){site.chedit.isNewStation=false;var station_info=site.data.stations[site.helpers.session.getStationIndexById(station_id_to_edit)];$("#editstation .actions .save").css("display","block");$("#editstation .actions .trash").css("display","block");$("#editstation .station_icon_wrap").css("display","block");$("#editstation .station_name_wrap").css("display","block");$("#editstation input[name='station_id']")[0].value=station_id_to_edit;$("#editstation input[name='station_name']")[0].value=station_info.station_name;$("#editstation input[name='station_url']")[0].value=station_info.station_url;if(station_info.station_url_highquality){}else{}
$("#editstation input[name='station_icon']")[0].value=station_info.station_icon;site.chedit.newentry={station_id:station_id_to_edit,station_edited:station_info.station_edited,station_name:station_info.station_name,station_url:station_info.station_url,station_icon:station_info.station_icon,station_image:station_info.station_icon,station_host:station_info.station_host,station_port:station_info.station_port,station_path:station_info.station_path,station_country:station_info.station_country,station_bitrate:station_info.station_bitrate}
$("#editstation img.station_icon").attr("src",$("#editstation input[name='station_icon']")[0].value.trim());$("#editstation img.station_icon")[0].onclick=function(){loggr.error(" > chicon.init()",{dontupload:true});site.chicon.init($("#editstation input[name='station_id']")[0].value.trim());}}else if(station_id_to_edit===false){site.chedit.isNewStation=true;$("#editstation .actions .save").css("display","none");$("#editstation .actions .trash").css("display","none");$("#editstation .station_icon_wrap").css("display","none");$("#editstation .station_name_wrap").css("display","none");$("#editstation input[name='station_id']")[0].value="";$("#editstation input[name='station_name']")[0].value="";$("#editstation input[name='station_url']")[0].value="";$("#editstation input[name='station_url_hq']")[0].value="";$("#editstation #chedit_station_url_hq").css("display","none");$("#editstation input[name='station_icon']")[0].value="";$("#editstation img.station_icon").attr("src","img/icons-80/ic_station_default.png");$("#editstation img.station_icon").off("click");$("#editstation img.station_icon")[0].onclick=function(){loggr.error(" > chedit.searchicon() (1)",{dontupload:true});site.ui.showtoast('One moment...');site.chedit.searchicon();}
site.chedit.newentry={};}else{loggr.warn(" > !station_id_to_edit but it's not false?");$("#editstation .actions .save").css("display","none");$("#editstation .actions .trash").css("display","none");$("#editstation .station_icon_wrap").css("display","none");$("#editstation .station_name_wrap").css("display","none");$("#editstation input[name='station_id']")[0].value="CUSTOM."+site.helpers.genUniqueStationId(station_name).replace(" ","_");$("#editstation #chedit_station_url_hq").css("display","none");$("#editstation img.station_icon").attr("src","img/icons-80/ic_station_default.png");$("#editstation img.station_icon").off("click");$("#editstation img.station_icon")[0].onclick=function(){loggr.error(" > chedit.searchicon() (2)",{dontupload:true});site.ui.showtoast('One moment...');site.chedit.searchicon();}}
site.chedit.askedAboutStationName=askedAboutStationName;site.chedit.askedAboutNowplaying=askedAboutNowplaying;site.chedit.checkedPlayability=checkedPlayability;site.chedit.isPlayable=isPlayable;}
site.chedit.onpause=function(){loggr.log("site.chedit.onpause()");}
site.chedit.onresume=function(){loggr.log("site.chedit.site.home.()");}
site.chedit.save=function(){loggr.log("site.chedit.save()");var isNewStation=false;if($("#editstation input[name='station_id']")[0].value){site.chedit.newentry.station_id=$("#editstation input[name='station_id']")[0].value.trim();}
else{isNewStation=true;}
site.chedit.newentry.tmp=0;if(!site.chedit.newentry.station_edited){loggr.log(" > site.chedit.newentry.station_edited = {};");site.chedit.newentry.station_edited={};}
site.chedit.newentry.station_icon_local=null;site.chedit.newentry.station_image_local=null;site.chicon.updateLockscreenArtworkData(site.chedit.newentry);site.chedit.changesHaveBeenMade=true;var originalStationIfAny=site.data.stations[site.helpers.session.getStationIndexById(site.chedit.newentry.station_id)];if(originalStationIfAny){for(var key in site.chedit.newentry){if(site.chedit.newentry[key]!=originalStationIfAny[key]){site.chedit.newentry.station_edited[key]=new Date().getTime();}}}else{loggr.warn(" > !originalStationIfAny, are we sure?");}
try{var alarmsChanged=false;for(var i=0;i<site.session.alarms.length;i++){var alarm=site.session.alarms[i];if(alarm.station.station_id==site.chedit.newentry.station_id){loggr.warn(" -> Update alarm.station: "+alarm.station.station_id+" for alarm: "+i,{dontsave:true});site.session.alarms[i].station=site.chedit.newentry;alarmsChanged=true;}else{continue;}}
if(alarmsChanged){site.helpers.storeSession();}}catch(e){loggr.warn(" > Could not check alarms: "+e);}
loggr.log(" > Changes:");loggr.log(site.helpers.arrToString(site.chedit.newentry.station_edited,1,"\n"));var addstations=[site.chedit.newentry];var newstations=site.helpers.mergeStations(site.data.stations,addstations,true);site.data.stations=newstations;site.storage.writefile(site.cfg.paths.json,"stations.json",JSON.stringify(site.data.stations),function(evt){site.helpers.flagdirtyfile(site.cfg.paths.json+"/stations.json");site.chedit.changesHaveBeenMade=true;site.ui.showtoast("Saved!");if(isNewStation){site.chlist.setStarred(site.chedit.newentry.station_id);site.chedit.changesHaveBeenMadeGotoStarred=true;site.chedit.init(site.chedit.newentry.station_id,site.chedit.askedAboutStationName,site.chedit.askedAboutNowplaying,site.chedit.checkedPlayability,site.chedit.isPlayable);}
site.helpers.uploadStation(site.chedit.newentry);},function(e){alert("Error writing to filesystem: "+site.storage.getErrorType(e));loggr.log(site.storage.getErrorType(e));});}
site.chedit.remove=function(){loggr.log("site.chedit.remove()");if(!confirm("Are you sure you want to remove this station?\n\nThis can't be undone easily.")){return;}
var station_id=$("#editstation input[name='station_id']")[0].value.trim();if(site.session.alarms){loggr.log(" > Lookup station_id: '"+station_id+"'");var alarmsToBeRemoved=[];for(var i=0;i<site.session.alarms.length;i++){var alarm=site.session.alarms[i];loggr.log(" >> "+alarm.station.station_id);if(alarm.station.station_id==station_id){alarmsToBeRemoved.push(alarm);}}
loggr.log(" > Found "+alarmsToBeRemoved.length+" alarm(s)");if(alarmsToBeRemoved.length>0){var yesRemoveAlarms=confirm("You have "+alarmsToBeRemoved.length+" alarm(s) set for this station. These will be removed if you continue. Are you sure?");if(!yesRemoveAlarms){return;} 
for(var i=0;i<alarmsToBeRemoved.length;i++){var alarm=alarmsToBeRemoved[i];if(!alarm||!alarm.station){continue;}
loggr.log(" > Remove alarm: "+alarm.station.station_id);site.alarms.newAlarmCfg=alarm;site.alarms.remove(true);}}}
if(site.session.currentstation_id==station_id){site.session.currentstation_id=null;site.session.currentstation=null;}
var stationIndex=site.helpers.session.getStationIndexById(station_id);if(stationIndex<0){site.ui.showtoast("Huh? Could not find station..?");return;}
if(site.chlist.isStarred(station_id)){site.chlist.unsetStarred(station_id);}
loggr.log(" > Build new stations list...");var newstations=[];for(var i in site.data.stations){if(!site.data.stations[i]){continue;}
if(!site.data.stations[i].station_name){continue;}
if(site.data.stations[i].station_id!=station_id){newstations.push(site.data.stations[i]);}}
site.data.stations=newstations;site.storage.writefile(site.cfg.paths.json,"stations.json",JSON.stringify(site.data.stations),function(evt){site.helpers.flagdirtyfile(site.cfg.paths.json+"/stations.json");site.chedit.changesHaveBeenMade=true;site.ui.showtoast("Removed!");site.chedit.changesHaveBeenMade=true;site.chlist.init(true);},function(e){alert("Error writing to filesystem: "+site.storage.getErrorType(e));loggr.log(site.storage.getErrorType(e));});}
site.chedit.check=function(findStationName,silent){if(site.chedit.isChecking){return;}
if(site.chedit.timeout_checking){clearTimeout(site.chedit.timeout_checking);}
site.chedit.timeout_checking=setTimeout(function(){site.chedit.isChecking=false;},500);site.chedit.isChecking=true;loggr.log("site.chedit.check()");$("#editstation input").trigger("blur");var station_id=$("#editstation input[name='station_id']")[0].value.trim();var station_name=$("#editstation input[name='station_name']")[0].value.trim();var station_url=$("#editstation input[name='station_url']")[0].value.trim();var station_icon=$("#editstation input[name='station_icon']")[0].value.trim();if(findStationName){station_name=site.helpers.getUniqueID();}
if(!station_name){site.ui.showtoast("Station name is mandatory");site.ui.hideloading();return;}
if(!station_url){site.ui.showtoast("Station url is mandatory");site.ui.hideloading();return;}
if(site.data.stations&&!station_id){for(var i in site.data.stations){if(!site.data.stations[i].station_name){continue;}
if(station_name.toLowerCase()==site.data.stations[i].station_name.toLowerCase()){alert("A station with name '"+station_name+"' already exists. Please change it.");site.ui.hideloading();return;}}}else{}
if(site.data.stations&&!station_id){for(var i in site.data.stations){if(!site.data.stations[i].station_url){continue;}
if(station_url.toLowerCase()==site.data.stations[i].station_url.toLowerCase()){alert("A station with this url already exists: '"+site.data.stations[i].station_name+"'");site.ui.hideloading();return;}}}else{}
if(!site.chedit.newentry){site.chedit.newentry={};}
site.chedit.newentry.station_id="CUSTOM."+site.helpers.genUniqueStationId(station_name).replace(" ","_");site.chedit.newentry.station_name=station_name;site.chedit.newentry.station_icon=station_icon;site.chedit.newentry.station_image=station_icon;site.chedit.newentry.station_country=""
site.chedit.newentry.station_bitrate="-1 kbps"
site.chedit.newentry.station_icon_local=null;site.chedit.newentry.station_image_local=null;site.chicon.updateLockscreenArtworkData(site.chedit.newentry);site.chedit.changesHaveBeenMade=true;site.ui.showtoast("One moment please...");site.chedit.check_station_url(station_name,station_url,silent);}
site.chedit.check_station_url=function(station_name,station_url,silent,playlistChecked,isPlaylist){loggr.log("site.chedit.check_station_url()");if(!site.chedit.stationUrlChanged){loggr.warn(" > !site.chedit.stationUrlChanged, skip check_station_url");site.chedit.check_station_icon(silent);return; }
site.ui.showloading("Wait","Validating station...");var stationHostPortAndPath=site.chedit.getStationHostPortAndPath(station_name,station_url);var station_host=stationHostPortAndPath.host;var station_port=stationHostPortAndPath.port;var station_path=stationHostPortAndPath.path;var apiqueryobj={"get":"station_info","station_id":"TMP."+site.helpers.genUniqueStationId(station_name).replace(" ","_"),"station_host":station_host,"station_port":station_port,"station_path":station_path}
var apiaction="get";var apiquerystr=JSON.stringify(apiqueryobj);site.webapi.exec(apiaction,apiquerystr,function(data){loggr.log(JSON.stringify(data["data"]));if(!data["data"]["content-type"]){site.ui.hideloading();if(!silent){site.ui.showtoast("Err: Icerrr cannot verify station url");}}else{if(data["data"]["content-type"].indexOf("audio/mpeg")<0&&data["data"]["content-type"].indexOf("audio/aacp")<0&&data["data"]["content-type"].indexOf("audio/x-mpegurl")<0&&data["data"]["content-type"].indexOf("audio/")<0&&data["data"]["content-type"].indexOf("audio%2F")<0&&!site.chedit.isPlayable){loggr.log(" > Webapi cannot read metadata, test if playable at all...");if(site.chedit.checkedPlayability==station_url){site.ui.showtoast("Sorry, doesn't work");site.ui.hideloading();return;}
site.chedit.checkedPlayability=station_url;site.chedit.testStationPlayable(station_url,function(){site.chedit.isPlayable=true;var conf;if(site.chedit.askedAboutNowplaying){conf=true;}
else{conf=confirm("Icerrr can not read the station's metadata but it can play the stream. 'Now playing' info will not be available. Continue?");site.chedit.askedAboutNowplaying=true;}
if(conf){site.chedit.stationUrlChanged=false;site.chedit.newentry.station_url=$("#editstation input[name='station_url']")[0].value.trim();site.chedit.newentry.station_host=station_host;site.chedit.newentry.station_port=station_port;site.chedit.newentry.station_path=station_path;site.chedit.newentry.tmp={};site.chedit.newentry.tmp.station_info=data["data"];site.chedit.check_station_icon(silent);}else{site.ui.hideloading();if(!silent){site.ui.showtoast("Err: Icerrr cannot verify station url");}}},function(){if(data["data"]["content-type"].indexOf("text")>=0||data["data"]["content-type"].indexOf("audio/x-mpegurl")>=0){loggr.log(" > Playlist detected(?), parse it...");site.chedit.parsePlaylist(station_url,station_name,function(){site.chedit.check_station_url(station_name,$("#editstation input[name='station_url']")[0].value,silent,true);});return;}
site.ui.hideloading();if(!silent){site.ui.showtoast("Err: Icerrr cannot verify station url");}});return;}
var isShoutcast=false;if(data["data"]["icy-notice1"]){if(data["data"]["icy-notice1"].toLowerCase().indexOf("shoutcast")>=0){isShoutcast=true;}}
if(data["data"]["icy-notice2"]){if(data["data"]["icy-notice2"].toLowerCase().indexOf("shoutcast")>=0){isShoutcast=true;}}
if(isShoutcast){var url=$("#editstation input[name='station_url']")[0].value.trim();var lastchar=url.substr(-1);if(lastchar!=";"){loggr.log(" > Detected shoutcast, append ';' to url..");if(lastchar=="/"){url+=";";}else{url+="/;";}
$("#editstation input[name='station_url']")[0].value=url;}}
if(!silent){site.ui.hideloading();site.ui.showtoast("Station url verified!");}
if(data["data"]["icy-name"]&&!$("#editstation input[name='station_name']")[0].value.trim()){site.chedit.newentry.station_name=site.helpers.capAll(data["data"]["icy-name"]);$("#editstation input[name='station_name']")[0].value=site.helpers.capAll(data["data"]["icy-name"]);site.chedit.askedAboutStationName=true;}else
if(data["data"]["icy-name"]&&!site.chedit.askedAboutStationName){if(site.helpers.capAll(data["data"]["icy-name"])!=site.chedit.newentry.station_name){if(confirm("We found the following Station name:\n'"+site.helpers.capAll(data["data"]["icy-name"])+"'.\n\nWould you like to apply it?")){site.chedit.newentry.station_name=site.helpers.capAll(data["data"]["icy-name"]);$("#editstation input[name='station_name']")[0].value=site.helpers.capAll(data["data"]["icy-name"]);}
site.chedit.askedAboutStationName=true;}}
site.chedit.newentry.station_url=$("#editstation input[name='station_url']")[0].value.trim();site.chedit.newentry.station_host=data["data"]["queryj"]["host"];site.chedit.newentry.station_port=data["data"]["queryj"]["port"];site.chedit.newentry.station_path=data["data"]["queryj"]["path"];site.chedit.newentry.tmp={};site.chedit.newentry.tmp.station_info=data["data"];site.chedit.check_station_icon(silent);$("#editstation .station_name_wrap").css("display","block");}},function(error){site.ui.hideloading();if(error.message){site.ui.showtoast(error.message);loggr.log(error.message);}
else{loggr.log(error);}});}
site.chedit.check_station_icon=function(silent){loggr.log("site.chedit.check_station_icon()");var newentry=site.chedit.newentry;var station_name=$("#editstation input[name='station_name']")[0].value.trim();var station_url=$("#editstation input[name='station_url']")[0].value.trim();var station_icon=$("#editstation input[name='station_icon']")[0].value.trim();var img=document.createElement("img");img.onload=function(){site.ui.hideloading();$("#editstation img.station_icon").attr("src",$("#editstation input[name='station_icon']")[0].value.trim());newentry.station_icon_local=null;newentry.station_image_local=null;site.chicon.updateLockscreenArtworkData(newentry);site.chedit.changesHaveBeenMade=true;loggr.log(" > All good :D");site.chedit.save();}
img.onerror=function(evt){if(station_name){loggr.log(" > Search the google :D");site.chedit.searchicon();}else{site.ui.hideloading();}}
img.src=site.helpers.urlAddCachebust(station_icon)}
site.chedit.searchicon=function(){loggr.log("site.chedit.searchicon()");$("#editstation input[name='station_icon']")[0].value="http://www.rejh.nl/icerrr/img/web_hi_res_512_002.jpg";site.chedit.check();}
site.chedit.parsePlaylist=function(station_url,station_name,cb,cberr){var apiqueryobj={"get":"parse_playlist","url":station_url}
var apiaction="get";var apiquerystr=JSON.stringify(apiqueryobj);site.webapi.exec(apiaction,apiquerystr,function(data){var url=data["data"];if(url.toLowerCase().indexOf("<")>=0||url.toLowerCase().indexOf(">")>=0){site.ui.showtoast("Err: Icerrr cannot verify station url");site.ui.hideloading();if(cberr){cberr({error:1,message:"Unknown data"});}
return;}
site.chedit.newentry.station_url=url;$("#editstation input[name='station_url']")[0].value=url;if(cb){cb();}},function(error){site.ui.showtoast("Err: Icerrr cannot verify station url");site.ui.hideloading();if(error.message){site.ui.showtoast(error.message);loggr.log(error.message);}
else{loggr.log(error);}
if(cberr){cberr(error);}});}
site.chedit.getStationHostPortAndPath=function(station_name,station_url){loggr.log("site.chedit.getStationHostPortAndPath()");var station_host=station_url;var station_port=80;var station_path="";if(station_host.indexOf("http://")>=0){station_host=station_host.substr("http://".length);}else if(station_host.indexOf("https://")>=0){station_host=station_host.substr("https://".length);}
if(station_host.indexOf("/")>0&&station_host.indexOf(":")>0){station_port_end=station_host.indexOf("/")-station_host.indexOf(":")-1;station_path=station_host.substr(station_host.indexOf("/"));}else if(station_host.indexOf("/")<0&&station_host.indexOf(":")>0){station_port_end=station_host.length-station_host.indexOf(":")-1;station_path="/";}else{station_port_end=station_host.length-station_host.indexOf(":")-1;}
if(station_host.indexOf(":")>=0){station_port=station_host.substr(station_host.indexOf(":")+1,station_port_end);station_host=station_host.substr(0,station_host.indexOf(":"));}else if(station_host.indexOf("/")>=0){station_path=station_host.substr(station_host.indexOf("/"));station_host=station_host.substr(0,station_host.indexOf("/"));}
loggr.log(" > Host: "+station_host);loggr.log(" > Port: "+station_port);loggr.log(" > Path: "+station_path);return{"host":station_host,"port":station_port,"path":station_path};}
site.chedit.testStationPlayable=function(station_url,cb,cberr){loggr.log("site.chedit.testStationPlayable()");if(site.chedit.isTestingPlayable){return;}
site.chedit.isTestingPlayable=true;loggr.log(" > "+station_url);var mediaPlayer=new Media(station_url,function(){},function(error){if(!site.chedit.isTestingPlayable){return;}
loggr.warn(" > Station is not working");loggr.log(" > Error: "+site.mp.getErrorByCode(error.code));site.chedit.isTestingPlayable=false;mediaPlayer.stop();mediaPlayer.release();if(site.chedit.station_test_timeout){clearTimeout(site.chedit.station_test_timeout);}
setTimeout(function(){if(cberr){cberr();}},1);},function(status){loggr.log(" > Status: "+status);switch(status){case Media.MEDIA_RUNNING:if(site.chedit.station_test_timeout){clearTimeout(site.chedit.station_test_timeout);}
mediaPlayer.stop();mediaPlayer.release();site.chedit.changesHaveBeenMade=true;setTimeout(function(){if(cb){cb();}},1);site.chedit.isTestingPlayable=false;}});mediaPlayer.play();if(site.chedit.station_test_timeout){clearTimeout(site.chedit.station_test_timeout);}
site.chedit.station_test_timeout=setTimeout(function(){loggr.warn(" > Station is not working");loggr.log(" > Timed out");site.chedit.isTestingPlayable=false;mediaPlayer.stop();mediaPlayer.release();setTimeout(function(){if(cberr){cberr();}},1);},10000);}
site.chedit.info=function(){loggr.debug("site.chedit.info()");var station_id=$("#editstation input[name='station_id']")[0].value.trim();var station=site.helpers.session.getStationById(station_id);if(!station){navigator.notification.alert("Sorry, something went wrong..",function(){},"Station Info","OK");return; }
var text="Station: \n"+station.station_name
var text_station_url="\n\nStation url: \n"+station.station_url;if(station.station_url_highquality){text_station_url+="\nStation url (HQ): \n"+station.station_url_highquality;}
text=text+text_station_url;navigator.notification.alert(text,function(){},"Station Info","OK");}