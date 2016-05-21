$(document).ready(function () {
    // Remove the default Nortel interface
    $("frameset").remove();
    $("noframes").remove();

    // Add a body element
    document.getElementsByTagName("html")[0].appendChild(document.createElement("body"));

    // Fetch the new UI
    var newUI = "";
    $.get(chrome.extension.getURL("content/menu.html"), function (data) {
        // Replace the logo URL with the absolute URL to the extension resource
        newUI = data.replace("nortel_logo.svg", chrome.extension.getURL("images/nortel_logo.svg"));

        // Fetch the stylesheet
        var stylesheet = "";
        $.get(chrome.extension.getURL("css/nortel.css"), function (data) {
            // Replace the menu icon URL with the absolute URL to the extension resource
            stylesheet = data.replace("cd-icons.svg", chrome.extension.getURL("images/cd-icons.svg"));

            // Fetch Font Awesome
            var fontawesome = "";
            $.get(chrome.extension.getURL("bower_components/font-awesome/css/font-awesome.min.css"), function (data) {
                // Replace the icon font URLs with the abslute URLs to the extension resources
                fontawesome = data.replace("../fonts/fontawesome-webfont.eot", chrome.extension.getURL("bower_components/font-awesome/fonts/fontawesome-webfont.eot"));
                fontawesome = fontawesome.replace("../fonts/fontawesome-webfont.woff", chrome.extension.getURL("bower_components/font-awesome/fonts/fontawesome-webfont.woff"));
                fontawesome = fontawesome.replace("../fonts/fontawesome-webfont.ttf", chrome.extension.getURL("bower_components/font-awesome/fonts/fontawesome-webfont.ttf"));
                fontawesome = fontawesome.replace("../fonts/fontawesome-webfont.svg", chrome.extension.getURL("bower_components/font-awesome/fonts/fontawesome-webfont.svg"));

                // Add the stylesheets to the page
                var head = document.head || document.getElementsByTagName('head')[0];
                var style = document.createElement('style');
                style.type = 'text/css';

                if (style.styleSheet) {
                    style.styleSheet.cssText = stylesheet + fontawesome;
                } else {
                    style.appendChild(document.createTextNode(stylesheet + fontawesome));
                }

                head.appendChild(style);

                // Load in our custom interface
                var body = document.body || document.getElementsByTagName('body')[0];
                body.innerHTML = newUI;

                // Initialize accordion menu animation
                var accordionsMenu = $('.accordion-nav');

                if (accordionsMenu.length > 0) {
                    accordionsMenu.each(function () {
                        var accordion = $(this);
                        //detect change in the input[type="checkbox"] value
                        accordion.on('change', 'input[type="checkbox"]', function () {
                            var checkbox = $(this);
                            ( checkbox.prop('checked') ) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300) : checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
                        });
                    });
                }

                // Bind navigation handler
                $('.accordion-nav a').click(function (e) {
                    // Prevent the browser from navigating
                    e.preventDefault();

                    // Navigate in the iframe
                    $("#main").attr('src', $(this).attr('href'));

                    // Set the active class on this navigation item
                    $('.accordion-nav a').removeClass('active');
                    $(this).addClass('active');

                    // Return false to prevent navigation
                    return false;
                });

                // iFrame resize helper
                $('#main').load(function () {
                    this.style.height = this.contentWindow.document.body.offsetHeight + 25 + 'px';
                });
            });
        });
    });
});