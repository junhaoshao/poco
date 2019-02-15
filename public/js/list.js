$(function(){
	 
  //function ajax({url,type,data,dataType})
    //return new Promise(function(open){})
      //open(xhr.responseText)
    $.ajax({
      url:"http://127.0.0.1:3000/list",
      type:"get",
      //data:undefined
      dataType:"json"//告诉ajax，将json字符串自动转为对象
    })
    .then((res)=>{ 
      console.log(res);
      let {img} = res;
      let html = ""
     for(var p of img){
       console.log(p)
      var {img_url,title,content,browse,collect}=p; 
      html+=`<div class="vm_part">
      <!--内容-->
      <div class="vm_img_txt">
        <div class="vm_clearfix">
          <!--照片-->
          <div class="vm_1box">
            <a href="list_info.html" target="_blank">
              <img src="${img_url}" class="pic">
            </a>
          </div>
          <div class="vm_2box">
              <a href="list_info.html" target="_blank">
                <h3>${title}</h3>
              </a>
              <div class="vm_des">
                <span>
                  
                ${content}
                
                </span>
              </div>
              <ul class="vm_lis">
                <li>
                  <i class="iconfont icon-sousuo"></i>
                  ${browse}
                </li>
                <li>
                  <i class="iconfont icon-heart"></i>
                  ${collect}
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>`;
    }
    var div=$(
      //"#main>:nth-child(2)>:nth-child(1)>:nth-child(3)>:nth-child(2)>:nth-child(1)"
      ".vm_list"
    );
    div.html(html);
    })
    //http://localhost:3000
  })