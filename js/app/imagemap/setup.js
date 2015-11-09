define(["jquery"],function($){
    function setupFn($obj,type,callFn){
        var img = new Image();
        var w, h, url;

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

        if(type=="url"){ // 외부에 있는 이미지 파일 로딩
            url = img.src = $obj.url.val();
        }else{
            var file = $obj.file.get(0)
            var reader = new FileReader();
            reader.onload = function(e){
                url = img.src = e.target.result;
            };
            reader.readAsDataURL(file.files[0]);
        };

    };
    return setupFn;
});

