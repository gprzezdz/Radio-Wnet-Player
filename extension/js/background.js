var arrayLista = {};
var arrayHistoria = {};
$(document).ready(function () {


    wnetPlayer = document.getElementById("wnetPlayer");
    var Stream = localStorage["stream"];

    arrayHistoria = localStorage["historia"];
    if (arrayHistoria !== "")
    {
        arrayHistoria = JSON.parse(arrayHistoria);
    }
    if (Stream === undefined)
    {
        arrayLista["0" ] = {id: "0", eter_id: "1043", name: "Radio Wnet", title: "Aktualny poranek", attachment_content_type: "audio/mp3", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream", url: "http://radiownet.pl"};
    } else if (Stream === "64")
    {
        arrayLista["0" ] = {id: "0", eter_id: "1043", name: "Radio Wnet", title: "Aktualny poranek", attachment_content_type: "audio/mp3", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream64", url: "http://radiownet.pl"};
    } else if (Stream === "32")
    {
        arrayLista["0" ] = {id: "0", eter_id: "1043", name: "Radio Wnet", title: "Aktualny poranek", attachment_content_type: "audio/mp3", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream32", url: "http://radiownet.pl"};
    } else {
        arrayLista["0" ] = {id: "0", eter_id: "1043", name: "Radio Wnet", title: "Aktualny poranek", attachment_content_type: "audio/mp3", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream", url: "http://radiownet.pl"};
    }
    hist_czas();
    setInterval(function () {
        hist_czas();
    }, 3000);
//    1043
//    console.log = function () {
    //  }

});
var panelSubAll = "sub";
var dokumentPanel;
var wnetPlayer;
var currentPlayID = "0";
var playLista;


var panelPlayer;
var elemZero;
var seekSlider;
var currentEter = "2064";
var panel_lista;

function setPanelSubAll($par)
{
    panelSubAll = $par;
}

function getPanelSubAll()
{
    return panelSubAll;
}

function setDokumentPanel($par)
{
    dokumentPanel = $par;
}
function getCurrentPlayElement()
{
    return arrayLista[getCurrentPlayID()];
}

function setSeekSlider($par)
{
    seekSlider = $par;
}

function getCurrentTime()
{
    return parseInt(wnetPlayer.currentTime);
}

function setCurrentTime($par)
{
    wnetPlayer.currentTime = $par;
}
function getDuration()
{
    return parseInt(wnetPlayer.duration);
}
function setVolume($par)
{
    wnetPlayer.volume = $par / 100;
}
function getVolume()
{
    if (wnetPlayer.volume === 1)
        wnetPlayer.volume = 35 / 100;
    return wnetPlayer.volume * 100;
}
function setElemZero($par)
{
    elemZero = $par;
}
function getElemZero()
{
    return elemZero;
}
function setPanelPlayer($par)
{
    panelPlayer = $par;
    panelPlayer.find("#volume").slider({
        min: 0,
        max: 100,
        value: 0,
        range: "min",
        animate: true,
        slide: function (event, ui) {
        }
    });
    panelPlayer.find("#button_play").mouseover({
        button: "play"
    }, hoverPanelPlayerIn);
    panelPlayer.find("#button_play").mouseout({
        button: "play"
    }, hoverPanelPlayerOut);
    panelPlayer.find("#button_pause").mouseover({
        button: "pause"
    }, hoverPanelPlayerIn);
    panelPlayer.find("#button_pause").mouseout({
        button: "pause"
    }, hoverPanelPlayerOut);
    panelPlayer.find("#button_stop").mouseover({
        button: "stop"
    }, hoverPanelPlayerIn);
    panelPlayer.find("#button_stop").mouseout({
        button: "stop"
    }, hoverPanelPlayerOut);
}
function getPanelPlayer()
{
    return panelPlayer;
}
function setCurrentPlayID($par)
{
    currentPlayID = $par;
}
function getCurrentPlayID()
{

    if (currentPlayID === "")
        currentPlayID = "0";
    return currentPlayID;
}

function getWnetPlayerStatus()
{

    if (wnetPlayer.paused && wnetPlayer.currentTime === 0)
    {
        return "stoped";
    }
    if (wnetPlayer.paused)
    {
        return "paused";
    }
    return "playing";
}

function setPlay()
{
    if (!(getWnetPlayerStatus() === "paused" || getWnetPlayerStatus() === "stoped"))
        return;
    if (getCurrentPlayID() === "0" && (getWnetPlayerStatus() === "stoped" || getWnetPlayerStatus() === "paused"))
    {
        //console.log("zzzz: " + arrayLista["0"].audio_file_name);
        wnetPlayer.src = arrayLista["0"].audio_file_name;
        wnetPlayer.load();
    }
    //console.log(wnetPlayer);
    wnetPlayer.play();
    if (getCurrentPlayID() === "0")
    {
        seekSlider.slider("option", "value", 0);
        seekSlider.slider("option", "max", 0);
        panelPlayer.find("#current_title").text(arrayLista["0"].title);
        panelPlayer.find("#current_autor").html('<a href="#"   style="text-decoration:none;"> <span style="font-weight: bold;">' + arrayLista["0"].name + '</span></a>');
        panelPlayer.find("#current_logo").empty();
        panelPlayer.find("#current_logo").append("<img width=\"55px\" src=\"" + arrayLista["0"].avatar_file_name + "\">");
    } else
    {
        panelPlayer.find("#current_title").text(arrayLista[getCurrentPlayID()].title);
        panelPlayer.find("#current_autor").html('<a href="#"  style="text-decoration:none;"><span style="font-weight: bold;">' + arrayLista[getCurrentPlayID()].name + '</span></a>');
        panelPlayer.find("#current_logo").empty();
        panelPlayer.find("#current_logo").append("<img width=\"55px\" src=\"" + arrayLista[getCurrentPlayID()].avatar_file_name + "\">");
        seekSlider.slider("option", "value", wnetPlayer.currentTime);
        seekSlider.slider("option", "max", wnetPlayer.duration);
        arrayLista[getCurrentPlayID()].hist_czas = $.now();
        arrayLista[getCurrentPlayID()].currentTime = 0;

        arrayHistoria[getCurrentPlayID() + ""] = arrayLista[getCurrentPlayID()];

    }
    ustawPlay();
}

function clickCurrent()
{

    ustalPanelLista(panel_lista, arrayLista[getCurrentPlayID()].eter_id);
}

function setStop()
{
    wnetPlayer.pause();
    wnetPlayer.currentTime = 0;
    seekSlider.slider("option", "value", 0);
    ustawStop();
}
function setPause()
{

    wnetPlayer.pause();
    ustawPause();
}


function getAktualnieNaAntenie($par_tytul, $par_tytul_next, $par_curr_od, $par_next_od)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.radiownet.pl/wnetplayer/MobileAppApi/getCurrentBroadcastInfo.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var resp = JSON.parse(xhr.responseText);
            if (resp.broadcasts[0] === undefined)
            {
                arrayLista["0"] = "Aktualnie na antenie";
                panelPlayer.find("#current_logo").empty();
                panelPlayer.find("#current_logo").append("<img width=\"55px\" src=\"" + arrayLista[getCurrentPlayID()].avatar_file_name + "\">");
                panelPlayer.find("#current_autor").html('<a href="#"  style="text-decoration:none;"><span style="font-weight: bold;">' + arrayLista[getCurrentPlayID()].name + '</span></a>');
                return $par_tytul.html("");
            }
            arrayLista["0"].title = resp.broadcasts[0].title;
            $par_tytul.html(resp.broadcasts[0].title);
            $par_curr_od.html(resp.broadcasts[0].start_formatted);
            if (resp.broadcasts[1] === undefined)
            {
                return $par_tytul.html("");
            }
            $par_tytul_next.html(resp.broadcasts[1].title);
            $par_next_od.html(resp.broadcasts[1].start_formatted);
        }
        panelPlayer.find("#current_title").text(arrayLista[getCurrentPlayID()].title);



        panelPlayer.find("#current_logo").empty();
        panelPlayer.find("#current_logo").append("<img width=\"55px\" src=\"" + arrayLista[getCurrentPlayID()].avatar_file_name + "\">");
        panelPlayer.find("#current_autor").html('<a href="#"  style="text-decoration:none;"><span style="font-weight: bold;">' + arrayLista[getCurrentPlayID()].name + '</span></a>');


    }
    xhr.send();
}


function setArrayLiasta(par_id, par_arr)
{
    arrayLista[par_id] = par_arr;
}


function clickPlayListElement(event)
{
    arrayLista[event.data.arr.id] = event.data.arr;
    if (event.data.arr.attachment_content_type === null || event.data.arr.attachment_content_type.toLowerCase().indexOf("audio") === -1)
    {
        $.each(arrayLista, function (key, arr) {
            playLista.find("#playListElement_" + arr.id + "").css("background-color", "transparent");
        });
        playLista.find("#playListElement_" + event.data.arr.id + "").css("background-color", "#ffdb9c");
        window.open(event.data.arr.url);
        return;
    }
    playLista.find("#playListElement_" + event.data.arr.id + "").css("background-color", "#ffdb9c");
    if (getCurrentPlayID() === "0")
    {
        wnetPlayer.src = arrayLista["0"].audio_file_name;
    }
    if ((getCurrentPlayID() !== event.data.arr.id))
    {


        wnetPlayer.src = event.data.arr.audio_file_name;
        wnetPlayer.load();
        setCurrentPlayID(event.data.arr.id);
        if (arrayHistoria[getCurrentPlayID() + ""] !== undefined)
        {
            wnetPlayer.currentTime = arrayHistoria[getCurrentPlayID() + ""].currentTime;
        }
    }
    setPlay();
}


function ustawStop()
{
    if (getCurrentPlayID() === "0")
    {
        elemZero.css("background-image", "url(img/media-playback-stop_on.png)");
    }

    panelPlayer.find("#button_play").css("background-image", "url(img/media-playback-start.png)");
    panelPlayer.find("#button_stop").css("background-image", "url(img/media-playback-stop_on.png)");
    panelPlayer.find("#button_pause").css("background-image", "url(img/media-playback-pause.png)");
}

function ustawPlay()
{
    $.each(arrayLista, function (key, arr) {
        playLista.find("#playListElement_" + arr.id + "").css("background-color", "transparent");
    }
    );
    if (getCurrentPlayID() === "0")
    {
        elemZero.css("background-image", "url(img/media-playback-start_on.png)");
    } else
    {
        elemZero.css("background-image", "url(img/media-playback-start.png)");
    }
    playLista.find("#playListElement_" + getCurrentPlayID() + "").css("background-color", "#ffdb9c");
    panelPlayer.find("#button_play").css("background-image", "url(img/media-playback-start_on.png)");
    panelPlayer.find("#button_stop").css("background-image", "url(img/media-playback-stop.png)");
    panelPlayer.find("#button_pause").css("background-image", "url(img/media-playback-pause.png)");

}

function ustawPause()
{
    if (getCurrentPlayID() === "0")
    {
        elemZero.css("background-image", "url(img/media-playback-pause_on.png)");
    } else
    {
        elemZero.css("background-image", "url(img/media-playback-start.png)");
    }
    panelPlayer.find("#button_play").css("background-image", "url(img/media-playback-start.png)");
    panelPlayer.find("#button_stop").css("background-image", "url(img/media-playback-stop.png)");
    panelPlayer.find("#button_pause").css("background-image", "url(img/media-playback-pause_on.png)");

}

function hoverIn(event)
{
    if (getCurrentPlayID() !== event.data.arr.id)
    {
        if (event.data.arr.id === "0")
            getElemZero().css("background-image", "url(img/media-playback-start_on.png)");
        else
            playLista.find("#elem_" + event.data.arr.id + "").css("background-image", "url(img/media-playback-start_on.png)");
    }
    if (getCurrentPlayID() === event.data.arr.id && (getWnetPlayerStatus() === "paused" || getWnetPlayerStatus() === "stoped"))
    {
        if (event.data.arr.id === "0")
            getElemZero().css("background-image", "url(img/media-playback-start_on.png)");
        else
            playLista.find("#elem_" + event.data.arr.id + "").css("background-image", "url(img/media-playback-start_on.png)");
    }
}
function hoverOut(event)
{
    if (getCurrentPlayID() !== event.data.arr.id)
    {
        if (event.data.arr.id === "0")
            getElemZero().css("background-image", "url(img/media-playback-start.png)");
        else
            playLista.find("#elem_" + event.data.arr.id + "").css("background-image", "url(img/media-playback-start.png)");
    }
    if (getCurrentPlayID() === event.data.arr.id && (getWnetPlayerStatus() === "paused" || getWnetPlayerStatus() === "stoped"))
    {
        if (event.data.arr.id === "0")
        {
            if (getWnetPlayerStatus() === "stoped")
                getElemZero().css("background-image", "url(img/media-playback-stop_on.png)");
            else
                getElemZero().css("background-image", "url(img/media-playback-pause_on.png)");
        }
        else
        {
            if (getWnetPlayerStatus() === "stoped")
                playLista.find("#elem_" + event.data.arr.id + "").css("background-image", "url(img/media-playback-stop_on.png)");
            else
                playLista.find("#elem_" + event.data.arr.id + "").css("background-image", "url(img/media-playback-pause_on.png)");
        }
    }
}

function hoverPanelPlayerIn(event)
{
    if (event.data.button === "stop" && getWnetPlayerStatus() !== "stoped")
    {
        panelPlayer.find("#button_stop").css("background-image", "url(img/media-playback-stop_on.png)");
    }
    if (event.data.button === "play" && getWnetPlayerStatus() !== "playing")
    {
        panelPlayer.find("#button_play").css("background-image", "url(img/media-playback-start_on.png)");
    }
    if (event.data.button === "pause" && getWnetPlayerStatus() !== "paused")
    {
        panelPlayer.find("#button_pause").css("background-image", "url(img/media-playback-pause_on.png)");
    }
}


function hoverPanelPlayerOut(event)
{
    if (event.data.button === "stop" && getWnetPlayerStatus() !== "stoped")
    {
        panelPlayer.find("#button_stop").css("background-image", "url(img/media-playback-stop.png)");
    }
    if (event.data.button === "stop" && getWnetPlayerStatus() === "stoped")
    {
        ustawStop();
        panelPlayer.find("#button_stop").css("background-image", "url(img/media-playback-stop_on.png)");
    }
    if (event.data.button === "pause" && getWnetPlayerStatus() === "stoped")
    {
        ustawStop();
        panelPlayer.find("#button_stop").css("background-image", "url(img/media-playback-stop_on.png)");
        panelPlayer.find("#button_pouse").css("background-image", "url(img/media-playback-pause.png)");
    }
    if (event.data.button === "play" && getWnetPlayerStatus() !== "playing")
    {
        panelPlayer.find("#button_play").css("background-image", "url(img/media-playback-start.png)");
    }
    if (event.data.button === "pause" && getWnetPlayerStatus() !== "paused")
    {
        panelPlayer.find("#button_pause").css("background-image", "url(img/media-playback-pause.png)");
    }
}


function ladujHistPanel(panel_etery)
{
    setPanelSubAll("hist");
    panel_etery.empty();
    var temp = [];
    var tah = {};
    var i = 0;
    $.each(arrayHistoria, function (key, tmp1) {
        tmp1.id = key;
        temp.push({k: tmp1.hist_czas, v: tmp1});
    });

    temp.sort(function (a, b) {
        if (a.k > b.k) {
            return -1
        }
        if (a.k < b.k) {
            return 1
        }
        return 0;
    });
    var aa = '';
    $.each(temp, function (key, tmp1) {

        if (i < 30)
        {
            tah[tmp1.v.id] = tmp1.v;
            console.log("xxxx: " + key + " -> " + JSON.stringify(tmp1.v));
            src_img = "";
            if (tmp1.v.attachment_content_type === null)
            {
                src_img = "img/text.png";
            } else if (tmp1.v.attachment_content_type.toLowerCase().indexOf("audio") >= 0)
            {
                src_img = "img/audio.png";
            } else if (tmp1.v.attachment_content_type.toLowerCase().indexOf("video") >= 0)
            {
                src_img = "img/movie.png";
            } else
            {
                src_img = "img/text.png";
            }

            aa = '<div    class="playListElement" id="playListElement_' + tmp1.v.id + '">\n\
                <img id="elem_' + tmp1.v.id + '" class="playListElement_img"  style="cursor:pointer;float:left;padding-right:3px;" height=32px src="' + src_img + '"/>\n\
            <div style="width:110px;" class="element_a" ><a href="' + tmp1.v.url + '" target="_blank">' + tmp1.v.title + '</a><i style="font-size:11px;"> ' + tmp1.v.publication_date + '</i></div>\n\
            <div>';

            panel_etery.append(aa);
            arr = tmp1.v;
            console.log("");
            console.log("");
            console.log("");
            console.log("xyz: " + JSON.stringify(tmp1.v));
            panel_etery.on("click", "#elem_" + tmp1.v.id + "", {
                arr: arr
            }, clickPlayListElement);
        }
        i++;
    }
    );
    arrayHistoria = tah;


}

function ladujEterySubPanel(panel_etery)
{
    setPanelSubAll("sub");
    panel_etery.empty();
    var Etery = localStorage["etery"];
    var xhr = new XMLHttpRequest();
    if (Etery === undefined || Etery === "")
    {
        Etery = "2064";
    }
    Etery = Etery + ",2064";
    xhr.open("GET", "http://www.radiownet.pl/wnetplayer/MobileAppApi/gp/getEthers.php?ac=subp&eids=" + Etery.replace("undefined", "", Etery), true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            panel_etery.empty();
            var resp = JSON.parse(xhr.responseText);
            var i = 0;
            $.each(resp, function (key, arr) {
                var tmp = "";
                if (arr.id === getCurrentEter())
                {
                    tmp = ' style ="background-color:#ffdb9c;"';
                }
                var n = $.now();
                var aa = '<div id="div_ether_element_' + i + '" class="ether_element" ' + tmp + '  >\n\
                           <img id="ether_element_' + arr.id + n + '" style="float:left;padding-right:3px;cursor:pointer;" height=42px src="' + arr.avatar_file_name + '"/>\n\
                            <a id="ether_element_' + arr.id + n + '" href="#"  >' + arr.name + '</a><br/><i style="font-size:11px;">' + arr.publication_date + '</i><div>';
                panel_etery.append(aa);
                panel_etery.on("click", "#ether_element_" + arr.id + n + "", {
                    arr: arr
                }, clickEtherSublement);
                i++;
            });
        }
    };
    xhr.send();
}

