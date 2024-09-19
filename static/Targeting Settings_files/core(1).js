/**
 * Reactions Pro
 *
 * @author Michael Johnson (https://mjcodebase.com)
 *
 */
var Reactions = {};

!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).LazyLoad=n()}(this,(function(){"use strict";function t(){return(t=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t}).apply(this,arguments)}var n="undefined"!=typeof window,e=n&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),i=n&&"IntersectionObserver"in window,o=n&&"classList"in document.createElement("p"),r=n&&window.devicePixelRatio>1,a={elements_selector:".lazy",container:e||n?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_bg_hidpi:"bg-hidpi",data_bg_multi:"bg-multi",data_bg_multi_hidpi:"bg-multi-hidpi",data_poster:"poster",class_applied:"applied",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_entered:"entered",class_exited:"exited",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!0,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1},c=function(n){return t({},a,n)},s=function(t,n){var e,i="LazyLoad::Initialized",o=new t(n);try{e=new CustomEvent(i,{detail:{instance:o}})}catch(t){(e=document.createEvent("CustomEvent")).initCustomEvent(i,!1,!1,{instance:o})}window.dispatchEvent(e)},l="loading",u="loaded",d="applied",f="error",_="native",g="data-",v="ll-status",p=function(t,n){return t.getAttribute(g+n)},b=function(t){return p(t,v)},h=function(t,n){return function(t,n,e){var i="data-ll-status";null!==e?t.setAttribute(i,e):t.removeAttribute(i)}(t,0,n)},m=function(t){return h(t,null)},E=function(t){return null===b(t)},y=function(t){return b(t)===_},A=[l,u,d,f],I=function(t,n,e,i){t&&(void 0===i?void 0===e?t(n):t(n,e):t(n,e,i))},L=function(t,n){o?t.classList.add(n):t.className+=(t.className?" ":"")+n},w=function(t,n){o?t.classList.remove(n):t.className=t.className.replace(new RegExp("(^|\\s+)"+n+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},k=function(t){return t.llTempImage},O=function(t,n){if(n){var e=n._observer;e&&e.unobserve(t)}},x=function(t,n){t&&(t.loadingCount+=n)},z=function(t,n){t&&(t.toLoadCount=n)},C=function(t){for(var n,e=[],i=0;n=t.children[i];i+=1)"SOURCE"===n.tagName&&e.push(n);return e},N=function(t,n,e){e&&t.setAttribute(n,e)},M=function(t,n){t.removeAttribute(n)},R=function(t){return!!t.llOriginalAttrs},G=function(t){if(!R(t)){var n={};n.src=t.getAttribute("src"),n.srcset=t.getAttribute("srcset"),n.sizes=t.getAttribute("sizes"),t.llOriginalAttrs=n}},T=function(t){if(R(t)){var n=t.llOriginalAttrs;N(t,"src",n.src),N(t,"srcset",n.srcset),N(t,"sizes",n.sizes)}},j=function(t,n){N(t,"sizes",p(t,n.data_sizes)),N(t,"srcset",p(t,n.data_srcset)),N(t,"src",p(t,n.data_src))},D=function(t){M(t,"src"),M(t,"srcset"),M(t,"sizes")},F=function(t,n){var e=t.parentNode;e&&"PICTURE"===e.tagName&&C(e).forEach(n)},P={IMG:function(t,n){F(t,(function(t){G(t),j(t,n)})),G(t),j(t,n)},IFRAME:function(t,n){N(t,"src",p(t,n.data_src))},VIDEO:function(t,n){!function(t,e){C(t).forEach((function(t){N(t,"src",p(t,n.data_src))}))}(t),N(t,"poster",p(t,n.data_poster)),N(t,"src",p(t,n.data_src)),t.load()}},S=function(t,n){var e=P[t.tagName];e&&e(t,n)},V=function(t,n,e){x(e,1),L(t,n.class_loading),h(t,l),I(n.callback_loading,t,e)},U=["IMG","IFRAME","VIDEO"],$=function(t,n){!n||function(t){return t.loadingCount>0}(n)||function(t){return t.toLoadCount>0}(n)||I(t.callback_finish,n)},q=function(t,n,e){t.addEventListener(n,e),t.llEvLisnrs[n]=e},H=function(t,n,e){t.removeEventListener(n,e)},B=function(t){return!!t.llEvLisnrs},J=function(t){if(B(t)){var n=t.llEvLisnrs;for(var e in n){var i=n[e];H(t,e,i)}delete t.llEvLisnrs}},K=function(t,n,e){!function(t){delete t.llTempImage}(t),x(e,-1),function(t){t&&(t.toLoadCount-=1)}(e),w(t,n.class_loading),n.unobserve_completed&&O(t,e)},Q=function(t,n,e){var i=k(t)||t;B(i)||function(t,n,e){B(t)||(t.llEvLisnrs={});var i="VIDEO"===t.tagName?"loadeddata":"load";q(t,i,n),q(t,"error",e)}(i,(function(o){!function(t,n,e,i){var o=y(n);K(n,e,i),L(n,e.class_loaded),h(n,u),I(e.callback_loaded,n,i),o||$(e,i)}(0,t,n,e),J(i)}),(function(o){!function(t,n,e,i){var o=y(n);K(n,e,i),L(n,e.class_error),h(n,f),I(e.callback_error,n,i),o||$(e,i)}(0,t,n,e),J(i)}))},W=function(t,n,e){!function(t){t.llTempImage=document.createElement("IMG")}(t),Q(t,n,e),function(t,n,e){var i=p(t,n.data_bg),o=p(t,n.data_bg_hidpi),a=r&&o?o:i;a&&(t.style.backgroundImage='url("'.concat(a,'")'),k(t).setAttribute("src",a),V(t,n,e))}(t,n,e),function(t,n,e){var i=p(t,n.data_bg_multi),o=p(t,n.data_bg_multi_hidpi),a=r&&o?o:i;a&&(t.style.backgroundImage=a,function(t,n,e){L(t,n.class_applied),h(t,d),n.unobserve_completed&&O(t,n),I(n.callback_applied,t,e)}(t,n,e))}(t,n,e)},X=function(t,n,e){!function(t){return U.indexOf(t.tagName)>-1}(t)?W(t,n,e):function(t,n,e){Q(t,n,e),S(t,n),V(t,n,e)}(t,n,e)},Y=["IMG","IFRAME"],Z=function(t){return t.use_native&&"loading"in HTMLImageElement.prototype},tt=function(t,n,e){t.forEach((function(t){return function(t){return t.isIntersecting||t.intersectionRatio>0}(t)?function(t,n,e,i){h(t,"entered"),L(t,e.class_entered),w(t,e.class_exited),function(t,n,e){n.unobserve_entered&&O(t,e)}(t,e,i),I(e.callback_enter,t,n,i),function(t){return A.indexOf(b(t))>=0}(t)||X(t,e,i)}(t.target,t,n,e):function(t,n,e,i){E(t)||(L(t,e.class_exited),function(t,n,e,i){e.cancel_on_exit&&function(t){return b(t)===l}(t)&&"IMG"===t.tagName&&(J(t),function(t){F(t,(function(t){D(t)})),D(t)}(t),function(t){F(t,(function(t){T(t)})),T(t)}(t),w(t,e.class_loading),x(i,-1),m(t),I(e.callback_cancel,t,n,i))}(t,n,e,i),I(e.callback_exit,t,n,i))}(t.target,t,n,e)}))},nt=function(t){return Array.prototype.slice.call(t)},et=function(t){return t.container.querySelectorAll(t.elements_selector)},it=function(t){return function(t){return b(t)===f}(t)},ot=function(t,n){return function(t){return nt(t).filter(E)}(t||et(n))},rt=function(t,e){var o=c(t);this._settings=o,this.loadingCount=0,function(t,n){i&&!Z(t)&&(n._observer=new IntersectionObserver((function(e){tt(e,t,n)}),function(t){return{root:t.container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"}}(t)))}(o,this),function(t,e){n&&window.addEventListener("online",(function(){!function(t,n){var e;(e=et(t),nt(e).filter(it)).forEach((function(n){w(n,t.class_error),m(n)})),n.update()}(t,e)}))}(o,this),this.update(e)};return rt.prototype={update:function(t){var n,o,r=this._settings,a=ot(t,r);z(this,a.length),!e&&i?Z(r)?function(t,n,e){t.forEach((function(t){-1!==Y.indexOf(t.tagName)&&(t.setAttribute("loading","lazy"),function(t,n,e){Q(t,n,e),S(t,n),h(t,_)}(t,n,e))})),z(e,0)}(a,r,this):(o=a,function(t){t.disconnect()}(n=this._observer),function(t,n){n.forEach((function(n){t.observe(n)}))}(n,o)):this.loadAll(a)},destroy:function(){this._observer&&this._observer.disconnect(),et(this._settings).forEach((function(t){delete t.llOriginalAttrs})),delete this._observer,delete this._settings,delete this.loadingCount,delete this.toLoadCount},loadAll:function(t){var n=this,e=this._settings;ot(t,e).forEach((function(t){O(t,n),X(t,e,n)}))}},rt.load=function(t,n){var e=c(n);X(t,e)},rt.resetStatus=function(t){m(t)},n&&function(t,n){if(n)if(n.length)for(var e,i=0;e=n[i];i+=1)s(t,e);else s(t,n)}(rt,window.lazyLoadOptions),rt}));

var lazyLoadInstance = new LazyLoad();

Reactions.isDefined = function(foo) {
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
if (Reactions.isDefined(showToast) && Reactions.isDefined(hideToast)) {
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

var specialAlertResponse = function(resp = null) {
    $.alert({
        title: resp ? ( resp.title ? resp.title: __("Oops!") )  : __("Oops!"),
        content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
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
        type: resp ? (resp.type ? resp.type : 'red') : 'red'
    });
}

// Storing Items with Expiry Time
var setWithExpiry = function(key, value, ttl) {
    const now = new Date()
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

// Getting Items From Storage
var getWithExpiry = function(key) {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key)
        return null
    }
    return item.value
}

// Re-connect in Reactions Pro module
$("body").off("click", ".js-bypassing-toolkit-re-connect").on("click", ".js-bypassing-toolkit-re-connect", function() {
    var id = $(this).data("id");
    var task = $("body").find(".aside-list-item[data-id='" + id + "']");
    var reload_url = $(this).data("reload-url");

    task.addClass("onprogress");

    $(document).ajaxSuccess(function(event, xhr, settings) {
        if (settings.url.match(/bypassing-toolkit/i) || settings.url.match(/accounts/i)) {
            task.removeClass("onprogress");
            $.ajax({
                url: reload_url,
                type: "GET",
                dataType: 'html',
                success: function(resp) {
                    $resp = $(resp);
                    if ($resp.find(".skeleton-content").length == 1) {
                        $(".skeleton-content")
                            .html($resp.find(".skeleton-content").html());
                    }
                    if ($resp.find(".skeleton-content .rp-login-required-ac").length !== 1) {
                        $("body").find(".aside-list-item[data-id='" + id + "']").find(".rp-login-required-state").html("");
                    }
                }
            });
        }
    });

    $(document).ajaxError(function(event, xhr, settings) {
        if (settings.url.match(/bypassing-toolkit/i) || settings.url.match(/accounts/i)) {
            task.removeClass("onprogress");
        }
    });
});
$("body").off("click", ".js-re-connect").on("click", ".js-re-connect", function() {
    var id = $(this).data("id");
    var task = $("body").find(".aside-list-item[data-id='" + id + "']");
    var reload_url = $(this).data("reload-url");

    task.addClass("onprogress");

    $(document).ajaxSuccess(function(event, xhr, settings, data) {
        if (settings.url.match(/bypassing-toolkit/i) || settings.url.match(/accounts/i)) {
            task.removeClass("onprogress");
            $.ajax({
                url: reload_url,
                type: "GET",
                dataType: 'html',
                success: function(resp) {
                    $resp = $(resp);
                    if ($resp.find(".skeleton-content").length == 1) {
                        $(".skeleton-content")
                            .html($resp.find(".skeleton-content").html());
                    }
                    if ($resp.find(".skeleton-content .rp-login-required-ac").length !== 1) {
                        $("body").find(".aside-list-item[data-id='" + id + "']").find(".rp-login-required-state").html("");
                    }
                }
            });
        }
    });

    $(document).ajaxError(function(event, xhr, settings) {
        if (settings.url.match(/bypassing-toolkit/i) || settings.url.match(/accounts/i)) {
            task.removeClass("onprogress");
        }
    });
});

// Check ER info
Reactions.erInfo = function() {
    $("body").find(".js-check-er-info").off("click").on("click", function() {
        var _this = $(this);
        var $form = $(".js-reactions-schedule-form");
        var $searchinp = $form.find(":input[name='search']");
        var name = _this.data("name");
        var er_value_cached = getWithExpiry("er-value-" + name);
        if (er_value_cached) {
            _this.removeClass("color-orange");
            _this.html(er_value_cached);
        } else if (!_this.hasClass("loading")) {
            _this.addClass("loading");
            _this.prepend("<span class='er-loading mdi mdi-loading color-orange'></span>");
            _this.html(__("Loading..."));
            $.ajax({
                url: $searchinp.data("url"),
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "er-info",
                    instagram_id: name
                },
                error: function() {
                    _this.find(".er-loading").remove();
                    _this.removeClass("loading");
                    _this.html(__("Check ERpost"));
                    specialAlertResponse();
                },
                success: function(resp) {
                    if (resp.result == 1 && resp.er_info) {
                        _this.find(".er-loading").remove();
                        _this.removeClass("loading");
                        _this.removeClass("color-orange");
                        _this.html(resp.er_info);
                        setWithExpiry("er-value-" + name, resp.er_info, 86400);
                    } else {
                        _this.find(".er-loading").remove();
                        _this.removeClass("loading");
                        _this.html(__("Check ERpost"));
                        specialAlertResponse(resp);
                    }
                }
            });
        }
    });
}
Reactions.erInfo();

Reactions.targetScrappers = function() {
    var ts_modal = $("#target-list-popup");
    var $searchinp_scrapers = ts_modal.find(":input[name='search-scrapers']");
    var scraper = [];
    var query;
    var icons = {};
        icons.account = "mdi mdi-instagram mr-5";
        icons.people_likers = "mdi mdi-heart";
        icons.people_followers = "mdi mdi-instagram";
        icons.hashtag = "mdi mdi-pound";
        icons.hashtag_likers = "mdi mdi-pound";
        icons.location = "mdi mdi-map-marker";
        icons.location_likers = "mdi mdi-map-marker";
        icons.explore = "mdi mdi-compass";
        icons.explore_likers = "mdi mdi-compass";
        icons.reels = "instagram-pro icon-instagram-reels rp-reels-icon";
        icons.keyword = "mdi mdi-image-search";
        icons.keyword_likers = "mdi mdi-image-search";
        icons.keyword_reels = "mdi mdi-movie-search";
        icons.keyword_reels_likers = "mdi mdi-movie-search";
        icons.people_followings = "mdi mdi-instagram";
        icons.people = "mdi mdi-instagram";
        icons.timeline = "mdi mdi-home-account";
        icons.timeline_likers = "mdi mdi-home-account";
        icons.user_id_list = "mdi mdi-account-details";

    // Get ready scrapers
    ts_modal.find(".scraper").each(function() {
        scraper.push($(this).data("type") + "-" + $(this).data("id"));
    });

    // Remove scraper
    var removeScrappers = function() {
        ts_modal.off("click", ".scraper .remove").on("click", ".scraper .remove", function() {
            var $scraper = $(this).parents(".scraper");
            $.ajax({
                url: $searchinp_scrapers.data("url"),
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "unselect-scraper",
                    id: $scraper.data("id")
                },
                error: function() {
                    specialAlertResponse();
                },
                success: function(resp) {
                    if (resp.result == 1) {
                        var index = scraper.indexOf($scraper.data("type") + "-" + $scraper.data("id"));
                        if (index >= 0) {
                            scraper.splice(index, 1);
                        }

                        $scraper.remove();

                        var scraper_count = ts_modal.find(".scrapers-count").text();
                        ts_modal.find(".scrapers-count").text(parseInt(scraper_count) - 1);
                    } else {
                        specialAlertResponse(resp);
                    }
                }
            });
        });
    }

    // Search auto complete for scrapers
    $searchinp_scrapers.devbridgeAutocomplete({
        serviceUrl: $searchinp_scrapers.data("url"),
        type: "GET",
        dataType: "jsonp",
        minChars: 0,
        deferRequestBy: 200,
        forceFixPosition: true,
        paramName: "q",
        appendTo: ".suggestions-scrapers",
        params: {
            action: "search-scrapers",
            type: "account"
        },
        onSearchStart: function() {
            ts_modal.find(".js-search-loading-icon-scrapers").removeClass('none');
            query = $searchinp_scrapers.val();
        },
        onSearchComplete: function() {
            ts_modal.find(".js-search-loading-icon-scrapers").addClass('none');
        },
        transformResult: function(resp) {
            return {
                suggestions: resp.result == 1 ? resp.items : []
            };
        },
        beforeRender: function (container, suggestions) {
            for (var i = 0; i < suggestions.length; i++) {
                var type = "account";
                if (scraper.indexOf(type + "-" + suggestions[i].data.id) >= 0) {
                    container.find(".autocomplete-suggestion").eq(i).addClass('none')
                }
            }
        },
        formatResult: function(suggestion, currentValue){
            var pattern = '(' + currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ')';
            var type = "account";

            return (suggestion.data.img ? "<img src='" + suggestion.data.img + "' style='width: 40px;height: 40px;margin: 0 12px 0 0; border-radius: 50%;float:left;border: 1px solid #e6e6e6;'>" : '') + suggestion.value
                        .replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>')
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/&lt;(\/?strong)&gt;/g, '<$1>') +
                    (suggestion.data.sub ? "<span class='sub'>"+suggestion.data.sub+"<span>" : "");
        },
        onSelect: function(suggestion){
            $.ajax({
                url: $searchinp_scrapers.data("url"),
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "select-scraper",
                    id: suggestion.data.id
                },
                error: function() {
                    specialAlertResponse();
                },
                success: function(resp) {
                    if (resp.result == 1) {
                        $searchinp_scrapers.val(query);
                        var type = "account";
                        if (scraper.indexOf(type+"-"+suggestion.data.id) >= 0) {
                            return false;
                        }

                        var $acc = $("<span style='margin: 0px 3px 3px 0px'></span>");
                            $acc.addClass("scraper pull-left preadd");
                            $acc.attr({
                                "data-type": type,
                                "data-id": suggestion.data.id,
                                "data-value": suggestion.value,
                            });

                            $acc.text(suggestion.value + (suggestion.calls ? suggestion.calls : ""));

                            $acc.prepend("<span class='icon "+icons[type]+"'></span>");
                            $acc.append("<span class='mdi mdi-close remove'></span>");

                        $acc.appendTo(ts_modal.find(".scrapers"));

                        setTimeout(function(){
                            $acc.removeClass("preadd");
                        }, 50);

                        scraper.push(type+ "-" + suggestion.data.id);

                        var scraper_count = ts_modal.find(".scrapers-count").text();
                        ts_modal.find(".scrapers-count").text(parseInt(scraper_count) + 1);

                        removeScrappers();
                    } else {
                        specialAlertResponse(resp);
                    }
                }
            });
        }
    });

    removeScrappers();

    // Ignore safety delay checkbox
    ts_modal.on("change", ":input[name='process-scrapers-without-delay']", function() {
        $.ajax({
            url: $searchinp_scrapers.data("url"),
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "process-scrapers-without-delay",
                state: $(this).is(":checked") ? 1 : 0
            },
            error: function() {
                specialAlertResponse();
            },
            success: function(resp) {
                if (resp.result == 1) {
                    // Success
                } else {
                    specialAlertResponse(resp);
                }
            }
        });
    });

    // Use web method for targets recognition
    ts_modal.on("change", ":input[name='process-scrapers-without-web-method']", function() {
        $.ajax({
            url: $searchinp_scrapers.data("url"),
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "process-scrapers-without-web-method",
                state: $(this).is(":checked") ? 1 : 0
            },
            error: function() {
                specialAlertResponse();
            },
            success: function(resp) {
                if (resp.result == 1) {
                    // Success
                } else {
                    specialAlertResponse(resp);
                }
            }
        });
    });
}

$("#target-list-popup").on("shown.bs.modal", function (e) {
    Reactions.targetScrappers();
});

/**
 * Reactions Schedule Form
 */
Reactions.ScheduleForm = function() {
    var $form = $(".js-reactions-schedule-form");
    var $searchinp = $form.find(":input[name='search']");
    var $searchinp_accelerators = $form.find(":input[name='search-accelerators']");
    var $searchinp_languages = $form.find(":input[name='search-languages']");
    var query;
    var icons = {};
        icons.account = "mdi mdi-instagram mr-5";
        icons.people_likers = "mdi mdi-heart";
        icons.people_followers = "mdi mdi-instagram";
        icons.hashtag = "mdi mdi-pound";
        icons.hashtag_likers = "mdi mdi-pound";
        icons.location = "mdi mdi-map-marker";
        icons.location_likers = "mdi mdi-map-marker";
        icons.explore = "mdi mdi-compass";
        icons.explore_likers = "mdi mdi-compass";
        icons.reels = "instagram-pro icon-instagram-reels rp-reels-icon";
        icons.keyword = "mdi mdi-image-search";
        icons.keyword_likers = "mdi mdi-image-search";
        icons.keyword_reels = "mdi mdi-movie-search";
        icons.keyword_reels_likers = "mdi mdi-movie-search";
        icons.people_followings = "mdi mdi-instagram";
        icons.people = "mdi mdi-instagram";
        icons.timeline = "mdi mdi-home-account";
        icons.timeline_likers = "mdi mdi-home-account";
        icons.user_id_list = "mdi mdi-account-details";
    var target = [];
    var accelerator = [];
    var language = [];

    // Get ready tags
    $form.find(".tag").each(function() {
        target.push($(this).data("type") + "-" + $(this).data("id"));
    });

    // Get ready accelerators
    $form.find(".accelerator").each(function() {
        accelerator.push($(this).data("type") + "-" + $(this).data("id"));
    });

    // Get ready languages
    $form.find(".language").each(function() {
        language.push($(this).data("type") + "-" + $(this).data("id"));
    });

    // Search auto complete for targeting
    $searchinp.devbridgeAutocomplete({
        serviceUrl: $searchinp.data("url"),
        type: "GET",
        dataType: "jsonp",
        minChars: 1,
        deferRequestBy: 1000,
        forceFixPosition: true,
        preventBadQueries: false,
        showNoSuggestionNotice: true,
        paramName: "q",
        appendTo: ".suggestions-target-search",
        params: {
            action: "search",
            type: $form.find(":input[name='type']:checked").val(),
        },
        onSearchStart: function() {
            $form.find(".js-search-loading-icon").removeClass('none');
            query = $searchinp.val();
        },
        onSearchComplete: function() {
            var msg = localStorage.getItem("auto_complete_msg");
            if (msg) {
                $form.find(".autocomplete-no-suggestion").html(msg);
            }
            $form.find(".js-search-loading-icon").addClass('none');
        },
        transformResult: function(resp) {
            if (resp.msg) {
                localStorage.setItem("auto_complete_msg", resp.msg);
            }
            return {
                suggestions: resp.result == 1 ? resp.items : []
            };
        },
        beforeRender: function (container, suggestions) {
            for (var i = 0; i < suggestions.length; i++) {
                var type = $form.find(":input[name='type']:checked").val();
                if (target.indexOf(type + "-" + suggestions[i].data.id) >= 0) {
                    container.find(".autocomplete-suggestion").eq(i).addClass('none')
                }
            }
            setTimeout(function () {
                lazyLoadInstance.update();
            }, 0);
        },
        formatResult: function(suggestion, currentValue){
            var pattern = '(' + currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ')';
            var type = $form.find(":input[name='type']:checked").val();

            var er_value = '';
            var instagram_id = (suggestion.value ? suggestion.value : 0);

            var img_src = suggestion.data.img;
            if (type == 'people_followers' || type == 'people_likers' || type == 'people_followers_followers' || type == 'people_followers_followings' || type == 'people_followings') {
                img_src = cf_worker ? cf_worker + '/' + suggestion.data.img : $searchinp.data("url") + "/cors/?media_url=" + suggestion.data.img;
            }

            return (suggestion.data.img ? "<img class='lazy' data-src='" + img_src + "' style='width: 40px;height: 40px;margin: 0 12px 0 0; border-radius: 50%;float:left;border: 1px solid #e6e6e6;'>" : '') + suggestion.value
                        .replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>')
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/&lt;(\/?strong)&gt;/g, '<$1>') +
                    (suggestion.data.verified ? "<span class='mdi mdi-check-decagram rpm-verified-label-search-result'></span>" : "") +
                    (suggestion.data.sub ? "<span class='sub'>"+"<span class='er-value'>"+er_value+"</span>"+suggestion.data.sub+"<span>" : "");
        },
        onSelect: function(suggestion){
            $searchinp.val(query);
            var type = $form.find(":input[name='type']:checked").val();

            if (target.indexOf(type+"-"+suggestion.data.id) >= 0) {
                return false;
            }

            var $tag = $("<span style='margin: 0px 2px 3px 0px'></span>");
                $tag.addClass("tag pull-left preadd");
                $tag.attr({
                    "data-type": type,
                    "data-id": suggestion.data.id,
                    "data-value": suggestion.value,
                });

                $addit_text = "";
                if (type == "people_followings") {
                    $addit_text = __(" (followings)");
                } else if (type == "people_followers") {
                    $addit_text = __(" (followers)");
                } else if (type == "people_likers") {
                    $addit_text = __(" (likers)");
                } else if (type == "hashtag_likers") {
                    $addit_text = __(" (likers)");
                } else if (type == "location_likers") {
                    $addit_text = __(" (likers)");
                } else if (type == "explore_likers") {
                    $addit_text = __(" (likers)");
                } else if (type == "keyword_likers") {
                    $addit_text = __(" (likers)");
                } else if (type == "keyword_reels_likers") {
                    $addit_text = __(" (reel likers)");
                } else if (type == "timeline_likers") {
                    $addit_text = __(" (likers)");
                }

                $tag.text(suggestion.value + $addit_text);

                $tag.prepend("<span class='icon "+icons[type]+"'></span>");

                if (suggestion.can_er && (type == "people_followings" || type == "people_followers" || type == "people_likers" || type == "people")) {
                    $tag.append("· <span class='js-check-er-info' data-name='" + suggestion.value + "'>" + __("Check ERpost") + "</span>");
                    $tag.append("<a class='ml-3 mdi mdi-link' style='color: white;' href='https://www.instagram.com/" + suggestion.value + "' target='_blank'></a>");
                }

                $tag.append("<span class='mdi mdi-close remove'></span>");

            $tag.appendTo($form.find(".tags"));

            setTimeout(function(){
                $tag.removeClass("preadd");
            }, 50);

            target.push(type+ "-" + suggestion.data.id);

            Reactions.UpdateTargetsCount();
        },
        onHide: function(){
            $("body").find(".autocomplete-suggestion img").attr("src", "");
        }
    });

    // Search auto complete for accelerators
    $searchinp_accelerators.devbridgeAutocomplete({
        serviceUrl: $searchinp_accelerators.data("url"),
        type: "GET",
        dataType: "jsonp",
        minChars: 0,
        deferRequestBy: 200,
        forceFixPosition: true,
        paramName: "q",
        appendTo: ".suggestions-accelerators",
        params: {
            action: "search-acc",
            type: "account"
        },
        onSearchStart: function() {
            $form.find(".js-search-loading-icon-accelerators").removeClass('none');
            query = $searchinp_accelerators.val();
        },
        onSearchComplete: function() {
            $form.find(".js-search-loading-icon-accelerators").addClass('none');
        },
        transformResult: function(resp) {
            return {
                suggestions: resp.result == 1 ? resp.items : []
            };
        },
        beforeRender: function (container, suggestions) {
            for (var i = 0; i < suggestions.length; i++) {
                var type = "account";
                if (accelerator.indexOf(type + "-" + suggestions[i].data.id) >= 0) {
                    container.find(".autocomplete-suggestion").eq(i).addClass('none')
                }
            }
        },
        formatResult: function(suggestion, currentValue){
            var pattern = '(' + currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ')';
            var type = "account";

            return (suggestion.data.img ? "<img src='" + suggestion.data.img + "' style='width: 40px;height: 40px;margin: 0 12px 0 0; border-radius: 50%;float:left;border: 1px solid #e6e6e6;'>" : '') + suggestion.value
                        .replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>')
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/&lt;(\/?strong)&gt;/g, '<$1>') +
                    (suggestion.data.sub ? "<span class='sub'>"+suggestion.data.sub+"<span>" : "");
        },
        onSelect: function(suggestion){
            $searchinp_accelerators.val(query);
            var $accelerator = $(this).parents(".accelerator");
            var type = "account";

            if (accelerator.indexOf(type+"-"+suggestion.data.id) >= 0) {
                return false;
            }

            var $acc = $("<span style='margin: 0px 2px 3px 0px'></span>");
                $acc.addClass("accelerator pull-left preadd");
                $acc.attr({
                    "data-type": type,
                    "data-id": suggestion.data.id,
                    "data-value": suggestion.value,
                });

                $acc.text(suggestion.value);

                $acc.prepend("<span class='icon "+icons[type]+"'></span>");
                $acc.append("<span class='mdi mdi-close remove'></span>");

            $acc.appendTo($form.find(".accelerators"));

            setTimeout(function(){
                $acc.removeClass("preadd");
            }, 50);

            accelerator.push(type+ "-" + suggestion.data.id);

            var accelerator_count = $form.find(".accelerators-count").text();
            $form.find(".accelerators-count").text(parseInt(accelerator_count) + 1);
        }
    });

    // Remove accelerators
    $("body").find(".js-remove-accelerators").off("click").on("click", function() {
        var $accelerators = $("body").find(".accelerators");
        if ($accelerators) {
            $accelerators.html('')
        }
        accelerator = [];

        Reactions.UpdateAcceleratorsCount();
    });

    // Copy accelerators
    $("body").find(".js-copy-accelerators").off("click").on("click", function() {
        var _this = $(this);
        var button = _this.html();
        var cached_accelerators = [];
        $("body").find(".accelerators .accelerator").each(function() {
            var t = {};
                t.type = $(this).data("type");
                t.id = $(this).data("id").toString();
                t.value = $(this).data("value");
            cached_accelerators.push(t);
        });
        localStorage.setItem("rp_cached_accelerators", JSON.stringify(cached_accelerators));
        _this.html(__("Copied"));
        _this.removeClass("js-copy-accelerators");
        _this.addClass("reactions-copyhelper-done");
        att_copy_animation = setTimeout(function (){
            _this.html(button);
            _this.addClass("js-copy-accelerators");
            _this.removeClass("reactions-copyhelper-done");
        }, 1000);
    });

    // Paste accelerators
    $("body").find(".js-insert-accelerators").off("click").on("click", function() {
        var _this = $(this);
        var button = _this.html();

        var cached_accelerators = localStorage.getItem("rp_cached_accelerators");
        if (cached_accelerators === null) {
            cached_accelerators = {};
        } else {
            cached_accelerators = JSON.parse(cached_accelerators);
        }

        $.each(cached_accelerators, function( k, t ) {
            if (accelerator.indexOf(t.type+"-"+t.id) >= 0) {
                // Target already added
            } else {
                var $accelerator = $("<span style='margin: 0px 2px 3px 0px'></span>");
                    $accelerator.addClass("accelerator pull-left preadd");
                    $accelerator.attr({
                        "data-type": t.type,
                        "data-id": t.id,
                        "data-value": t.value,
                    });

                $accelerator.text(t.value);
                $accelerator.prepend("<span class='icon "+icons[t.type]+"'></span>");
                $accelerator.append("<span class='mdi mdi-close remove'></span>");
                $accelerator.appendTo($("body").find(".accelerators"));

                setTimeout(function(){
                    $accelerator.removeClass("preadd");
                }, 50);

                accelerator.push(t.type+ "-" + t.id);
            }
        });

        _this.html(__("Inserted"));
        _this.removeClass("js-insert-accelerators");
        _this.addClass("reactions-copyhelper-done");
        att_insert_animation = setTimeout(function (){
            _this.html(button);
            _this.addClass("js-insert-accelerators");
            _this.removeClass("reactions-copyhelper-done");
        }, 1000);

        Reactions.UpdateAcceleratorsCount();
    });

    // Search auto complete for languages
    $searchinp_languages.devbridgeAutocomplete({
        serviceUrl: $searchinp_languages.data("url"),
        type: "GET",
        dataType: "jsonp",
        minChars: 0,
        deferRequestBy: 200,
        forceFixPosition: true,
        paramName: "q",
        appendTo: ".suggestions-languages",
        params: {
            action: "search-lang",
            type: "language"
        },
        onSearchStart: function() {
            $form.find(".js-search-loading-icon-languages").removeClass('none');
            query = $searchinp_languages.val();
        },
        onSearchComplete: function() {
            $form.find(".js-search-loading-icon-languages").addClass('none');
        },
        transformResult: function(resp) {
            return {
                suggestions: resp.result == 1 ? resp.items : []
            };
        },
        beforeRender: function (container, suggestions) {
            for (var i = 0; i < suggestions.length; i++) {
                var type = "language";
                if (language.indexOf(type + "-" + suggestions[i].data.id) >= 0) {
                    container.find(".autocomplete-suggestion").eq(i).addClass('none')
                }
            }
        },
        formatResult: function(suggestion, currentValue){
            var pattern = '(' + currentValue.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ')';
            var type = "language";

            return (suggestion.data.img ? "<img src='" + suggestion.data.img + "' style='width: 40px;height: 40px;margin: 0 12px 0 0; border-radius: 50%;float:left;border: 1px solid #e6e6e6;'>" : '') + suggestion.value
                        .replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>')
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/&lt;(\/?strong)&gt;/g, '<$1>') +
                    (suggestion.data.sub ? "<span class='sub'>"+suggestion.data.sub+"<span>" : "");
        },
        onSelect: function(suggestion){
            $searchinp_languages.val(query);
            var type = "language";

            if (language.indexOf(type+"-"+suggestion.data.id) >= 0) {
                return false;
            }

            var $lang = $("<span style='margin: 0px 2px 3px 0px'></span>");
                $lang.addClass("language pull-left preadd");
                $lang.attr({
                    "data-type": type,
                    "data-id": suggestion.data.id,
                    "data-value": suggestion.value,
                });

                $lang.text(suggestion.value);
                $lang.append("<span class='mdi mdi-close remove'></span>");

            $lang.appendTo($form.find(".languages"));

            setTimeout(function(){
                $lang.removeClass("preadd");
            }, 50);

            language.push(type+ "-" + suggestion.data.id);

            var languages_count = $form.find(".languages-count").text();
            $form.find(".languages-count").text(parseInt(languages_count) + 1);
        }
    });

    // Change search source
    $form.find(":input[name='type']").on("change", function() {
        var type = $form.find(":input[name='type']:checked").val();

        $searchinp.devbridgeAutocomplete('setOptions', {
            params: {
                action: "search",
                type: type
            }
        });

        $searchinp.trigger("blur");
        setTimeout(function(){
            $searchinp.trigger("focus");
        }, 200)
    });

    // Remove target
    $form.on("click", ".tag .remove", function() {
        var $tag = $(this).parents(".tag");

        var index = target.indexOf($tag.data("type") + "-" + $tag.data("id"));
        if (index >= 0) {
            target.splice(index, 1);
        }

        $tag.remove();

        Reactions.UpdateTargetsCount();
    });

    // Remove languages
    $form.on("click", ".language .remove", function() {
        var $language = $(this).parents(".language");

        var index = language.indexOf($language.data("type") + "-" + $language.data("id"));
        if (index >= 0) {
            language.splice(index, 1);
        }

        $language.remove();

        var languages_count = $form.find(".languages-count").text();
        $form.find(".languages-count").text(parseInt(languages_count) - 1);
    });

    // Remove accelerator
    $form.on("click", ".accelerator .remove", function() {
        var $accelerator = $(this).parents(".accelerator");

        var index = accelerator.indexOf($accelerator.data("type") + "-" + $accelerator.data("id"));
        if (index >= 0) {
            accelerator.splice(index, 1);
        }

        $accelerator.remove();

        var accelerator_count = $form.find(".accelerators-count").text();
        $form.find(".accelerators-count").text(parseInt(accelerator_count) - 1);
    });

    // Daily pause
    $form.find(":input[name='daily-pause']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-daily-pause-range").css("opacity", "1");
            $form.find(".js-daily-pause-range").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-daily-pause-range").css("opacity", "0.25");
            $form.find(".js-daily-pause-range").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Experiments section
    // Fresh stories
    $form.find(":input[name='fresh-stories']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-fresh-stories-range").css("opacity", "1");
            $form.find(".js-fresh-stories-range").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-fresh-stories-range").css("opacity", "0.25");
            $form.find(".js-fresh-stories-range").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Filtration
    $form.find(":input[name='is-filtration-enabled']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-filtration").css("opacity", "1");
            $form.find(".js-filtration").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-filtration").css("opacity", "0.25");
            $form.find(".js-filtration").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Reply to pending DM requests
    $form.find(":input[name='is-reply-dm']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-reply-dm").css("opacity", "1");
            $form.find(".js-reply-dm").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-reply-dm").css("opacity", "0.25");
            $form.find(".js-reply-dm").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Welcome DM
    $form.find(":input[name='is-welcome-dm']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-welcome-dm").css("opacity", "1");
            $form.find(".js-welcome-dm").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-welcome-dm").css("opacity", "0.25");
            $form.find(".js-welcome-dm").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Instagram's Comments Filter Settings
    $form.find(":input[name='is-comment-filter']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-comment-filter").css("opacity", "1");
            $form.find(".js-comment-filter").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-comment-filter").css("opacity", "0.25");
            $form.find(".js-comment-filter").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Metrics Filter Settings
    $form.find(":input[name='is-metrics-filter']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-metrics-filter").css("opacity", "1");
            $form.find(".js-metrics-filter").find(":input").prop("disabled", false);
            $form.find(".js-metrics-filter").find("#FollowersSlider").css("opacity", "1");
            $form.find(".js-metrics-filter").find("#FollowingSlider").css("opacity", "1");
            $form.find(".js-metrics-filter").find("#PostsSlider").css("opacity", "1");
            $form.find(".js-metrics-filter").find("#LastPostedSlider").css("opacity", "1");
            $form.find(".js-metrics-filter").find("#FollowersSlider").attr("disabled", false);
            $form.find(".js-metrics-filter").find("#FollowingSlider").attr("disabled", false);
            $form.find(".js-metrics-filter").find("#PostsSlider").attr("disabled", false);
            $form.find(".js-metrics-filter").find("#LastPostedSlider").attr("disabled", false);
        } else {
            $form.find(".js-metrics-filter").css("opacity", "0.25");
            $form.find(".js-metrics-filter").find(":input").prop("disabled", true);
            $form.find(".js-metrics-filter").find("#FollowersSlider").css("opacity", "0.25");
            $form.find(".js-metrics-filter").find("#FollowingSlider").css("opacity", "0.25");
            $form.find(".js-metrics-filter").find("#PostsSlider").css("opacity", "0.25");
            $form.find(".js-metrics-filter").find("#LastPostedSlider").css("opacity", "0.25");
            $form.find(".js-metrics-filter").find("#FollowersSlider").attr("disabled", true);
            $form.find(".js-metrics-filter").find("#FollowingSlider").attr("disabled", true);
            $form.find(".js-metrics-filter").find("#PostsSlider").attr("disabled", true);
            $form.find(".js-metrics-filter").find("#LastPostedSlider").attr("disabled", true);
        }
    }).trigger("change");

    // Gender by Name Filter Settings
    $form.find(":input[name='is-gender-by-name-filter']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-gender-by-name-filter").css("opacity", "1");
            $form.find(".js-gender-by-name-filter").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-gender-by-name-filter").css("opacity", "0.25");
            $form.find(".js-gender-by-name-filter").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Filter by ID Settings
    $form.find(":input[name='is-filter-by-id']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-filter-by-id").css("opacity", "1");
            $form.find(".js-filter-by-id").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-filter-by-id").css("opacity", "0.25");
            $form.find(".js-filter-by-id").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Username & Full Name Filter Settings (Blacklist)
    $form.find(":input[name='is-username-filter']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-username-filter").css("opacity", "1");
            $form.find(".js-username-filter").find(":input[name='is-username-filter']").prop("disabled", false);
            $form.find(".js-username-filter").find(":input[name='is-username-filter-match-mode']").prop("disabled", false);
        } else {
            $form.find(".js-username-filter").css("opacity", "0.25");
            $form.find(".js-username-filter").find(":input[name='is-username-filter']").prop("disabled", true);
            $form.find(".js-username-filter").find(":input[name='is-username-filter-match-mode']").prop("disabled", true);
        }
    }).trigger("change");

    // Username & Full Name Filter Settings (Whitelist)
    $form.find(":input[name='is-username-filter-whitelist']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-username-filter-whitelist").css("opacity", "1");
            $form.find(".js-username-filter-whitelist").find(":input[name='is-username-filter-whitelist']").prop("disabled", false);
            $form.find(".js-username-filter-whitelist").find(":input[name='is-username-filter-whitelist-match-mode']").prop("disabled", false);
        } else {
            $form.find(".js-username-filter-whitelist").css("opacity", "0.25");
            $form.find(".js-username-filter-whitelist").find(":input[name='is-username-filter-whitelist']").prop("disabled", true);
            $form.find(".js-username-filter-whitelist").find(":input[name='is-username-filter-whitelist-match-mode']").prop("disabled", true);
        }
    }).trigger("change");

    // Telegram notifications
    $form.find(":input[name='is-telegram-analytics']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-telegram-notifications").css("opacity", "1");
            $form.find(".js-telegram-notifications").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-telegram-notifications").css("opacity", "0.25");
            $form.find(".js-telegram-notifications").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Custom delays sections
    $form.find(":input[name='custom-delays']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-custom-delays").css("opacity", "1");
            $form.find(".js-custom-delays").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-custom-delays").css("opacity", "0.25");
            $form.find(".js-custom-delays").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Like section
    $form.find(":input[name='likes']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-likes-settings").css("opacity", "1");
            $form.find(".js-likes-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-likes-settings").css("opacity", "0.25");
            $form.find(".js-likes-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Comment like section
    $form.find(":input[name='c-likes']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-c-likes-settings").css("opacity", "1");
            $form.find(".js-c-likes-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-c-likes-settings").css("opacity", "0.25");
            $form.find(".js-c-likes-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Follow section
    $form.find(":input[name='follow']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-follow-settings").css("opacity", "1");
            $form.find(".js-follow-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-follow-settings").css("opacity", "0.25");
            $form.find(".js-follow-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Follow limit section
    $form.find(":input[name='auto-follow-unfollow']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-follow-limit-settings").css("opacity", "1");
            $form.find(".js-follow-limit-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-follow-limit-settings").css("opacity", "0.25");
            $form.find(".js-follow-limit-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Unfollow section
    $form.find(":input[name='unfollow']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-unfollow-settings").css("opacity", "1");
            $form.find(".js-unfollow-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-unfollow-settings").css("opacity", "0.25");
            $form.find(".js-unfollow-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Comment section
    $form.find(":input[name='comment']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-comment-settings").css("opacity", "1");
            $form.find(".js-comment-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-comment-settings").css("opacity", "0.25");
            $form.find(".js-comment-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // DM section
    $form.find(":input[name='dm']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-dm-settings").css("opacity", "1");
            $form.find(".js-dm-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-dm-settings").css("opacity", "0.25");
            $form.find(".js-dm-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Accelerators sections
    $form.find(":input[name='is-accelerators']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-accelerators").css("opacity", "1");
            $form.find(".js-accelerators").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-accelerators").css("opacity", "0.25");
            $form.find(".js-accelerators").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Like stories section
    $form.find(":input[name='like-stories']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-story-likes-settings").css("opacity", "1");
            $form.find(".js-story-likes-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-story-likes-settings").css("opacity", "0.25");
            $form.find(".js-story-likes-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Activity time section
    $form.find(":input[name='activity-time']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-activity-time").css("opacity", "1");
            $form.find(".js-activity-time").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-activity-time").css("opacity", "0.25");
            $form.find(".js-activity-time").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Asynchronous Settings
    $form.find(":input[name='async-masslooking']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-async-masslooking").css("opacity", "1");
            $form.find(".js-async-masslooking").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-async-masslooking").css("opacity", "0.25");
            $form.find(".js-async-masslooking").find(":input").prop("disabled", true);
        }
    }).trigger("change");
    $form.find(":input[name='async-story-likes']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-async-story-likes").css("opacity", "1");
            $form.find(".js-async-story-likes").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-async-story-likes").css("opacity", "0.25");
            $form.find(".js-async-story-likes").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Close Friends
    $form.find(":input[name='cf-enable']").on("change", function() {
        if ($(this).is(":checked")) {
            $form.find(".js-close-friends").css("opacity", "1");
            $form.find(".js-close-friends").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-close-friends").css("opacity", "0.25");
            $form.find(".js-close-friends").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Autopilot mode
    $form.find(":input[name='autopilot']").on("change", function() {
        var togglers_list = [
            "targeting",
            "story-actions",
            "mass-actions",
            "send-dm",
            "restrict-comments",
            "gender-by-name",
            "filter-by-id",
            "u-fn-filter",
            "reply-pending-dm",
            "filtration",
            "lang-filtration",
            "telegram",
            "pause",
            "custom-delay",
            "accelerators",
            "custom-proxy",
            "activity-time",
            "welcome-dm"
        ];

        var autopilot_enabled = false;
        if ($(this).is(":checked")) {
            autopilot_enabled = true;
        }
        togglers_list.forEach(tgglr => {
            if (autopilot_enabled) {
                $("body").find(".rp-" + tgglr + "-autopilot").hide();
            } else {
                $("body").find(".rp-" + tgglr + "-autopilot").show();;
            }
        });
    }).trigger("change");

    var isMassvoting = function() {
        if (
            $form.find(":input[name='poll']").is(":checked") ||
            $form.find(":input[name='poll-slider']").is(":checked") ||
            $form.find(":input[name='quiz']").is(":checked") ||
            $form.find(":input[name='countdown']").is(":checked") ||
            $form.find(":input[name='answer']").is(":checked")
        ) {
            return true;
        } else {
            return false;
        }
    }

    $form.find(":input[name='poll']").on("change", function() {
        if ($(this).is(":checked") || isMassvoting()) {
            $form.find(".js-massvoting-settings").css("opacity", "1");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-massvoting-settings").css("opacity", "0.25");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");
    $form.find(":input[name='poll-slider']").on("change", function() {
        if ($(this).is(":checked") || isMassvoting()) {
            $form.find(".js-massvoting-settings").css("opacity", "1");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-massvoting-settings").css("opacity", "0.25");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");
    $form.find(":input[name='quiz']").on("change", function() {
        if ($(this).is(":checked") || isMassvoting()) {
            $form.find(".js-massvoting-settings").css("opacity", "1");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-massvoting-settings").css("opacity", "0.25");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");
    $form.find(":input[name='countdown']").on("change", function() {
        if ($(this).is(":checked") || isMassvoting()) {
            $form.find(".js-massvoting-settings").css("opacity", "1");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-massvoting-settings").css("opacity", "0.25");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");
    $form.find(":input[name='answer']").on("change", function() {
        if ($(this).is(":checked") || isMassvoting()) {
            $form.find(".js-massvoting-settings").css("opacity", "1");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-massvoting-settings").css("opacity", "0.25");
            $form.find(".js-massvoting-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");
    $form.find(":input[name='like-stories']").on("change", function() {
        if ($(this).is(":checked") || isMassvoting()) {
            $form.find(".js-like-stories-algorithm").css("opacity", "1");
            $form.find(".js-like-stories-algorithm").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-like-stories-algorithm").css("opacity", "0.25");
            $form.find(".js-like-stories-algorithm").find(":input").prop("disabled", true);
        }
    }).trigger("change");
    $form.find(":input[name='emoji']").on("change", function() {
        if ($(this).is(":checked") || isMassvoting()) {
            $form.find(".js-emoji-settings").css("opacity", "1");
            $form.find(".js-emoji-settings").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-emoji-settings").css("opacity", "0.25");
            $form.find(".js-emoji-settings").find(":input").prop("disabled", true);
        }
    }).trigger("change");
    $form.find(":input[name='is-reset-hl']").on("change", function() {
        if ($(this).is(":checked") || isMassvoting()) {
            $form.find(".js-hard-limits-custom-time").css("opacity", "1");
            $form.find(".js-hard-limits-custom-time").find(":input").prop("disabled", false);
        } else {
            $form.find(".js-hard-limits-custom-time").css("opacity", "0.25");
            $form.find(".js-hard-limits-custom-time").find(":input").prop("disabled", true);
        }
    }).trigger("change");

    // Activity Time Actions
    var randomIntFromInterval = function(min, max) {
        if (min == max) {
            return min;
        }
        if (min > max) {
            t_min = max;
            t_max = min;
            min = t_min;
            max = t_max;
        }
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var at_shuffle = function(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    $form.find(".js-activity-time-all").off("click").on("click", function() {
        var _this = $(this);
        var button = _this.html();
        var at_time = Date.parse("2022-06-01T00:00:00");
        for (let h = 0; h <= 23; h++) {
            for (let d = 1; d <= 7; d++) {
                var dh = new Date((at_time + h * 3600) * 1000);
                var gh = '' + dh.getHours();
                if (gh.length < 2) {
                    gh = '0' + gh;
                }
                var hn = 'day_' + d + '_' + gh;
                var slot = $form.find(":input[name='" + hn + "']");
                if (typeof slot !== 'undefined') {
                    slot.prop("checked", true);
                }
            }
        }
        _this.html(__("Selected"));
        _this.removeClass("js-activity-time-all");
        _this.addClass("reactions-copyhelper-done");
        att_clear_animation = setTimeout(function (){
            _this.html(button);
            _this.addClass("js-activity-time-all");
            _this.removeClass("reactions-copyhelper-done");
        }, 1000);
    });
    $form.find(".js-activity-time-clear").off("click").on("click", function() {
        var _this = $(this);
        var button = _this.html();
        var at_time = Date.parse("2022-06-01T00:00:00");
        for (let h = 0; h <= 23; h++) {
            for (let d = 1; d <= 7; d++) {
                var dh = new Date((at_time + h * 3600) * 1000);
                var gh = '' + dh.getHours();
                if (gh.length < 2) {
                    gh = '0' + gh;
                }
                var hn = 'day_' + d + '_' + gh;
                var slot = $form.find(":input[name='" + hn + "']");
                if (typeof slot !== 'undefined' && slot.is(":checked")) {
                    slot.prop("checked", false);
                }
            }
        }
        _this.html(__("Cleared"));
        _this.removeClass("js-activity-time-clear");
        _this.addClass("reactions-copyhelper-done");
        att_clear_animation = setTimeout(function (){
            _this.html(button);
            _this.addClass("js-activity-time-clear");
            _this.removeClass("reactions-copyhelper-done");
        }, 1000);
    });
    $form.find(".js-activity-time-copy").off("click").on("click", function() {
        var _this = $(this);
        var button = _this.html();
        var at_time = Date.parse("2022-06-01T00:00:00");
        for (let h = 0; h <= 23; h++) {
            for (let d = 1; d <= 7; d++) {
                var dh = new Date((at_time + h * 3600) * 1000);
                var gh = '' + dh.getHours();
                if (gh.length < 2) {
                    gh = '0' + gh;
                }
                var hn = 'day_' + d + '_' + gh;
                var slot = $form.find(":input[name='" + hn + "']");
                if (typeof slot !== 'undefined') {
                    localStorage.setItem("rp_activity_time_" + hn, slot.is(":checked") ? 1 : 2);
                }
            }
        }
        _this.html(__("Copied"));
        _this.removeClass("js-activity-time-copy");
        _this.addClass("reactions-copyhelper-done");
        att_copy_animation = setTimeout(function (){
            _this.html(button);
            _this.addClass("js-activity-time-copy");
            _this.removeClass("reactions-copyhelper-done");
        }, 1000);
    });
    $form.find(".js-activity-time-insert").off("click").on("click", function() {
        var _this = $(this);
        var button = _this.html();
        var at_time = Date.parse("2022-06-01T00:00:00");
        for (let h = 0; h <= 23; h++) {
            for (let d = 1; d <= 7; d++) {
                var dh = new Date((at_time + h * 3600) * 1000);
                var gh = '' + dh.getHours();
                if (gh.length < 2) {
                    gh = '0' + gh;
                }
                var hn = 'day_' + d + '_' + gh;
                var at = localStorage.getItem("rp_activity_time_" + hn);
                if (at == 1 || at == 2) {
                    var slot = $form.find(":input[name='" + hn + "']");
                    if (typeof slot !== 'undefined') {
                        if (at == 1) {
                            slot.prop("checked", true);
                        } else {
                            slot.prop("checked", false);
                        }
                    }
                }
            }
        }
        _this.html(__("Inserted"));
        _this.removeClass("js-activity-time-insert");
        _this.addClass("reactions-copyhelper-done");
        att_insert_animation = setTimeout(function (){
            _this.html(button);
            _this.addClass("js-activity-time-insert");
            _this.removeClass("reactions-copyhelper-done");
        }, 1000);
    });
    $form.find(".js-activity-time-random").off("click").on("click", function() {
        var _this = $(this);
        var button = _this.html();
        var min_h = parseInt($form.find(":input[name='activity-time-min-h']").val()) || 0;
        var max_h = parseInt($form.find(":input[name='activity-time-max-h']").val()) || 0;
        var min_hd = parseInt($form.find(":input[name='activity-time-min-hd']").val()) || 0;
        var max_hd = parseInt($form.find(":input[name='activity-time-max-hd']").val()) || 0;
        var reversed = false;

        if (min_h == 0 && max_h == 0) {
            min_h = 0;
            max_h = 23;
        } else if (max_h == 0) {
            max_h = 23;
        }

        if (min_h < 0) {
            min_h = 0;
        } else if (min_h > 23) {
            min_h = 23;
        }

        if (max_h < 0) {
            max_h = 0;
        } else if (max_h > 23) {
            max_h = 23;
        }

        if (min_h > max_h) {
            reversed = true;
            min_i = 0;
            max_i = max_h + 24 - min_h;
        } else {
            min_i = min_h;
            max_i = max_h;
        }

        if (min_hd == 0 && max_hd == 0 && min_h == 0 && max_h == 0) {
            min_hd = 12;
            max_hd = 15;
        } else if (min_hd == 0 && max_hd == 0) {
            min_hd = 0;
            max_hd = 23;
        } else if (max_hd == 0) {
            max_hd = min_hd;
        }

        if (min_hd > 24) {
            min_hd = 24;
        }

        if (min_hd < 0) {
            min_hd = 0;
        }

        if (max_hd > 24) {
            max_hd = 24;
        }

        if (max_hd < 0) {
            max_hd = 0;
        }

        var th = randomIntFromInterval(min_hd, max_hd);

        for (let d = 1; d <= 7; d++) {
            var th_day = [];
            for (let h = min_i; h <= max_i; h++) {
                if (th > 0) {
                    th--;
                    th_day.push(1);
                } else {
                    th_day.push(0);
                }
            }

            at_shuffle(th_day);

            if (min_h !== 0 || max_h !== 0) {
                var th_day_updated = [];
                var thi = 0;
                for (let h = 0; h <= 23; h++) {
                    if (reversed) {
                        if (min_h <= h && h <= 23 || 0 <= h && h <= max_h) {
                            if (typeof th_day[thi] === 'undefined') {
                                th_day_updated.push(0);
                            } else {
                                th_day_updated.push(th_day[thi]);
                                thi++;
                            }
                        } else {
                            th_day_updated.push(0);
                        }
                    } else {
                        if (min_h <= h && h <= max_h) {
                            if (typeof th_day[thi] === 'undefined') {
                                th_day_updated.push(0);
                            } else {
                                th_day_updated.push(th_day[thi]);
                                thi++;
                            }
                        } else {
                            th_day_updated.push(0);
                        }
                    }
                }
                th_day = th_day_updated;
            }

            for (let h = 0; h <= 23; h++) {
                var gh = h.toString();
                if (gh.length < 2) {
                    gh = '0' + gh;
                }
                var hn = 'day_' + d + '_' + gh;
                var slot = $form.find(":input[name='" + hn + "']");
                if (typeof slot !== 'undefined') {
                    if (th_day[h] == 1) {
                        slot.prop("checked", true);
                    } else {
                        slot.prop("checked", false);
                    }
                }
            }

            th = randomIntFromInterval(min_hd, max_hd);
        }

        _this.html(__("Randomized"));
        _this.removeClass("js-activity-time-random");
        _this.addClass("reactions-copyhelper-done");
        att_rnd_animation = setTimeout(function (){
            _this.html(button);
            _this.addClass("js-activity-time-random");
            _this.removeClass("reactions-copyhelper-done");
        }, 1000);
    });

    // Submit the form
    $form.on("submit", function() {
        $("body").addClass("onprogress");

        var target = [];
        $form.find(".tags .tag").each(function() {
            var t = {};
                t.type = $(this).data("type");
                t.id = $(this).data("id").toString();
                t.value = $(this).data("value");

            target.push(t);
        });

        var language = [];
        $form.find(".languages .language").each(function() {
            var t = {};
                t.type = $(this).data("type");
                t.id = $(this).data("id").toString();
                t.value = $(this).data("value");

            language.push(t);
        });

        var accelerator = [];
        $form.find(".accelerators .accelerator").each(function() {
            var t = {};
                t.type = $(this).data("type");
                t.id = $(this).data("id").toString();
                t.value = $(this).data("value");

            accelerator.push(t);
        });

        var activityTimeReader = function() {
            var at_time = Date.parse("2022-06-01T00:00:00");
            var result = {};
            for (let h = 0; h <= 23; h++) {
                for (let d = 1; d <= 7; d++) {
                    var dh = new Date((at_time + h * 3600) * 1000);
                    var gh = '' + dh.getHours();
                    if (gh.length < 2) {
                        gh = '0' + gh;
                    }
                    var hn = 'day_' + d + '_' + gh;
                    result[hn] = $form.find(":input[name='" + hn + "']").is(":checked") ? 1 : 0;
                }
            }
            return result;
        }

        $.ajax({
            url: $form.attr("action"),
            type: $form.attr("method"),
            dataType: 'jsonp',
            data: {
                action: "save",
                target: JSON.stringify(target),

                // Autopilot
                autopilot: $form.find(":input[name='autopilot']").is(":checked") ? 1 : 0,

                // Experiments
                fresh_stories: $form.find(":input[name='fresh-stories']").is(":checked") ? 1 : 0,
                fresh_stories_range: $form.find(":input[name='fresh-stories-range']").val(),

                // Reply to pending DM requests
                is_reply_dm: $form.find(":input[name='is-reply-dm']").is(":checked") ? 1 : 0,
                dm_message: $form.find(":input[name='dm-message']").val(),
                is_not_mute_dm: $form.find(":input[name='is-not-mute-dm']").is(":checked") ? 1 : 0,
                is_only_text_dm: $form.find(":input[name='is-only-text-dm']").is(":checked") ? 1 : 0,
                is_not_like_dm: $form.find(":input[name='is-not-like-dm']").is(":checked") ? 1 : 0,
                dm_to_general: $form.find(":input[name='dm-to-general']").is(":checked") ? 1 : 0,

                // Welcome DM
                is_welcome_dm: $form.find(":input[name='is-welcome-dm']").is(":checked") ? 1 : 0,
                welcome_dm_mute: $form.find(":input[name='welcome-dm-mute']").is(":checked") ? 1 : 0,
                welcome_dm_only_text: $form.find(":input[name='welcome-dm-only-text']").is(":checked") ? 1 : 0,
                welcome_dm_move: $form.find(":input[name='welcome-dm-move']").is(":checked") ? 1 : 0,
                welcome_dm_speed: $form.find(":input[name='welcome-dm-speed']").val(),

                // Stories reactions
                is_poll: $form.find(":input[name='poll']").is(":checked") ? 1 : 0,
                is_poll_slider: $form.find(":input[name='poll-slider']").is(":checked") ? 1 : 0,
                is_quiz: $form.find(":input[name='quiz']").is(":checked") ? 1 : 0,
                is_answer: $form.find(":input[name='answer']").is(":checked") ? 1 : 0,
                is_countdown: $form.find(":input[name='countdown']").is(":checked") ? 1 : 0,
                is_masslooking: $form.find(":input[name='masslooking']").is(":checked") ? 1 : 0,
                is_story_likes: $form.find(":input[name='like-stories']").is(":checked") ? 1 : 0,
                like_stories_algorithm: $form.find(":input[name='like-stories-algorithm']").val(),
                like_stories_type: $form.find(":input[name='like-stories-type']").val(),
                is_emoji: $form.find(":input[name='is-emoji']").is(":checked") ? 1 : 0,
                emojis: $form.find(":input[name='emojis']").val(),
                emoji_speed: $form.find(":input[name='emoji-speed']").val(),

                // Activity interval
                massvoting_interval: $form.find(":input[name='massvoting-interval']").val(),
                like_stories_interval: $form.find(":input[name='like-stories-interval']").val(),
                comment_interval: $form.find(":input[name='comment-interval']").val(),
                like_comments_interval: $form.find(":input[name='like-comments-interval']").val(),
                like_comments_speed: $form.find(":input[name='like-comments-speed']").val(),
                dm_interval: $form.find(":input[name='dm-interval']").val(),

                // Language filtration
                language: JSON.stringify(language),
                language_detection_notices: $form.find(":input[name='language-detection-notices']").is(":checked") ? 1 : 0,
                language_skip_accounts: $form.find(":input[name='language-skip-accounts']").is(":checked") ? 1 : 0,
                language_web_data: $form.find(":input[name='language-web-data']").is(":checked") ? 1 : 0,

                // Actions settings
                prorate_algorithm: $form.find(":input[name='prorate-algorithm']").is(":checked") ? 1 : 0,

                // Comments
                is_comment: $form.find(":input[name='comment']").is(":checked") ? 1 : 0,
                comment_speed: $form.find(":input[name='comment-speed']").val(),
                comment_text: $form.find(":input[name='comment-text']").val(),

                // Country Filter
                country_filter_whitelist: $form.find(":input[name='country-filter-whitelist']").val(),
                country_filter_blacklist: $form.find(":input[name='country-filter-blacklist']").val(),

                // Close Friends
                cf_enable: $form.find(":input[name='cf-enable']").is(":checked") ? 1 : 0,
                cf_followers: $form.find(":input[name='cf-followers']").is(":checked") ? 1 : 0,
                cf_ids: $form.find(":input[name='cf-ids']").is(":checked") ? 1 : 0,
                cf_action: $form.find(":input[name='cf-action']").val(),
                cf_number: $form.find(":input[name='cf-number']").val(),
                cf_speed: $form.find(":input[name='cf-speed']").val(),
                cf_whitelist: $form.find(":input[name='cf-whitelist']").val(),
                cf_skip_suggested: $form.find(":input[name='cf-skip-suggested']").is(":checked") ? 1 : 0,
                cf_new_followers: $form.find(":input[name='cf-new-followers']").is(":checked") ? 1 : 0,

                // Metrics Filter
                is_metrics_filter: $form.find(":input[name='is-metrics-filter']").is(":checked") ? 1 : 0,
                followers_min: $form.find(":input[name='followers-min']").val(),
                followers_max: $form.find(":input[name='followers-max']").val(),
                followings_min: $form.find(":input[name='followings-min']").val(),
                followings_max: $form.find(":input[name='followings-max']").val(),
                posts_min: $form.find(":input[name='posts-min']").val(),
                posts_max: $form.find(":input[name='posts-max']").val(),
                last_posted_min: $form.find(":input[name='last-posted-min']").val(),
                last_posted_max: $form.find(":input[name='last-posted-max']").val(),

                // DM
                is_dm: $form.find(":input[name='dm']").is(":checked") ? 1 : 0,
                dm_speed: $form.find(":input[name='dm-speed']").val(),
                dm_text: $form.find(":input[name='dm-text']").val(),
                dm_mute: $form.find(":input[name='dm-mute']").is(":checked") ? 1 : 0,
                dm_move_to_general: $form.find(":input[name='dm-move-to-general']").is(":checked") ? 1 : 0,
                dm_only_text: $form.find(":input[name='dm-only-text']").is(":checked") ? 1 : 0,
                dm_skip_following: $form.find(":input[name='dm-skip-following']").is(":checked") ? 1 : 0,
                dm_skip_following_request: $form.find(":input[name='dm-skip-following-request']").is(":checked") ? 1 : 0,
                dm_remove_from_list: $form.find(":input[name='dm-remove-from-list']").is(":checked") ? 1 : 0,
                dm_list: $form.find(":input[name='dm-list']").val(),

                is_likes: $form.find(":input[name='likes']").is(":checked") ? 1 : 0,
                likes_per_user: $form.find(":input[name='likes-per-user']").val(),
                is_likes_timeline: $form.find(":input[name='likes-timeline']").is(":checked") ? 1 : 0,
                likes_speed: $form.find(":input[name='likes-speed']").val(),

                is_c_likes: $form.find(":input[name='c-likes']").is(":checked") ? 1 : 0,
                c_likes_speed: $form.find(":input[name='c-likes-speed']").val(),

                is_follow: $form.find(":input[name='follow']").is(":checked") ? 1 : 0,
                follow_speed: $form.find(":input[name='follow-speed']").val(),
                follow_limit: $form.find(":input[name='follow-limit']").val(),
                mute_type: $form.find(":input[name='mute-type']").val(),

                is_unfollow: $form.find(":input[name='unfollow']").is(":checked") ? 1 : 0,
                unfollow_speed: $form.find(":input[name='unfollow-speed']").val(),

                unfollow_interval: $form.find(":input[name='unfollow-interval']").val(),

                auto_follow_unfollow: $form.find(":input[name='auto-follow-unfollow']").is(":checked") ? 1 : 0,

                unfollow_skip_followers: $form.find(":input[name='unfollow-skip-followers']").is(":checked") ? 1 : 0,
                unfollow_non_followers:  $form.find(":input[name='unfollow-non-followers']").is(":checked") ? 1 : 0,
                unfollow_whitelist: $form.find(":input[name='unfollow-whitelist']").val(),

                // Telegram Notifications
                is_telegram_analytics: $form.find(":input[name='is-telegram-analytics']").is(":checked") ? 1 : 0,
                is_telegram_errors: $form.find(":input[name='is-telegram-errors']").is(":checked") ? 1 : 0,
                tg_chat_id: $form.find(":input[name='tg-chat-id']").val(),
                delay_telegram: $form.find(":input[name='delay-telegram']").val(),

                // Accelerators
                is_accelerators: $form.find(":input[name='is-accelerators']").is(":checked") ? 1 : 0,
                accelerator: JSON.stringify(accelerator),

                // Custom delays option
                custom_delays: $form.find(":input[name='custom-delays']").is(":checked") ? 1 : 0,
                sc_delay_vote_poll: $form.find(":input[name='sc-delay-vote-poll']").val(),
                sc_delay_get_hll: $form.find(":input[name='sc-delay-get-hll']").val(),
                sc_delay_get_likers: $form.find(":input[name='sc-delay-get-likers']").val(),
                sc_delay_slider: $form.find(":input[name='sc-delay-slider']").val(),
                sc_delay_quiz: $form.find(":input[name='sc-delay-quiz']").val(),
                sc_delay_answer: $form.find(":input[name='sc-delay-answer']").val(),
                sc_delay_countdown: $form.find(":input[name='sc-delay-countdown']").val(),
                sc_delay_masslooking: $form.find(":input[name='sc-delay-masslooking']").val(),
                sc_delay_story_likes: $form.find(":input[name='sc-delay-story-likes']").val(),
                masslooking_batch_limit: $form.find(":input[name='masslooking-batch-limit']").val(),
                detector_batch_limit: $form.find(":input[name='detector-batch-limit']").val(),
                interact_delay: $form.find(":input[name='interact-delay']").val(),
                limit_of_posts: $form.find(":input[name='limit-of-posts']").val(),
                sc_delay_send_dm_reply: $form.find(":input[name='sc-delay-send-dm-reply']").val(),

                sc_delay_get_followers: $form.find(":input[name='sc-delay-get-followers']").val(),
                sc_delay_get_followers_web: $form.find(":input[name='sc-delay-get-followers-web']").val(),
                sc_delay_get_explore_feed: $form.find(":input[name='sc-delay-get-explore-feed']").val(),
                sc_delay_get_reels_media_feed: $form.find(":input[name='sc-delay-get-reels-media-feed']").val(),
                sc_delay_get_reels: $form.find(":input[name='sc-delay-get-reels']").val(),
                sc_delay_get_about_account_info: $form.find(":input[name='sc-delay-get-about-account-info']").val(),
                sc_delay_get_recent_activity_inbox: $form.find(":input[name='sc-delay-recent-activity-inbox']").val(),

                // Activity Time Settings
                activity_time: $form.find(":input[name='activity-time']").is(":checked") ? 1 : 0,
                activity_time_settings: JSON.stringify(activityTimeReader()),

                // Expiration
                expiration: $form.find(":input[name='expiration']").is(":checked") ? 1 : 0,
                expiration_date: $form.find(":input[name='expiration-date']").val(),

                // Reset hard limit counters at midnight
                is_reset_hl: $form.find(":input[name='is-reset-hl']").is(":checked") ? 1 : 0,

                // MQTT
                mqtt: $form.find(":input[name='mqtt']").is(":checked") ? 1 : 0,

                // Open AI (Chat GPT) Settings
                openai_key: $form.find(":input[name='openai-key']").val(),
                openai_model: $form.find(":input[name='openai-model']").val(),
                openai_prompt: $form.find(":input[name='openai-prompt']").val(),
                openai_max_tokens: $form.find(":input[name='openai-max-tokens']").val(),
                openai_temperature: $form.find(":input[name='openai-temperature']").val(),
                openai_max_contacts: $form.find(":input[name='openai-max-contacts']").val(),
                openai_max_interval: $form.find(":input[name='openai-max-interval']").val(),
                openai_whisper: $form.find(":input[name='openai-whisper']").is(":checked") ? 1 : 0,
                openai_technical: $form.find(":input[name='openai-technical']").is(":checked") ? 1 : 0,

                // Open AI (Chat GPT) Actions
                openai_dm: $form.find(":input[name='openai-dm']").is(":checked") ? 1 : 0,

                // Asynchronous Settings
                async_masslooking: $form.find(":input[name='async-masslooking']").is(":checked") ? 1 : 0,
                async_masslooking_batch: $form.find(":input[name='async-masslooking-batch']").val(),
                async_story_likes: $form.find(":input[name='async-story-likes']").is(":checked") ? 1 : 0,
                async_story_likes_batch: $form.find(":input[name='async-story-likes-batch']").val(),

                // Debug mode
                debug_mode: $form.find(":input[name='debug-mode']").is(":checked") ? 1 : 0,

                // Additional Settings
                reset_data: $form.find(":input[name='reset-data']").is(":checked") ? 1 : 0,
                keywords_cleaner: $form.find(":input[name='keywords-cleaner']").is(":checked") ? 1 : 0,
                use_get_likers: $form.find(":input[name='use-get-likers']").is(":checked") ? 1 : 0,

                // Source Tracking
                source_tracking: $form.find(":input[name='source-tracking']").is(":checked") ? 1 : 0,
                track_only_new_followers: $form.find(":input[name='track-only-new-followers']").is(":checked") ? 1 : 0,
                flush_lf_counters: $form.find(":input[name='flush-lf-counters']").is(":checked") ? 1 : 0,

                // Target Quality Tracking
                target_quality_tracking: $form.find(":input[name='target-quality-tracking']").is(":checked") ? 1 : 0,
                target_quality_tracking_flush: $form.find(":input[name='target-quality-tracking-flush']").is(":checked") ? 1 : 0,

                // Manual Comments Filter
                is_comment_filter: $form.find(":input[name='is-comment-filter']").is(":checked") ? 1 : 0,
                comment_filter: $form.find(":input[name='comment-filter']").val(),

                // Gender by Name Filter Settings
                is_gender_by_name_filter: $form.find(":input[name='is-gender-by-name-filter']").is(":checked") ? 1 : 0,
                gender_by_name_choice: $form.find(":input[name='gender-by-name-choice']").val(),
                is_gender_skip_mode: $form.find(":input[name='is-gender-skip-mode']").is(":checked") ? 1 : 0,
                gender_by_name_custom_list: $form.find(":input[name='gender-by-name-custom-list']").val(),

                // Filter by ID Settings
                is_filter_by_id: $form.find(":input[name='is-filter-by-id']").is(":checked") ? 1 : 0,
                filter_by_id: $form.find(":input[name='filter-by-id']").val(),

                // Username & Full Name Filter Settings (Blacklist)
                is_username_filter: $form.find(":input[name='is-username-filter']").is(":checked") ? 1 : 0,
                username_filter: $form.find(":input[name='username-filter']").val(),
                is_username_filter_match_mode: $form.find(":input[name='is-username-filter-match-mode']").is(":checked") ? 1 : 0,

                // Username & Full Name Filter Settings (Whitelist)
                is_username_filter_whitelist: $form.find(":input[name='is-username-filter-whitelist']").is(":checked") ? 1 : 0,
                username_filter_whitelist: $form.find(":input[name='username-filter-whitelist']").val(),
                is_username_filter_whitelist_match_mode: $form.find(":input[name='is-username-filter-whitelist-match-mode']").is(":checked") ? 1 : 0,

                // Custom proxy feature
                custom_proxy: $form.find(":input[name='custom-proxy']").val(),
                is_active: $form.find(":input[name='is_active']").val(),

                // Selectize
                custom_labels: $form.find(":input[name='custom-labels']").val(),

                // Daily limits
                sc_limit_get_reels:     $form.find(":input[name='sc-limit-get-reels']").val(),
                sc_limit_get_feed:      $form.find(":input[name='sc-limit-get-feed']").val(),
                sc_limit_following:     $form.find(":input[name='sc-limit-following']").val(),
                sc_limit_followers:     $form.find(":input[name='sc-limit-followers']").val(),
                sc_limit_hashtag:       $form.find(":input[name='sc-limit-hashtag']").val(),
                sc_limit_location:      $form.find(":input[name='sc-limit-location']").val(),
                sc_limit_explore:       $form.find(":input[name='sc-limit-explore']").val(),
                sc_limit_answer_story:  $form.find(":input[name='sc-limit-answer-story']").val(),
                sc_limit_story_likes:   $form.find(":input[name='sc-limit-story-likes']").val(),
                sc_limit_masslooking:   $form.find(":input[name='sc-limit-masslooking']").val(),
                sc_limit_emoji:         $form.find(":input[name='sc-limit-emoji']").val(),
                sc_smart_increase_min:  $form.find(":input[name='sc-smart-increase-min']").val(),
                sc_smart_increase_max:  $form.find(":input[name='sc-smart-increase-max']").val(),
            },
            error: function() {
                $("body").removeClass("onprogress");
                NextPost.DisplayFormResult($form, "error", __("Oops! An error occured. Please try again later!"));
            },

            success: function(resp) {
                var active_schedule = $(".aside-list-item.active");

                // Wesley Start Mod
                if (resp.notice_hour_count) {
                    $("body .active-alert").removeClass("none");
                } else {
                    $("body .active-alert").addClass("none");
                }
                // Wesley End Mod

                if (resp.new_cls_array && $.isArray(resp.new_cls_array)) {
                    resp.new_cls_array.forEach(el => {
                        if ($("body").find('.js-rp-bulk-filter[data-custom-label="' + el + '"]').length > 0) {
                            // Already added
                        } else {
                            $("body").find(".rp-custom-labels-filters").append('<a class="js-rp-bulk-filter rp-bulk-btn mr-5 mb-5" href="javascript:void(0)" data-custom-label="' + el + '"><span class="rp-bulk-btntext">' + el + '</span></a>');
                        }
                    });
                    // Check removed labels
                    $("body").find(".js-rp-bulk-filter").each(function () {
                        var label = $(this).data("custom-label");
                        if ($.inArray(label, resp.new_cls_array) === -1) {
                            $(this).remove();
                            $("body").find('.reactions-custom-label[data-custom-label="' + label + '"]').remove();
                        }
                    });
                } else {
                    $("body").find(".js-rp-bulk-filter").remove();
                    $("body").find(".reactions-custom-label").remove();
                }

                if (resp.cl_array && $.isArray(resp.cl_array)) {
                    resp.cl_array.forEach(el => {
                        if (active_schedule.find('.reactions-custom-label[data-custom-label="' + el + '"]').length > 0) {
                            // Already added
                        } else {
                            active_schedule.find(".reactions-task-custom-labels").append('<span class="mt-10 mr-5 mb-5 d-inline-block reactions-custom-label" data-custom-label="' + el + '">' + el + '</span>');
                        }
                    });
                    // Check removed labels for task
                    active_schedule.find(".reactions-custom-label").each(function () {
                        var label = $(this).data("custom-label");
                        if ($.inArray(label, resp.cl_array) === -1) {
                            $(this).remove();
                        }
                    });
                } else {
                    active_schedule.find(".reactions-custom-label").remove();
                }

                $("body").find(".gender-list-counter").replaceWith("<span class='gender-list-counter'>" + resp.gender_list_counter + "</span>");

                if (resp.result == 1) {
                    NextPost.DisplayFormResult($form, "success", resp.msg);

                    if (resp.is_paused) {
                        active_schedule.find(".status").replaceWith("<span class='status color-paused'><span class='mdi mdi-pause-circle mr-2'></span>" + __('Paused') + "</span>");
                    } else if (resp.is_active) {
                        active_schedule.find(".status").replaceWith("<span class='status color-green'><span class='mdi mdi-circle mr-2'></span>" + __('Active') + "</span>");

                        // Wesley Start Mod
                        $form.find(".rp-status-option").replaceWith("<select class='input none rp-status-option' name='is_active'><option value='0' selected></option></select>");
                        $form.find(".rp-status").replaceWith("<input class='fluid button btn-red rp-status' type='submit' value='" + __('Stop Tasks') + "'>");
                        // Wesley End Mod
                    } else {
                        active_schedule.find(".status").replaceWith("<span class='status'><span class='mdi mdi-circle-outline mr-2'></span>" + __('Inactive') + "</span>");

                        // Wesley Start Mod
                        $form.find(".rp-status-option").replaceWith("<select class='input none rp-status-option' name='is_active'><option value='1' selected></option></select>");
                        $form.find(".rp-status").replaceWith("<input class='fluid button btn-green rp-status' type='submit' value='" + __('Start Tasks') + "'>");
                        // Wesley End Mod
                    }

                    if (resp.is_active) {
                        $form.attr("data-is-active-before", resp.is_active);
                    }

                    if (resp.dm_list_users_count) {
                        $form.find(".dm-list-counter").replaceWith("<span class='dm-list-counter'>" + resp.dm_list_users_count + "</span>");
                    } else {
                        $form.find(".dm-list-counter").replaceWith("<span class='dm-list-counter'>0</span>");
                    }

                    if (resp.expiration_label) {
                        active_schedule.find(".expiration-text").html(resp.expiration_label);
                        if (resp.expired) {
                            active_schedule.find(".expiration-label").removeClass("color-blue");
                            active_schedule.find(".expiration-label").addClass("color-expired");
                        } else {
                            active_schedule.find(".expiration-label").removeClass("color-expired");
                            active_schedule.find(".expiration-label").addClass("color-blue");
                        }
                    }
                } else {
                    NextPost.DisplayFormResult($form, "error", resp.msg);
                }

                $("body").removeClass("onprogress");
            }
        });

        return false;
    });

    var forceStop = false;
    var seconds = 7;

    var target_list_popup = $("#target-list-popup");
    target_list_popup.find(".js-reactions-target-list").off("click").on("click", function() {
        if ($(this).data("id") == $(".aside-list-item.active").data("id")) {
            var url = $(this).data("url");
            var target_list_textarea = target_list_popup.find("textarea.target-list");
            var targets_list = target_list_textarea.val();

            target_list_textarea.val("");

            var targets_type = "people_likers";
            if ($form.find("input[name='type'][value='people_followers']").is(':checked')) {
                targets_type = "people_followers";
            } else  if ($form.find("input[name='type'][value='people_followings']").is(':checked')) {
                targets_type = "people_followings";
            } else  if ($form.find("input[name='type'][value='people']").is(':checked')) {
                targets_type = "people";
            } else if ($form.find("input[name='type'][value='people_likers']").is(':checked')) {
                targets_type = "people_likers";
            } else if ($form.find("input[name='type'][value='hashtag']").is(':checked')) {
                targets_type = "hashtag";
            } else if ($form.find("input[name='type'][value='hashtag_likers']").is(':checked')) {
                targets_type = "hashtag_likers";
            } else if ($form.find("input[name='type'][value='user_id_list']").is(':checked')) {
                targets_type = "user_id_list";
            } else if ($form.find("input[name='type'][value='keyword']").is(':checked')) {
                targets_type = "keyword";
            } else if ($form.find("input[name='type'][value='keyword_likers']").is(':checked')) {
                targets_type = "keyword_likers";
            } else if ($form.find("input[name='type'][value='keyword_reels']").is(':checked')) {
                targets_type = "keyword_reels";
            } else if ($form.find("input[name='type'][value='keyword_reels_likers']").is(':checked')) {
                targets_type = "keyword_reels_likers";
            }

            $("body").addClass("onprogress");

            forceStop = false;

            if (targets_type == "people_likers" || targets_type == "people_followers" || targets_type == "people_followings" | targets_type == "people") {
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'jsonp',
                    data: {
                        action: "load-targets",
                        targets_type: targets_type,
                        targets_list: targets_list
                    },
                    error: function() {
                        $("body").removeClass("onprogress");
                        NextPost.Alert({
                            title:  __("Oops..."),
                            content:  __("An error occured. Please try again later!"),
                            confirmText: __("Close")
                        });
                    },
                    success: function(resp) {
                        if (resp.result == 1) {
                            $("body").removeClass("onprogress");
                            target_list_popup.modal('hide');

                            if (resp.count && resp.count > 0) {
                                var total_count = resp.count;
                                var process_targets_popup = $("#process-targets-popup");
                                var progress_bar = process_targets_popup.find(".progress-bar.progress");
                                var procentage = 0;

                                process_targets_popup.modal('show');
                                progress_bar.css({width:"0%"});

                                targetsProcessingLoop(url, total_count, targets_type);

                                $("body").find("#process-targets-popup").find(".close").off("click").on("click", function() {
                                    forceStop = true;
                                });
                            }
                        } else {
                            $("body").removeClass("onprogress");
                            NextPost.Alert({
                                title: __("Oops..."),
                                content: resp.msg,
                                confirmText: __("Close"),
                                confirm: function() {
                                    if (resp.redirect) {
                                        window.location.href = resp.redirect;
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'jsonp',
                    data: {
                        action: "insert-targets",
                        targets_type: targets_type,
                        targets_list: targets_list
                    },
                    error: function() {
                        $("body").removeClass("onprogress");
                        NextPost.Alert({
                            title:  __("Oops..."),
                            content:  __("An error occured. Please try again later!"),
                            confirmText: __("Close")
                        });
                    },
                    success: function(resp) {
                        if (resp.result == 1) {
                            $("body").removeClass("onprogress");
                            target_list_popup.modal('hide');

                            if (resp.filtered_targets) {
                                var filtered_targets = $.parseJSON(resp.filtered_targets);

                                $.each(filtered_targets,function(key,value){
                                    if (target.indexOf(value.type + "-" + value.id) >= 0) {
                                        if (value.type == "user_id_list") {
                                            $("body").find(".tag[data-id='user_id_list']").find(".remove").click();
                                        }
                                    }

                                    if (target.indexOf(value.type + "-" + value.id) >= 0) {
                                        // Target already added
                                    } else {
                                        var $tag = $("<span style='margin: 0px 2px 3px 0px'></span>");
                                            $tag.addClass("tag pull-left preadd");
                                            $tag.attr({
                                                "data-type": value.type,
                                                "data-id": value.id,
                                                "data-value": value.value,
                                            });

                                            $addit_text = "";
                                            if (value.type == "people_followings") {
                                                $addit_text = __(" (followings)");
                                            } else if (value.type == "people_followers") {
                                                $addit_text = __(" (followers)");
                                            } else if (value.type == "people_likers") {
                                                $addit_text = __(" (likers)");
                                            } else if (value.type == "hashtag_likers") {
                                                $addit_text = __(" (likers)");
                                            } else if (value.type == "location_likers") {
                                                $addit_text = __(" (likers)");
                                            } else if (value.type == "explore_likers") {
                                                $addit_text = __(" (likers)");
                                            } else if (value.type == "keyword_likers") {
                                                $addit_text = __(" (likers)");
                                            } else if (value.type == "keyword_reels_likers") {
                                                $addit_text = __(" (reel likers)");
                                            }

                                            if (value.type == "user_id_list") {
                                                $tag.text(__("Custom ID's") + " · " + numberWithSpaces(value.value) + " " + __("user(s)"));
                                            } else {
                                                $tag.text(value.value + $addit_text);
                                            }

                                            $tag.prepend("<span class='icon "+icons[value.type]+"'></span>");
                                            $tag.append("<span class='mdi mdi-close remove'></span>");

                                        $tag.appendTo($form.find(".tags"));

                                        setTimeout(function(){
                                            $tag.removeClass("preadd");
                                        }, 50);

                                        target.push(value.type + "-" + value.id);

                                        Reactions.UpdateTargetsCount();
                                    }
                                });
                            }
                        } else {
                            $("body").removeClass("onprogress");

                            NextPost.Alert({
                                title: __("Oops..."),
                                content: resp.msg,
                                confirmText: __("Close"),

                                confirm: function() {
                                    if (resp.redirect) {
                                        window.location.href = resp.redirect;
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    $("body").find(".js-remove-all-targets").off("click").on("click", function() {
        var $tags = $form.find(".tags");
        if ($tags) {
            $tags.html('')
        }
        target = [];
        Reactions.UpdateTargetsCount();
    });

    $("body").find(".js-copy-all-targets").off("click").on("click", function() {
        var _this = $(this);
        var button = _this.html();
        var cached_target = [];
        $form.find(".tags .tag").each(function() {
            var t = {};
                t.type = $(this).data("type");
                t.id = $(this).data("id").toString();
                t.value = $(this).data("value");

            if (t.type !== "user_id_list") {
                cached_target.push(t);
            }
        });
        localStorage.setItem("rp_cached_targets", JSON.stringify(cached_target));
        _this.html(__("Copied"));
        _this.removeClass("js-copy-all-targets");
        _this.addClass("reactions-copyhelper-done");
        att_copy_animation = setTimeout(function (){
            _this.html(button);
            _this.addClass("js-copy-all-targets");
            _this.removeClass("reactions-copyhelper-done");
        }, 1000);
    });

    $("body").find(".js-insert-all-targets").off("click").on("click", function() {
        var _this = $(this);
        var button = _this.html();

        var cached_targets = localStorage.getItem("rp_cached_targets");
        if (cached_targets === null) {
            cached_targets = {};
        } else {
            cached_targets = JSON.parse(cached_targets);
        }

        $.each(cached_targets, function( k, t ) {
            if (target.indexOf(t.type+"-"+t.id) >= 0) {
                // Target already added
            } else {
                var $tag = $("<span style='margin: 0px 2px 3px 0px'></span>");
                    $tag.addClass("tag pull-left preadd");
                    $tag.attr({
                        "data-type": t.type,
                        "data-id": t.id,
                        "data-value": t.value,
                    });

                $addit_text = "";
                if (t.type == "people_followings") {
                    $addit_text = __(" (followings)");
                } else if (t.type == "people_followers") {
                    $addit_text = __(" (followers)");
                } else if (t.type == "people_likers") {
                    $addit_text = __(" (likers)");
                } else if (t.type == "hashtag_likers") {
                    $addit_text = __(" (likers)");
                } else if (t.type == "location_likers") {
                    $addit_text = __(" (likers)");
                } else if (t.type == "explore_likers") {
                    $addit_text = __(" (likers)");
                } else if (t.type == "keyword_likers") {
                    $addit_text = __(" (likers)");
                } else if (t.type == "keyword_reels_likers") {
                    $addit_text = __(" (reel likers)");
                }

                $tag.text(t.value + $addit_text);

                $tag.prepend("<span class='icon "+icons[t.type]+"'></span>");
                $tag.append("<span class='mdi mdi-close remove'></span>");

                $tag.appendTo($form.find(".tags"));

                setTimeout(function(){
                    $tag.removeClass("preadd");
                }, 50);

                target.push(t.type+ "-" + t.id);

                Reactions.UpdateTargetsCount();
            }
        });

        _this.html(__("Inserted"));
        _this.removeClass("js-insert-all-targets");
        _this.addClass("reactions-copyhelper-done");
        att_insert_animation = setTimeout(function (){
            _this.html(button);
            _this.addClass("js-insert-all-targets");
            _this.removeClass("reactions-copyhelper-done");
        }, 1000);
    });

    $("body").find(".js-disable-accelerator").off("click").on("click", function() {
        var active_schedule = $(".aside-list-item.active");
        $.ajax({
            url: active_schedule.data("url"),
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "disable_accelerator",
                id: active_schedule.data("id")
            },
            error: function() {
                NextPost.Alert({
                    title: __("Oops..."),
                    content: resp.msg ? resp.msg : __("An error occured. Please try again later!"),
                    confirmText: __("Close"),

                    confirm: function() {
                        if (resp.redirect) {
                            window.location.href = resp.redirect;
                        }
                    }
                });
            },
            success: function(resp) {
                if (resp.result == 1) {
                    window.location.href = resp.redirect;
                }
            }
        });
    });

    $("body").off("click", ".js-copy-task-settings").on("click", ".js-copy-task-settings", function() {
        var _this = $(this);
        var copy_button = _this.html();
        var url = _this.data("url");

        if ($(this).data("id") == $(".aside-list-item.active").data("id")) {
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "copy-task-settings"
                },
                error: function() {
                    specialAlertResponse();
                },
                success: function(resp) {
                    if (resp.result !== 1) {
                        specialAlertResponse(resp);
                    } else {
                        if (resp.messages || resp.target || resp.data) {
                            var copyhelper = document.createElement("input");
                            document.body.appendChild(copyhelper);
                            copyhelper.value = JSON.stringify({
                                "messages": resp.messages,
                                "target": resp.target,
                                "data": resp.data,
                                "expiration_date": resp.expiration_date
                            });
                            copyhelper.select();
                            document.execCommand("copy");
                            document.body.removeChild(copyhelper);
                            _this.html(__("Settings copied to clipboard"));
                            _this.removeClass("js-copy-task-settings");
                            _this.addClass("reactions-copyhelper-done");
                            data_copied_animation_done = setTimeout(function (){
                                _this.html(copy_button);
                                _this.addClass("js-copy-task-settings");
                                _this.removeClass("reactions-copyhelper-done");
                            }, 2000);
                        } else {
                            _this.html(__("Task settings is empty"));
                            _this.removeClass("js-copy-task-settings");
                            _this.addClass("reactions-copyhelper-error");
                            data_copied_animation_error = setTimeout(function (){
                                _this.html(copy_button);
                                _this.addClass("js-copy-task-settings");
                                _this.removeClass("reactions-copyhelper-error");
                            }, 2000);
                        }
                    }
                }
            });
        }
    });

    var importCloseFriendsProcess = function(_this, action, max_id = 0) {
        $.ajax({
            url: _this.attr("data-url"),
            type: "POST",
            dataType: 'jsonp',
            data: {
                action: action
            },
            error: function() {
                $.alert({
                    title: __("Oops..."),
                    content: __("An error occured. Please try again later!"),
                    theme: 'modern',
                    buttons: {
                        confirm: {
                            text: __("Try Again"),
                            btnClass: "small button btn-red",
                            keys: ['enter'],
                            action: function() {
                                importCloseFriendsProcess(_this, action, max_id);
                            }
                        },
                        cancel: {
                            text: __("Close"),
                            btnClass: "small button button--red--outline",
                            keys: ['esc'],
                            action: function() {
                                _this.removeClass("disabled");
                                $("body").find(".cf-whitelist-load-progress").addClass("none");
                            }
                        }
                    },
                    draggable: false,
                    closeIcon: true,
                    closeIcon: function() {
                        _this.removeClass("disabled");
                        $("body").find(".cf-whitelist-load-progress").addClass("none");
                    },
                    icon: 'icon-close',
                    type: 'red'
                });
            },
            success: function(resp) {
                if (resp.result == 1) {
                    if (resp.members && $.isArray(resp.members)) {
                        var cf_counter = parseInt($("body").find(".cf-list-counter").html());
                        resp.members.forEach(m => {
                            if ($('#cf-whitelist').val().indexOf(m) >= 0) {
                                // Already added
                            } else {
                                $('#cf-whitelist').val($('#cf-whitelist').val()+m+'\n');
                                cf_counter++;
                            };
                        });
                        $("body").find(".cf-list-counter").replaceWith("<span class='cf-list-counter'>" + cf_counter + "</span>");
                        if (resp.max_id) {
                            setTimeout(function (){
                                importCloseFriendsProcess(_this, action, resp.max_id);
                            }, 5000);
                        } else {
                            _this.removeClass("disabled");
                            $("body").find(".cf-whitelist-load-progress").addClass("none");
                        }
                    } else {
                        _this.removeClass("disabled");
                        $("body").find(".cf-whitelist-load-progress").addClass("none");
                    }
                } else {
                    $.alert({
                        title: __("Oops..."),
                        content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
                        theme: 'modern',
                        buttons: {
                            confirm: {
                                text: __("Try Again"),
                                btnClass: "small button btn-red",
                                keys: ['enter'],
                                action: function() {
                                    importCloseFriendsProcess(_this, action, max_id);
                                }
                            },
                            cancel: {
                                text: __("Close"),
                                btnClass: "small button button--red--outline",
                                keys: ['esc'],
                                action: function() {
                                    _this.removeClass("disabled");
                                    $("body").find(".cf-whitelist-load-progress").addClass("none");
                                }
                            }
                        },
                        draggable: false,
                        closeIcon: true,
                        closeIcon: function() {
                            _this.removeClass("disabled");
                            $("body").find(".cf-whitelist-load-progress").addClass("none");
                        },
                        icon: 'icon-close',
                        type: 'red'
                    });
                }
            }
        });
    }

    $("body").off("click", ".js-cf-load").on("click", ".js-cf-load", function() {
        var _this = $(this);
        if (!_this.hasClass('disabled')) {
            _this.addClass("disabled");
            $("body").find(".cf-whitelist-load-progress").removeClass("none");
            var action = "cf-load";
            importCloseFriendsProcess(_this, action);
        }
    });

    var insert_data_popup = $("#insert-data-popup");
    insert_data_popup.off("click", "a.js-insert-task-settings").on("click", "a.js-insert-task-settings", function() {
        if ($(this).data("id") == $(".aside-list-item.active").data("id")) {
            var url = $(this).data("url");
            var insert_data_textarea = insert_data_popup.find("textarea.insert-data");
            var insert_data = insert_data_textarea.val();

            if (insert_data) {
                var insert = JSON.parse(insert_data);
                if (insert.messages || insert.target || insert.data) {
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'jsonp',
                        data: {
                            action: "insert-task-settings",
                            insert: insert
                        },
                        error: function() {
                            specialAlertResponse();
                        },
                        success: function(resp) {
                            if (resp.result !== 1) {
                                specialAlertResponse(resp);
                            } else {
                                insert_data_popup.modal('hide');
                                window.location.href = resp.redirect;
                            }
                        }
                    });
                } else {
                    specialAlertResponse({
                        msg: __("Clipboard data is invalid")
                    });
                }
            } else {
                specialAlertResponse({
                    msg: __("Clipboard is empty")
                });
            }
        }
    });

    var randomIntFromInterval = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    var getTimedString = function(seconds) {
        return __("Safety delay, %s seconds left...").replace("%s", seconds);
    }

    var targetsProcessingLoop = function(url, total_count, targets_type) {
        if (!forceStop) {
            targetsProcessing(url, total_count, targets_type, function(count) {
                if (count > 0) {
                    var process_targets_popup = $("#process-targets-popup");
                    const tpInterval = setInterval(function () {
                        seconds--;
                        if (seconds < 0) {
                            seconds = 0
                        }
                        if (seconds > 0) {
                            process_targets_popup.find(".rp-progress-msg").html(getTimedString(seconds));
                        }
                        if (process_targets_popup.hasClass("show")) {
                            if (seconds == 0) {
                                clearInterval(tpInterval);
                                targetsProcessingLoop(url, total_count, targets_type);
                            }
                        } else {
                            clearInterval(tpInterval);
                        }
                    }, 1000);
                }
            });
        }
    }

    var targetsProcessing = function(url, total_count, targets_type, callback) {
        var process_targets_popup = $("#process-targets-popup");
        var progress_bar = process_targets_popup.find(".progress-bar.progress");
        var procentage = 0;

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "process-targets",
                targets_type: targets_type
            },
            error: function() {
                process_targets_popup.modal('hide');

                $.alert({
                    title: __("Oops..."),
                    content: __("An error occured. Please try again later!"),
                    theme: 'modern',
                    buttons: {
                        confirm: {
                            text: __("Continue"),
                            btnClass: "small button btn-red",
                            keys: ['enter'],
                            action: function() {
                                process_targets_popup.modal('show');
                                callback(total_count);
                            }
                        },
                        cancel: {
                            text: __("Close"),
                            btnClass: "small button button--red--outline",
                            keys: ['esc'],
                            action: function() {
                                callback(0);
                            }
                        }
                    },
                    draggable: false,
                    closeIcon: true,
                    closeIcon: function() {
                        callback(0);
                    },
                    icon: 'icon-close',
                    type: resp ? (resp.type ? resp.type : 'red') : 'red'
                });
            },
            success: function(resp) {
                if (resp.result == 1) {
                    count = resp.count;
                    if (resp.progress_msg) {
                        process_targets_popup.find(".rp-progress-msg").html(resp.progress_msg);
                    }
                    procentage = ((total_count-count)/total_count)*100;
                    if (procentage > 0) {
                        if (resp.detected && typeof resp.detected.type != 'undefined' && typeof resp.detected.id != 'undefined') {
                            if (target.indexOf(resp.detected.type + "-" + resp.detected.id) >= 0) {
                                if (resp.detected.type == "user_id_list") {
                                    $("body").find(".tag[data-id='user_id_list']").find(".remove").click();
                                }
                            }

                            if (target.indexOf(resp.detected.type + "-" + resp.detected.id) >= 0) {
                                // Target already added
                            } else {
                                var $tag = $("<span style='margin: 0px 2px 3px 0px'></span>");
                                $tag.addClass("tag pull-left preadd");
                                $tag.attr({
                                    "data-type": resp.detected.type,
                                    "data-id": resp.detected.id,
                                    "data-value": resp.detected.value,
                                });

                                $addit_text = "";
                                if (resp.detected.type == "people_followings") {
                                    $addit_text = __(" (followings)");
                                } else if (resp.detected.type == "people_likers") {
                                    $addit_text = __(" (likers)");
                                } else if (resp.detected.type == "people_followers") {
                                    $addit_text = __(" (followers)");
                                } else if (resp.detected.type == "hashtag_likers") {
                                    $addit_text = __(" (likers)");
                                } else if (resp.detected.type == "location_likers") {
                                    $addit_text = __(" (likers)");
                                } else if (resp.detected.type == "explore_likers") {
                                    $addit_text = __(" (likers)");
                                } else if (resp.detected.type == "keyword_likers") {
                                    $addit_text = __(" (likers)");
                                } else if (resp.detected.type == "keyword_reels_likers") {
                                    $addit_text = __(" (reel likers)");
                                }

                                if (resp.detected.type == "user_id_list") {
                                    $tag.text(__("Custom ID's") + " · " + numberWithSpaces(resp.detected.value) + " " + __("user(s)"));
                                } else {
                                    $tag.text(resp.detected.value + $addit_text);
                                }

                                $tag.prepend("<span class='icon "+icons[resp.detected.type]+"'></span>");

                                if (resp.can_er && (resp.detected.type == "people_followings" || resp.detected.type == "people_followers" || resp.detected.type == "people_likers" || resp.detected.type == "people")) {
                                    $tag.append(" · <span class='js-check-er-info color-orange' data-name='" + resp.detected.value + "'>" + __("Check ERpost") + "</span><a class='ml-3 mdi mdi-link' style='color: white;' href='https://www.instagram.com/" + resp.detected.value + "' target='_blank'></a><span class='mdi mdi-close remove'></span>");
                                } else {
                                    $tag.append("<span class='mdi mdi-close remove'></span>");
                                }

                                $tag.appendTo($form.find(".tags"));

                                setTimeout(function(){
                                    $tag.removeClass("preadd");
                                }, 50);

                                target.push(resp.detected.type + "-" + resp.detected.id);

                                Reactions.UpdateTargetsCount();

                                Reactions.erInfo();
                            }
                        }
                        progress_bar.css({width:procentage.toFixed(2)+"%"});
                        if (count == 0) {
                            setTimeout(function(){
                                process_targets_popup.modal('hide');
                            }, 1000);
                        }

                        if (resp.wait_seconds) {
                            seconds = parseInt(resp.wait_seconds);
                        } else {
                            seconds = 0;
                        }

                        callback(count);
                    } else {
                        process_targets_popup.modal('hide');
                        callback(0);
                    }
                } else {
                    process_targets_popup.modal('hide');

                    $.alert({
                        title: __("Oops..."),
                        content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
                        theme: 'modern',
                        buttons: {
                            confirm: {
                                text: __("Continue"),
                                btnClass: "small button btn-red",
                                keys: ['enter'],
                                action: function() {
                                    process_targets_popup.modal('show');
                                    callback(total_count);
                                }
                            },
                            cancel: {
                                text: __("Close"),
                                btnClass: "small button button--red--outline",
                                keys: ['esc'],
                                action: function() {
                                    callback(0);
                                }
                            }
                        },
                        draggable: false,
                        closeIcon: true,
                        closeIcon: function() {
                            callback(0);
                        },
                        icon: 'icon-close',
                        type: resp ? (resp.type ? resp.type : 'red') : 'red'
                    });
                }
            }
        });
    }

    var validate_timer;
    var validate_xhr;

    // Validate OpenAI (Chat GPT) API Key
    $form.find(":input[name=openai-key]").on("paste input change", function() {
        if (validate_xhr) {
            // Abort previous ajax request
            validate_xhr.abort();
        }

        if (validate_timer) {
            clearTimeout(validate_timer);
        }

        var duration = 1000;
        validate_timer = setTimeout(function(){
            $.ajax({
                url: $form.attr("action"),
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "openai",
                    openai_key: $form.find(":input[name=openai-key]").val(),
                    openai_technical: $form.find(":input[name=openai-technical]").is(":checked") ? 1 : 0
                },
                success: function(resp) {
                    if (resp.openai) {
                        $.ajax({
                            url: $form.attr("action"),
                            dataType: 'html',
                            success: function(resp) {
                                $resp = $(resp);
                                if ($resp.find(".js-openai-status").length == 1) {
                                    $(".js-openai-status").html($resp.find(".js-openai-status").html());
                                } else {
                                    $(".js-openai-status").html("");
                                }
                            }
                        });
                    }
                }
            });
        }, duration);
    });
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function number_styler(n) {
    var result = 0;
    var m = __("m");
    if (n !== null && n !== '') {
        if (n < 10000000) {
            result = numberWithSpaces(n);
        } else {
            n = n / 1000000;
            result = n.toFixed(2) + m;
        }
    }
    return result;
}

Reactions.RealtimeEnable = function() {
    $(window).on("load", function () {
        var rp_erl = $("body").find(":input[name='enable-realtime-logs']");
        var active_id = $("#reactions-pro").data("account-id");
        Reactions.ConsoleLog("active_id = " + active_id);
        if (rp_erl.length > 0) {
            var state = localStorage.getItem("rp-realtime-logs-" + active_id);
            if (state == 1) {
                rp_erl.prop("checked", true);
            } else if (state == 0) {
                rp_erl.prop("checked", false);
            }
            rp_erl.off("click").on("click", function () {
                var id = $(this).data("account-id");
                Reactions.ConsoleLog("active_id (on click) = " + id);
                if ($(this).is(":checked")) {
                    localStorage.setItem("rp-realtime-logs-" + id, 1);
                } else {
                    localStorage.setItem("rp-realtime-logs-" + id, 0);
                }
            });
        } else {
            localStorage.setItem("rp-realtime-logs-" + active_id, 0);
        }
    });
}

var user_active = true;
$(window).on("focus blur touchstart click mouseenter", function(event) {
    if (event.type == "blur") {
        user_active = false;
        Reactions.ConsoleLog("User inactive.");
    } else {
        user_active = true;
    }
});

Reactions.StatusUpdater = function(resp, react) {
    if (resp.length > 0) {
        if ($(react).length > 0) {
            Reactions.ConsoleLog("Status updater v1 for " + react + " called.");
            $(react).replaceWith(resp);
        } else {
            Reactions.ConsoleLog("Status updater v2 for " + react + " called.");
            if ($(".reactions-statuses").last().length > 0) {
                $(".reactions-statuses").last().after(resp);
            } else {
                $(".react-log-list").append(resp);
            }
        }
    } else {
        if ($(react).length > 0) {
            $(react).remove();
        }
    }
}

Reactions.RealtimeLogs = function(value, callback) {
    var active_id = $(".aside-list-item.active").data("id");
    var state = localStorage.getItem("rp-realtime-logs-" + active_id);
    if (state == 1 && user_active) {
        var log_list = $(".react-log-list");
        var active_schedule = $(".aside-list-item.active");
        var log_list_item = $(".react-log-list-item");
        var no_data = $(".no-data");

        if (log_list && typeof active_schedule !== 'undefined' && typeof active_schedule.data("url") !== 'undefined' && typeof active_schedule.data("id") !== 'undefined') {
            Reactions.ConsoleLog("Trying to update logs.");

            $.ajax({
                url: active_schedule.data("url") + "/" + active_schedule.data("id") + "/log",
                dataType: 'html',
                error: function() {
                    Reactions.ConsoleLog("Request for retrieving new logs failed.");
                    callback("1");
                },
                success: function(Response){
                    Reactions.ConsoleLog("Request for retrieving new logs is successfull.");

                    var resp = $(Response);
                    var log_list_resp = resp.find(".react-log-list");
                    var log_list_items_resp = resp.find(".react-log-list-item");

                    // Update all reactions statuses if it's possible

                    var rs_schedule = resp.find(".react-next-schedule");
                    var rs_status = resp.find(".realtime-status");
                    var rs_prorate = resp.find(".reaction-statuses-prorate");
                    var rs_actions = resp.find(".reaction-statuses-actions");
                    var rs_speed = resp.find(".reaction-statuses-actions-speed");
                    var rs_connection = resp.find(".reaction-statuses-connection");
                    var rs_reels = resp.find(".reaction-statuses-reels");
                    var rs_feed = resp.find(".reaction-statuses-feed");
                    var rs_following = resp.find(".reaction-statuses-following");
                    var rs_followers = resp.find(".reaction-statuses-followers");
                    var rs_hashtag = resp.find(".reaction-statuses-hashtag");
                    var rs_location = resp.find(".reaction-statuses-location");
                    var rs_explore = resp.find(".reaction-statuses-explore");
                    var rs_answer_story = resp.find(".reaction-statuses-answer-story");
                    var rs_story_likes = resp.find(".reaction-statuses-story-likes");
                    var rs_emoji = resp.find(".reaction-statuses-emoji");
                    var rs_masslooking = resp.find(".reaction-statuses-masslooking");
                    var rs_smart_increase = resp.find(".reaction-statuses-smart-increase");

                    Reactions.StatusUpdater(rs_schedule, ".react-next-schedule");
                    Reactions.StatusUpdater(rs_status, ".realtime-status");
                    Reactions.StatusUpdater(rs_prorate, ".reaction-statuses-prorate");
                    Reactions.StatusUpdater(rs_actions, ".reaction-statuses-actions");
                    Reactions.StatusUpdater(rs_speed, ".reaction-statuses-actions-speed");
                    Reactions.StatusUpdater(rs_connection, ".reaction-statuses-connection");
                    Reactions.StatusUpdater(rs_reels, ".reaction-statuses-reels");
                    Reactions.StatusUpdater(rs_feed, ".reaction-statuses-feed");
                    Reactions.StatusUpdater(rs_following, ".reaction-statuses-following");
                    Reactions.StatusUpdater(rs_followers, ".reaction-statuses-followers");
                    Reactions.StatusUpdater(rs_hashtag, ".reaction-statuses-hashtag");
                    Reactions.StatusUpdater(rs_location, ".reaction-statuses-location");
                    Reactions.StatusUpdater(rs_explore, ".reaction-statuses-explore");
                    Reactions.StatusUpdater(rs_answer_story, ".reaction-statuses-answer-story");
                    Reactions.StatusUpdater(rs_story_likes, ".reaction-statuses-story-likes");
                    Reactions.StatusUpdater(rs_emoji, ".reaction-statuses-emoji");
                    Reactions.StatusUpdater(rs_masslooking, ".reaction-statuses-masslooking");
                    Reactions.StatusUpdater(rs_smart_increase, ".reaction-statuses-smart-increase");

                    if (log_list_resp.length > 0) {
                        if (no_data.length > 0) {
                            // No data
                            Reactions.ConsoleLog("No logs on the page, full replace.");
                            no_data.replaceWith(log_list_resp.html());
                            callback("1");
                        } else {
                            if (log_list_item.length > 0) {
                                if (log_list_items_resp.length > 0) {
                                    // Add new logs
                                    Reactions.ConsoleLog("Analyzing " + log_list_items_resp.length + " logs from response.");
                                    var valid_log_list_items = [];
                                    $(log_list_items_resp.get().reverse()).each(function (i, v) {
                                        // Remove already added logs from response
                                        var log_id = $(this).attr("data-log-id");
                                        if ($("body").find(".react-log-list-item[data-log-id='" + log_id + "']").length > 0) {
                                            // Log already added
                                        } else {
                                            valid_log_list_items.push($(this));
                                        }
                                        if (log_list_items_resp.length === i+1) {
                                            if (valid_log_list_items > 0) {
                                                callback("1");
                                            } else {
                                                Reactions.ConsoleLog(valid_log_list_items.length + " logs is new.");
                                                Reactions.ConsoleLog("Trying to add new logs.");
                                                Reactions.RealtimeLogLoop(valid_log_list_items, function() {
                                                    callback("1");
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    callback("1");
                                }
                            } else {
                                // Empty logs
                                Reactions.ConsoleLog("Empty logs on the page, full replace.");
                                log_list.replaceWith(log_list_resp.html());
                                callback("1");
                            }
                        }
                    } else {
                        Reactions.ConsoleLog("No logs in response.");
                        callback("1");
                    }
                }
            });
        } else {
            callback("1");
        }
    } else {
        Reactions.ConsoleLog("Realtime logs stopped.");
        callback("1");
    }
}

Reactions.RealtimeLogsAnimation = function(items, callback) {
    if (items.length > 0) {
        var delay = 0;
        var wait = 1000;
        items.forEach(function (v, i) {
            var log_id = v.attr("data-log-id");
            var pid = v.attr("data-pid");
            var account_id = v.attr("data-account-id");
            if ($("body").find(".react-log-list-item[data-log-id='" + log_id + "']").length > 0 || log_id == localStorage.getItem("rp_last_log_id")) {
                // Log note already added
            } else {
                localStorage.setItem("rp_last_log_id", log_id);
                setTimeout(function() {
                    if ($("body").find(".react-log-list-item[data-log-id='" + log_id + "']").length == 0) {
                        Reactions.ConsoleLog("New log is " + log_id + " for PID " + pid  + ".");
                        var active_id = $(".aside-list-item.active").attr("data-id");
                        var state = localStorage.getItem("rp-realtime-logs-" + active_id);
                        if (account_id == active_id && state == 1) {
                            $(".react-log-list-item").first().before(v);
                        }
                        if ($(".react-log-list-item").length > 300) {
                            var removed_log_id = $(".react-log-list-item").last().attr("data-log-id");
                            $(".react-log-list-item").last().remove();
                            Reactions.ConsoleLog("Log " + removed_log_id + " removed.");
                        }
                        $(".react-log-list-item").first().css('backgroundColor','rgba(59, 124, 255, 0.25);');
                        $(".react-log-list-item").first().animate({backgroundColor: 'transparent'}, 1000);
                        lazyLoadInstance.update();
                        if (v.length === i) {
                            callback("1");
                        }
                    }
                }, delay);
                delay = delay + wait;
            }
        });
    } else {
        callback("1");
    }
}

Reactions.RealtimeLogLoop = function(items, callback) {
    Reactions.RealtimeLogsAnimation(items, function(type) {
        Reactions.ConsoleLog("Realtime log animation completed.");
        callback("1");
    });
}

Reactions.RealtimeLoop = function(value) {
    Reactions.ConsoleLog("Realtime loop.");
    Reactions.RealtimeLogs(value, function() {
        setTimeout(function(){
            Reactions.RealtimeLoop();
        }, 7000);
    });
}

Reactions.ConsoleLog = function(value) {
    // DEBUG USAGE ONLY
    // var now = new Date(Date.now());
    // var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    // console.log(formatted + ": " + value);
    return true;
}

var rx = new RegExp("(reactions\/[0-9]+\/log?)$");
if (rx.test(window.location.href)) {
    window.onload = function() {
        // console.log("Realtime updates started for page:" + window.location.href);
        Reactions.ConsoleLog("Realtime updates started for page:" + window.location.href);
        Reactions.RealtimeLoop();
        Reactions.RealtimeEnable();
        Reactions.Selectize();
    }
}

/**
 * Reactions Index
 */
Reactions.Index = function() {
    $(document).ajaxComplete(function(event, xhr, settings) {
        var rx = new RegExp("(reactions\/[0-9]+(\/|\/log)?)$");
        if (rx.test(settings.url)) {
            Reactions.ScheduleForm();
            Reactions.DownloadActions();
            Reactions.targetScrappers();
            Reactions.Togglers();
            Reactions.RealtimeEnable();
            Reactions.Selectize();
            Reactions.erInfo();
            Reactions.MessagesForm();
            NextPost.DatePicker();
            NextPost.Tooltip();
            lazyLoadInstance.update();

            Reactions.UpdateData($(".aside-list-item.active"));
        }
    });

    // Remove message
    $("body").on("click", ".remove-message-btn", function() {
        $(this).parents(".reactions-message-list-item").remove();

        // Update counter
        var total_answers = $("body").find(".js-total-answers-count");
        var total_answers_count = total_answers.find(".answers-count");
        var counter = Number.parseInt(total_answers_count.text());
        total_answers_count.html(counter > 0 ? counter - 1 : 0);
    })

    window.loadmore.success = function($item) {
        NextPost.Tooltip();
        Reactions.TaskActions();
        Reactions.Togglers();
        Reactions.DownloadActions();
        lazyLoadInstance.update();
    }
}

/**
 * Update selected schedule estimated speed and counters
 */
Reactions.UpdateData = function(active_schedule) {
    $.ajax({
        url: active_schedule.data("url"),
        type: 'POST',
        dataType: 'jsonp',
        data: {
            action: "update_data",
            id: active_schedule.data("id")
        },
        success: function(resp) {
            if (resp.result == 1 && resp.estimated_speed && !resp.is_accelerator) {
                active_schedule.find(".speed .speed-value").replaceWith("<span class='speed-value'>" + resp.estimated_speed + "</span>");
            }
            if (resp.result == 1 && !resp.is_accelerator) {
                if (resp.is_paused) {
                    active_schedule.find(".status").replaceWith("<span class='status color-paused'><span class='mdi mdi-pause-circle mr-2'></span>" + __('Paused') + (resp.next_action ? resp.next_action : "") + "</span>");
                } else if (resp.is_active) {
                    active_schedule.find(".status").replaceWith("<span class='status color-green'><span class='mdi mdi-circle mr-2'></span>" + __('Active') + "</span>");
                } else {
                    active_schedule.find(".status").replaceWith("<span class='status'><span class='mdi mdi-circle-outline mr-2'></span>" + __('Inactive') + "</span>");
                }
                if (resp.follow_counter) {
                    active_schedule.find(".follow-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.follow_counter + "</span>");
                }
                if (resp.like_counter) {
                    active_schedule.find(".like-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.like_counter + "</span>");
                }
                if (resp.unfollow_counter) {
                    active_schedule.find(".unfollow-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.unfollow_counter + "</span>");
                }
                if (resp.comment_counter) {
                    active_schedule.find(".comment-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.comment_counter + "</span>");
                }
                if (resp.dm_counter) {
                    active_schedule.find(".dm-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.dm_counter + "</span>");
                }
                if (resp.welcome_dm_counter) {
                    active_schedule.find(".welcome-dm-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.welcome_dm_counter + "</span>");
                }
                if (resp.dm_complete_procentage) {
                    active_schedule.find(".dm-complete-procentage .speed-value").replaceWith("<span class='speed-value color-green'>" + resp.dm_complete_procentager + "</span>");
                }
                if (resp.login_flow_timestamp) {
                    active_schedule.find(".login-flow-timestamp .login-flow-timestamp-value").replaceWith("<span class='login-flow-timestamp-value'>" + resp.login_flow_timestamp + "</span>");
                }
                if (resp.ra_page) {
                    active_schedule.find(".ra-page-count").val(resp.ra_page);
                }
                if (resp.acc_count) {
                    active_schedule.find(".acc-count").val(resp.acc_count);
                }
                if (resp.expiration_label) {
                    active_schedule.find(".expiration-text").html(resp.expiration_label);
                    if (resp.expired) {
                        active_schedule.find(".expiration-label").removeClass("color-blue");
                        active_schedule.find(".expiration-label").addClass("color-expired");
                    } else {
                        active_schedule.find(".expiration-label").removeClass("color-expired");
                        active_schedule.find(".expiration-label").addClass("color-blue");
                    }
                }
                if (resp.result == 1) {
                    Reactions.CreateSlider("FollowersSlider", resp.followers_min, resp.followers_max, 0, 10000000);
                    Reactions.CreateSlider("FollowingSlider", resp.followings_min, resp.followings_max, 0, 7500);
                    Reactions.CreateSlider("PostsSlider", resp.posts_min, resp.posts_max, 0, 10000);
                    Reactions.CreateSlider("LastPostedSlider", resp.last_posted_min, resp.last_posted_max, 0, 3000);
                }
            }
        }
    });
}

/**
 * Reactions Metrics Filter
 */
Reactions.CreateSlider = function(
    _sliderName,
    startMin,
    startMax,
    rangeMin,
    rangeMax)
{
    function setTooltipInputWidth(input) {
        input.style.width = ((input.value.length + 2) * 8) + 'px';
    }

    function makeTT(i, slider, className) {
        var tooltip = document.createElement('div'),
            input = document.createElement('input');

        // Set class name
        input.className = className + ' np-reactions-pro-tooltip';
        input.name = className;

        // Add the input to the tooltip
        tooltip.className = 'noUi-tooltip';
        tooltip.appendChild(input);

        // On change, set the slider
        input.addEventListener('change', function() {
            var values = [null, null];
            values[i] = this.value;
            slider.noUiSlider.set(values);
            setTooltipInputWidth(this);
        });

        input.addEventListener('focus', function() {
            $(slider.tooltipInputs[0]).closest('.noUi-origin')[0].style.zIndex = 4;
            $(slider.tooltipInputs[1]).closest('.noUi-origin')[0].style.zIndex = 4;
            $(this).closest('.noUi-origin')[0].style.zIndex = 5;
        })

        // Find the lower/upper slider handle and insert the tooltip
        slider.querySelector(i ? '.noUi-handle-upper' : '.noUi-handle-lower').appendChild(tooltip);

        return input;
    }

    var currentSlider = document.getElementById(_sliderName);
    var _inputNameOne = "followers-min";
    var _inputNameTwo = "followers-max";
    if (currentSlider) {
        // Create slider
        if (_sliderName == "FollowersSlider") {
            noUiSlider.create(currentSlider, {
                start: [startMin, startMax],
                range: {
                    'min': [rangeMin],
                    '5%' : [10],
                    '20%': [100],
                    '50%': [5000],
                    '70%': [10000],
                    '80%': [100000],
                    '90%': [1000000],
                    'max': [rangeMax],
                },
                pips: {
                    mode: 'range',
                    density: 10,
                    stepped: true
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0,
                    thousands: ' '
                })
            });
        } else if (_sliderName == "FollowingSlider") {
            noUiSlider.create(currentSlider, {
                start: [startMin, startMax],
                range: {
                    'min': [rangeMin],
                    '5%' : [10],
                    '20%': [100],
                    'max': [rangeMax],
                },
                pips: {
                    mode: 'range',
                    density: 5
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0,
                    thousands: ' '
                })
            });
            var _inputNameOne = "followings-min";
            var _inputNameTwo = "followings-max";
        } else if (_sliderName == "PostsSlider") {
            noUiSlider.create(currentSlider, {
                start: [startMin, startMax],
                range: {
                    'min': [rangeMin],
                    '5%' : [10],
                    '20%': [100],
                    'max': [rangeMax],
                },
                pips: {
                    mode: 'range',
                    density: 5
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0,
                    thousands: ' '
                })
            });
            var _inputNameOne = "posts-min";
            var _inputNameTwo = "posts-max";
        } else if (_sliderName == "LastPostedSlider") {
            noUiSlider.create(currentSlider, {
                start: [startMin, startMax],
                range: {
                    'min': [rangeMin],
                    '5%' : [10],
                    '20%': [100],
                    'max': [rangeMax],
                },
                pips: {
                    mode: 'range',
                    density: 5
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0,
                    thousands: ' '
                })
            });
            var _inputNameOne = "last-posted-min";
            var _inputNameTwo = "last-posted-max";
        }

        // An 0/1 indexed array of input elements
        currentSlider.tooltipInputs = [makeTT(0, currentSlider, _inputNameOne), makeTT(1, currentSlider, _inputNameTwo)];

        // When the slider changes, update the tooltip
        currentSlider.noUiSlider.on('update', function(values, handle) {
            this.target.tooltipInputs[handle].value = values[handle];
            setTooltipInputWidth(this.target.tooltipInputs[handle]);
        });
    }
}

/**
 * Reactions Restart
 */
Reactions.Restart = function() {
    $("body").on("click", "a.js-reactions-restart", function() {
        var id = $(this).data("id");
        var url = $(this).data("url");

        $ms_section = $(".reactions-section");
        $ms_section.addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "restart",
                id: id
            },

            error: function() {
                $ms_section.removeClass("onprogress");

                NextPost.Alert({
                    title: __("Oops..."),
                    content:  __("An error occured. Please try again later!"),
                    confirmText: __("Close")
                });
            },

            success: function(resp) {
                if (resp.result == 1) {
                    $ms_section.find(".tm-reactions-task[data-id='" + id + "']").find(".status").replaceWith("<span class='status color-green'><span class='mdi mdi-circle mr-2'></span>" + __('Active') + "</span>");
                    $ms_section.find(".tm-reactions-pid[data-id='" + id + "']").find(".status").replaceWith("<span class='status color-basic'><span class='mdi mdi-clock mr-2'></span>" + __('Scheduled') + "</span>");
                } else {
                    NextPost.Alert({
                        title: __("Oops..."),
                        content: resp.msg,
                        confirmText: __("Close")
                    });
                }

                $ms_section.removeClass("onprogress");
            }
        });
    });

    $("body").on("click", ".js-reactions-bulk-restart,.js-reactions-bulk-stop", function() {
        var url = $(this).data("url");

        $ms_section = $(".reactions-section");
        $ms_section.addClass("onprogress");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: $(this).is(".js-reactions-bulk-restart") ? "bulk-restart" : "bulk-stop",
            },

            error: function() {
                $ms_section.removeClass("onprogress");

                NextPost.Alert({
                    title: __("Oops..."),
                    content:  __("An error occured. Please try again later!"),
                    confirmText: __("Close")
                });
            },

            success: function(resp) {
                if (resp.result == 1) {
                    $ms_section.removeClass("onprogress");

                    if (resp.redirect) {
                        window.location.href = resp.redirect;
                    }
                } else {
                    $ms_section.removeClass("onprogress");

                    NextPost.Alert({
                        title: __("Oops..."),
                        content: resp.msg,
                        confirmText: __("Close")
                    });
                }
            }
        });
    });
}

Reactions.RestartByUser = function() {
    $("body").on("click", "a.js-restart-reactions-by-user", function() {
        $("body").addClass("onprogress");

        var id = $(this).data("id");
        var url = $(this).data("url");
        var active_schedule = $(".aside-list-item.active");
        var $form = $(".js-reactions-schedule-form");
        var accelerator = [];
        var language = [];
        var target = [];

        $form.find(".tags .tag").each(function() {
            var t = {};
                t.type = $(this).data("type");
                t.id = $(this).data("id").toString();
                t.value = $(this).data("value");

            target.push(t);
        });

        $form.find(".accelerators .accelerator").each(function() {
            var t = {};
                t.type = $(this).data("type");
                t.id = $(this).data("id").toString();
                t.value = $(this).data("value");

            accelerator.push(t);
        });

        $form.find(".languages .language").each(function() {
            var t = {};
                t.type = $(this).data("type");
                t.id = $(this).data("id").toString();
                t.value = $(this).data("value");

            language.push(t);
        });

        var activityTimeReader = function() {
            var at_time = Date.parse("2022-06-01T00:00:00");
            var result = {};
            for (let h = 0; h <= 23; h++) {
                for (let d = 1; d <= 7; d++) {
                    var dh = new Date((at_time + h * 3600) * 1000);
                    var gh = '' + dh.getHours();
                    if (gh.length < 2) {
                        gh = '0' + gh;
                    }
                    var hn = 'day_' + d + '_' + gh;
                    result[hn] = $form.find(":input[name='" + hn + "']").is(":checked") ? 1 : 0;
                }
            }
            return result;
        }

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "restart",
                target: JSON.stringify(target),
                id: id,

                // Autopilot
                autopilot: $form.find(":input[name='autopilot']").is(":checked") ? 1 : 0,

                // Reply to pending DM requests
                is_reply_dm: $form.find(":input[name='is-reply-dm']").is(":checked") ? 1 : 0,
                dm_message: $form.find(":input[name='dm-message']").val(),
                is_not_mute_dm: $form.find(":input[name='is-not-mute-dm']").is(":checked") ? 1 : 0,
                is_only_text_dm: $form.find(":input[name='is-only-text-dm']").is(":checked") ? 1 : 0,
                is_not_like_dm: $form.find(":input[name='is-not-like-dm']").is(":checked") ? 1 : 0,
                dm_to_general: $form.find(":input[name='dm-to-general']").is(":checked") ? 1 : 0,

                // Welcome DM
                is_welcome_dm: $form.find(":input[name='is-welcome-dm']").is(":checked") ? 1 : 0,
                welcome_dm_mute: $form.find(":input[name='welcome-dm-mute']").is(":checked") ? 1 : 0,
                welcome_dm_only_text: $form.find(":input[name='welcome-dm-only-text']").is(":checked") ? 1 : 0,
                welcome_dm_move: $form.find(":input[name='welcome-dm-move']").is(":checked") ? 1 : 0,
                welcome_dm_speed: $form.find(":input[name='welcome-dm-speed']").val(),

                // Stories reactions
                is_poll: $form.find(":input[name='poll']").is(":checked") ? 1 : 0,
                is_poll_slider: $form.find(":input[name='poll-slider']").is(":checked") ? 1 : 0,
                is_quiz: $form.find(":input[name='quiz']").is(":checked") ? 1 : 0,
                is_answer: $form.find(":input[name='answer']").is(":checked") ? 1 : 0,
                is_countdown: $form.find(":input[name='countdown']").is(":checked") ? 1 : 0,
                is_masslooking: $form.find(":input[name='masslooking']").is(":checked") ? 1 : 0,
                is_story_likes: $form.find(":input[name='like-stories']").is(":checked") ? 1 : 0,
                like_stories_algorithm: $form.find(":input[name='like-stories-algorithm']").val(),
                like_stories_type: $form.find(":input[name='like-stories-type']").val(),
                is_emoji: $form.find(":input[name='is-emoji']").is(":checked") ? 1 : 0,
                emojis: $form.find(":input[name='emojis']").val(),
                emoji_speed: $form.find(":input[name='emoji-speed']").val(),

                // Activity interval
                massvoting_interval: $form.find(":input[name='massvoting-interval']").val(),
                like_stories_interval: $form.find(":input[name='like-stories-interval']").val(),
                comment_interval: $form.find(":input[name='comment-interval']").val(),
                like_comments_interval: $form.find(":input[name='like-comments-interval']").val(),
                like_comments_speed: $form.find(":input[name='like-comments-speed']").val(),
                dm_interval: $form.find(":input[name='dm-interval']").val(),

                // Accelerators
                is_accelerators: $form.find(":input[name='is-accelerators']").is(":checked") ? 1 : 0,
                accelerator: JSON.stringify(accelerator),

                // Language filtration
                language: JSON.stringify(language),
                language_detection_notices: $form.find(":input[name='language-detection-notices']").is(":checked") ? 1 : 0,
                language_skip_accounts: $form.find(":input[name='language-skip-accounts']").is(":checked") ? 1 : 0,
                language_web_data: $form.find(":input[name='language-web-data']").is(":checked") ? 1 : 0,

                // Custom delays option
                custom_delays: $form.find(":input[name='custom-delays']").is(":checked") ? 1 : 0,

                sc_delay_vote_poll: $form.find(":input[name='sc-delay-vote-poll']").val(),
                sc_delay_get_hll: $form.find(":input[name='sc-delay-get-hll']").val(),
                sc_delay_get_likers: $form.find(":input[name='sc-delay-get-likers']").val(),
                sc_delay_slider: $form.find(":input[name='sc-delay-slider']").val(),
                sc_delay_quiz: $form.find(":input[name='sc-delay-quiz']").val(),
                sc_delay_answer: $form.find(":input[name='sc-delay-answer']").val(),
                sc_delay_countdown: $form.find(":input[name='sc-delay-countdown']").val(),
                sc_delay_masslooking: $form.find(":input[name='sc-delay-masslooking']").val(),
                sc_delay_story_likes: $form.find(":input[name='sc-delay-story-likes']").val(),
                masslooking_batch_limit: $form.find(":input[name='masslooking-batch-limit']").val(),
                detector_batch_limit: $form.find(":input[name='detector-batch-limit']").val(),
                interact_delay: $form.find(":input[name='interact-delay']").val(),
                limit_of_posts: $form.find(":input[name='limit-of-posts']").val(),
                sc_delay_send_dm_reply: $form.find(":input[name='sc-delay-send-dm-reply']").val(),

                sc_delay_get_followers: $form.find(":input[name='sc-delay-get-followers']").val(),
                sc_delay_get_followers_web: $form.find(":input[name='sc-delay-get-followers-web']").val(),
                sc_delay_get_explore_feed: $form.find(":input[name='sc-delay-get-explore-feed']").val(),
                sc_delay_get_reels_media_feed: $form.find(":input[name='sc-delay-get-reels-media-feed']").val(),
                sc_delay_get_feed: $form.find(":input[name='sc-limit-get-feed']").val(),
                sc_delay_get_reels: $form.find(":input[name='sc-delay-get-reels']").val(),
                sc_delay_get_about_account_info: $form.find(":input[name='sc-delay-get-about-account-info']").val(),
                sc_delay_get_recent_activity_inbox: $form.find(":input[name='sc-delay-recent-activity-inbox']").val(),

                // Custom proxy feature
                custom_proxy: $form.find(":input[name='custom-proxy']").val(),

                // Telegram Notifications
                is_telegram_analytics: $form.find(":input[name='is-telegram-analytics']").is(":checked") ? 1 : 0,
                is_telegram_errors: $form.find(":input[name='is-telegram-errors']").is(":checked") ? 1 : 0,
                tg_chat_id: $form.find(":input[name='tg-chat-id']").val(),
                delay_telegram: $form.find(":input[name='delay-telegram']").val(),

                // Actions settings
                prorate_algorithm: $form.find(":input[name='prorate-algorithm']").is(":checked") ? 1 : 0,

                // Comments
                is_comment: $form.find(":input[name='comment']").is(":checked") ? 1 : 0,
                comment_speed: $form.find(":input[name='comment-speed']").val(),
                comment_text: $form.find(":input[name='comment-text']").val(),

                // Country Filter
                country_filter_whitelist: $form.find(":input[name='country-filter-whitelist']").val(),
                country_filter_blacklist: $form.find(":input[name='country-filter-blacklist']").val(),

                // Close Friends
                cf_enable: $form.find(":input[name='cf-enable']").is(":checked") ? 1 : 0,
                cf_followers: $form.find(":input[name='cf-followers']").is(":checked") ? 1 : 0,
                cf_ids: $form.find(":input[name='cf-ids']").is(":checked") ? 1 : 0,
                cf_action: $form.find(":input[name='cf-action']").val(),
                cf_number: $form.find(":input[name='cf-number']").val(),
                cf_speed: $form.find(":input[name='cf-speed']").val(),
                cf_whitelist: $form.find(":input[name='cf-whitelist']").val(),
                cf_skip_suggested: $form.find(":input[name='cf-skip-suggested']").is(":checked") ? 1 : 0,
                cf_new_followers: $form.find(":input[name='cf-new-followers']").is(":checked") ? 1 : 0,

                // Metrics Filter
                is_metrics_filter: $form.find(":input[name='is-metrics-filter']").is(":checked") ? 1 : 0,
                followers_min: $form.find(":input[name='followers-min']").val(),
                followers_max: $form.find(":input[name='followers-max']").val(),
                followings_min: $form.find(":input[name='followings-min']").val(),
                followings_max: $form.find(":input[name='followings-max']").val(),
                posts_min: $form.find(":input[name='posts-min']").val(),
                posts_max: $form.find(":input[name='posts-max']").val(),
                last_posted_min: $form.find(":input[name='last-posted-min']").val(),
                last_posted_max: $form.find(":input[name='last-posted-max']").val(),

                // DM
                is_dm: $form.find(":input[name='dm']").is(":checked") ? 1 : 0,
                dm_speed: $form.find(":input[name='dm-speed']").val(),
                dm_text: $form.find(":input[name='dm-text']").val(),
                dm_mute: $form.find(":input[name='dm-mute']").is(":checked") ? 1 : 0,
                dm_move_to_general: $form.find(":input[name='dm-move-to-general']").is(":checked") ? 1 : 0,
                dm_only_text: $form.find(":input[name='dm-only-text']").is(":checked") ? 1 : 0,
                dm_skip_following: $form.find(":input[name='dm-skip-following']").is(":checked") ? 1 : 0,
                dm_skip_following_request: $form.find(":input[name='dm-skip-following-request']").is(":checked") ? 1 : 0,
                dm_remove_from_list: $form.find(":input[name='dm-remove-from-list']").is(":checked") ? 1 : 0,
                dm_list: $form.find(":input[name='dm-list']").val(),

                is_likes: $form.find(":input[name='likes']").is(":checked") ? 1 : 0,
                likes_per_user: $form.find(":input[name='likes-per-user']").val(),
                is_likes_timeline: $form.find(":input[name='likes-timeline']").is(":checked") ? 1 : 0,
                likes_speed: $form.find(":input[name='likes-speed']").val(),

                is_c_likes: $form.find(":input[name='c-likes']").is(":checked") ? 1 : 0,
                c_likes_speed: $form.find(":input[name='c-likes-speed']").val(),

                is_follow: $form.find(":input[name='follow']").is(":checked") ? 1 : 0,
                follow_speed: $form.find(":input[name='follow-speed']").val(),
                follow_limit: $form.find(":input[name='follow-limit']").val(),
                mute_type: $form.find(":input[name='mute-type']").val(),

                is_unfollow: $form.find(":input[name='unfollow']").is(":checked") ? 1 : 0,
                unfollow_speed: $form.find(":input[name='unfollow-speed']").val(),

                unfollow_interval: $form.find(":input[name='unfollow-interval']").val(),

                unfollow_skip_followers: $form.find(":input[name='unfollow-skip-followers']").is(":checked") ? 1 : 0,
                unfollow_non_followers:  $form.find(":input[name='unfollow-non-followers']").is(":checked") ? 1 : 0,
                unfollow_whitelist: $form.find(":input[name='unfollow-whitelist']").val(),

                auto_follow_unfollow: $form.find(":input[name='auto-follow-unfollow']").is(":checked") ? 1 : 0,

                // Activity Time Settings
                activity_time: $form.find(":input[name='activity-time']").is(":checked") ? 1 : 0,
                activity_time_settings: JSON.stringify(activityTimeReader()),

                // Manual Comments Filter
                is_comment_filter: $form.find(":input[name='is-comment-filter']").is(":checked") ? 1 : 0,
                comment_filter: $form.find(":input[name='comment-filter']").val(),

                // Gender by Name Filter Settings
                is_gender_by_name_filter: $form.find(":input[name='is-gender-by-name-filter']").is(":checked") ? 1 : 0,
                gender_by_name_choice: $form.find(":input[name='gender-by-name-choice']").val(),
                is_gender_skip_mode: $form.find(":input[name='is-gender-skip-mode']").is(":checked") ? 1 : 0,
                gender_by_name_custom_list: $form.find(":input[name='gender-by-name-custom-list']").val(),

                // Filter by ID
                is_filter_by_id: $form.find(":input[name='is-filter-by-id']").is(":checked") ? 1 : 0,
                filter_by_id: $form.find(":input[name='filter-by-id']").val(),

                // Username & Full Name Filter Settings (Blacklist)
                is_username_filter: $form.find(":input[name='is-username-filter']").is(":checked") ? 1 : 0,
                username_filter: $form.find(":input[name='username-filter']").val(),
                is_username_filter_match_mode: $form.find(":input[name='is-username-filter-match-mode']").is(":checked") ? 1 : 0,

                // Username & Full Name Filter Settings (Whitelist)
                is_username_filter_whitelist: $form.find(":input[name='is-username-filter-whitelist']").is(":checked") ? 1 : 0,
                username_filter_whitelist: $form.find(":input[name='username-filter-whitelist']").val(),
                is_username_filter_whitelist_match_mode: $form.find(":input[name='is-username-filter-whitelist-match-mode']").is(":checked") ? 1 : 0,

                // Expiration
                expiration: $form.find(":input[name='expiration']").is(":checked") ? 1 : 0,
                expiration_date: $form.find(":input[name='expiration-date']").val(),

                // Reset hard limit counters at midnight
                is_reset_hl: $form.find(":input[name='is-reset-hl']").is(":checked") ? 1 : 0,

                // MQTT
                mqtt: $form.find(":input[name='mqtt']").is(":checked") ? 1 : 0,

                // Open AI (Chat GPT) Settings
                openai_key: $form.find(":input[name='openai-key']").val(),
                openai_model: $form.find(":input[name='openai-model']").val(),
                openai_prompt: $form.find(":input[name='openai-prompt']").val(),
                openai_max_tokens: $form.find(":input[name='openai-max-tokens']").val(),
                openai_temperature: $form.find(":input[name='openai-temperature']").val(),
                openai_max_contacts: $form.find(":input[name='openai-max-contacts']").val(),
                openai_max_interval: $form.find(":input[name='openai-max-interval']").val(),
                openai_whisper: $form.find(":input[name='openai-whisper']").is(":checked") ? 1 : 0,
                openai_technical: $form.find(":input[name='openai-technical']").is(":checked") ? 1 : 0,

                // Open AI (Chat GPT) Actions
                openai_dm: $form.find(":input[name='openai-dm']").is(":checked") ? 1 : 0,

                // Asynchronous Settings
                async_masslooking: $form.find(":input[name='async-masslooking']").is(":checked") ? 1 : 0,
                async_masslooking_batch: $form.find(":input[name='async-masslooking-batch']").val(),
                async_story_likes: $form.find(":input[name='async-story-likes']").is(":checked") ? 1 : 0,
                async_story_likes_batch: $form.find(":input[name='async-story-likes-batch']").val(),

                // Debug mode
                debug_mode: $form.find(":input[name='debug-mode']").is(":checked") ? 1 : 0,

                // Additional Settings
                reset_data: $form.find(":input[name='reset-data']").is(":checked") ? 1 : 0,
                keywords_cleaner: $form.find(":input[name='keywords-cleaner']").is(":checked") ? 1 : 0,
                use_get_likers: $form.find(":input[name='use-get-likers']").is(":checked") ? 1 : 0,

                // Source Tracking
                source_tracking: $form.find(":input[name='source-tracking']").is(":checked") ? 1 : 0,
                track_only_new_followers: $form.find(":input[name='track-only-new-followers']").is(":checked") ? 1 : 0,
                flush_lf_counters: $form.find(":input[name='flush-lf-counters']").is(":checked") ? 1 : 0,

                // Target Quality Tracking
                target_quality_tracking: $form.find(":input[name='target-quality-tracking']").is(":checked") ? 1 : 0,
                target_quality_tracking_flush: $form.find(":input[name='target-quality-tracking-flush']").is(":checked") ? 1 : 0,

                // Selectize
                custom_labels: $form.find(":input[name='custom-labels']").val(),

                // Daily limits
                sc_limit_get_reels:     $form.find(":input[name='sc-limit-get-reels']").val(),
                sc_limit_get_feed:      $form.find(":input[name='sc-limit-get-feed']").val(),
                sc_limit_following:     $form.find(":input[name='sc-limit-following']").val(),
                sc_limit_followers:     $form.find(":input[name='sc-limit-followers']").val(),
                sc_limit_hashtag:       $form.find(":input[name='sc-limit-hashtag']").val(),
                sc_limit_location:      $form.find(":input[name='sc-limit-location']").val(),
                sc_limit_explore:       $form.find(":input[name='sc-limit-explore']").val(),
                sc_limit_answer_story:  $form.find(":input[name='sc-limit-answer-story']").val(),
                sc_limit_story_likes:   $form.find(":input[name='sc-limit-story-likes']").val(),
                sc_limit_masslooking:   $form.find(":input[name='sc-limit-masslooking']").val(),
                sc_limit_emoji:         $form.find(":input[name='sc-limit-emoji']").val(),
                sc_smart_increase_min:  $form.find(":input[name='sc-smart-increase-min']").val(),
                sc_smart_increase_max:  $form.find(":input[name='sc-smart-increase-max']").val(),
            },

            error: function() {
                $("body").removeClass("onprogress");

                NextPost.Alert({
                    title: __("Oops..."),
                    content:  __("An error occured. Please try again later!"),
                    confirmText: __("Close")
                });
            },

            success: function(resp) {
                $("body").removeClass("onprogress");

                if (resp.new_cls_array && $.isArray(resp.new_cls_array)) {
                    resp.new_cls_array.forEach(el => {
                        if ($("body").find('.js-rp-bulk-filter[data-custom-label="' + el + '"]').length > 0) {
                            // Already added
                        } else {
                            $("body").find(".rp-custom-labels-filters").append('<a class="js-rp-bulk-filter rp-bulk-btn mr-5 mb-5" href="javascript:void(0)" data-custom-label="' + el + '"><span class="rp-bulk-btntext">' + el + '</span></a>');
                        }
                    });
                    // Check removed labels
                    $("body").find(".js-rp-bulk-filter").each(function () {
                        var label = $(this).data("custom-label");
                        if ($.inArray(label, resp.new_cls_array) === -1) {
                            $(this).remove();
                            $("body").find('.reactions-custom-label[data-custom-label="' + label + '"]').remove();
                        }
                    });
                } else {
                    $("body").find(".js-rp-bulk-filter").remove();
                    $("body").find(".reactions-custom-label").remove();
                }

                if (resp.cl_array && $.isArray(resp.cl_array)) {
                    resp.cl_array.forEach(el => {
                        if (active_schedule.find('.reactions-custom-label[data-custom-label="' + el + '"]').length > 0) {
                            // Already added
                        } else {
                            active_schedule.find(".reactions-task-custom-labels").append('<span class="mt-10 mr-5 mb-5 d-inline-block reactions-custom-label" data-custom-label="' + el + '">' + el + '</span>');
                        }
                    });
                    // Check removed labels for task
                    active_schedule.find(".reactions-custom-label").each(function () {
                        var label = $(this).data("custom-label");
                        if ($.inArray(label, resp.cl_array) === -1) {
                            $(this).remove();
                        }
                    });
                } else {
                    active_schedule.find(".reactions-custom-label").remove();
                }

                $("body").find(".gender-list-counter").replaceWith("<span class='gender-list-counter'>" + resp.gender_list_counter + "</span>");

                if (resp.result == 1) {
                    if (resp.is_paused) {
                        active_schedule.find("span.status").replaceWith("<span class='status color-paused'><span class='mdi mdi-pause-circle mr-2'></span>" + __('Paused') + (resp.next_action ? resp.next_action : "") + "</span>");
                        $form.find(":input[name='is_active'][data-id='" + id + "']").val(1).change();
                    } else if (resp.is_active) {
                        active_schedule.find("span.status").replaceWith("<span class='status color-green'><span class='mdi mdi-circle mr-2'></span>" + __('Active') + "</span>");
                        $form.find(":input[name='is_active'][data-id='" + id + "']").val(1).change();

                        // Wesley Start Mod
                        $form.find(".rp-status-option").replaceWith("<select class='input none rp-status-option' name='is_active'><option value='0' selected></option></select>");
                        $form.find(".rp-status").replaceWith("<input class='fluid button btn-red rp-status' type='submit' value='" + __('Stop Tasks') + "'>");
                        // Wesley End Mod
                    } else {
                        active_schedule.find("span.status").replaceWith("<span class='status'><span class='mdi mdi-circle-outline mr-2'></span>" + __('Inactive') + "</span>");
                    }
                    if (resp.dm_list_users_count) {
                        $form.find(".dm-list-counter").replaceWith("<span class='dm-list-counter'>" + resp.dm_list_users_count + "</span>");
                    }
                    if (resp.follow_counter) {
                        active_schedule.find(".follow-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.follow_counter + "</span>");
                    }
                    if (resp.like_counter) {
                        active_schedule.find(".like-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.like_counter + "</span>");
                    }
                    if (resp.unfollow_counter) {
                        active_schedule.find(".unfollow-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.unfollow_counter + "</span>");
                    }
                    if (resp.comment_counter) {
                        active_schedule.find(".comment-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.comment_counter + "</span>");
                    }
                    if (resp.dm_counter) {
                        active_schedule.find(".dm-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.dm_counter + "</span>");
                    }
                    if (resp.welcome_dm_counter) {
                        active_schedule.find(".welcome-dm-speed .speed-value").replaceWith("<span class='speed-value'>" + resp.welcome_dm_counter + "</span>");
                    }
                    if (resp.dm_complete_procentage) {
                        active_schedule.find(".dm-complete-procentage .speed-value").replaceWith("<span class='speed-value color-green'>" + resp.dm_complete_procentager + "</span>");
                    }
                    if (resp.login_flow_timestamp) {
                        active_schedule.find(".login-flow-timestamp .login-flow-timestamp-value").replaceWith("<span class='login-flow-timestamp-value'>" + resp.login_flow_timestamp + "</span>");
                    }
                    if (resp.ra_page) {
                        active_schedule.find(".ra-page-count").val(resp.ra_page);
                    }
                    if (resp.acc_count) {
                        active_schedule.find(".acc-count").val(resp.acc_count);
                    }
                    if (resp.expiration_label) {
                        active_schedule.find(".expiration-text").html(resp.expiration_label);
                        if (resp.expired) {
                            active_schedule.find(".expiration-label").removeClass("color-blue");
                            active_schedule.find(".expiration-label").addClass("color-expired");
                        } else {
                            active_schedule.find(".expiration-label").removeClass("color-expired");
                            active_schedule.find(".expiration-label").addClass("color-blue");
                        }
                    }
                    NextPost.DisplayFormResult($form, "success", resp.msg);
                } else {
                    NextPost.DisplayFormResult($form, "error", resp.msg);
                }
            }
        });
    });
}

Reactions.PauseByUser = function() {
    $("body").on("click", "a.js-pause-reactions-by-user", function() {
        $("body").addClass("onprogress");

        var id = $(this).data("id");
        var url = $(this).data("url");
        var active_schedule = $(".aside-list-item.active");
        var $form = $(".js-reactions-schedule-form");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: "pause",
                id: id
            },

            error: function() {
                $("body").removeClass("onprogress");

                NextPost.Alert({
                    title: __("Oops..."),
                    content:  __("An error occured. Please try again later!"),
                    confirmText: __("Close")
                });
            },

            success: function(resp) {
                $("body").removeClass("onprogress");

                if (resp.result == 1) {
                    if (resp.is_paused) {
                        active_schedule.find("span.status").replaceWith("<span class='status color-paused'><span class='mdi mdi-pause-circle mr-2'></span>" + __('Paused') + (resp.next_action ? resp.next_action : "") + "</span>");
                        $form.find(":input[name='is_active'][data-id='" + id + "']").val(1).change();
                    } else if (resp.is_active) {
                        active_schedule.find("span.status").replaceWith("<span class='status color-green'><span class='mdi mdi-circle mr-2'></span>" + __('Active') + "</span>");
                        $form.find(":input[name='is_active'][data-id='" + id + "']").val(1).change();
                    } else {
                        active_schedule.find("span.status").replaceWith("<span class='status'><span class='mdi mdi-circle-outline mr-2'></span>" + __('Inactive') + "</span>");
                    }
                    NextPost.DisplayFormResult($form, "success", resp.msg);
                } else {
                    NextPost.DisplayFormResult($form, "error", resp.msg);
                }
            }
        });
    });
}

/**
 * Linky users and tags
 */
Reactions.Linky = function()
{
    $(".reactions-message-list-item .message").not(".js-linky-done")
        .addClass("js-linky-done")
        .linky({
            mentions: true,
            hashtags: true,
            urls: false,
            linkTo:"instagram"
        });
}

Reactions.MessagesForm = function()
{
    var $form = $(".js-reactions-messages-form");

    // Linky
    Reactions.Linky();

    // Add message
    $(".js-add-new-message-btn").on("click", function() {
        var message = $.trim($form.find(".new-message-input").val());
        var attachment = $form.find(":input[name='attachment']").val();
        var func = $form.find(":input[name='function']").val();

        if (message) {
            $message = $("<div class='reactions-message-list-item'></div>");
            $message.append('<a href="javascript:void(0)" class="remove-message-btn mdi mdi-close-circle"></a>');
            $message.append("<span class='message'></span>");
            $message.find(".message").html(message.replace(/(?:\r\n|\r|\n)/g, '<br>\n'));

            if (attachment) {
                var ext = "unknown";
                if (attachment) {
                    ext = attachment.split('.').pop().toLowerCase();
                }
                if (["jpg", "jpeg", "png", "heic", "bmp", "gif"].indexOf(ext) >= 0) {
                    $message.append("<span class='attachment'></span>");
                    $message.find(".attachment").html("<img class='attachment-file' src='" + attachment + "'>");
                } else if (["mp4", "mov", "avi"].indexOf(ext) >= 0) {
                    $message.append("<span class='attachment'></span>");
                    $message.find(".attachment").html("<video class='attachment-file' src='" + attachment + "' controls loop autoplay muted></video>");
                }
            }

            $message.append("<span class='function' data-function='" + func + "'>");

            if (func == "welcome-dm") {
                $message.find(".function").html(__("Welcome DM"));
            } else if (func == "send-dm") {
                $message.find(".function").html(__("Send DM"));
            } else if (func == "pending-dm") {
                $message.find(".function").html(__("Reply to pending DM"));
            } else if (func == "comment") {
                $message.find(".function").html(__("Comments"));
            } else {
                $message.find(".function").html(__("Answers"));
            }

            $message.prependTo(".reactions-message-list");

            Reactions.Linky();

            var messages = [];
            $form.find(".reactions-message-list-item").each(function() {
                messages.push({
                    "text": $(this).find(".message").text(),
                    "function": $(this).find(".function").attr("data-function"),
                    "attachment": $(this).find(".attachment-file").attr("src")
                });
            })

            // Update copy answers popup values
            var copy_answers_textarea = $("#copy-answers-popup").find("textarea.answers-list");
            copy_answers_textarea.val(JSON.stringify(messages));

            // Update counter
            var total_answers = $form.find(".js-total-answers-count");
            var total_answers_count = total_answers.find(".answers-count");
            var counter = Number.parseInt(total_answers_count.text());
            total_answers_count.html(counter + 1);
        }
    });

    // Submit the form
    $form.on("submit", function() {
        $("body").addClass("onprogress");

        var messages = [];
        $form.find(".reactions-message-list-item").each(function() {
            messages.push({
                "text": $(this).find(".message").text(),
                "function": $(this).find(".function").attr("data-function"),
                "attachment": $(this).find(".attachment-file").attr("src")
            });
        })

        $.ajax({
            url: $form.attr("action"),
            type: $form.attr("method"),
            dataType: 'jsonp',
            data: {
                action: "save",
                messages: JSON.stringify(messages)
            },
            error: function() {
                $("body").removeClass("onprogress");
                NextPost.DisplayFormResult($form, "error", __("Oops! An error occured. Please try again later!"));
            },

            success: function(resp) {
                if (resp.result == 1) {
                    NextPost.DisplayFormResult($form, "success", resp.msg);
                } else {
                    NextPost.DisplayFormResult($form, "error", resp.msg);
                }

                $("body").removeClass("onprogress");
            }
        });

        return false;
    });

    // Add list with answers
    var answers_list_popup = $("#add-answers-popup");
    answers_list_popup.on("click", "a.js-reactions-answers-list", function() {
        var answer_list_textarea = answers_list_popup.find("textarea.answers-list");
        var answers_list = JSON.parse(answer_list_textarea.val());

        var answers = [];
        // Get ready answers
        $form.find(".reactions-message-list-item").each(function() {
            answers.push({
                "text": $(this).find(".message").text(),
                "function": $(this).find(".function").attr("data-function"),
                "attachment": $(this).find(".attachment-file").attr("src")
            });
        })

        answer_list_textarea.val("");
        answers_list_popup.modal('hide');

        $("body").addClass("onprogress");

        var counter = 0;
        $.each(answers_list,function(key,value){
            if (value && value.hasOwnProperty('text') && value.hasOwnProperty('function')) {
                var exist = false;
                $.each(answers,function(k,a){
                    if (a.text == value.text && a.function == value.function && a.attachment == value.attachment) {
                        exist = true;
                    }
                });
                if (exist) {
                    // Target already added
                } else {
                    counter++;
                    var $answer = $("<div class='reactions-message-list-item'></div>");
                    $answer.append('<a href="javascript:void(0)" class="remove-message-btn mdi mdi-close-circle"></a>');
                    $answer.append("<span class='message'></span>");
                    $answer.find(".message").html(value.text.replace(/(?:\r\n|\r|\n)/g, '<br>\n'));

                    if (value.attachment) {
                        var ext = "unknown";
                        if (value.attachment) {
                            ext = value.attachment.split('.').pop().toLowerCase();
                        }
                        if (["jpg", "jpeg", "png", "heic", "bmp", "gif"].indexOf(ext) >= 0) {
                            $answer.append("<span class='attachment'></span>");
                            $answer.find(".attachment").html("<img class='attachment-file' src='" + value.attachment + "'>");
                        } else if (["mp4", "mov", "avi"].indexOf(ext) >= 0) {
                            $answer.append("<span class='attachment'></span>");
                            $answer.find(".attachment").html("<video class='attachment-file' src='" + value.attachment + "' controls loop autoplay muted></video>");
                        }
                    }

                    $answer.append("<span class='function' data-function='" + value.function + "'>");

                    if (value.function == "welcome-dm") {
                        $answer.find(".function").html(__("Welcome DM"));
                    } else if (value.function == "send-dm") {
                        $answer.find(".function").html(__("Send DM"));
                    } else if (value.function == "pending-dm") {
                        $answer.find(".function").html(__("Reply to pending DM"));
                    } else if (value.function == "comment") {
                        $answer.find(".function").html(__("Comments"));
                    } else {
                        $answer.find(".function").html(__("Answers"));
                    }

                    $answer.prependTo(".reactions-message-list");

                    Reactions.Linky();

                    // Update copy answers popup values
                    var copy_answers_textarea = $("#copy-answers-popup").find("textarea.answers-list");
                    var current_answers = copy_answers_textarea.val();
                    if (current_answers) {
                        copy_answers_textarea.val(value + "\n" + current_answers);
                    } else {
                        copy_answers_textarea.val(value);
                    }
                }
            }
        });

        // Update counter
        if (counter) {
            var total_answers = $form.find(".js-total-answers-count");
            var total_answers_count = total_answers.find(".answers-count");
            var current_counter = Number.parseInt(total_answers_count.text());
            total_answers_count.html(current_counter + counter);
        }

        $("body").removeClass("onprogress");
    });

    // Remove all messages
    $("body").on("click", ".js-remove-all-answers", function() {
        var $answers = $("body").find(".reactions-message-list");
        if ($answers) {
            $answers.html('');
        }

        // Update counter
        var total_answers = $form.find(".js-total-answers-count");
        var total_answers_count = total_answers.find(".answers-count");
        total_answers_count.html(0);
    });
}

Reactions.ReloadActiveAsideListItem = function() {
    var item = $("body").find(".aside-list-item.active");
    var url = item.find(".js-ajaxload-content").attr("href");
    if (url) {
        if ($(".skeleton-content").find(".no-data").length) {
            // Home page
        } else {
            $(".skeleton-content")
            .addClass("onprogress")
            .load(url + " .skeleton-content>", function() {
                $(".skeleton-content").removeClass('onprogress');
                if (typeof window.asidelist.success === "function") {
                    window.asidelist.success(); // Success callback
                }
            });

            window.history.pushState({}, $("title").text(), url);
        }
    }
}

var search_timer;
var search_xhr;
var $form = $(".skeleton-aside .search-box");

/**
 * Task Filters
 */
$("body").on("click", "a.js-only-active,a.js-only-deactive,a.js-only-paused,a.js-only-login-required,a.js-only-story-likes-throttled,a.js-only-accelerators,a.js-hide-accelerators,a.js-only-slaves,a.js-hide-slaves,a.js-break-recommended,a.js-stuck-tasks,a.js-rp-bulk-filter,a.js-hide-login-required,a.js-expired-tasks,a.js-hide-expired-tasks,a.js-expiration-select,a.js-expiration-clear", function() {
    var _this = $(this);
    var only_active_inp = $("body").find(":input[name='only_active']");
    var only_deactive_inp = $("body").find(":input[name='only_deactive']");
    var only_paused_inp = $("body").find(":input[name='only_paused']");
    var hide_accelerators_inp = $("body").find(":input[name='hide_accelerators']");
    var only_accelerators_inp = $("body").find(":input[name='only_accelerators']");
    var only_slaves_inp = $("body").find(":input[name='only_slaves']");
    var hide_slaves_inp = $("body").find(":input[name='hide_slaves']");
    var only_login_required_inp = $("body").find(":input[name='only_login_required']");
    var hide_login_required_inp = $("body").find(":input[name='hide_login_required']");
    var only_story_likes_throttled_inp = $("body").find(":input[name='only_story_likes_throttled']");
    var break_recommended_inp = $("body").find(":input[name='break_recommended']");
    var stuck_tasks_inp = $("body").find(":input[name='stuck_tasks']");
    var expired_tasks_inp = $("body").find(":input[name='expired_tasks']");
    var hide_expired_tasks_inp = $("body").find(":input[name='hide_expired_tasks']");
    var expiration_range_inp = $("body").find(":input[name='expiration_range']");
    if (_this.hasClass("js-expiration-clear")) {
        expiration_range_inp.val("");
    }
    var search_query = $("body").find(":input[name='q']");

    if (_this.hasClass("js-only-active")) {
        if (only_active_inp.val() == 0) {
            only_active_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            only_active_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-only-deactive")) {
        if (only_deactive_inp.val() == 0) {
            only_deactive_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            only_deactive_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-only-paused")) {
        if (only_paused_inp.val() == 0) {
            only_paused_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            only_paused_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-only-login-required")) {
        if (only_login_required_inp.val() == 0) {
            only_login_required_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            only_login_required_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-only-story-likes-throttled")) {
        if (only_story_likes_throttled_inp.val() == 0) {
            only_story_likes_throttled_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            only_story_likes_throttled_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-only-accelerators")) {
        if (only_accelerators_inp.val() == 0) {
            only_accelerators_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            only_accelerators_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-hide-accelerators")) {
        if (hide_accelerators_inp.val() == 0) {
            hide_accelerators_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            hide_accelerators_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-break-recommended")) {
        if (break_recommended_inp.val() == 0) {
            break_recommended_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            break_recommended_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-stuck-tasks")) {
        if (stuck_tasks_inp.val() == 0) {
            stuck_tasks_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            stuck_tasks_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-rp-bulk-filter")) {
        if (_this.hasClass('button--light-outline')) {
            _this.removeClass('button--light-outline');
        } else {
            _this.addClass('button--light-outline');
        }
    } else if (_this.hasClass("js-hide-login-required")) {
        if (hide_login_required_inp.val() == 0) {
            hide_login_required_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            hide_login_required_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-expired-tasks")) {
        if (expired_tasks_inp.val() == 0) {
            expired_tasks_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            expired_tasks_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-hide-expired-tasks")) {
        if (hide_expired_tasks_inp.val() == 0) {
            hide_expired_tasks_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            hide_expired_tasks_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-only-slaves")) {
        if (only_slaves_inp.val() == 0) {
            only_slaves_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            only_slaves_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    } else if (_this.hasClass("js-hide-slaves")) {
        if (hide_slaves_inp.val() == 0) {
            hide_slaves_inp.val(1);
            _this.removeClass('button--light-outline');
            _this.addClass('active');
        } else {
            hide_slaves_inp.val(0)
            _this.addClass('button--light-outline');
            _this.removeClass('active');
        }
    }

    if (search_xhr) {
        // Abort previous ajax request
        search_xhr.abort();
    }

    if (search_timer) {
        clearTimeout(search_timer);
    }

    data = $.param({
        only_active: (only_active_inp.val() == 1) ? "yes" : "no",
        only_deactive: (only_deactive_inp.val() == 1) ? "yes" : "no",
        only_paused: (only_paused_inp.val() == 1) ? "yes" : "no",
        hide_accelerators: (hide_accelerators_inp.val() == 1) ? "yes" : "no",
        only_login_required: (only_login_required_inp.val() == 1) ? "yes" : "no",
        only_story_likes_throttled: (only_story_likes_throttled_inp.val() == 1) ? "yes" : "no",
        only_accelerators: (only_accelerators_inp.val() == 1) ? "yes" : "no",
        only_slaves: (only_slaves_inp.val() == 1) ? "yes" : "no",
        hide_slaves: (hide_slaves_inp.val() == 1) ? "yes" : "no",
        break_recommended: (break_recommended_inp.val() == 1) ? "yes" : "no",
        stuck_tasks: (stuck_tasks_inp.val() == 1) ? "yes" : "no",
        hide_login_required: (hide_login_required_inp.val() == 1) ? "yes" : "no",
        expired_tasks: (expired_tasks_inp.val() == 1) ? "yes" : "no",
        hide_expired_tasks: (hide_expired_tasks_inp.val() == 1) ? "yes" : "no",
        expiration_range: expiration_range_inp.val(),
    });

    if (_this.hasClass("js-rp-bulk-filter")) {
        data += '&' + $.param({
            custom_label: _this.data("custom-label"),
            update_filters: 1
        });
    }

    if (search_query.val() != '') {
        data += '&' + $.param({
            q: search_query.val(),
        });
    }

    var duration = 200;
    search_timer = setTimeout(function(){
        search_query.addClass("onprogress");

        $.ajax({
            url: $form.attr("action"),
            type: $form.attr("method"),
            dataType: 'html',
            data: data,
            complete: function() {
                search_query.removeClass('onprogress');
            },
            success: function(resp) {
                $resp = $(resp);

                if ($resp.find(".skeleton-aside .js-search-results").length == 1) {
                    $(".skeleton-aside .js-search-results")
                        .html($resp.find(".skeleton-aside .js-search-results").html());
                }
            }
        });
    }, duration);
});

/**
 * Flush filters
 */
$("body").on("click", "a.js-flush-filters", function() {
    var search_query = $("body").find(":input[name='q']");

    data = $.param({
        flush_filters: 1
    });

    search_query.addClass("onprogress");

    $.ajax({
        url:  $form.attr("action"),
        type: $form.attr("method"),
        ataType: 'html',
        data: data,
        complete: function() {
            search_query.removeClass('onprogress');
        },
        success: function(resp) {
            location.reload();
        }
    });
});

/**
 * Select Task
 */
$("body").off("click", ".js-list-item").on("click", ".js-list-item", function() {
    var _this = $(this);
    var account_id = _this.attr("data-id");
    var list_items = $(`.js-list-item`);

    list_items.each(function() {
        var $list_item = $(this);
        var $taskActionSelect = $list_item.find('.js-task-action-select');
        if ($list_item.hasClass("task-selected")) {
            $taskActionSelect.addClass("mdi-checkbox-blank-circle-outline");
            $taskActionSelect.removeClass("mdi-checkbox-marked-circle-outline");
            $list_item.removeClass("task-selected active");
        } else {
            if ($list_item.attr('data-id') == account_id) {
                $taskActionSelect.removeClass("mdi-checkbox-blank-circle-outline");
                $taskActionSelect.addClass("mdi-checkbox-marked-circle-outline");
                $list_item.addClass("task-selected active");
            }
        }
    });


});

/**
 * Task Action: Select/Unselect All
 */
$("body").on("click", ".js-task-action-select-all,.js-task-action-unselect-all", function() {
    var _this = $(this);
    if (!_this.hasClass('disabled')) {
        _this.addClass("disabled");
        taskActionsSUProcess(_this);
    }
});

var taskActionsSUProcess = function(_this, page = 0) {
    var list_item = $("body").find(".js-list-item");
    $.ajax({
        url: _this.attr("data-url"),
        type: "POST",
        dataType: 'jsonp',
        data: {
            action: _this.hasClass("js-task-action-select-all") ? "select-all" : "unselect-all",
            page: page
        },
        error: function() {
            $.alert({
                title: __("Oops..."),
                content: __("An error occured. Please try again later!"),
                theme: 'modern',
                buttons: {
                    confirm: {
                        text: __("Try Again"),
                        btnClass: "small button btn-red",
                        keys: ['enter'],
                        action: function() {
                            taskActionsSUProcess(_this, page);
                        }
                    },
                    cancel: {
                        text: __("Close"),
                        btnClass: "small button button--red--outline",
                        keys: ['esc'],
                        action: function() {
                            _this.removeClass("disabled");
                        }
                    }
                },
                draggable: false,
                closeIcon: true,
                closeIcon: function() {
                    _this.removeClass("disabled");
                },
                icon: 'icon-close',
                type: 'red'
            });
        },
        success: function(resp) {
            if (resp.result == 1) {
                if (_this.hasClass("js-task-action-select-all")) {
                    list_item.find(".js-task-action-select").removeClass("mdi-checkbox-blank-circle-outline");
                    list_item.find(".js-task-action-select").addClass("mdi-checkbox-marked-circle-outline");
                    list_item.addClass("task-selected");
                } else {
                    list_item.find(".js-task-action-select").removeClass("mdi-checkbox-marked-circle-outline");
                    list_item.find(".js-task-action-select").addClass("mdi-checkbox-blank-circle-outline");
                    list_item.removeClass("task-selected");
                }
                if (resp.procentage && resp.procentage > 0) {
                    $(".rp-filter-progress").removeClass("none");
                    $(".rp-filter-progress").find(".progress-bar.progress").css({width:resp.procentage.toFixed(2)+"%"});
                    if (resp.procentage == 100) {
                        setTimeout(function() {
                            $("body").find(".rp-filter-progress").addClass("none");
                            $(".rp-filter-progress").find(".progress-bar.progress").css({width:"0%"});
                        }, 1000);
                    }
                } else {
                    $(".rp-filter-progress").find(".progress-bar.progress").css({width:"100%"});
                    setTimeout(function() {
                        $("body").find(".rp-filter-progress").addClass("none");
                        $(".rp-filter-progress").find(".progress-bar.progress").css({width:"0%"});
                    }, 1000);
                }
                if (resp.loop == 1 && resp.page && (resp.page > 0)) {
                    taskActionsSUProcess(_this, resp.page);
                } else {
                    _this.removeClass("disabled");
                }
            } else {
                $.alert({
                    title: __("Oops..."),
                    content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
                    theme: 'modern',
                    buttons: {
                        confirm: {
                            text: __("Try Again"),
                            btnClass: "small button btn-red",
                            keys: ['enter'],
                            action: function() {
                                taskActionsSUProcess(_this, page);
                            }
                        },
                        cancel: {
                            text: __("Close"),
                            btnClass: "small button button--red--outline",
                            keys: ['esc'],
                            action: function() {
                                _this.removeClass("disabled");
                            }
                        }
                    },
                    draggable: false,
                    closeIcon: true,
                    closeIcon: function() {
                        _this.removeClass("disabled");
                    },
                    icon: 'icon-close',
                    type: 'red'
                });
            }
        }
    });
}

/**
 * Task Action: Pause/Continue/Restart selected tasks
 */
Reactions.TaskActions = function() {
    var taskActionsProcess = function(_this, action, page = 0) {
        $.ajax({
            url: _this.attr("data-url"),
            type: "POST",
            dataType: 'jsonp',
            data: {
                action: action,
                page: page
            },
            error: function() {
                $.alert({
                    title: __("Oops..."),
                    content: __("An error occured. Please try again later!"),
                    theme: 'modern',
                    buttons: {
                        confirm: {
                            text: __("Try Again"),
                            btnClass: "small button btn-red",
                            keys: ['enter'],
                            action: function() {
                                taskActionsProcess(_this, action, page);
                            }
                        },
                        cancel: {
                            text: __("Close"),
                            btnClass: "small button button--red--outline",
                            keys: ['esc'],
                            action: function() {
                                _this.removeClass("disabled");
                            }
                        }
                    },
                    draggable: false,
                    closeIcon: true,
                    closeIcon: function() {
                        _this.removeClass("disabled");
                    },
                    icon: 'icon-close',
                    type: 'red'
                });
            },
            success: function(resp) {
                if (resp.result == 1) {
                    if (resp.updated && $.isArray(resp.updated)) {
                        resp.updated.forEach(up => {
                            var l_item = $("body").find(".js-list-item[data-id=" + up + "]");
                            if (l_item && l_item.length > 0) {
                                Reactions.UpdateData(l_item);
                            }
                        });
                        if (resp.procentage && resp.procentage > 0) {
                            $(".rp-filter-progress").removeClass("none");
                            $(".rp-filter-progress").find(".progress-bar.progress").css({width:resp.procentage.toFixed(2)+"%"});
                            if (resp.procentage == 100) {
                                setTimeout(function() {
                                    $("body").find(".rp-filter-progress").addClass("none");
                                    $(".rp-filter-progress").find(".progress-bar.progress").css({width:"0%"});
                                }, 1000);
                            }
                        } else {
                            $(".rp-filter-progress").find(".progress-bar.progress").css({width:"100%"});
                            setTimeout(function() {
                                $("body").find(".rp-filter-progress").addClass("none");
                                $(".rp-filter-progress").find(".progress-bar.progress").css({width:"0%"});
                            }, 1000);
                        }
                        if (resp.loop == 1 && resp.page && (resp.page > 0)) {
                            taskActionsProcess(_this, action, resp.page);
                        } else {
                            _this.removeClass("disabled");
                            setTimeout(function (){
                                Reactions.ReloadActiveAsideListItem();
                            }, 500);
                        }
                    } else {
                        _this.removeClass("disabled");
                    }
                } else if (resp.try_relogin) {
                    _this.removeClass("disabled");
                    $(".skeleton-content").addClass("onprogress");
                    $("body").find(".js-bypassing-toolkit-re-connect[data-id='" + resp.try_relogin + "']").click();
                    $("body").find(".js-re-connect[data-id='" + resp.try_relogin + "']").click();
                    $(document).ajaxSuccess(function(event, xhr, settings) {
                        if (settings.url.match(/bypassing-toolkit/i) || settings.url.match(/accounts/i)) {
                            if (xhr.status === 200 && xhr.readyState === 4) {
                                if (xhr.responseJSON && xhr.responseJSON.hasOwnProperty("result") && xhr.responseJSON.result == 1) {
                                    $(".skeleton-content").removeClass("onprogress");
                                    taskActionsProcess(_this, action, page);
                                }
                            }
                        }
                    });
                    $(document).ajaxError(function(event, xhr, settings) {
                        if (settings.url.match(/bypassing-toolkit/i) || settings.url.match(/accounts/i)) {
                            $(".skeleton-content").removeClass("onprogress");
                        }
                    });
                } else {
                    $.alert({
                        title: __("Oops..."),
                        content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
                        theme: 'modern',
                        buttons: {
                            confirm: {
                                text: __("Try Again"),
                                btnClass: "small button btn-red",
                                keys: ['enter'],
                                action: function() {
                                    taskActionsProcess(_this, action, page);
                                }
                            },
                            cancel: {
                                text: __("Close"),
                                btnClass: "small button button--red--outline",
                                keys: ['esc'],
                                action: function() {
                                    _this.removeClass("disabled");
                                }
                            }
                        },
                        draggable: false,
                        closeIcon: true,
                        closeIcon: function() {
                            _this.removeClass("disabled");
                        },
                        icon: 'icon-close',
                        type: 'red'
                    });
                }
            }
        });
    }

    $("body").off("click", ".js-task-action-pause,.js-task-action-continue,.js-task-action-restart,.js-task-action-reset,.js-task-action-refresh-cookies").on("click", ".js-task-action-pause,.js-task-action-continue,.js-task-action-restart,.js-task-action-reset,.js-task-action-refresh-cookies", function() {
        var _this = $(this);
        if (!_this.hasClass('disabled')) {
            _this.addClass("disabled");
            var action = "pause";
            if (_this.hasClass("js-task-action-continue")) {
                action = "continue";
            } else if (_this.hasClass("js-task-action-restart")) {
                action = "restart";
            } else if (_this.hasClass("js-task-action-reset")) {
                action = "reset";
            } else if (_this.hasClass("js-task-action-refresh-cookies")) {
                action = "refresh-cookies";
            }
            taskActionsProcess(_this, action);
        }
    });
}
Reactions.TaskActions();

/**
 * Task Action: Copy settings
 */
$("body").on("click", ".js-task-action-copy", function() {
    var _this = $(this);

    var copy_button = _this.html();

    if (!_this.hasClass('disabled')) {

        _this.addClass("disabled");

        $.ajax({
            url: _this.attr("data-url"),
            type: "POST",
            dataType: 'jsonp',
            data: {
                action: "copy"
            },
            error: function() {
                _this.removeClass("disabled");
                specialAlertResponse();
            },
            success: function(resp) {
                _this.removeClass("disabled");
                if (resp.result == 1) {
                    if (resp.messages || resp.target || resp.data) {
                        var copyhelper = document.createElement("input");
                            document.body.appendChild(copyhelper);
                            copyhelper.value = JSON.stringify({
                                "messages": resp.messages,
                                "target": resp.target,
                                "data": resp.data,
                                "expiration_date": resp.expiration_date
                            });
                            copyhelper.select();
                            document.execCommand("copy");
                            document.body.removeChild(copyhelper);
                        _this.html(__("Settings copied"));
                        _this.removeClass("js-task-action-copy");
                        _this.addClass("reactions-copyhelper-done");
                        data_copied_animation_done = setTimeout(function (){
                            _this.html(copy_button);
                            _this.addClass("js-task-action-copy");
                            _this.removeClass("reactions-copyhelper-done");
                        }, 2000);
                    } else {
                        _this.html(__("Task settings is empty"));
                        _this.removeClass("js-task-action-copy");
                        _this.addClass("reactions-copyhelper-error");
                        data_copied_animation_error = setTimeout(function (){
                            _this.html(copy_button);
                            _this.addClass("js-task-action-copy");
                            _this.removeClass("reactions-copyhelper-error");
                        }, 2000);
                    }
                } else {
                    specialAlertResponse(resp);
                }
            }
        });
    }
});

/**
 * Task Action: Paste settings
 */
$("body").on("click", ".js-task-action-paste", function() {
    var _this = $(this);
    var paste_button = _this.html();
    if (!_this.hasClass('disabled')) {
        _this.addClass("disabled");
        taskActionsPasteProcess(_this);
    }
});

var taskActionsPasteProcess = function(_this, insert, page = 0) {
    $.ajax({
        url: _this.attr("data-url"),
        type: "POST",
        dataType: 'jsonp',
        data: {
            action: "paste",
            insert: insert,
            page: page
        },
        error: function() {
            $.alert({
                title: __("Oops..."),
                content: __("An error occured. Please try again later!"),
                theme: 'modern',
                buttons: {
                    confirm: {
                        text: __("Try Again"),
                        btnClass: "small button btn-red",
                        keys: ['enter'],
                        action: function() {
                            taskActionsPasteProcess(_this, insert, page);
                        }
                    },
                    cancel: {
                        text: __("Close"),
                        btnClass: "small button button--red--outline",
                        keys: ['esc'],
                        action: function() {
                            _this.removeClass("disabled");
                        }
                    }
                },
                draggable: false,
                closeIcon: true,
                closeIcon: function() {
                    _this.removeClass("disabled");
                },
                icon: 'icon-close',
                type: 'red'
            });
        },
        success: function(resp) {
            if (resp.result == 1) {
                if (resp.updated && $.isArray(resp.updated)) {
                    if (resp.loop == 1) {
                        // It's a loop process
                    } else {
                        _this.html(__("Settings updated"));
                        _this.removeClass("js-task-action-paste");
                        _this.addClass("reactions-copyhelper-done");
                        data_copied_animation_done = setTimeout(function (){
                            _this.html();
                            _this.addClass("js-task-action-paste");
                            _this.removeClass("reactions-copyhelper-done");
                        }, 2000);
                    }
                    // resp.updated.forEach(up => {
                    //     var l_item = $("body").find(".js-list-item[data-id=" + up + "]");
                    //     if (l_item.length > 0) {
                    //         Reactions.UpdateData(l_item);
                    //     }
                    // });
                    if (resp.procentage && resp.procentage > 0) {
                        $(".rp-filter-progress").removeClass("none");
                        $(".rp-filter-progress").find(".progress-bar.progress").css({width:resp.procentage.toFixed(2)+"%"});
                        if (resp.procentage == 100) {
                            Reactions.UpdateData($(".aside-list-item.active"));
                            setTimeout(function() {
                                $("body").find(".rp-filter-progress").addClass("none");
                                $(".rp-filter-progress").find(".progress-bar.progress").css({width:"0%"});
                            }, 1000);
                        }
                    } else {
                        $(".rp-filter-progress").find(".progress-bar.progress").css({width:"100%"});
                        Reactions.UpdateData($(".aside-list-item.active"));
                        setTimeout(function() {
                            $("body").find(".rp-filter-progress").addClass("none");
                            $(".rp-filter-progress").find(".progress-bar.progress").css({width:"0%"});
                        }, 1000);
                    }
                    if (resp.loop == 1 && resp.page && (resp.page > 0)) {
                        taskActionsPasteProcess(_this, insert, resp.page);
                    } else {
                        _this.removeClass("disabled");
                        setTimeout(function (){
                            Reactions.ReloadActiveAsideListItem();
                        }, 500);
                    }
                } else {
                    _this.removeClass("disabled");
                }
            } else {
                $.alert({
                    title: __("Oops..."),
                    content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
                    theme: 'modern',
                    buttons: {
                        confirm: {
                            text: __("Try Again"),
                            btnClass: "small button btn-red",
                            keys: ['enter'],
                            action: function() {
                                taskActionsPasteProcess(_this, insert, page);
                            }
                        },
                        cancel: {
                            text: __("Close"),
                            btnClass: "small button button--red--outline",
                            keys: ['esc'],
                            action: function() {
                                _this.removeClass("disabled");
                            }
                        }
                    },
                    draggable: false,
                    closeIcon: true,
                    closeIcon: function() {
                        _this.removeClass("disabled");
                    },
                    icon: 'icon-close',
                    type: 'red'
                });
            }
        }
    });
}

/**
 * Task Action: Merge settings
 */
$("body").on("click", ".js-task-action-merge", function() {
    var _this = $(this);
    var reactions_merge_popup = $("#reactions-merge-popup");
    var merge_actions = [
        "autopilot",
        "targeting",
        "messages",
        "story-actions",
        "mass-actions",
        "send-dm",
        "restrict-comments",
        "u-fn-filter",
        "gender-by-name",
        "filter-by-id",
        "reply-pending-dm",
        "welcome-dm",
        "lang-filtration",
        "telegram",
        "activity-time",
        "custom-delay",
        "accelerators",
        "custom-proxy",
        "source-tracking",
        "track-only-new-followers",
        "target-quality-tracking",
        "expiration",
        "debug-mode",
        "keywords-cleaner",
        "use-get-likers",
        "no-stories",
        "labels",
        "async",
        "mqtt",
        "reset-hl",
        "open-ai",
        "country-filter",
        "metrics-filter",
        "close-friends"
    ];

    _this.addClass("disabled");

    var data = {};
    data["action"] = "merge";
    data["insert"] = JSON.parse(window.localStorage.getItem("reactions-clipboard"));

    merge_actions.forEach(ma => {
        data["merge_" + ma] = localStorage.getItem("merge_" +  ma + "_state") == 1 ? 1 : 0;
        data["merge_" + ma + "_type"] = localStorage.getItem("merge_" +  ma + "_type") == "replace" ? "replace" : "merge";
    });

    // console.log(data);

    reactions_merge_popup.modal('hide');

    taskActionsMergeProcess(_this, data);
});

var taskActionsMergeProcess = function(_this, data, page = 0) {
    data["page"] = page;
    $.ajax({
        url: _this.attr("data-url"),
        type: "POST",
        dataType: 'jsonp',
        data: data,
        error: function() {
            $.alert({
                title: __("Oops..."),
                content: __("An error occured. Please try again later!"),
                theme: 'modern',
                buttons: {
                    confirm: {
                        text: __("Try Again"),
                        btnClass: "small button btn-red",
                        keys: ['enter'],
                        action: function() {
                            taskActionsMergeProcess(_this, data, page);
                        }
                    },
                    cancel: {
                        text: __("Close"),
                        btnClass: "small button button--red--outline",
                        keys: ['esc'],
                        action: function() {
                            _this.removeClass("disabled");
                        }
                    }
                },
                draggable: false,
                closeIcon: true,
                closeIcon: function() {
                    _this.removeClass("disabled");
                },
                icon: 'icon-close',
                type: 'red'
            });
        },
        success: function(resp) {
            _this.removeClass("disabled");
            if (resp.result == 1) {
                if (resp.updated && $.isArray(resp.updated)) {
                    // resp.updated.forEach(up => {
                    //     var l_item = $("body").find(".js-list-item[data-id=" + up + "]");
                    //     if (l_item.length > 0) {
                    //         Reactions.UpdateData(l_item);
                    //     }
                    // });
                    if (resp.procentage && resp.procentage > 0) {
                        $(".rp-filter-progress").removeClass("none");
                        $(".rp-filter-progress").find(".progress-bar.progress").css({width:resp.procentage.toFixed(2)+"%"});
                        if (resp.procentage == 100) {
                            Reactions.UpdateData($(".aside-list-item.active"));
                            setTimeout(function() {
                                $("body").find(".rp-filter-progress").addClass("none");
                                $(".rp-filter-progress").find(".progress-bar.progress").css({width:"0%"});
                            }, 1000);
                        }
                    } else {
                        $(".rp-filter-progress").find(".progress-bar.progress").css({width:"100%"});
                        Reactions.UpdateData($(".aside-list-item.active"));
                        setTimeout(function() {
                            $("body").find(".rp-filter-progress").addClass("none");
                            $(".rp-filter-progress").find(".progress-bar.progress").css({width:"0%"});
                        }, 1000);
                    }
                    if (resp.loop == 1 && resp.page && (resp.page > 0)) {
                        taskActionsMergeProcess(_this, data, resp.page);
                    } else {
                        _this.removeClass("disabled");
                        setTimeout(function (){
                            Reactions.ReloadActiveAsideListItem();
                        }, 500);
                    }
                } else {
                    _this.removeClass("disabled");
                }
            } else {
                $.alert({
                    title: __("Oops..."),
                    content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
                    theme: 'modern',
                    buttons: {
                        confirm: {
                            text: __("Try Again"),
                            btnClass: "small button btn-red",
                            keys: ['enter'],
                            action: function() {
                                taskActionsMergeProcess(_this, data, page);
                            }
                        },
                        cancel: {
                            text: __("Close"),
                            btnClass: "small button button--red--outline",
                            keys: ['esc'],
                            action: function() {
                                _this.removeClass("disabled");
                            }
                        }
                    },
                    draggable: false,
                    closeIcon: true,
                    closeIcon: function() {
                        _this.removeClass("disabled");
                    },
                    icon: 'icon-close',
                    type: 'red'
                });
            }
        }
    });
}

Reactions.Settings = function()
{
    var settings = $("#settings");
    var form =  settings.find(".js-ajax-form");

    // Task status filter
    form.find(":input[name=task-status]").on("change", function() {
        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        var overflow = form.find(".reactions-overflow");

        data = $.param({
            task_status: $(this).val(),
            q: form.find(":input[name=task-filter-search]").val()
        });

        var duration = 200;
        search_timer = setTimeout(function(){
            overflow.addClass("onprogress");
            $.ajax({
                url: $form.attr("action"),
                dataType: 'html',
                data: data,
                complete: function() {
                    overflow.removeClass('onprogress');
                },
                success: function(resp) {
                    $resp = $(resp);
                    if ($resp.find(".reactions-overflow").length == 1) {
                        $(".reactions-overflow").html($resp.find(".reactions-overflow").html());
                    } else {
                        $(".reactions-overflow").html("");
                    }
                    if ($resp.find(".reactions-settings-loadmore").length == 1) {
                        $(".reactions-settings-loadmore").html($resp.find(".reactions-settings-loadmore").html());
                    } else {
                        $(".reactions-settings-loadmore").html("");
                    }
                }
            });
        }, duration);
    });

    // PID status filter
    form.find(":input[name=pid-status]").on("change", function() {
        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        var overflow = form.find(".reactions-overflow");

        data = $.param({
            pid_status: $(this).val(),
            q: form.find(":input[name=task-filter-search]").val()
        });

        var duration = 200;
        search_timer = setTimeout(function(){
            overflow.addClass("onprogress");
            $.ajax({
                url: $form.attr("action"),
                dataType: 'html',
                data: data,
                complete: function() {
                    overflow.removeClass('onprogress');
                },
                success: function(resp) {
                    $resp = $(resp);
                    if ($resp.find(".reactions-overflow").length == 1) {
                        $(".reactions-overflow").html($resp.find(".reactions-overflow").html());
                    } else {
                        $(".reactions-overflow").html("");
                    }
                    if ($resp.find(".reactions-settings-loadmore").length == 1) {
                        $(".reactions-settings-loadmore").html($resp.find(".reactions-settings-loadmore").html());
                    } else {
                        $(".reactions-settings-loadmore").html("");
                    }
                }
            });
        }, duration);
    });

    // Keyword filter
    form.find(":input[name=task-filter-search]").on("paste keyup input change", function() {
        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        var overflow = form.find(".reactions-overflow");

        data = $.param({
            q: form.find(":input[name=task-filter-search]").val()
        });

        var duration = 200;
        search_timer = setTimeout(function(){
            overflow.addClass("onprogress");
            $.ajax({
                url: $form.attr("action"),
                dataType: 'html',
                data: data,
                complete: function() {
                    overflow.removeClass('onprogress');
                },
                success: function(resp) {
                    $resp = $(resp);
                    if ($resp.find(".reactions-overflow").length == 1) {
                        $(".reactions-overflow").html($resp.find(".reactions-overflow").html());
                    } else {
                        $(".reactions-overflow").html("");
                    }
                    if ($resp.find(".reactions-settings-loadmore").length == 1) {
                        $(".reactions-settings-loadmore").html($resp.find(".reactions-settings-loadmore").html());
                    } else {
                        $(".reactions-settings-loadmore").html("");
                    }
                }
            });
        }, duration);
    });

    // Custom labels filter
    form.find(".js-rp-custom-labels-manager").on("click", function() {
        var _this = $(this);

        if (_this.hasClass('button--light-outline')) {
            _this.removeClass('button--light-outline');
        } else {
            _this.addClass('button--light-outline');
        }

        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        var overflow = form.find(".reactions-overflow");

        data = $.param({
            q: form.find(":input[name=task-filter-search]").val(),
            custom_label: _this.data("custom-label"),
            update_filters: 1
        });

        var duration = 200;
        search_timer = setTimeout(function(){
            overflow.addClass("onprogress");
            $.ajax({
                url: $form.attr("action"),
                dataType: 'html',
                data: data,
                complete: function() {
                    overflow.removeClass('onprogress');
                },
                success: function(resp) {
                    $resp = $(resp);
                    if ($resp.find(".reactions-overflow").length == 1) {
                        $(".reactions-overflow").html($resp.find(".reactions-overflow").html());
                    } else {
                        $(".reactions-overflow").html("");
                    }
                    if ($resp.find(".reactions-settings-loadmore").length == 1) {
                        $(".reactions-settings-loadmore").html($resp.find(".reactions-settings-loadmore").html());
                    } else {
                        $(".reactions-settings-loadmore").html("");
                    }
                }
            });
        }, duration);
    });

    // Flush Redis Cache
    form.find(".js-rp-settings-flushdb").on("click", function() {
        console.log("Flush Redis Cache");
        var _this = $(this);
        var url = _this.data("url");

        if (!_this.hasClass('disabled')) {
            var flush_button = _this.html();

            _this.addClass("disabled");

            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "redis-flushdb",
                },
                error: function() {
                    _this.removeClass("disabled");
                    specialAlertResponse();
                },
                success: function(resp) {
                    _this.removeClass("disabled");
                    if (resp.result == 1) {
                        _this.html(__("Redis Cache cleared"));
                        _this.removeClass("js-rp-settings-flushdb");
                        _this.addClass("reactions-copyhelper-done");
                        setTimeout(function (){
                            _this.html(flush_button);
                            _this.addClass("js-rp-settings-flushdb");
                            _this.removeClass("reactions-copyhelper-done");
                        }, 2000);
                    } else {
                        specialAlertResponse(resp);
                    }
                }
            });
        }
    });

    var validate_timer;
    var validate_xhr;

    // Validate OpenAI (Chat GPT) API Key
    form.find(":input[name=openai-key]").on("paste input change", function() {
        if (validate_xhr) {
            // Abort previous ajax request
            validate_xhr.abort();
        }

        if (validate_timer) {
            clearTimeout(validate_timer);
        }

        var duration = 1000;
        validate_timer = setTimeout(function(){
            $.ajax({
                url: $form.attr("action"),
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action: "openai",
                    "openai-key": form.find(":input[name=openai-key]").val(),
                    "openai-technical": form.find(":input[name=openai-technical]").is(":checked") ? 1 : 0
                },
                success: function(resp) {
                    if (resp.openai) {
                        $.ajax({
                            url: $form.attr("action"),
                            dataType: 'html',
                            success: function(resp) {
                                $resp = $(resp);
                                if ($resp.find(".js-openai-status").length == 1) {
                                    $(".js-openai-status").html($resp.find(".js-openai-status").html());
                                } else {
                                    $(".js-openai-status").html("");
                                }
                            }
                        });
                    }
                }
            });
        }, duration);
    });

    window.loadmore.success = function($item) {
        NextPost.Tooltip();
        Reactions.TaskActions();
    }
}

Reactions.CreateSlider = function(
    _sliderName,
    startMin,
    startMax,
    rangeMin,
    rangeMax)
{
    function setTooltipInputWidth(input) {
        input.style.width = ((input.value.length + 2) * 8) + 'px';
    }

    function makeTT(i, slider, className) {
        var tooltip = document.createElement('div'),
            input = document.createElement('input');

        // Set class name
        input.className = className + ' np-slider-tooltip';
        input.name = className;

        // Add the input to the tooltip
        tooltip.className = 'noUi-tooltip';
        tooltip.appendChild(input);

        // On change, set the slider
        input.addEventListener('change', function() {
            var values = [null, null];
            values[i] = this.value;
            slider.noUiSlider.set(values);
            setTooltipInputWidth(this);
        });

        input.addEventListener('focus', function() {
            $(slider.tooltipInputs[0]).closest('.noUi-origin')[0].style.zIndex = 4;
            $(slider.tooltipInputs[1]).closest('.noUi-origin')[0].style.zIndex = 4;
            $(this).closest('.noUi-origin')[0].style.zIndex = 5;
        })

        // Find the lower/upper slider handle and insert the tooltip
        slider.querySelector(i ? '.noUi-handle-upper' : '.noUi-handle-lower').appendChild(tooltip);

        return input;
    }

    var currentSlider = document.getElementById(_sliderName);
    var _inputNameOne = "followers-min";
    var _inputNameTwo = "followers-max";
    if (currentSlider) {
        // Create slider
        if (_sliderName == "FollowersSlider") {
            noUiSlider.create(currentSlider, {
                start: [startMin, startMax],
                range: {
                    'min': [rangeMin],
                    '5%' : [10],
                    '20%': [100],
                    '50%': [5000],
                    '70%': [10000],
                    '80%': [100000],
                    '90%': [1000000],
                    'max': [rangeMax],
                },
                pips: {
                    mode: 'range',
                    density: 10,
                    stepped: true
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0,
                    thousands: ' '
                })
            });
        } else if (_sliderName == "FollowingSlider") {
            noUiSlider.create(currentSlider, {
                start: [startMin, startMax],
                range: {
                    'min': [rangeMin],
                    '5%' : [10],
                    '20%': [100],
                    'max': [rangeMax],
                },
                pips: {
                    mode: 'range',
                    density: 5
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0,
                    thousands: ' '
                })
            });
            var _inputNameOne = "followings-min";
            var _inputNameTwo = "followings-max";
        } else if (_sliderName == "PostsSlider") {
            noUiSlider.create(currentSlider, {
                start: [startMin, startMax],
                range: {
                    'min': [rangeMin],
                    '5%' : [10],
                    '20%': [100],
                    'max': [rangeMax],
                },
                pips: {
                    mode: 'range',
                    density: 5
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0,
                    thousands: ' '
                })
            });
            var _inputNameOne = "posts-min";
            var _inputNameTwo = "posts-max";
        } else if (_sliderName == "LastPostedSlider") {
            noUiSlider.create(currentSlider, {
                start: [startMin, startMax],
                range: {
                    'min': [rangeMin],
                    '5%' : [10],
                    '20%': [100],
                    'max': [rangeMax],
                },
                pips: {
                    mode: 'range',
                    density: 5
                },
                connect: [false, true, false],
                format: wNumb({
                    decimals: 0,
                    thousands: ' '
                })
            });
            var _inputNameOne = "last-posted-min";
            var _inputNameTwo = "last-posted-max";
        }

        // An 0/1 indexed array of input elements
        currentSlider.tooltipInputs = [makeTT(0, currentSlider, _inputNameOne), makeTT(1, currentSlider, _inputNameTwo)];

        // When the slider changes, update the tooltip
        currentSlider.noUiSlider.on('update', function(values, handle) {
            this.target.tooltipInputs[handle].value = values[handle];
            setTooltipInputWidth(this.target.tooltipInputs[handle]);
        });
    }
}

Reactions.UpdateTargetsCount = function(){
    var $form = $(".js-reactions-schedule-form");
    var targets_count = 0;
    $form.find(".tag").each(function() {
        targets_count++;
    });
    $("body").find(".targets-count").html(targets_count);
}

Reactions.UpdateAcceleratorsCount = function(){
    var accelerators_count = 0;
    $("body").find(".accelerators .accelerator").each(function() {
        accelerators_count++;
    });
    $("body").find(".accelerators-count").html(accelerators_count);
}

Reactions.Togglers = function(){
    var togglers_list = [
        "targeting",
        "story-actions",
        "mass-actions",
        "send-dm",
        "welcome-dm",
        "restrict-comments",
        "u-fn-filter",
        "gender-by-name",
        "filter-by-id",
        "reply-pending-dm",
        "filtration",
        "lang-filtration",
        "telegram",
        "custom-delay",
        "accelerators",
        "custom-proxy",
        "activity-time",
        "autopilot",
        "safety-business-page",
        "safety-business-manager",
        "safety-recommendations",
        "recent-activity",
        "break-recommendations",
        "source-tracking",
        "track-only-new-followers",
        "quality-tracking",
        "expiration",
        "debug-mode",
        "async",
        "mqtt",
        "task-actions-labels",
        "task-actions-all",
        "task-actions-filters",
        "additional",
        "open-ai",
        "country-filter",
        "metrics-filter",
        "close-friends"
    ];

    togglers_list.forEach(tgglr => {
        var rp_container = $("body").find(".rp-" + tgglr);
        var account_id = rp_container.attr("data-account-id");
        var rp_button = $("body").find(".rp-" + tgglr + "-toggler");

        $("body").find(".rp-" + tgglr + "-toggler").off("click").on("click", function() {
            rp_container.toggleClass("none");
            if (!rp_container.hasClass("none")) {
                localStorage.setItem("rp_" + tgglr + "_state_" + account_id, 1);
                rp_button.addClass("opened");
                rp_button.find(".mdi").removeClass("mdi-arrow-down");
                rp_button.find(".mdi").addClass("mdi-arrow-up");
            } else {
                localStorage.setItem("rp_" + tgglr + "_state_" + account_id, 0);
                rp_button.removeClass("opened");
                rp_button.find(".mdi").removeClass("mdi-arrow-up")
                rp_button.find(".mdi").addClass("mdi-arrow-down")
            }
        });

        var state = localStorage.getItem("rp_" + tgglr + "_state_" + account_id);
        if (state == 1) {
            rp_container.removeClass("none");
            rp_button.addClass("opened");
            rp_button.find(".mdi").removeClass("mdi-arrow-down");
            rp_button.find(".mdi").addClass("mdi-arrow-up");
        } else if (state == null && (tgglr == "safety-recommendations" || tgglr == "autopilot")) {
            rp_container.removeClass("none");
            rp_button.addClass("opened");
            rp_button.find(".mdi").removeClass("mdi-arrow-down");
            rp_button.find(".mdi").addClass("mdi-arrow-up");
        }
    });

    $("body").find(":input[name='type']").on("change", function() {
        var type = $("body").find(":input[type='radio'][name='type']:checked").val();
        if (type == "user_id_list") {
            $("body").find(".targets-cp").addClass("none");
            $("body").find(".user-id-cp").removeClass("none");
            $("body").find(".tlb-insert").html(__("Insert ID"));
            $("body").find(".copy-targets-popup").html(__("Copy ID"));
            $("body").find(".js-copy-all-targets").addClass("none");
            $("body").find(".js-insert-all-targets").addClass("none");
        } else {
            $("body").find(".targets-cp").removeClass("none");
            $("body").find(".user-id-cp").addClass("none");
            $("body").find(".tlb-insert").html(__("Targets list"));
            $("body").find(".copy-targets-popup").html(__("Copy targets"));
            $("body").find(".js-copy-all-targets").removeClass("none");
            $("body").find(".js-insert-all-targets").removeClass("none");
        }
    });

    $("body").find(".rp-safety-confirm-toggler").off("click").on("click", function() {
        $("body").find(".rp-safety-recommendations-toggler").trigger("click");
    });
}

var merge_actions = [
    "autopilot",
    "targeting",
    "messages",
    "story-actions",
    "mass-actions",
    "send-dm",
    "restrict-comments",
    "u-fn-filter",
    "gender-by-name",
    "filter-by-id",
    "reply-pending-dm",
    "welcome-dm",
    "lang-filtration",
    "telegram",
    "activity-time",
    "custom-delay",
    "accelerators",
    "custom-proxy",
    "source-tracking",
    "track-only-new-followers",
    "target-quality-tracking",
    "expiration",
    "debug-mode",
    "keywords-cleaner",
    "labels",
    "async",
    "mqtt",
    "reset-hl",
    "use-get-likers",
    "no-stories",
    "open-ai",
    "country-filter",
    "metrics-filter",
    "close-friends"
];
merge_actions.forEach(ma => {
    var rp_checkbox = $("body").find(":input[name='merge_" + ma + "']");
    var rp_container = $("body").find(".js-merge-toggle-" + ma);
    var rp_merge_type = $("body").find(":input[name='merge_" + ma + "_type']");

    var state = localStorage.getItem("merge_" +  ma + "_state");
    if (state == 1) {
        rp_checkbox.prop("checked", true);
        rp_container.removeClass("none");
    } else {
        rp_checkbox.prop("checked", false);
        rp_container.addClass("none");
    }

    var type_state = localStorage.getItem("merge_" +  ma + "_type");
    if (type_state == "replace") {
        $("body").find(":input[name='merge_" + ma + "_type'][value=replace]").prop("checked", true);
    } else {
        $("body").find(":input[name='merge_" + ma + "_type'][value=merge]").prop("checked", true);
    }

    rp_checkbox.on("click", function() {
        var _this = $(this);
        if (!_this.is(":checked")) {
            _this.prop("checked", false);
            localStorage.setItem("merge_" +  ma + "_state", 0);
            rp_container.addClass("none");
        } else {
            _this.prop("checked", true);
            localStorage.setItem("merge_" +  ma + "_state", 1);
            rp_container.removeClass("none");
        }
    });

    rp_merge_type.on("click", function() {
        var _this = $(this);
        localStorage.setItem("merge_" +  ma + "_type", _this.val());
    });
});

Reactions.SettingsTogglers = function(){
    var togglers_list = [
        "license",
        "github",
        "cloudflare",
        "redis",
        "digitalocean-spaces",
        "scraping",
        "additional",
        "break-recommendations",
        "cronjob",
        "task-logs-delay",
        "hard-limits",
        "delays",
        "autopilot",
        "blocks",
        "telegram",
        "maintenance",
        "expiration",
        "openai",
        "hikerapi"
    ];

    togglers_list.forEach(tgglr => {
        var rp_container = $("body").find(".rp-settings-" + tgglr);
        var rp_button = $("body").find(".rp-settings-" + tgglr + "-toggler");

        $("body").find(".rp-settings-" + tgglr + "-toggler").off("click").on("click", function() {
            rp_container.toggleClass("none");
            if (!rp_container.hasClass("none")) {
                localStorage.setItem("rp_settings_" + tgglr + "_state", 1);
                rp_button.addClass("opened");
                rp_button.find(".mdi").removeClass("mdi-arrow-down");
                rp_button.find(".mdi").addClass("mdi-arrow-up");
            } else {
                localStorage.setItem("rp_settings_" + tgglr + "_state", 0);
                rp_button.removeClass("opened");
                rp_button.find(".mdi").removeClass("mdi-arrow-up")
                rp_button.find(".mdi").addClass("mdi-arrow-down")
            }
        });

        var state = localStorage.getItem("rp_settings_" + tgglr + "_state");
        if (state == 1) {
            rp_container.removeClass("none");
            rp_button.addClass("opened");
            rp_button.find(".mdi").removeClass("mdi-arrow-down");
            rp_button.find(".mdi").addClass("mdi-arrow-up");
        } else if (state == null && (tgglr == "license")) {
            rp_container.removeClass("none");
            rp_button.addClass("opened");
            rp_button.find(".mdi").removeClass("mdi-arrow-down");
            rp_button.find(".mdi").addClass("mdi-arrow-up");
        }
    });
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

Reactions.Togglers();

/**
 * Best results filter for source tracking in statistics
 */
$("body").on("click", ".js-source-tracking-filter", function() {
    var _this = $(this);
    var sort_type = _this.attr("data-sort-type");
    if (sort_type == "like") {
        $("body").find(".react-stats-line").sort(function(a, b) {
            a = $(a).find(".react-stats-main-count").attr("data-like-count");
            b = $(b).find(".react-stats-main-count").attr("data-like-count");
            return b - a;
        }).appendTo(".react-stats-row");
    } else if (sort_type == "follow") {
        $("body").find(".react-stats-line").sort(function(a, b) {
            a = $(a).find(".react-stats-main-count").attr("data-follow-count");
            b = $(b).find(".react-stats-main-count").attr("data-follow-count");
            return b - a;
        }).appendTo(".react-stats-row");
    } else if (sort_type == "best") {
        $("body").find(".react-stats-line").sort(function(a, b) {
            a = $(a).find(".react-stats-main-count").attr("data-like-count");
            b = $(b).find(".react-stats-main-count").attr("data-like-count");
            return b - a;
        }).appendTo(".react-stats-row");
        $("body").find(".react-stats-line").sort(function(a, b) {
            a = $(a).find(".react-stats-main-count").attr("data-follow-count");
            b = $(b).find(".react-stats-main-count").attr("data-follow-count");
            return b - a;
        }).appendTo(".react-stats-row");
    }
});

/**
 * Reactions Pro Selectize
 */
Reactions.Selectize = function() {
    var cl_options = [];
    var cl_labels = $('#custom-labels').data("custom-labels");

    if (cl_labels) {
        var cl_array = cl_labels.split(',');
        if (cl_array.length > 0) {
            cl_array.forEach(element => {
                cl_options.push({
                    "value": element,
                    "text": element
                });
            });
        }
    }

    $('#custom-labels').selectize({
        plugins: ['remove_button', 'drag_drop'],
        delimiter: ',',
        persist: false,
        options: cl_options,
        create: function(input) {
            return {
                value: input,
                text: input
            }
        },
        onItemAdd: function (input) {
            var active_schedule = $(".aside-list-item.active");
            var labels = $(".js-reactions-schedule-form").find(":input[name='custom-labels']").val();

            $.ajax({
                url: active_schedule.data("url"),
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action:         "update_labels",
                    id:             active_schedule.data("id"),
                    custom_labels:  (labels ? (labels + (input ? ("," + input) : "")) : input),
                },
                error: function() {
                    NextPost.Alert({
                        title: __("Oops..."),
                        content: resp.msg ? resp.msg : __("An error occured. Please try again later!"),
                        confirmText: __("Close"),
                        confirm: function() {
                            if (resp.redirect) {
                                window.location.href = resp.redirect;
                            }
                        }
                    });
                },
                success: function(resp) {
                    if (resp.result == 1) {
                        if (resp.new_cls_array && $.isArray(resp.new_cls_array)) {
                            resp.new_cls_array.forEach(el => {
                                if ($("body").find('.js-rp-bulk-filter[data-custom-label="' + el + '"]').length > 0) {
                                    // Already added
                                } else {
                                    $("body").find(".rp-custom-labels-filters").append('<a class="js-rp-bulk-filter rp-bulk-btn mr-5 mb-5" href="javascript:void(0)" data-custom-label="' + el + '"><span class="rp-bulk-btntext">' + el + '</span></a>');
                                }
                            });
                            // Check removed labels
                            $("body").find(".js-rp-bulk-filter").each(function () {
                                var label = $(this).data("custom-label");
                                if ($.inArray(label, resp.new_cls_array) === -1) {
                                    $(this).remove();
                                    $("body").find('.reactions-custom-label[data-custom-label="' + label + '"]').remove();
                                }
                            });
                        } else {
                            $("body").find(".js-rp-bulk-filter").remove();
                            $("body").find(".reactions-custom-label").remove();
                        }

                        if (resp.cl_array && $.isArray(resp.cl_array)) {
                            resp.cl_array.forEach(el => {
                                if (active_schedule.find('.reactions-custom-label[data-custom-label="' + el + '"]').length > 0) {
                                    // Already added
                                } else {
                                    active_schedule.find(".reactions-task-custom-labels").append('<span class="mt-10 mr-5 mb-5 d-inline-block reactions-custom-label" data-custom-label="' + el + '">' + el + '</span>');
                                }
                            });
                            // Check removed labels for task
                            active_schedule.find(".reactions-custom-label").each(function () {
                                var label = $(this).data("custom-label");
                                if ($.inArray(label, resp.cl_array) === -1) {
                                    $(this).remove();
                                }
                            });
                        } else {
                            active_schedule.find(".reactions-custom-label").remove();
                        }
                    }
                }
            });
        },
        onItemRemove: function (input) {
            var active_schedule = $(".aside-list-item.active");
            var labels = $(".js-reactions-schedule-form").find(":input[name='custom-labels']").val();

            $.ajax({
                url: active_schedule.data("url"),
                type: 'POST',
                dataType: 'jsonp',
                data: {
                    action:         "update_labels",
                    id:             active_schedule.data("id"),
                    custom_labels:  labels,
                },
                error: function() {
                    NextPost.Alert({
                        title: __("Oops..."),
                        content: resp.msg ? resp.msg : __("An error occured. Please try again later!"),
                        confirmText: __("Close"),
                        confirm: function() {
                            if (resp.redirect) {
                                window.location.href = resp.redirect;
                            }
                        }
                    });
                },
                success: function(resp) {
                    if (resp.result == 1) {
                        if (resp.new_cls_array && $.isArray(resp.new_cls_array)) {
                            resp.new_cls_array.forEach(el => {
                                if ($("body").find('.js-rp-bulk-filter[data-custom-label="' + el + '"]').length > 0) {
                                    // Already added
                                } else {
                                    $("body").find(".rp-custom-labels-filters").append('<a class="js-rp-bulk-filter rp-bulk-btn mr-5 mb-5" href="javascript:void(0)" data-custom-label="' + el + '"><span class="rp-bulk-btntext">' + el + '</span></a>');
                                }
                            });
                            // Check removed labels
                            $("body").find(".js-rp-bulk-filter").each(function () {
                                var label = $(this).data("custom-label");
                                if ($.inArray(label, resp.new_cls_array) === -1) {
                                    $(this).remove();
                                    $("body").find('.reactions-custom-label[data-custom-label="' + label + '"]').remove();
                                }
                            });
                        } else {
                            $("body").find(".js-rp-bulk-filter").remove();
                            $("body").find(".reactions-custom-label").remove();
                        }

                        if (resp.cl_array && $.isArray(resp.cl_array)) {
                            resp.cl_array.forEach(el => {
                                if (active_schedule.find('.reactions-custom-label[data-custom-label="' + el + '"]').length > 0) {
                                    // Already added
                                } else {
                                    active_schedule.find(".reactions-task-custom-labels").append('<span class="mt-10 mr-5 mb-5 d-inline-block reactions-custom-label" data-custom-label="' + el + '">' + el + '</span>');
                                }
                            });
                            // Check removed labels for task
                            active_schedule.find(".reactions-custom-label").each(function () {
                                var label = $(this).data("custom-label");
                                if ($.inArray(label, resp.cl_array) === -1) {
                                    $(this).remove();
                                }
                            });
                        } else {
                            active_schedule.find(".reactions-custom-label").remove();
                        }
                    }
                }
            });
        }
    });

    var cf_labels = $('.rp-country-filter').data("country-filter");
    var cf_options = [];
    if (cf_labels) {
        var cf_array = cf_labels.split(',');
        if (cf_array.length > 0) {
            cf_array.forEach(element => {
                cf_options.push({
                    "value": element,
                    "text": element
                });
            });
        }
    }

    $('#country-filter-whitelist,#country-filter-blacklist').selectize({
        plugins: ['remove_button', 'drag_drop'],
        delimiter: ',',
        persist: false,
        options: cf_options
    });
}

Reactions.BackupActions = function() {
    $("body").off("click", ".js-reactions-backup-download,.js-reactions-backup-delete").on("click", ".js-reactions-backup-download,.js-reactions-backup-delete", function() {
        var _this = $(this);
        $.ajax({
            url: _this.data("url"),
            type: "POST",
            dataType: 'jsonp',
            data: {
                action: _this.hasClass('js-reactions-backup-delete') ? 'delete' : 'download',
                filename: _this.data("filename")
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
                    if (resp.deleted == 1) {
                        _this.parent().remove();
                    } else if (resp.download_link) {
                        var link = document.createElement('a');
                        document.body.appendChild(link);
                        link.setAttribute('download', '');
                        link.href = resp.download_link;
                        link.click();
                        link.remove();
                    }
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
}
Reactions.BackupActions();

/**
 * GitHub Actions
 */
$("body").on("click", "a.js-reactions-latest-install-version,a.js-reactions-install-selected-version,a.js-reactions-create-backup", function() {
    var _this = $(this);

    var version = 'latest';
    if (!_this.hasClass('js-reactions-latest-install-version')) {
        version = $("body").find(".github-version-select").val();
    }
    var action = 'update';
    if (_this.hasClass('js-reactions-create-backup')) {
        action = 'backup'
        showToast(__("Creating the backup file."), {
            duration: 5000,
            background: '#11b85e',
            color: '#fff',
            borderRadius: '5px',
            icon_style: 'mdi mdi-checkbox-marked-circle-outline',
            close: true,
            progressBar: false
        });
    }

    $.ajax({
        url: _this.data("url"),
        type: "POST",
        dataType: 'jsonp',
        data: {
            action: action,
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
                    $("body").find(".reactions-version-value").text(resp.version);
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
                if (_this.hasClass('js-reactions-create-backup')) {
                    $.ajax({
                        url: _this.attr("data-page-url"),
                        type: 'GET',
                        dataType: 'html',
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
                            $resp = $(resp);
                            if ($resp.find(".reactions-backup-files").length == 1) {
                                $(".reactions-backup-files").html($resp.find(".reactions-backup-files").html());
                            }
                            Reactions.BackupActions();
                        }
                    });
                }
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
 * Download Actions
 */
Reactions.DownloadActions = function() {
    var _stopLoop = false;
    var _action = 'start';
    var loading = $(".rp-download-actions-loading");

    $("body").off("click", ".js-download-actions").on("click", ".js-download-actions", function() {
        var url = $(this).data("url");
        var type = $(this).data("type");
        if (!$(this).hasClass('disabled')) {
            $(this).addClass('disabled');
            loading.find(".progress-bar.progress").css({width:"0%"});
            loading.removeClass("none");
            downloadActionsLoop(url, type, 1);
        }
    });

    var downloadActionsLoop = function(url, type, active) {
        downloadActionsLoader(url, type, active, function (active) {
            if (!_stopLoop) {
                if (active) {
                    const ahInterval = setInterval(function () {
                        clearInterval(ahInterval);
                        downloadActionsLoop(url, type, active);
                    }, 1000);
                }
            }
        });
    }

    var downloadFile = function (urlToSend, filename) {
        var req = new XMLHttpRequest();
        req.open("GET", urlToSend, true);
        req.responseType = "blob";
        req.onload = function (event) {
            var blob = req.response;
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        };
        req.send();
    }

    var downloadActionsLoader = function(url, type, active, callback) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: {
                action: _action,
                type: type,
            },
            error: function() {
                $.alert({
                    title: __("Oops..."),
                    content: __("An error occured. Please try again later!"),
                    theme: 'modern',
                    buttons: {
                        confirm: {
                            text: __("Try Again"),
                            btnClass: "small button btn-red",
                            keys: ['enter'],
                            action: function() {
                                loading.removeClass("none");
                                _action = 'start';
                                callback(1);
                            }
                        },
                        cancel: {
                            text: __("Close"),
                            btnClass: "small button button--red--outline",
                            keys: ['esc'],
                            action: function() {
                                $(".js-download-actions").removeClass('disabled');
                                loading.addClass("none");
                                callback(0);
                            }
                        }
                    },
                    draggable: false,
                    closeIcon: true,
                    closeIcon: function() {
                        $(".js-download-actions").removeClass('disabled');
                        loading.addClass("none");
                        callback(0);
                    },
                    icon: 'icon-close',
                    type: 'red'
                });
            },
            success: function(resp) {
                if (resp.result == 1) {
                    if (_action == "start") {
                        if (resp.msg) {
                            $(".rp-download-actions-loading-msg").text(resp.msg);
                        }
                        _action = "status";
                        callback(1);
                    } else if (_action == "status") {
                        if (resp.ready) {
                            loading.find(".progress-bar.progress").css({width:"100%"});
                            setTimeout(function (){
                                _action = 'start';
                                if (resp.download_url && resp.filename) {
                                    downloadFile(resp.download_url, resp.filename)
                                }
                                loading.addClass("none");
                                loading.find(".progress-bar.progress").css({width:"0%"});
                                if (resp.msg) {
                                    $(".rp-download-actions-loading-msg").text(resp.msg);
                                }
                                $(".js-download-actions").removeClass('disabled');
                                callback(0);
                            }, 1000);
                        } else {
                            if (resp.msg) {
                                $(".rp-download-actions-loading-msg").text(resp.msg);
                            }
                            if (resp.procentage && resp.procentage > 0) {
                                loading.find(".progress-bar.progress").css({width:resp.procentage.toFixed(2)+"%"});
                            }
                            callback(1);
                        }
                    } else {
                        if (resp.msg) {
                            $(".rp-download-actions-loading-msg").text(resp.msg);
                        }
                        callback(0);
                    }
                } else {
                    $.alert({
                        title: __("Oops..."),
                        content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
                        theme: 'modern',
                        buttons: {
                            confirm: {
                                text: __("Try Again"),
                                btnClass: "small button btn-red",
                                keys: ['enter'],
                                action: function() {
                                    loading.removeClass("none");
                                    callback(1);
                                }
                            },
                            cancel: {
                                text: __("Close"),
                                btnClass: "small button button--red--outline",
                                keys: ['esc'],
                                action: function() {
                                    $(".js-download-actions").removeClass('disabled');
                                    loading.addClass("none");
                                    callback(0);
                                }
                            }
                        },
                        draggable: false,
                        closeIcon: true,
                        closeIcon: function() {
                            $(".js-download-actions").removeClass('disabled');
                            loading.addClass("none");
                            callback(0);
                        },
                        icon: 'icon-close',
                        type: resp ? (resp.type ? resp.type : 'red') : 'red'
                    });
                }
            }
        });
    }
}

/**
 * Results
 */
Reactions.Results = function() {
    var _stopLoop = false;
    var _action = 'start';
    var loading = $(".rp-actions-history-loading");

    $("body").on("click", ".js-trace-results", function() {
        var url = $(this).data("url");
        if (!$(this).hasClass('disabled')) {
            $(this).addClass('disabled');
            loading.find(".progress-bar.progress").css({width:"0%"});
            loading.removeClass("none");
            resultsLoop(url, 1);
        }
    });

    var resultsLoop = function(url, active) {
        resultsLoader(url, active, function (active) {
            if (!_stopLoop) {
                if (active) {
                    const ahInterval = setInterval(function () {
                        clearInterval(ahInterval);
                        resultsLoop(url, active);
                    }, 1000);
                }
            }
        });
    }

    var resultsLoader = function(url, active, callback) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: {
                action: _action,
            },
            error: function() {
                $.alert({
                    title: __("Oops..."),
                    content: __("An error occured. Please try again later!"),
                    theme: 'modern',
                    buttons: {
                        confirm: {
                            text: __("Try Again"),
                            btnClass: "small button btn-red",
                            keys: ['enter'],
                            action: function() {
                                loading.removeClass("none");
                                _action = 'start';
                                callback(1);
                            }
                        },
                        cancel: {
                            text: __("Close"),
                            btnClass: "small button button--red--outline",
                            keys: ['esc'],
                            action: function() {
                                $(".js-trace-results").removeClass('disabled');
                                loading.addClass("none");
                                callback(0);
                            }
                        }
                    },
                    draggable: false,
                    closeIcon: true,
                    closeIcon: function() {
                        $(".js-trace-results").removeClass('disabled');
                        loading.addClass("none");
                        callback(0);
                    },
                    icon: 'icon-close',
                    type: 'red'
                });
            },
            success: function(resp) {
                if (resp.result == 1) {
                    if (_action == "start") {
                        if (resp.msg) {
                            $(".rp-actions-history-loading-msg").text(resp.msg);
                        }
                        _action = "status";
                        callback(1);
                    } else if (_action == "status") {
                        if (resp.error) {
                            if (resp.msg) {
                                $(".rp-actions-history-loading-msg").text(resp.msg);
                            }
                            setTimeout(function (){
                                $(".js-trace-results").removeClass('disabled');
                                loading.addClass("none");
                                callback(0);
                            }, 5000);
                        } else if (resp.ready) {
                            loading.find(".progress-bar.progress").css({width:"100%"});
                            setTimeout(function (){
                                _action = 'start';
                                $(".search-no-result").addClass("none");
                                $(".no-data").addClass("none");
                                loading.addClass("none");
                                loading.find(".progress-bar.progress").css({width:"0%"});
                                if (resp.msg) {
                                    $(".rp-actions-history-loading-msg").text(resp.msg);
                                }
                                $(".js-trace-results").removeClass('disabled');
                                $.ajax({
                                    url: $(".js-trace-results").data("stats-url"),
                                    type: "GET",
                                    dataType: 'html',
                                    success: function(resp) {
                                        $resp = $(resp);
                                        if ($resp.find(".js-actions-history-search-results").length == 1) {
                                            $(".js-actions-history-search-results").html($resp.find(".js-actions-history-search-results").html());
                                        }
                                    }
                                });
                                callback(0);
                            }, 1000);
                        } else {
                            if (resp.msg) {
                                $(".rp-actions-history-loading-msg").text(resp.msg);
                            }
                            if (resp.procentage && resp.procentage > 0) {
                                loading.find(".progress-bar.progress").css({width:resp.procentage.toFixed(2)+"%"});
                            }
                            callback(1);
                        }
                    } else {
                        if (resp.msg) {
                            $(".rp-actions-history-loading-msg").text(resp.msg);
                        }
                        callback(0);
                    }
                } else {
                    $.alert({
                        title: __("Oops..."),
                        content: resp ? ( resp.msg ? resp.msg: __("An error occured. Please try again later!") )  : __("An error occured. Please try again later!"),
                        theme: 'modern',
                        buttons: {
                            confirm: {
                                text: __("Try Again"),
                                btnClass: "small button btn-red",
                                keys: ['enter'],
                                action: function() {
                                    loading.removeClass("none");
                                    callback(1);
                                }
                            },
                            cancel: {
                                text: __("Close"),
                                btnClass: "small button button--red--outline",
                                keys: ['esc'],
                                action: function() {
                                    $(".js-trace-results").removeClass('disabled');
                                    loading.addClass("none");
                                    callback(0);
                                }
                            }
                        },
                        draggable: false,
                        closeIcon: true,
                        closeIcon: function() {
                            $(".js-trace-results").removeClass('disabled');
                            loading.addClass("none");
                            callback(0);
                        },
                        icon: 'icon-close',
                        type: resp ? (resp.type ? resp.type : 'red') : 'red'
                    });
                }
            }
        });
    }
}

Reactions.ResultsSearch = function() {
    $("body").find(":input[name=actions-history-search]").on("paste keyup input change", function() {
        if (search_xhr) {
            // Abort previous ajax request
            search_xhr.abort();
        }

        if (search_timer) {
            clearTimeout(search_timer);
        }

        var overflow = $("body").find(".reactions-overflow");
        var query_ah = $("body").find(":input[name=actions-history-search]").val();

        data = $.param({
            query_ah: query_ah
        });

        var duration = 200;
        search_timer = setTimeout(function(){
            overflow.addClass("onprogress");
            $.ajax({
                url: $(this).data("url"),
                dataType: 'html',
                data: data,
                complete: function() {
                    overflow.removeClass('onprogress');
                },
                success: function(resp) {
                    $resp = $(resp);
                    if ($resp.find(".js-actions-history-search-results").length == 1) {
                        $(".js-actions-history-search-results").html($resp.find(".js-actions-history-search-results").html());
                    }
                    if (query_ah.length > 0) {
                        $(".rp-actions-history-search").addClass("search-performed");
                    } else {
                        $(".rp-actions-history-search").removeClass("search-performed");
                    }
                }
            });
        }, duration);
    });

    /**
     * Cancel search
     */
    $("body").find(".rp-actions-history-search .cancel-icon").on("click", function() {
        $("body").find(":input[name='actions-history-search']").val("").trigger('keyup');
    });
}

/**
 * Realtime Messaging (MQTT)
 */
Reactions.RealtimeActivityChecker = function() {
    $("body").find(":input[name='show-only-mqtt-logs']").off("click").on("click", function() {
        $.ajax({
            url: $(this).data("url"),
            type: 'POST',
            dataType: 'jsonp',
            data: {
                action: 'show-only-mqtt-logs',
                state: $(this).is(":checked") ? 1 : 0
            },

            error: function() {
                specialAlertResponse();
            },

            success: function(resp) {
                if (resp.result == 1) {
                    $.ajax({
                        url: $(this).data("url"),
                        type: "GET",
                        dataType: 'html',
                        success: function(resp) {
                            $resp = $(resp);
                            if ($resp.find(".activity-data").length == 1) {
                                $(".activity-data").html($resp.find(".activity-data").html());
                            }
                        }
                    });
                } else {
                    specialAlertResponse(resp);
                }
            }
        });
    });
}
Reactions.RealtimeActivityChecker();
