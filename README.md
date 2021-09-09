# fullstack-auth-and-db-app

---

This project is an fullstack exercise, which was given to me in a course I've participated in. The task was to create a blogging page for multiple users, which enables the user to login and create an article or blog-entry, which then shows up on the index page of the app and gets stored on a database.

![](https://www.dropbox.com/s/zt7rg27knn9koeq/blogger-app.png?raw=1)

I've used **Next.js** to build the application. For the authentication part, I've used **auth0**, **MongoDB Atlas** to store the data, and for the styles I've used **Tailwind CSS**, like always. As a special feature, the blogs/articles can be written in **markdown**. 

I'm temporarly using the app to promote my github projects in order to make it a bit more appealing to the eyes. Nevertheless, feel free to play around with it: write an article or try a php injection (which technically shouldn't work). You can delete your contributions afterwards and leave no traces. I'm not storing your user data in a separate DB collection. Here is a link:

https://fullstack-auth-and-db-app-nofrontendsolutions.vercel.app

<br>

## A note on *_getStaticProps_, _getStaticPaths_, _getServerSideProps_*:
---

Don't do like me and use **getStaticProps** and/or **getStaticPaths** if the data you're loading isn't static. Now that might sound obvious; however, if you're using these two functions during development like me, they behave diffenrently. During development they get called on every request, giving me a wrong impression on how to use them properly. 

So I used **getStaticProps/Paths** to connect to my DB and load the initial data and create the intital paths, but also used these functions to load the newly dynamically created data by a user, together with the necessary paths. 
That worked fine during development; however, once I built and deployed the app to **Vercel**, although the application ran, the state of the data never changed. Newly created data by a user never got picked up on after it was sent to the database, not even after a hard refresh.

Running at **build time** means during a rebuild of the whole application. Only if I redeployed the app, the newly created data got picked up on and showed up on the screen...which forced me to rewrite the whole application.