## Funcionalidad
Se desea implementar un servicio para la gestión de un blog con persistencia y API REST. Las entradas del blog podrán tener comentarios y para evitar la publicación de aquellos que puedan ser ofensivos, el servicio deberá incluir internamente un validador.

Las entidades de información que deberá gestionar el blog son:


- Post. Cada entrada contiene los siguientes campos: Nombre del autor, Nickname del autor, Titulo, Texto, Lista de comentarios. {author, nickname, title, content, comments}

*REVISAR -> formato de la fecha y cómo se valida*

- Comment. Cada comentario contiene los siguientes campos: Nickname del autor del comentario, Contenido, Fecha del comentario. {nickname, text, date}

- OffensiveWord: Cada palabra tendrá asociada un campo “level” indicando la gravedad de la palabra de 1 a 5.
    {word, level}

## endpoints
La aplicación ofrecerá los siguientes endpoints REST:

- *Entradas y comentarios*

    - Recuperación de todas las entradas (sin comentarios)
    *'/post'* --> me salen todos los post que hay (esto es un GET de toda la coleccion)

    - Creación de una nueva entrada (sin comentarios)
    *'/post/'* --> ventana para crear uno. Esto es un POST a la colección

    - Modificación de una entrada existente (se actualizará toda la información de la misma, excepto sus comentarios)
    *'/post/:id/'*

    - Recuperación de una entrada (con comentarios)
    *'/post/:id'*

    - Borrado de una entrada existente (con todos sus comentarios)
    *'/post/:id/*'

    - Adición de un nuevo comentario a una entrada
    *'/post/:id/comments/'*

    - Modificación de un comentario existente
    *'/post/:id/comments/:id'*

    - Borrado de un comentario existente en una entrada
    *'/post/:id/comments/:id'*

- *Palabras ofensivas*
    /offensivewords    
    - POST Creación,*/offensivewords*
    - GET listado,*/offensivewords*
    - DELETE ONE borrado, */offensivewords/:id*
    - PATCH modificación, */offensivewords/:id*


Si el comentario que se intenta incorporar contiene alguna de las palabras ofensivas registradas en la BBDD, el comentario no se podrá crear.

La petición REST será rechazada con un código de error y se devolverá un JSON con información sobre la palabra ofensiva (o palabras) y su nivel.

Si la palabra ya está en la lista, no debería poder añadirse de nuevo.

Las palabras ofensivas estarán almacenadas en la BBDD. Si al arrancar la aplicación se detecta que no hay palabras ofensivas en la BBDD, la aplicación deberá insertar un juego de palabras por defecto.


# Aspectos técnicos
La aplicación estará dividida en, al menos, 4 módulos Node: 
- *app.js*: Tendrá el servidor Express. 
- *controller.js*: Tendrá definidos los métodos de la API REST. Se usará un router que será configurado en Express.
- *repository.js*: Módulo que contendrá el código de acceso a la base de datos.
- *validator.js*: Validador que verifica que el comentario no contiene ninguna palabra ofensiva.


*HECHO*
## API REST:
La API REST deberá cumplir con el nivel de madurez 2 y el formato de las URLs deberá identificar recursos, no acciones.
Se deberá entregar un fichero postman.json con al menos un ejemplo de cada una de los endpoints de la API REST.

*HECHO*

## Persistencia:
La persistencia se implementará con MongoDB de forma obligatoria. Se podrán usar el driver oficial Mongo o el ODM Mongoose.
Opcionalmente se podrá entregar la práctica con la persistencia de palabras ofensivas en una base de datos MySQL (con o si ORM).


 http://expressjs.com/es/4x/api.html#router

## NO
## Control de calidad
Se deberán implementar tests unitarios del validador con Jest. Estos tests, ya que son unitarios, no deberán acceder a la bbdd real. Es decir, 

- hay que crear un doble del módulo que permite acceder a la base de datos. La funcionalidad que debería verificarse en los tests es:

- Comentario con palabras ofensivas: Con este test se debe verificar que si el comentario tiene una palabra ofensiva, se debe generar el error correspondiente. 

- Comentario sin palabras ofensivas: Con este test se debe verificar que si el comentario no tiene palabras ofensivas debe obtenerse una validación OK.


ejemplo de boiler plate: https://express-rest-api-generato.readthedocs.io/en/latest/ 

necesitamos poner las credenciales (login y password) y enviarlas en la cabecera *Authorization*.

- El valor se calcula como `'Basic '+base64(login+':'+password)`
- En postman se especifica el tipo de autorizacion "basic auth"
- La autenticación se puede hacer directamente con express pero rhay un framework llamado passport que vamos a usar.

`npm install --save passport`
`npm install --save passport-http`

vamos a usar BCrypt como función HASH que encriptará nuestras contraseñas antes de guardarlas.
para autenticar a un usuario , se calcula el hash de la password introducida y se compara con el hash guardado.
`npm install --save bcryptjs`


hay que hacer un fichero con los usuarios y otro con las contraseñas que quedarían en teoría fuera del control de verisones en una carpeta de entorno enviroment
y tenemos en la pagina 33 del tema 8, y en vez de await customers insert one lo cargas de un fichero json.

las contraseñas se guardan solo hasheadas con bcrypt

el script node.js llamado load_admins.js se conectará a mongodb y creará los usuarios admin cuando se ejecute.

# test de la API REST
`npm install supertest --save-dev`

para testear conviene no tener el sitio del listen app en el mismo modulo donde configuramos express (es decir para poder arrancar en otro puerto el servidor pues necesitamos) Es decir, sacamos el listen a otro fichero. para que superagent pueda levantar el servidor en cualquier otro puerto para hacer lost ests. En el ejemplo 1 del tema 10 está esta separación. 

Si te instalas morgan y dices app.use(morgan).

const morgan = require('morgan-body');
está en el ejercicio 1 del tema 10



# USUARIOS AUTENTICADOS:

### Administrador: 
- Los usuarios de tipo admin podrán realizar cualquier operación de la API REST.

### Publisher: 
- Crear entradas del blog.   

- Borrar y modificar únicamente las entradas que hayan creado ellos. 
  
- Borrar comentarios de sus entradas. 
   
- Añadir comentarios a otras entradas.  

- acceder y modificar colección de offensive words.

# USUARIOS NO AUTENTICADOS:

### No autenticado: 
- Podrán consultar información pero no podrán añadir comentarios ni añadir posts.


Cualquier usuario podrá registrarse en la aplicación y se le asignará el rol de “publisher”.  Para ello, se creará un endpoint de creación de usuarios. Para simplificar la implementación, un usuario no se puede borrar ni modificar.

## hecho (revisar, tus usuarios están en un array)
Se deberá implementar un script Node.js llamado load_admins.js que se conectará a MongoDB y creará los usuarios admin cuando se ejecute. Los usuarios estarán en un fichero de texto.