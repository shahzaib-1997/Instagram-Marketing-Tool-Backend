$(function () {
    NextPost.General();
    NextPost.Skeleton();
    NextPost.ContextMenu();
    NextPost.Tooltip();
    NextPost.Tabs();
    NextPost.Forms();
    NextPost.FileManager();
    NextPost.LoadMore();
    NextPost.Popups();

    NextPost.RemoveListItem();
    NextPost.AsideList();

    NextPost.ReConnect();
    NextPost.RefreshCookies();
    NextPost.LoginActivity();
    NextPost.ChangeAccountPassword();

    NextPost.DarkSideModeSwitcher();
    NextPost.Pages();
});


/**
 * NextPost Namespace
 */
var NextPost = {};

/**
 * General
 */
NextPost.General = function () {
    // Mobile menu
    $(".topbar-mobile-menu-icon").on("click", function () {
        $("body").toggleClass('mobile-menu-open');
    });


    // Pop State
    window.onpopstate = function (e) {
        if (e.state) {
            window.location.reload();
        }
    }
}


/**
 * Main skeleton
 */
NextPost.Skeleton = function () {
    if ($(".skeleton--full").length > 0) {
        var $elems = $(".skeleton--full").find(".skeleton-aside, .skeleton-content");
        $(window).on("resize", function () {
            var h = $(window).height() - $("#topbar").outerHeight();
            $elems.height(h);
        }).trigger("resize");

        $(".skeleton--full").show();
    }
}



/**
 * Context Menu
 */
NextPost.ContextMenu = function () {
    $("body").on("click", ".context-menu-wrapper", function (event) {
        var menu = $(this).find(".context-menu");

        $(".context-menu").not(menu).removeClass('active');
        menu.toggleClass("active");
        event.stopPropagation();
    });

    $(window).on("click", function () {
        $(".context-menu.active").removeClass("active");
    });

    $("body").on("click", ".context-menu", function (event) {
        event.stopPropagation();
    })
}

/**
 * ToolTips
 */
NextPost.Tooltip = function () {
    $(".tippy").each(function () {
        var tip = tippy(this, {
            placement: 'right',
            delay: 100,
        });
        $(this).data("tip", tip);
    });
}


/**
 * Tabs
 */
NextPost.Tabs = function () {
    $("body").on("click", ".tabheads a", function () {
        var tab = $(this).data("tab");
        var $tabs = $(this).parents(".tabs");
        var $contents = $tabs.find(".tabcontents");
        var $content = $contents.find(">div[data-tab='" + tab + "']");

        if ($content.length != 1 || $(this).hasClass("active")) {
            return true;
        }

        $(this).parents(".tabheads").find("a").removeClass('active');
        $(this).addClass("active");

        $contents.find(">div").removeClass('active');
        $content.addClass('active');
    });
}


/**
 * General form functions
 */
NextPost.Forms = function () {
    $("body").on("input focus", ":input", function () {
        $(this).removeClass("error");
    });

    $("body").on("change", ".fileinp", function () {
        if ($(this).val()) {
            var label = $(this).val().split('/').pop().split('\\').pop();
        } else {
            var label = $(this).data("label")
        }
        $(this).next("div").text(label).attr("title", label);
        $(this).removeClass('error');
    });

    NextPost.DatePicker();
    NextPost.Combobox();
    NextPost.AjaxForms();
}


/**
 * Combobox
 */
NextPost.Combobox = function () {
    $("body").on("click", ".select2", function () {
        $(this).removeClass("error");
    });

    $(".combobox").select2({})
}


/**
 * Date time pickers
 */
NextPost.DatePicker = function () {
    $(".js-datepicker").each(function () {
        $(this).removeClass("js-datepicker");

        if ($(this).data("min-date")) {
            $(this).data("min-date", new Date($(this).data("min-date")))
        }

        if ($(this).data("start-date")) {
            $(this).data("start-date", new Date($(this).data("start-date")))
        }

        $(this).datepicker({
            language: $("html").attr("lang"),
            dateFormat: "yyyy-mm-dd",
            timeFormat: "hh:ii",
            autoClose: true,
            timepicker: true,
            toggleSelected: false
        });
    })
}


/**
 * Add msg to the $resobj and displays it
 * and scrolls to $resobj
 * @param {$ DOM} $form jQuery ref to form
 * @param {string} type
 * @param {string} msg
 */
var __form_result_timer = null;
NextPost.DisplayFormResult = function ($form, type, msg) {
    var $resobj = $form.find(".form-result");
    msg = msg || "";
    type = type || "error";

    if ($resobj.length != 1) {
        return false;
    }


    var $reshtml = "";
    switch (type) {
        case "error":
            $reshtml = "<div class='error'><span class='icon-close icon'></span> " + msg + "</div>";
            break;

        case "success":
            $reshtml = "<div class='success'><span class='icon-check icon'></span> " + msg + "</div>";
            break;

        case "info":
            $reshtml = "<div class='info'><span class='icon-info icon'></span> " + msg + "</div>";
            break;
    }

    $resobj.html($reshtml).stop(true).fadeIn();

    clearTimeout(__form_result_timer);
    __form_result_timer = setTimeout(function () {
        $resobj.stop(true).fadeOut();
    }, 10000);

    var $parent = $("html, body");
    var top = $resobj.offset().top - 85;
    if ($form.parents(".skeleton-content").length == 1) {
        $parent = $form.parents(".skeleton-content");
        top = $resobj.offset().top - $form.offset().top - 20;
    }

    $parent.animate({
        scrollTop: top + "px"
    });
}


/**
 * Ajax forms
 */
NextPost.AjaxForms = function () {
    var $form;
    var $result;
    var result_timer = 0;

    $("body").on("submit", ".js-ajax-form", function () {
        $form = $(this);
        $result = $form.find(".form-result")
        submitable = true;

        $form.find(":input.js-required").not(":disabled").each(function () {
            if (!$(this).val()) {
                $(this).addClass("error");
                submitable = false;
            }
        });

        if (submitable) {
            $("body").addClass("onprogress");

            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                dataType: 'jsonp',
                data: $form.serialize(),
                error: function () {
                    $("body").removeClass("onprogress");
                    NextPost.DisplayFormResult($form, "error", __("Oops! An error occured. Please try again later!"));
                },

                success: function (resp) {
                    if (typeof resp.redirect === "string") {
                        window.location.href = resp.redirect;
                    } else if (typeof resp.msg === "string") {
                        var result = resp.result || 0;
                        var reset = resp.reset || 0;
                        switch (result) {
                            case 1: //
                                NextPost.DisplayFormResult($form, "success", resp.msg);
                                if (reset) {
                                    $form[0].reset();
                                }
                                break;

                            case 2: //
                                NextPost.DisplayFormResult($form, "info", resp.msg);
                                break;

                            default:
                                NextPost.DisplayFormResult($form, "error", resp.msg);
                                break;
                        }
                        $("body").removeClass("onprogress");
                    } else {
                        $("body").removeClass("onprogress");
                        NextPost.DisplayFormResult($form, "error", __("Oops! An error occured. Please try again later!"));
                    }
                }
            });
        } else {
            NextPost.DisplayFormResult($form, "error", __("Fill required fields"));
        }

        return false;
    });
}



/**
 * Load More
 * @var window.loadmore Global object to hold callbacks etc.
 */
window.loadmore = {}
NextPost.LoadMore = function () {
    $("body").on("click", ".js-loadmore-btn", function () {
        var _this = $(this);
        var _parent = _this.parents(".loadmore");
        var id = _this.data("loadmore-id");

        if (!_parent.hasClass("onprogress")) {
            _parent.addClass("onprogress");

            $.ajax({
                url: _this.attr("href"),
                dataType: 'html',
                error: function () {
                    _parent.fadeOut(200);

                    if (typeof window.loadmore.error === "function") {
                        window.loadmore.error(); // Error callback
                    }
                },
                success: function (Response) {
                    var resp = $(Response);
                    var $wrp = resp.find(".js-loadmore-content[data-loadmore-id='" + id + "']");

                    if ($wrp.length > 0) {
                        var wrp = $(".js-loadmore-content[data-loadmore-id='" + id + "']");
                        wrp.append($wrp.html());

                        if (typeof window.loadmore.success === "function") {
                            window.loadmore.success(); // Success callback
                        }
                    }

                    if (resp.find(".js-loadmore-btn[data-loadmore-id='" + id + "']").length == 1) {
                        _this.attr("href", resp.find(".js-loadmore-btn[data-loadmore-id='" + id + "']").attr("href"));
                        _parent.removeClass('onprogress none');
                    } else {
                        _parent.hide();
                    }
                }
            });
        }

        return false;
    });

    $(".js-loadmore-btn.js-autoloadmore-btn").trigger("click");
}


/**
 * Popups
 */
NextPost.Popups = function () {
    var w = scrollbarWidth();

    $(window).on("resize", function () {
        $('#popupstyles').remove();

        if ($("body").outerHeight() > $(window).height()) {
            $("head").append(
                "<style id='popupstyles'>" +
                "body.js-popup-opened { padding-right:" + w + "px; overflow:hidden; }" +
                ".js-popup { overflow-y:scroll; }" +
                "</style>"
            );
        }
    }).trigger("resize");

    $("body").on("click", ".js-open-popup", function () {
        var $popup = $($(this).data("popup"));

        if ($popup.length != 1) {
            return true;
        }

        $("body").addClass('js-popup-opened');
        $popup.removeClass('none');

        return false;
    });

    $("body").on("click", ".js-close-popup", function () {
        $("body").removeClass('js-popup-opened');
        $(this).parents(".js-popup").addClass("none");
    });
}


/**
 * Remove List Item (Data entry)
 *
 * Sends remove request to the backend
 * for selected list item (data entry)
 */
NextPost.RemoveListItem = function () {
    $("body").on("click", "a.js-remove-list-item", function () {
        var item = $(this).parents(".js-list-item");
        var id = $(this).data("id");
        var url = $(this).data("url");

        NextPost.Confirm({
            confirm: function () {
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'jsonp',
                    data: {
                        action: "remove",
                        id: id
                    }
                });

                item.fadeOut(500, function () {
                    item.remove();
                });
            }
        })
    });
}


/**
 * Actions related to aside list items
 */
NextPost.AsideList = function () {
    // Load content for selected aside list item
    $(".skeleton-aside").on("click", ".js-ajaxload-content", function () {
        var item = $(this).parents(".aside-list-item");
        var url = $(this).attr("href");

        if (!item.hasClass('active')) {
            $(".aside-list-item").removeClass("active");
            item.addClass("active");

            $(".skeleton-aside").addClass('hide-on-medium-and-down');

            $(".skeleton-content")
                .addClass("onprogress")
                .removeClass("hide-on-medium-and-down")
                .load(url + " .skeleton-content>", function () {
                    $(".skeleton-content").removeClass('onprogress');
                });

            window.history.pushState({}, $("title").text(), url);
        }

        return false;
    });

    NextPost.AsideListSearch();
}


/**
 * Search aside list items
 */
NextPost.AsideListSearch = function () {
    /**
     * Previous search query
     * Don't perform a search if the new search query is
     * same as previous one
     */
    var prev_search_query;

    /**
     * Timer placeholder for the timeout between search requests
     */
    var search_timer;

    /**
     * XMLHttpRequest
     *
     * Handler for XMLHttpRequest. This will be used cancel/abort
     * the ajax requests when needed. This is a workaround for jQuery 3+
     * As of jQuery 3, the ajax method returns a promise
     * without extra methods (like abort). So ajax_handler.abort() is invalid
     * in jQuery 3+
     */
    var search_xhr;

    /**
     * jQuery ref. to the DOM element of the aside search form
     * @type {[type]}
     */
    var $form = $(".skeleton-aside .search-box");


    /**
     * Perform search on keyup on search input
     */
    $form.find(":input[name='q']").on("keyup", function () {
        var _this = $(this);
        var search_query = $.trim(_this.val());

        if (search_query == prev_search_query) {
            return true;
        }

        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        prev_search_query = search_query;
        var duration = search_query.length > 0 ? 200 : 0;
        search_timer = setTimeout(function () {
            _this.addClass("onprogress");

            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                dataType: 'html',
                data: {
                    q: search_query
                },
                complete: function () {
                    _this.removeClass('onprogress');
                },

                success: function (resp) {
                    $resp = $(resp);

                    if ($resp.find(".skeleton-aside .js-search-results").length == 1) {
                        $(".skeleton-aside .js-search-results")
                            .html($resp.find(".skeleton-aside .js-search-results").html());
                    }

                    if (search_query.length > 0) {
                        $form.addClass("search-performed");
                    } else {
                        $form.removeClass("search-performed");
                    }
                }
            });
        }, duration);
    });


    /**
     * Cancel search
     */
    $form.find(".cancel-icon").on("click", function () {
        $form.find(":input[name='q']")
            .val("")
            .trigger('keyup');
    });
}


