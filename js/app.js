// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
     formulario.addEventListener('submit', agregarTweet);

     // Cuando el documento este list 
     document.addEventListener('DOMContentLoaded', () => {
          tweets = JSON.parse(localStorage.getItem('tweets')) || [];
          crearHTML();
     })
}

// Funciones

function agregarTweet(e) {
     e.preventDefault();
     
     // Textarea donde el usuario escribe
     const tweet = document.querySelector('#tweet').value;

     if(tweet === ''){
          mostrarError('Un tweet no puede ir vacio')
          return;
     };

     const tweetObj = {
          id: Date.now(),
          tweet: tweet.trim()
     }

     //Anadir al arreglo de tweets
     tweets = [...tweets, tweetObj];

     crearHTML();

     // Reiniciar el formulario despues de insertar el tweet.
     formulario.reset();
};

// Mostrar mensaje de error

function mostrarError(error) {
     const mensajeError = document.createElement('p');
     mensajeError.textContent = error;
     mensajeError.classList.add('error');

     //Insertarlo en el contenido
     const contenido = document.querySelector('#contenido');     

     if(document.querySelectorAll('.error').length === 0){
          contenido.appendChild(mensajeError);

          //Elimina la alerta despues de 3 segundos
          setTimeout( () => {
               mensajeError.remove();
          }, 3000)
     }

     
};

// Muestra el listado de tweets 

function crearHTML(){

     limpiarHTML();
     if(tweets.length > 0){
          tweets.forEach( tweet => {
               const btnEliminar = document.createElement('a');
               btnEliminar.classList.add('borrar-tweet');
               btnEliminar.innerText = 'X';

               btnEliminar.addEventListener('click', () => {
                    borrarTweet(tweet.id);
               })

               const li = document.createElement('li');

               // Anadir texto
               li.innerText = tweet.tweet;
               li.appendChild(btnEliminar);

               // Insertarlo en el listado 
               listaTweets.appendChild(li);
          });
     };

     sincronizarStorage();
};

function borrarTweet(id){
     tweets = tweets.filter( tweet => tweet.id !== id);
     crearHTML();
}

//Agregar los tweets actuales al localStorage

function sincronizarStorage(){
     localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpiar el html

function limpiarHTML() {
     while(listaTweets.firstChild){
          listaTweets.removeChild(listaTweets.firstChild)
     }
};