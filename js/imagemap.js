require.config({
    baseUrl : "js",
    paths : {
        "jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min",
        "bootstrap":"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min",
        "intro":"https://cdnjs.cloudflare.com/ajax/libs/intro.js/1.1.1/intro.min",
        "underscore":"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "intro" : { exports: "intro","deps" :['jquery'] }
    }
});

// intro js 적용

requirejs(["jquery","intro"],function($,introJs){
    var introguide;
    $(function(){
        introguide = introJs();
        if(localStorage.getItem("intro")){
            // 값이 있다면 실행 안함.
        }else{
            // 값이 없으면 실행함.
            localStorage.setItem("intro","used");
            introguide.start();
        };
    });
    $("#introStartBtn").on("click",function(){
        introguide.start();
    });
});

// imagemap 기능연결.
requirejs(["jquery","app/imagemap/getUsedElement","app/imagemap/setup","app/imagemap/canvasAction","app/imagemap/crawlFn","app/imagemap/recentURLLoad","app/imagemap/setURLInput"],function($,$element,setupFn,canvasAction,crawlFn,recentURL,setURLInput){
    var $obj = $element;
    $(function(){
        // 연결하기
        $("#setupBtn").on("click",function(){ // 연결하기 버튼을 누르면.
            var url = $obj.url.val();
            if(url){
                setupFn($obj,"url",function(){ // 이미지로딩 및 정보정리가 되고 콜백 함수 실행
                    canvasAction($obj.canvas); // 맵이 적용될 부분에 이벤트 삽입.
                    recentURL.set(url); // 최근 URL정보로 등록.
                });
            };
        });

        $("#setupBtn2").on("click",function(){
            setupFn($obj,"file",function(){ // 이미지로딩 및 정보정리가 되고 콜백 함수 실행
                canvasAction($obj.canvas); // 맵이 적용될 부분에 이벤트 삽입.
            });
        });

        // URL로 불러오기로 셋팅(초기값)
        $("#urlInputOpen").on("click",function(){
            setURLInput($obj,"url");
        });
        // file로 불러오기로 셋팅
        $("#fileInputOpen").on("click",function(){
            setURLInput($obj,"file");
        });


        // 이미지맵으로 불러오기
        $("#crwalCoordsBtn").on("click",function(){
            crawlFn($obj,"coords");
        });

        // 픽셀로 불러오기
        $("#crwalPxBtn").on("click",function(){
            crawlFn($obj,"px");
        });

        // 퍼센트로 불러오기
        $("#crwalPerBtn").on("click",function(){
            crawlFn($obj,"per");
        });

        $("#recentLoadBtn").on("click",function(){
            recentURL.get($obj); // 최근 URL정보 가져오기
        });
    });
});