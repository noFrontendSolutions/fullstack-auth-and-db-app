# fullstack-auth-and-db-app

---

This project is an fullstack exercise, which was given to me in a course I've participated in. The task was to create a blogging page for multiple users, in which they can login and create an article or blog-entry, which then shows up on the index page of the app and also gets stored on a database.

![](https://www.dropbox.com/s/zt7rg27knn9koeq/blogger-app.png?raw=1)

I've used **Next.js** to build the application. For the authentication part, I've used **auth0**, which works excellent in combination with **Next**. The user data is handled with MongoDB Atlas. For the styles I've used **Tailwind CSS**, like always.

I'm temporarly using the app to promote my github projects in order to make it a bit more appealing to the eyes. Here is a link:

https://fullstack-auth-and-db-app-nofrontendsolutions.vercel.app

<br>


## A note on *_getStaticProps_, _getStaticPaths_, _getServerSideProps_*:
---

Don't do like me and use *getStaticProps* and/or *getStaticPaths* if the data you're loading isn't static. Now that might sound obvious; however, if you're using these two functions during development like me, they behave diffenrently. During development they get called on every request, giving me a wrong impression on how to use them properly. 

What I did was that I used *getStaticProps/Paths* to connect to my DB and load the initial data and create the intital paths, but also used these functions to load the newly dynamically created data by a user, together with the necessary paths. 
That worked fine during development; however, once I built and deployed the app to *Vercel*, although the application ran, the state of the data never changed. Newly created data by a user never got picked up on after it was sent to the db, not even after a hard refresh.

Running at **build time** means during a rebuild of the whole application. Only if I redeployed the app, the newly created data got picked up on and showed up on the screen.

So I had to rewrite my whole application. Simply replacing *getStaticProps* with *getServerSideProps* was a quick fix for all those pages in which I didn't use *getStaticPaths*. *getServerSideProps* gets called on every request and behaves in a way I expected *getStaticProps* to work. However, you can't use *getServerSideProps* in combination with *getStaticPaths*. So I also had to rewrite my *backend* and connect it to all the pages in which I used *getStaticPaths*. 

Why am I writing this if it's all mentioned in the official **Next.js** documentation? 

My point being that you might be better off using none of the above functions. Use the tools **React** already provides to you. *getServerSideProps* will run on every request, which might be something you don't want, since it causes overlay. 

A more flexible and efficient solution might be to use the *fetch API* in combination with the useEffect hook. *Fetch* data conditionally, so that you don't fetch on every request, but only if, for instance, a certain global state changes, which in turn could be provided to your application using the useContext hook together with a context provider. I guess **caching** data on the client side is the keyword here, which you can't do with the *getServerSideProps* function. 