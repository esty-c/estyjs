var host;

var app;
var token = null;
var push_server_conf = { is_loaded: false };
var appstorage;
var globalUnique = 1;
//live feed global
var isCreatingNewFeed = false;

//inter tab communication
var wc;
var broadData;
document.addEventListener('DOMContentLoaded', function () {
    /// appstorage = new Storage();
    // broadData = new Broadcast();
    try {
        host = "http://192.168.2.12:61/";

        //host = 'http://23.253.245.91:61/';
        //token = new Storage().getItem('access_token');
        var route = [
                    { pageName: 'home', pageLocation: "home.html", pageTitle: "Home", displayUrl: 'home', section: "#home", isContentLoadingEverytime: true },
                    { pageName: 'services', pageLocation: "services.html", pageTitle: "Services", displayUrl: 'services', section: "#services", isContentLoadingEverytime: true },
                    { pageName: 'products', pageLocation: "products.html", pageTitle: "Products", displayUrl: 'products', section: "#products", isContentLoadingEverytime: true },
                    { pageName: 'about', pageLocation: "AboutUs.html", pageTitle: "About us", displayUrl: 'about', section: "#about", isContentLoadingEverytime: true },
                    { pageName: 'contact', pageLocation: "contact.html", pageTitle: "contact", displayUrl: 'contact', section: "#contact", isContentLoadingEverytime: true },
                    { pageName: 'signin', pageLocation: "signin.html", pageTitle: "Sign In", displayUrl: 'signin', section: "#signin", isContentLoadingEverytime: true },
                    { pageName: 'signup', pageLocation: "signup.html", pageTitle: "Sign Up", displayUrl: 'signup', section: "#signup", isContentLoadingEverytime: true },
                    { pageName: 'logout', pageLocation: "logout.html", pageTitle: "logout", displayUrl: 'logout', section: "#logout", isContentLoadingEverytime: true }

        ];

        app = new EstyJs();

        app.routes = route;
        app.appName = 'TapSocial';
        $('#nav-global-view').show();
       
        app.onPageLoading = function (pageTitle, isAlreadyLoaded) {
            console.log(pageTitle + '   ' + isAlreadyLoaded);
            //  alert('called');
            $('#nav-global-view').show();
        }
        app.init();
        $('#lblMyName').val('dd');

        //events();
        app.loadCSS("resource/css/lazyloading.css");
    }
    catch (err) {
        alert('msg:  ' + err.message);
    }
});//end of main