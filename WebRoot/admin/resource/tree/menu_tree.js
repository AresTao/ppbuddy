//outlook 菜单中嵌入树

var style = {
    'target'  : 'rightFrame',    // 默认的link目标

    'icon_e'  : './resource/images/tree/empty.gif', // empty image
    'icon_l'  : './resource/images/tree/line.gif',  // vertical line

    'icon_32' : './resource/images/tree/base.gif',   // root leaf icon normal
    'icon_36' : './resource/images/tree/base.gif',   // root leaf icon selected

    'icon_48' : './resource/images/tree/base.gif',   // root icon normal
    'icon_52' : './resource/images/tree/base.gif',   // root icon selected
    'icon_56' : './resource/images/tree/base.gif',   // root icon opened
    'icon_60' : './resource/images/tree/base.gif',   // root icon selected

    'icon_16' : './resource/images/tree/folder.gif', // node icon normal
    'icon_20' : './resource/images/tree/folderopen.gif', // node icon selected
    'icon_24' : './resource/images/tree/folderopen.gif', // node icon opened
    'icon_28' : './resource/images/tree/folderopen.gif', // node icon selected opened

    'icon_0'  : './resource/images/tree/page.gif', // leaf icon normal
    'icon_4'  : './resource/images/tree/page.gif', // leaf icon selected

    'icon_2'  : './resource/images/tree/joinbottom.gif', // junction for leaf
    'icon_3'  : './resource/images/tree/join.gif',       // junction for last leaf
    'icon_18' : './resource/images/tree/plusbottom.gif', // junction for closed node
    'icon_19' : './resource/images/tree/plus.gif',       // junctioin for last closed node
    'icon_26' : './resource/images/tree/minusbottom.gif',// junction for opened node
    'icon_27' : './resource/images/tree/minus.gif'       // junctioin for last opended node
};

function tree(data,target)
{   
    this.treeStyle = style;
    if(target!=null)
        this.treeStyle['target']=target;
    this.tm3 = data;
    this.tm4 = this;
    this.tm5 = [];
    this.tm6 = null;
    this.tm7 = -1;
    var tm8 = new Image(), tm9 = new Image();
    tm8.src = style['icon_e'];
    tm9.src = style['icon_l'];
    style['im_e'] = tm8;
    style['im_l'] = tm9;

    for (var i = 0; i < 64; i++)
        if (style['icon_' + i])
        {
            var tmA = new Image();
            style['im_' + i] = tmA;
            tmA.src = style['icon_' + i]
        }

    this.tmB = function(tmC)
    {
        var tmD = this.tm5[tmC];
        tmD.tmE(tmD.tmF)
    };

    this.tmG = function(tmC)
    {
        return this.tm5[tmC].tmG()
    };

    this.tmH = function(tmC)
    {
        this.tm5[tmC].tmI(true)
    };

    this.tmJ = function(tmC)
    {
        this.tm5[tmC].tmI()
    };

    this.tmK = [];

    for (var i = 0; i < data.length; i++)
        new tmL(this, i);

    this.tmC = trees.length;
    trees[this.tmC] = this;

    for (var i = 0; i < this.tmK.length; i++)
    {
        document.write(this.tmK[i].tmM());
        this.tmK[i].tmE()
    }
}

function tmL(tmN, tmO)
{
    this.tm7 = tmN.tm7 + 1;
    //edit by lxl 20050831, 要实现全名显示用数组的个数从2修改为3
    this.tm3 = tmN.tm3[tmO + (this.tm7 ? 3 : 0)];

    if (!this.tm3)
        return;

    this.tm4 = tmN.tm4;
    this.tmN = tmN;
    this.tmO = tmO;
    this.tmF = !this.tm7;
    this.tmC = this.tm4.tm5.length;
    this.tm4.tm5[this.tmC] = this;
    tmN.tmK[tmO] = this;
    this.tmK = [];

    //edit by lxl 20050831, 要实现全名显示用数组的个数从2修改为3
    for (var i = 0; i < this.tm3.length - 3; i++)
        new tmL(this, i);

    this.tmP = tmQ;
    this.tmE = tmR;
    this.tmG = tmS;
    this.tmM = tmT;
    this.tmI = tmU;
    this.tmV = function()
    {
        return this.tmO == this.tmN.tmK.length - 1
    }
}

