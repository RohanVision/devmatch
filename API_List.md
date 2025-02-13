# DeveMatch APIs - Always Categorze APIs

## authRouter

-   POST /signup
-   POST /login
-   POST /logout

## profileRouter

-   GET /profile/view
-   PATCH /profile/edit
-   PATCH /profile/password

## connectionRequestRouter

    <!-- Dynamic request -->

-   POST /send/request/:status/:userId
-   POST /send/review/:status/:reqestId

<!-- -   POST /send/request/ignored/:userId
-   POST /send/review/rejected/:rejected -->

## userRoter

-   GET /user/connection
-   GET /user/request/received
-   GET /user/feed

## messageRouter

-   POST /user/

status: ignore, interested, accepted, rejected
