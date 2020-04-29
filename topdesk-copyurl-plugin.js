// ==UserScript==
// @name         TopDesk
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        *://infracommerce.topdesk.net/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.0.min.js
// ==/UserScript==

jQuery(function ($) {

    if ($('h1[lmask] div').first().length) {
        var issueId = $('h1 div').first().text();
        // console.log('issueId', issueId);
    }

    if ($('div[aria-label="Save (Alt+S) Save"]').length) {
        // console.log('save button', $('div[aria-label="Save (Alt+S) Save"]').parent().parent());
        $('div[aria-label="Save (Alt+S) Save"]')
            .parent()
            .parent()
            .prepend('<div class="a0 b0 c0 d0 e1 f7 h10 i5 j5 k1 l1 btnCopy" lmask="[FG][FL][MC]" mpar="cC5_D" mtype="group" \
                    data-issueid="' + issueId + '" \
                    style="display:block;visibility:visible;top:0px;left: -70px;width:57px;height:32px;"> \
                    <div aria-label="Copy" class="a0 b0 c0 d0 e1 f6 g13 h5 i5 j6 k2 l1" \
                        style="display:block;visibility:visible;top:0px;left:0px;width:31px;height:24px;background-color:#f60;border-color:#f60"> \
                        <div class="a0 b1 c0 d0 e1 f7 h10 i3 j5 k2 l0 copyText" \
                            style="display:block;visibility:visible;top:3px;left:12px;width:31px;height:24px;line-height:24px;overflow:hidden;white-space:nowrap;"> \
                            Copy \
                        </div> \
                    </div> \
                </div>');
    }

    $('.btnCopy').on('click', function () {
        var $btnCopy = $(this),
            issueUrl = 'https://infracommerce.topdesk.net/tas/secure/incident?action=lookup&lookup=naam&lookupValue=' + $btnCopy.data('issueid');

        navigator.clipboard.writeText(issueUrl)
            .then(() => {
                $btnCopy.find('.copyText').text('?');
                setTimeout(function () {
                    $btnCopy.find('.copyText').text('Copy');
                }, 1000);
            })
            .catch(err => {
                alert("Could not copy text:\n" + err);
            });
    });
});