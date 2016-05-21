chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.executeScript({
        file: "bower_components/jquery/dist/jquery.min.js"
    });

    chrome.tabs.executeScript({
        file: "js/nortel.js"
    });
});