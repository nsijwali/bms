
let list;
var title, release;
var element = {};
window.onload = function () {
  document.getElementById("myInput").addEventListener('keyup', searchMovie);
  var promise = new Promise((resolve, reject) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "bms.json", true);
    xmlhttp.withCredentials = true;
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        list = JSON.parse(this.responseText);
        render_lists(list);

      }
    };
    xmlhttp.setRequestHeader('Content-Type', 'application/text');
    xmlhttp.send();
  });
};

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//deletes
function deleteRecord(element) {
  element.target.parentNode.remove();
}


//adding elements
var render_lists = function (lists) {
  var div;
  div = '';
  lists.movies.forEach(element => {
    div = document.createElement('div');
    div.classList.add('movie');

    var title = document.createElement('p');
    title.classList.add('title');
    title.innerHTML = "<p class='floatLeft'>" + element.title + "</p>" + "<p class='floatRight'>" + element.releaseDate + "</p>";


    var img = document.createElement('img');
    if(element.poster !==undefined){
      img.setAttribute('src', element.poster);
    }
    else{
      img.setAttribute('src', 'assets/img/no-image.png');
      img.style.width = '170px';
    }
    img.classList.add('movie-img');
    // document.body.appendChild(g);
    // var img = document.getElementById("movie").src = element.poster;
    // var input = document.createElement('input');
    // input.type = 'button';
    // input.value = 'Add';
    // input.classList.add('movie-add');

    var input_delete = document.createElement('input');
    input_delete.type = 'button';
    input_delete.value = 'Delete';
    input_delete.classList.add('movie-del');
    input_delete.addEventListener('click', deleteRecord);

    div.appendChild(img);
    div.appendChild(input_delete);
    div.appendChild(title);
    document.getElementById("movie_img").appendChild(div);


  });
}

// search functionality
var searchMovie = function()  {
  var keyword;
  div = document.getElementById("movie_img");
  const cells = div.getElementsByClassName('movie');
  const cellArr = [...cells];
  keyword = document.getElementById('myInput').value.toLowerCase();

  cellArr.forEach(user => {
    user.style.display = 'none';
    var arr = user.innerText.match(/(.*).{4}$/)[1]
    if(arr.toLowerCase().indexOf(keyword) > -1){
      user.style.display = 'inline-block';
    }
  });
};

function addmovie(e){
  var reader  = new FileReader();
  if(e.target.name == 'title'){
    element.title = e.target.value;
  }
  else if(e.target.name == 'date'){
    element.releaseDate = e.target.value
  }
  else{debugger;
    element.poster = e.targetfiles[0].name;
  }

}

function add(){
  if(title !== '' && release !== ''){
list.movies.push(element);
closeForm();
document.getElementById('title').value = '';
document.getElementById('date').value = '';
document.getElementById('poster').value = '';
document.getElementById("movie_img").innerHTML ='';
render_lists(list);

  }

}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}