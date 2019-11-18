var _self;
var routeObject = new Array();
function EstyJs() {
    try {
        this.routes = [];
        this.appName = '';
        this.currentPage = '';
        _self = this;
        this.pageHistory = new Array();

        var anchors = document.getElementsByTagName("a");
        for (var i = 0, length = anchors.length; i < length; i++) {
            var anchor = anchors[i];
            anchor.addEventListener('click', this.onhashchange, false);
        };
        window.addEventListener("hashchange", this.onhashchange);
        window.addEventListener('popstate', this.popstateChange);

        //  _self.initPage(hashtag, queryString);

        //  var pageName=_self.getUrlDetails().pageName;
        // var queryString = _self.getUrlDetails().queryString
    }
    catch (err) {
        alert('errpr esty.vanila: ' + err);
        console.log(err);
    }
    // this.onPageLoad = onPageLoad;
}
EstyJs.prototype.init = function () {
    routeLogic(null, null);
}
function getHashTag2(hashtag) {
    var tag = hashtag.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
    tag = tag.replace('#', '');
    var index = tag.indexOf("?");
    if (index > 0) {
        tag = tag.substring(0, index);
    }
    return tag;
}

EstyJs.prototype.stopAllVideos = function (element) {
    // document.getElementsByTagName("a")
    //var iframe = element.querySelector( 'iframe');
    //var video = element.querySelector( 'video' );
    var iframe = document.querySelector('iframe');
    var videos = document.getElementsByTagName('video');
    if (iframe !== null) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }

    // console.log(video);
    //alert(video.length);

    for (var i = 0; i < videos.length; i++) {
        var video = videos[i];
        if (video !== null) {
            video.pause();
        }
    };
};

EstyJs.prototype.changeUrl = function (url) {
    if (typeof (history.pushState) != "undefined") {
        history.pushState("", "", url);
    } else {
        window.location.href = url;
        // alert("Browser does not support HTML5.");
    }
}

function getOrigin() {
    if (!window.location.origin) {
        return window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    return window.location.origin;
}

function getAllQueryString(url) {
    var _array = url.split("?");
    if (_array.length > 0) {
        return _array[1];
    }

    return null;
}
EstyJs.prototype.loadJs = function (url, isAsync, callback) {
    if (callback != null) {
        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) {  //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                        script.readyState == "compvare") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
        document.body.appendChild(script);
    }
    else {
        // DOM: Create the script element
        var jsElm = document.createElement("script");
        // set the type attribute
        jsElm.type = "application/javascript";
        // make the script element load file
        jsElm.src = url;
        // finally insert the element to the body element in order to load the script
        jsElm.async = isAsync;
        // alert(jsElm);
        document.body.appendChild(jsElm)
        document.getElementsByTagName("head")[0].appendChild(jsElm);

        if (callback != null) {
            var intervalTimer = setTimeout(function () {
                alert('call back');
                callback();
                //  clearInterval(intervalTimer);
            }, 200);
        }
    }

    //window.onload = function () {
    //    var req = new XMLHttpRequest();
    //    req.open('GET', url, false);
    //    req.onreadystatechange = function () {
    //        if (req.readyState == 4) {
    //            var s = document.createElement("script");
    //            s.appendChild(document.createTextNode(req.responseText));
    //            document.head.appendChild(s);
    //            callback();
    //        }
    //    };
    //    req.send(null);
    //}

    //var script = document.createElement("script")
    //script.type = "text/javascript";

    //if (script.readyState) {  //IE
    //    script.onreadystatechange = function () {
    //        if (script.readyState == "loaded" ||
    //                script.readyState == "compvare") {
    //            script.onreadystatechange = null;
    //            callback();
    //        }
    //    };
    //} else {  //Others
    //    script.onload = function () {
    //        callback();
    //    };
    //}

    //script.src = url;
    // document.getElementsByTagName("head")[0].appendChild(script);
    // document.body.appendChild(script)
}

EstyJs.prototype.loadCSS = function (href, before, media) {
    "use strict";
    var ss = window.document.createElement("link");
    var ref = before || window.document.getElementsByTagName("script")[0];
    var sheets = window.document.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    ss.media = "only x";

    ref.parentNode.insertBefore(ss, ref);
    function toggleMedia() {
        var defined;
        for (var i = 0; i < sheets.length; i++) {
            if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
                defined = true;
            }
        }
        if (defined) {
            ss.media = media || "all";
        }
        else {
            setTimeout(toggleMedia);
        }
    }
    toggleMedia();
    return ss;
}

