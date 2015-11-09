define(["jquery"],function($){
    function setURLInput($obj,type){
        if(type=="url"){
            // view 설정
            $obj.urlBtn.addClass("active");
            $obj.fileBtn.removeClass("active");
            $obj.historyBtn.removeClass("hide");
            $obj.historyList.removeClass("hide");
            $obj.urlInputForm.removeClass("hide");
            $obj.fileInputForm.addClass("hide");
        }else{
            $obj.urlBtn.removeClass("active");
            $obj.fileBtn.addClass("active");
            $obj.historyBtn.addClass("hide");
            $obj.historyList.addClass("hide");
            $obj.urlInputForm.addClass("hide");
            $obj.fileInputForm.removeClass("hide");
        };
    }
    return setURLInput;
});

