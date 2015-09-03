(function($) {
    function NebriToken(instance_name, token) {
        this.instance = instance_name;
        this.token = token;
    }
    NebriToken.prototype = new $.NebriClient();
    NebriToken.prototype.parent = $.NebriClient.prototype;
    NebriToken.prototype.api_request = function(api_module, view_name, method, payload, callback, error_callback) {
        if (payload == null){
            payload = {'token': this.token};
        } else{
            payload['token'] = this.token;
        }
        this.parent.api_request.call(this, api_module, view_name, method, payload, callback, error_callback);
    };
    function NebriBasic(instance_name, username, password) {
        this.instance = instance_name;
        this.username = username;
        this.password = password;
    }
    NebriBasic.prototype = new $.NebriClient();
    NebriBasic.prototype.parent = $.NebriClient.prototype;
    NebriBasic.prototype.api_request = function(api_module, view_name, method, payload, callback, error_callback) {
        if (payload == null){
            payload = {'basic_auth': "Basic " + btoa(this.username + ':' + this.password)};
        } else {
            payload['basic_auth'] = "Basic " + btoa(this.username + ':' + this.password);
        }
        this.parent.api_request.call(this, api_module, view_name, method, payload, callback, error_callback);
    };
    function NebriOAuth(instance_name, consumer_key, consumer_secret, access_token){
        this.instance = instance_name;
        this.consumer_key = consumer_key;
        this.consumer_secret = consumer_secret;
        if (access_token == null){
            var params = {'key': this.consumer_key, 'secret': this.consumer_secret};
            this.parent.api_request.call(this, "nebrios_authentication", "get_oauth_token", "POST", params, function(data){
                if (data == "<class 'core.http.HttpResponseForbidden'>"){
                    return "Consumer Key or Consumer Secret are incorrect.";
                }
                this.access_token = data['access_token'];
            }, function(error){
                    return error;
                });
        } else {
            this.access_token = access_token;
        }
    }
    NebriOAuth.prototype = new $.NebriClient();
    NebriOAuth.prototype.parent = $.NebriClient.prototype;
    NebriOAuth.prototype.api_request = function(api_module, view_name, method, payload, callback, error_callback) {
        if (payload == null){
            payload = {'access_token': this.access_token};
        } else {
            payload['access_token'] = this.access_token;
        }
        this.parent.api_request.call(this, api_module, view_name, method, payload, callback, error_callback);
    };

    $.NebriTokenClient = NebriToken;
    $.NebriBasicClient = NebriBasic;
    $.NebriOAuthClient = NebriOAuth;
})(jQuery);