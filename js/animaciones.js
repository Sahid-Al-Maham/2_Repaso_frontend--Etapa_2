document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elem,entos del html por id
    const cuadroJuego = document.getElementById('cuadroJuego');
    const balon = document.getElementById('balon');
    const paletaIzquierda = document.getElementById('paletaIzquierda');
    const paletaDerecha = document.getElementById('paletaDerecha');

    /* --------- DECLARACION DE VARIABLES Y CALCULOS INICIALES --------- */
    // Obtener dimensiones del cuadro, balón
    const rect = cuadroJuego.getBoundingClientRect();
    // Obtener el grosor del borde de cuadroJuego
    const bordeRect = parseFloat(getComputedStyle(cuadroJuego).borderLeftWidth);

    // Obtener el tamaño de balon
    const balonWidth = balon.offsetWidth;
    const balonHeight = balon.offsetHeight;
    // Calcular y declarar la posición del balón respecto al cuadro de juego
    let balonX = ((rect.width - balonWidth) / 2);    // Posición X relativa al cuadro de juego
    let balonY = ((rect.height - balonHeight) / 2);  // Posición Y relativa al cuadro de juego
    const radioBalon = balonWidth / 2;
    // Asignar posicion inicial del balon
    balon.style.transform = `translate(${balonX}px, ${balonY}px)`;
    console.log('translate(${balonX}px, ${balonY}px: ', balonX, balonY );
    // Posicion de mouse, inicializa variables antes de comenzar (usamos el mismo que el balon para asegurar que no haya movimientos)
    let mouseX = (rect.width - balonWidth) / 2;
    let mouseY = (rect.height - balonHeight) / 2;

    // Obtener tamaño de las paletas (tomado de css cada paleta tiene un tamaño independiente para no usar la clase paleta)
    const paletaIzquierdaWidth = paletaIzquierda.offsetWidth; 
    const paletaIzquierdaHeight = paletaIzquierda.offsetHeight; 
    const paletaDerechaWidth = paletaDerecha.offsetWidth; 
    const paletaDerechaHeight = paletaDerecha.offsetHeight;
    // Obtener el grosor del borde de paleta
    const bordePaleta = parseFloat(getComputedStyle(paletaDerecha).borderRightWidth); // Se calcula sobre cualquier borde al ser iguales , si fueran distintos se calcula sobre cada borde
    // Calcular y declarar las posiciones iniciales de las paletas
    let paletaIzquierdaX = 0; // Alineada al borde izquierdo de cuadroJuego
    let paletaIzquierdaY = (rect.height - paletaIzquierdaHeight - (bordePaleta * 2)) / 2; // Centrada verticalmente
    let paletaDerechaX = rect.width - paletaDerechaWidth - (bordePaleta * 2); // Alineada al borde derecho de cuadroJuego
    let paletaDerechaY = (rect.height - paletaDerechaHeight - (bordePaleta * 2)) / 2; // Centrada verticalmente
    // Asignar posiciones iniciales de las paletas
    paletaIzquierda.style.transform = `translate(${paletaIzquierdaX}px, ${paletaIzquierdaY}px)`;
    paletaDerecha.style.transform = `translate(${paletaDerechaX}px, ${paletaDerechaY}px)`;
 
    // Velocidad del balon, inicializa variables antes de comenzar, el número es la velocidad el signo la dirección de rebote
    let veloX = 5;      // + rebota hacia la derecha, - rebota hacia la izquierda
    let veloY = 5;      // + rebota hacia abajo, - rebota hacia arriba en Y
    let veloRamdom;     // Variable global de número ramdom para usar en rebote
    const veloMin = 2;  // Velocidad mínima para limites
    const veloMax = 13; // Velocidad máxima para limites
    // Velocidad para el movimiento de las paletas
    const velocidadPaleta = 8; // Ajusta la velocidad de movimiento de las paletas

    // Banderas para control de actos teclado y MOUSE tecla "p" vuelve a false todo
    let reboteActivo = false;       // Bandera para activar/desactivar rebote r
    let moverConMouse = false;      // Bandera para activar/desactivar rebote con mouse
    let seguirMouse = false;        // Bandera para activar/desactivar movimiento con MOUSE
    let paletasActivas = false;     // Bandera para activar/desactivar reconocimiento de bordes paletas i
    let paletasLibres = false;      // Bandera para activar/desactivar movimiento horizontal de paletas l

    // Variables para el movimiento de las paletas
    const movimientos = { // Agregar si se quiere mas movimientos para paletas en eje x tambien
        izquierdaArriba: false,
        izquierdaAbajo: false,
        derechaArriba: false,
        derechaAbajo: false,
    };

    // Variables para animacion: funcion animaciones en lugar de evento resize y detener juego
    let widthInicial = window.innerWidth;
    let heightInicial = window.innerHeight;
    let animationId;

     /* --------- EVENTOS TECLADO --------- */
    // Eventos de teclado para alternar entre rebote y seguimiento del mouse, así como mover paletas
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'r':
                reboteActivo = !reboteActivo;
                console.log(`${reboteActivo ? "Rebote ACTIVADO" : "Rebote DESACTIVADO"}`);
                break;
            case 'm':
                moverConMouse = !moverConMouse;
                console.log(`${moverConMouse ? "Rebote con mouse activado: Balon sigue al mouse" : "Rebote con mouse desactivado: Balon libre"}`);
                break;
            case 'p':
                reboteActivo = false;
                seguirMouse = false;
                paletasActivas = false;
                paletasLibres = false;
                console.log('Todo desactivado');
                break;
            case 'i':
                paletasActivas = !paletasActivas;
                console.log(`Modo de reconocimiento paletas: ${paletasActivas ? "Hay paletas" : "Paletas desactivas"}`);
                break;
            case 'l':
                paletasLibres = !paletasLibres;
                console.log(`Modo de movimientos horizontal paletas: ${paletasLibres ? "Paletas Libres" : "Paletas fijas en Y"}`);
                break;
            // Movimientos de la paleta izquierda
            case 'w':
                movimientos.izquierdaArriba = true; // Arriba
                break;
            case 's':
                movimientos.izquierdaAbajo = true; // Abajo
                break;
            case 'a':
                movimientos.izquierdaIzquierda = true; // Izquierda
                break;
            case 'd':
                movimientos.izquierdaDerecha = true; // Derecha
                break;
            // Movimientos de la paleta derecha
            case 'ArrowUp':
                movimientos.derechaArriba = true; // Arriba
                break;
            case 'ArrowDown':
                movimientos.derechaAbajo = true; // Abajo
                break;
            case 'ArrowLeft':
                movimientos.derechaIzquierda = true; // Izquierda
                break;
            case 'ArrowRight':
                movimientos.derechaDerecha = true; // Derecha
                break;

            default:
                console.log("Tecla no asignada");
        }
    });
    // Evento para manejar la liberación de teclas
    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            // Movimientos de la paleta izquierda
            case 'w':
                movimientos.izquierdaArriba = false; // Detener movimiento hacia arriba
                break;
            case 's':
                movimientos.izquierdaAbajo = false; // Detener movimiento hacia abajo
                break;
            case 'a':
                movimientos.izquierdaAtras = false; // Detener movimiento hacia la izquierda
                break;
            case 'd':
                movimientos.izquierdaAdelante = false; // Detener movimiento hacia la derecha
                break;
            // Movimientos de la paleta derecha
            case 'ArrowUp':
                movimientos.derechaArriba = false; // Detener movimiento hacia arriba
                break;
            case 'ArrowDown':
                movimientos.derechaAbajo = false; // Detener movimiento hacia abajo
                break;
            case 'ArrowLeft':
                movimientos.derechaAdelante = false; // Detener movimiento hacia la izquierda
                break;
            case 'ArrowRight':
                movimientos.derechaAtras = false; // Detener movimiento hacia la derecha
                break;

            default:
                console.log("Tecla no asignada");
        }
    });

    /* ------------ EVENTOS MOUSE y RESIZE ------------ */
    // Prevenir el menú contextual del clic derecho
    cuadroJuego.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Detectar clic derecho e izquierdo del mouse
    cuadroJuego.addEventListener('mousedown', (e) => {
        if (e.button === 2) {           // Click derecho
            seguirMouse = false;   // Detener el movimiento

        } else if (e.button === 0) {    // Click izquierdo
            // Actualizar la posición del balón
            const rect = cuadroJuego.getBoundingClientRect(); 
            mouseX = e.clientX - rect.left - balon.offsetWidth / 2; 
            mouseY = e.clientY - rect.top - balon.offsetHeight / 2;
            seguirMouse = true;     // Reactivar el movimiento
            moverConMouse = true;   // Activa para rebote con mouse
        }
        console.log(`${seguirMouse ? "Modo mouse: Balon sigue al mouse" : "Modo mouse: Mouse libre"}`);
    });

    // Evento de teclas mouse para seguir el mouse
    cuadroJuego.addEventListener('mousemove', (e) => {
        // Coordenadas del mouse dentro del cuadro
        if (seguirMouse) { // Solo actualiza si el movimiento está activo y podemos agregar la condicion si no hay rebote /* && !reboteActivo*/
        const rect = cuadroJuego.getBoundingClientRect(); 
            mouseX = e.clientX - rect.left - balon.offsetWidth / 2; // Ajuste al centro del balon
            mouseY = e.clientY - rect.top - balon.offsetHeight / 2; 
        }
    });

    // Evento resize redundante para mejorar la reubicacion de elementos en la redimension de la pantalla
    window.addEventListener('resize', () => {
        // Recalcular las dimensiones y posiciones
        const rect = cuadroJuego.getBoundingClientRect();
        // Obtener el tamaño de balon
        const balonWidth = balon.offsetWidth;
        const balonHeight = balon.offsetHeight;
        // Calcular y declarar la posición del balón respecto al cuadro de juego
        let balonX = ((rect.width - balonWidth) / 2);       // Posición X relativa al cuadro de juego
        let balonY = ((rect.height - balonHeight) / 2);     // Posición Y relativa al cuadro de juego
        // Obtener tamaño de las paletas (tomado de css cada paleta tiene un tamaño independiente para no usar la clase paleta)
        const paletaIzquierdaWidth = paletaIzquierda.offsetWidth; 
        const paletaIzquierdaHeight = paletaIzquierda.offsetHeight; 
        const paletaDerechaWidth = paletaDerecha.offsetWidth; 
        const paletaDerechaHeight = paletaDerecha.offsetHeight;
        // Obtener el grosor del borde de paleta
        const bordePaleta = parseFloat(getComputedStyle(paletaDerecha).borderRightWidth); // Se calcula sobre cualquier borde al ser iguales , si fueran distintos se calcula sobre cada borde
        // Calcular y declarar las posiciones iniciales de las paletas
        let paletaIzquierdaX = 0;                                                               // Alineada al borde izquierdo de cuadroJuego
        let paletaIzquierdaY = (rect.height - paletaIzquierdaHeight - (bordePaleta * 2)) / 2;   // Centrada verticalmente
        let paletaDerechaX = rect.width - paletaDerechaWidth - (bordePaleta * 2);               // Alineada al borde derecho de cuadroJuego
        let paletaDerechaY = (rect.height - paletaDerechaHeight - (bordePaleta * 2)) / 2;       // Centrada verticalmente
    
        // Actualizar el estilo de los elementos
        // Asignar posicion inicial del balon
        balon.style.transform = `translate(${balonX}px, ${balonY}px)`;
        // Asignar posiciones iniciales de las paletas
        paletaIzquierda.style.transform = `translate(${paletaIzquierdaX}px, ${paletaIzquierdaY}px)`;
        paletaDerecha.style.transform = `translate(${paletaDerechaX}px, ${paletaDerechaY}px)`;

    });
    
    /* ------------ FUNCIONES ------------ */
    // Funcion comportamiento de paletas
    function moverPaletas() { // Por ahora solo en el eje Y (arriba - abajo)
        const rect = cuadroJuego.getBoundingClientRect();
        // Paleta izquierda
        if (movimientos.izquierdaArriba) {  // Mover la paleta hacia arriba
            paletaIzquierdaY -= velocidadPaleta;
            if (paletaIzquierdaY < 0) paletaIzquierdaY = 0; // Límite superior
        }
        if (movimientos.izquierdaAbajo) {   // Mover la paleta hacia abajo
            paletaIzquierdaY += velocidadPaleta;
            if (paletaIzquierdaY > rect.height - paletaIzquierdaHeight) {
                paletaIzquierdaY = rect.height - paletaIzquierdaHeight - bordeRect - bordePaleta; // Límite inferior
            }
        }
        // Paleta derecha
        if (movimientos.derechaArriba) {    // Mover la paleta hacia arriba
            paletaDerechaY -= velocidadPaleta;
            if (paletaDerechaY < 0) paletaDerechaY = 0; // Límite superior
        }
        if (movimientos.derechaAbajo) { // Mover la paleta hacia abajo
            paletaDerechaY += velocidadPaleta;
            if (paletaDerechaY > rect.height - paletaDerechaHeight) {
                paletaDerechaY = rect.height - paletaDerechaHeight - bordeRect - bordePaleta; // Límite inferior
            }
        }
        // Actualizar la posición de las paletas en el DOM
        paletaIzquierda.style.transform = `translate(${paletaIzquierdaX}px, ${paletaIzquierdaY}px)`;
        paletaDerecha.style.transform = `translate(${paletaDerechaX}px, ${paletaDerechaY}px)`;

        requestAnimationFrame(moverPaletas);
    }
    
    // Función para calcular los bordes de las paletas
    function calcularBordes() {
        /* -------------------- PALETA IZQUIERDA -------------------- */ // eje X aumenta hacia la derecha, eje Y aumenta hacia abajo
    const vertSupDerPi = (balonX <= paletaIzquierdaX + paletaIzquierdaWidth &&                                          // Verifica la posicion del balon y el lado derecho de la paleta izquierda 
                            balonX + balonWidth - radioBalon - radioBalon / 2 >= paletaIzquierdaX + paletaIzquierdaWidth && // Determina que porcion del ancho del balon espera antes de posicionar el balon cuando esta en el lado superior de la paleta
                            balonY + balonHeight >= paletaIzquierdaY &&                                                     // Determina que el lado inferior del balón está tocando el lado superior de la paleta                             
                            balonY + radioBalon + radioBalon / 2 <= paletaIzquierdaY);                                      // Determina que porcion del alto del balon espera antes de posicionar el balon cuando esta en el lado derecho de la paleta
    const vertInfDerPi = (balonX <= paletaIzquierdaX + paletaIzquierdaWidth &&                                                  // Verifica la posicion del balon y el lado derecho de la paleta izquierda 
                            (balonX + balonWidth) - radioBalon - radioBalon / 2 >= paletaIzquierdaX + paletaIzquierdaWidth &&       // Determina que porcion del ancho del balon espera antes de posicionar el balon cuando esta en el lado superior de la paleta
                            (balonY + balonHeight) - radioBalon - radioBalon / 2 >= paletaIzquierdaY + paletaIzquierdaHeight &&     // 3 y 4 Limita alto de paleta y Determina que porcion del alto del balon espera antes de posicionar el balon cuando esta en el lado derecho de la paleta
                            balonY <= paletaIzquierdaY + paletaIzquierdaHeight);                                                    // 3 y 4 Limita alto de paleta y Determina que el lado superior del balón está tocando el lado inferior de la paleta                             
    const ladoDerPi = (balonX <= paletaIzquierdaX + paletaIzquierdaWidth &&                                 // Verifica la posicion del balon y el lado derecho de la paleta izquierda 
                        (balonX + radioBalon) - radioBalon / 2 > paletaIzquierdaX + paletaIzquierdaWidth &&  // Determina que porcion del ancho del balon espera antes de posicionar el balon cuando esta en el lado superior de la paleta
                        balonY + balonHeight >= paletaIzquierdaY &&                                         // 3 y 4 Verifica que el balón esté dentro de la altura de la paleta
                        balonY <= paletaIzquierdaY + paletaIzquierdaHeight);                                // 3 y 4 Verifica que el balón esté dentro de la altura de la paleta
    const ladoSupPi = (balonX <= paletaIzquierdaX + paletaIzquierdaWidth &&                     // 1 y 2 Verifica que el balón esté dentro del rango horizontal de la paleta                               
                        balonX + balonWidth >= paletaIzquierdaX  &&                             // 1 y 2 Verifica que el balón esté dentro del rango horizontal de la paleta                               
                        balonY + balonHeight >= paletaIzquierdaY &&                             // Limite que el balón esté tocando el borde superior y fija el limite de contacto                                    
                        balonY + radioBalon + radioBalon / 2 <= paletaIzquierdaY);              // Determina que porcion del alto del balon espera antes de posicionar el balon cuando esta en el lado derecho de la paleta
    const ladoInfPi = (balonX <= paletaIzquierdaX + paletaIzquierdaWidth &&                                 // 1 y 2 Verifica que el balón esté dentro del rango horizontal de la paleta
                        balonX + balonWidth >= paletaIzquierdaX &&                                          // 1 y 2 Verifica que el balón esté dentro del rango horizontal de la paleta
                        balonY <= paletaIzquierdaY + paletaIzquierdaHeight &&                               // Limite que el balón esté tocando el borde superior y fija el limite de contacto
                        balonY + radioBalon - radioBalon / 2 >= paletaIzquierdaY + paletaIzquierdaHeight);  // Determina que porcion del alto del balon espera antes de posicionar el balon cuando esta en el lado derecho de la paleta
    /* -------------------- PALETA DERECHA -------------------- */
    const vertSuPizqPd = (balonX + balonWidth >= paletaDerechaX &&// 1 y 2 Verifica que el balón esté dentro del rango horizontal de la paleta
                            (balonX + radioBalon) + radioBalon / 2 <= paletaDerechaX &&// Determina que porcion del ancho del balon espera antes de posicionar el balon cuando esta en el lado superior de la paleta
                            balonY + balonHeight >= paletaDerechaY &&// Limite que el balón esté tocando el borde superior y fija el limite de contacto
                            balonY + radioBalon + radioBalon / 2 <= paletaDerechaY);// Limite que el balón esté tocando el borde superior y fija el limite de contacto
    const vertInfIzqPd = (balonX + balonWidth >= paletaDerechaX &&
                            (balonX + radioBalon) + radioBalon / 2 <= paletaDerechaX &&// arregla el paso horizontal antes de psocionar
                            (balonY + balonHeight) - radioBalon - radioBalon / 2 >= paletaDerechaY + paletaDerechaHeight &&// arregla el paso vertical antes de psocionar
                            balonY <= paletaDerechaY + paletaDerechaHeight);
    const ladoIzqPd = (balonX + balonWidth >= paletaDerechaX && // Verifica la posicion del lado izquierdo del balon y el lado derecho de la paleta derecha 
                        (balonX + radioBalon) + radioBalon / 2 <= paletaDerechaX && // Determina que porcion del ancho del balon espera antes de posicionar el balon cuando esta en el lado superior de la paleta
                        balonY + balonHeight >= paletaDerechaY && // 3 y 4 Verifica que el balón esté dentro de la altura de la paleta
                        balonY <= paletaDerechaY + paletaDerechaHeight);// 3 y 4 Verifica que el balón esté dentro de la altura de la paleta
    const ladoSupPd = (balonX + balonWidth >= paletaDerechaX &&// 1 y 2 Verifica que el balón esté dentro del rango horizontal de la paleta
                        balonX <= paletaDerechaX + paletaDerechaWidth &&// 1 y 2 Verifica que el balón esté dentro del rango horizontal de la paleta
                        balonY + balonHeight >= paletaDerechaY &&// Limite que el balón esté tocando el borde superior y fija el limite de contacto
                        balonY + radioBalon + radioBalon / 2 <= paletaDerechaY);// Determina que porcion del alto del balon espera antes de posicionar el balon cuando esta en el lado derecho de la paleta
    const ladoInfPd = (balonX + balonWidth >= paletaDerechaX &&// 1 y 2 Verifica que el balón esté dentro del rango horizontal de la paleta
                        balonX <= paletaDerechaX + paletaDerechaWidth &&// 1 y 2 Verifica que el balón esté dentro del rango horizontal de la paleta
                        balonY <= paletaDerechaY + paletaDerechaHeight && // Limite que el balón esté tocando el borde superior y fija el limite de contacto
                        (balonY + radioBalon) - radioBalon / 2 >= paletaDerechaY + paletaDerechaHeight);// Determina que porcion del alto del balon espera antes de posicionar el balon cuando esta en el lado derecho de la paleta
   
        const bordesPaletas = (vertSupDerPi ||
                                vertInfDerPi ||
                                ladoDerPi ||
                                ladoSupPi ||
                                ladoInfPi ||
                                vertSuPizqPd ||
                                vertInfIzqPd ||
                                ladoIzqPd ||
                                ladoSupPd ||
                                ladoInfPd);
    
        return {
            vertSupDerPi: vertSupDerPi,
            vertInfDerPi: vertInfDerPi,
            ladoDerPi: ladoDerPi,
            ladoSupPi: ladoSupPi,
            ladoInfPi: ladoInfPi,
            vertSuPizqPd: vertSuPizqPd,
            vertInfIzqPd: vertInfIzqPd,
            ladoIzqPd: ladoIzqPd,
            ladoSupPd: ladoSupPd,
            ladoInfPd: ladoInfPd,
            bordesPaletas: bordesPaletas // Devolvemos valor de calculo y no booleano como false o true
        };
    }

    // Funcion para controlar la velocidad de balon
    function controlVelocidad() {
        if (Math.abs(veloX) < veloMin) {
            veloX = (veloX <= 0 ? veloMin * 2 * -1 : veloMin * 2); // Aplicamos operador ternario "?" que es una forma reducida y práctica de if/else: "consulta ? verdadero : falso"
        } else if (Math.abs(veloX) > veloMax) {
            veloX = (veloX <= 0 ? -veloMax : veloMax);
        }
        // Controlar la velocidad de veloY
        if (Math.abs(veloY) < veloMin) {
            veloY = (veloY <= 0 ? veloMin * 2 * -1 : veloMin * 2);
        } else if (Math.abs(veloY) > veloMax) {
            veloY = (veloY <= 0 ? -veloMax : veloMax);
        }
        // Controlar el angulo de rebote por la velocidad de veloY
        if (Math.abs(veloX / veloY) < 0.2) { // Rebote demasiado plano
            veloY *= 0.5; // Ajusta la velocidad vertical para ampliar el ángulo
        }
    }

    /* -------------- INICIO FUNCION MOVER BALON -------------- */
    // Funcion comportamiento de balon
    function moverbalon() {
        const rect = cuadroJuego.getBoundingClientRect();
        // Redondea las posiciones del balón para evitar oscilaciones
        balonX = Math.round(balonX);
        balonY = Math.round(balonY);

         // Verificar si el rebote está activo
         if (reboteActivo){ // (CON rebote)
            // Verificar si las paletas están activas
            if (paletasActivas) { // (CON rebote) (CON paletas) // Balón REBOTA y considerando los bordes de las paletas
                // Calcular los bordes de las paletas
                const bordes = calcularBordes();
                // Verificar si el mouse está siendo seguido
                if (moverConMouse) { // (CON rebote) (CON paletas) (CON mouse) 
                    // Aplicar rebote en los bordes y detiene mouse
                    balonX += (mouseX - balonX) * 0.05;
                    balonY += (mouseY - balonY) * 0.05;
                    if (balonX <= 0 || balonX >= rect.width - balonWidth - (bordeRect * 2) ||
                        balonY <= 0 || balonY >= rect.height - balonHeight - (bordeRect * 2) || 
                        bordes.bordesPaletas) {
                        seguirMouse = false; // Inicia rebote tras tocar un borde
                        moverConMouse = false // Detiene rebote automatico
                        // Actualizar la posición y velocidad del balón
                        balonX += veloX;
                        balonY += veloY;
                        veloRamdom = Math.floor(Math.random() * 2) + 1;
                    }
                 
                    /* ---------- REBOTE LIMITES CUADROJUEGO ---------- */
                    // Rebote en el límite izquierdo
                    if (balonX <= 0) {
                        balonX = 0;         
                        veloX = (veloX + veloRamdom) * -1;
                    }
                    // Rebote en el límite derecho
                    else if (balonX >= rect.width - balonWidth - (bordeRect * 2)) {
                        balonX = rect.width - balonWidth - (bordeRect * 2); 
                        veloX = (veloX + veloRamdom) * -1; 
                    }
                    // Rebote en el límite superior
                    if (balonY <= 0) {
                        balonY = 0;         
                        veloY = (veloY + veloRamdom) * -1; 
                    } 
                    // Rebote en el límite inferior
                    else if (balonY >= rect.height - balonHeight - (bordeRect * 2)) {
                        balonY = rect.height - balonHeight - (bordeRect * 2); 
                        veloY = (veloY + veloRamdom) * -1; 
                    }

                    /* ---------- REBOTE LIMITES PALETA IZQUIERDA ---------- */
                    // Vértice SUPERIOR DERECHO de la paleta izquierda
                    if (bordes.vertSupDerPi) {
                        if (Math.abs(veloX) > Math.abs(veloY)) { // Prioriza el rebote horizontal 
                            veloX = -Math.abs(veloX * 2); // Doble de la velocidad en dirección opuesta //veloY = 0; // Rebote en línea recta horizontal // veloX = veloX * -1; 
                        } else {
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }     
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth + 2; // Posición ajustada para el rebote  
                        balonY = paletaIzquierdaY - balonHeight - 2;  
                        balon.style.backgroundColor = 'red'; // Cambia el color del balón                  
                    }
                    // Vértice INFERIOR DERECHO de la paleta izquierda
                    if (bordes.vertInfDerPi) { 
                        if (Math.abs(veloX) > Math.abs(veloY)) { // Prioriza el rebote horizontal
                            veloX = -Math.abs(veloX * 2); // Doble de la velocidad en dirección opuesta
                        } else {
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth + 2; // Posición ajustada para el rebote 
                        balonY = paletaIzquierdaY + paletaIzquierdaHeight + 2;   
                        balon.style.backgroundColor = 'green'; // Cambia el color del balón
                    }
                    // LADO DERECHO de la paleta izquierda (eje X)
                    if (bordes.ladoDerPi) { 
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            veloX = (veloX * veloRamdom) * -1;
                        } else {
                            veloY = 0; // Prioriza el rebote vertical 
                        }  
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth + 2;
                        balon.style.backgroundColor = 'lightgreen'; // Cambia el color del balón  
                    }
                    // LADO SUPERIOR de la paleta izquierda (eje Y)
                    if (bordes.ladoSupPi) { 
                        balonY = paletaIzquierdaY - balonHeight - 2; 
                        veloY = -veloY;  
                    }
                    // LADO INFERIOR de la paleta izquierda (eje Y)
                    if (bordes.ladoInfPi) {  
                        balonY = paletaIzquierdaY + paletaIzquierdaHeight + 2;
                        veloY = -veloY; 
                    }
                    
                    /* ---------- REBOTE LIMITES PALETA DERECHA ---------- */
                    // Vértice SUPERIOR IZQUIERDO de la paleta derecha
                    if (bordes.vertSuPizqPd) {
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            // veloX = veloX * -1; // Prioriza el rebote horizontal
                            // Rebote en línea recta hacia el borde derecho de cuadroJuego
                            veloX = Math.abs(veloX * 2);    // Doble de la velocidad en dirección opuesta
                            //veloY = 0;                      // Rebote en línea recta horizontal
                        } else {
                            //veloX = 0;
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }
                        balonX = paletaDerechaX - balonWidth - 2;   // Posición ajustada para el rebote  
                        balonY = paletaDerechaY - balonHeight - 2;
                        balon.style.backgroundColor = 'black'; // Cambia el color del balón                                
                    }
                    // Vértice INFERIOR IZQUIERDO de la paleta derecha
                    if (bordes.vertInfIzqPd) {
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            // veloX = veloX * -1; // Prioriza el rebote horizontal
                            // Rebote en línea recta hacia el borde derecho de cuadroJuego
                            veloX = Math.abs(veloX * 2);            // Doble de la velocidad en dirección opuesta
                            //veloY = 0;                              // Rebote en línea recta horizontal
                        } else {
                            //veloX = 0;
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }
                        balonX = paletaDerecha - balonWidth - 2;   // Posición ajustada para el rebote 
                        balonY = paletaDerechaHeight + 2;
                        balon.style.backgroundColor = 'blue'; // Cambia el color del balón                         
                    }
                    // LADO IZQUIERDO de la paleta (eje X)
                    if (bordes.ladoIzqPd) {
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            veloX = (veloX * veloRamdom) * -1;
                        } else {
                            veloY = 0; // Prioriza el rebote vertical 
                        } 
                        balonX = paletaDerechaX - balonWidth - 2;
                        balon.style.backgroundColor = `rgb(${100 * Math.floor(Math.random() * 256)}, ${10 * Math.floor(Math.random() * 256)}, ${150 * Math.floor(Math.random() * 256)})`;                           
                    }
                    // LADO SUPERIOR de la paleta (eje Y)
                    if (bordes.ladoSupPd) {
                        balonY = paletaDerechaY - balonHeight - 1;
                        veloY = -veloY;                             
                    }
                    // LADO INFERIOR de la paleta (eje Y)
                    if (bordes.ladoInfPd) { 
                        balonY = paletaDerechaY + paletaDerechaHeight + 1;
                        veloY = -veloY;                    
                    }

                    controlVelocidad(); // Controlar la velocidad de balon
                
                } else { // (CON rebote) (CON paletas) (SIN mouse)
                    balonX += veloX;
                    balonY += veloY;
                    veloRamdom = Math.floor(Math.random() * 2) + 1;
                    // Calcular los bordes de las paletas
                    const bordes = calcularBordes();

                    /* ---------- REBOTE LIMITES CUADRJUEGO ---------- */
                    // Rebote en el límite izquierdo
                    if (balonX <= 0) {
                        balonX = 0;         
                        veloX = (veloX + veloRamdom) * -1;
                    }
                    // Rebote en el límite derecho
                    else if (balonX >= rect.width - balonWidth - (bordeRect * 2)) {
                        balonX = rect.width - balonWidth - (bordeRect * 2); 
                        veloX = (veloX + veloRamdom) * -1; 
                    }
                    // Rebote en el límite superior
                    if (balonY <= 0) {
                        balonY = 0;         
                        veloY = (veloY + veloRamdom) * -1; 
                    } 
                    // Rebote en el límite inferior
                    else if (balonY >= rect.height - balonHeight - (bordeRect * 2)) {
                        balonY = rect.height - balonHeight - (bordeRect * 2); 
                        veloY = (veloY + veloRamdom) * -1; 
                    }

                    /* ---------- REBOTE LIMITES PALETA IZQUIERDA ---------- */
                    // Vértice SUPERIOR DERECHO de la paleta izquierda
                    if (bordes.vertSupDerPi) {
                        if (Math.abs(veloX) > Math.abs(veloY)) { // Prioriza el rebote horizontal 
                            veloX = -Math.abs(veloX * 2); // Doble de la velocidad en dirección opuesta //veloY = 0; // Rebote en línea recta horizontal // veloX = veloX * -1; 
                        } else {
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }     
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth + 2; // Posición ajustada para el rebote  
                        balonY = paletaIzquierdaY - balonHeight - 2;  
                        balon.style.backgroundColor = 'red'; // Cambia el color del balón                  
                    }
                    // Vértice INFERIOR DERECHO de la paleta izquierda
                    if (bordes.vertInfDerPi) { 
                        if (Math.abs(veloX) > Math.abs(veloY)) { // Prioriza el rebote horizontal
                            veloX = -Math.abs(veloX * 2); // Doble de la velocidad en dirección opuesta
                        } else {
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth + 2; // Posición ajustada para el rebote 
                        balonY = paletaIzquierdaY + paletaIzquierdaHeight + 2;   
                        balon.style.backgroundColor = 'green'; // Cambia el color del balón
                    }
                    // LADO DERECHO de la paleta izquierda (eje X)
                    if (bordes.ladoDerPi) { 
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            veloX = (veloX * veloRamdom) * -1;
                        } else {
                            veloY = 0; // Prioriza el rebote vertical 
                        }  
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth + 2;
                        balon.style.backgroundColor = 'lightgreen'; // Cambia el color del balón  
                    }
                    // LADO SUPERIOR de la paleta izquierda (eje Y)
                    if (bordes.ladoSupPi) { 
                        balonY = paletaIzquierdaY - balonHeight - 2; 
                        veloY = -veloY;  
                    }
                    // LADO INFERIOR de la paleta izquierda (eje Y)
                    if (bordes.ladoInfPi) {  
                        balonY = paletaIzquierdaY + paletaIzquierdaHeight + 2;
                        veloY = -veloY; 
                    }
                    
                    /* ---------- REBOTE LIMITES PALETA DERECHA ---------- */
                    // Vértice SUPERIOR IZQUIERDO de la paleta derecha
                    if (bordes.vertSuPizqPd) {
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            // veloX = veloX * -1; // Prioriza el rebote horizontal
                            // Rebote en línea recta hacia el borde derecho de cuadroJuego
                            veloX = Math.abs(veloX * 2);    // Doble de la velocidad en dirección opuesta
                            //veloY = 0;                      // Rebote en línea recta horizontal
                        } else {
                            //veloX = 0;
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }
                        balonX = paletaDerechaX - balonWidth - 2;   // Posición ajustada para el rebote  
                        balonY = paletaDerechaY - balonHeight - 2;
                        balon.style.backgroundColor = 'black'; // Cambia el color del balón                                
                    }
                    // Vértice INFERIOR IZQUIERDO de la paleta derecha
                    if (bordes.vertInfIzqPd) {
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            // veloX = veloX * -1; // Prioriza el rebote horizontal
                            // Rebote en línea recta hacia el borde derecho de cuadroJuego
                            veloX = Math.abs(veloX * 2);            // Doble de la velocidad en dirección opuesta
                            //veloY = 0;                              // Rebote en línea recta horizontal
                        } else {
                            //veloX = 0;
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }
                        balonX = paletaDerecha - balonWidth - 2;   // Posición ajustada para el rebote 
                        balonY = paletaDerechaHeight + 2;
                        balon.style.backgroundColor = 'blue'; // Cambia el color del balón                         
                    }
                    // LADO IZQUIERDO de la paleta (eje X)
                    if (bordes.ladoIzqPd) {
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            veloX = (veloX * veloRamdom) * -1;
                        } else {
                            veloY = 0; // Prioriza el rebote vertical 
                        } 
                        balonX = paletaDerechaX - balonWidth - 2;
                        balon.style.backgroundColor = `rgb(${100 * Math.floor(Math.random() * 256)}, ${10 * Math.floor(Math.random() * 256)}, ${150 * Math.floor(Math.random() * 256)})`;                           
                    }
                    // LADO SUPERIOR de la paleta (eje Y)
                    if (bordes.ladoSupPd) {
                        balonY = paletaDerechaY - balonHeight - 1;
                        veloY = -veloY;                             
                    }
                    // LADO INFERIOR de la paleta (eje Y)
                    if (bordes.ladoInfPd) { 
                        balonY = paletaDerechaY + paletaDerechaHeight + 1;
                        veloY = -veloY;                    
                    }

                    controlVelocidad(); // Controlar la velocidad de balon
                }

            } else { // (CON rebote) (SIN paletas)
                // Verificar si moverConMouse está activo // Mover el balón siguiendo el mouse, ignorando los bordes de las paletas
                if (moverConMouse) { // (CON rebote) (SIN paletas) (CON MOUSE)
                    // Aplicar rebote en los bordes y detiene mouse
                    balonX += (mouseX - balonX) * 0.05;
                    balonY += (mouseY - balonY) * 0.05;
                    if (balonX <= 0 || balonX >= rect.width - balonWidth - (bordeRect * 2) ||
                        balonY <= 0 || balonY >= rect.height - balonHeight - (bordeRect * 2)) {
                        seguirMouse = false; // Inicia rebote tras tocar un borde
                        moverConMouse = false // Detiene rebote automatico
                    }
                    
                    // Límite izquierdo y superior
                    if (balonX < 0) balonX = 0;
                    if (balonY < 0) balonY = 0;
                    // Límite derecho y límite inferior
                    if (balonX > rect.width - balonWidth - (bordeRect * 2)) 
                        balonX = rect.width - balonWidth - (bordeRect * 2);
                    if (balonY > rect.height - balonHeight - (bordeRect * 2)) 
                        balonY = rect.height - balonHeight - (bordeRect * 2);

                } else { // (CON rebote) (SIN paletas) (SIN MOUSE)
                    // Actualizar la posición del balón
                    balonX += veloX;
                    balonY += veloY;
                    veloRamdom = Math.floor(Math.random() * 2) + 1;
                    
                    // Rebote en el límite izquierdo
                    if (balonX <= 0) {
                        balonX = 0;         
                        veloX = (veloX + veloRamdom) * -1;
                    }
                    // Rebote en el límite derecho
                    else if (balonX >= rect.width - balonWidth - (bordeRect * 2)) {
                        balonX = rect.width - balonWidth - (bordeRect * 2); 
                        veloX = (veloX + veloRamdom) * -1; 
                    }
                    // Rebote en el límite superior
                    if (balonY <= 0) {
                        balonY = 0;         
                        veloY = (veloY + veloRamdom) * -1; 
                    } 
                    // Rebote en el límite inferior
                    else if (balonY >= rect.height - balonHeight - (bordeRect * 2)) {
                        balonY = rect.height - balonHeight - (bordeRect * 2); 
                        veloY = (veloY + veloRamdom) * -1; 
                    }

                    controlVelocidad(); // Controlar la velocidad de balon
                }
            }

        } else { // (SIN rebote) // El balón sigue al mouse

            if (paletasActivas) { // (SIN rebote) (CON paletas)
                
                if (moverConMouse) { // (SIN rebote) (CON paletas) (CON mouse)
                    /* ---------- CONTACTO LIMITES CUADRJUEGO ---------- */
                    // Ajuste con retraso para que el balon siga al mouse, a menor numero mayor retraso (0.05 es mas lento que 0.1)
                    balonX += (mouseX - balonX) * 0.05;
                    balonY += (mouseY - balonY) * 0.05;
                    
                    // Calcular los bordes de las paletas
                    const bordes = calcularBordes();
                    
                    /* ---------- CONTACTO LIMITES CUADROJUEGO ---------- */
                    // Límite izquierdo y superior
                    if (balonX < 0) balonX = 0;
                    if (balonY < 0) balonY = 0;
                    // Límite derecho y límite inferior
                    if (balonX > rect.width - balonWidth - (bordeRect * 2)) 
                        balonX = rect.width - balonWidth - (bordeRect * 2);   
                    if (balonY > rect.height - balonHeight - (bordeRect * 2)) 
                        balonY = rect.height - balonHeight - (bordeRect * 2); 

                    /* ---------- CONTACTO LIMITES PALETA IZQUIERDA ---------- */
                    // Vértice SUPERIOR DERECHO de la paleta izquierda
                    if (bordes.vertSupDerPi) {                                              
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth;   
                        balonY = paletaIzquierdaY - balonHeight;  
                        balon.style.backgroundColor = 'blue'; // Cambia el color del balón               
                    }
                    // Vértice INFERIOR DERECHO de la paleta izquierda
                    if (bordes.vertInfDerPi) {                                       
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth;                       
                        balonY = paletaIzquierdaY + paletaIzquierdaHeight;
                        balon.style.backgroundColor = 'red'; // Cambia el color del balón         
                    }
                    // LADO DERECHO de la paleta izquierda (eje X)
                    if (bordes.ladoDerPi) {                           
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth;
                    }
                    // LADO SUPERIOR de la paleta izquierda (eje Y)
                    if (bordes.ladoSupPi) { 
                        balonY = paletaIzquierdaY - balonHeight;                      
                    }
                    // LADO INFERIOR de la paleta izquierda (eje Y)
                    if (bordes.ladoInfPi) {
                        balonY = paletaIzquierdaY + paletaIzquierdaHeight; 
                    }
                    
                    /* ---------- CONTACTO LIMITES PALETA DERECHA ---------- */
                    // Vértice SUPERIOR IZQUIERDO de la paleta derecha
                    if (bordes.vertSupDerPd) { 
                        balonX = paletaDerechaX - balonWidth;                               
                        balonY = paletaDerechaY - balonHeight;                                        
                        balon.style.backgroundColor = 'red'; // Cambia el color del balón                         
                    }
                    // Vértice INFERIOR IZQUIERDO de la paleta derecha
                    if (bordes.vertInfIzqPd) { 
                        balonX = paletaDerechaX - balonWidth;                               
                        balonY = paletaDerechaY + paletaDerechaHeight; 
                        balon.style.backgroundColor = 'blue'; // Cambia el color del balón                     
                    }
                    // LADO IZQUIERDO de la paleta derecha (eje X)
                    if (bordes.ladoIzqPd) {                                                
                        balonX = paletaDerechaX - balonWidth;
                    }
                    // LADO SUPERIOR de la paleta (eje Y)
                    if (bordes.ladoSupPd) {                                                
                        balonY = paletaDerechaY - balonHeight;               
                    }
                    // LADO INFERIOR de la paleta (eje Y)
                    if (bordes.ladoInfPd) {                                               
                        balonY = paletaDerechaY + paletaDerechaHeight;                   
                    }
                } else { // (SIN rebote) (CON paletas) (SIN mouse)
                    // Actualizar la posición del balón
                    
                    balonX;
                    balonY;
                }

            } else  { // (SIN rebote) (SIN paletas)

                if (moverConMouse) { // (SIN rebote) (SIN paletas) (CON mouse)
                    balonX += (mouseX - balonX) * 0.05;
                    balonY += (mouseY - balonY) * 0.05;
                    
                    // Límite izquierdo y superior
                    if (balonX < 0) balonX = 0;
                    if (balonY < 0) balonY = 0;
                    // Límite derecho y límite inferior
                    if (balonX > rect.width - balonWidth - (bordeRect * 2)) 
                        balonX = rect.width - balonWidth - (bordeRect * 2);
                    if (balonY > rect.height - balonHeight - (bordeRect * 2)) 
                        balonY = rect.height - balonHeight - (bordeRect * 2);

                } else { // (SIN rebote) (SIN paletas) (SIN mouse)
                    // Actualizar la posición del balón
                    
                    balonX;
                    balonY;
                }

            }
            
        }

        balon.style.transform = `translate(${balonX}px, ${balonY}px)`; // Aplicamos los valores css al balon

        requestAnimationFrame(moverbalon); // Continuar animando
    }

    /* -------------- FIN FUNCION MOVER BALON -------------- */

    // Funcion comportamiento de resize
    function actualizarDimensiones() {
        const rect = cuadroJuego.getBoundingClientRect();
        const balonWidth = balon.offsetWidth;
        const balonHeight = balon.offsetHeight;

        // Calcular posición del balón
        balonX = (rect.width - balonWidth) / 2;
        balonY = (rect.height - balonHeight) / 2;

        // Calcular posiciones de las paletas
        const bordePaleta = parseFloat(getComputedStyle(paletaDerecha).borderRightWidth);
        paletaIzquierdaX = 0;
        paletaIzquierdaY = (rect.height - paletaIzquierda.offsetHeight - (bordePaleta * 2)) / 2;
        paletaDerechaX = rect.width - paletaDerecha.offsetWidth - (bordePaleta * 2);
        paletaDerechaY = (rect.height - paletaDerecha.offsetHeight - (bordePaleta * 2)) / 2;

        // Aplicar nuevas posiciones
        balon.style.transform = `translate(${balonX}px, ${balonY}px)`;
        paletaIzquierda.style.transform = `translate(${paletaIzquierdaX}px, ${paletaIzquierdaY}px)`;
        paletaDerecha.style.transform = `translate(${paletaDerechaX}px, ${paletaDerechaY}px)`;
    }

    // Funcion que llama a las funciones para ejecutarse
    function animaciones() {
        const widthActual = window.innerWidth;
        const heightActual = window.innerHeight;

        if (widthActual !== widthInicial || heightActual !== heightInicial) {
            actualizarDimensiones();
            widthInicial = widthActual;
            heightInicial = heightActual;
        }

        moverbalon();
        moverPaletas();

        //animationId = requestAnimationFrame(animaciones);
    }

    // Funcion comenzar
    function iniciarJuego() {
        actualizarDimensiones(); // Configuración inicial
        animaciones(); // Iniciar el bucle de animación
    }

    // Funcion terminar // Agregar proxima etapa botones
    function detenerJuego() {
        cancelAnimationFrame(animationId);
    }

    // Evento de redimensionamiento redundante para mejorar el evento
    window.addEventListener('resize', () => {
        actualizarDimensiones();
        widthInicial = window.innerWidth;
        heightInicial = window.innerHeight;
    });

    // Llamada a Iniciar el juego
    iniciarJuego();

});

