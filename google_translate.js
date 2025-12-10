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

    // Initial Styles
    translateDiv.style.position = 'fixed';
    translateDiv.style.bottom = '20px';
    translateDiv.style.right = '20px';
    translateDiv.style.zIndex = '10000';
    translateDiv.style.border = '1px solid #ccc';
    translateDiv.style.borderRadius = '8px';
    translateDiv.style.backgroundColor = '#fff';
    translateDiv.style.padding = '4px';
    translateDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    translateDiv.style.cursor = 'move'; // Indicate draggable
    translateDiv.style.touchAction = 'none'; // Prevent scrolling while dragging

    // Add a visual drag handle indication (optional, but helps user know it's movable)
    // We can use a subtle border or just rely on the cursor. 
    // Since it's mobile primarily, maybe just the functionality is enough.

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
        .goog-te-banner-frame.skiptranslate, 
        .goog-te-banner-frame, 
        iframe.goog-te-banner-frame {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
        } 
        body {
            top: 0px !important; 
            position: static !important; 
        }
        /* Customize the gadget look slightly */
        #google_translate_element {
            font-family: 'Public Sans', sans-serif;
            transition: box-shadow 0.2s;
        }
        #google_translate_element:active {
            box-shadow: 0 5px 20px rgba(0,0,0,0.2) !important;
        }
        .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
        }
        /* Hide the Google Icon for cleaner look */
        .goog-te-gadget-icon {
            display: none !important;
        }
        /* Fix font sizes in the widget */
        .goog-te-menu-value {
            color: #555 !important;
        }
        .goog-te-menu-value span {
            color: #555 !important;
            border-left: none !important;
        }
    `;
    document.head.appendChild(style);

    // === DRAG FUNCTIONALITY ===
    let isDragging = false;
    let hasMoved = false;
    let startX, startY, initialLeft, initialTop;

    function dragStart(e) {
        // Allow interacting with the dropdown (don't start drag if clicking the internal elements essentially? 
        // No, we want to drag the whole container.

        isDragging = true;
        hasMoved = false;

        // Get initial input position
        let clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        let clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        // Calculate offset from the top-left of the element
        const rect = translateDiv.getBoundingClientRect();

        // IMPORTANT: Switch from bottom/right to top/left positioning for dragging
        translateDiv.style.bottom = 'auto';
        translateDiv.style.right = 'auto';
        translateDiv.style.left = rect.left + 'px';
        translateDiv.style.top = rect.top + 'px';

        initialLeft = clientX - rect.left;
        initialTop = clientY - rect.top;
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault(); // Prevent scrolling on touch
        hasMoved = true;

        let clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        let clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        // Update position
        translateDiv.style.left = (clientX - initialLeft) + 'px';
        translateDiv.style.top = (clientY - initialTop) + 'px';
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
    }

    // Attach events to the DIV
    translateDiv.addEventListener("mousedown", dragStart);
    translateDiv.addEventListener("touchstart", dragStart, { passive: false });

    // Attach move/end to document to handle fast movements outside the div
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag, { passive: false });

    document.addEventListener("mouseup", dragEnd);
    document.addEventListener("touchend", dragEnd);

    // Prevent click event (opening menu) if we just dragged
    translateDiv.addEventListener('click', function (e) {
        if (hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true); // Capture phase

})();
