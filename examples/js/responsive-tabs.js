!function ($) {

    "use strict"; // jshint ;_;

    var ResponsiveTab = function (e) {
                this.init(e);
                var instance = this;
                //FIXME faire appel au smartResize
                $(window).resize(function () {
                        instance.init();
                });
            }

    ResponsiveTab.prototype = {
        constructor: ResponsiveTab,
        init:function(e){
            //FIXME conserver l'item actif/required
            //FIXME ajouter le do-not-move automatiquement à l'init du plugin
            //FIXME bug lorsqu'il y a deux navtab dans la page
            console.log("responsiveTab()");
            //Hiding to avoid blink effect
            $('.nav-tabs').css('visibility','hidden');
            //On reinit pour pouvoir recalculer correctement la taille
            //TODO ici, on pourrait ne pas prendre les items qui ont la class active ou required
            var itemsToMove = $('.nav-tabs .dropdown-menu li[class!="do-not-move"]');
            var alwaysInDropdown = $('.nav-tabs .dropdown-menu li.do-not-move');
            $('.nav-tabs .dropdown').remove();
            $('.nav-tabs').append('<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">more<b class="caret"></b></a><ul class="dropdown-menu pull-right"></ul></li>');
            $('.nav-tabs').append(itemsToMove);
            var dropdownMenu = $('.nav-tabs li.dropdown');
            var tabs = $('.nav-tabs li[class!="dropdown"][class!="do-not-move"]');

            var toAdd = [];
            var others = [];
            var currentWidth = 0;
            var maxWidth = $('.nav-tabs').width() - dropdownMenu.width();
            var maxReach = false;
            tabs.each(function (i,tab){
                var tabWidth = $(tab).width();
                if(!maxReach &&
                   ((currentWidth+tabWidth)<maxWidth || $(tab).hasClass("required") || $(tab).hasClass("active"))){
                    currentWidth += tabWidth;
                    toAdd.push(tab);
                }else{
                    maxReach=true;
                    others.push(tab);
                }
            });
            var itemsToPutInDropdown = others.concat(alwaysInDropdown.toArray());
            $('.nav-tabs').empty();
            $('.nav-tabs').append(toAdd);
            $('.nav-tabs').append(dropdownMenu);
            if(itemsToPutInDropdown.length>0){
                $('.nav-tabs .dropdown-menu').append(itemsToPutInDropdown);
                $().dropdown();
            }else{
                $('.nav-tabs .dropdown').remove();
            }
            $('.nav-tabs').css('visibility','visible');
        }
    }

    $.fn.responsiveTab = function (option) {
        return this.each(function () {
            var $this = $(this)
                    , data = $this.data('responsiveTab')
            if (!data) $this.data('responsiveTab', (data = new ResponsiveTab(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.responsiveTab.Constructor = ResponsiveTab


    /* APPLY TO STANDARD TAB ELEMENTS
     * =================================== */

    $(function () {

    })

}(window.jQuery);