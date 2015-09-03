# jQuery Nebri Authentication

The simple and easy-to-use package for making authenticated Nebri api requests from a jQuery application.

This package is intended for use with a Nebri instance. Visit https://nebrios.com to sign up for free!

<h2>Installation</h2>
Copy jquery.nebri_auth.js to the appropriate location in your application.

<h2>Requirements</h2>
This package requires https://github.com/briem-bixly/jquery-nebrios.

NOTE: Before using any classes and associated functions in this package, you must include nebrios-authentication in your Nebri Instance and set up any authentication methods you would like to utilize. See https://github.com/briem-bixly/nebrios-authentication/blob/master/README.md for more information.

<h2>Public Classes</h2>
<strong>NebriTokenClient</strong>
This is the most basic authentication method supported. This class must be instantiated before use.
```
var token_client = $.NebriTokenClient('instance_name', 'token');
```
- instance name is your Nebri instance name. i.e. https://<strong>instance_name</strong>.nebrios.com
- your token must be generated on your Nebri instance using https://github.com/briem-bixly/nebrios-authentication

<strong>NebriBasicClient</strong>
```
var basic_client = $.NebriBasicClient('instance_name', 'username', 'password');
```
- before using this method, a username and password combo should be saved to your Nebri instance using https://github.com/briem-bixly/nebrios-authentication

<strong>NebriOAuthClient</strong>
```
var oauth_client = $.NebriOAuthClient('instance_name', 'consumer_key', 'consumer_secret', 'access_token');
```
- consumer key and consumer secret should be obtained from your Nebri instance using https://github.com/briem-bixly/nebrios-authentication
- if you have already created an access token all arguments should be passed
- if you have not created an access token, only consumer key and consumer secret are required. this app will make the appropriate call for an access token and will save the generated token to your NebriAuthClient instance automatically.

<h2>Public Function</h2>
All classes have the same function with the same parameters.

<strong>api_request</strong>

- api_module: the name of the api module stored on your NebriOS instance
- view_name: the name of the target function contained in the given api module
- method: the desired HTTP request method
- payload: an object containing params and values, if no payload is meant to be sent, `null` should be passed
- callback: the function to execute after a successful api request. this callback will receive all data included in your view's response. `null` should be sent if a callback is not specified.
- error_callback: the function to execute after an unsuccessful api request. `null` should be sent if an error callback is not specified.

<h2>Example</h2>
```
<script src="js/jquery.nebri.js"></script>
<script src="js/jquery.nebri_auth.js"></script>
<script type="text/javascript">
    var token_client = new $.NebriTokenClient("instance_name", "token");
    token_client.api_request("nebrios_authentication", "token_auth_endpoint", "POST", {'key': 'value'}, function(data){
        console.log(data);
    });
    var basic_client = new $.NebriBasicClient("instance_name", "username", "password");
    basic_client.api_request("nebrios_authentication", "basic_auth_endpoint", "POST", null, function(data){
        console.log(data);
    });
    var oauth_client = new $.NebriOAuthClient("instance_name", "consumer_key", "consumer_secret", "access_token");
    oauth_client.api_request("nebrios_authentication", "oauth_endpoint", "POST", null, function(data){
        console.log(data);
    });
    var oauth_client_no_token = new $.NebriOAuthClient("instance_name", "consumer_key", "consumer_secret");
    oauth_client.api_request("nebrios_authentication", "oauth_endpoint", "POST", null, function(data){
        console.log(data);
    }, function(error){
        console.log(error)
    });
</script>
```
