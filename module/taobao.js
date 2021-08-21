/**
 * 淘宝-任务
 */
var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')
var swipes = require('../function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.taobao.taobao'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = ''
currentAPP.APK = ''

// 任务-逛店铺
function taskShop() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(desc('我的淘宝'))) {
        return false
    }

    if (!clicks.centerXyByDesc('淘金币') && !clicks.centerXyByDesc('领淘金币')) {
        return false
    }
    sleeps.s15()

    if (!className('android.widget.Button').depth(12).indexInParent(0).findOne(3000)) {
        return false
    }
    className('android.widget.Button').depth(12).indexInParent(0).findOne(3000).click()
    sleeps.s3()

    desc('逛10秒+10').find().forEach((value1, key1) => {
        if (!exists.backToElement(desc('金币好店')) || !value1.parent()) {
            return
        }

        value1.parent().click()
        sleeps.s15to20()

        if (text('关注+10').exists()) {
            clicks.centerXyByText('关注+10')
        }
    })

    if (desc('已完成').find().size() > 6) {
        return true
    }

    return false
}

// 任务-帮好友
function taskHelpFriend() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(desc('我的淘宝'))) {
        return false
    }

    if (!clicks.centerXyByDesc('淘金币') && !clicks.centerXyByDesc('领淘金币')) {
        return false
    }
    sleeps.s15()

    clicks.textIfExists('签到领金币')
    clicks.textIfExists('我知道了')
    clicks.textIfExists('购后返 ')

    for (var i = 0; i < 3; i++) {
        clicks.textIfExists('合力')
    }

    isClick = false
    className('android.widget.Button').depth(12).indexInParent(0).find().forEach((value1, key1) => {
        if (isClick || !value1.clickable()
            || value1.parent().className() !== 'android.view.View' || value1.parent().childCount() !== 1
            || value1.parent().parent().className() !== 'android.widget.ListView' || value1.parent().parent().childCount() !== 2
        ) {
            return
        }

        if (key1 === 5) {
            value1.click()
            sleeps.s3()
            isClick = true
        }
    })
    sleeps.s5to10()
    if (!isClick) {
        return false
    }

    for (var i = 0; i < 6; i++) {
        if (text('去助力').exists()) {
            clicks.centerXyByText('去助力')
            clicks.xy(393, 567)
            others.back()
        }
    }

    for (var i = 0; i < 6; i++) {
        if (text('喊Ta回来').exists()) {
            clicks.centerXyByText('喊Ta回来')
            clicks.xy(393, 507)
            clicks.xy(393, 567)
            others.back()
        }
    }

    return true
}

