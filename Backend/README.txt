
---------------------------------Express-------------------------------------
**---Morgan Module :
 HTTP request logger middleware for node.js

**---what is HTTP logging : 
 HTTP logging is a middleware that logs information about incoming
 HTTP requests and HTTP responses.

 ok so basically send and receive http request/response data we are
 gonna use Morgan same as we used axios.
 
**---app.disable();
The app.disable() function is used to set the boolean setting name to false. 
It is basically the shorthand for the app.set(name, false)

>> We have disabled here "x-powered-by" which is :-
    describes the technologies used by the webserver.
    --""less hackers know about our stack as tuts said""

**--promise.all([])
Takes array as input in which list of promises given 
gets executed only if all of them resolved (all of them)



----------------------------------MongoDB-------------------------------------------
mongo-memory-server : 
    > The mongo-memory-server npm package provides an easy solution for 
     testing Mongoose Models.
    > You can store dummy data in memory without touching your application's database
    > SO JUST TESTING MONGODB....

----------------------------------JWT tokens--------------------------------
JWT tokens generates tokens that stores login information and not whole session data
 on server side 
 > that makes it efficient and easily accessible and faster too...

jwt.sign( payload , jwtsecretkey , expiresIN)

-------------------------------------Auth OTP--------------------------------
> basic function only takes id as input and updates the information
> we need authentication so we have to create middleware for that
> look in Middleware folder