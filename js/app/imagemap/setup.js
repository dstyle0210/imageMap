define(["jquery"],function($){
    console.log("setup");
    function setupFn($obj,callFn){
        var img = new Image();
        var w, h, url;
        var url = $obj.url.val();
        $(img).on("load",function(){
            w = $(this).width();
            h = $(this).height();
            $obj.wid.val(w);
            $obj.hei.val(h);
            $obj.id.val("imagemap");
            $obj.canvas.css({
                width:w,
                height:h,
                "overflow":"hidden",
                "background":"url('"+url+"') no-repeat"
            }).find("img,span").hide();
            callFn.call(null,$obj);
        });
        $obj.canvas.append(img);
        img.src = url;
    };
    return setupFn;
});