// 任务-金币能量
function taskMoneyPower() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(text('赚金币'))) {
        return false
    }

    sleeps.s5to10()
    if (text('领取奖励').exists()) {
        clicks.centerXyByText('领取奖励')
    }

    if (text('每日7点/12点/18点可领').exists()) {
        buttonClick = text('每日7点/12点/18点可领').findOne().parent().parent().parent().findOne(text('去完成'))
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick)

            clicks.centerXyByText('领取奖励')
        }
    }

    if (text('来访就可以拿').exists()) {
        buttonClick = text('来访就可以拿').findOne().parent().parent().parent().findOne(text('去完成'))
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick)

            clicks.centerXyByText('领取奖励')
        }
    }

    if (clicks.textIfExists('逛菜鸟裹裹领寄件券(0/1)')) {
        sleeps.s2to3()

        clicks.centerXyByText('去领券')
        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (text('每日使用拍立淘立得').exists()) {
        buttonClick = text('每日使用拍立淘立得').findOne().parent().parent().parent().findOne(text('去完成'))
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick)

            clicks.centerXyById('scan_icon')
            clicks.centerXyByText('继续上传')
            others.back2()
            if (!text('今日任务').exists()) {
                return false
            }
            clicks.centerXyByText('领取奖励')
        }
    }

    if (clicks.textIfExists('逛农场领免费水果(0/1)')) {
        sleeps.s5to10()

        clicks.centerXyByText('签到领取')
        clicks.xy(765, 1253)
        clicks.centerXyByText('去施肥，赚更多肥料')
        clicks.xy(560, 1660)
        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('淘宝人生逛街领能量(0/1)')) {
        sleeps.s10to20()

        for (var i = 1; i < 8; i++) {
            clicks.xy(500, 1000 + (i * 100))
        }

        for (var i = 1; i < 8; i++) {
            others.back()
            clicks.xy(500, 1000 + (i * 100))
            if (text('今日任务').exists()) {
                break
            }
        }

        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('查看淘宝成就月账单(0/1)')) {
        if (text('月度账单').exists()) {
            clicks.centerXyByText('月度账单')
            others.back()
        }
        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('签到领话费充值金(0/1)')) {
        sleeps.s10()
        clicks.centerXyByText('立即收下')
        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('淘宝成就签到(0/1)')) {
        if (clicks.centerXyByText('成就礼包')) {
            clicks.centerXyByText('我收下了')
        }
        if (text('成就签到').exists()) {
            buttonClick = text('成就签到').findOne().parent().findOne(className('android.widget.Button'))
            if (buttonClick != null) {
                clicks.element(buttonClick)
                clicks.centerXyByText('我收下了')
            }
        }

        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('开启通知权限领能量(0/1)')) {
        notifications()
        sleeps.s1()
        clicks.centerXyByText('Manage notifications')
        setText('手机淘宝')
        sleeps.s1()
        clicks.centerXyById('notification_package_text')
        className('android.widget.Switch').click()
        sleeps.s1()
        others.back3()

        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')

        notifications()
        sleeps.s1()
        clicks.centerXyByText('Manage notifications')
        setText('手机淘宝')
        sleeps.s1()
        clicks.centerXyById('notification_package_text')
        className('android.widget.Switch').click()
        sleeps.s1()
        others.back2()
    }

    if (clicks.textIfExists('逛蚂蚁庄园喂小鸡(0/1)')) {
        others.back2()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    // 禁用原因：因为多个淘宝账号不一定对应上天猫账号，所以还是禁用掉吧
    // if (clicks.textIfExists('去天猫APP领红包(0/1)')) {
    //     sleeps.s10()
    //     others.back()
    //     back()
    //     back()
    //     sleeps.s3()
    //     others.back()

    //     if (!text('今日任务').exists()) {
    //         return false
    //     }
    //     clicks.centerXyByText('领取奖励')
    // }

    if (clicks.textIfExists('欢乐造1212元大红包(0/1)')) {
        sleeps.s15()
        others.back2()

        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('逛支付宝会员频道(0/1)')) {
        sleeps.s10()
        if (!exists.backToElement('今日任务')) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('去蚂蚁森林收能量(0/1)')) {
        sleeps.s10()
        app.launch(currentAPP.PACKAGE_NAME)
        sleeps.s3()
        if (!exists.backToElement('今日任务')) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    for (var i = 0; i < 15; i++) {
        buttonClick = null
        if (buttonClick == null && text('点击前往 最高立得').exists()) {
            buttonClick = text('点击前往 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (text('逛好店即领').exists()) {
            buttonClick = text('逛好店即领').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (text('边逛边领大额金币').exists()) {
            buttonClick = text('边逛边领大额金币').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览10s 最高立得').exists()) {
            buttonClick = text('浏览10s 最高立得').findOne().parent().parent().parent().findOne(text('去助力'))
        }

        if (buttonClick == null && text('浏览页面最高立得').exists()) {
            buttonClick = text('浏览页面最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览10s最高立得').exists()) {
            buttonClick = text('浏览10s最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览10s 最高立得').exists()) {
            buttonClick = text('浏览10s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
            if (buttonClick !== null && buttonClick.parent().findOne(text('去天猫app领红包(0/1)')) !== null) {
                buttonClick = null
            }
        }

        if (buttonClick == null && text('浏览10s 秒最高立得').exists()) {
            buttonClick = text('浏览10s 秒最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览10秒 最高立得').exists()) {
            buttonClick = text('浏览10秒 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('逛10s 最高立得').exists()) {
            buttonClick = text('逛10s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('逛10s 最高立得').exists()) {
            buttonClick = text('逛10s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览15s 最高立得').exists()) {
            buttonClick = text('浏览15s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览15s 最高立得').exists()) {
            buttonClick = text('浏览15s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick)

            for (var j = 0; j < 16; j++) {
                if (!id('taolive_frame_video_layout').exists()) {
                    swipes.down()
                }
                sleeps.s1()
            }

            others.back()
            clicks.textIfExists('回到淘宝')
            clicks.textIfExists('继续退出')
            if (!text('今日任务').exists()) {
                return false
            }
            clicks.centerXyByText('领取奖励')
        }
    }

    if (clicks.textIfExists('逛省钱消消乐拿红包(0/1)')) {
        sleeps.s10()
        clicks.xiaoxiao(102, 1702, 110, 9)
        others.back()
        clicks.xy(700, 1500)
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (text('领取奖励').exists()) {
        clicks.centerXyByText('领取奖励')
    }

    return true
}

// 任务-取消关注店铺
function taskCancelShop() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(desc('我的淘宝'))) {
        return false
    }

    if (!clicks.centerXyByDesc('关注店铺')) {
        return false
    }

    for (var i = 0; i < 100; i++) {
        desc('个关注店铺的宝贝上新').exists() && click(986, 565)
        sleep(500)
        desc('个关注店铺的宝贝上新').exists() && click(986, 565)
        sleeps.s2to3()
    }

    return true
}

// 切换账户
function switchAccount() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(desc('我的淘宝'))) {
        return false
    }

    if (!clicks.desc('设置')) {
        return false
    }

    if (!clicks.text('切换账户')) {
        return false
    }

    idContains('aliuser_account_item_userinput').find().forEach((value, key) => {
        if (key !== 2) {
            return false
        }

        if (value.clickable() === false) {
            click(value.bounds().centerX(), value.bounds().centerY())
        } else {
            value.click()
        }

        sleep(3 * 1000)
    })

    return true
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 10; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME)
        if (!status0) {
            return true
        }


        status0 = taskHelpFriend()
        status3 = taskShop()
        status1 = taskMoneyPower()
        status2 = switchAccount()

        if (status0 && status3 && status1 && status2) {
            return true
        }

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
