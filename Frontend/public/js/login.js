const loginForm = document.querySelector("#login-form");
const btn = document.querySelector("#submit-btn")

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const response = await fetch("https://intra-chat-api.vercel.app/api/login", {
    method: "POST",
    body: JSON.stringify({ username: username.value, password: password.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.status)
  
  if ( response.status == 200){
    
    const back = window.location.href.split("Frontend")[0]
    console.log(back)
    window.location.href = back + `Frontend/client.html?username=${username.value}`

  }
});
