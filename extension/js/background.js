var arrayLista = {};
$(document).ready(function () {

    wnetPlayer = document.getElementById("wnetPlayer");
    var Stream = localStorage["stream"];
    if (Stream === undefined)
    {
        arrayLista["0" ] = {id: "0", title: "Aktualny poranek", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream", url: "http://radiownet.pl"};
    } else if (Stream === "64")
    {
        arrayLista["0" ] = {id: "0", title: "Aktualny poranek", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream64", url: "http://radiownet.pl"};
    } else if (Stream === "32")
    {
        arrayLista["0" ] = {id: "0", title: "Aktualny poranek", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream32", url: "http://radiownet.pl"};
    } else {
        arrayLista["0" ] = {id: "0", title: "Aktualny poranek", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream", url: "http://radiownet.pl"};
    }
    console.log = function () {
    }
});

var wnetPlayer;
var currentPlayID = "0";
var playLista;

var arrayListaSort = [];

var panelPlayer;
var elemZero;
var seekSlider;

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
        console.log("zzzz: " + arrayLista["0"].audio_file_name);

        wnetPlayer.src = arrayLista["0"].audio_file_name;
        wnetPlayer.load();
    }
    console.log(wnetPlayer);
    wnetPlayer.play();
    if (getCurrentPlayID() === "0")
    {
        seekSlider.slider("option", "value", 0);
        seekSlider.slider("option", "max", 0);
        panelPlayer.find("#current_title").text(arrayLista["0"].title);
    } else
    {
        panelPlayer.find("#current_title").text(arrayLista[getCurrentPlayID()].title);
        seekSlider.slider("option", "value", wnetPlayer.currentTime);
        seekSlider.slider("option", "max", wnetPlayer.duration);
    }

    ustawPlay();
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
    }
    xhr.send();
}


function getLastPoranki($par_div)
{
    arrayListaSort = [];
    playLista = $par_div;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.radiownet.pl/wnetplayer/MobileAppApi/getBroadcastListByEtherId.php?etherId=2064", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var resp = JSON.parse(xhr.responseText);
            if (resp.broadcasts[0] === undefined)
            {
                playLista.append("brak danych");
            }
            var i = 0;
            $.each(resp, function (key, arr) {
                $.each(arr, function (key1, arr1) {

                    arrayLista["" + arr1.id + ""] = arr1;
                    arrayListaSort[i] = "" + arr1.id + "";
                    i++;
                });
            });
            addClickElement();
        }
        if (getWnetPlayerStatus() === "paused")
            ustawPause();
        if (getWnetPlayerStatus() === "playing")
            ustawPlay();
        if (getWnetPlayerStatus() === "stoped")
            ustawStop();
    };
    xhr.send();
}

function setArrayLiasta(par_id, par_arr)
{
    arrayLista[par_id] = par_arr;
}
function addClickElement()
{
    for (var i = 0; i < arrayListaSort.length; i++)
    {
        key = arrayListaSort[i];
        arr = arrayLista[key];
        if (key !== "0")
        {
            var aa = '<div class="playListElement"><div class="button_play_list"  id="elem_' + key + '" ></div><a href="' + arr.url + '" target="_blank"><img style="float:left;padding-right:3px;" height=32px src="' + arr.avatar_file_name + '"/></a><div class="element_a" ><a href="' + arr.url + '" target="_blank">' + arr.title + '</a></div><div>';

            playLista.append(aa);
            playLista.on("click", "#elem_" + key + "", {
                arr: arr
            }, clickPlayListElement);
            playLista.find("#elem_" + key + "").mouseover({
                arr: arr
            }, hoverIn);
            playLista.find("#elem_" + key + "").mouseout({
                arr: arr
            }, hoverOut);
        }
    }
}
function clickPlayListElement(event)
{


    playLista.find("#elem_" + event.data.arr.id + "").css("background-image", "url(img/media-playback-start_on.png)");
    if (getCurrentPlayID() === "0")
    {
        wnetPlayer.src = arrayLista["0"].audio_file_name;
    }
    if ((getCurrentPlayID() !== event.data.arr.id))
    {
        console.log("arrayLista[0].audio_file_name " + event.data.arr.title);
        console.log("id: " + event.data.arr.id);
        console.log("audio_file_name" + event.data.arr.audio_file_name);
        wnetPlayer.src = event.data.arr.audio_file_name;
        wnetPlayer.load();
        setCurrentPlayID(event.data.arr.id);
    }

    setPlay();
}


function ustawStop()
{
    elemZero.css("background-image", "url(img/media-playback-start.png)");
    $.each(arrayLista, function (key, arr) {
        if (getCurrentPlayID() === arr.id)
        {
            playLista.find("#elem_" + key).css("background-image", "url(img/media-playback-stop_on.png)");
        } else
            playLista.find("#elem_" + key).css("background-image", "url(img/media-playback-start.png)");
    }
    );
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

        playLista.find("#elem_" + key).css("background-image", "url(img/media-playback-start.png)");
    }
    );
    if (getCurrentPlayID() === "0")
    {
        elemZero.css("background-image", "url(img/media-playback-start_on.png)");
    } else
    {
        elemZero.css("background-image", "url(img/media-playback-start.png)");
    }
    playLista.find("#elem_" + getCurrentPlayID() + "").css("background-image", "url(img/media-playback-start_on.png)");
    panelPlayer.find("#button_play").css("background-image", "url(img/media-playback-start_on.png)");
    panelPlayer.find("#button_stop").css("background-image", "url(img/media-playback-stop.png)");
    panelPlayer.find("#button_pause").css("background-image", "url(img/media-playback-pause.png)");

}

function ustawPause()
{
    $.each(arrayLista, function (key, arr) {
        playLista.find("#elem_" + key).css("background-image", "url(img/media-playback-start.png)");

    });
    if (getCurrentPlayID() === "0")
    {
        elemZero.css("background-image", "url(img/media-playback-pause_on.png)");
    } else
    {
        elemZero.css("background-image", "url(img/media-playback-start.png)");
    }
    playLista.find("#elem_" + getCurrentPlayID() + "").css("background-image", "url(img/media-playback-pause_on.png)");
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
