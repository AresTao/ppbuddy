var RangeColor = new function() {
    this.items = [];
    this.keys = [];
    this.color = "#FF0000";
    this.backColor="#ff0";
    var self=this;
    this.setKeys = function(key) {
        self.keys.push(key);
    }
    this.setItem = function(item) {
        self.items.push(item);
    };
    this.setColor = function(color) {
        self.color = color;
    };
        this.setBackColor = function(color) {
        self.backColor = color;
    };
    this.doFilter = function() {
        len = self.items.length
        for (var i = 0; i < len; i++) {
            var B = self.items[i];
            var inner = B.innerText + "";
            var ren=new RegExp(self.keys.join("|"),"g"); 
                inner = inner.replace(ren,function(a,b,c,d){
                return "<font color=" + self.color + " style='background:"+self.backColor+";'>" + a + "</font> ";
                });
            B.innerHTML = inner;
        }
    }
}

addEvent(window, "load", RangeColor.doFilter);