/**
 * File Manager
 */
NextPost.FileManager = function () {
    var fmwrapper = $("#filemanager");
    if (fmwrapper.length != 1) {
        return false;
    }

    fmwrapper.oneFileManager({
        lang: $("html").attr("lang") || "en",
        onDoubleClick: function ($file) {
            window.filemanager.selectFile($file);

            $(".filepicker").find(".js-submit").trigger("click")
        }
    });

    window.filemanager = fmwrapper.data("ofm");

    // Device file browser
    $("body").on("click", ".js-fm-filebrowser", function () {
        window.filemanager.browseDevice();
    });

    // URL Input form toggler
    $("body").on("click", ".js-fm-urlformtoggler", function () {
        window.filemanager.toggleUrlForm();
    });


    // Dropbox Chooser
    NextPost.DropboxChooser();

    // OneDrive Picker
    NextPost.OnedrivePicker();

    // Google Drive Picker
    //
    // Will be initialized automatically,
    // there is no need to call method here.

    // File Pickers (Browse buttons)
    NextPost.FilePickers();
}


/**
 * File Pickers (Browse buttons)
 */
NextPost.FilePickers = function () {
    var acceptor;

    $("body").on("click", ".js-fm-filepicker", function () {
        acceptor = $(this).data("fm-acceptor");
        $(".filepicker").stop(true).fadeIn();
    });

    $(".filepicker").find(".js-close").on("click", function () {
        $(".filepicker").stop(true).fadeOut();
    });

    $(".filepicker").find(".js-submit").on("click", function () {
        if (acceptor) {
            var selection = window.filemanager.getSelection();
            var file = selection[Object.keys(selection)[0]];
            $(acceptor).val(file.url);
        }
        $(".filepicker").stop(true).fadeOut();
    })
}


/**
 * Dropbox Chooser
 */
NextPost.DropboxChooser = function (settings) {
    $("body").on("click", "a.cloud-picker[data-service='dropbox']", function () {
        var _this = $(this);

        Dropbox.choose({
            linkType: "direct",
            multiselect: true,
            extensions: ['.jpg', '.jpeg', ".png", '.mp4'],
            success: function (files) {
                for (var i = 0; i < files.length; i++) {
                    if (i >= 10) {
                        break;
                    }

                    if (!files[i].isDir) {
                        window.filemanager.upload(files[i].link);
                    }
                }
            },
        })
    })
}


/**
 * Onedrive Picker
 */
NextPost.OnedrivePicker = function (settings) {
    $("body").on("click", "a.cloud-picker[data-service='onedrive']", function () {
        var _this = $(this);

        OneDrive.open({
            clientId: _this.data("client-id"),
            action: "download",
            multiSelect: true,
            openInNewWindow: true,
            advanced: {
                filter: '.jpeg,.jpg,.png,.mp4'
            },
            success: function (files) {
                for (var i = 0; i < files.value.length; i++) {
                    if (i >= 10) {
                        break;
                    }

                    window.filemanager.upload(files.value[i]["@microsoft.graph.downloadUrl"]);
                }
            }
        });
    })
}


/**
 * Google Drive Picker
 */
GoogleDrivePickerInitializer = function () {
    if ($("a.cloud-picker[data-service='google-drive']").length == 1) {
        var _this = $("a.cloud-picker[data-service='google-drive']");

        var picker = new GoogleDrivePicker({
            apiKey: _this.data("api-key"),
            clientId: _this.data("client-id").split(".")[0],
            buttonEl: _this[0],
            onSelect: function (file) {
                window.filemanager.upload("https://www.googleapis.com/drive/v3/files/?id=" + file.id + "&token=" + gapi.auth.getToken().access_token + "&ext=" + file.fileExtension + "&size=" + file.size);
            }
        });
    }
}


/**
 * Confirm
 */
NextPost.Confirm = function (data = {}) {
    data = $.extend({}, {
        title: __("Are you sure?"),
        content: __("It is not possible to get back removed data!"),
        confirmText: __("Yes, Delete"),
        cancelText: __("Cancel"),
        confirm: function () { },
        cancel: function () { },
    }, data);


    $.confirm({
        title: data.title,
        content: data.content,
        theme: 'supervan',
        animation: 'opacity',
        closeAnimation: 'opacity',
        buttons: {
            confirm: {
                text: data.confirmText,
                btnClass: "small button button--danger mr-5",
                keys: ['enter'],
                action: typeof data.confirm === 'function' ? data.confirm : function () { }
            },
            cancel: {
                text: data.cancelText,
                btnClass: "small button button--simple",
                keys: ['esc'],
                action: typeof data.cancel === 'function' ? data.cancel : function () { }
            },
        }
    });
}


/**
 * Alert
 */
NextPost.Alert = function (data = {}) {
    data = $.extend({}, {
        title: __("Error"),
        content: __("Oops! An error occured. Please try again later!"),
        confirmText: __("Close"),
        confirm: function () { },
    }, data);

    $.alert({
        title: data.title,
        content: data.content,
        theme: 'supervan',
        animation: 'opacity',
        closeAnimation: 'opacity',
        buttons: {
            confirm: {
                text: data.confirmText,
                btnClass: "small button button--dark",
                keys: ['enter'],
                action: typeof data.confirm === 'function' ? data.confirm : function () { }
            },
        }
    });
}




/**
 * Captions
 */
NextPost.Captions = function () {
    var wrapper = $("#captions");

    var _linky = function () {
        wrapper.find(".box-list-item p").not(".js-linky-done")
            .addClass("js-linky-done")
            .linky({
                mentions: true,
                hashtags: true,
                urls: false,
                linkTo: "instagram"
            });
    }

    // Linky captions
    _linky();
    window.loadmore.success = function ($item) {
        _linky();
    }
}

/**
 * Caption
 */
NextPost.Caption = function () {
    var $form = $("#caption form");

    // Emoji
    var emoji = $(".caption-input").emojioneArea({
        saveEmojisAs: "shortname", // unicode | shortname | image
        imageType: "svg", // Default image type used by internal CDN
        pickerPosition: 'bottom',
        buttonTitle: __("Use the TAB key to insert emoji faster")
    });

    // Caption input filter
    emoji[0].emojioneArea.on("drop", function (obj, event) {
        event.preventDefault();
    });

    emoji[0].emojioneArea.on("paste keyup input emojibtn.click", function () {
        $form.find(":input[name='caption']").val(emoji[0].emojioneArea.getText());
    });
}



/**
 * Package Form
 */
NextPost.PackageForm = function () {
    $("body").on("click", ".js-save-and-update", function () {
        var form = $(this).parents("form");

        form.find(":input[name='update-subscribers']").val(1);
        form.trigger("submit");
        form.find(":input[name='update-subscribers']").val(0);
    });
}


/**
 * User Form
 */
NextPost.UserForm = function () {
    $("body").on("change", ":input[name='package-subscription']", function () {
        if ($(this).is(":checked")) {
            $(".package-options").find(":input").prop("disabled", true);
            $(".package-options").css("opacity", ".35");
        } else {
            $(".package-options").find(":input").prop("disabled", false);
            $(".package-options").css("opacity", "");
        }
    });

    $("body").on("change", ":input[name='package']", function () {
        if ($(this).val() < 0) {
            $(":input[name='package-subscription']").prop({
                "checked": false,
                "disabled": true
            });
        } else {
            $(":input[name='package-subscription']").prop("disabled", false);
        }

        $(":input[name='package-subscription']").trigger("change");
    });

    $(":input[name='package-subscription']").trigger("change");

    $(document).ajaxComplete(function (event, xhr, settings) {
        var rx = new RegExp("(users\/[0-9]+(\/)?)$");
        if (rx.test(settings.url)) {
            NextPost.DatePicker();
            $(":input[name='package-subscription']").trigger("change");
        }
    })
}



/**
 * Calendar
 */
NextPost.Calendar = function () {
    $("#calendar-day").find("video").each(function (index, el) {
        var _this = $(this);
        _this.on("loadedmetadata", function () {
            if (this.videoWidth >= this.videoHeight) {
                _this.css({
                    "height": "100%",
                    "width": "auto"
                });
            } else {
                _this.css({
                    "width": "100%",
                    "height": "auto"
                });
            }
        });
    });

    $("#calendar-month, #calendar-day").find(":input[name='account']").on("change", function () {
        $(this).parents("form").trigger("submit");
    });
}


/**
 * Settings
 */
NextPost.Settings = function () {
    $(".js-settings-menu").on("click", function () {
        $(".asidenav").toggleClass("mobile-visible");
        $(this).toggleClass("mdi-menu-down mdi-menu-up");

        $("html, body").delay(200).animate({
            scrollTop: "0px"
        });
    });


    // Proxy form
    if ($("#proxy-form").length == 1) {
        $("#proxy-form :input[name='enable-proxy']").on("change", function () {
            $("#proxy-form :input[name='enable-user-proxy']").prop("disabled", !$(this).is(":checked"));

            if ($("#proxy-form :input[name='enable-user-proxy']").is(":disabled")) {
                $("#proxy-form :input[name='enable-user-proxy']").prop("checked", false);
            }
        }).trigger("change");
    }

    if ($("#smtp-form").length == 1) {
        $("#smtp-form :input[name='auth']").on("change", function () {
            if ($(this).is(":checked")) {
                $("#smtp-form :input[name='username'], :input[name='password']")
                    .prop("disabled", false);
            } else {
                $("#smtp-form :input[name='username'], :input[name='password']")
                    .prop("disabled", true)
                    .val("");
            }
        }).trigger("change");
    }

    if ($("#stripe-form").length == 1) {
        $("#stripe-form :input[name='recurring']").on("change", function () {
            if ($(this).is(":checked")) {
                $("#stripe-form :input[name='webhook-key']")
                    .prop("disabled", false);

                $("#stripe-form :input[name='webhook-key']").parent().css("opacity", 1);
            } else {
                $("#stripe-form :input[name='webhook-key']")
                    .prop("disabled", true);

                $("#stripe-form :input[name='webhook-key']").parent().css("opacity", 0.2);
            }
        }).trigger("change");
    }
}


/**
 * Statistics
 */
NextPost.Statistics = function () {
    var $page = $("#statistics");
    var $form = $page.find("form");

    $form.find(":input[name='account']").on("change", function () {
        $form.trigger("submit");
    });


    // Get account summary
    var $account_summary = $page.find(".account-summary");

    $.ajax({
        url: $account_summary.data("url"),
        type: 'POST',
        dataType: 'jsonp',
        data: {
            action: "account-summary"
        },

        error: function () {
            $account_summary.find(".numbers").html("<div class='error'>" + __("Oops! An error occured. Please try again later!") + "</div>");
            $account_summary.removeClass('onprogress');
        },

        success: function (resp) {
            if (resp.result == 1) {
                var $temp = $("<div class='statistics-numeric'></div>");
                $temp.append("<span class='number'></span>");
                $temp.append("<span class='label'></span>");

                var $media_count = $temp.clone();
                $media_count.find(".number").text(resp.data.media_count)
                $media_count.find(".label").text(__("Total Posts"));
                $media_count.appendTo($account_summary.find(".numbers"));

                var $followers = $temp.clone();
                $followers.find(".number").text(resp.data.follower_count)
                $followers.find(".label").text(__("Followers"));
                $followers.appendTo($account_summary.find(".numbers"));

                var $following = $temp.clone();
                $following.find(".number").text(resp.data.following_count)
                $following.find(".label").text(__("Following"));
                $following.appendTo($account_summary.find(".numbers"));
            } else {
                $account_summary.find(".numbers").html("<div class='error'>" + resp.msg + "</div>");
            }

            $account_summary.removeClass('onprogress');
        }
    });



    $("canvas").each(function () {
        $(this).width($(this).width());
        $(this).height($(this).height());

        $(this).parents(".chart-container").css("height", "auto");
        $(this).css("position", "relative")
    });
}



