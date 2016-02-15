
$(document).ready(function () {
    var slider = $('#slider'), tooltip = $('.tooltip');
    console.log(" chrome.extension.getBackgroundPage().getVolume(), " +  chrome.extension.getBackgroundPage().getVolume());
    tooltip.hide();
    slider.slider({
        range: "min",
        min: 1,
        value: chrome.extension.getBackgroundPage().getVolume(),
        start: function (event, ui) {
            tooltip.fadeIn('fast');
            tooltip.css('left', ui.value).text(ui.value);
        },
        slide: function (event, ui) {

            var value = slider.slider('value'),
                    volume = $('.volume');
            tooltip.css('left', value).text(ui.value);

            if (value <= 5) {
                volume.css('background-position', '0 0');
            } else if (value <= 25) {
                volume.css('background-position', '0 -25px');
            } else if (value <= 75) {
                volume.css('background-position', '0 -50px');
            } else {
                volume.css('background-position', '0 -75px');
            }
            chrome.extension.getBackgroundPage().setVolume(ui.value);
        },
        stop: function (event, ui) {
            tooltip.fadeOut('fast');
        },
    });
});