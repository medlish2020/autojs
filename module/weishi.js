/**
 * 微视-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.tencent.weishi';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '8.6.0.588';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/01/05/7/120_0a998714be1db983efb3cead37706774.apk';

/**
 * 任务-登录
 * 有时候被退出登录，所以保险一些
 */
function taskLogin() {
    log('----------', currentAPP.NAME, 'taskLogin start ----------');

    toPageMe();

    if (text('编辑资料').exists()) {
        return true;
    }

    clicks.centerXyByText('微信登录');

    if (text('Confirm Login').exists()) {
        clicks.centerXyByText('Confirm Login');
    }

    if (text('编辑资料').exists()) {
        return true;
    }

    return false;
}

// 任务-视频
function taskVideo() {
    log('----------', currentAPP.NAME, 'taskVideo start ----------');

    status = checkVideo();
    if (status) {
        return true;
    }

    clicks.textIfExists('取消');

    for (var i = 0; i < 200; i++) {
        if (!text('关注').exists() || !text('推荐').exists() || !className('android.widget.ProgressBar').exists()) {
            return false;
        }

        swipes.down1600();
        sleeps.s2to5();
        swipes.refresh1500();
    }

    status = checkVideo();
    if (status) {
        return true;
    }

    return false;
}

function checkVideo() {
    others.back2();

    if (!clicks.centerXyByText('福利中心')) {
        return false;
    }

    if (textStartsWith('明日再').exists()) {
        return true;
    }

    if (clicks.textIfExists('签到领红包')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (textStartsWith('领取 ').exists()) {
        clicks.element(textStartsWith('领取 '));
        others.back();
        clicks.xy(750, 411);
    }

    if (textStartsWith('领取 ').exists()) {
        clicks.element(textStartsWith('领取 '));
        others.back();
        clicks.xy(750, 411);
    }

    if (textStartsWith('明日再').exists()) {
        return true;
    }

    clicks.text('看视频领红包');

    return false;
}

// 任务-领红包
function taskRedpack() {
    log('----------', currentAPP.NAME, 'taskRedpack start ----------');

    toPageMe();

    if (!clicks.centerXyByText('福利中心')) {
        return false;
    }

    swipes.scrollDown3();

    for (var i = 0; i < desc('查看').find().size(); i++) {
        clicks.element(desc('查看').find()[i]);
        sleeps.s3();
        if (desc('下载腾讯新闻').exists()) {
            clicks.centerXyByDesc('下载腾讯新闻');
            sleeps.s3();
            others.back3();
            back();
            back();
        }

        exists.backToElement(desc('任务中心'));
    }

    for (var i = 0; i < text('查看').find().size(); i++) {
        clicks.element(text('查看').find()[i]);
        sleeps.s3();
        if (text('下载腾讯新闻').exists()) {
            clicks.centerXyByText('下载腾讯新闻');
            sleeps.s3();
            others.back3();
            back();
            back();
        }

        exists.backToElement(text('任务中心'));
    }

    return true;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, 'taskCashout start ----------');

    toPageMe();

    if (!clicks.centerXyByText('福利中心')) {
        return false;
    }

    if (clicks.textIfExists('提现') && clicks.textIfExists('去提现') && clicks.textIfExists('立即提现')) {
        return true;
    }

    return true;
}

/**
 * 跳转页面-我
 */
function toPageMe() {
    others.back2();

    // 页面-我
    className('android.widget.LinearLayout').find().forEach((value, key) => {
        if (value.childCount() !== 5) {
            return
        }

        clicks.element(value.child(4));
    });
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 10; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        status0 = taskLogin();
        if (!status0) {
            continue;
        }
        status1 = taskVideo();
        status2 = taskRedpack();
        status3 = taskCashout();

        if (status0 && status1 && status2 && status3) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