/**
 * Renew
 */
NextPost.Renew = function () {
    var $form = $(".payment-form");
    if ($form.length == 1) {
        if ($form.find(":input[name='payment-gateway']").length > 0) {
            $form.find(".payment-gateways, .payment-cycle").removeClass("none");
            $form.find(":input[name='payment-gateway']").eq(0).prop("checked", true);
        }


        $form.find(":input[name='payment-gateway']").on("change", function () {
            if (!$form.find(":input[name='payment-gateway']:checked").data("recurring")) {
                $form.find(":input[name='payment-cycle'][value='recurring']").parents(".option-group-item").addClass('none');
            } else {
                $form.find(":input[name='payment-cycle'][value='recurring']").parents(".option-group-item").removeClass('none');
            }

            if ($form.find(":input[name='payment-cycle']:checked").parents(".option-group-item").hasClass('none')) {
                $form.find(":input[name='payment-cycle']").eq(0).prop("checked", true);
            }
        });
        $form.find(":input[name='payment-gateway']").eq(0).trigger("change");


        // Initialize Stripe
        var data = {};

        if ($form.find(":input[name='payment-gateway'][value='stripe']").length == 1) {
            var stripe = StripeCheckout.configure({
                key: $form.data("stripe-key"),
                image: $form.data("stripe-img"),
                email: $form.data("email"),
                locale: $("html").attr("lang"),
                token: function (token) {
                    data.token = token.id;
                    _placeOrder();
                }
            });

            window.addEventListener('popstate', function () {
                stripe.close();
            });
        }

        $form.on("submit", function () {
            data.plan = $form.find(":input[name='plan']:checked").val();
            data.payment_gateway = $form.find(":input[name='payment-gateway']:checked").val();
            data.payment_cycle = $form.find(":input[name='payment-cycle']:checked").val();

            if (data.payment_gateway == "paypal") {
                _placeOrder();
            } else if (data.payment_gateway == "stripe") {
                stripe.open({
                    name: $form.data("site"),
                    description: $form.find(":input[name='plan']:checked").data("desc"),
                    amount: $form.find(":input[name='plan']:checked").data("amount"),
                    currency: $form.data("currency")
                });
            }
        })
    }


    var _placeOrder = function () {
        data.action = "pay";

        $("body").addClass("onprogress");
        $.ajax({
            url: $form.data("url"),
            type: 'POST',
            dataType: 'jsonp',
            data: data,
            error: function () {
                NextPost.Alert();
                $("body").removeClass("onprogress");
            },

            success: function (resp) {
                if (resp.result == 1) {
                    window.location.href = resp.url;
                } else {
                    NextPost.Alert({
                        content: resp.msg
                    });

                    $("body").removeClass("onprogress");
                }
            }
        });
    }
}



/**
 * Renew
 */
NextPost.ChargebeeRenew = function () {
    $("a.chargebee-payment-form").on("click", function () {
        var data = {};
        var url = $(this).data("url");

        // var payment_gateway = $(this).data("payment-gateway");
        // var payment_cycle = $(this).data("payment-cycle");
        // var payment_plan = $(this).data("payment-plan");
        // var payment_amount = $(this).data("payment-amount");
        // var payment_currency = $(this).data("payment-currency");

        data.plan = $(this).data("payment-plan");
        data.payment_gateway = $(this).data("payment-gateway");
        data.payment_cycle = $(this).data("payment-cycle");
        data.action = "pay";

        $("body").addClass("onprogress");
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: data,
            error: function () {
                NextPost.Alert();
                $("body").removeClass("onprogress");
            },

            success: function (resp) {
                if (resp.result == 1) {
                    window.location.href = resp.url;
                } else {
                    NextPost.Alert({
                        content: resp.msg
                    });

                    $("body").removeClass("onprogress");
                }
            }
        });
    });
}


/**
 * Expired
 */
NextPost.CancelRecurringPayments = function () {
    $(".js-portal-recurring-payments").on("click", function () {
        var $this = $(this);
        $("body").addClass("onprogress");
        $.ajax({
            url: $this.data("url"),
            type: 'POST',
            dataType: 'jsonp',
            data: {
                "action": "portal-recurring"
            },
            error: function () {
                NextPost.Alert();
                $("body").removeClass("onprogress");
            },

            success: function (resp) {
                if (resp.result == 1) {
                    // window.location.reload();
                    window.location.href = resp.redirect;
                } else {
                    NextPost.Alert({
                        content: resp.msg
                    });

                    $("body").removeClass("onprogress");
                }
            }
        });
    });

    $(".js-cancel-recurring-payments").on("click", function () {
        var $this = $(this);

        NextPost.Confirm({
            title: __("Are you sure?"),
            content: __("Do you really want to cancel automatic payments?"),
            confirmText: __("Yes, cancel automatic payments"),
            cancelText: __("No"),
            confirm: function () {
                $("body").addClass("onprogress");

                $.ajax({
                    url: $this.data("url"),
                    type: 'POST',
                    dataType: 'jsonp',
                    data: {
                        "action": "cancel-recurring"
                    },
                    error: function () {
                        NextPost.Alert();
                        $("body").removeClass("onprogress");
                    },

                    success: function (resp) {
                        if (resp.result == 1) {
                            window.location.reload();
                        } else {
                            NextPost.Alert({
                                content: resp.msg
                            });

                            $("body").removeClass("onprogress");
                        }
                    }
                });
            }
        });
    });
}


/**
 * Plugins
 */
NextPost.Plugins = function () {
    $("body").on("click", "a.js-deactivate, a.js-activate", function () {
        var $item = $(this).parents("tr")
        var id = $(this).data("id");
        var url = $(this).data("url");
        var action = $(this).hasClass('js-deactivate') ? "deactivate" : "activate";

        $("body").addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: action,
                id: id
            },

            error: function () {
                NextPost.Alert();
                $("body").removeClass("onprogress");
            },

            success: function (resp) {
                if (resp.result == 1) {
                    $item.find("a.js-deactivate, a.js-activate").toggleClass("none");
                } else {
                    NextPost.Alert({
                        content: resp.msg
                    });
                }
                $("body").removeClass("onprogress");
            }
        });
    });
}



/**
 * Upload new plugin
 */
NextPost.Plugin = function () {
    var $page = $("#plugin");
    var $form = $page.find("form");

    $form.on("submit", function () {
        var submitable = true;

        if (!$form.find(":input[name='file']").val()) {
            $form.find(":input[name='file']").addClass("error");
            submitable = false;
        }

        if (submitable && $form.find(":input[name='file']")[0].files.length > 0) {
            $("body").addClass("onprogress");

            var data = new FormData();
            data.append("action", "upload");
            data.append("file", $form.find(":input[name='file']")[0].files[0]);

            $.ajax({
                url: $form.attr("action"),
                type: "POST",
                dataType: 'jsonp',
                data: data,
                cache: false,
                contentType: false,
                processData: false,

                error: function () {
                    $("body").removeClass("onprogress");
                    NextPost.DisplayFormResult($form, "error", __("Oops! An error occured. Please try again later!"));
                },

                success: function (resp) {
                    if (resp.result == 1) {
                        window.location.href = resp.redirect;
                    } else {
                        NextPost.DisplayFormResult($form, "error", resp.msg);
                        $("body").removeClass("onprogress");
                    }

                }
            });
        }

        return false;
    })
}



/**
 * Account form
 */
