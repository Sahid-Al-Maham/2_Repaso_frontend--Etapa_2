    const cuadroJuego = document.getElementById('cuadroJuego');
    const balon = document.getElementById('balon');

    // Posicion de mouse, inicializa variables antes de comenzar
    let mouseX = 0;
    let mouseY = 0;

    // Posicion del balon, inicializa variables antes de comenzar
    let balonX = 0;
    let balonY = 0;

    // Velocidad del balon, inicializa variables antes de comenzar, el número es la velocidad el signo la dirección de rebote
    let veloX = 5; // + rebota hacia la derecha, - rebota hacia la izquierda
    let veloY = 5; // + rebota hacia abajo, - rebota hacia arriba en Y
    let veloRamdom; // Variable global de número ramdom para usar en rebote
    // Define límites de velocidad
    const veloMin = 2; // Velocidad mínima
    const veloMax = 15; // Velocidad máxima

    // 
    let movimientoActivo = true;        // Bandera para activar/desactivar movimiento
    let reboteActivo = false;           // Bandera para activar/desactivar rebote
    let seguirMouse = false;            // Bandera para controlar el seguimiento del mouse
    let seguirMouseEnRebote = true;     // Bandera que comienza con el seguimiento en rebote activado

    // Obtener dimensiones del cuadro y balón
    const rect = cuadroJuego.getBoundingClientRect();
    const balonWidth = balon.offsetWidth;
    const balonHeight = balon.offsetHeight;

    // Prevenir el menú contextual del clic derecho
    cuadroJuego.addEventListener('contextmenu', (e) => {
        e.preventDefault();

    });

    // Detectar clic derecho e izquierdo del mouse
    cuadroJuego.addEventListener('mousedown', (e) => {
        if (e.button === 2) {           // Click derecho
            movimientoActivo = false;   // Detener el movimiento

        } else if (e.button === 0) {    // Click izquierdo
            // Actualizar la posición del balón
            const rect = cuadroJuego.getBoundingClientRect(); 
            mouseX = e.clientX - rect.left - balon.offsetWidth / 2; 
            mouseY = e.clientY - rect.top - balon.offsetHeight / 2;
            movimientoActivo = true;    // Reactivar el movimiento
        }

    });
    
    /* RECORDAR: 
    Metodo .getBoundingClientRect() comun a todos los elementos HTML en JavaScript, devuelve un objeto con información sobre el tamaño y la posición del elemento
    Propiedades mas comunes del evento (e) -lo llamamos (e) pero puede llevar cualquier nombre por ejemplo: (hacerAlgo)-:
    e.clientX: posición X del mouse dentro de la ventana
    e.clientY: posición Y del mouse dentro de la ventana
    e.type: tipo de evento (ej. 'click', 'mousemove', etc.)
    e.target: el elemento que disparó el evento 
    */

    // Evento de teclado para alternar entre rebote, seguimiento del mouse en rebote y reiniciar seguimiento
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'r':
                reboteActivo = true;
                console.log('Rebote activado');
                break;

            case 'p':
                reboteActivo = false;
                console.log('Rebote desactivado');
                break;

            case 's':
                seguirMouseEnRebote = !seguirMouseEnRebote;
                console.log(`Modo de rebote: ${seguirMouseEnRebote ? "sigue al mouse" : "libre"}`);
                break;

            case 'n':
                seguirMouseEnRebote = false; // Puedes cambiar a `true` si prefieres
                console.log(`Modo de rebote reiniciado: ${seguirMouseEnRebote ? "sigue al mouse" : "libre"}`);
                break;

            default:
                console.log("Tecla no asignada");
        }
    });

    // Evento de teclado para seguir el mouse
    cuadroJuego.addEventListener('mousemove', (e) => {
        // Coordenadas del mouse dentro del cuadro
        if (movimientoActivo/* && !reboteActivo*/) { // Solo actualiza si el movimiento está activo y podemos agregar la condicion si no hay rebote
            const rect = cuadroJuego.getBoundingClientRect(); 
            mouseX = e.clientX - rect.left - balon.offsetWidth / 2; // Ajuste al centro del balon
            mouseY = e.clientY - rect.top - balon.offsetHeight / 2; 
        }
        // Activar seguimiento del mouse en modo rebote
        if (reboteActivo) {
            seguirMouse = true;
        }

    });

    function moverbalon() {
        // Actualizamos las dimensiones en cada ciclo de animación
        const rect = cuadroJuego.getBoundingClientRect();
        const balonWidth = balon.offsetWidth;
        const balonHeight = balon.offsetHeight;

        // Obtener el grosor del borde de cuadroJuego
        const bordeIzquierdo = parseFloat(getComputedStyle(cuadroJuego).borderLeftWidth);
        const bordeDerecho = parseFloat(getComputedStyle(cuadroJuego).borderRightWidth);
        const bordeSuperior = parseFloat(getComputedStyle(cuadroJuego).borderTopWidth);
        const bordeInferior = parseFloat(getComputedStyle(cuadroJuego).borderBottomWidth);

         // Movimiento seguir mouse con retardo y sin rebote
        if (!reboteActivo) { // Sin rebote
            // Ajuste con retraso para que el balon siga al mouse, a menor numero mayor retraso (0.05 es mas lento que 0.1)
            balonX += (mouseX - balonX) * 0.05;
            balonY += (mouseY - balonY) * 0.05;
            // Límite izquierdo y superior
            if (balonX < 0) balonX = 0;
            if (balonY < 0) balonY = 0;
            // Límite derecho y límite inferior
            if (balonX > rect.width - balonWidth - bordeDerecho - bordeIzquierdo) 
                balonX = rect.width - balonWidth - bordeDerecho - bordeIzquierdo;   // Agregar bordes porque rect no los contempla
            if (balonY > rect.height - balonHeight - bordeInferior - bordeSuperior) 
                balonY = rect.height - balonHeight - bordeInferior - bordeSuperior; // Agregar bordes porque rect no los contempla
        }

        // Movimiento rebote
        if (reboteActivo) {
            // Sigue el mouse hasta tocar un borde
            if (seguirMouse && seguirMouseEnRebote) { // Revisa que rebote activo y que seguimiento esten activos
                balonX += (mouseX - balonX) * 0.05;
                balonY += (mouseY - balonY) * 0.05;
                if (balonX <= 0 || balonX >= rect.width - balonWidth - bordeDerecho - bordeIzquierdo ||
                    balonY <= 0 || balonY >= rect.height - balonHeight - bordeSuperior - bordeInferior) 
                    {
                    seguirMouse = false; // Inicia rebote tras tocar un borde
                }

            } else {
                // Actualizar la posición del balón
                balonX += veloX;
                balonY += veloY;
                veloRamdom = Math.floor(Math.random() * 10) + 1;

                // Rebote en el límite izquierdo
                if (balonX <= 0) {
                    balonX = 0;         // Ajustar al borde exacto
                    veloX = (veloX + veloRamdom) * -1;
                } 
                // Rebote en el límite derecho
                else if (balonX >= rect.width - balonWidth - bordeIzquierdo - bordeDerecho) {
                    balonX = rect.width - balonWidth - bordeIzquierdo - bordeDerecho; // Ajustar al borde exacto
                    veloX = (veloX + veloRamdom) * -1; 
                }

                // Rebote en el límite superior
                if (balonY <= 0) {
                    balonY = 0;         // Ajustar al borde exacto
                    veloY = (veloY + veloRamdom) * -1; 
                } 
                // Rebote en el límite inferior
                else if (balonY >= rect.height - balonHeight - bordeSuperior - bordeInferior) {
                    balonY = rect.height - balonHeight - bordeSuperior - bordeInferior; // Ajustar al borde exacto
                    veloY = (veloY + veloRamdom) * -1; 
                }

                // Controlar la velocidad de veloX
                if (Math.abs(veloX) < veloMin) {
                    veloX = (veloX < 0 ? veloMin * 2 * -1 : veloMin *2); // Aplicamos operador ternario "?" que es una forma reducida y práctica de if/else: "consulta ? verdadero : falso"
                } else if (Math.abs(veloX) > veloMax) {
                    veloX = (veloX < 0 ? -veloMax : veloMax);
                }
                // Controlar la velocidad de veloY
                if (Math.abs(veloY) < veloMin) {
                    veloY = (veloY < 0 ? veloMin * 2 * -1 : veloMin *2);
                } else if (Math.abs(veloY) > veloMax) {
                    veloY = (veloY < 0 ? -veloMax : veloMax);
                }

            }

        }

        balon.style.transform = `translate(${balonX}px, ${balonY}px)`; // Aplicamos los valores css al balon

        requestAnimationFrame(moverbalon); // Continuar animando
    }

    moverbalon(); // Iniciar la animación

    