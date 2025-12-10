(function () {
    // Create the Google Translate div config
    var googleTranslateScript = document.createElement('script');
    googleTranslateScript.type = 'text/javascript';
    googleTranslateScript.async = true;
    googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(googleTranslateScript);

    // Create the div element for the widget
    var translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.style.position = 'fixed';
    translateDiv.style.bottom = '20px';
    translateDiv.style.right = '20px';
    translateDiv.style.zIndex = '10000';
    translateDiv.style.border = '1px solid #ccc';
    translateDiv.style.borderRadius = '8px';
    translateDiv.style.backgroundColor = '#fff';
    translateDiv.style.padding = '4px';
    translateDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    document.body.appendChild(translateDiv);

    // Initialize function
    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,ms,zh-CN,ta',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    // Aesthetic improvements for the widget via CSS injection
    var style = document.createElement('style');
    style.innerHTML = `
        /* Hide the Google Translate toolbar safely */
        .goog-te-banner-frame.skiptranslate {
            display: none !important;
        } 
        body {
            top: 0px !important; 
        }
        /* Customize the gadget look slightly */
        #google_translate_element {
            font-family: 'Public Sans', sans-serif;
        }
        .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
        }
    `;
    document.head.appendChild(style);
})();