function ladujEteryAllPanel(panel_etery)
{
    setPanelSubAll("all");
    panel_etery.empty();
    var Etery = localStorage["etery"];
    var xhr = new XMLHttpRequest();
    if (Etery === undefined || Etery === "")
    {
        Etery = "2064";
    }
    Etery = Etery + ",2064";
    xhr.open("GET", "http://www.radiownet.pl/wnetplayer/MobileAppApi/gp/getEthers.php?ac=last&eids=" + Etery.replace("undefined", "", Etery), true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            panel_etery.empty();
            var resp = JSON.parse(xhr.responseText);
            var i = 0;
            $.each(resp, function (key, arr) {
                var tmp = "";
                if (arr.id === getCurrentEter())
                {
                    tmp = ' style ="background-color:#ffdb9c;"';
                }
                var n = $.now();
                var aa = '<div id="div_ether_element_' + i + '" class="ether_element" ' + tmp + '  >\n\
                           <img id="ether_element_' + arr.id + n + '" style="float:left;padding-right:3px;cursor:pointer;" height=42px src="' + arr.avatar_file_name + '"/>\n\
                            <a id="ether_element_' + arr.id + n + '" href="#"  >' + arr.name + '</a><br/><i style="font-size:11px;">' + arr.publication_date + '</i><div>';
                panel_etery.append(aa);
                panel_etery.on("click", "#ether_element_" + arr.id + n + "", {
                    arr: arr
                }, clickEtherSublement);
                i++;
            });
        }
    };
    xhr.send();
}

