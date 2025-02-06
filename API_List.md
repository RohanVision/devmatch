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

-   POST /send/request/intersted/:userId
-   POST /send/request/ignored/:userId
-   POST /send/review/accepted/:reqestId
-   POST /send/review/rejected/:rejected

## userRoter

-   GET /user/connection
-   GET /user/request
-   GET /user/feed

## messageRouter

-   POST /user/

status: ignore, interested, accepted, rejected
