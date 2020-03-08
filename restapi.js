/////COde working with that didn't run///
let usernameDiv = document.getElementById("username");
let postTitles = document.getElementById("postTitles");
let userAlbums = document.getElementById("albums");
let usernameSpan = document.getElementById("usernameSpan")

let userNameSubmitted = document.getElementById("userNameSubmitted").value;
//userNameSubmitted = userNameSubmitted.value;
//console.log(userNameSubmitted);
//let userid;
//userNameSubmittedVal = userNameSubmitted.value;

//console.log(typeOf userNameSubmittedVal);

function lookupName(){
let userNameSubmitted = document.getElementById("userNameSubmitted").value;
let postTitles = document.getElementById("postTitles");
let userAlbums = document.getElementById("albums");
let usernameSpan = document.getElementById("usernameSpan");
let usersName = document.getElementById("usersName");
usernameSpan.textContent = userNameSubmitted;

  
let usersPromise = fetch('https://jsonplaceholder.typicode.com/users')
.then((response)=>{
  return response.json();
});

let postPromise = fetch('https://jsonplaceholder.typicode.com/posts')
.then((response)=>{
  return response.json();
});

 let albumsPromise = fetch('https://jsonplaceholder.typicode.com/albums')
.then((response)=>{
  return response.json();
});
  
Promise.all([usersPromise, postPromise, albumsPromise])
.then((response)=>{
  let users = response[0];
  let posts = response[1];
  let albums = response[2];
  
  let foundUser = users.find((user)=>{
    //return user.name[0] === 'G'; //userNameSubmittedVal;
    return user.username === userNameSubmitted;
  })
  
  let filteredArray = posts.filter((post)=>{
    return post.userId === foundUser.id;
  })
  
  let filteredArrayAlbums = albums.filter((album)=>{
    return album.userId === foundUser.id;
  })
  
  console.log(filteredArray[0].title);
  //console.log(userNameSubmitted );
  
  usersName.textContent=foundUser.name;
  
  let outputPosts;
  let outputAlbums;
  filteredArray.forEach(post=>{
    outputPosts += `<li>${post.title}</li>`;
    //arrayOfTitles.push(post.title);
  });
  postTitles.innerHTML=outputPosts; 
  
  filteredArrayAlbums.forEach(album=>{
  outputAlbums += `<li>${album.title}</li>`;
  });
  userAlbums.innerHTML=outputAlbums; 
  console.log(arrayOfTitles);
  })
}

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  //.then(json => console.log(json))
