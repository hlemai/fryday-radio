
var timer = setTimeout(refreshPosts(),10000);


document.getElementById("btNewUrl").addEventListener("click",(elt,ev)=> addnewSong());

function addnewSong() {
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
            refreshPosts();
        })
        .catch(function(error) {
            console.log(error);
            });
};

function createNode(element) {
    return document.createElement(element);
};

function append(parent, el) {
  return parent.appendChild(el);
}

function getItemDetail(id) {
    var ul = document.getElementById('lisongs');
    var url = './api/songrequest/'+id;
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let li = createNode('li'),span = createNode('span');
        span.innerHTML = `${data.username} - ${data.url}`;
        append(li, span);
        append(ul, li);
    })
    .catch(function(error) {
    console.log(error);
    });   
};

function refreshPosts() {
    // todo : gérer l'ordre d'insertion en créant les li puis les spans
    var ul = document.getElementById('lisongs');
    ul.innerHTML="";
    var url = './api/songrequests';
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {

        return data.map(function(id) {
            getItemDetail(id);
        });
        
    })
    .catch(function(error) {
    console.log(error);
    });   
}