NextPost.Account = function () {
    var $form = $("#account form");
    var resend_ok_timer;
    var verification_type;

    $(document).ajaxComplete(function (event, xhr, settings) {
        var rx_edit = new RegExp("(\/accounts\/[0-9]+(\/)?)");
        var rx_new = new RegExp("(\/accounts\/new(\/)?)");

        if (!rx_new.test(settings.url) && !rx_edit.test(settings.url)) {
            return;
        }

        if (xhr.responseJSON.hasOwnProperty("changes_saved") &&
            xhr.responseJSON.changes_saved) {
            // account (not new) saved successfully
            $form.find(".js-challenge, .js-2fa, .js-browser-extension").addClass("none");

            $form.find(":input[name='password']").val("");
            $form.find(".js-login").removeClass("none");
            $form.find(".js-login :input").prop("disabled", false);

            return;
        }

        if (xhr.responseJSON.hasOwnProperty("login_failed") &&
            xhr.responseJSON.login_failed) {
            // Unable to login
            $form.find(".js-challenge, .js-2fa, .js-browser-extension").addClass("none");

            $form.find(":input[name='password']").val("");
            $form.find(".js-login").removeClass("none");
            $form.find(".js-login :input").prop("disabled", false);

            // Clear timeout for form result timer
            if (__form_result_timer) {
                clearTimeout(__form_result_timer);
            }

            return;
        }

        verification_type = false;
        if (xhr.responseJSON.hasOwnProperty("twofa_required") &&
            xhr.responseJSON.twofa_required) {
            verification_type = "2fa";
        }

        if (xhr.responseJSON.hasOwnProperty("challenge_required") &&
            xhr.responseJSON.challenge_required) {
            verification_type = "challenge";
        }

        if (xhr.responseJSON.hasOwnProperty("browser_extension") &&
            xhr.responseJSON.browser_extension) {
            verification_type = "browser-extension";
        }

        if (!verification_type) {
            return;
        }

        // Clear timeout for form result timer
        if (__form_result_timer) {
            clearTimeout(__form_result_timer);
        }

        $form.find(".form-result .icon").attr("class", "icon-lock icon");
        $form.find(".js-login, .js-challenge, .js-2fa, .js-browser-extension").addClass("none");
        $form.find(".js-login, .js-challenge, .js-2fa, .js-browser-extension").find(":input").prop("disabled", true);

        if (verification_type == "2fa") {
            // Update login form state to 2FA
            $form.find(":input[name='action']").val("2fa");

            $form.find(":input[name='2faid']").val(xhr.responseJSON.identifier);

            $form.find(".js-2fa").removeClass("none");
            $form.find(".js-2fa :input").prop("disabled", false);

            if (xhr.responseJSON.verification_method == "4") {
                $form.find(".js-2fa-security-code").addClass("none");
                $form.find(".js-not-received-security-code").addClass("none");
                $form.find(".backup-note").addClass("none");
            }

            if (xhr.responseJSON.verification_method == "3") {
                $form.find(".js-not-received-security-code").addClass("none");
                $form.find(".backup-note").addClass("none");
            }
        } else if (verification_type == "browser-extension") {
            // Update login form state to Cookie Attachment
            $form.find(".form-result .icon").attr("class", "icon-doc icon");
            $form.find(":input[name='action']").val("browser-extension");
            $form.find(":input[name='iacid']").val(xhr.responseJSON.internal_account_id);
            $form.find(".js-browser-extension").removeClass("none");
            $form.find(".cookie-file-extension").show();
            $form.find(".js-browser-extension :input").prop("disabled", false);

            var inputs = $form.find(".inputfile-session");

            Array.prototype.forEach.call(inputs, function (input) {
                var label = input.nextElementSibling,
                    labelVal = label.innerHTML;
                input.addEventListener('change', function (e) {
                    var fileName = '';
                    if (this.files && this.files.length == 1) {
                        fileName = e.target.value.split('\\').pop();
                        if (fileName) {
                            label.innerHTML = "<span class='selected'>" + fileName + "</span><span class='mdi mdi-folder field-icon--right selected'></span>";
                        }
                    } else {
                        label.innerHTML = labelVal;
                    }
                });
            });
        } else {
            // Update login form state to challenge
            $form.find(":input[name='action']").val("challenge");

            $form.find(":input[name='challengeid']").val(xhr.responseJSON.identifier);
            $form.find(".js-challenge").removeClass("none");
            $form.find(".js-not-received-security-code").removeClass("none");
            $form.find(".js-challenge :input").prop("disabled", false);
        }
        _resendtimer();
    });

    // Resend Security Code
    // Compatible for both of 2FA and challenge
    var resend_count = {
        "2fa": 0,
        "challenge": 0
    };
    $form.find(".resend-btn").on("click", function () {
        if ($(this).hasClass('inactive')) {
            return true;
        }

        var _this = $(this);
        var $parent = _this.parents(".js-2fa");
        if ($parent.length != 1) {
            $parent = _this.parents(".js-challenge");
        }
        var type = $parent.hasClass('js-2fa') ? "2fa" : "challenge";


        _this.addClass("inactive");
        $.ajax({
            url: $form.data("action"),
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: type == "2fa" ? "resend-2fa" : "resend-challenge",
                id: type == "2fa" ? $form.find(":input[name='2faid']").val() : $form.find(":input[name='challengeid']").val()
            },
            error: function () {
                $parent.find(".resend-btn").addClass('none');
                $parent.find(".resend-result").html(__("Oops! An error occured. Please try again later!")).removeClass('none');
            },

            success: function (resp) {
                $parent.find(".resend-btn").addClass('none');
                $parent.find(".resend-result").html(resp.msg).removeClass('none');

                if (resp.result == 1) {
                    if (type == "2fa") {
                        $form.find(":input[name='2faid']").val(resp.identifier);
                    } else {
                        $form.find(":input[name='challengeid']").val(resp.identifier);
                    }

                    if (resend_ok_timer) {
                        clearTimeout(resend_ok_timer);
                    }

                    resend_count[type]++;
                    if (resend_count[type] >= 2) {
                        $parent.find(".js-not-received-security-code").remove();

                        resend_ok_timer = setTimeout(function () {
                            $parent.find(".resend-result").addClass('none');
                        }, 5000);
                    } else {
                        resend_ok_timer = setTimeout(function () {
                            $parent.find(".resend-btn").removeClass('none');
                            $parent.find(".resend-result").addClass('none');
                            _resendtimer();
                        }, 5000);
                    }
                }
            }
        });
    });


    /**
     * Handle resend timer text
     * Compatible for both of 2FA and challenge
     * @return void
     */
    var _resendtimer = function () {
        var $form = $("#account form");
        var $timer = $form.find(".resend-btn .timer");
        var resend_seconds = 60;
        var resend_timer;

        $form.find(".resend-btn").addClass("inactive");
        $timer.text("(" + $timer.data("text").replace("{seconds}", resend_seconds) + ")");

        if (resend_timer) {
            clearInterval(resend_timer);
        }

        resend_timer = setInterval(function () {
            resend_seconds--;
            if (resend_seconds > 0) {
                $timer.text("(" + $timer.data("text").replace("{seconds}", resend_seconds) + ")");
            } else {
                $form.find(".resend-btn").removeClass("inactive");
                $form.find(".resend-btn .timer").html("");
                clearInterval(resend_timer);
            }
        }, 1000);
    }

    // Instagram session section
    $form.find(":input[name='instagram-session']").on("change", function () {
        $igs_fields = $form.find(".instagram-s");
        $igs_fields.find(".instagram-session-tips").toggle();
        $igs_fields.find(".cookie-file").toggle();
        $igs_fields.find(".settings-file").toggle();

        var inputs = $form.find(".inputfile-session");

        Array.prototype.forEach.call(inputs, function (input) {
            var label = input.nextElementSibling,
                labelVal = label.innerHTML;
            input.addEventListener('change', function (e) {
                var fileName = '';
                if (this.files && this.files.length == 1) {
                    fileName = e.target.value.split('\\').pop();
                    if (fileName) {
                        label.innerHTML = "<span class='selected'>" + fileName + "</span><span class='mdi mdi-folder field-icon--right selected'></span>";
                    }
                } else {
                    label.innerHTML = labelVal;
                }
            });
        });
    });
}


/**
 * Profile
 */
NextPost.Profile = function () {
    $(".js-resend-verification-email").on("click", function () {
        var $this = $(this);
        var $alert = $this.parents(".alert");

        if ($alert.hasClass("onprogress")) {
            return;
        }

        $alert.addClass('onprogress');
        $.ajax({
            url: $this.data("url"),
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: 'resend-email'
            },

            error: function () {
                $this.remove();
                $alert.find(".js-resend-result").html(__("Oops! An error occured. Please try again later!"));
                $alert.removeClass("onprogress");
            },

            success: function (resp) {
                $this.remove();
                $alert.find(".js-resend-result").html(resp.msg);
                $alert.removeClass("onprogress");
            }
        });
    });

    /**
    * Dark Side Mode
    */
    var $form = $("#profile form");

    $form.find(":input[name='dark-mode-timed']").on("change", function () {
        if ($(this).is(":checked")) {
            $form.find(".js-dark-mode-range").css("opacity", "1");
            $form.find(".js-dark-mode-range").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-dark-mode-range").css("opacity", "0.25");
            $form.find(".js-dark-mode-range").find(":input").prop("disabled", true);
        }
    }).trigger("change");
}


/* Functions */

/**
 * Validate Email
 */
function isValidEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

/**
 * Get scrollbar width
 */
function scrollbarWidth() {
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);
    var w = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return w;
}


/**
 * Validate URL
 */
function isValidUrl(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}


/**
 * Get the position of the caret in the contenteditable element
 * @param  {DOM}  DOM of the input element
 * @return {obj}  start and end position of the caret position (selection)
 */
function getCaretPosition(element) {
    var start = 0;
    var end = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;

    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.startContainer, range.startOffset);
            start = preCaretRange.toString().length;
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            end = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToStart", textRange);
        start = preCaretTextRange.text.length;
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        end = preCaretTextRange.text.length;
    }
    return { start: start, end: end };
}

/**
 * Re-connect Account
 *
 * Sends re-connect request to the backend
 * for selected account (data entry)
 */
NextPost.ReConnect = function () {
    $("body").on("click", "a.js-re-connect", function () {
        var id = $(this).data("id");
        var url = $(this).data("url");
        var account_box = $(".box-list-item[data-id='" + id + "']");

        account_box.addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "reconnect",
                id: id
            },

            error: function () {
                account_box.removeClass("onprogress");

                NextPost.Alert({
                    title: __("Oops!"),
                    content: __("An error occured. Please try again later!"),
                    confirmText: __("Close")
                });
            },

            success: function (resp) {
                if (resp.result == 1) {
                    account_box.removeClass("onprogress");

                    var reconnect_overlay = $(".js-re-connect[data-id='" + id + "']");
                    if (reconnect_overlay) {
                        reconnect_overlay.fadeOut();
                    }

                    if (resp.avatar_url) {
                        var account_pic = $(".accounts-pic[data-id='" + id + "']");
                        account_pic.replaceWith("<img class='circle accounts-pic' src='" + resp.avatar_url + "?" + Math.floor(Math.random() * 1000000000) + "' data-id='" + id + "'>");
                    }
                } else {
                    account_box.removeClass("onprogress");

                    NextPost.Alert({
                        title: resp.title,
                        content: resp.msg,
                        confirmText: __("Close"),

                        confirm: function () {
                            window.location.href = resp.redirect;
                        }
                    });
                }
            }
        });
    });
}

/**
* Switch platform
*/
NextPost.SwitchPlatform = function () {
    $("body").on("click", "a.js-switch-platform", function () {
        var id = $(this).data("id");
        var url = $(this).data("url");
        var account_box = $(".box-list-item[data-id='" + id + "']");
        var device_description = account_box.find(".device-type-description[data-account-id='" + id + "']");
        var device_type = device_description.find(".device-type");

        account_box.addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "switch-platform",
                id: id
            },

            error: function () {
                account_box.removeClass("onprogress");

                NextPost.Alert({
                    title: __("Oops!"),
                    content: __("An error occured. Please try again later!"),
                    confirmText: __("Close")
                });
            },

            success: function (resp) {
                if (device_type.hasClass("android")) {
                    device_type.replaceWith("<span class='device-type ios'><span class='mdi mdi-apple mr-3'></span><span>" + __('iOS') + "</span>");
                } else {
                    device_type.replaceWith("<span class='device-type android'><span class='mdi mdi-android mr-3'></span><span>" + __('Android') + "</span>");
                }

                account_box.removeClass("onprogress");

                if (resp.result == 0) {
                    NextPost.Alert({
                        title: resp.title,
                        content: resp.msg,
                        confirmText: __("Close"),

                        confirm: function () {
                            if (resp.redirect) {
                                window.location.href = resp.redirect;
                            }
                        }
                    });
                }
            }
        });
    });
}

/**
* Refresh cookies
*/
NextPost.RefreshCookies = function () {
    $("body").on("click", "a.js-refresh-cookies", function () {
        var id = $(this).data("id");
        var url = $(this).data("url");
        var account_box = $(".box-list-item[data-id='" + id + "']");

        account_box.addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "refresh-cookies",
                id: id
            },

            error: function () {
                account_box.removeClass("onprogress");

                NextPost.Alert({
                    title: __("Oops!"),
                    content: __("An error occured. Please try again later!"),
                    confirmText: __("Close")
                });
            },

            success: function (resp) {
                account_box.removeClass("onprogress");
                if (resp) {
                    if (resp.result == 0) {
                        NextPost.Alert({
                            title: resp.title,
                            content: resp.msg,
                            confirmText: __("Close"),

                            confirm: function () {
                                if (resp.redirect) {
                                    window.location.href = resp.redirect;
                                }
                            }
                        });
                    }
                }
            }
        });
    });
}

/**
 * Cache refresh
 */
$(".js-cache-refresh").on("click", function () {
    $.ajax({
        url: $(this).attr("data-url"),
        dataType: 'jsonp',
        type: 'POST',
        dataType: 'jsonp',
        data: {
            action: 'cache-refresh'
        },

        error: function () {
            specialAlertResponse();
        },

        success: function (resp) {
            if (resp.result == 1) {
                showToast(__("Cache successfully cleared"), {
                    duration: 7000,
                    background: '#11b85e',
                    color: '#fff',
                    borderRadius: '5px',
                    icon_style: 'mdi mdi-checkbox-marked-circle-outline',
                    close: true,
                    progressBar: true,
                    pageReload: true
                });
            } else {
                specialAlertResponse(resp);
            }
        }
    });
});

/**
 * jToast
 * A modern & easy-going jQuery Plugin to create Toasts.
 *
 * Version: 1.0.0
 * Author: Nextpost.tech
 * Author URI: https://nextpost.tech
 */
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
function showToast(text, { duration = 3000, background = "#232323", color = "#fff", borderRadius = "0px", icon_style = false, close = false, progressBar = false, pageReload = false } = {}) {
    const selectedToast = toasts;
    if (!manager.ready) {
        manager.addJob({ text: text, args: showToast.arguments[1], workingID: selectedToast, type: "show" });
        return;
    }
    manager.currentWorkingID = selectedToast;

    $("#toasts").append(`
        <div style="background: ${background}; color: ${color}; border-radius: ${borderRadius}; ${close ? 'display: flex;' : ''}" data-toast-id="${toasts}" class="toast">
            ${icon_style ? `<span class="${icon_style}" style="font-size: 18px;line-height: 15px;margin-right: 7px;"></span>` : ""}
            <span>${text}</span>
            ${progressBar && duration !== "lifetime" ? `<div style="animation-duration: ${duration}ms; background: ${color};" class="progress"></div>` : ""}
        </div>
    `);

    if (close)
        $(`[data-toast-id="${selectedToast}"]`).append(`
            <div style="height: ${$(`[data-toast-id="${selectedToast}"] > span`).height()}px" onclick="hideToast(${selectedToast})" class="close">&times;</div>
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
        </style>
    `);

    $("body").append(`<div id="toasts"></div>`);
})();