function clickEtherSublement(event)
{
    var i = 0;
    while (dokumentPanel.find("#div_ether_element_" + i + "").length)
    {
        dokumentPanel.find("#div_ether_element_" + i + "").css("background-color", "transparent");
        i++;
    }
    $(event.target.parentNode).css("background-color", "#ffdb9c");
    ustalPanelLista(panel_lista, event.data.arr.id);
}


function ustalPanelLista($panel_lista, $par_eter)
{
    setCurrentEter($par_eter);
    panel_lista = $panel_lista;
    panel_lista.find("#eter").empty();
    panel_lista.find("#playLista").empty();
    if ($par_eter === undefined || $par_eter === "")
    {
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.radiownet.pl/wnetplayer/MobileAppApi/gp/getEthers.php?ac=eter&eids=" + $par_eter, true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

            var resp = JSON.parse(xhr.responseText);
            var aa = '<a href="' + resp.eter.url + '" target="_blank" ><img style="float:left;padding-right:3px;" height=32px src="' + resp.eter.avatar_file_name + '"/></a><a href="' + resp.eter.url + '" target="_blank" style="text-decoration:none;"><span style="font-weight: bold;">' + resp.eter.name + ' </span></a>&nbsp;<span id="wiecej_porankow"> <a href="' + resp.eter.url + '" target="_blank" >więcej ...</a></span>';
            panel_lista.find("#eter").append(aa);
            fillEter(panel_lista.find("#playLista"), resp.posts);
        }
    };
    xhr.send();
    if (getWnetPlayerStatus() === "stoped")
    {
        ustawStop();
    } else if (getWnetPlayerStatus() === "playing")
    {
        ustawPlay();
    } else
    {
        ustawPause();
    }
}



