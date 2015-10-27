<%@ page contentType="text/javascript; charset=GBK" %>

        <%@ include file="../common/taglib.jsp" %>

        var layout, center;

        var menuPane,headPane;

        var showtab = <eap:param_write name="主框架显示多TAB" fail="false"/>;

        var init = function() {

            // initialize state manager, we will use cookies
            Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

            // create the main layout
            layout = new Ext.BorderLayout(document.body, {
                north: {
                    split:false,
                    initialSize: 71,
                    minSize: 71,
                    maxSize: 71,
                    collapsible: false
                },
                <eap:param_if name="菜单模式" value="PANEL">
                west: {
                    split:true,
                    initialSize: 220,
                    minSize: 155,
                    maxSize: 300,
                    titlebar: <eap:param_write name="是否显示PANEL菜单隐藏按钮" fail="true"/>,
                    collapsible: true,
                    animate: true,
                    useShim:true
                    //cmargins: {top:2,bottom:2,right:2,left:2}
                },
                </eap:param_if>
                center: {
                    autoScroll:false,
                    tabPosition: 'top',//todo配置为自定义参数
                    closeOnTab: true,
                    //alwaysShowTabs: true,
                    resizeTabs: false
                }

            });
            // tell the layout not to perform layouts until we're done adding everything
            layout.beginUpdate();

            headPane = new Ext.ContentPanel('header');
            layout.add('north', headPane);
        <eap:param_if name="菜单模式" value="PANEL">
            menuPane = new Ext.ContentPanel('dynaMenu', {title: '', fitToFrame:true});
            layout.add('west', menuPane);
        </eap:param_if>

            center = layout.getRegion('center');
            center.add(new Ext.ContentPanel('main_space', {fitToFrame:true}));

            layout.restoreState();
            layout.endUpdate();

            // safari and opera have iframe sizing issue, relayout fixes it
            if (Ext.isSafari || Ext.isOpera) {
                layout.layout();
            }

           

        }

        var loadDoc = function(url, label) {
            var frame = Ext.get("main");
            var ret = /javascript:/gi;
            if (ret.test(url)) {
                var funStr = url.replace(ret, "");
                EHM.eval(funStr);
            } else if (frame) {
                if (url != "") {
                        frame.dom.src = url;
                }
            }
        };

        var loadMenu = function(url, title) {
            //todo 显示title
            var frame = Ext.get("dynaMenu_frame");
            frame.dom.src = url;
            layout.getRegion('west').show();
        }

        Ext.onReady(init);



