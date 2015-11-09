define(["jquery"],function($){
    var $element = {
        // 인풋
        url:$("#url"),
        file:$("#file"),

        // URL , local file 버튼
        urlBtn:$("#urlInputOpen"),
        fileBtn:$("#fileInputOpen"),

        // URL 일때 목록
        historyBtn:$("#historyBtn"),
        historyList:$("#recentHistoryList"),

        // 입력폼
        urlInputForm:$("#urlInputForm"),
        fileInputForm:$("#fileInputForm"),

        // 이미지정보
        canvas:$("#image"),
        wid:$("#imageWidth"),
        hei:$("#imageHeight"),
        id:$("#imageId"),

        // 결과 정보
        html:$("#html"),
        css:$("#style"),
        usemap:$("#usemap"),
        results:$("#html,#style,#usemap")
    };
    return $element;
});