/**
 * Account Login Activity
 */
NextPost.LoginActivity = function () {
    $("body").off("click", "a.js-login-activity").on("click", "a.js-login-activity", function () {
        var id = $(this).data("id");
        var url = $(this).data("url");
        var account_box = $(".box-list-item[data-id='" + id + "']");

        account_box.addClass("onprogress");

        // Alert notice
        specialAlertResponse = function (resp = null) {
            $.alert({
                title: resp ? (resp.title ? resp.title : __("Oops!")) : __("Oops!"),
                content: resp ? (resp.msg ? resp.msg : __("An error occured. Please try again later!")) : __("An error occured. Please try again later!"),
                theme: 'modern',
                buttons: {
                    confirm: {
                        text: __("Close"),
                        btnClass: "small button btn-red",
                        keys: ['enter']
                    }
                },
                draggable: false,
                closeIcon: true,
                icon: 'icon-close',
                type: 'red'
            });
        }

        loginActivityContent = function (resp) {
            var content = '';
            if (resp.suspicious_logins) {
                if (resp.suspicious_logins.length > 0) {
                    content += '<div class="la-login-title">' + __("Was This You?") + "</div>";
                    var current_id = '';
                    resp.sessions.forEach(function (item, index) {
                        if (item.is_current) {
                            current_id = item.id;
                        }
                    });
                    resp.suspicious_logins.forEach(function (item, index) {
                        if (item.id == current_id) {
                            content +=
                                '<div class="la-login-session mt-10" data-login-id="' + item.id + '" data-login-timestamp="' + item.timestamp + '">' +
                                '<div class="la-login-icon mr-10"><span class="mdi mdi-map-marker"></span></div>' +
                                '<div class="la-login-desc">' +
                                '<div class="la-login-location">' + item.location + '</div>' +
                                '<div class="la-login-time"><span class="la-color-green">' + __("Active now") + '</span>' + " · " + __(item.device) + '</div>' +
                                '</div>' +
                                '<div class="la-login-checkpoint mt-5">' +
                                '<a class="la-login-checkpoint-confirm la-checkpoint-btn-green mr-5 js-la-checkpoint-confirm" href="javascript:void(0)" data-login-id="' + item.id + '" data-login-timestamp="' + item.timestamp + '" data-id="' + id + '" data-url="' + url + '">' + __("This Was Me") + '</a>' +
                                '<a class="la-login-checkpoint-decline la-checkpoint-btn-red js-la-checkpoint-decline none" href="javascript:void(0)" data-login-id="' + item.id + '" data-login-timestamp="' + item.timestamp + '" data-id="' + id + '" data-url="' + url + '">' + __("This Wasn’t Me") + '</a>' +
                                '</div>' +
                                '</div>';
                        } else {
                            var d = moment.unix(item.timestamp).fromNow();
                            content +=
                                '<div class="la-login-session mt-10" data-login-id="' + item.id + '" data-login-timestamp="' + item.timestamp + '">' +
                                '<div class="la-login-icon mr-10"><span class="mdi mdi-map-marker"></span></div>' +
                                '<div class="la-login-desc">' +
                                '<div class="la-login-location">' + item.location + '</div>' +
                                '<div class="la-login-time">' + d + " · " + item.device + '</div>' +
                                '</div>' +
                                '<div class="la-login-checkpoint mt-5">' +
                                '<a class="la-login-checkpoint-confirm la-checkpoint-btn-green mr-5 js-la-checkpoint-confirm" href="javascript:void(0)" data-login-id="' + item.id + '" data-login-timestamp="' + item.timestamp + '" data-id="' + id + '" data-url="' + url + '">' + __("This Was Me") + '</a>' +
                                '<a class="la-login-checkpoint-decline la-checkpoint-btn-red js-la-checkpoint-decline none" href="javascript:void(0)" data-login-id="' + item.id + '" data-login-timestamp="' + item.timestamp + '" data-id="' + id + '" data-url="' + url + '">' + __("This Wasn’t Me") + '</a>' +
                                '</div>' +
                                '</div>';
                        }
                    });
                }
            }
            if (resp.sessions) {
                if (resp.sessions.length > 0) {
                    content += '<div class="la-login-title mt-10">' + __("Where You're Logged in") + "</div>";
                    resp.sessions.forEach(function (item, index) {
                        if (item.is_current) {
                            content +=
                                '<div class="la-login-session mt-10" data-login-id="' + item.id + '" data-login-timestamp="' + item.timestamp + '">' +
                                '<div class="la-login-icon mr-10"><span class="mdi mdi-map-marker"></span></div>' +
                                '<div class="la-login-desc">' +
                                '<div class="la-login-location">' + item.location + '</div>' +
                                '<div class="la-login-time"><span class="la-color-green">' + __("Active now") + '</span>' + " · " + __(item.device) + '</div>' +
                                '</div>' +
                                '</div>';
                        } else {
                            var d = moment.unix(item.timestamp).fromNow();
                            content +=
                                '<div class="la-login-session mt-10" data-login-id="' + item.id + '" data-login-timestamp="' + item.timestamp + '">' +
                                '<div class="la-login-icon mr-10"><span class="mdi mdi-map-marker"></span></div>' +
                                '<div class="la-login-desc">' +
                                '<div class="la-login-location">' + item.location + '</div>' +
                                '<div class="la-login-time">' + d + " · " + item.device + '</div>' +
                                '</div>' +
                                '<div class="la-login-logout-block">' +
                                '<a class="la-login-logout js-la-logout" href="javascript:void(0)" data-login-id="' + item.id + '" data-login-timestamp="' + item.timestamp + '" data-s-login-id="' + item.login_id + '" data-id="' + id + '" data-url="' + url + '">' + __("Log Out") + '</a>' +
                                '</div>' +
                                '</div>';
                        }
                    });
                }
            }
            return content;
        }

        // Popup with login activity
        loginActivityPopUp = function (resp) {
            $content = loginActivityContent(resp);
            $.confirm({
                title: __("Login Activity"),
                content: $content,
                theme: 'material',
                buttons: {
                    confirm: {
                        isHidden: true,
                    },
                    cancel: {
                        isHidden: true,
                    }
                },
                draggable: false,
                backgroundDismiss: false,
                columnClass: 'login-activity-popup',
                closeIcon: true
            });
        }

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "login-activity",
                action_type: "get",
                id: id
            },
            error: function () {
                account_box.removeClass("onprogress");
                specialAlertResponse();
            },
            success: function (resp) {
                account_box.removeClass("onprogress");
                if (resp) {
                    if (resp.result == 0) {
                        specialAlertResponse(resp);
                    } else {
                        if (resp.login_activity) {
                            loginActivityPopUp(resp.login_activity);
                        }
                    }
                }
            }
        });

        $("body").off("click", "a.js-la-checkpoint-confirm").on("click", "a.js-la-checkpoint-confirm", function () {
            var login_id = $(this).data("login-id");
            var login_timestamp = $(this).data("login-timestamp");
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "login-activity",
                    action_type: "approve",
                    id: id,
                    login_id: login_id,
                    login_timestamp: login_timestamp
                },
                error: function () {
                    specialAlertResponse();
                },
                success: function (resp) {
                    if (resp) {
                        if (resp.result == 0) {
                            specialAlertResponse(resp);
                        } else {
                            if (resp.approve.status == "ok") {
                                $("body").find(".la-login-session[data-login-id='" + login_id + "']").find(".la-login-checkpoint-confirm").addClass("none");
                                $("body").find(".la-login-session[data-login-id='" + login_id + "']").find(".la-login-checkpoint-decline").removeClass("none");
                            }
                        }
                    }
                }
            });
        });

        $("body").off("click", "a.js-la-checkpoint-decline").on("click", "a.js-la-checkpoint-decline", function () {
            var login_id = $(this).data("login-id");
            var login_timestamp = $(this).data("login-timestamp");
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "login-activity",
                    action_type: "unapprove",
                    id: id,
                    login_id: login_id,
                    login_timestamp: login_timestamp
                },
                error: function () {
                    specialAlertResponse();
                },
                success: function (resp) {
                    if (resp) {
                        if (resp.result == 0) {
                            specialAlertResponse(resp);
                        } else {
                            if (resp.unapprove.status == "ok") {
                                $("body").find(".la-login-session[data-login-id='" + login_id + "']").find(".la-login-checkpoint-decline").addClass("none");
                                $("body").find(".la-login-session[data-login-id='" + login_id + "']").find(".la-login-checkpoint-confirm").removeClass("none");
                            }
                        }
                    }
                }
            });
        });

        $("body").off("click", "a.js-la-logout").on("click", "a.js-la-logout", function () {
            var login_id = $(this).data("login-id");
            var s_login_id = $(this).data("s-login-id");
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "login-activity",
                    action_type: "logout",
                    id: id,
                    login_id: login_id
                },
                error: function () {
                    specialAlertResponse();
                },
                success: function (resp) {
                    if (resp) {
                        if (resp.result == 0) {
                            specialAlertResponse(resp);
                        } else {
                            if (resp.logout_session.status == "ok") {
                                $("body").find(".la-login-session[data-login-id='" + login_id + "']").remove();
                                $("body").find(".la-login-session[data-login-id='" + s_login_id + "']").remove();
                            }
                        }
                    }
                }
            });
        });
    });
}

/**
 * Change & Update Account Password
 */
