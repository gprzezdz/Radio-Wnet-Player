
$(document).ready(function () {
    var slider = $('#master');
    slider.slider({
        range: "min",
        min: 0,
        max: 100,
        value: 5,
        step: 1,
        slide: function (event, ui) { 
            chrome.extension.getBackgroundPage().setCurrentTime(ui.value);
            czasUtworu();
        },
    });

});