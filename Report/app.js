var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = {
        description: '',
        passed: true,
        failed: true,
        pending: true,
        withLog: true,
    };

    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        $scope.searchSettings.passed = true;
        $scope.searchSettings.failed = true;
        $scope.searchSettings.pending = true;
        $scope.searchSettings.withLog = true;
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.specLevel = function (str) {
        var arr = str.split('|');
        str = "";
        if (arr.length < 3) {
            return true;
        }
        return false;
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };


    this.nToBr = function (str) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    };


    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh == 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number)/1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {passCount++};
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {pendingCount++};
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {failCount++}
        }
        return failCount;
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results =[
    {
        "description": "should find film Pirates of the Caribbean|kinopoisk start page",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "b7c79eff24717cf7ec48a690c6a1f43b",
        "browser": {
            "name": "chrome",
            "version": "64.0.3282.140"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 19 [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/favicons/favicon-152.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401533,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 20 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-57.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401533,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 21 [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-76.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401534,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 22 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-96.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401534,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 23 [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-120.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401534,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 24 [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-128.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401534,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 25 [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-144.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401535,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 26 [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/favicons/favicon-152.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401536,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 27 [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-180.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401536,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 28 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/public/img/favicons/favicon-196.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401536,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 30 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon.ico' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401542,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 32 [Report Only] Refused to load the stylesheet 'https://st1.kp.yandex.net/js/style.css?v=928339bc3adf25690ba76e46cfc9c503' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100401542,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st7.kp.yandex.net/js/jquery.cookie.js?v=343ff7096e03c591e92c64289223cdf0' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401681,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/jquery.other.js?v=2513193fc2ebacc43d8e3d8e7711138b' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401682,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS55F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401713,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS55F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401713,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS56F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401713,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS56F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401714,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS75F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401716,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS75F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401717,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS76F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401717,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS76F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401717,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC55F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401717,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC55F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401717,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC75F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401717,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC75F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401718,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN57F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401718,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN57F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401719,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN77F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401719,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN77F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100401719,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/jquery.selectBox.min.js?v=304d8970a1f25f93f36b6e9235e2eeb5' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401730,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st3.kp.yandex.net/js/jquery.autocomplete.js?v=3d48009057928caad0ac736a0edf73ec' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401731,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st8.kp.yandex.net/js/jquery.autocomplete_express.js?v=a2f195069d2ef53725b94908730620d4' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401732,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/mobile_detector.js?v=f353c1055cd8b73557ff061b7d542ab7' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401734,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ 48 [Report Only] Refused to load the stylesheet 'https://st7.kp.yandex.net/js/superbanner.css?v=3e1fbab2983652a7e712df576b8857ff' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100401743,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st8.kp.yandex.net/js/kinopoiskPlayer.js?v=542187f4eb868adae5ffa6a2b29164bc' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401755,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st2.kp.yandex.net/js/trailer_scroll.js?v=45250e5ffc3a828fed734ed36020c48b' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401757,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st4.kp.yandex.net/js/horisontal_scroll.js?v=280db83642c6787e2c9ebb0dc4281670' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401758,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st5.kp.yandex.net/js/flap_img.js?v=0ff09e30a4b6cb2ee85aa8645805caed' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401759,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st2.kp.yandex.net/js/image_slider.js?v=dd196d5d4e604b8f155386f771196b60' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401760,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/main.js?v=6d84c46125881a4f854fffecdc057777' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100401762,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/noBrandBg.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401829,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/img/flag-play.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401865,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/about_cinema.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401866,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/img/trailers-arrow-left.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401868,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/img/trailers-play.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401869,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st7.kp.yandex.net/images/corner-main.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401870,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st7.kp.yandex.net/images/bullet.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401871,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/bg_main_line.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100401931,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/flags.png?v=3' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402036,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/block_right.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402086,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/spacer.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402088,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/block_right_more.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402088,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/sqr-orange2.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402088,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/bg_cashup_line.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402090,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/bg_cashup.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402092,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/fe/social-teasers/youtube/12.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402094,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/arrowsRight.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402134,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right_dvd_bg.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402138,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/block_right_more.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402138,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/randomMovie.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402206,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/randomMovieDescrBg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402207,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/arrowsRound.gif?v=3' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402207,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/birthday_scroller.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402209,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/pcode/adfox/loader.js 1 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/popup_background.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402495,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/goButtonBg.png?v=20130930' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402592,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/noBrandMenuBg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402593,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/goButtonBg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100402598,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://mc.yandex.ru/metrika/watch.js 31 chrome.loadTimes() is deprecated, instead use standardized API: Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1518100402642,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://mc.yandex.ru/metrika/watch.js 31 chrome.loadTimes() is deprecated, instead use standardized API: Paint Timing. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1518100402642,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://matchid.adfox.yandex.ru/?url=e0a5fe2ce8413ed3a0582409b20d9b9fff3253647fc1ee78db86bfa40b582e9ec859f0c5166c6e06dae3c4945842c80600c08e40b1ef3c8ae13da1038b8ca7d84de39910161111c7572a286bd81bb961ece73985ff455258e83771f3e08e0d8ae46a4ca4ae8949eefa5e459d6c7cc35b5162fef368112e163228663ca983603532844de8c29ce31e76e3ef39ab7f2f37b0ae514297165f4f82902bac18c040854da1d9076580b753da6689558966e61c1dbd2dde5fa6273e0b014c8e4778edde&sign=e1fe8bb63092552d4477dccd3203a235' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100403308,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-57.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414299,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-76.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414334,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-96.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414366,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-120.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414443,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-128.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414477,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-144.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414509,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/favicons/favicon-152.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414542,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-180.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414635,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/public/img/favicons/favicon-196.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414665,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/ - [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon.ico' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414707,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 24 [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/favicons/favicon-152.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414929,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 25 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-57.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414929,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 26 [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-76.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414929,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 27 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-96.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414929,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 28 [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-120.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414931,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 29 [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-128.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414932,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 30 [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-144.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414932,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 31 [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/favicons/favicon-152.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414933,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 32 [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-180.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414933,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 33 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/public/img/favicons/favicon-196.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414934,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 35 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon.ico' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100414934,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 37 [Report Only] Refused to load the stylesheet 'https://st1.kp.yandex.net/js/style.css?v=928339bc3adf25690ba76e46cfc9c503' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100414934,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the script 'https://st7.kp.yandex.net/js/jquery.cookie.js?v=343ff7096e03c591e92c64289223cdf0' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100414964,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/jquery.other.js?v=2513193fc2ebacc43d8e3d8e7711138b' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100414965,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS55F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414989,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS55F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414990,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS56F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414990,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS56F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414990,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS75F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414991,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS75F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414991,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS76F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414992,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS76F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414992,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC55F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414992,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC55F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414993,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC75F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414993,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC75F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414993,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN57F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414994,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN57F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414994,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN77F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414995,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN77F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100414995,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/jquery.selectBox.min.js?v=304d8970a1f25f93f36b6e9235e2eeb5' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100414999,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the script 'https://st3.kp.yandex.net/js/jquery.autocomplete.js?v=3d48009057928caad0ac736a0edf73ec' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100415000,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the script 'https://st8.kp.yandex.net/js/jquery.autocomplete_express.js?v=a2f195069d2ef53725b94908730620d4' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100415002,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/mobile_detector.js?v=f353c1055cd8b73557ff061b7d542ab7' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100415004,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 53 [Report Only] Refused to load the stylesheet 'https://st3.kp.yandex.net/js/search.css?v=7b2aee2eb07e8795428109103aeba5b9' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100415012,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 54 [Report Only] Refused to load the stylesheet 'https://st7.kp.yandex.net/js/superbanner.css?v=3e1fbab2983652a7e712df576b8857ff' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100415012,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the script 'https://st5.kp.yandex.net/js/flap_img.js?v=0ff09e30a4b6cb2ee85aa8645805caed' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100415027,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/main.js?v=6d84c46125881a4f854fffecdc057777' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100415029,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/noBrandBg.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415079,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/block_right.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415231,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/spacer.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415231,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/block_right_more.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415232,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/bg_cashup_line.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415234,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/bg_cashup.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415235,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/sqr-orange2.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415236,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/fe/social-teasers/instagram/2.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415237,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/randomMovie.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415238,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/randomMovieDescrBg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415239,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 2 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/arrowsRound.gif?v=3' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415239,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/pcode/adfox/loader.js 1 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/popup_background.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415279,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/goButtonBg.png?v=20130930' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415355,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/noBrandMenuBg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415356,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/goButtonBg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100415360,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://mc.yandex.ru/metrika/watch.js 31 chrome.loadTimes() is deprecated, instead use standardized API: Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1518100415456,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://mc.yandex.ru/metrika/watch.js 31 chrome.loadTimes() is deprecated, instead use standardized API: Paint Timing. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1518100415456,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-57.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416259,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-76.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416279,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "security 468 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/express_menu/noactive_bg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416383,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "security 468 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/express_menu/logo.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416384,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-96.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416385,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-120.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416459,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-128.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416490,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-144.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416510,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/favicons/favicon-152.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416526,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-180.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416542,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/public/img/favicons/favicon-196.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100416553,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/index.php?kp_query=%CF%E8%F0%E0%F2%FB+%EA%E0%F0%E8%E1%F1%EA%EE%E3%EE+%EC%EE%F0%FF&first=no&what= 897:12 Uncaught ReferenceError: metrikaSerhpClickNumber is not defined",
                "timestamp": 1518100416571,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 66 [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/favicons/favicon-152.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 67 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-57.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 68 [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-76.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 69 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-96.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 70 [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-120.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 71 [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-128.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 72 [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-144.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 73 [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/favicons/favicon-152.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 74 [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-180.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 75 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/public/img/favicons/favicon-196.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 77 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon.ico' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 88 [Report Only] Refused to load the stylesheet 'https://st1.kp.yandex.net/js/style.css?v=928339bc3adf25690ba76e46cfc9c503' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100417039,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st7.kp.yandex.net/js/jquery.cookie.js?v=343ff7096e03c591e92c64289223cdf0' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417100,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/jquery.other.js?v=2513193fc2ebacc43d8e3d8e7711138b' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417102,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS55F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417111,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS55F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417112,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS56F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417113,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS56F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417113,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS75F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417114,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS75F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417114,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS76F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417115,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTS76F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417115,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC55F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417115,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC55F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417116,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC75F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417116,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTC75F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417117,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN57F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417117,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN57F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417117,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN77F_W.woff' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417118,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the font 'https://st1.kp.yandex.net/fonts/PTN77F_W.ttf' because it violates the following Content Security Policy directive: \"font-src 'self' www.kinopoisk.ru yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net\".\n",
                "timestamp": 1518100417118,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/jquery.selectBox.min.js?v=304d8970a1f25f93f36b6e9235e2eeb5' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417121,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st3.kp.yandex.net/js/jquery.autocomplete.js?v=3d48009057928caad0ac736a0edf73ec' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417122,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st8.kp.yandex.net/js/jquery.autocomplete_express.js?v=a2f195069d2ef53725b94908730620d4' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417122,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/mobile_detector.js?v=f353c1055cd8b73557ff061b7d542ab7' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417124,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 112 [Report Only] Refused to load the stylesheet 'https://st7.kp.yandex.net/js/mykp.css?v=c1e2ae90ee359a77dd890b67ad8e3c23' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100417125,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 113 [Report Only] Refused to load the stylesheet 'https://st6.kp.yandex.net/js/tab.css?v=4c4259c00a5a7dc2c860ccfa87c13a2c' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100417125,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 114 [Report Only] Refused to load the stylesheet 'https://st7.kp.yandex.net/js/superbanner.css?v=3e1fbab2983652a7e712df576b8857ff' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100417126,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st8.kp.yandex.net/js/kinopoiskPlayer.js?v=542187f4eb868adae5ffa6a2b29164bc' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417129,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st5.kp.yandex.net/js/flap_img.js?v=0ff09e30a4b6cb2ee85aa8645805caed' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417131,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st6.kp.yandex.net/js/mymovies_ajax_guest.js?v=3488f8a84176a5729776bb3aef4e4c0c' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417132,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 207 [Report Only] Refused to load the stylesheet 'https://st4.kp.yandex.net/js/mymovies_ajax.css?v=eec5bee6ecc3d12abcab1d4a0b077d1d' because it violates the following Content Security Policy directive: \"style-src 'self' 'unsafe-inline' www.kinopoisk.ru st.kp.yandex.net st.kp.yandex.net yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net plus.kinopoisk.ru platform.twitter.com\".\n",
                "timestamp": 1518100417134,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/main.js?v=6d84c46125881a4f854fffecdc057777' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417137,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st6.kp.yandex.net/js/get_count_word.js?v=ad27d7d7525999df0b37b9b6b2e51f59' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417149,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/level1.js?v=5e1ecbf3b240c99d34c43b130fabbb17' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417157,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st4.kp.yandex.net/js/mymovies.js?v=77aed2764fc110d2ac0cd50bfdc4d9ee' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417159,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st3.kp.yandex.net/js/votes.js?v=fa2a14b7b021ad7aea38c8ad10db75bb' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417160,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st1.kp.yandex.net/js/qr.js?v=1a4867878a80c7623b6cd5a3c800f92c' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417162,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st4.kp.yandex.net/js/horisontal_scroll.js?v=280db83642c6787e2c9ebb0dc4281670' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417162,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st5.kp.yandex.net/js/handler.js?v=6b33d0cef846d78f7c837717a61022c0' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417163,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st7.kp.yandex.net/js/jquery.debounce.js?v=530e21032287d6037eb2827738becfeb' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417164,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the script 'https://st5.kp.yandex.net/js/soc_buttons.js?v=bc537ed02070a1caee600736e14121da' because it violates the following Content Security Policy directive: \"script-src 'self' www.kinopoisk.ru 'unsafe-inline' 'unsafe-eval' yandex.st plus.kinopoisk.ru yastatic.net yastatic.net betastatic.yandex.net betastatic.yastatic.net st.kp.yandex.net st.kp.yandex.net ajax.googleapis.com vk.com vkontakte.ru platform.twitter.com mc.yandex.ru ads.adfox.ru browser-updater.yandex.net an.yandex.ru cdn.syndication.twimg.com\".\n",
                "timestamp": 1518100417165,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/noBrandBg.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417173,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/flags.png?v=3' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417175,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/images/loaders/selectboxWidgetLoaderBlue.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417176,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/s3/kinopoisk-frontend/widgets-www/ott/0.0.89-ott/sdk.min.js 21 [Report Only] Refused to connect to 'https://widgets.kinopoisk.ru/ott/api/ids-exchange/?kpFilmId=4374' because it violates the following Content Security Policy directive: \"connect-src 'self' www.kinopoisk.ru bo.kinopoisk.ru mobile.yandex.net widgets.tst.kinopoisk.ru an.yandex.ru google.com mc.yandex.ru\".\n",
                "timestamp": 1518100417341,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/s3/kinopoisk-frontend/widgets-www/ott/0.0.89-ott/sdk.min.js 21 [Report Only] Refused to connect to 'https://widgets.kinopoisk.ru/ott/api/ids-exchange/?kpFilmId=4374' because it violates the following Content Security Policy directive: \"connect-src 'self' www.kinopoisk.ru bo.kinopoisk.ru mobile.yandex.net widgets.tst.kinopoisk.ru an.yandex.ru google.com mc.yandex.ru\".\n",
                "timestamp": 1518100417341,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to connect to 'https://widgets.kinopoisk.ru/ott/api/ids-exchange/?kpFilmId=4374' because it violates the following Content Security Policy directive: \"connect-src 'self' www.kinopoisk.ru bo.kinopoisk.ru mobile.yandex.net widgets.tst.kinopoisk.ru an.yandex.ru google.com mc.yandex.ru\".\n",
                "timestamp": 1518100417428,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 1582 [Report Only] Refused to load the image 'https://st5.kp.yandex.net/images/article/main_2959450_1495743508.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417484,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 1593 [Report Only] Refused to load the image 'https://st3.kp.yandex.net/images/article/main_2605675_1435238342.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417484,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 1604 [Report Only] Refused to load the image 'https://st6.kp.yandex.net/images/news/main_2218756_1375936996.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417485,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 1615 [Report Only] Refused to load the image 'https://st6.kp.yandex.net/images/news/main_1993590_1351594086.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417485,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/about_cinema.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417489,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/bg_main_line.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417490,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/ul-trivia.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417490,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/profile/icons_soc.gif?v=3' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417492,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/review_icon.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417542,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/refresh.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417542,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/profile/icons_soc.gif?v=3' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417542,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/divider.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417543,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/comm_elements.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417543,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/profile/comajax_green.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417544,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/about_cinema.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417605,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/inputs.gif?v=20130514' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417657,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/block_right_more.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417673,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right_pop.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417674,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/spacer.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417675,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/arrowsRight.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417675,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right_dvd_bg.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417676,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right_dvd_bg.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417677,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/block_right_more.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417678,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/spacer.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417678,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/subscribe.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417678,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/subscribe.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417679,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 3246 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/randomMovie.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417690,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 3246 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/randomMovieDescrBg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417691,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 3246 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/arrowsRound.gif?v=3' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417691,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 3246 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/icons/block_right.jpg' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417693,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 3246 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/sqr-orange2.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417693,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 3246 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/block_right_more.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417694,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 3246 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/bg_cashup_line.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417696,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ 3246 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/right/bg_cashup.gif' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417697,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://st1.kp.yandex.net/js/main.js?v=6d84c46125881a4f854fffecdc057777 1 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/popup_background.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417783,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/goButtonBg.png?v=20130930' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417887,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/noBrandMenuBg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417888,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yandex.st/jquery/1.9.1/jquery.min.js 4 [Report Only] Refused to load the image 'https://st1.kp.yandex.net/images/goButtonBg.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417893,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/images/selectboxWidget.gif?2' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417908,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/images/selectboxWidget.gif?2' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417909,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/images/selectboxWidget.gif?2' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417909,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/images/selectboxWidget.gif?2' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417909,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/images/selectboxWidget.gif?2' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100417909,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://mc.yandex.ru/metrika/tag.js 25 chrome.loadTimes() is deprecated, instead use standardized API: Navigation Timing 2. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1518100418012,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://mc.yandex.ru/metrika/tag.js 25 chrome.loadTimes() is deprecated, instead use standardized API: Paint Timing. https://www.chromestatus.com/features/5637885046816768.",
                "timestamp": 1518100418013,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/daas/stripe.html 9:1145 \"invalid data \"",
                "timestamp": 1518100418050,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/daas/stripe.html 9:1145 \"invalid data \"",
                "timestamp": 1518100418053,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/s3/kinopoisk-frontend/widgets-www/discovery/0.0.214-discovery/sdk.min.js 6 [Report Only] Refused to connect to 'https://widgets.kinopoisk.ru/discovery/api/trailers?previews=4374%2C112780' because it violates the following Content Security Policy directive: \"connect-src 'self' www.kinopoisk.ru bo.kinopoisk.ru mobile.yandex.net widgets.tst.kinopoisk.ru an.yandex.ru google.com mc.yandex.ru\".\n",
                "timestamp": 1518100418916,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/s3/kinopoisk-frontend/widgets-www/discovery/0.0.214-discovery/sdk.min.js 6 [Report Only] Refused to connect to 'https://widgets.kinopoisk.ru/discovery/api/trailers?previews=4374%2C112780' because it violates the following Content Security Policy directive: \"connect-src 'self' www.kinopoisk.ru bo.kinopoisk.ru mobile.yandex.net widgets.tst.kinopoisk.ru an.yandex.ru google.com mc.yandex.ru\".\n",
                "timestamp": 1518100418916,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/s3/kinopoisk-frontend/widgets-www/ott/0.0.89-ott/sdk.min.js 21 [Report Only] Refused to connect to 'https://widgets.kinopoisk.ru/ott/api/ids-exchange/?kpFilmId=4374' because it violates the following Content Security Policy directive: \"connect-src 'self' www.kinopoisk.ru bo.kinopoisk.ru mobile.yandex.net widgets.tst.kinopoisk.ru an.yandex.ru google.com mc.yandex.ru\".\n",
                "timestamp": 1518100418917,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://yastatic.net/s3/kinopoisk-frontend/widgets-www/ott/0.0.89-ott/sdk.min.js 21 [Report Only] Refused to connect to 'https://widgets.kinopoisk.ru/ott/api/ids-exchange/?kpFilmId=4374' because it violates the following Content Security Policy directive: \"connect-src 'self' www.kinopoisk.ru bo.kinopoisk.ru mobile.yandex.net widgets.tst.kinopoisk.ru an.yandex.ru google.com mc.yandex.ru\".\n",
                "timestamp": 1518100418917,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-57.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100418928,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-76.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100418946,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st5.kp.yandex.net/public/img/favicons/favicon-96.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100418946,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to connect to 'https://widgets.kinopoisk.ru/discovery/api/trailers?previews=4374%2C112780' because it violates the following Content Security Policy directive: \"connect-src 'self' www.kinopoisk.ru bo.kinopoisk.ru mobile.yandex.net widgets.tst.kinopoisk.ru an.yandex.ru google.com mc.yandex.ru\".\n",
                "timestamp": 1518100418957,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-120.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100418969,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st4.kp.yandex.net/public/img/favicons/favicon-128.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100418969,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-144.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100418977,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st6.kp.yandex.net/public/img/favicons/favicon-152.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100419015,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st8.kp.yandex.net/public/img/favicons/favicon-180.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100419015,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://www.kinopoisk.ru/film/piraty-karibskogo-morya-proklyatie-chernoy-zhemchuzhiny-2003-4374/ - [Report Only] Refused to load the image 'https://st1.kp.yandex.net/public/img/favicons/favicon-196.png' because it violates the following Content Security Policy directive: \"img-src 'self' data: www.kinopoisk.ru vk.com vkontakte.ru pbs.twimg.com platform.twitter.com syndication.twitter.com google.com imeem.com samsung.com yandex.ru yandex.st yastatic.net betastatic.yandex.net betastatic.yastatic.net yastatic.net st.kp.yandex.net st.kp.yandex.net st.tst.kp.yandex.net avatars.mds.yandex.net storage.mds.yandex.net avatars.mds.yandex.net awaps.yandex.net www.tns-counter.ru favicon.yandex.net ads.adfox.ru an.yandex.ru mc.yandex.ru\".\n",
                "timestamp": 1518100419015,
                "type": ""
            }
        ],
        "screenShotFile": "screenshots\\009a0077-0054-00ff-0077-00bf003300e4.png",
        "timestamp": 1518100400767,
        "duration": 18243
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    var firstTimestamp = a.timestamp;
    var secondTimestamp = b.timestamp;

    if (firstTimestamp < secondTimestamp) return -1;else return 1;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    var prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length-1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};