//超出此价格预警
var high_price = 19202;
//低于此价格预警
var low_price = 19198;
//监控间隔2秒一次
var times=2;
//定时监控
var st = setInterval(watchprice,times*1000);
//是否继续通知
var flag = true;
//监控价格
function watchprice(){
    //获取监控元素内容-此处根据币安合约价格class获取
    var tprice = document.getElementsByClassName("showPrice")[0].innerText;
    var price = parseInt(tprice.replace(',',''));
    console.log("正在监控中....当前价格："+price);
    //这里填写你的预警价格
    if(price>=high_price || price<=low_price){
        if(flag){//继续通知
            createNotify("价格预警", {
                body: price,
                icon: "https://static-file-1259603563.file.myqcloud.com/static/images/common/favicon.ico",
                data:"https://www.binancezh.pro/cn/futures/BTCUSDT"
            });
            //继续监控但终止通知
            flag = false;
        }
    }else{
        //继续监控但价格回归通知
        flag = true;
    }
}
//创建通知
function createNotify(title, options) {
    var PERMISSON_GRANTED = "granted";
    var PERMISSON_DENIED = "denied";
    var PERMISSON_DEFAULT = "default";
    if (Notification.permission === PERMISSON_GRANTED) {
        notify(title, options)
    } else {
        Notification.requestPermission(function(res) {
            if (res === PERMISSON_GRANTED) {
                notify(title, options)
            }
        })
    }
    //通知
    function notify($title, $options) {
        var notification = new Notification($title, $options);
        //绑定通知显示事件
        notification.onshow = function(event) {
            console.log("show : ", event)
        };
        //绑定通知关闭事件
        notification.onclose = function(event) {
            console.log("close : ", event)
        };
        //绑定通知点击事件
        notification.onclick = function(event) {
            console.log("click : ", event);
            window.open(event.target.data);
            notification.close();
        }
    }
}
//Copyright by SSinuncerelouyove 13820530189