EstyJs.prototype.bindNewAnchor = function () {
    var anchors = document.getElementsByTagName("a");
    for (var i = 0, length = anchors.length; i < length; i++) {
        var anchor = anchors[i];
        anchor.addEventListener('click', this.onhashchange, false);
    };
    window.addEventListener("hashchange", this.onhashchange);
    window.addEventListener('popstate', this.popstateChange);
}

function sc(elm, html) {
    elm.innerHTML = html;
    var scripts = elm.getElementsByTagName("script");
    // If we don't clone the results then "scripts"
    // will actually update live as we insert the new
    // tags, and we'll get caught in an endless loop
    var scriptsClone = [];
    for (var i = 0; i < scripts.length; i++) {
        scriptsClone.push(scripts[i]);
    }
    for (var i = 0; i < scriptsClone.length; i++) {
        var currentScript = scriptsClone[i];
        var s = document.createElement("script");
        // Copy all the attributes from the original script
        for (var j = 0; j < currentScript.attributes.length; j++) {
            var a = currentScript.attributes[j];
            s.setAttribute(a.name, a.value);
        }
        s.appendChild(document.createTextNode(currentScript.innerHTML));
        currentScript.parentNode.replaceChild(s, currentScript);
    }
}

function insertHtml(divId, innerHTML) {
    var div = document.getElementById(divId);
    div.innerHTML = innerHTML;

    var x = div.getElementsByTagName("script");
    for (var i = 0; i < x.length; i++) {
        var attribute = x[i].getAttribute("src");
        if (attribute != null && attribute.length > 2) {
            var newScript = document.createElement("script");

            document.body.appendChild(newScript);
        }
        else {
        }
    }
}
EstyJs.prototype.getUrlDetails = function () {
    var data = { pageName: '', queryString: '' };
    data.pageName = window.location.pathname.toLocaleLowerCase().replace('/', '');
    var full_url = window.location.href;
    var paramArray = full_url.split("?");
    if (paramArray.length > 1) {
        query_string = '?' + paramArray[1];
        data.queryString = '?' + paramArray[1];
    }
    return data;
}
EstyJs.prototype.redirectPage = function (hashtag, query_string) {
    routeLogic(hashtag, query_string);
}

function ContentLoader(className, objectName) {
    this.className = className;
    this.objectName = objectName;
}

