/**
 * Accounts Filters module for Nextpost
 * @author Nextpost.tech (https://nextpost.tech)
 */

$(function(){
    AccountsFilters.AccountsSearch();
    AccountsFilters.AccountsFilters();
});

var AccountsFilters = {};

AccountsFilters.AccountsSearch = function() {
    var prev_search_query;
    var search_timer;
    var search_xhr;
    var $form = $(".account-search");

    /**
     * Perform search on keyup on search input
     */
    $form.find(":input[name='q']").on("keyup", function() {
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
        var duration = search_query.length > 0 ? 1000 : 0;
        search_timer = setTimeout(function(){
            _this.addClass("onprogress");

            $.ajax({
                url: $form.attr("action"),
                type: $form.attr("method"),
                dataType: 'html',
                data: {
                    q: search_query
                },
                complete: function() {
                    _this.removeClass('onprogress');
                },

                success: function(resp) {
                    $resp = $(resp);

                    if ($resp.find(".js-account-search-content").length == 1) {
                        $(".js-account-search-content").html($resp.find(".js-account-search-content").html());
                    }

                    if (search_query.length > 0) {
                        $form.addClass("search-performed");
                    } else {
                        $form.removeClass("search-performed");
                    }

                    if (typeof NextPost.InsightsBasicLoader === 'function') {
                        NextPost.InsightsBasicLoader();
                    }
                }
            });
        }, duration);
    });

    /**
     * Cancel search
     */
    $form.find(".cancel-icon").on("click", function() {
        $form.find(":input[name='q']")
            .val("")
            .trigger('keyup');
    });
}

AccountsFilters.AccountsFilters = function() {
    var filters_list = [
        "reactions-pro",
        "repost-pro",
        "relogin",
        "welcomedm",
        "custom-proxy",
        "system-proxy",
        "hide-accelerators",
        "only-accelerators"
    ];
    filters_list.forEach(fl => {
        $("body").on("click", "a.js-filter-" + fl, function() {
            var _this = $(this);
            var url = _this.attr("data-url");
            var slash = fl.replace(/-/, '_');
            var account_filters_inp = $("#accounts").find(":input[name='account_filters_" + slash + "']");

            if (account_filters_inp.val() == 0) {
                account_filters_inp.val(1);
                _this.removeClass('button--light-outline');
            } else {
                account_filters_inp.val(0);
                _this.addClass('button--light-outline');
            }

            data = {};
            data["q"] = $("#accounts").find(":input[name='q']").val();
            data["account_filters_" + slash] = (account_filters_inp.val() == 1) ? "yes" : "no";

            $.ajax({
                url: url,
                type: "GET",
                dataType: 'html',
                data: $.param(data),
                success: function(resp) {
                    $resp = $(resp);
                    if ($resp.find(".js-account-search-content").length == 1) {
                        $(".js-account-search-content").html($resp.find(".js-account-search-content").html());
                    }
                    if (typeof NextPost.InsightsBasicLoader === 'function') {
                        NextPost.InsightsBasicLoader();
                    }
                }
            });
        });
    });
}