function tmR(tmW)
{
    var tmX = tmY('i_div' + this.tm4.tmC + '_' + this.tmC);

    if (!tmX)
        return;

    if (!tmX.innerHTML)
    {
        var tmK = [];

        for (var i = 0; i < this.tmK.length; i++)
            tmK[i] = this.tmK[i].tmM();

        tmX.innerHTML = tmK.join('')
    }

    tmX.style.display = (tmW ? 'none' : 'block');
    this.tmF = !tmW;
    var tmZ = document.images['j_img' + this.tm4.tmC + '_' + this.tmC], tma = document.images['i_img' + this.tm4.tmC
            + '_' + this.tmC];

    if (tmZ)
        tmZ.src = this.tmP(true);

    if (tma)
        tma.src = this.tmP();

    this.tmI()
}

function tmS(tmb)
{
    if (!tmb)
    {
        var tmc = this.tm4.tm6;
        this.tm4.tm6 = this;

        if (tmc)
            tmc.tmG(true)
    }

    var tma = document.images['i_img' + this.tm4.tmC + '_' + this.tmC];

    if (tma)
        tma.src = this.tmP();

    tmY('i_txt' + this.tm4.tmC + '_' + this.tmC).style.fontWeight = tmb ? 'normal' : 'bold';
    this.tmI();
    //edit by lxl 20050831, 在后台生成对象的时候数组增加显示用的路径全名,要实现全名显示用this.tm3[2]
    //parent.parent.parent.TopFrame.positionTitle.innerText = "  当前位置: " + this.tm3[0];
    //edit by lxl 20060421，this.tm3[2]修改成放置帮助文件名称
    //parent.parent.parent.TopFrame.document.cssForm.helpname.value = this.tm3[2];
     
    return Boolean(this.tm3[1])
}

function tmU(tmd)
{
}

function tmT()
{
    var tme = [], tmf = this.tmN;

    for (var i = this.tm7; i > 1; i--)
    {
        tme[i] = '<img src="' + this.tm4.treeStyle[tmf.tmV() ? 'icon_e' : 'icon_l'] + '" border="0" align="absbottom">';
        tmf = tmf.tmN
    }

    return '<table cellpadding="0" cellspacing="0" border="0"><tr><td nowrap>' + (this.tm7
            ? tme.join('') + (this.tmK.length
            ? '<a href="javascript: trees[' + this.tm4.tmC + '].tmB(' + this.tmC + ')" onmouseover="trees[' + this.tm4.tmC + '].tmJ(' + this.tmC + ')" onmouseout="trees[' + this.tm4.tmC + '].tmH(' + this.tmC + ')"><img src="' + this.tmP(true) + '" border="0" align="absbottom" name="j_img' + this.tm4.tmC + '_' + this.tmC + '"></a>'
            : '<img src="'
            + this.tmP(true) + '" border="0"  align="absbottom">')
            : '') + '<a href="javascript:dispatchAction(\''+this.tm3[1]+"','"+this.tm3[0]+'\')" onclick="return trees[' + this.tm4.tmC + '].tmG(' + this.tmC
            + ')" ondblclick="trees[' + this.tm4.tmC + '].tmB(' + this.tmC + ')" onmouseover="trees[' + this.tm4.tmC
            + '].tmJ(' + this.tmC + ')" onmouseout="trees[' + this.tm4.tmC + '].tmH(' + this.tmC + ')" class="t'
            + this.tm4.tmC + 'i" id="i_txt' + this.tm4.tmC + '_' + this.tmC + '"><img src="' + this.tmP()
            + '" border="0" align="absbottom" name="i_img' + this.tm4.tmC + '_' + this.tmC + '" class="t' + this.tm4.tmC
            + 'im" alt="'+this.tm3[0]+'">' + this.tm3[0] + '</a></td></tr></table>' + (this.tmK.length
            ? '<div id="i_div' + this.tm4.tmC + '_' + this.tmC
            + '" style="display:none;overflow:auto"></div>' : '')
}
        //dispatchAction定义在outlookbar.js


function tmQ(tmg)
{
    return this.tm4.treeStyle['icon_' + ((this.tm7 ? 0 : 32) + (this.tmK.length
            ? 16
            : 0) + (this.tmK.length && this.tmF
            ? 8 : 0) + (!tmg && this.tm4.tm6 == this ? 4 : 0) + (tmg
            ? 2
            : 0) + (tmg && this.tmV()
            ? 1
            : 0))]
}

var trees = [];
tmY = document.all ? function(tmh)
{
    return document.all[tmh]
}: function(tmh)
{
    return document.getElementById(tmh)
};