function routeLogic(hashtag, query_string) {
    if (hashtag == null || hashtag.length == 0) {
        var url = window.location.pathname;

        var full_url = window.location.href;

        var paramArray = full_url.split("?");
        if (paramArray.length > 1) { query_string = '?' + paramArray[1]; }

        if (url != "/") {
            hashtag = getHashTag2(url.replace('/', '#'))
        }
        else {
            hashtag = _self.routes[0].displayUrl;
        }
    }
    //  alert('hash'+hashtag);
    //  console.log(hashtag);
    var section = document.getElementById('app').getElementsByTagName("section");
    for (var i = 0; i < section.length; i++) {
        section[i].style.display = 'none';
    }
    var isRouteFound = false;
    /// alert('length: ' + _self.routes.length);
    for (var i = 0; i < _self.routes.length; i++) {
        console.log(_self.routes[i].displayUrl + "  " + _self.routes[i].displayUrl);
        if (_self.routes[i].displayUrl == hashtag || "/" + _self.routes[i].displayUrl == hashtag) {
            isRouteFound = true;
            document.title = _self.routes[i].pageTitle;

            var id = _self.routes[i].section.replace('#', '');
            var selector = document.getElementById(_self.routes[i].section.replace('#', ''));
            var flag = selector.getAttribute('content-loaded');
            //alert("is+ loaded: "+flag);
            _self.onPageLoading(_self.routes[i].displayUrl, flag || false);
            if (flag == 'true' && _self.routes[i].isContentLoadingEverytime == false) {
                selector.setAttribute('content-loaded', true);
                selector.style.display = '';
                redirect('/' + hashtag, query_string);
               
            }
            redirect('/' + hashtag, query_string);
            $.get(getOrigin() + '/views/' + _self.routes[i].pageLocation, function (data, status) {
                insertHtml(id, data);
                selector.style.display = '';
                _self.bindNewAnchor();

                _self.loadJs(getOrigin() + '/controllers/' + _self.routes[i].displayUrl + '.js', false, function () {
                    var className = _self.routes[i].displayUrl;
                 
                   // var myObject = new window[className]();
                   // routeObject.push(new ContentLoader(className, myObject));
                  //  myObject.main();
                });
            });

            return;
        }
    }

    if (isRouteFound == false) {
        console.warn("no route found", "<page name>");
        var x = document.createElement("SECTION");
        x.setAttribute("id", "errorpage");
        document.getElementById('app').appendChild(x);
        var errorPageSelector = document.getElementById('errorpage');
        errorPageSelector.innerHTML = '<h3>opps!</h3> <p>no route found</p>';
        errorPageSelector.style.display = '';
    }
}
EstyJs.prototype.initPage = function (hashtag, query_string) {
    routeLogic(hashtag, query_string);
}
function ChangeUrl(page, url) {
    if (typeof (history.pushState) != "undefined") {
        var obj = { Page: page, Url: url };
        history.pushState(obj, obj.Page, obj.Url);
    } else {
        window.location.href = "homePage";
        // alert("Browser does not support HTML5.");
    }
    _self.stopAllVideos();
}

function redirect(hashtag, query_string) {
    hashtag = hashtag.replace("//", "/");

    if (query_string == null || query_string == undefined) {
        query_string = "";
    }

    var stateObj = { foo: "bar" };

    _self.pageHistory.push(hashtag + query_string);
    if (typeof (history.pushState) != "undefined") {
        window.history.pushState(stateObj, 'Title', hashtag + query_string);
    }
    else {
        //  window.location.href = hashtag + query_string;
    }
    //  history.replaceState('data to be passed', 'Title of the page', hashtag + query_string);
    _self.stopAllVideos();
}
EstyJs.prototype.popstateChange = function (event) {
    var lastpage = _self.pageHistory[_self.pageHistory.length - 2];
    // alert(lastpage);
    //  let hashtag = getHashTag2(lastpage);
    var hashtag = getHashTag2(lastpage.replace('/', '#'))
    // alert(hashtag);
    var queryString = getAllQueryString(lastpage);
    if (queryString != null) {
        queryString = "?" + queryString;
    }

    //  alert(queryString);
    //redirect(lastpage,null);
    _self.initPage(hashtag, queryString);
};

EstyJs.prototype.onhashchange = function (event) {
    event.preventDefault();
    var hashtag = '';
    hashtag = this.getAttribute('href');

    var re = new RegExp("^(http|https)://", "i");
    var str = hashtag;
    var match = re.test(str);
    if (match == true) {
        if (contains(new Request(window.location.href).getHostName(), str) == false) {
            if (this.getAttribute("target") == "_blank") {
                window.open(hashtag, '_blank');
            }
            else {
                window.location.href = hashtag;
            }
            return;
        }
    }

    var queryString = getAllQueryString(hashtag);
    if (queryString != null) {
        queryString = "?" + queryString;
    }
    hashtag = getHashTag2(hashtag);
    _self.initPage(hashtag, queryString);
    // alert(queryString);
    //redirect('/' + hashtag, queryString);
}