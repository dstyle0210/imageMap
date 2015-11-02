//TODO 이미지 가로값 px없음
// TODO 맵 삭제 기능 필요
// TODO github가기 , 다운로드 , 도움말 넣기
// TODO 기존 적용내역 저장 -> 웹스토리지



// Core Method 들.
function getOffset(e){
    return {x:Math.ceil(e.offsetX),y:Math.ceil(e.offsetY)};
};
function setAbsStyle(property,px){
    return (property+":"+Math.abs(px)+"px;");
};
function setUsedElement(){
    var $element = {
        url:$("#url"),
        wid:$("#imageWidth"),
        hei:$("#imageHeight"),
        id:$("#imageId"),
        canvas:$("#image"),
        html:$("#html"),
        css:$("#style"),
        usemap:$("#usemap")
    };
    return $element;
};
var $obj;
$(function(){
    $obj = setUsedElement(); // 사용되는 모든 엘리먼트 불러오기.
});


function setupFn(){
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
        mapFn();
    });
    $obj.canvas.append(img);
    img.src = url;
};

// 데이터 가져오기
function crwalMapFn(type){
    var style = [];
    var mapArr = [];
    $("#image>div").each(function(){
        var title = $(this).find(".title").val();
        var url = $(this).find(".url").val();
        if(title!=""){
            var div = $(this);
            var o = {
                title:title,
                url:url,
                coords:(div.attr("coords")).split(",")
            };
            mapArr.push(o);
        };
    });

    $("#html").hide();
    $("#style").hide();
    $("#usemap").hide();
    var text = "";

    if(type=="coords") { // 이미지 맵으로 뽑아내기.
        text = '<map name="'+$("#imageId").val()+'">\n';
        $(mapArr).each(function(idx,data){
            text += '<area shape="rect" coords="' + data.coords + '" href="' + data.url + '" title="' + data.title + '" target="_blank">\n';
        });
        text += '</map>';
        $("#usemap>textarea").val(text);
        $("#usemap").show();
    };
    if(type=="px" || type=="per"){ // 값으로 뽑아내기.
        var styleText = "<style>\n";
        styleText += "#"+$("#imageId").val()+"{position:relative;}\n";
        styleText += "#"+$("#imageId").val()+" div{position:absolute;}\n";
        var htmlText = "<div id='"+$("#imageId").val()+"'>\n";
        $(mapArr).each(function(idx,data){
            var wid = ($("#imageWidth").val())*1;
            var hei = ($("#imageHeight").val())*1;
            var w = (data.coords[2] - data.coords[0])*1;
            var h = (data.coords[3] - data.coords[1])*1;
            var s = {
                top:((type=="px") ? data.coords[1]+"px" : getPer(data.coords[1]/hei)+"%" ),
                left:((type=="px") ? data.coords[0]+"px" : getPer(data.coords[0]/wid)+"%" ),
                width:((type=="px") ? w+"px" : getPer(w/wid)+"%" ),
                height:((type=="px") ? h+"px" : getPer(h/hei)+"%" )
            };

            // CSS 구문
            styleText += "#"+$("#imageId").val()+" .map"+idx+"{top:"+s.top+";left:"+s.left+";width:"+ s.width+";height:"+ s.height+"}\n";

            // HTML구문
            htmlText += "<div class='map"+idx+"'><a href='"+data.url+"' title='"+data.title+"'></a></div>\n";
        });
        styleText += "</style>";
        htmlText += "</div>";

        $("#style>textarea").val(styleText);
        $("#html>textarea").val(htmlText);
        $("#html").show();
        $("#style").show();
    };
};
function getPer(num){
    return (Math.ceil((num*100)*100000000))/100000000;
};



var sPos,mPos,ePos,idx=0;
var makeBox = false;
var target;
var rela = 0;
var mMove = false;

function mapFn(){
    var image = $("#image").get(0);
    $("#image").on("mousedown",function(e){
        mMove = false;
        if(!makeBox){
            makeBox = true;
            sPos = getOffset(e);
            idx++;
            target = $("<div id='div"+ idx +"'></div>");
            $("#image").append(target);
        };
    });
    $("#image").on("mousemove",function(e){
        mMove = true;
        if(makeBox){
            if(target && (e.target==image || e.target== target.get(0))){
                mPos = getOffset(e);
                var x = mPos.x - sPos.x;
                var y = mPos.y - sPos.y;
                var style = "";
                if(x<0){
                    style += setAbsStyle("left",mPos.x);
                }else{
                    style += setAbsStyle("left",sPos.x);
                };
                if(y<0){
                    style += setAbsStyle("top",mPos.y);
                }else{
                    style += setAbsStyle("top",sPos.y);
                };
                rela++;
                style += "z-index:"+rela+";width:"+Math.abs(x)+"px;height:"+Math.abs(y)+"px;";
                target.attr("style",style);
                ePos = mPos;
            };
        };

    });
    $("#image").on("mouseup",function(){
        if(mMove && ePos){
            var x = target.width();
            var y = target.height();
            var str = ((0<x) ? sPos.x : ePos.x)+","+((0<y) ? sPos.y : ePos.y)+","+((0<x) ? ePos.x : sPos.x)+","+((0<y) ? ePos.y : sPos.y);
            target.attr("coords",str);
            target.append("<input type='text' class='title' placeholder='버튼설명' />");
            target.append("<input type='text' class='url' placeholder='링크경로' />");
            var del = $('<button type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button>');
            del.on("click",function(e){
                makeBox = false;
                $(this).parent().remove();
            });
            target.append(del);
            target = sPos = mPos = ePos = null;
        };
        setTimeout(function(){
            mMove = makeBox = false;
            $("#image>div").each(function(){
                if($(this).width()<20 || $(this).height()<20 || $(this).find("input").length==0){
                    $(this).remove();
                };
            });
        },500);
    });

    $("#image").on("mouseleave",function(){
        if(makeBox){
            $("#image").trigger("mouseup");
        }
    })
};