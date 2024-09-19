$(function() {
    BypassingToolkit.ReConnect();
    BypassingToolkit.RefreshSelfInfo();
    BypassingToolkit.Styles();
});

var BypassingToolkit = {};

BypassingToolkit.isDefined = function(foo) {
    return typeof(foo) !== 'undefined'
}

/**
 * jToast
 * A modern & easy-going jQuery Plugin to create Toasts.
 *
 * Version: 1.0.0
 * Author: Michael Johnson
 * Author URI: https://mjcodebase.com
 */
if (BypassingToolkit.isDefined(showToast) && BypassingToolkit.isDefined(hideToast)) {
    let toasts = 0;
    let manager = {
        ready: true,
        jobs: [],
        currentWorkingID: 0,
        addJob(job) {
            this.ready = false;
            job.type === "show" ? this.jobs.push({ text: job.text, args: job.args, type: "show" }) : this.jobs.push({ id: job.id, type: "hide" });

            const waitUntilReady = setInterval(() => {
                if (this.workJobOff()) {
                    clearInterval(waitUntilReady);
                }
            }, 250);
        },
        removeJob(id) {
            if (this.currentWorkingID === id) {
                this.ready = true;
            }
        },
        workJobOff() {
            if (this.ready && this.jobs.length > 0) {
                this.jobs[0].type === "show" ? showToast(this.jobs[0].text, this.jobs[0].args) : hideToast(this.jobs[0].id);
                this.jobs.splice(0, 1);
                return true;
            }
        }
    };
    function showToast(text, { duration = 3000, background = "#232323", color = "#fff", borderRadius = "0px", icon_style = false, close = false, progressBar = false, pageReload = false, customCss = "", closeCss = "", loaderCss = "" } = {}) {
        const selectedToast = toasts;
        if (!manager.ready) {
            manager.addJob({ text: text, args: showToast.arguments[1], workingID: selectedToast, type: "show" });
            return;
        }
        manager.currentWorkingID = selectedToast;

        $("#toasts").append(`
            <div style="background: ${background}; color: ${color}; border-radius: ${borderRadius}; ${close ? 'display: flex;' : ''}; ${customCss}" data-toast-id="${toasts}" class="toast">
                ${icon_style ? `<span class="${icon_style}" style="font-size: 18px;line-height: 18px;margin-right: 7px;"></span>` : ""}
                <span style="line-height: 20px;">${text}</span>
                ${progressBar && duration !== "lifetime" ? `<div style="animation-duration: ${duration}ms; background: ${color};" class="progress" style="${loaderCss}"></div>` : ""}
            </div>
        `);

        if (close)
            $(`[data-toast-id="${selectedToast}"]`).append(`
                <div style="height: ${$(`[data-toast-id="${selectedToast}"] > span`).height()}px; ${closeCss}" onclick="hideToast(${selectedToast})" class="close">&times;</div>
            `);

        $(".toast").map((i) => {
            manager.ready = false;
            if (i !== selectedToast) {
                $(".toast").eq(i).animate({
                    "margin-top": "+=" + parseInt($(`[data-toast-id="${selectedToast}"]`).height() + (15 * 2) + 15 + 5) + "px"
                }, 300);

                setTimeout(() => {
                    manager.removeJob(selectedToast);
                }, 300);
            } else {
                setTimeout(() => {
                    $(".toast").eq(i).animate({
                        "margin-top": "25px"
                    }, 300);

                    setTimeout(() => {
                        manager.removeJob(selectedToast);
                    }, 300);
                }, 150);
            }
        });

        if (duration !== "lifetime") {
            setTimeout(() => {
                $(`[data-toast-id="${selectedToast}"]`).animate({
                    "margin-right": "-" + parseInt($(`[data-toast-id="${selectedToast}"]`).width() + (15 * 2) + 25 + 100) + "px"
                }, 300);

                if (selectedToast !== toasts) {
                    $(".toast").map((i) => {
                        if (i < selectedToast) {
                            setTimeout(() => {
                                $(".toast").eq(i).animate({
                                    "margin-top": "-=" + parseInt($(`[data-toast-id="${selectedToast}"]`).height() + (15 * 2) + 15 + 5) + "px"
                                }, 300);
                            }, 300);
                        }
                    });
                }

                setTimeout(() => {
                    $(`[data-toast-id="${selectedToast}"]`).addClass("hidden");
                    if (pageReload) {
                        window.location.reload();
                    }
                }, 300);
            }, duration);
        }

        toasts++;
        return selectedToast;
    }
    function hideToast(id) {
        if (parseInt($(`[data-toast-id="${id}"]`).css("margin-right").replace("px", "")) === 0) {
            $(`[data-toast-id="${id}"]`).animate({
                "margin-right": "-" + parseInt($(`[data-toast-id="${id}"]`).width() + (15 * 2) + 25 + 100) + "px"
            }, 300);

            if (id !== toasts) {
                $(".toast").map((i) => {
                    if (i < id) {
                        setTimeout(() => {
                            $(".toast").eq(i).animate({
                                "margin-top": "-=" + parseInt($(`[data-toast-id="${id}"]`).height() + (15 * 2) + 15 + 5) + "px"
                            }, 300);
                        }, 300);
                    }
                });
            }

            setTimeout(() => {
                $(`[data-toast-id="${id}"]`).addClass("hidden");
            }, 300);
        }
    }
    (() => {
        $("head").append(`
            <style>
                .toast {
                    padding: 15px;
                    color: #fff;
                    position: fixed;
                    right: 25px;
                    top: 0;
                    margin-top: -100px;
                    box-shadow: 0 10px 40px 0 rgba(62,57,107,.07), 0 2px 9px 0 rgba(62,57,107,.12);
                    max-width: 50%;
                    z-index: 2147483647;
                }

                @media screen and (max-width: 800px) {
                    .toast {
                        max-width: 75%;
                    }
                }

                @keyframes progress {
                    from { width: 100% }
                    to { width: 0% }
                }

                .toast > .progress {
                    position: absolute;
                    height: 2px;
                    width: 100%;
                    margin-left: -15px;
                    bottom: 0;
                    opacity: 0.75;
                    animation: progress linear forwards;
                }

                .toast > .close {
                    margin-left: 15px;
                    opacity: 0.75;
                    font-size: 24px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }

                .toast a {
                    color: inherit;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }
            </style>
        `);

        $("body").append(`<div id="toasts"></div>`);
    })();
}

