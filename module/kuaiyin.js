/**
 * 快音-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.kuaiyin.player';

// 任务-Ad
function taskAd10() {
    log('----------', s.PACKAGE_NAME, 'taskAd10 start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    element = textStartsWith('看视频领取')
    if (element.exists()) {
        clicks.centerXyByText(element.findOne().text());

        others.closeAdBackToElement(text('福利'));
    }

    for (var i = 0; i < 10; i++) {
        if (!others.backToElement(text('福利'))) {
            return false;
        }

        clicks.centerXyByText('看视频赚钱');

        others.closeAdBackToElement(text('福利'));
    }

    return false;
}

// 任务-Ad
function taskAd4() {
    log('----------', s.PACKAGE_NAME, 'taskAd4 start ----------');

    for (var i = 0; i < 5; i++) {
        if (!others.backToElement(text('福利'))) {
            return false;
        }

        if (!clicks.centerXyById('coinEarn')) {
            return false;
        }

        if (text('看视频领金币（4/4）').exists()) {
            return true;
        }

        clicks.centerXyByText('立即观看');

        others.closeAdBackToElement(text('我的钱包'));
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (!id('cashEarn').exists()) {
        return false;
    }
    currentMoney = id('cashEarn').findOne().text();
    if (currentMoney < 1) {
        return true;
    }

    if (!clicks.centerXyByText('提现')) {
        return false;
    }

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 9; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskAd10();
        status1 = taskAd4();
        status2 = taskCashout();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('kuaiyin');

    return false;
};

module.exports = s;