/////COde working with that didn't run///
let usernameDiv = document.getElementById("username");
let postTitles = document.getElementById("postTitles");
let userAlbums = document.getElementById("albums");
//let usernameSpan = document.getElementById("usernameSpan")

let userNameSubmitted = document.getElementById("userNameSubmitted").value;
//userNameSubmitted = userNameSubmitted.value;
//console.log(userNameSubmitted);
//let userid;
//userNameSubmittedVal = userNameSubmitted.value;

//console.log(typeOf userNameSubmittedVal);
function resetPage(){
  location.reload();
}

function lookupName(){
//this.form.reset();
//location.reload();
let userNameSubmitted = document.getElementById("userNameSubmitted").value;
let postTitles = document.getElementById("postTitles");
let userAlbums = document.getElementById("albums");
let usernameSpan = document.getElementById("usernameSpan");
let usersName = document.getElementById("usersName");
let noUser = document.getElementById("noUser");
//let usersName = document.getElementsByClassName("usersName");
usernameSpan.textContent = userNameSubmitted;

  
let usersPromise = fetch('https://jsonplaceholder.typicode.com/users')
.then((response)=>{
//resetPage();
  return response.json();
})
.catch((err) => {
  console.log('Error message:', err.statusText);
  resetPage();
noUser.textContent="Sorry but that user does not exist!";
});

let postPromise = fetch('https://jsonplaceholder.typicode.com/posts')
.then((response)=>{
  return response.json();
})
.catch(err => console.log('Error message:', err.statusText));

 let albumsPromise = fetch('https://jsonplaceholder.typicode.com/albums')
.then((response)=>{
  return response.json();
})
.catch(err => console.log('Error message:', err.statusText));
  
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
  
  let outputPosts = '<ul>';
  let outputAlbums = '<ul>';
  filteredArray.forEach(post=>{
    outputPosts += `<li>${post.title}</li>`;
    //arrayOfTitles.push(post.title);
  });
  outputPosts += '</ul>'
  postTitles.innerHTML=outputPosts; 
  
  filteredArrayAlbums.forEach(album=>{
  outputAlbums += `<li>${album.title}</li>`;
  });
  outputAlbums += '</ul>';
  userAlbums.innerHTML=outputAlbums; 
  //console.log(arrayOfTitles);
  })
  .catch((reject) => {
    console.log('Error message:', reject.statusText);
    noUser.textContent="Sorry but that user does not exist! Please reset and try again.";
  });
}

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//       title: 'foo',
//       body: 'bar',
//       userId: 1
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8"
//     }
//   })
//   .then(response => response.json())
//   //.then(json => console.log(json))
