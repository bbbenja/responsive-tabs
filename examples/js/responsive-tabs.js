!function ($) {

    "use strict"; // jshint ;_;

    var ResponsiveTab = function (e) {
                this.init(e);
                this.resizeTabs();
                var instance = this;
                //FIXME faire appel au smartResize
                $(window).resize(function () {
                        instance.resizeTabs();
                });
            }

    ResponsiveTab.prototype = {
        selector : "responsive-tabs",
        constructor: ResponsiveTab,
        init:function(e){
            //FIXME conserver l'item actif/required
            //FIXME ajouter le do-not-move automatiquement à l'init du plugin
            //FIXME bug lorsqu'il y a deux navtab dans la page
            console.log("init()");

            $(e).addClass(this.selector);
            $(e).find('.dropdown-menu li').addClass('do-not-move');
        },
        resize:function(o){
            console.log("resize");

            var object = $(o);
            //Hiding to avoid blink effect
            object.css('visibility','hidden');

            //Set to initial position/size
            //TODO ici, on pourrait ne pas prendre les items qui ont la class active ou required
            var itemsToMove = object.find('.dropdown-menu li[class!="do-not-move"]');
            var alwaysInDropdown = object.find('.dropdown-menu li.do-not-move');
            //Put all tabs in line and remove the 'more' tab
            object.find('.dropdown').remove();
            var dropdownMenu = $('<li class="dropdown">' +
                                 '<a class="dropdown-toggle" data-toggle="dropdown" href="#">' +
                                 'more<b class="caret"></b>' +
                                 '</a>' +
                                 '<ul class="dropdown-menu pull-right"></ul>' +
                                 '</li>');
            object.append(itemsToMove);
            object.append(dropdownMenu);
            var tabs = object.find('li[class!="dropdown"][class!="do-not-move"]');

            var toAdd = [];
            var others = [];
            var currentWidth = 0;
            var maxWidth = object.width() - dropdownMenu.width();
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
            object.empty();
            object.append(toAdd);
            object.append(dropdownMenu);
            if(itemsToPutInDropdown.length>0){
                object.find('.dropdown-menu').append(itemsToPutInDropdown);
                $().dropdown();
            }else{
                object.find('.dropdown').remove();
            }
            object.css('visibility','visible');
        },
        resizeTabs:function(){
            console.log("resizeTabs()");

            var instance = this;
            $('.'+this.selector).each(function(){instance.resize(this)});
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