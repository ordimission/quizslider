/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var getData= function(result){
    var items = [];

    $.each(result.slide, function(i, slide){
           
            items.push("<li>");
            
            // image
            doImg(slide,items);
            
            // text
            doText(slide,items);
             
            // choice
            doChoice(slide,items); 
             
            // text
            doComment(slide,items);
            
            items.push("<li>");
    });
    $( "<ul/>", {
        "class": "slides",
        html: items.join( "" )
    }).appendTo( "#slider" );
    $("title").text(result.title);
};
    
var doImg= function(slide, items) {
    if (typeof slide.img !== "undefined") {
        items.push("<img src='"+ slide.img.src + "'></img>");
    }
}

var doText= function(slide, items) {
    if (Array.isArray(slide.text)) {
        $.each(slide.text, function(j, paragraph) {
                items.push("<p>"+paragraph+"</p>");
        }); 		
    }
    else {
        items.push("<p>"+slide.text+"</p>");
    }
}

var doChoice= function(slide, items) {
    if (typeof slide.choice !== "undefined")  {
        items.push("<form>");
        $.each(slide.choice, function(j, ch) {
                items.push("<p><input type='checkbox'>&nbsp;");
                items.push(ch.text);
                items.push("</p>")
        });
        items.push("</form>");
    }
}
 
var doComment= function(slide, items) {
    if (typeof slide.comment !== "undefined") {
         items.push("<p>"+slide.comment+"</p>");
    }
} 
 
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