/**
 * Bypassing Toolkit CSS Styles
 */
BypassingToolkit.Styles = function() {
    if ($("head").find("#bypassing-popup-styles").length == 0) {
        $("head").append(`
            <style id="bypassing-popup-styles">
                @media (min-width: 440px) {
                    .bypassing-popup .jconfirm-box {
                        width: 400px;
                    }
                }
                .bypassing-popup .jconfirm-box .jconfirm-title-c{
                    font-size: 18px !important;
                    font-weight: 600 !important;
                    padding-bottom: 10px !important;
                }
                .bypassing-popup .jconfirm-box .jconfirm-buttons {
                    text-align: center;
                    padding: 0;
                    margin-top: 10px;
                  }
                .bypassing-popup .jconfirm-box {
                    padding: 20px !important;
                    border-radius: 12px;
                    -moz-border-radius: 12px;
                    -o-border-radius: 12px;
                    -webkit-border-radius: 12px;
                }
                .bypassing-popup .jconfirm-content-pane {
                    margin-bottom: 0 !important;
                }
                .bypassing-popup .jconfirm-box .jconfirm-buttons button {
                    text-transform: none !important;
                    border-radius: 4px;
                    -moz-border-radius: 4px;
                    -webkit-border-radius: 4px;
                    -o-border-radius: 4px;
                    font-size: 13px;
                    font-weight: 600 !important;
                    padding: 8px 20px;
                }
                .bypassing-popup .button-la-light-outline-last {
                    margin-right: 0 !important;
                }
                .bypassing-popup .jconfirm-box:after {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 50;
                    visibility: hidden;
                    width: 100%;
                    height: 100%;
                    content: "";
                    opacity: 0;
                    background-color: rgba(255, 255, 255, 0.75);
                    background-image: url("{% static '' %}/Targeting Settings_files/round-loading.svg");
                    background-repeat: no-repeat;
                    background-position: center;
                    -webkit-transition: all ease 0.2s;
                    -moz-transition: all ease 0.2s;
                    transition: all ease 0.2s;
                }
                .bypassing-popup .jconfirm-box.onprogress:after {
                    visibility: visible;
                    opacity: 1;
                    border-radius: 5px;
                    -moz-border-radius: 5px;
                    -webkit-border-radius: 5px;
                    -o-border-radius: 5px;
                }
            </style>
        `);
    }
}

/**
 * Special Alert
 */
BypassingToolkit.specialAlertResponse = function(resp = null) {
    $.alert({
        title: resp ? ( resp.title ? resp.title: __("Oops!") )  : __("Oops!"),
        content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
        theme: 'modern',
        buttons: {
            confirm: {
                text: __("Close"),
                btnClass: "small button btn-red",
                keys: ['enter'],
                confirm: function() {
                    if (resp && resp.redirect) {
                        window.location.href = resp.redirect;
                    }
                }
            }
        },
        draggable: false,
        closeIcon: true,
        icon: 'icon-close',
        type: 'red'
    });
}

/**
 * Re-connect Account
 */