NextPost.ChangeAccountPassword = function () {
    // Alert notice
    specialAlertResponse = function (resp = null) {
        $.alert({
            title: resp ? (resp.title ? resp.title : __("Oops!")) : __("Oops!"),
            content: resp ? (resp.msg ? resp.msg : __("An error occured. Please try again later!")) : __("An error occured. Please try again later!"),
            theme: 'modern',
            buttons: {
                confirm: {
                    text: __("Close"),
                    btnClass: "small button btn-red",
                    keys: ['enter']
                }
            },
            draggable: false,
            closeIcon: true,
            icon: 'icon-close',
            type: 'red'
        });
    }

    // Popup with login activity
    changePasswordPopUp = function (id, url, action_type, title) {
        $content = '<div class="mt-5 mb-5">' +
            '<input class="input la-change-password" name="la-change-password" data-id="' + id + '" type="password" maxlength="100" placeholder="' + __("New Password") + '">'
        '</div>';

        $.confirm({
            title: title,
            content: $content,
            theme: 'material',
            buttons: {
                save: {
                    text: __("Save"),
                    btnClass: "col s6 m6 l6 small button button--dark",
                    keys: ['enter'],
                    action: function () {
                        var chp_popup = $("body").find(".la-change-password-popup .jconfirm-box");
                        chp_popup.addClass("onprogress");
                        var new_password = $("body").find(":input[name='la-change-password'][data-id='" + id + "']").val();
                        $.ajax({
                            url: url,
                            type: 'POST',
                            dataType: 'jsonp',
                            data: {
                                action: "login-activity",
                                action_type: action_type,
                                id: id,
                                new_password: new_password
                            },
                            error: function () {
                                chp_popup.removeClass("onprogress");
                                specialAlertResponse();
                            },
                            success: function (resp) {
                                chp_popup.removeClass("onprogress");
                                if (resp) {
                                    if (resp.result == 0) {
                                        specialAlertResponse(resp);
                                    } else {
                                        if (resp.change_password) {
                                            if (resp.change_password.status == "ok") {
                                                chp_popup.find(".jconfirm-closeIcon").click();
                                            }
                                        } else {
                                            if (resp.password_saved) {
                                                chp_popup.find(".jconfirm-closeIcon").click();
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        return false;
                    }
                },
                cancel: {
                    text: __("Close"),
                    btnClass: "col s6 s-last m6 m-last l6 l-last small button button--dark--outline button-la-light-outline-last",
                    keys: ['enter']
                }
            },
            draggable: false,
            backgroundDismiss: false,
            columnClass: 'la-change-password-popup',
            closeIcon: true
        });
    }

    $("body").off("click", "a.js-la-change-password").on("click", "a.js-la-change-password", function () {
        var id = $(this).data("id");
        var url = $(this).data("url");

        changePasswordPopUp(id, url, "change-password", __("Change Password"));
    });

    $("body").off("click", "a.js-la-update-password").on("click", "a.js-la-update-password", function () {
        var id = $(this).data("id");
        var url = $(this).data("url");

        changePasswordPopUp(id, url, "update-password", __("Update Password"));
    });
}

/**
 * Insights Basic
 */
NextPost.InsightsBasic = function (ids, url, period = "week") {
    var accounts = $("#accounts");

    specialAlertResponse = function (resp = null) {
        $.alert({
            title: resp ? (resp.title ? resp.title : __("Oops!")) : __("Oops!"),
            content: resp ? (resp.msg ? resp.msg : __("An error occured. Please try again later!")) : __("An error occured. Please try again later!"),
            theme: 'modern',
            buttons: {
                confirm: {
                    text: __("Close"),
                    btnClass: "small button btn-red",
                    keys: ['enter']
                }
            },
            draggable: false,
            closeIcon: true,
            icon: 'icon-close',
            type: 'red'
        });
    }

    // Get data for one chart
    chartRequest = function (id, url, period = "week", callback) {
        // var insights_basic = accounts.find(".insights-basic[data-id='" + id + "']");
        var data_in_progress = accounts.find(".insights-basic-data-in-progress[data-id='" + id + "']");
        var chart_canvas = $("#insights-basic-canvas[data-id='" + id + "']");
        var ibd = accounts.find(".insights-basic-diff[data-id='" + id + "']").find(".ibd-number");
        // insights_basic.addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "basic-insights",
                id: id,
                period: period
            },

            error: function () {
                // insights_basic.removeClass("onprogress");
                chart_canvas.addClass("none");
                ibd.addClass("none");
                data_in_progress.removeClass("none");
                specialAlertResponse();
            },

            success: function (resp) {
                if (resp.result == 1) {
                    // insights_basic.removeClass("onprogress");
                    if (resp.basic_insights.length > 0) {
                        data_in_progress.addClass("none");
                        chart_canvas.removeClass("none");
                        ibd.removeClass("none");
                        callback(resp.basic_insights);
                    } else {
                        chart_canvas.addClass("none");
                        ibd.addClass("none");
                        data_in_progress.removeClass("none");
                    }
                } else {
                    // insights_basic.removeClass("onprogress");
                    chart_canvas.addClass("none");
                    ibd.addClass("none");
                    data_in_progress.removeClass("none");
                    specialAlertResponse(resp);
                }
            }
        });
    }

    // Get data for multiple charts
    chartRequestMulti = function (ids, url, period = "week") {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "basic-insights-multi",
                ids: JSON.stringify(ids),
                period: period
            },

            error: function () {
                ids.forEach(function (item, index) {
                    $("#insights-basic-canvas[data-id='" + item + "']").addClass("none");
                    accounts.find(".insights-basic-diff[data-id='" + item + "']").find(".ibd-number").addClass("none");
                    accounts.find(".insights-basic-data-in-progress[data-id='" + item + "']").removeClass("none");
                });
                specialAlertResponse();
            },

            success: function (resp) {
                if (resp.result == 1) {
                    if (typeof resp.basic_insights_multi !== 'undefined') {
                        ids.forEach(function (item, index) {
                            if (typeof resp.basic_insights_multi[item] == 'undefined') {
                                $("#insights-basic-canvas[data-id='" + item + "']").addClass("none");
                                accounts.find(".insights-basic-diff[data-id='" + item + "']").find(".ibd-number").addClass("none");
                                accounts.find(".insights-basic-data-in-progress[data-id='" + item + "']").removeClass("none");
                            } else if (resp.basic_insights_multi[item].length > 0) {
                                accounts.find(".insights-basic-data-in-progress[data-id='" + item + "']").addClass("none");
                                $("#insights-basic-canvas[data-id='" + item + "']").removeClass("none");
                                accounts.find(".insights-basic-diff[data-id='" + item + "']").find(".ibd-number").removeClass("none");
                                chartBuilder(resp.basic_insights_multi[item], url, item);
                            } else {
                                $("#insights-basic-canvas[data-id='" + item + "']").addClass("none");
                                accounts.find(".insights-basic-diff[data-id='" + item + "']").find(".ibd-number").addClass("none");
                                accounts.find(".insights-basic-data-in-progress[data-id='" + item + "']").removeClass("none");
                            }
                        });
                    } else {
                        ids.forEach(function (item, index) {
                            $("#insights-basic-canvas[data-id='" + item + "']").addClass("none");
                            accounts.find(".insights-basic-diff[data-id='" + item + "']").find(".ibd-number").addClass("none");
                            accounts.find(".insights-basic-data-in-progress[data-id='" + item + "']").removeClass("none");
                        });
                    }
                } else {
                    ids.forEach(function (item, index) {
                        $("#insights-basic-canvas[data-id='" + item + "']").addClass("none");
                        accounts.find(".insights-basic-diff[data-id='" + item + "']").find(".ibd-number").addClass("none");
                        accounts.find(".insights-basic-data-in-progress[data-id='" + item + "']").removeClass("none");
                    });
                    specialAlertResponse(resp);
                }
            }
        });
    }

    // Add gradient to chart
    addGradientToChart = function (c, options, options_data) {
        var dataset = c.data.datasets[0];
        var gradientFill = c.ctx.createLinearGradient(0, c.height, 0, 0);
        gradientFill.addColorStop(0, options_data.gradientFill_0 ? options_data.gradientFill_0 : "rgb(155, 155, 155, 0.1)");
        gradientFill.addColorStop(1, options_data.gradientFill_1 ? options_data.gradientFill_1 : "rgb(155, 155, 155, 0.6)");
        var model = c.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].$filler.el._model;
        model.backgroundColor = gradientFill;
    }

    chartSwitcher = function (id, url, InsightsBasicChart, options_data = {}) {
        accounts.on("click", ".insights-basic-button[data-id='" + id + "']", function () {
            var period = $(this).data("type");
            var week = accounts.find(".insights-basic-week[data-id='" + id + "']");
            var month = accounts.find(".insights-basic-month[data-id='" + id + "']");
            var year = accounts.find(".insights-basic-year[data-id='" + id + "']");
            if (period == "week") {
                week.addClass("active");
                month.removeClass("active");
                year.removeClass("active");
            } else if (period == "month") {
                week.removeClass("active");
                month.addClass("active");
                year.removeClass("active");
            } else {
                week.removeClass("active");
                month.removeClass("active");
                year.addClass("active");
            }

            chartRequest(id, url, period, function (data = []) {
                if (data.length > 0) {
                    if (typeof InsightsBasicChart !== 'undefined') {
                        var data_values = [];
                        var data_labels = [];

                        // Built data array
                        $.each(data, function (index, value) {
                            data_labels.push(value['label']);
                            data_values.push(value['value']);
                        });

                        // Find max value
                        var max_value = Math.max.apply(Math, data_values);

                        // Find mim value
                        var valid_values = [];
                        $.each(data_values, function (index, value) {
                            if (value > 0) {
                                valid_values.push(value);
                            }
                        });
                        var min_value = 0;
                        if (valid_values.length > 0) {
                            min_value = Math.min.apply(Math, valid_values);
                        }

                        // Check is stats is positive, negative or neutral
                        x0 = data_values[0];
                        x1 = 0;
                        if (valid_values.length > 0) {
                            x1 = valid_values[valid_values.length - 1]
                        }
                        $diff = x1 - x0;
                        $diff_criteria = 0;
                        $diff_abs = Math.abs($diff);
                        var diff_colour = "ibd-number insight-basic-chart-diff-gray";
                        if ($diff_abs > $diff_criteria) {
                            if ($diff > $diff_criteria) {
                                options_data.gradientFill_0 = "rgb(76, 175, 80, 0.1)";
                                options_data.gradientFill_1 = "rgb(76, 175, 80, 0.6)";
                                options_data.borderColor = "rgb(76, 175, 80)";
                                diff_colour = "ibd-number insight-basic-chart-diff-green";
                            } else if ($diff < $diff_criteria) {
                                options_data.gradientFill_0 = "rgb(251, 62, 62, 0.1)";
                                options_data.gradientFill_1 = "rgb(251, 62, 62, 0.6)";
                                options_data.borderColor = "rgb(251, 62, 62)";
                                diff_colour = "ibd-number insight-basic-chart-diff-red";
                            }
                        }

                        var diff_icon_class = "mdi mdi-arrow-down";
                        if ($diff > 0) {
                            diff_icon_class = "mdi mdi-arrow-up";
                        } else if ($diff == 0) {
                            diff_icon_class = "";
                            diff_colour = "none";
                        }
                        $(".insights-basic-diff[data-id='" + id + "']").html('<a class="' + diff_colour + '"><span class="' + diff_icon_class + '"></span>' + number_styler($diff_abs) + '</a>');

                        var corrector = 0;
                        if (min_value <= 5) {
                            corrector = 5 - min_value;
                        }

                        // Last point style
                        var pointRadius = 0;
                        $last_label = data_labels[data_labels.length - 1];
                        if ($last_label == null) {
                            pointRadius = [];
                            $.each(data_values, function (index, value) {
                                pointRadius.push(0);
                            });
                            // Detect last non empty value in array
                            var array_ne = data_values;
                            var index_ne = array_ne.length;
                            while (index_ne-- && !array_ne[index_ne]);
                            pointRadius[index_ne] = 4;
                        }

                        InsightsBasicChart.data.datasets[0].pointRadius = pointRadius;
                        InsightsBasicChart.data.labels = data_labels;
                        InsightsBasicChart.data.datasets[0].data = data_values;
                        InsightsBasicChart.data.datasets[0].borderColor = options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)";
                        InsightsBasicChart.data.datasets[0].pointBackgroundColor = options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)";
                        InsightsBasicChart.data.datasets[0].pointBorderColor = options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)";
                        InsightsBasicChart.data.datasets[0].pointHoverBackgroundColor = options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)";
                        InsightsBasicChart.data.datasets[0].pointHoverBorderColor = options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)";
                        InsightsBasicChart.options.scales.yAxes[0].ticks.min = min_value - 5 + corrector,
                            InsightsBasicChart.options.scales.yAxes[0].ticks.max = max_value + 5,
                            InsightsBasicChart.plugins = [{
                                beforeRender: function (c, options, options_data) {
                                    addGradientToChart(c, options, options_data);
                                }
                            }];
                        InsightsBasicChart.update();
                    } else {
                        chartBuilder(data, url, id);
                    }
                }
            });
        });
    }

    chartBuilder = function (data, url, id, options_data = {}) {
        var data_values = [];
        var data_labels = [];

        // Built data array
        $.each(data, function (index, value) {
            data_labels.push(value['label']);
            data_values.push(value['value']);
        });

        // Find max value
        var max_value = Math.max.apply(Math, data_values);

        // Find mim value
        var valid_values = [];
        $.each(data_values, function (index, value) {
            if (value > 0) {
                valid_values.push(value);
            }
        });
        var min_value = 0;
        if (valid_values.length > 0) {
            min_value = Math.min.apply(Math, valid_values);
        }

        // Check is stats is positive, negative or neutral
        x0 = data_values[0];
        x1 = 0;
        if (valid_values.length > 0) {
            x1 = valid_values[valid_values.length - 1]
        }
        $diff = x1 - x0;
        $diff_criteria = 0;
        $diff_abs = Math.abs($diff);
        var diff_colour = "ibd-number insight-basic-chart-diff-gray";
        if ($diff_abs > $diff_criteria) {
            if ($diff > $diff_criteria) {
                options_data.gradientFill_0 = "rgb(76, 175, 80, 0.1)";
                options_data.gradientFill_1 = "rgb(76, 175, 80, 0.6)";
                options_data.borderColor = "rgb(76, 175, 80)";
                diff_colour = "ibd-number insight-basic-chart-diff-green";
            } else if ($diff < $diff_criteria) {
                options_data.gradientFill_0 = "rgb(251, 62, 62, 0.1)";
                options_data.gradientFill_1 = "rgb(251, 62, 62, 0.6)";
                options_data.borderColor = "rgb(251, 62, 62)";
                diff_colour = "ibd-number insight-basic-chart-diff-red";
            }
        }

        var diff_icon_class = "mdi mdi-arrow-down";
        if ($diff > 0) {
            diff_icon_class = "mdi mdi-arrow-up";
        } else if ($diff == 0) {
            diff_icon_class = "";
            diff_colour = "none";
        }
        $(".insights-basic-diff[data-id='" + id + "']").html('<a class="' + diff_colour + '"><span class="' + diff_icon_class + '"></span>' + number_styler($diff_abs) + '</a>');

        var corrector = 0;
        if (min_value <= 5) {
            corrector = 5 - min_value;
        }

        // Get canvas with chart
        var chart_canvas = $("#insights-basic-canvas[data-id='" + id + "']");
        var ctx = chart_canvas[0].getContext("2d");

        // Setup canvas
        ctx.canvas.height = "138px";

        // Last point style
        var pointRadius = 0;
        $last_label = data_labels[data_labels.length - 1];
        if ($last_label == null) {
            pointRadius = [];
            $.each(data_values, function (index, value) {
                pointRadius.push(0);
            });
            // Detect last non empty value in array
            var array_ne = data_values;
            var index_ne = array_ne.length;
            while (index_ne-- && !array_ne[index_ne]);
            pointRadius[index_ne] = 4;
        }

        // Insights Basic Chart
        var InsightsBasicChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: data_labels,
                datasets: [{
                    spanGaps: false,
                    data: data_values,
                    borderColor: options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)",
                    pointRadius: pointRadius,
                    pointHoverRadius: 4,
                    pointBackgroundColor: options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)",
                    pointBorderColor: options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)",
                    pointHoverBackgroundColor: options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)",
                    pointHoverBorderColor: options_data.borderColor ? options_data.borderColor : "rgb(155, 155, 155)",
                    pointStyle: 'circle',
                }],
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                        top: 7,
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        display: false,
                    }],
                    yAxes: [{
                        ticks: {
                            min: min_value - 5 + corrector,
                            max: max_value + 5,
                            callback: function (value, index, values) {
                                return number_styler(value);
                            }
                        },
                        gridLines: {
                            display: false,
                        },
                        display: false,
                    }]
                },
                tooltips: {
                    titleFontFamily: "inherit",
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            return number_styler(tooltipItems.yLabel);
                        }
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            plugins: [{
                beforeRender: function (c, options) {
                    addGradientToChart(c, options, options_data);
                }
            }]
        });

        chartSwitcher(id, url, InsightsBasicChart, options_data);
    }

    chartRequestMulti(ids, url, period);
}

