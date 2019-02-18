define(["jquery"],function($){
    // 소수점을 퍼센트로 바꿈.
    function getPer(num){
        return ((Math.ceil((num*100)*100000000))/100000000).toFixed(2);
    };

    // 맵의 데이터를 정리하여 Json으로 리턴.
    function crawlMapToJson(canvas){
        var mapArr = [];
        canvas.find(">div").each(function(){
            mapArr.push({
                title:$(this).find(".title").val(),
                url:$(this).find(".url").val(),
                coords:($(this).attr("coords")).split(",")
            });
        });
        return mapArr;
    };


    function crawlFn($obj,type){
        var mapArr = crawlMapToJson($obj.canvas); // 데이터 생성할 목록.
        var mapId = $obj.id.val(); // 공통 아이덴디티

        if(type=="coords") { // 이미지 맵으로 뽑아내기.
            var text = ""; // 결과 텍스트
            text = '<map name="'+mapId+'">\n';
            $(mapArr).each(function(idx,data){
                text += '<area shape="rect" coords="' + data.coords + '" href="' + data.url + '" title="' + data.title + '" target="_blank" />\n';
            });
            text += '</map>';

            $obj.results.hide();
            $obj.usemap.show().find(">textarea").val(text);
        };

        if(type=="px" || type=="per"){ // 값으로 뽑아내기.
            var styleText = "<style>\n#" + mapId + "{position:relative;}\n#" + mapId + " div{position:absolute;}\n";
            var htmlText = "<div id='"+mapId+"'>\n";
            var wid = ($obj.wid.val())*1;
            var hei = ($obj.hei.val())*1;

            $(mapArr).each(function(idx,data){
                var w = (data.coords[2] - data.coords[0])*1;
                var h = (data.coords[3] - data.coords[1])*1;
                var s = {
                    top:((type=="px") ? data.coords[1]+"px" : getPer(data.coords[1]/hei)+"%" ),
                    left:((type=="px") ? data.coords[0]+"px" : getPer(data.coords[0]/wid)+"%" ),
                    width:((type=="px") ? w+"px" : getPer(w/wid)+"%" ),
                    height:((type=="px") ? h+"px" : getPer(h/hei)+"%" )
                };

                // CSS 구문
                styleText += "#"+mapId+" .map"+idx+"{top:"+s.top+";left:"+s.left+";width:"+ s.width+";height:"+ s.height+"}\n";

                // HTML구문
                htmlText += "<div class='map"+idx+"'><a href='"+data.url+"' title='"+data.title+"'></a></div>\n";
            });
            styleText += "</style>";
            htmlText += "</div>";

            $obj.results.hide();
            $obj.css.show().find("textarea").val(styleText);
            $obj.html.show().find("textarea").val(htmlText);
        };
    }
    return crawlFn;
});