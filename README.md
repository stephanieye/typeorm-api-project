**HACKER NEWS API CLONE**
-----
==========================================================================

**Project Brief**

The goal of the project is to build a simple Hacker News API clone. If you don’t know Hacker News, it’s a very simple website where anyone can submit a link of a short message to discuss a specific topic with the dev community.

You need to build an API that will allow a frontend developer to build the following pages:
- https://news.ycombinator.com/ (no need to consider points and pagination)
- https://news.ycombinator.com/item?id=1925249 (including Add Comment feature, no need for points and nested / replies comments)
- https://news.ycombinator.com/submit (including Login and Signup form, no need for reset password)

Step 1: Defining the API architecture (a list of endpoints if you choose to build a REST API or a list of queries / mutations if you choose to build a GraphQL API). You’ll need to justify the architecture. Feel free to do 2/3 versions of the architecture and argue why is one better than the others.

Step 2: Choice of technology. You have to use the following technologies: Typescript, NodeJS, TypeORM with a SQL database (SQLite or MySQL or PostgreSQL). If you choose to use external libraries, you’ll need to justify your choices (Is it something you can implement by yourself? Why this specific library? etc…)

Step 3: Build the API locally (test it with your browser or with Postman or equivalent)

Step 4: Push the code to a public git repository (using Github or equivalent)

Bonus steps (no specific order):
1. Write tests (you can use a TDD approach or write them afterwards)
2. Deploy / host the API somewhere (Heroku and Zeit Now are good options for a simple project like this, but feel free to use something else if you want)
3. Use Prettier to format the codebase
4. Use ESLint with https://www.npmjs.com/package/eslint-config-airbnb-base (Hint: you can find help here to make ESLint work with Typescript)

==========================================================================

**Project Architecture**

I created three entities, with these relationships and endpoints:

USER

Relationships
- OneToMany with Post
- OneToMany with Comment

Endpoints
- GET /users
- GET /users/:id
- POST /users
- PATCH /users/:id (needs authorisation with checkJwt and checkIsUser)
- DELETE /users/:id (needs authorisation with checkJwt and checkIsUser)

POST

Relationships
- ManyToOne with User
- OneToMany with Comment

Endpoints
- GET /posts
- GET /posts/:id
- POST /posts (needs authorisation with checkJwt and checkPrivateRoute)
- PATCH /posts/:id (needs authorisation with checkJwt and checkIsUser)
- DELETE /posts/:id (needs authorisation with checkJwt and checkIsUser)

COMMENT

Relationships
- ManyToOne with User
- ManyToOne with Post

Endpoints
- GET /comments
- GET /comments/:id
- POST /comments (needs authorisation with checkJwt and checkPrivateRoute)
- PATCH /comments/:id (needs authorisation with checkJwt and checkIsUser)
- DELETE /comments/:id (needs authorisation with checkJwt and checkIsUser)

==========================================================================

**Project Process**

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
Tried to use Docker but it was too slow on my computer/wifi
Had some difficulties when try to use a downloaded PostgreSQL system

Heroku app is at https://first-backend-project-2019.herokuapp.com/
Always deployed to Heroku after succeeding locally so could tackle any difficulties step by step rather than accumulating them

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