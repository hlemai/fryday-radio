document.getElementById("btNewUrl").addEventListener("click",(elt,ev)=> addnewSong());

var timer=setTimeout( function() {refreshPosts();},3000);

function showMessage() {
    document.getElementById("message").className="show";
}
function hideMessage() {
    document.getElementById("message").className="";
}

document.getElementById("btNewUrl").addEventListener("click",(elt,ev)=> addnewSong());

function addnewSong() {
    showMessage();
    var form =document.getElementById("newSong");
    var newsong = {
        "username":form.fname.value,
        "url":form.url.value
    }; 
    var url = './api/songrequest/new';
    var content=JSON.stringify(newsong);
    
    var myHeaders = new Headers({
        "Content-Type": "application/json",
        "Content-Length": content.length.toString()
      });
    console.log(myHeaders.has("Content-Type")); // true
    
    fetch(url,{
        method: "POST",
        headers: myHeaders, 
        body: content
        })
        .then(function(data) {
            console.log(data);
            timer=setTimeout( function() {refreshPosts();},5000);
            hideMessage();
        })
        .catch(function(error) {
            console.log(error);
            hideMessage();
            });
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function getItemDetail(id) {
    var ul = document.getElementById('lisongs');
    var url = './api/songrequest/'+id;
    showMessage();
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        var li=document.getElementById(data.id);
        if(li=="undefined" || li == null) {
            li = createNode('li');
            li.id=data.id;
            append(ul, li);
        }
        li.innerHTML="";
        var span = createNode('span');
        span.innerHTML = `${data.number} - ${data.username} - <a href="${data.url}" >${data.title} </a>`;
        append(li, span);
        hideMessage();
    })
    .catch(function(error) {
        console.log(error);
        hideMessage();
    });   
}

function refreshPosts() {
    // todo : gérer l'ordre d'insertion en créant les li puis les spans
    if(timer!=null)
        clearTimeout(timer);
    var url = './api/songrequests';
    showMessage();
    fetch(url)
    .then((resp) => {
        hideMessage();
        return (resp.json());
    })
    .then(function(data) {
        data.map(function(id) {
            hideMessage();
            getItemDetail(id);
        });
        timer=setTimeout( function() {refreshPosts();},30000);
    })
    .catch(function(error) {
        console.log(error);
        hideMessage();
    });   
}