BypassingToolkit.ReConnect = function()  {
    $("body").off("click", "a.js-bypassing-toolkit-re-connect").on("click", "a.js-bypassing-toolkit-re-connect", function() {
        var id = $(this).data("id");
        var url = $(this).data("bypass-url");
        var account_box = $(".box-list-item[data-id='" + id + "']");
        var $accounts = $("#accounts");
        var switcher = $accounts.find(".private-switcher-icon[data-account-id='" + id + "']");
        var private_switcher = $accounts.find(":input[name='private-switcher-" + id + "']");

        account_box.addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "reconnect",
                id: id
            },

            error: function() {
                account_box.removeClass("onprogress");
                BypassingToolkit.specialAlertResponse();
            },

            success: function(resp) {
                account_box.removeClass("onprogress");
                if (resp.result == 1) {
                    var reconnect_overlay = $(".js-bypassing-toolkit-re-connect[data-id='" + id + "']");
                    reconnect_overlay.fadeOut();

                    var reconnect_quick_info = $(".quick-info .js-bypassing-toolkit-re-connect[data-id='" + id + "']");
                    var reconnect_success = __("Account connected");
                    reconnect_quick_info.replaceWith("<a class='color-success'><span class='mdi mdi-checkbox-marked-circle-outline reconnect-success'></span>" + reconnect_success + "</a>");

                    var account_pic = $(".accounts-pic[data-id='" + id + "']");
                    account_pic.replaceWith("<img class='circle accounts-pic' src='" + resp.avatar_url + "' data-id='" + id + "'>");

                    var account_numbers = $(".account-basic-numbers[data-id='" + id + "']");
                    account_numbers.find(".accounts-page-posts span").text(number_styler(resp.data.media_count));
                    account_numbers.find(".accounts-page-followers span").text(number_styler(resp.data.follower_count));
                    account_numbers.find(".accounts-page-follow span").text(number_styler(resp.data.following_count));

                    if (resp.data.is_private) {
                        switcher.addClass("mdi-eye-off");
                        switcher.removeClass("mdi-eye");
                        switcher.addClass("private-switcher-icon-enabled");
                        private_switcher.prop("checked", true);
                    } else {
                        switcher.removeClass("mdi-eye-off");
                        switcher.addClass("mdi-eye");
                        switcher.removeClass("private-switcher-icon-enabled");
                        private_switcher.prop("checked", false);
                    }
                } else {
                    BypassingToolkit.ProcessResponse(id, url, resp);
                }
            }
        });
    });
}

/**
 * Refresh self info
 */
BypassingToolkit.RefreshSelfInfo = function() {
    // Refresh self info on Accounts page
    $("body").off("click", "a.js-bypassing-toolkit-refresh-self-info").on("click", "a.js-bypassing-toolkit-refresh-self-info", function() {
        var id = $(this).data("id");
        var url = $(this).data("bypass-url");
        var account_box = $(".box-list-item[data-id='" + id + "']");
        var $accounts = $("#accounts");
        var switcher = $accounts.find(".private-switcher-icon[data-account-id='" + id + "']");
        var private_switcher = $accounts.find(":input[name='private-switcher-" + id + "']");
        var insights_basic_buttons = $accounts.find(".insights-basic-buttons");

        account_box.addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "selfinfo",
                id: id
            },

            error: function() {
                account_box.removeClass("onprogress");
                BypassingToolkit.specialAlertResponse();
            },

            success: function(resp) {
                account_box.removeClass("onprogress");
                if (resp.result == 1) {
                    var reconnect_overlay = $(".js-bypassing-toolkit-re-connect[data-id='" + id + "']");
                    if (reconnect_overlay) {
                        reconnect_overlay.fadeOut();
                    }

                    var reconnect_quick_info = $(".quick-info .js-bypassing-toolkit-re-connect[data-id='" + id + "']");
                    var reconnect_success = __("Account connected");
                    if (reconnect_quick_info) {
                        reconnect_quick_info.replaceWith("<a class='color-success'><span class='mdi mdi-checkbox-marked-circle-outline reconnect-success'></span>" + reconnect_success + "</a>");
                    }

                    var account_pic = $(".accounts-pic[data-id='" + id + "']");
                    account_pic.replaceWith("<img class='circle accounts-pic' src='" + resp.avatar_url + "?" + Math.floor(Math.random() * 1000000000) + "' data-id='" + id + "'>");

                    var account_username = $(".accounts-username[data-id='" + id + "']");
                    if (resp.data.username) {
                        account_username.text(resp.data.username);
                    }

                    var account_numbers = $(".account-basic-numbers[data-id='" + id + "']");
                    account_numbers.find(".accounts-page-posts span").text(number_styler(resp.data.media_count));
                    account_numbers.find(".accounts-page-followers span").text(number_styler(resp.data.follower_count));
                    account_numbers.find(".accounts-page-follow span").text(number_styler(resp.data.following_count));

                    if (resp.data.is_private) {
                        switcher.addClass("mdi-eye-off");
                        switcher.removeClass("mdi-eye");
                        switcher.addClass("private-switcher-icon-enabled");
                        private_switcher.prop("checked", true);
                    } else {
                        switcher.removeClass("mdi-eye-off");
                        switcher.addClass("mdi-eye");
                        switcher.removeClass("private-switcher-icon-enabled");
                        private_switcher.prop("checked", false);
                    }

                    var old_insights_basic_chart = $(".insights-basic-chart[data-id='" + id + "']");
                    old_insights_basic_chart.html('<canvas id="insights-basic-canvas" data-id="' + id + '"></canvas>');

                    var period = insights_basic_buttons.find(".insights-basic-button .active").data("type");
                    NextPost.InsightsBasic([id], url, period);
                } else {
                    BypassingToolkit.ProcessResponse(id, url, resp);
                }
            }
        });
    });
    // Edit Data
    $("body").off("click", "a.js-bypassing-edit-profile").on("click", "a.js-bypassing-edit-profile", function() {
        var id = $(this).data("id");
        var url = $(this).data("bypass-action-url");
        var account_box = $(".box-list-item[data-id='" + id + "']");

        account_box.addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "account-details",
                id: id
            },
            error: function() {
                account_box.removeClass("onprogress");
                BypassingToolkit.specialAlertResponse();
            },
            success: function(resp) {
                account_box.removeClass("onprogress");
                BypassingToolkit.ProcessResponse(id, url, resp);
            }
        });
    });
}

