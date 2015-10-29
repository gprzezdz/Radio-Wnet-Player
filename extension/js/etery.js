/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    if (localStorage["etery"] === undefined || localStorage["etery"] === "")
    {
        localStorage["etery"] = "2064";
    }

    ladujEterySub();
    ladujEteryLast();
    $("#b_szukaj").on("click", szukajEteru);
}
);

function szukajEteru(event)
{
    $("body").css("cursor", "progress");
    $("#ostanio_aktualizowane").empty();
    //$("#etery_panel").append("<div>aaa</div>");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.radiownet.pl/wnetplayer/MobileAppApi/gp/getEthers.php?ac=szukaj&s=" + $("#szukaj_eteru").val(), true);
    xhr.onreadystatechange = function () {
        $("body").css("cursor", "default");
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            $("#ostanio_aktualizowane").empty();
            var resp = JSON.parse(xhr.responseText);
            $.each(resp, function (key, arr) {
                var aa = '<div class="ether_element">\n\
                            <div class="button_dodaj"  id="elem_' + arr.id + '"   ></div>\n\
                            <i>' + arr.publication_date + '</i><a href="' + arr.url + '" target="_blank"><img style="float:left;padding-right:3px;" height=42px src="' + arr.avatar_file_name + '"/></a>\n\
                            <div class="element_a" ><a href="' + arr.url + '" target="_blank">' + arr.name + '</a></div>\n\
' + arr.description + '\n\
\n\
                            <div>';
                $("#ostanio_aktualizowane").append(aa);
                $("#ostanio_aktualizowane").on("click", "#elem_" + arr.id + "", {
                    arr: arr
                }, dodajEter);
            });
        }
    };
    xhr.send();

}
function ladujEterySub()
{
    $("#etery_panel").empty();
    var Etery = localStorage["etery"];
    //$("#etery_panel").append("<div>aaa</div>");
    var xhr = new XMLHttpRequest();
    if (Etery === undefined || Etery === "")
    {
        $("#etery_panel").append("<div>Subskrybuj etery</div>");
        return;
    }
    Etery = Etery + ",2064";
    xhr.open("GET", "http://www.radiownet.pl/wnetplayer/MobileAppApi/gp/getEthers.php?ac=sub&eids=" + Etery.replace("undefined", "", Etery), true);
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            $("#etery_panel").empty();
            var resp = JSON.parse(xhr.responseText);
            stmp = "";
            $.each(resp, function (key, arr) {
                var aa = '<div class="ether_element">\n\
                            <div class="button_usun"  id="elem_' + arr.id + '"   ></div>\n\
                           <a href="' + arr.url + '" target="_blank"><img style="float:left;padding-right:3px;" height=42px src="' + arr.avatar_file_name + '"/></a>\n\
                            <div class="element_a" ><a href="' + arr.url + '" target="_blank">' + arr.name + '</a></div>\n\
' + arr.description + '\n\
\n\
                            <div>';
                $("#etery_panel").append(aa);
                $("#etery_panel").on("click", "#elem_" + arr.id + "", {
                    arr: arr
                }, usunEter);
                if (stmp === "")
                    stmp = arr.id;
                else
                    stmp = stmp + "," + arr.id;
            });

            localStorage["etery"] = stmp;
        }
    };
    xhr.send();

}



function ladujEteryLast()
{
    $("#ostanio_aktualizowane").empty();
    var Etery = localStorage["etery"];
    //$("#etery_panel").append("<div>aaa</div>");
    var xhr = new XMLHttpRequest();
    //console.log("http://www.radiownet.pl/wnetplayer/MobileAppApi/gp/getEthers.php?ac=last&eids=" + Etery.replace("undefined", "", Etery));
    if (Etery === undefined || Etery === "")
    {
        xhr.open("GET", "http://www.radiownet.pl/wnetplayer/MobileAppApi/gp/getEthers.php?ac=last", true);
    } else
    {
        xhr.open("GET", "http://www.radiownet.pl/wnetplayer/MobileAppApi/gp/getEthers.php?ac=last&eids=" + Etery.replace("undefined", "", Etery), true);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            $("#ostanio_aktualizowane").empty();
            var resp = JSON.parse(xhr.responseText);
            $.each(resp, function (key, arr) {
                var aa = '<div class="ether_element">\n\
                            <div class="button_dodaj"  id="elem_' + arr.id + '"   ></div>\n\
                            <i>' + arr.publication_date + '</i><a href="' + arr.url + '" target="_blank"><img style="float:left;padding-right:3px;" height=42px src="' + arr.avatar_file_name + '"/></a>\n\
                            <div class="element_a" ><a href="' + arr.url + '" target="_blank">' + arr.name + '</a></div>\n\
' + arr.description + '\n\
\n\
                            <div>';
                $("#ostanio_aktualizowane").append(aa);
                $("#ostanio_aktualizowane").on("click", "#elem_" + arr.id + "", {
                    arr: arr
                }, dodajEter);
            });
        }
    };
    xhr.send();

}
function dodajEter(event)
{
    if (localStorage["etery"] === undefined || localStorage["etery"] === "")
    {
        localStorage["etery"] = event.data.arr.id;
    } else
    {
        localStorage["etery"] = localStorage["etery"] + "," + event.data.arr.id;
    }
    ladujEterySub();
}

function usunEter(event)
{
    if (!confirm("Czy usunąć eter"))
    {
        return;
    }
    //alert(event.data.arr.id);
    if (localStorage["etery"] === undefined || localStorage["etery"] === "")
    {
        ladujEterySub();
        return;
    }

    var arr = localStorage["etery"].split(',');
    stmp = "";
    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i] !== event.data.arr.id)
        {
            if (stmp === "")
                stmp = arr[i];
            else
                stmp = stmp + "," + arr[i];
        }
    }
    localStorage["etery"] = "";
    localStorage["etery"] = stmp;
    ladujEterySub();

}
    