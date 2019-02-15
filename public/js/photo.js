$(function(){   
		  
	var interval;
	$(".container img").click(function cover(){
			$(this).addClass("zoom").fadeOut(700,append);		
			function append(){
			$(this).removeClass("zoom").appendTo(".container").show();
			var name = $(".container").children("img").first().attr("alt");
			 $(".name p").text("No "+name);
			}	
	  
	})
	//	关注
			$(".top_info-btn").on("click",function(){
			$(".jump").css({"opacity":1,
        "z-index":999
        })
        setTimeout(function(){
                 $(".jump").css({"opacity":0,
                "z-index":-1
                }) 
        },4000)
        if(sessionStorage.getItem("uname")){
						$(".jump").html("关注成功")
                $(this).html("已关注")   
               
        }else{
                $(".jump").html("请先登陆")
        }
                })
	
})