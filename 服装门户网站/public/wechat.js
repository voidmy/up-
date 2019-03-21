(function () {
    ///shist+alt+f 快捷整理代码
    var loadbtn = document.getElementById('Surname')
    var Sname = document.getElementById("setname")
    var Sbtn = document.getElementById("send")
    var Scon = document.getElementById("contxt")
    var SDcon = document.getElementsByClassName("charcon")[0]
    var Sitemname = document.getElementsByClassName("charname")[0]
    var tar = '';//鼠标获取的对象
    $(".charname").delegate('div', "click", function (even) {
        var target = $(even.target)
        tar = even.target
        target.css("background", "gray");
        // console.log(even)
        // alert(target.attr('nickname'))
        // addnewUsercon(1,2)
        SwHS(target, even.target)


    })
    //切换显示隐藏
    function SwHS(target, sindex) {
        var ncon = $(".nackcon")//聊天内容
        var nnam = $(".nackname")//名字
        $.each(nnam, function (index, item) {

            if (item == sindex) {

                ncon.hide()
                $(ncon[index]).show()
            }
        })
        $(".charname>div").css("opacity", "0.5")
        target.css("opacity", "1");
    }
    ///
    loadbtn.onclick = function () {
        var myname = Sname.value
        if (Sname.value === '') { return alert("请登录"); }
        /* */
        else if (Sname.value == 'li') {
            //是客服登录的时候
            var ws = new WebSocket("ws://10.240.201.231:80");
            ws.onopen = function () {
                ws.send(JSON.stringify({
                    name: myname,
                    text: "kefu",
                    mytar: "111"
                }))
                /*
                submit.onclick=function(){

                    ws.send(JSON.stringify({
                        name: myname,
                        text: txt,
                        mytar: tar.innerHTML

                    }))
                }
                *///
                Sbtn.onclick = function () {
                    if (tar == '') {
                        alert("请选择顾客！！！")
                    }
                    else {
                        var txt = Scon.value;
                        var Allcon=$(".nackcon")
                        $.each(Allcon,function(index,item){
                            if($(item).attr("nickname")==tar.innerHTML){
                                $(item).append("<p class='chatstyle'>"+txt+":"+myname+"</p>")
                            }
                        })
                       
                        ws.send(JSON.stringify({
                            name: myname,
                            text: txt,
                            mytar: tar.innerHTML

                        }))
                    }
                }
                ws.onmessage = function (e) {//接受信息
                    var mcon = document.createElement("p");
                    mcon.innerHTML = e.data;
                    var sename = e.data.split(":")
                    var Allcon = document.getElementsByClassName('nackcon');
                    //console.log(Allcon)
                  var key=0
                    $.each(Allcon, function (index, item) {
                        if ($(item).attr("nickname") == sename[0]) { 
                           key=1;
                           $(item).append("<p>"+sename[0]+":"+sename[1]+"</p>")
                        }
                        if(tar.innerHTML== sename[0]){

                        }
                        else if(tar!=''){
                                var  Lightnackname=$(".nackname")//让收到消息的人亮
                                $.each(Lightnackname,function(index,item){
                                    if($(item).attr("nickname")==sename[0]){
                                        $(item).css("background","red")
                                    }
                                })
                        }
                    })
                    if(key==0){
                        addnewUser(sename[0], e.data)
                    }
                    
                }
            }
        }
        else if (Sname.value != 'li') {
            //顾客登录的时候
            $(Sitemname).hide()//隐藏聊天名框
            var ws = new WebSocket("ws://10.240.201.231:80");
            ws.onopen = function () {
                Sbtn.onclick = function () {
                    var txt = Scon.value;
                    ws.send(JSON.stringify({
                        name: myname,
                        text: txt,
                        mytar: "no"
                    }))
                    addCustomer(myname, txt)
                }
                ws.onmessage = function (e) {
                    var mcon = document.createElement("p");
                    mcon.innerHTML = e.data;
                    var sename = e.data.split(":")
                    addCustomer(sename[0], sename[1])
                    //addCustomer( myname, txt)
                }
            }

        }
        //////////////
        function addCustomer(name, text) {//顾客给自己添加聊天内容
            // var SDcon = document.getElementsByClassName("charcon")[0]
            var txt = "" + name + ": " + text + "";
            var p = $("<p>" + txt + "</p>")
            $(SDcon).append(p)

            //SDcon.innerHTML+=txt
        }
        function addnewUser(name, text) {//添加聊天名框
            var newman = document.createElement("div")
            newman.innerHTML = name
            newman.setAttribute("nickname", name);
            newman.className = "nackname";
            Sitemname.appendChild(newman)
            addnewUsercon(name, text)
        }
        ///添加聊天内容框
        function addnewUsercon(name, text) {
            //SDcon
            var newcon = document.createElement("div")
            newcon.className = "nackcon"
            newcon.setAttribute("nickname", name);
            newcon.innerHTML = text
            SDcon.appendChild(newcon)
            // var con = $(".nackcon")
            //console.log(con)
            /* $.each(con,function(index,item){
                 if(item!=newcon){
                   $(item).hide()
                 }
               
             })*/
        }
    }

    ///

}())



