//$('input:radio[name=theme]:checked').val();
var _AnalyticsCode = 'UA-80240223-1';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

$(document).ready(function () {
        var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);

    var Stream = localStorage["stream"];
    if (Stream === undefined)
    {
        $("input:radio[name='stream'][value='128']").prop("checked", true);

    } else if (Stream === "64")
    {

        $("input:radio[name='stream'][value='64']").prop("checked", true);
    } else if (Stream === "32")
    {

        $("input:radio[name='stream'][value='32']").prop("checked", true);
    } else {
        $("input:radio[name='stream'][value='128']").prop("checked", true);
    }
    $("input:radio[name='stream']").on("click", function () {
        localStorage["stream"] = $("input:radio[name='stream']:checked").val();
        var Stream = $("input:radio[name='stream']:checked").val();
        if (Stream === undefined)
        {
            chrome.extension.getBackgroundPage().setArrayLiasta("0", {id: "0",eter_id:"1043",name: "Radio Wnet", title: "Aktualny poranek", attachment_content_type: "audio/mp3", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream", url: "http://radiownet.pl"});
        } else if (Stream === "64")
        {
            chrome.extension.getBackgroundPage().setArrayLiasta("0", {id: "0",eter_id:"1043",name: "Radio Wnet", title: "Aktualny poranek", attachment_content_type: "audio/mp3", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream64", url: "http://radiownet.pl"});
        } else if (Stream === "32")
        {
            chrome.extension.getBackgroundPage().setArrayLiasta("0", {id: "0",eter_id:"1043",name: "Radio Wnet", title: "Aktualny poranek", attachment_content_type: "audio/mp3", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream32", url: "http://radiownet.pl"});
        } else {
            chrome.extension.getBackgroundPage().setArrayLiasta("0", {id: "0",eter_id:"1043",name: "Radio Wnet", title: "Aktualny poranek", attachment_content_type: "audio/mp3", avatar_file_name: "img/WNet_logo_footer.png", audio_file_name: "http://audio.radiownet.pl:8000/stream", url: "http://radiownet.pl"});
        }
        chrome.extension.getBackgroundPage().setPause();
        chrome.extension.getBackgroundPage().setPlay();
    });
});


