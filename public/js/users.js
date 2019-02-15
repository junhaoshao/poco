
$(function(){
$(".header").load("header2.html");
   

  //function ajax({url,type,data,dataType})
    //return new Promise(function(open){})
      //open(xhr.responseText)
    $.ajax({
      url:"http://127.0.0.1:3000/author",
      type:"get",
      //data:undefined
      dataType:"json"//告诉ajax，将json字符串自动转为对象
    })
    .then((res)=>{ 
      //console.log(res);
      let {img} = res;
      let html = ""
     for(var p of img){
      // console.log(p)
      var {headpic,smallpic1,bigpic1,smallpic2,bigpic2,smallpic3,bigpic3,smallpic4,bigpic4,name,introduction,works,fans}=p; 
      html+=`<div class="vm_photoer_item">
      <div class="vm_photoer_img">
        <div class="bigpic">
          <!--模态框-->
          <div class="demo">
            <div class="container">
              <div class="row">
                <div class="box">
                    <img src="${bigpic1}" class="my-big">
                  <div class="box-content">
                    <div class="vm_user_img">
                      <div class="vm_user_img-1">
                        <a href="./zanbala.html">
                          <img src="${headpic}" class="vm_user_img-2">
                        </a>
                      </div>
                    </div>
                    <dl class="vm_user_text">
                      <dt>
                        <span class="vm_user_name">${name}</span>
                      </dt>
                      <dd>
                        <span>${introduction}</span>
                      </dd>
                    </dl>
                    <div class="vm_user_msg">
                      <span>
                        <bdo>${works}</bdo>
                        <em>作品</em>
                      </span>
                      <em>.</em>
                      <span>
                        <bdo>${fans}</bdo>
                        <em>粉丝</em>
                      </span>
                    </div>							
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="smallpic">
          <img src="${smallpic1}" data-target="${bigpic1}" class="my-small">
          <img src="${smallpic2}" data-target="${bigpic2}" class="my-small">
          <img src="${smallpic3}" data-target="${bigpic3}" class="my-small">
          <img src="${smallpic4}" data-target="${bigpic4}" class="my-small">
        </div>
      </div>


<div class="jump"></div>
      <div class="vm_attension">
        <span class="vm_attension_btn">
            <i class="iconfont icon-jiahao"></i>
            <em>关注</em>
        </span>
      </div>
    </div>`;
    }
    var div=$(
      //"#main>:nth-child(2)>:nth-child(1)>:nth-child(3)>:nth-child(2)>:nth-child(1)"
      ".vm_main>#my-tabs>.container>#content1>.vm_photoer"
    );
    div.html(html);
    });
        
			})