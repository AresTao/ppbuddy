/*
 * title :changeEvtButton
 * dec:更换按钮方法
 * par:num:被更换的按钮索引,count :按钮的总数量
 *
 *
 * #############   #############
 * #--button1--#   #  button2  #
 * #############   #############
 * */
function changeEvtButton(num, count, f) {
    var c = count || 10;
    var name = encodeURI(EHM.request.getPathName())
    if (f && cookie.get(name)) {
        num = parseInt(cookie.get(name));
    }
    for (var i = 1; i < 10; i++) {
        var button = document.getElementById("evtButton" + i);
        var content = document.getElementById("content" + i);
        if (!!button) {
            if (i == num && content != null) {
                button.className = "button_on"
                content.style.display = "block";
                cookie.set(name, num);
            }
            if (i !== num && content != null) {
                button.className = "button_off"
                content.style.display = "none";
            }
        }

    }
}