/**
 * Insights Tables Actions
 */
NextPost.InsightsTable = function (id, url) {
    var accounts = $("#accounts");

    specialAlertResponse = function (resp = null) {
        $.alert({
            title: resp ? (resp.title ? resp.title : __("Oops!")) : __("Oops!"),
            content: resp ? (resp.msg ? resp.msg : __("An error occured. Please try again later!")) : __("An error occured. Please try again later!"),
            theme: 'modern',
            buttons: {
                confirm: {
                    text: __("Close"),
                    btnClass: "small button btn-red",
                    keys: ['enter']
                }
            },
            draggable: false,
            closeIcon: true,
            icon: 'icon-close',
            type: 'red'
        });
    }

    accounts.on("click", ".insights-basic-table[data-id='" + id + "']", function () {
        var table_button = $(this);
        table_button.prop('disabled', true)
        var ac_username = $(this).data("username");
        // var insights_basic = accounts.find(".insights-basic[data-id='" + id + "']");
        var selector_button = accounts.find(".insights-basic-button.active[data-id='" + id + "']");
        if (typeof selector_button !== 'undefined') {
            // insights_basic.addClass("onprogress");
            var selected_period = selector_button.data("type");
            if (typeof selected_period === 'undefined') {
                selected_period = "week";
            }
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "basic-insights",
                    id: id,
                    period: selected_period
                },

                error: function () {
                    // insights_basic.removeClass("onprogress");
                    table_button.prop('disabled', false);
                    specialAlertResponse();
                },

                success: function (resp) {
                    table_button.prop('disabled', false);
                    // insights_basic.removeClass("onprogress");
                    if (resp.result == 1) {
                        if (resp.basic_insights.length > 0) {

                            var basic_insights = [];
                            resp.basic_insights.forEach(function (item) {
                                if (item["label"] !== null) {
                                    basic_insights.push(item);
                                }
                            });

                            if (basic_insights.length > 0) {
                                var table_content = "";
                                var prev_value = 0;
                                var diff = 0;
                                var diff_content = "";
                                basic_insights = basic_insights.reverse();
                                basic_insights.forEach(function (item, key) {
                                    if (typeof basic_insights[key + 1] !== 'undefined') {
                                        diff = item["value"] - basic_insights[key + 1]["value"];
                                    } else {
                                        diff = 0;
                                    }

                                    if (diff == item["value"] || (diff == 0)) {
                                        diff_content = "<span></span>";
                                    } else if (diff > 0) {
                                        diff_content = "<span class='insight-basic-chart-diff-green'>+" + diff + "</span>";
                                    } else {
                                        diff_content = "<span class='insight-basic-chart-diff-red'>" + diff + "</span>";
                                    }

                                    table_content += "<tr>" +
                                        "<td class='insight-basic-table-label text-left'>" + item["label"] + "</td>" +
                                        "<td class='insight-basic-table-value text-center'>" + number_styler(item["value"] ? item["value"] : 0) + "</td>" +
                                        "<td style='display:none;'>" + item["value"] + "</td>" +
                                        "<td class='insight-basic-table-diff text-center'>" + diff_content + "</td>" +
                                        "</tr>";
                                    prev_value = item["value"];
                                });

                                var column_name = __("Date");
                                if (selected_period == "year") {
                                    column_name = __("Month");
                                } else if (selected_period == "week") {
                                    column_name = __("Day of the week");
                                }

                                var table = '<table>'
                                    + '<thead>' + '<tr>'
                                    + '<th class="text-left">' + column_name + '</th>'
                                    + '<th class="text-center">' + __("Followers") + '</th>'
                                    + '<th style="display:none;">' + __("Followers") + '</th>'
                                    + '<th></th>'
                                    + '</tr>' + '</thead>'
                                    + '<tbody>' + table_content + '</tbody>'
                                    + '</table>';

                                var insights_basic_table = $.confirm({
                                    title: false,
                                    content: function () {
                                        return table;
                                    },
                                    theme: 'modern',
                                    buttons: {
                                        confirm: {
                                            isHidden: true,
                                        },
                                        export: {
                                            text: __("Export data"),
                                            btnClass: "icon-cloud-download btn small button button--dark",
                                            keys: ['enter'],
                                            action: function () {
                                                var table_to_csv = $("body").find(".insights-basic-table-popup table");
                                                if (typeof table_to_csv !== "undefined") {
                                                    var csv_period = __("for a week") + " (%DD%-%MM%-%YY%)";
                                                    if (selected_period == "month") {
                                                        csv_period = __("for a month") + " (%MM%-%YY%)";
                                                    } else if (selected_period == "year") {
                                                        csv_period = __("for a year") + " (%YY%)";
                                                    }
                                                    table_to_csv.tableExport({
                                                        filename: "@" + ac_username + " - " + __("Instagram-report") + " " + csv_period,
                                                        format: 'csv',
                                                        excludeCols: '2',
                                                    });
                                                }
                                                return false;
                                            }
                                        },
                                        cancel: {
                                            text: __("Close"),
                                            btnClass: "btn small button button--dark--outline",
                                            keys: ['esc'],
                                            action: function () {
                                                insights_basic_table.close();
                                            }
                                        }
                                    },
                                    draggable: false,
                                    backgroundDismiss: false,
                                    columnClass: 'insights-basic-table-popup',
                                    closeIcon: true,
                                    closeIcon: function () {
                                        insights_basic_table.close();
                                    },
                                });
                            }
                        }
                    } else {
                        specialAlertResponse(resp);
                    }
                }
            });
        }
    });

    numberWithSpaces = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    number_styler = function (n) {
        var result = 0;
        var m = __("m");
        if (n < 10000000) {
            result = numberWithSpaces(n);
        } else {
            n = n / 1000000;
            result = n.toFixed(2) + m;
        }
        return result;
    }

    downloadInsightsBasicData = function (ibp_box, url, id, period, d_options = {}) {
        // ibp_box.addClass("onprogress");
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "basic-insights-download",
                id: id,
                period: period,
                d_options: d_options
            },

            error: function () {
                // ibp_box.removeClass("onprogress");
                specialAlertResponse();
            },

            success: function (resp) {
                // ibp_box.removeClass("onprogress");
                if (resp.result == 0) {
                    specialAlertResponse(resp);
                }
            }
        });
    }
}

/**
 * Insights Basic on load more event
 */
NextPost.InsightsBasicLoader = function (url) {
    var accounts = $("#accounts");

    var _getInsights = function () {
        var ids = [];
        var url = $("#accounts").data("url");
        accounts.find(".insights-basic")
            .not(".js-get-insights-loaded")
            .addClass("js-get-insights-loaded")
            .each(function (index) {
                ids.push($(this).data("id"));
                NextPost.InsightsTable($(this).data("id"), url);
            });

        if (ids.length > 0) {
            NextPost.InsightsBasic(ids, url);
        }
        NextPost.Tooltip();
    }

    _getInsights();
    // Get Basic Insight for loaded account
    window.loadmore.success = function ($item) {
        _getInsights();
    }
}

/**
 * Refresh self info
 */
NextPost.RefreshSelfInfo = function () {
    // Refresh self info on Accounts page
    $("body").on("click", "a.js-refresh-self-info", function () {
        var id = $(this).data("id");
        var url = $(this).data("url");
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

            error: function () {
                account_box.removeClass("onprogress");

                NextPost.Alert({
                    title: __("Oops!"),
                    content: __("An error occured. Please try again later!"),
                    confirmText: __("Close")
                });
            },

            success: function (resp) {
                if (resp.result == 1) {
                    account_box.removeClass("onprogress");

                    var reconnect_overlay = $(".js-re-connect[data-id='" + id + "']");
                    if (reconnect_overlay) {
                        reconnect_overlay.fadeOut();
                    }

                    var reconnect_quick_info = $(".quick-info .js-re-connect[data-id='" + id + "']");
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
                    account_box.removeClass("onprogress");

                    NextPost.Alert({
                        title: resp.title,
                        content: resp.msg,
                        confirmText: __("Close"),

                        confirm: function () {
                            if (resp.redirect) {
                                window.location.href = resp.redirect;
                            }
                        }
                    });
                }
            }
        });
    });
}


/**
 * Dark Side Mode Switcher
 */
NextPost.DarkSideModeSwitcher = function () {
    $("#topbar").find(":input[name='dark-side-switcher']").on("change", function () {
        setTimeout(function () {
            if ($("body").hasClass("darkside")) {
                $("body").removeClass("darkside");
            } else {
                $("body").addClass("darkside");
            }
        }, 1000);
    });
}


/**
* Pages functions
*/
NextPost.Pages = function () {
    // Show Notifications only for Add New Account Page
    if (window.location.href.indexOf("new") > 0) {
        var $form = $("#account form");
        // Show Notifications only for login stage
        if (!$form.find(".js-login").find(":input").prop("disabled")) {
            $form.find(".js-hide-aa-notice").removeClass('none');
            $form.find(".js-hide-aa-message").removeClass('none');
        }
        // Agree/Back Buttons
        if ($form.find(".js-hide-aa-notice .yes").length > 0) {
            $form.find(".js-login").find(".button").prop("disabled", true);
            $(".js-hide-aa-notice .yes").on("click", function () {
                $form.find(".js-hide-aa-notice").slideToggle("slow");
                $form.find(".js-login").find(".button").prop("disabled", false);
            });
        }
    }
}


// Wesley Start Mod
/**
 * Slave Account
 *
 */
