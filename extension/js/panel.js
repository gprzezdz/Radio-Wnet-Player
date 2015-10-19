$(document).ready(function () {
//    console.log = function () {
//    }

    var Stream = localStorage["stream"];
    if (Stream === undefined)
    {
        Stream = "128";
        arrayLista["0" ] = {id: "0", title: "Aktualny poranek", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream", url: "http://radiownet.pl"};
    } else if (Stream === "64")
    {
        arrayLista["0" ] = {id: "0", title: "Aktualny poranek", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream64", url: "http://radiownet.pl"};
    } else if (Stream === "32")
    {
        arrayLista["0" ] = {id: "0", title: "Aktualny poranek", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream32", url: "http://radiownet.pl"};
    } else {
        Stream = "128";
        arrayLista["0" ] = {id: "0", title: "Aktualny poranek", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream", url: "http://radiownet.pl"};
    }

    $("#elem_0").on("click", {
        arr: arrayLista["0"]
    }, chrome.extension.getBackgroundPage().clickPlayListElement);

    $("#elem_0").mouseover({
        arr: arrayLista["0"]
    }, chrome.extension.getBackgroundPage().hoverIn);

    $("#elem_0").mouseout({
        arr: arrayLista["0"]
    }, chrome.extension.getBackgroundPage().hoverOut);

    $("#button_play").click(chrome.extension.getBackgroundPage().setPlay);
    $("#button_pause").click(chrome.extension.getBackgroundPage().setPause);
    $("#button_stop").click(chrome.extension.getBackgroundPage().setStop);


    chrome.extension.getBackgroundPage().getAktualnieNaAntenie($("#player_header_current"), $("#player_header_next"), $("#currentBroadCastStartFormatted"), $("#nextBroadCastStartFormatted"));
    chrome.extension.getBackgroundPage().getLastPoranki($("#playLista"));
    chrome.extension.getBackgroundPage().setPanelPlayer($("#panel_player"));
    chrome.extension.getBackgroundPage().setElemZero($("#elem_0"));
    chrome.extension.getBackgroundPage().setSeekSlider($("#master"));
    $("#current_title").text(chrome.extension.getBackgroundPage().getCurrentPlayElement().title);
    //slider.value = chrome.extension.getBackgroundPage().getVolume();
    //$("#slider").val(chrome.extension.getBackgroundPage().getVolume());
    if (!isNaN(chrome.extension.getBackgroundPage().getCurrentTime()))
    {
        $("#master").slider("option", "value", chrome.extension.getBackgroundPage().getCurrentTime());
    }
    else
    {
        $("#master").slider("option", "value", 0);
    }
    if (!isNaN(chrome.extension.getBackgroundPage().getDuration()))
    {
        $("#master").slider("option", "max", chrome.extension.getBackgroundPage().getDuration());
    }
    else
    {
        $("#master").slider("option", "max", 0);
    }
    //$("#master").slider("option", "max", chrome.extension.getBackgroundPage().getDuration());
    $("#slider").slider("option", "value", chrome.extension.getBackgroundPage().getVolume());
    $("#slider .ui-slider-handle").mouseover(function () {
        $(".tooltip").css('left', chrome.extension.getBackgroundPage().getVolume());
        $(".tooltip").text(chrome.extension.getBackgroundPage().getVolume());
        $(".tooltip").show('fast');
    });
    $("#slider .ui-slider-handle").mouseout(function () {
        $(".tooltip").hide();
    });

    $("#master").slider({
        value: 60,
        orientation: "horizontal",
        range: "min",
        animate: true
    });
    czasUtworu();
    setInterval(function () {
        czasUtworu();
    }, 1000);
    $("#go-to-options").on("click", function (e) {
        if (chrome.runtime.openOptionsPage) {
            // New way to open options pages, if supported (Chrome 42+).
            chrome.runtime.openOptionsPage();
        } else {
            // Reasonable fallback.
            alert("aa");
            window.open(chrome.runtime.getURL('options.html'));
        }
    });
    $("#version").text("ver: " + chrome.app.getDetails().version);
    $("#options").append(' <b style=" font-weight: bold;    font-size: smaller;">stream:' + Stream + '</b>');

});
function czasUtworu()
{
    var from = "";
    var to = "";
    var dt = new Date();

    var time = (dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()) + ":" + (dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()) + ":" + (dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds());

    $("#aktualna_godzina").text(time);

    if (isNaN(chrome.extension.getBackgroundPage().getDuration()))
    {
        to = "--:--";
    } else
    {
        to = toTime(chrome.extension.getBackgroundPage().getDuration());
    }

    $("#from-to").text(toTime(chrome.extension.getBackgroundPage().getCurrentTime()) + "/" + to);
    if (!isNaN(chrome.extension.getBackgroundPage().getCurrentTime()))
    {
        $("#master").slider("option", "value", chrome.extension.getBackgroundPage().getCurrentTime());
    }
    else
    {
        $("#master").slider("option", "value", 0);
    }
    if (!isNaN(chrome.extension.getBackgroundPage().getDuration()))
    {
        $("#master").slider("option", "max", chrome.extension.getBackgroundPage().getDuration());
    }
    else
    {
        $("#master").slider("option", "max", 0);
    }
}
function toTime($par)
{
    var czas = "";
    var godzina = 0;
    var min = 0;
    var sek = 0;


    godzina = parseInt($par / 3600);
    min = parseInt(($par - godzina * 3600) / 60);
    sek = $par - godzina * 3600 - min * 60;

    if (godzina > 0)
    {
        czas = godzina + ":";
    }
    if (sek < 10)
    {
        sek = "0" + sek;
    }
    if (min < 10)
    {
        min = "0" + min;
    }
    czas = czas + min + ":" + sek;
    return czas;
}

