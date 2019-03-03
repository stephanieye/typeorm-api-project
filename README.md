## **HACKER NEWS API CLONE USING TYPEORM**

==========================================================================

**Project Brief**

Here is the challenge:

> The goal of the project is to build a simple Hacker News API clone. If you don’t know Hacker News, it’s a very simple website where anyone can submit a link of a short message to discuss a specific topic with the dev community.
>
> You need to build an API that will allow a frontend developer to build the following pages:
>
> - https://news.ycombinator.com/ (no need to consider points and pagination)
> - https://news.ycombinator.com/item?id=1925249 (including Add Comment feature, no need for points and nested / replies comments)
> - https://news.ycombinator.com/submit (including Login and Signup form, no need for reset password)
>
> Step 1: Defining the API architecture (a list of endpoints if you choose to build a REST API or a list of queries / mutations if you choose to build a GraphQL API). You’ll need to justify the architecture. Feel free to do 2/3 versions of the architecture and argue why is one better than the others.
>
> Step 2: Choice of technology. You have to use the following technologies: Typescript, NodeJS, TypeORM with a SQL database (SQLite or MySQL or PostgreSQL). If you choose to use external libraries, you’ll need to justify your choices (Is it something you can implement by yourself? Why this specific library? etc…)
>
> Step 3: Build the API locally (test it with your browser or with Postman or equivalent)
>
> Step 4: Push the code to a public git repository (using Github or equivalent)
>
> Bonus steps (no specific order):
>
> 1.  Write tests (you can use a TDD approach or write them afterwards)
> 2.  Deploy / host the API somewhere (Heroku and Zeit Now are good options for a simple project like this, but feel free to use something else if you want)
> 3.  Use Prettier to format the codebase
> 4.  Use ESLint with https://www.npmjs.com/package/eslint-config-airbnb-base

==========================================================================

**Project Architecture**

I created three Entities: User, Post and Comment.

Each Entity has either a ManyToOne or OneToMany relationship with each of the other two (for example. a User can create many Posts, whereas a Comment can belong to only one Post.)

I decided to create a REST API as that is what I'm familiar with. This is quite straightforward, with endpoints starting with /users, /posts and /comments respectively with which to carry out CRUD functions.

(There is a fourth for Authentication, /auth, with two POST endpoints that take passwords, for logging in and changing the password. Changing the password was not in the scope of the brief, but the tutorial I used taught it (see 'Resources' section below), so I just included it.)

For the GET endpoints, I tried to return as much data as possible as I thought it would be helpful for the Frontend developer. So, when you GET /users/:id, you get the User as well as all the User's Posts and Comments. When you GET /posts/:id, you get the Post and the User who wrote the Post (but not the Comments -- I will explain soon below). When you GET /comments/:id, you get the Comment, the Post the Comment belongs to, and the User who wrote the Comment.

Of course, maybe returning so much data is too overwhelming if there are a lot of entries, so I might choose to leave out some data if this API were to be used on a large scale.

As for challenges, my main challenge was in POSTing a Comment, as I need the Post's id to link the Comment to it (something I could not obtain by POSTing straight to /comments). In the end, I created /posts/:id/comments so I could access the Post's id via req.params.

As it turned out, the /posts/:id/comments endpoint was also useful for GETting the Comments for a Post. If I tried to include a Post's Comments in the body returned from GETting /posts/:id, the Comment's User field would not be populated, because I don't know how to use TypeORM's Query Builder to 'join' an Entity two layers deep (Post>Comment>User). It is not very useful to have a Comment's data without knowing which User wrote the Comment, so in the end this endpoint really proved its utility (letting me just join Comment>User).

I also had to protect certain routes with authorisation, following Hacker News's own logic (you don't have to log in to read posts and comments, but you must log in to create posts and comments). And Users should only be able to edit/delete their own Posts/Comments, as well as their own User details.

TypeORM's onDelete: CASCADE was also useful to ensure that when an Entity instance is deleted, dependent Entity instances also are. For example, when a User is deleted, so are the Posts and Comments the User made. If a Post is deleted, so are the Comments on that Post.

Lastly, I made the User password field a Hidden Column so that by default it does not return in API calls, and used addSelect to add the password only when necessary, i.e, when the User data is retrieved during Authentication.

Below are the three Entitities, their relationships and endpoints.

**USER**

Relationships

- OneToMany with Post
- OneToMany with Comment

Endpoints

- GET /users
- GET /users/:id
- POST /users
- PATCH /users/:id (needs authorisation with checkJwt and checkIsUser middlewares)
- DELETE /users/:id (needs authorisation with checkJwt and checkIsUser middlewares)

**POST**

Relationships

- ManyToOne with User
- OneToMany with Comment

Endpoints

- GET /posts
- GET /posts/:id
- POST /posts (needs authorisation with checkJwt middleware)
- PATCH /posts/:id (needs authorisation with checkJwt and checkIsAuthor middlewares)
- DELETE /posts/:id (needs authorisation with checkJwt and checkIsAuthor middlewares)
- GET /posts/:id/comments
- POST /posts/:id/comments (needs authorisation with checkJwt middleware)

**COMMENT**

Relationships

- ManyToOne with User
- ManyToOne with Post

Endpoints

- GET /comments
- GET /comments/:id
- PATCH /comments/:id (needs authorisation with checkJwt and checkIsCommenter middlewares)
- DELETE /comments/:id (needs authorisation with checkJwt and checkIsCommenter middlewares)

Lastly, two endpoints for **Authentication**: logging in and changing the password.

- POST /auth/login
- POST /auth/change-password

==========================================================================

**Resources**

Created using hello-nodejs-typescript starter code: https://github.com/larkintuckerllc/hello-nodejs-typescript

Started out with the help of this blog post:
https://codeburst.io/typescript-node-starter-simplified-60c7b7d99e27

And this series:
https://codeburst.io/typeorm-by-example-part-1-6d6da04f9f23

Then moved on to authentication with JWT with the help of:
https://medium.com/javascript-in-plain-english/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4

Also had to refer to TypeORM documentation often, especially for Query Builder:
https://typeorm.io/

==========================================================================

**Tools**

Database is Postgres.app: https://postgresapp.com/

- Tried to use Docker but it was too slow on my computer/wifi, while I had some difficulties when trying to use a downloaded PostgreSQL system.

Heroku app is at https://typeorm-api-project.herokuapp.com/

- I always deployed to Heroku after succeeding locally so that I could tackle any difficulties step-by-step rather than accumulating them.

Postman for API development environment

==========================================================================

**Running the project**

npm run watch-ts (recompiles application on source changes)

npm run watch-node (restarts application on recompilation)

npm run build-ts (only compiles the application)

npm run serve/npm run start (only starts the application)

==========================================================================

**Contact**

https://github.com/stephslye