NextPost.SlaveOn = function () {
    // SLAVE ON
    $("body").on("click", "a.js-slave-on-plugins", function () {
        var id = $(this).data("id");
        var url = $(this).data("url");
        $("body").addClass("onprogress");
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "slave-on",
                id: id
            },
            success: function (resp) {
                if (resp.result == 1) {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: __("SLAVE ON"),
                        content: __("Account changed to (Slave)!"),
                        confirmText: __("Close"),
                        confirm: function () {
                            location.reload(true);
                        }
                    });
                } else {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: resp.title,
                        content: resp.msg,
                        confirmText: __("Close"),
                        confirm: function () {
                            window.location.href = resp.redirect;
                        }
                    });
                }
            }
        });
    });
}

NextPost.SlaveOff = function () {
    // SLAVE OFF
    $("body").on("click", "a.js-slave-off-plugins", function () {
        var id = $(this).data("id");
        var url = $(this).data("url");
        $("body").addClass("onprogress");
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "slave-off",
                id: id
            },
            success: function (resp) {
                if (resp.result == 1) {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: __("SLAVE OFF"),
                        content: __("Account changed to (Non-Slave)!"),
                        confirmText: __("Close"),
                        confirm: function () {
                            location.reload(true);
                        }
                    });
                } else {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: resp.title,
                        content: resp.msg,
                        confirmText: __("Close"),
                        confirm: function () {
                            window.location.href = resp.redirect;
                        }
                    });
                }
            }
        });
    });
}

/**
 * Slave Account
 *
 */
NextPost.AllSlaveOn = function () {
    // SLAVE ON
    $("body").on("click", "a.js-all-slave-on-plugins", function () {
        // var id = $(this).data("id");
        var url = $(this).data("url");
        $("body").addClass("onprogress");
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "all-slave-on",
                //id: id
            },
            success: function (resp) {
                if (resp.result == 1) {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: __("ALL SLAVE ON"),
                        content: __("Accounts changed to (Slave)!"),
                        confirmText: __("Close"),
                        confirm: function () {
                            location.reload(true);
                        }
                    });
                } else {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: resp.title,
                        content: resp.msg,
                        confirmText: __("Close"),
                        confirm: function () {
                            window.location.href = resp.redirect;
                        }
                    });
                }
            }
        });
    });
}

NextPost.AllSlaveOff = function () {
    // SLAVE OFF
    $("body").on("click", "a.js-all-slave-off-plugins", function () {
        //var id = $(this).data("id");
        var url = $(this).data("url");
        $("body").addClass("onprogress");
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "all-slave-off",
                //id: id
            },
            success: function (resp) {
                if (resp.result == 1) {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: __("All SLAVE OFF"),
                        content: __("Accounts changed to (Non-Slave)!"),
                        confirmText: __("Close"),
                        confirm: function () {
                            location.reload(true);
                        }
                    });
                } else {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: resp.title,
                        content: resp.msg,
                        confirmText: __("Close"),
                        confirm: function () {
                            window.location.href = resp.redirect;
                        }
                    });
                }
            }
        });
    });
}


NextPost.AccountsFilter = function () {
    var search_timer;
    var search_xhr;
    var $form = $(".skeleton-aside .search-box");

    /**
     * Show login required accounts
     */
    $("body").on("click", "a.js-only-login-required", function () {
        var _this = $(this);
        var hide_accelerators_inp = $("body").find(":input[name='hide_accelerators']");
        var show_used_accelerators_inp = $("body").find(":input[name='show_used_accelerators']");
        var only_login_required_inp = $("body").find(":input[name='only_login_required']");
        var only_accelerators_inp = $("body").find(":input[name='only_accelerators']");
        var search_query = $("body").find(":input[name='q']");

        if (only_login_required_inp.val() == 0) {
            only_login_required_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            only_login_required_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }

        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        data = $.param({
            hide_accelerators: (hide_accelerators_inp.val() == 1) ? "yes" : "no",
            show_used_accelerators: (show_used_accelerators_inp.val() == 1) ? "yes" : "no",
            only_login_required: (only_login_required_inp.val() == 1) ? "yes" : "no",
            only_accelerators: (only_accelerators_inp.val() == 1) ? "yes" : "no",
        });

        if (search_query.val() != '') {
            data += '&' + $.param({
                q: search_query.val(),
            });
        }

        var duration = 200;
        search_timer = setTimeout(function () {
            search_query.addClass("onprogress");

            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                dataType: 'html',
                data: data,
                complete: function () {
                    search_query.removeClass('onprogress');
                },
                // success: function(resp) {
                //     $resp = $(resp);

                //     if ($resp.find(".skeleton-aside .js-search-results").length == 1) {
                //         $(".skeleton-aside .js-search-results")
                //             .html($resp.find(".skeleton-aside .js-search-results").html());
                //     }
                // }
                success: function (resp) {
                    location.reload();
                }
            });
        }, duration);
    });

    /**
     * Show accelerators
     */
    $("body").on("click", "a.js-only-accelerators", function () {
        var _this = $(this);
        var hide_accelerators_inp = $("body").find(":input[name='hide_accelerators']");
        var show_used_accelerators_inp = $("body").find(":input[name='show_used_accelerators']");
        var only_login_required_inp = $("body").find(":input[name='only_login_required']");
        var only_accelerators_inp = $("body").find(":input[name='only_accelerators']");
        var search_query = $("body").find(":input[name='q']");

        if (only_accelerators_inp.val() == 0) {
            only_accelerators_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            only_accelerators_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }

        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        data = $.param({
            hide_accelerators: (hide_accelerators_inp.val() == 1) ? "yes" : "no",
            show_used_accelerators: (show_used_accelerators_inp.val() == 1) ? "yes" : "no",
            only_login_required: (only_login_required_inp.val() == 1) ? "yes" : "no",
            only_accelerators: (only_accelerators_inp.val() == 1) ? "yes" : "no",
        });

        if (search_query.val() != '') {
            data += '&' + $.param({
                q: search_query.val(),
            });
        }

        var duration = 200;
        search_timer = setTimeout(function () {
            search_query.addClass("onprogress");

            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                dataType: 'html',
                data: data,
                complete: function () {
                    search_query.removeClass('onprogress');
                },
                // success: function(resp) {
                //     $resp = $(resp);

                //     if ($resp.find(".skeleton-aside .js-search-results").length == 1) {
                //         $(".skeleton-aside .js-search-results")
                //             .html($resp.find(".skeleton-aside .js-search-results").html());
                //     }
                // }
                success: function (resp) {
                    location.reload();
                }
            });
        }, duration);
    });

    /**
     * Hide accelerators
     */
    $("body").on("click", "a.js-hide-accelerators", function () {
        var _this = $(this);
        var hide_accelerators_inp = $("body").find(":input[name='hide_accelerators']");
        var show_used_accelerators_inp = $("body").find(":input[name='show_used_accelerators']");
        var only_login_required_inp = $("body").find(":input[name='only_login_required']");
        var only_accelerators_inp = $("body").find(":input[name='only_accelerators']");
        var search_query = $("body").find(":input[name='q']");

        if (hide_accelerators_inp.val() == 0) {
            hide_accelerators_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            hide_accelerators_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }

        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        data = $.param({
            hide_accelerators: (hide_accelerators_inp.val() == 1) ? "yes" : "no",
            show_used_accelerators: (show_used_accelerators_inp.val() == 1) ? "yes" : "no",
            only_login_required: (only_login_required_inp.val() == 1) ? "yes" : "no",
            only_accelerators: (only_accelerators_inp.val() == 1) ? "yes" : "no",
        });

        if (search_query.val() != '') {
            data += '&' + $.param({
                q: search_query.val(),
            });
        }

        var duration = 200;
        search_timer = setTimeout(function () {
            search_query.addClass("onprogress");

            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                dataType: 'html',
                data: data,
                complete: function () {
                    search_query.removeClass('onprogress');
                },
                // success: function(resp) {
                //     $resp = $(resp);

                //     if ($resp.find(".skeleton-aside .js-search-results").length == 1) {
                //         $(".skeleton-aside .js-search-results")
                //             .html($resp.find(".skeleton-aside .js-search-results").html());
                //     }
                // }
                success: function (resp) {
                    location.reload();
                }
            });
        }, duration);
    });

    /**
     * Show Used accelerators
     */
    $("body").on("click", "a.js-show-used-accelerators", function () {
        var _this = $(this);
        var show_used_accelerators_inp = $("body").find(":input[name='show_used_accelerators']");
        var hide_accelerators_inp = $("body").find(":input[name='hide_accelerators']");
        var only_login_required_inp = $("body").find(":input[name='only_login_required']");
        var only_accelerators_inp = $("body").find(":input[name='only_accelerators']");
        var search_query = $("body").find(":input[name='q']");

        if (show_used_accelerators_inp.val() == 0) {
            show_used_accelerators_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            show_used_accelerators_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }

        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        data = $.param({
            show_used_accelerators: (show_used_accelerators_inp.val() == 1) ? "yes" : "no",
            hide_accelerators: (hide_accelerators_inp.val() == 1) ? "yes" : "no",
            only_login_required: (only_login_required_inp.val() == 1) ? "yes" : "no",
            only_accelerators: (only_accelerators_inp.val() == 1) ? "yes" : "no",
        });

        if (search_query.val() != '') {
            data += '&' + $.param({
                q: search_query.val(),
            });
        }

        var duration = 200;
        search_timer = setTimeout(function () {
            search_query.addClass("onprogress");

            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                dataType: 'html',
                data: data,
                complete: function () {
                    search_query.removeClass('onprogress');
                },
                success: function (resp) {
                    location.reload();
                }
            });
        }, duration);
    });


    /**
     * Flush filters
     */
    $("body").on("click", "a.js-flush-filters", function () {
        var search_query = $("body").find(":input[name='q']");

        data = $.param({
            flush_filters: 1
        });

        search_query.addClass("onprogress");

        $.ajax({
            url: $form.attr("action"),
            type: $form.attr("method"),
            ataType: 'html',
            data: data,
            complete: function () {
                search_query.removeClass('onprogress');
            },
            success: function (resp) {
                location.reload();
            }
        });
    });
}

/**
* Remove Accounts Relogin (Data entry)
*
*/
NextPost.RemoveLoginRequired = function () {
    $("body").on("click", "a.js-all-acc-delete-list-item", function () {
        var item = $(this).parents(".js-list-item");
        //var id = $(this).data("id");
        var url = $(this).data("url");

        NextPost.Confirm({
            confirm: function () {
                $("body").addClass("onprogress");
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'jsonp',
                    data: {
                        action: "delete-all-reconnect"
                        // id: id
                    },
                    success: function (resp) {
                        if (resp.result == 1) {
                            $("body").removeClass("onprogress");
                            NextPost.Alert({
                                title: __("Accounts with Relogin"),
                                content: __("All accounts were successfully deleted!"),
                                confirmText: __("Close"),
                                confirm: function () {
                                    location.reload(true);
                                }
                            });
                        } else {
                            $("body").removeClass("onprogress");
                            NextPost.Alert({
                                title: resp.title,
                                content: resp.msg,
                                confirmText: __("Close"),
                                confirm: function () {
                                    window.location.href = resp.redirect;
                                }
                            });
                        }
                    }
                });
            }
        })
    });
}


NextPost.FlushAccelerators = function () {
    $("body").on("click", "a.js-flush-all-accelerators", function () {
        var url = $(this).data("url");
        $("body").addClass("onprogress");
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "flush-accelerators",
            },
            success: function (resp) {
                if (resp.result == 1) {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: __("Success Flush"),
                        content: resp.msg,
                        confirmText: __("Close"),
                        confirm: function () {
                            location.reload(true);
                        }
                    });
                } else {
                    $("body").removeClass("onprogress");
                    NextPost.Alert({
                        title: resp.title,
                        content: resp.msg,
                        confirmText: __("Close"),
                        confirm: function () {
                            window.location.href = resp.redirect;
                        }
                    });
                }
            }
        });
    });
}

// Wesley End Mod