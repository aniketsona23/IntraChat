<h1>IntraChat Application</h1>

<h2>Setup</h2>

<ol>
  <li>Fork this repository in your account </li>

  <li>Clone the repository (Replace <username> with your username)</li>
  
    
    git clone https://github.com/<username>/IntraChat

   
  <li>Install the dependencies for the project.</li>


    cd backend
    npm install
    cd ..
  
  <li>Run the server </li>


    npx nodemon server.js

  
  <li>Now open browser and connect to server wwith multiple tabs (clients) with "http://localhost:3000"</li>
  
  <li>After logging in you will see list of active users, select user you want to send message to.</li>
</ol>

<h2>Future</h2>
<p>There will be upcoming fixes in UI/UX and smoother connection to server. Also, will be hosted on internet so any user can connect to.</p>

<p>Authentication functionality shall be added</p>

<p>Further optimizations will be done before converting the codebase to React and adding database functionality to store old messages.</p>
