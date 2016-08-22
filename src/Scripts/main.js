/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var getData = function (result) {
    var items = [];

    $.each(result.slide, function (i, slide) {

        items.push("<li>");

        // image
        doImg(slide, items);

        // text
        doText(slide, items);

        // choice
        doChoice(slide, items, true);

        // text
        doComment(slide, items);

        items.push("<li>");
    });
    $("<ul/>", {
        "class": "slides",
        html: items.join("")
    }).appendTo("#slider");
    $("title").text(result.title);
};

var doImg = function (slide, items) {
    if (typeof slide.img !== "undefined") {
        items.push("<img src='" + slide.img.src + "'></img>");
    }
}

var doText = function (slide, items) {
    if (Array.isArray(slide.text)) {
        $.each(slide.text, function (j, paragraph) {
            items.push("<p>" + paragraph + "</p>");
        });
    } else {
        items.push("<p>" + slide.text + "</p>");
    }
}

var doChoice = function (slide, items, showAnswer) {
    var options = JSON.parse(localStorage.getItem('options'));

    if (typeof slide.choice !== "undefined") {
        items.push("<form>");
        $.each(slide.choice, function (j, ch) {
            if (options.mode === "learning"||showAnswer) {
                if (ch.answer === "true") {
                    items.push("<p><input type='checkbox' checked='true'/>&nbsp;");
                } else {
                    items.push("<p><input type='checkbox'/>&nbsp;");
                }
            } else {
                items.push("<p><input type='checkbox'/>&nbsp;");
            }
            items.push(ch.text);
            items.push("</p>")
        });
        items.push("</form>");
    }
}

var doComment = function (slide, items) {
    var options = JSON.parse(localStorage.getItem('options'));
    if (options.mode === "learning" && typeof slide.comment !== "undefined") {
        items.push("<p>" + slide.comment + "</p>");
    }
}

var storeOptions = function () {
    var options = {};
    options.mode = getQueryVariable("mode");
    options.select = getQueryVariable("select");
    options.order = getQueryVariable("order");

    var optionsToStore = JSON.stringify(options);

    localStorage.setItem('options', optionsToStore);

}

var getQueryVariable = function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return "undefined";

}

var navigate = function () {
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

