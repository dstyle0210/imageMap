define(["jquery","underscore"],function($,_){
    var recentURLLoadFn = {
        set:function(url){
            var items = localStorage.getItem("imageMapURL");
            if(items){
                localStorage.setItem("imageMapURL",(url+","+items));
            }else{
                localStorage.setItem("imageMapURL",url);
            };
        },
        get:function($obj){
            var list = $obj.historyList;
            list.html("");
            var items = localStorage.getItem("imageMapURL");
            if(items){
                var itemArr = _.uniq(items.split(","));
                _.each(itemArr,function(url){
                    var li = $('<li title="'+url+'"><button class="btn btn-xs btn-default"><i class="fa fa-link"></i>'+url+'</button></li>');
                    li.find("button").on("click",function(){
                        $obj.url.val($(this).text());
                    });
                    list.append(li);
                });
                list.show();
            };
        }
    };
    return recentURLLoadFn;
});