/**
 * Response Processing
 */
BypassingToolkit.ProcessResponse = function(id, url, resp, popup_to_close = null) {
    if (typeof resp.update_password != 'undefined' && resp.update_password) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "update-password", "bypassing-popup", "password", "password", resp);
    } else if (typeof resp.update_password != 'undefined' && resp.update_password) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "update-username", "bypassing-popup", "username", "text",  resp);
    } else if (typeof resp.change_password != 'undefined' && resp.change_password) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "change-password", "bypassing-popup", "password", "password", resp);
    } else if (typeof resp.submit_email != 'undefined' && resp.submit_email) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "submit-email", "bypassing-popup", "email", "text", resp);
    } else if (typeof resp.submit_phone != 'undefined' && resp.submit_phone) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "submit-phone", "bypassing-popup", "phone", "text", resp);
    } else if (typeof resp.submit_code != 'undefined' && resp.submit_code) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "submit-code", "bypassing-popup", "code", "text", resp);
    } else if (typeof resp.submit_choice != 'undefined' && resp.submit_choice) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "submit-choice", "bypassing-popup", "choice", "select", resp);
    } else if (typeof resp.submit_contact_point != 'undefined' && resp.submit_contact_point) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "submit-contact-point", "bypassing-popup", "choice", "select", resp);
    } else if (typeof resp.force_submit_phone != 'undefined' && resp.force_submit_phone) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "force-submit-phone", "bypassing-popup", "phone", "text", resp);
    } else if (typeof resp.force_submit_email != 'undefined' && resp.force_submit_email) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "force-submit-email", "bypassing-popup", "email", "text", resp);
    } else if (typeof resp.force_verify_code != 'undefined' && resp.force_verify_code) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "force-verify-code", "bypassing-popup", "code", "text", resp);
    } else if (typeof resp.twofa_required != 'undefined' && resp.twofa_required) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "twofa-select-method", "bypassing-popup", "method", "select_v2", resp);
    } else if (typeof resp.twofa_verify_code != 'undefined' && resp.twofa_verify_code) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "twofa-send-code", "bypassing-popup", "code", "text", resp);
    } else if (typeof resp.account_details != 'undefined' && resp.account_details) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "edit-account-details", "bypassing-popup", "inputs", "inputs", resp);
    } else if (typeof resp.bypass_captcha != 'undefined' && resp.bypass_captcha) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        BypassingToolkit.ActionPopup(id, url, "bypass-captcha", "bypassing-popup", "none", "none", resp);
    } else if (typeof resp.captcha_in_progress != 'undefined' && resp.captcha_in_progress) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        var account_box = $(".box-list-item[data-id='" + id + "']");
        account_box.addClass("onprogress");
        setTimeout(function (){
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "bypass-captcha",
                    id: id,
                },
                error: function() {
                    account_box.removeClass("onprogress");
                    BypassingToolkit.specialAlertResponse();
                },
                success: function(resp) {
                    account_box.removeClass("onprogress");
                    if (resp) {
                        if (resp.result == 0) {
                            BypassingToolkit.ProcessResponse(id, url, resp);
                        } else {
                            $(".js-bypassing-toolkit-refresh-self-info[data-id='" + id + "']").click();
                        }
                    }
                }
            });
            return false;
        }, 15000);
    } else if (typeof resp.autoclose != 'undefined' && resp.autoclose) {
        if (popup_to_close) {
            popup_to_close.find(".jconfirm-closeIcon").click();
        }
        $("body").find(".accounts-pic[data-id='" + 530 + "']").attr("src", (resp.avatar_url ? resp.avatar_url : ""));
    } else {
        BypassingToolkit.specialAlertResponse(resp);
    }
}

/**
 * Action Popup
 */
