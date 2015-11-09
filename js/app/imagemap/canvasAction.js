define(["jquery","app/imagemap/makeMapArea"],function($,makeDivFn){
    function canvasFn($canvas){
        var sPos,mPos,idx=0; // 시작점,중간점,종료점,인덱스
        var make = false; // 맵을 만드는 중인가?
        var drag = false; // 드래그중인가?
        var target; // 생성되고 있는 엘리먼트
        var image = $canvas.get(0); // 캔바스에 그려진 이미지.

        // 마우스다운=> 드래그 시작.
        $canvas.on("mousedown",function(e){
            if(!make && (e.target==image)){
                make = true;
                drag = false;
                sPos = {x:Math.ceil(e.offsetX),y:Math.ceil(e.offsetY)};
                target = $("<div id='div"+ (idx++) +"'></div>");
                $canvas.append(target);
            };
        });

        // 마우스다운(drag==true) 마우스 움직이는 상태.
        $canvas.on("mousemove",function(e){
            if(make && target){
                drag = true;
                mPos = {x:Math.ceil(e.offsetX),y:Math.ceil(e.offsetY)}
                var x = mPos.x - sPos.x;
                var y = mPos.y - sPos.y;
                var style = "left:"+Math.abs((x<0) ? mPos.x : sPos.x)+"px;"+
                    "top:"+Math.abs((y<0) ? mPos.y : sPos.y)+"px;"+
                    "width:"+Math.abs(x)+"px;"+
                    "height:"+Math.abs(y)+"px;";
                target.attr({
                    "style":style,
                    "coords":((0<x) ? sPos.x : mPos.x)+","+((0<y) ? sPos.y : mPos.y)+","+((0<x) ? mPos.x : sPos.x)+","+((0<y) ? mPos.y : sPos.y)
                });
            };
        });

        // 마우스업 => 드래그 종료.
        $canvas.on("mouseleave mouseup",function(e){
            if(target && drag && make){
                makeDivFn(target);
            }else{
                if(target) target.remove();
            };
            make = drag = false;
            target = sPos = mPos = null;
        });

    };
    return canvasFn;
});