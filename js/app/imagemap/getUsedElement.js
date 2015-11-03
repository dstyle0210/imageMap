define(["jquery"],function($){
    var $element = {
        url:$("#url"),
        wid:$("#imageWidth"),
        hei:$("#imageHeight"),
        id:$("#imageId"),
        canvas:$("#image"),
        html:$("#html"),
        css:$("#style"),
        usemap:$("#usemap"),
        results:$("#html,#style,#usemap"),
        historyList:$("#recentHistoryList")
    };
    return $element;
});
