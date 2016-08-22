/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var getData= function(result){
    var items = [];

    $.each(result.slide, function(i, slide){
            items.push("<li>");
            items.push("<img src='"+slide.img.src + "'></img>");
            $.each(slide.text, function(j, paragraph) {
                    items.push("<p>"+paragraph+"</p>");
            }); 		
            items.push("<li>");
    });
    $( "<ul/>", {
        "class": "slides",
        html: items.join( "" )
    }).appendTo( "#slider" );
    $("title").text(result.title);
};
    
var navigate = function(){
    $('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 210,
            itemMargin: 5,
            asNavFor: '#slider'
    });

    $('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel",
            start: function (slider) {
                    $('body').removeClass('loading');
            }
    })
};