function fillEter($par, $posts)
{
    playLista = $par;
    playLista.empty();
    var aa = '';
    for (var i = 0; i < $posts.length; i++)
    {
        src_img = "";
        if ($posts[i].attachment_content_type === null)
        {
            src_img = "img/text.png";
        } else if ($posts[i].attachment_content_type.toLowerCase().indexOf("audio") >= 0)
        {
            src_img = "img/audio.png";
        } else if ($posts[i].attachment_content_type.toLowerCase().indexOf("video") >= 0)
        {
            src_img = "img/movie.png";
        } else
        {
            src_img = "img/text.png";
        }

        aa = '<div class="playListElement" id="playListElement_' + $posts[i].id + '">\n\
                <img id="elem_' + $posts[i].id + '" class="playListElement_img"  style="cursor:pointer;float:left;padding-right:3px;" height=32px src="' + src_img + '"/>\n\
            <div class="element_a" ><a href="' + $posts[i].url + '" target="_blank">' + $posts[i].title + '</a><i style="font-size:11px;"> ' + $posts[i].publication_date + '</i></div>\n\
            <div>';

        playLista.append(aa);
        if (getCurrentPlayID() === $posts[i].id)
        {
            playLista.find("#playListElement_" + $posts[i].id + "").css("background-color", "#ffdb9c");
        }
        arr = $posts[i];
        arrayLista[$posts[i].id + ""] = $posts[i];
        playLista.on("click", "#elem_" + $posts[i].id + "", {
            arr: arr
        }, clickPlayListElement);
    }
}


function getCurrentEter()
{
    return currentEter;
}

function setCurrentEter($par)
{
    currentEter = $par;
}

function hist_czas()
{
    if (arrayHistoria === undefined)
    {
        return;
    }
    if (arrayHistoria [getCurrentPlayID() + ""] !== undefined)
    {
        arrayHistoria [getCurrentPlayID() + ""].currentTime = wnetPlayer.currentTime;
        arrayHistoria [getCurrentPlayID() + ""].hist_czas = $.now();
    }
    localStorage["historia"] = JSON.stringify(arrayHistoria);
}