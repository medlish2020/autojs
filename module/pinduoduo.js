var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')
var swipes = require('../function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.xunmeng.pinduoduo'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = '5.45.0'
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/01/06/5/120_37a8dc91f1db36e36a85bd4e71c65fa0.apk'

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    MP_URL = 'pinduoduo://com.xunmeng.pinduoduo/https://mobile.yangkeduo.com/pythagoras_ctc_ca.html'
    app.startActivity({ data: MP_URL })
    sleeps.s15to20()

    return true
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(id('name').text('签到'))) {
        return false
    }

    if (text('今日已提').exists() || text('去解锁').exists()) {
        return true
    }

    if (textStartsWith('确认提现').exists() && text('提现').exists()) {
        clicks.centerXyByText('提现')
    }

    if (text('微信提现特权').exists() && text('去提现').exists()) {
        clicks.centerXyByText('去提现')
    }

    if (text('打款中，24小时内到账').exists()) {
        clicks.centerXyByText('我知道了')
        return true
    }

    return false
}

/**
 * 任务-摸猫
 */
function taskCat() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(text('招财猫'))) {
        return false
    }
    sleeps.s2to5()

    clicks.text('领猫粮')
    sleeps.s2to5()

    if (exists.parent(text('逛街60秒免费拿'), text('去完成'))) {
        clicks.parent(text('逛街60秒免费拿'), text('去完成'))

        for (var i = 0; i < 66; i++) {
            swipes.down()
        }

        if (!others.backToElement(text('领猫粮'))) {
            return false
        }
    }

    if (exists.parents(text('浏览活动得猫粮免费领'), text('去完成'))) {
        clicks.parents(text('浏览活动得猫粮免费领'), text('去完成'))

        for (i = 0; i < 66; i++) {
            swipes.down()
            if (exists.elementWidthHeight(className('android.widget.Button'), 90, 87)) {
                clicks.elementWidthHeight(className('android.widget.Button'), 90, 87)
            }
        }

        if (!others.backToElement(text('领猫粮'))) {
            return false
        }
    }

    if (exists.parent(text('去免费领路费'), text('去完成'))) {
        clicks.parent(text('去免费领路费'), text('去完成'))

        if (!others.backToElement(text('领猫粮'))) {
            return false
        }
        clicks.textIfExists('领取')
    }

    if (clicks.textIfExists('喂养')) {
        clicks.textIfExists('喂养100克猫粮')

        clicks.textIfExists('赚现金')
        clicks.textIfExists('赚签到金')
        clicks.textIfExists('摸一摸')
        clicks.textIfExists('去签到')
    }

    return true
}

// 任务-视频
function taskVideo() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!clicks.backToElement(text('大视频'))) {
        return false
    }

    sleeps.s10()

    for (var i = 0; i < 10; i++) {
        if (i === 9) {
            others.back()
        }

        clicks.textIfExists('领取并关闭')
        element = className('android.view.View').depth(10).indexInParent(4)
        if (element.exists()) {
            clicks.clickableElement(element)
        }
        clicks.textIfExists('我知道了')
        clicks.textIfExists('去领金币')

        swipes.down1600()
        sleeps.s2to5()
        swipes.refresh1500()

        if (!text('说点什么吧...').exists()) {
            return false
        }
    }

    return true
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 2; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME)
        if (!status0) {
            return true
        }


        status0 = taskCheckin()
        // status1 = taskCashout()
        // status2 = taskCat()
        // taskVideo()

        if (status0) {
            return true
        }

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
