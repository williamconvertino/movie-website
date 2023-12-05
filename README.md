This website was made by William Convertino, Alan Wang, Jack Farley, Morgan Chu, and Adrian Guiterrez.

https://316-project.netlify.app/home

Alan Wang:
I will be focused on developing the frontend and UI components of the web application.
I created the basic frontend pages for the login and signup pages, and adjusted the overall frontend of the website after the integration of frontend and backend
I worked on adding the saved movie list feature to the user profile page, built out the basic frontend for the movie profile page, added template user conversations to the home page, and added warnings for the signup/login pages (i.e. if the incorrect password is entered or if an email inputted when signing up is already taken)
I created a page where users can add a movie to the database, updated the discussion post component so that users can add comments, and I updated the movie search page by adding options where users can filter movies by genre and year range or sort by year, overall rating, or number of ratings

Jack Farley:
I focused on our database technology 
I implemented an addMovies and addUser function 
I implemented the front and backend to show partial matches in search 
I created a censorship tool to block inappropriate entries. The censorship tool does not eliminate in appropriate entries, but rather uses regex to find partial matches in entries that match from a database of inappropriate words/phrases 

Morgan Chu:
I implemented functionalities to search for a movie by name and a user by username, and API endpoints for each.
I implemented functionality to rate movies, and created an API endpoint.
I implemented functionality to create reviews and discussions, and created API endpoints for both.
I implemented functionality to save movies into a list and created an API endpoint for this.

Will Convertino:
I integrated the frontend and backend for each of my teammates’ features
I created several feeds for the homepage, including a “newest posts” and “top of the week/month/year”
I reworked the user profile to include more relevant information (saved movies, recent reviews, and recent discussion posts)
I reworked the backend for the movie search feature and connected it to the existing frontend
I reworked the backend for the “add movie” feature to incorporate the OMDB api to ensure that only real movies are added and to ensure that duplicate movies are not added
I connected the “add movie” backend to the frontend
I created the review standalone page
I created the user discussion threads, and made them sort by number of likes
I created the like/dislike system for both reviews and discussion threads
I integrated the censorship feature into the review content and the discussion content
I connected the rating system for movies to the backend
I created the spoiler blocking system
I created the reporting system
I created an admin “reports” page to view reported posts by number of reports
I updated our database layout (most notably in the movie profile and discussion documents) to better suit the needs of the backend
I generated a lot of backend data across many test accounts
I cleaned up and deployed our website

Adrian Gutierrez: 
I will be focused on developing the frontend and UI components of the web application.
I helped to create the basic frontend pages for user profiles and searching movies.
I created the review creation page and adjusted the appearance to look similar to the other pages
I made a stars component to add to the review page
I improved the overall appearance by working with styles.css

GitHub repo link: https://github.com/williamconvertino/movie-website

Live Site Link: https://316-project.netlify.app/home

Video link:

Navigating the GitHub repo:
The frontend code for the signup, login, user search, movie search, review creation, and user profile pages can be found in the /pages folder
The /pages folder also contains a css file that specifies styles for specific frontend components
Components for the home page and search bars can be found in the /components folder
Style components that are global can be found in the styles folder
The /backend folder contains the backend code for querying and updating the database. This includes  adding a movie/user, as well as retrieving user/movie data
The /pages/api folder houses the backend's public APIs. 
