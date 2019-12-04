$(document).ready(function(){
    $(".slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplaySpeed: 2000,
        autoplay:true,
        prevArrow:'.left-arrows',
        nextArrow:'.right-arrows'
    });
    $('.btn-customize').click(function(){
        var a = $(this).parent();
        var b = a.parent();
        var c = b.find('p:first').text();
        var d = b.find('h2:first').text();
        var img = b.find('img:first');
        var img2 = img.clone();
        $('.box').css("display","block");
        $('.box-h2').append(d);
        $('.box-p').append(img2);
        $('.box-p').append(c);
        $('#body').addClass("lightbox");
    });

    $('.close').click(function(){
        $('#body').removeClass("lightbox");
        $('.box').css("display","none");
        $('.box-p').empty();
        $('.box-h2').empty();
    });

});
