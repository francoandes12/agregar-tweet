//variables
const listaTweets = document.querySelector('#lista-tweets');



//event listeners
eventListeners();

function eventListeners() {
    //cuando se envia el form
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}



//funciones
//añadir tweet del form
function agregarTweet(e) {
    e.preventDefault();
    console.log("formulario enviado");
    //leer valor del textarea
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet);
    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    //crear elemento y añadir el contenido de la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //añade boton de borrar al tweet
    li.appendChild(botonBorrar);
    //añade el texto a la lista
    listaTweets.appendChild(li);
    //añadir a local storafe
    agregarTweetLocalStorage(tweet);

}
//elimina el tweet del dom
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}
//
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //añadir el nuevo tweet
    tweets.push(tweet);
    //convertir de string a arreglo
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
//comprueba que haya elementos en local,retorna 1 array
function obtenerTweetsLocalStorage() {
    let tweets;
    //revisamos los valos del ls
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}
//mostrar datos de local en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function (tweet){
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade boton de borrar al tweet
        li.appendChild(botonBorrar);
        //añade el texto a la lista
        listaTweets.appendChild(li);
    });
}
//eliminar tweet de local storage
function borrarTweetLocalStorage(tweet){
    let tweets,tweetBorrar;
    //elimina la x del tweet
    tweetBorrar = tweet.substring(0,tweet.length -1);
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet,index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets',JSON.stringify(tweets));
    
}