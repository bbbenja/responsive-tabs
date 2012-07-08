  var responsiveTab = function(){
    console.log("responsivetabs");
    //On reinit pour pouvoir recalculer correctement la taille
    var p = $('.nav-tabs .dropdown-menu li');
    $('.nav-tabs .dropdown').remove();
    $('.nav-tabs').append('<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">more<b class="caret"></b></a><ul class="dropdown-menu pull-right"></ul></li>');
    $('.nav-tabs').append(p);
    var dropdownMenu = $('.nav-tabs li.dropdown');
    var tabs = $('.nav-tabs li[class!="dropdown"]');

    var toAdd = [];
    var others = [];
    var currentWidth = 0;
    var maxWidth = $('.nav-tabs').width() - dropdownMenu.width();
    tabs.each(function (i,tab){
      tabWidth = $(tab).width();
      if((currentWidth+tabWidth)<maxWidth || $(tab).hasClass("required") || $(tab).hasClass("active")){
        currentWidth += tabWidth;
        toAdd.push(tab);
      }else{
        others.push(tab);
      }
    });
    $('.nav-tabs').empty();
    $('.nav-tabs').append(toAdd);
    $('.nav-tabs').append(dropdownMenu);
    if(others.length>0){
      $('.nav-tabs .dropdown-menu').append(others);
      $().dropdown();
    }else{
      $('.nav-tabs .dropdown').remove();
    }
    
  };

  $(function () {
    responsiveTab();  
    $(window).resize(function() {
      responsiveTab();  
    });
  });