BypassingToolkit.ActionPopup = function(id, url, action, column_class, input_name, input_type, resp) {
    var content = '<div class="mb-10 bypassing-content">' + resp.msg + '</div>';
    if (input_type == "select_v2") {
        if (typeof resp.select != 'undefined' && $.isArray(resp.select) && resp.select.length > 0) {
            content += '<div class="mt-5 mb-5">';
            content += '<select class="input input-bypassing" id="' + input_name + '" name="' + input_name + '" data-id="' + id + '">';
            $.each(resp.select, function(index, el) {
                if (typeof el['value'] != 'undefined' && typeof el['label'] != 'undefined') {
                    content += '<option value="' + el['value'] + '">' + el['label'] + '</option>';
                }
            });
            content += '</select>';
            content += '</div>';
        }
    } else if (input_type == "select") {
        if (typeof resp.select != 'undefined' && $.isArray(resp.select) && resp.select.length > 0) {
            content += '<div class="mt-5 mb-5">';
            content += '<select class="input input-bypassing" id="' + input_name + '" name="' + input_name + '" data-id="' + id + '">';
            $.each(resp.select, function(index, element) {
                if (element.indexOf("WhatsApp") >= 0) {
                    content += '<option value="7">' + element + '</option>';
                } else {
                    content += '<option value="' + index + '">' + element + '</option>';
                }
            });
            content += '</select>';
            content += '</div>';
        }
    } else if (input_type == "inputs") {
        if (typeof resp.inputs != 'undefined' && $.isArray(resp.inputs) && resp.inputs.length > 0) {
            content += '<div class="mt-5 mb-5">';
            $.each(resp.inputs, function(index, element) {
                if (typeof element.css != 'undefined' && element.css || typeof element.react_style != 'undefined' && element.react_style) {
                    content += '<div class="' + (element.react_style ? 'bypassing-react-style ' : '') + (element.css ?? '') + '">';
                }
                if (element.type == "file") {
                    content +=
                    '<div class="bypassing-avatar-round mb-10">' +
                        '<input class="input input-bypassing js-bypassing-update-avatar" name="' + element.name + '" type="' + element.type + '" id="bypassing-avatar-file" data-id="' + id + '" data-url="' + url + '" placeholder="' + element.label + '">' +
                        '<label class="bypassing-avatar-file-label" for="bypassing-avatar-file">' +
                            '<span class="bypassing-avatar-upload-icon mdi mdi-arrow-up-bold-circle"></span>' +
                        '</label>' +
                        '<img class="circle bypassing-avatar-img" src="' + element.value + '">' +
                    '</div>';
                } else if (element.type == "text") {
                    content += '<input class="input input-bypassing mb-10" name="' + element.name + '" type="' + element.type + '" data-id="' + id + '" value="' + (element.value ? element.value : "") + '" placeholder="' + element.label + '">';
                } else if (element.type == "textarea") {
                    content += '<textarea class="input input-bypassing input-bypassing-textarea mb-10" name="' + element.name + '" maxlength="150" placeholder="' + element.label + '">' + element.value + '</textarea>';
                } else if (element.type == "date") {
                    content += '<input class="input input-bypassing input-bypassing-date js-datepicker-bypassing mb-10" name="' + element.name + '" type="text" maxlength="20" value="' + (element.value ? element.value : "") + '" readonly>';
                } else if (element.type == "select") {
                    if (typeof element.values != 'undefined' && $.isArray(element.values) && element.values.length > 0) {
                        content += '<select class="input input-bypassing mb-10" name="' + element.name + '" data-id="' + id + '">';
                        $.each(element.values, function(index, el) {
                            content += '<option value="' + el.value + '" ' + ((el.value == element.value) ? 'selected' : '') + '>' + el.label + '</option>';
                        });
                        content += '</select>';
                    }
                } else if (element.type == "text-with-search") {
                    content +=
                        '<div class="bypassing-category-search-results none"></div>' +
                        '<div class="bypassing-search-box">' +
                            '<div class="pos-r">' +
                                '<input type="hidden" name="' + element.name + '" data-id="' + id + '" value="' + (element.id ? element.id : "") + '"></input>' +
                                '<input class="input input-bypassing mb-10 leftpad rightpad" name="bypassing-category-search" type="text" data-id="' + id + '" data-url="' + url + '" placeholder="' + element.label + '" value="' + (element.value ? element.value : "") + '">' +
                                '<a href="javascript:void(0)" class="js-enable-bypassing-category-search mdi mdi-close-circle field-icon--right none"></a>' +
                                '<span class="mdi mdi-label field-icon--left pe-none"></span>' +
                            '</div>' +
                        '</div>';
                }
                if (typeof element.react_style != 'undefined' && element.react_style && typeof element.label != 'undefined' && element.label) {
                    if (typeof element.react_search != 'undefined' && element.react_search) {
                        content += '<div class="bypassing-react-input-label-search">' + element.label + '</div>';
                    } else {
                        content += '<div class="bypassing-react-input-label">' + element.label + '</div>';
                    }
                }
                if (typeof element.css != 'undefined' && element.css || typeof element.react_style != 'undefined' && element.react_style) {
                    content += '</div>';
                }
            });
            content += '</div>';
        }
    } else {
        if (resp.input_msg) {
            content += '<div class="mt-5 mb-5"><input class="input input-bypassing" name="' + input_name + '" type="' + input_type + '" data-id="' + id + '" value="' + (resp.input_prev ? resp.input_prev : "") + '" placeholder="' + resp.input_msg + '"></div>';
        }
    }

    var buttons = {
        save: {
            text: resp.submit_button ? resp.submit_button : __("Confirm"),
            btnClass: "col s12 m12 l12 bypassing-small button button--dark",
            keys: ['enter'],
            action: function() {
                var action_popup = $("body").find("." + column_class + " .jconfirm-box");
                action_popup.addClass("onprogress");
                var data = {
                    action: action,
                    id: id,
                };
                if (action == "edit-account-details") {
                    action_popup.find(".input-bypassing").each(function(index) {
                        data[$(this).attr("name")] = $(this).val();
                    });
                    data["category_id"] = $("body").find(":input[name='category_id'][data-id='" + id + "']").val();
                } else {
                    data[input_name] = $("body").find(".input-bypassing[name='" + input_name + "'][data-id='" + id + "']").val();
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'jsonp',
                    data: data,
                    error: function() {
                        action_popup.removeClass("onprogress");
                        BypassingToolkit.specialAlertResponse();
                    },
                    success: function(resp) {
                        action_popup.removeClass("onprogress");
                        if (resp) {
                            if (resp.result == 0) {
                                BypassingToolkit.ProcessResponse(id, url, resp, action_popup);
                            } else {
                                action_popup.find(".jconfirm-closeIcon").click();
                                $(".js-bypassing-toolkit-refresh-self-info[data-id='" + id + "']").click();
                            }
                        }
                    }
                });
                return false;
            }
        }
    }

    if (action == "submit-code" || action == "force-verify-code" || action == "twofa-send-code" && typeof resp.method != 'undefined' && resp.method == 1) {
        buttons.replay = {
            text: '<div class="bypassing-resend-text" data-id="' + id  + '">' + __("Resend code") + '</div><div class="bypassing-resend-timeout ml-3" data-id="' + id  + '" data-value="60">(60)</div>',
            btnClass: "col s12 m12 l12 bypassing-small button button--dark--outline button--replay button--disabled",
            keys: ['r','shift'],
            action: function() {
                var action_popup = $("body").find("." + column_class + " .jconfirm-box");
                if (!action_popup.find(".button--replay").hasClass("button--disabled")) {
                    action_popup.addClass("onprogress");
                    var data = {
                        action: action == "twofa-send-code" ? "twofa-replay" : "replay",
                        id: id,
                    };
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'jsonp',
                        data: data,
                        error: function() {
                            action_popup.removeClass("onprogress");
                            BypassingToolkit.specialAlertResponse();
                        },
                        success: function(resp) {
                            action_popup.removeClass("onprogress");
                            if (resp) {
                                if (resp.result == 0) {
                                    if (typeof resp.reload != 'undefined' && resp.reload) {
                                        BypassingToolkit.ProcessResponse(id, url, resp, action_popup);
                                    } else {
                                        BypassingToolkit.specialAlertResponse(resp);
                                    }
                                } else {
                                    action_popup.find("bypassing-resend-text[data-id='" + + id  + "']").html(__("Code sent"));
                                    setTimeout(function() {
                                        action_popup.find(".button--replay").addClass("button--disabled");
                                        action_popup.find("bypassing-resend-text[data-id='" + + id  + "']").html(__("Resend code"));
                                        var timeout = action_popup.find(".bypassing-resend-timeout[data-id='" + + id  + "']");
                                        if (timeout.length > 0) {
                                            console.log("b-replay");
                                            var counter = 60;
                                            timeout.addClass("ml-3");
                                            timeout.attr("data-value", counter);
                                            timeout.html("(" + counter + ")");
                                            var interval = setInterval(function() {
                                                counter--;
                                                timeout.attr("data-value", counter);
                                                if (counter <= 0) {
                                                    timeout.html("");
                                                    timeout.removeClass("ml-3");
                                                    action_popup.find(".button--replay").removeClass("button--disabled");
                                                    clearInterval(interval);
                                                } else {
                                                    timeout.html("(" + counter + ")");
                                                }
                                            }, 1000);
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
                return false;
            }
        }
    }

    buttons.cancel = {
        text: (typeof resp.back_button != 'undefined' && resp.back_button ? resp.back_button : __("Close")),
        btnClass: "col s12 m12 l12 bypassing-small button button--dark--outline",
        keys: ['esc'],
        action: function() {
            if (typeof resp.back_button != 'undefined' && resp.back_button) {
                var action_popup = $("body").find("." + column_class + " .jconfirm-box");
                var action = typeof resp.back_action != 'undefined' && resp.back_action ? resp.back_action : "rewind";
                action_popup.addClass("onprogress");
                var data = {
                    action: action,
                    id: id,
                };
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'jsonp',
                    data: data,
                    error: function() {
                        action_popup.removeClass("onprogress");
                        BypassingToolkit.specialAlertResponse();
                    },
                    success: function(resp) {
                        action_popup.removeClass("onprogress");
                        if (resp) {
                            if (resp.result == 0) {
                                BypassingToolkit.ProcessResponse(id, url, resp, action_popup);
                            } else {
                                action_popup.find(".jconfirm-closeIcon").click();
                                $(".js-bypassing-toolkit-refresh-self-info[data-id='" + id + "']").click();
                            }
                        }
                    }
                });
                return false;
            }
        }
    }

    $.confirm({
        title: resp.title ? resp.title : __("Oops..."),
        content: content,
        theme: 'material',
        buttons: buttons,
        draggable: false,
        backgroundDismiss: false,
        columnClass: column_class,
        closeIcon: true,
        onOpen: function () {
            BypassingToolkit.DatePicker();
            BypassingToolkit.Search();
            BypassingToolkit.AccountAvatar();
            if (action == "submit-code" || action == "force-verify-code") {
                var action_popup = $("body").find("." + column_class + " .jconfirm-box");
                var timeout = action_popup.find(".bypassing-resend-timeout[data-id='" + + id  + "']");
                if (timeout.length > 0) {
                    console.log("b-confirm");
                    var counter = timeout.attr("data-value");
                    var interval = setInterval(function() {
                        counter--;
                        timeout.attr("data-value", counter);
                        if (counter <= 0) {
                            timeout.html("");
                            timeout.removeClass("ml-3");
                            action_popup.find(".button--replay").removeClass("button--disabled");
                            clearInterval(interval);
                        } else {
                            timeout.html("(" + counter + ")");
                        }
                    }, 1000);
                }
            }
        }
    });
}

/**
 * Date time pickers
 */
BypassingToolkit.DatePicker = function() {
    $(".js-datepicker-bypassing").each(function() {
        $(this).removeClass("js-datepicker-bypassing");
        $(this).datepicker({
            language: $("html").attr("lang"),
            dateFormat: "yyyy-mm-dd",
            autoClose: true,
            timepicker: false,
            toggleSelected: false
        });
    });
}

/**
 * Perform a search in location input
 */
BypassingToolkit.Search = function() {
    var $search_results = $("body").find(".bypassing-category-search-results");
    var $active_search_input;
    var search_xhr;
    var search_query;
    var search_timer;
    var search_cache = {};

    var current_value = $("body").find(":input[name='bypassing-category-search']").val();
    if (current_value && current_value.length > 1) {
        $("body").find(".js-enable-bypassing-category-search").removeClass("none");
        $("body").find(":input[name='bypassing-category-search']").prop("readonly", true);
    }

    var getResults = function() {
        var account_id = $("body").find(":input[name='bypassing-category-search']").data("id");
        var cache_key = account_id + search_query;

        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        if (search_cache[cache_key]) {
            $search_results.html("<p></p>");
            $search_results.find("p").text(__("Searching for %s").replace("%s", search_query));
            $search_results.removeClass("none");

            parseSearchResponse(search_cache[cache_key]);
            return true;
        }

        search_timer = setTimeout(function() {
            search_xhr = new window.XMLHttpRequest();
            $.ajax({
                url: $("body").find(":input[name='bypassing-category-search']").data("url"),
                type: 'POST',
                dataType: 'jsonp',
                cache: true,
                data: {
                    action: "search-category",
                    id: account_id,
                    q: search_query
                },
                xhr: function() {
                    return search_xhr;
                },
                beforeSend: function() {
                    $search_results.html("<p></p>");
                    $search_results.find("p").text(__("Searching for %s").replace("%s", search_query));
                    $search_results.removeClass("none");
                },
                error: function() {
                    $search_results.html("").addClass("none");
                },
                success: function(resp) {
                    parseSearchResponse(resp);
                    search_cache[cache_key] = resp;
                }
            });
        }, 200);
    }

    var parseSearchResponse = function(resp) {
        if (resp.result == 1) {
            $search_results.html("");
            for (var i = 0; i < resp.items.length; i++) {
                var r = resp.items[i];
                var $r = $("<a href='javascript:void(0)' class='item'></a>");
                var value = r.value;
                $r.text(value);
                $r.data("value", value);
                if (r.data.id) {
                    // unique data id
                    $r.data("id", r.data.id);
                }
                $r.appendTo($search_results);
            }
        } else {
            $search_results.html("").addClass("none");
        }
    }

    $("body").find(":input[name='bypassing-category-search']").on("keyup", function() {
       if ($(this).prop("readonly")) {
            return false;
        }

        $active_search_input = $(this);
        $search_results.insertAfter($active_search_input.parent());

        search_query = $active_search_input.val();
        if (search_query[0] == "#" || search_query[0] == "@") {
            search_query = search_query.slice(1);
        }

        if (search_query && search_query.length > 1) {
            getResults();
        } else {
            $search_results.addClass("none");
        }
    });

    $search_results.on("click", ".item", function() {
        var value = $(this).data("value");
        var id = $(this).data("id") ? $(this).data("id") : null;

        $("body").find(".js-enable-bypassing-category-search").removeClass("none");
        $("body").find(":input[name='bypassing-category-search']").val(value).prop("readonly", true);
        $("body").find(":input[name='category_id']").val(id);

        $search_results.addClass("none");
    });

    $("body").find(".js-enable-bypassing-category-search").on("click", function() {
        $("body").find(":input[name='bypassing-category-search']").val("").prop("readonly", false);
        $("body").find(":input[name='category_id']").val("");
        $("body").find(".js-enable-bypassing-category-search").addClass("none");
    });
}

BypassingToolkit.AccountAvatar = function() {
    $(".js-bypassing-update-avatar").on("change", function() {
        var $this = $(this);
        var file = $this.prop('files')[0];
        var fileType = file["type"];
        var fileSize = file["size"];
        var avatar_box = $("body").find(".bypassing-avatar-file-label");


        // Check file type
        var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if ($.inArray(fileType, validImageTypes) < 0) {
            BypassingToolkit.specialAlertResponse({
                msg: __("File type is not allowed. Please use JPEG, PNG or GIF images.")
            });
        }

        // Check file size
        if (fileSize < 0 || fileSize > 5 * 1024 * 1024) {
            BypassingToolkit.specialAlertResponse({
                msg: __("We only allow images up to 5MB in size.")
            });
        }

        var fd = new FormData;
        fd.append('avatar', file);
        fd.append('action', 'upload-avatar');
        fd.append('id', $this.data("id"));

        avatar_box.addClass("onprogress");

        $.ajax({
            url: $this.data("url"),
            type: 'POST',
            dataType: 'jsonp',
            data: fd,
            contentType: false,
            processData: false,
            error: function(resp) {
                avatar_box.removeClass("onprogress");
                specialAlertResponse(resp);
            },
            success: function(resp) {
                avatar_box.removeClass("onprogress");
                if (resp.result == 1) {
                    if (resp.avatar_url) {
                        $("body").find("img.bypassing-avatar-img").attr("src", resp.avatar_url);
                    }
                } else {
                    specialAlertResponse(resp);
                }
            }
        });
    });
}

/**
 * GitHub Actions
 */
$("body").on("click", "a.js-pmp-latest-install-version,a.js-pmp-install-selected-version", function() {
    var _this = $(this);

    var version = 'latest'
    if (!_this.hasClass('js-pmp-latest-install-version')) {
        version = $("body").find(".github-version-select").val();
    }

    $.ajax({
        url: _this.data("url"),
        type: "POST",
        dataType: 'jsonp',
        data: {
            action: "update",
            version: version
        },
        error: function() {
            showToast(__("An error occured. Please try again later!"), {
                duration: 7000,
                background: '#f44336',
                color: '#fff',
                borderRadius: '5px',
                icon_style: 'mdi mdi-alert-circle-outline',
                close: true,
                progressBar: true
            });
        },
        success: function(resp) {
            if (resp.result == 1) {
                if (resp.version) {
                    $("body").find(".pmp-version-value").text(resp.version);
                }
                showToast(resp.msg, {
                    duration: resp.permanent ? 'lifetime' : 7000,
                    background: '#11b85e',
                    color: '#fff',
                    borderRadius: '5px',
                    icon_style: 'mdi mdi-checkbox-marked-circle-outline',
                    close: true,
                    progressBar: false
                });
            } else {
                showToast(resp.msg, {
                    duration: resp.permanent ? 'lifetime' : 7000,
                    background: '#f44336',
                    color: '#fff',
                    borderRadius: '5px',
                    icon_style: 'mdi mdi-alert-circle-outline',
                    close: true,
                    progressBar: false
                });
            }
        }
    });
});

/**
 * Launch challenge pro
 */
$(document).ready(function() {
    let params = (new URL(document.location)).searchParams;
    let acId = params.get("startRelogin");
    if (acId != '') {
        if ($("body").find(".quick-info").find(".js-bypassing-toolkit-re-connect[data-id='" + acId + "']").length > 0) {
            $("body").find(".quick-info").find(".js-bypassing-toolkit-re-connect[data-id='" + acId + "']").click();
        } else {
            $("body").find(".js-bypassing-toolkit-re-connect[data-id='" + acId + "']").click();
        }
        if ($("body").find(".quick-info").find(".js-re-connect[data-id='" + acId + "']").length > 0) {
            $("body").find(".quick-info").find(".js-re-connect[data-id='" + acId + "']").click();
        } else {
            $("body").find(".js-re-connect[data-id='" + acId + "']").click();
        }
    }
});