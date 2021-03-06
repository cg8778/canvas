// ==UserScript==
// @name         Support Menu
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds extra option to the Canvas Global Navigation Menu.
//               Intended as shortcuts for commonly used sites/actions for support staff.
// @include      https://*.instructure.com/*
// @icon         https://www.google.com/s2/favicons?domain=adelaide.edu.au
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /* user definitions section */

    const prodSite = "https://myuni.adelaide.edu.au";
    const betaSite = "https://adelaide.beta.instructure.com";
    const testSite = "https://adelaide.test.instructure.com";
    const prodCourseSite = prodSite + "/accounts/1?";
    const prodPeopleSite = prodSite + "/accounts/1/users";
    const myUniAdminSite = "https://myuni-admin.adelaide.edu.au/search/";
    const myUniAdminHome = "https://myuni-admin.adelaide.edu.au/studentview";
    const courseFinderSite = "https://access.adelaide.edu.au/courses/search.asp?";

    /*
     * Icons added to the global navigation menu
     * - Canvas icons have size of 26x26 pixels
     * - icons below are 24x24 pixels
     * - icons sourced from:
     *       https://iconarchive.com/show/red-orb-alphabet-icons-by-iconarchive.html
     * - used the following Image to Data URI converter to generate icon as text
     *       https://ezgif.com/image-to-datauri
     */
    const imageA = "data:image/png;base64,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";
    const imageC = "data:image/png;base64,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";
    const imageP = "data:image/png;base64,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";
    const imageB = "data:image/png;base64,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";
    const imageT = "data:image/png;base64,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";
    const imageTI = "data:image/png;base64,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";
    const imageF = "data:image/png;base64,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";


    /*
     * Constants used in the script
     * Do not modify
     *
     */
    const usersRegex = new RegExp('^/courses/([0-9]+)/users');
    const courseRegex = new RegExp('^/courses/([0-9]+)/');

    /*
     * The following buttons are to be added to the Main Menu in Canvas
     *
     *     A for MyUni Admin - specific to our site
     *     C for new Courses tab
     *     P for new People tab
     *     B for corresponding location in the Beta Site
     *     T for corresponding location in the Test Site
     *     * for generating info to paste into a support ticket.
     *
     */
    addIcon('MyUni Admin', myUniAdminSite, imageA);
    addIcon('Courses', prodCourseSite, imageC);
    addIcon('People', prodPeopleSite, imageP);
    addIcon('Beta', getNewURL(betaSite), imageB);
    addIcon('Test', getNewURL(testSite), imageT);
    addIcon('Ticket Info', "", imageTI);
    addIcon('Course Finder', getCourseFinderURL(courseFinderSite), imageF);


    /*
     * Add a new icon to the main navigation panel
     *
     * where:
     *     linkText  is the hover over text
     *     siteURL   is the new URL to open, or "" if not required
     *     imageIcon is the image to display in text format
     */
    function addIcon(linkText, siteURL, imageIcon) {
        //console.log ("Functon: Add Icon - " + linkText);

        /*
         * Find the correct element to add the new button to
         * Query by ID (#)
         */
        const parent = document.querySelector('#menu');
        if (parent) {
            //console.log ("YES");

            const li = document.createElement('li');
            li.setAttribute('name', linkText);
            // Use exisitng menu list formatting
            // - such as hover over, and when to display the name
            li.classList.add('ic-app-header__menu-list-item');

            const anchor = document.createElement('a');
            anchor.classList.add('ic-app-header__menu-list-link');

            switch (linkText) {
                case "MyUni Admin": {
                    // call a function
                    anchor.setAttribute('href', '#');
                    anchor.onclick = function() {
                        anchor.setAttribute('href', goToMyUniAdminURL(siteURL));
                        // Open in new window
                        anchor.setAttribute('target', '_blank');
                    }
                    break;
                }
                case "Ticket Info": {
                    anchor.setAttribute('href', '#');
                    anchor.onclick = function() {
                        copyToClipBoard(getBreadCrumbs());
                    }
                    break;
                }
                default: {
                    // The icon is to open a new page
                    anchor.setAttribute('href', siteURL);
                    // Open in new window
                    anchor.setAttribute('target', '_blank');
                    break;
                }
            }

            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', imageIcon);

            const divElement = document.createElement('div');
            divElement.classList.add('menu-item__text');
            divElement.appendChild(document.createTextNode(linkText));

            anchor.appendChild(imageElement);
            anchor.appendChild(divElement);
            li.appendChild(anchor);
            parent.appendChild(li);
        }
        return;
    }

    /*
     * Get the course code
     *
     * Using the breadcrumbs element to get the course code.
     */
    function getCourseCode() {
        const crumbs = document.querySelectorAll('#breadcrumbs li');
        if (crumbs) {
            //console.log ("YES - getCourseCode");
            return( crumbs[1].textContent);
        }
        return("");
    }

    /*
     * Get the users ID
     *
     * This is getting the info from a text field.
     * Only call when on the People page within a course.
     */
    function getPeopleID() {
        return(document.querySelectorAll('input[name="search_term"]')[0].value);
    }

    /*
     * Get MyUni Admin URL
     */
    function goToMyUniAdminURL(siteURL) {
        //console.log("Function: goToMyUniAdminURL" + siteURL);
        const currentURL = window.location.pathname;

        // Work out what URL to go to
        if( currentURL == "/accounts/1" ){
            // General Canvas Courses Page
            siteURL = siteURL.concat("course");
        }
        else if (currentURL == "/accounts/1/users") {
            // General Canvas People Page
            siteURL = siteURL.concat("user");
        }
        else if (usersRegex.test(currentURL)) {
            // People page within a course
            siteURL = siteURL.concat("user/" + getPeopleID());
        }
        else if (courseRegex.test(currentURL)) {
            // Any other page within a course
            var code = getCourseCode();
            siteURL = siteURL.concat("course/" + code);
        }
        else {
            siteURL = myUniAdminHome;
        }

        //console.log(siteURL);
        return siteURL;
    }


    /*
     * Get the current URL location to append to the beta or test domain name.
     */
    function getNewURL(siteURL) {

        const currentURL = window.location.pathname;

        /* Append to beta or test site */
        const newURL = siteURL.concat(currentURL);
        return newURL;
    }

    /*
     * Get the info from #breadcrumbs element
     * This info is then used for including in support tickets
     */
    function getBreadCrumbs() {

        // Query by ID (#)
        const crumbs = document.querySelectorAll('#breadcrumbs li');
        if (crumbs) {
            //console.log ("YES - Bread Crumbs");

            // Used to hold bread crumbs info
            var tempText = "";

            // Iterate LIs
            // ignore the first item (0) as it only contains "/"
            console.log( "Crumb length = ", crumbs.length);
            for (var i=1; i<crumbs.length; i++) {
                var item = crumbs[i];
                //console.log (i, item.textContent);
                if (i == 1) { tempText = "For Course: " + item.textContent;}
                if (i == 2) { tempText += "\n" + item.textContent;}
                if (i == 3) { tempText += ": " + item.textContent;}
            }

            // Add People ID
            const currentURL = window.location.pathname;
            if (usersRegex.test(currentURL)) {
                tempText += ": " + getPeopleID();
            }

            // Append the URL
            tempText += "\n(URL: " + window.location + ")";
            tempText += "\n\nQuery:";

            console.log(tempText);
        }
        return(tempText);
    }

    //Need course name, and term to construct URL
    function getCourseFinderURL(siteURL) {

        //Need to be on the Settings Page to get course details.
        //Otherwise just go to the default search page.
        if( ENV.active_context_tab == "settings" ) {

            var resultURL = "";

            //This ENV element is not available on all pages.
            // var term = ENV.COURSE["long_name"];
            var term = document.getElementById('course_sis_source_id').value;
            if (term) {
                term = term.substring(0, 4);
                //console.log ("YES - Course Term - ", term);
            }

            //This ENV element is not available on all pages.
            //const name = ENV.COURSE["name"];
            var name = document.getElementById('course_name').value;
            if (name) {
                //console.log ("YES - Course Name - ", name);
            }

            if( term && name ) {
                // Create the new URL
                // append ?m=r&title={name}&term=(dddd} to the course finder URL
                // e.g.   ?m=r&title=Specialised+Programming&term=4120
                var newURL = siteURL + "?m=r&title=" + name + "&term=" + term;
                console.log(newURL);
                resultURL = encodeURI(newURL);
                console.log(resultURL);
            }
            return resultURL;
        }
        return siteURL;
    }


    /*
     * Copies the text parsed in to the clipboard, via a temporary div element
     */
    function copyToClipBoard(text) {
        //console.log("copyToClipBoard: " + text);
        var cactive = document.activeElement;

        // create temp text area as content buffer
        var copyBuffer = document.createElement("TEXTAREA");
        document.body.appendChild(copyBuffer);

        copyBuffer.value = text;
        copyBuffer.select();
        copyBuffer.setSelectionRange(0, 99999);
        document.execCommand("copy");

        // restore focus
        if (cactive) {
            cactive.focus();
            console.log("Restore focus on ", cactive);
        }

        // clean up
        document.body.removeChild(copyBuffer);

        //window.prompt("COPIED TO CLIPBOARD", text);
        window.alert("COPIED TO CLIPBOARD:\n" + text);
    }
})();
