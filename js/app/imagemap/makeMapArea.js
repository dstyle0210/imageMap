define(["jquery"],function($){
    function makeDivFn(mapDiv){
        var target = mapDiv;
        target.append("<input type='text' class='title' placeholder='버튼설명' />");
        target.append("<input type='text' class='url' placeholder='링크경로' />");
        var del = $('<button type="button" class="btn btn-xs btn-danger"><i class="fa fa-trash-o"></i></button>');
        del.on("click",function(e){
            $(this).parent().remove();
        });
        target.append(del);
    };
    return makeDivFn;
});
