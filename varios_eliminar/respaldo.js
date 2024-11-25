 // Funcion comportamiento de balon
 function moverbalon() {
    const rect = cuadroJuego.getBoundingClientRect();

    if (!paletasActivas) { // (SIN paletas) // Las paletas se ignoran, se mueven pero el balon las atraviesa
        // Movimiento seguir mouse con retardo y sin rebote y sin reconocer paletas
        if (!reboteActivo) { // SIN rebote (SIN paletas)
            // Ajuste con retraso para que el balon siga al mouse, a menor numero mayor retraso (0.05 es mas lento que 0.1)
            balonX += (mouseX - balonX) * 0.05;
            balonY += (mouseY - balonY) * 0.05;
            // Límite izquierdo y superior
            if (balonX < 0) balonX = 0;
            if (balonY < 0) balonY = 0;
            // Límite derecho y límite inferior
            if (balonX > rect.width - balonWidth - (bordeRect * 2)) 
                balonX = rect.width - balonWidth - (bordeRect * 2);   // Agregar bordes porque rect no los contempla
            if (balonY > rect.height - balonHeight - (bordeRect * 2)) 
                balonY = rect.height - balonHeight - (bordeRect * 2); // Agregar bordes porque rect no los contempla
        }// Fin rebote desactivado

        // Movimiento rebote activado
        else /*(reboteActivo)*/ { // CON rebote (SIN paletas)
            /* --- Definimos comportamiento de balon en rebote y seguimiento de mouse --- */
            // Sigue el mouse hasta tocar un borde y rebota, AUN NO reconoce paletas
            if (seguirMouse) { // En Rebote activo, seguir mouse esta activo tecla m down
                balonX += (mouseX - balonX) * 0.05;
                balonY += (mouseY - balonY) * 0.05;
                if (balonX <= 0 || balonX >= rect.width - balonWidth - (bordeRect * 2) ||
                    balonY <= 0 || balonY >= rect.height - balonHeight - (bordeRect * 2)) {
                    seguirMouse = false; // Inicia rebote tras tocar un borde
                }

            } else /*(NO seguirMouse)*/ { // (SIN mouse) CON rebote (SIN paletas) // Rebotes libres en el cuadro,  tecla m up 
                // Actualizar la posición del balón
                balonX += veloX;
                balonY += veloY;
                veloRamdom = Math.floor(Math.random() * 10) + 1;

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
        } // Fin rebote activado
    } // Fin ignorar paletas
    
    else /*(paletasActivas)*/{ // (CON paletas) // Las paletas se reconocen
        /* --------------- Paletas ACTIVAS SIN REBOTES --------------- */
        if (!reboteActivo) { // (CON paletas) (SIN rebote)
            // Movimiento seguir mouse sin rebote y tocar 4 bordes cuadroJuego y 3 bordes paletas
            if (!paletasLibres){ // Las paletas solo se mueven en el Y
                // Calcular el centro del balón
                const centroBalonX = balonX + balonWidth / 2;
                const centroBalonY = balonY + balonHeight / 2;
                const radioBalon = balonWidth / 2;
                
                // Movimiento seguir mouse con retardo
                balonX += (mouseX - balonX) * 0.05;
                balonY += (mouseY - balonY) * 0.05;

                // Posicionar de acuerdo al borde de cuadroJuego que toque
                // Límite izquierdo y superior
                if (balonX < 0) balonX = 0;
                if (balonY < 0) balonY = 0;
                // Límite derecho y límite inferior
                if (balonX > rect.width - balonWidth - (bordeRect * 2)) 
                    balonX = rect.width - balonWidth - (bordeRect * 2);   // Agregar bordes porque rect no los contempla
                if (balonY > rect.height - balonHeight - (bordeRect * 2)) 
                    balonY = rect.height - balonHeight - (bordeRect * 2); // Agregar bordes porque rect no los contempla

                /* ---------- PALETA IZQUIERDA ---------- */
                // Vértice SUPERIOR DERECHO de la paleta izquierda
                if (balonX < paletaIzquierdaX + paletaIzquierdaWidth &&                     // Verifica que el balón esté a la izquierda del borde derecho de la paleta
                    balonX - balonHeight > radioBalon / 2 + paletaIzquierdaWidth &&         // Controla que el borde derecho del balón toque el borde derecho de la paleta
                    balonY + balonHeight > paletaIzquierdaY &&                              // Asegura que el borde inferior del balón esté alineado en el eje Y con la paleta
                    balonY < paletaIzquierdaY) {                                            // Confirma que el balón está en la zona superior antes de cruzar el borde superior de la paleta
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth;                   // Reposiciona el balón en el borde derecho de la paleta
                        balonY = paletaIzquierdaY - balonHeight;                            // Ajusta el balón en el borde superior de la paleta para evitar que cruce
                }
                // Vértice INFERIOR DERECHO de la paleta izquierda
                if (balonX < paletaIzquierdaX + paletaIzquierdaWidth &&                         // Verifica que el balón esté a la izquierda del borde derecho de la paleta
                    balonX + radioBalon / 2 > radioBalon / 2 + paletaIzquierdaWidth &&          // Controla que el borde derecho del balón toque el borde derecho de la paleta
                    balonY < paletaIzquierdaY + paletaIzquierdaHeight &&                        // Asegura que el borde superior del balón esté en el rango vertical de la paleta
                    balonY + radioBalon / 2 > paletaIzquierdaY + paletaIzquierdaHeight) {       // Confirma que el borde inferior del balón toque el borde inferior de la paleta
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth;                       // Reposiciona el balón en el borde derecho de la paleta
                        balonY = paletaIzquierdaY + paletaIzquierdaHeight;                      // Ajusta el balón en el borde inferior de la paleta
                }
                // BORDE DERECHO de la paleta (eje X)
                if (balonX < paletaIzquierdaX + paletaIzquierdaWidth &&                     // Verifica que el balón (borde izquierdo) esté a la izquierda del borde derecho de la paleta
                    balonX + radioBalon /2 > paletaIzquierdaX + paletaIzquierdaWidth &&     // Controla que el borde derecho del balón toque el borde derecho de la paleta antes de cruzarlo
                    balonY > paletaIzquierdaY - radioBalon &&                               // Verifica que el balón (altura del balon) esté dentro del rango vertical de la paleta // Poner para modificar x del balon superior: balonY + radioBalon > paletaIzquierdaY
                    balonY < paletaIzquierdaY + paletaIzquierdaHeight) {                    // Limita la colisión a la altura de la paleta
                    balonX = paletaIzquierdaX + paletaIzquierdaWidth;                       // Reposiciona el balón en el borde derecho de la paleta
                }
                // BORDE SUPERIOR de la paleta (eje Y)
                if (balonY + balonHeight >= paletaIzquierdaY &&                             // Verifica que el borde inferior del balón toque el borde superior de la paleta
                    balonY + radioBalon <= paletaIzquierdaY &&                              // Controla que el borde superior del balón no cruce el borde superior de la paleta
                    balonX + balonWidth >= paletaIzquierdaX &&                              // Asegura que el balón no entre a la paleta por arriba
                    balonX <= paletaIzquierdaX + paletaIzquierdaWidth) {                    // Confirma que el balón esté dentro del ancho de la paleta
                        balonY = paletaIzquierdaY - balonHeight;                            // Ajusta el balón al borde superior de la paleta
                }
                // Colisión en el BORDE INFERIOR de la paleta (eje Y)
                if (balonY <= paletaIzquierdaY + paletaIzquierdaHeight &&                   // Verifica que el borde superior del balón esté dentro de la altura de la paleta
                    balonY + radioBalon /2 >= paletaIzquierdaY + paletaIzquierdaHeight &&   // Controla que el borde inferior del balón no cruce el borde inferior de la paleta
                    balonX <= paletaIzquierdaX + paletaIzquierdaWidth &&                    // Asegura que el balón no entre a la paleta por abajo
                    balonX + radioBalon /2 < paletaIzquierdaX + paletaIzquierdaWidth) {     // Confirma que el balón esté dentro del ancho de la paleta
                        balonY = paletaIzquierdaY + paletaIzquierdaHeight;                  // Ajusta el balón al borde inferior de la paleta
                }
                
                 /* ---------- PALETA DERECHA ---------- */
                // Vértice SUPERIOR IZQUIERDO de la paleta derecha
                if (balonX + balonWidth > paletaDerechaX &&                                 // Verifica que el borde derecho del balón esté en el borde izquierdo de la paleta
                    balonX < radioBalon / 2 + paletaDerechaWidth &&                         // Confirma que el balón esté dentro del rango horizontal de la paleta
                    balonY + balonHeight > paletaDerechaY &&                                // Asegura que el borde inferior del balón toque el borde superior de la paleta
                    balonY < paletaDerechaY) {                                              // Confirma que el balón está en la zona superior antes de cruzar el borde superior de la paleta
                        balonX = paletaDerechaX - balonWidth;                               // Reposiciona el balón al borde izquierdo de la paleta
                        balonY = paletaDerechaY - balonHeight;                              // Ajusta el balón en el borde superior de la paleta
                }
                // Vértice INFERIOR IZQUIERDO de la paleta derecha
                if (balonX + balonWidth > paletaDerechaX &&                                 // Verifica que el borde derecho del balón esté en el borde izquierdo de la paleta
                    balonX < radioBalon / 2  + paletaDerechaWidth &&                         // Confirma que el balón esté dentro del rango horizontal de la paleta
                    balonY < paletaDerechaY + paletaDerechaHeight &&                        // Asegura que el borde superior del balón esté en el rango vertical de la paleta
                    balonY + balonHeight > paletaDerechaY + paletaDerechaHeight) {          // Confirma que el borde inferior del balón toque el borde inferior de la paleta
                        balonX = paletaDerechaX - balonWidth;                               // Reposiciona el balón al borde izquierdo de la paleta
                        balonY = paletaDerechaY + paletaDerechaHeight;                      // Ajusta el balón en el borde inferior de la paleta
                }
                 // BORDE IZQUIERDO de la paleta (eje X)
                 if (balonX + balonWidth > paletaDerechaX &&                               // Verifica que el borde derecho del balón toque el borde izquierdo de la paleta
                     balonX + balonWidth < paletaDerechaX + radioBalon / 2 &&              // Confirma que el balón está fuera de la paleta, en su borde izquierdo
                     balonY + balonHeight > paletaDerechaY &&                              // Verifica que el borde inferior del balón esté dentro del rango vertical de la paleta
                     balonY < paletaDerechaY + paletaDerechaHeight) {                      // Asegura que el borde superior del balón esté dentro del rango vertical de la paleta
                        balonX = paletaDerechaX - balonWidth;                              // Ajusta el balón al borde izquierdo de la paleta derecha
                }
                // BORDE SUPERIOR de la paleta (eje Y)
                if (balonY + balonHeight > paletaDerechaY &&                               // Verifica que el borde inferior del balón toque el borde superior de la paleta
                    balonY < paletaDerechaY &&                                             // Controla que el borde superior del balón no cruce el borde superior de la paleta
                    balonX + balonWidth > paletaDerechaX &&                                // Asegura que el balón esté alineado horizontalmente con la palet
                    balonX < paletaDerechaX + paletaDerechaWidth) {                        // Confirma que el balón esté dentro del ancho de la paleta
                        balonY = paletaDerechaY - balonHeight;                             // Ajusta el balón al borde superior de la paleta
                }
                // Colisión en el BORDE INFERIOR de la paleta (eje Y)
                if (balonY + balonHeight > paletaDerechaY + paletaDerechaHeight &&          // Verifica que el borde inferior del balón toque el borde inferior de la paleta
                    balonY < paletaDerechaY + paletaDerechaHeight &&                        // Controla que el borde superior del balón no cruce el borde inferior de la paleta
                    balonX + balonWidth > paletaDerechaX &&                                 // Asegura que el balón esté alineado horizontalmente con la paleta
                    balonX < paletaDerechaX + paletaDerechaWidth) {                         // Confirma que el balón esté dentro del ancho de la paleta
                        balonY = paletaDerechaY + paletaDerechaHeight;                      // Ajusta el balón al borde inferior de la paleta
                }
            }
        }
        
        /* --------------------- Paletas ACTIVAS CON REBOTES --------------------- */
        /* --------------- Definimos comportamiento de balon en REBOTE --------------- */
        else /*(reboteActivo)*/{ // (CON rebote) (CON paletas)
            if (!paletasLibres ){ // Las paletas solo se mueven en el Y      
                // Movimiento seguir mouse CON rebote y tocar 4 bordes cuadroJuego y 3 bordes paletas
                if (seguirMouse) { // (CON mouse) (CON rebote) (CON paletas)
                    balonX += (mouseX - balonX) * 0.05;
                    balonY += (mouseY - balonY) * 0.05;
                    if (balonX <= 0 || balonX >= rect.width - balonWidth - (bordeRect * 2) ||
                        balonY <= 0 || balonY >= rect.height - balonHeight - (bordeRect * 2)) {
                        seguirMouse = false; // Inicia rebote tras tocar un borde
                    }

                } else { // (SIN mouse) (CON rebote) (CON paletas) // Rebotes libres
                    // Actualizar la posición del balón
                    balonX += veloX;
                    balonY += veloY;
                    veloRamdom = Math.floor(Math.random() * 10) + 1;
                    // Calcular el centro del balón
                    const centroBalonX = balonX + balonWidth / 2;
                    const centroBalonY = balonY + balonHeight / 2;
                    const radioBalon = balonWidth / 2;

                    /* -------------------- CUADRO DE JUEGO -------------------- */
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
                    
                    /* -------------------- PALETA IZQUIERDA -------------------- */
                    // Vértice SUPERIOR DERECHO de la paleta izquierda
                    else if (balonX < paletaIzquierdaX + paletaIzquierdaWidth &&                // Verifica que el balón esté a la izquierda del borde derecho de la paleta
                        balonX - balonHeight > radioBalon / 2 + paletaIzquierdaWidth &&         // Controla que el borde derecho del balón toque el borde derecho de la paleta
                        balonY + balonHeight > paletaIzquierdaY &&                              // Asegura que el borde inferior del balón esté alineado en el eje Y con la paleta
                        balonY < paletaIzquierdaY) {                                            // Confirma que el balón está en la zona superior antes de cruzar el borde superior de la paleta
                        // Rebote en línea recta hacia el borde izquierdo de cuadroJuego
                        veloX = -Math.abs(veloX * 2); // Doble de la velocidad en dirección opuesta
                        veloY = 0; // Rebote en línea recta horizontal
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth; // Posición ajustada para el rebote                           
                    }
                    // Vértice INFERIOR DERECHO de la paleta izquierda
                    else if (balonX < paletaIzquierdaX + paletaIzquierdaWidth &&                // Verifica que el balón esté a la izquierda del borde derecho de la paleta
                        balonX + radioBalon / 2 > radioBalon / 2 + paletaIzquierdaWidth &&      // Controla que el borde derecho del balón toque el borde derecho de la paleta
                        balonY < paletaIzquierdaY + paletaIzquierdaHeight &&                    // Asegura que el borde superior del balón esté en el rango vertical de la paleta
                        balonY + radioBalon / 2 > paletaIzquierdaY + paletaIzquierdaHeight) {   // Confirma que el borde inferior del balón toque el borde inferior de la paleta
                        // Rebote en línea recta hacia el borde izquierdo de cuadroJuego
                        veloX = -Math.abs(veloX * 2); // Doble de la velocidad en dirección opuesta
                        veloY = 0; // Rebote en línea recta horizontal
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth; // Posición ajustada para el rebote                 
                    }
                    // BORDE DERECHO de la paleta izquierda
                    else if (balonX < paletaIzquierdaX + paletaIzquierdaWidth &&                // Verifica que el balón (borde izquierdo) esté a la izquierda del borde derecho de la paleta
                        balonX + radioBalon /2 > paletaIzquierdaX + paletaIzquierdaWidth &&     // Controla que el borde derecho del balón toque el borde derecho de la paleta antes de cruzarlo
                        balonY > paletaIzquierdaY - radioBalon &&                               // Verifica que el balón (altura del balon) esté dentro del rango vertical de la paleta // Poner para modificar x del balon superior: balonY + radioBalon > paletaIzquierdaY
                        balonY < paletaIzquierdaY + paletaIzquierdaHeight) {                    // Limita la colisión a la altura de la paleta
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth;  
                        veloX = -veloX;                        
                    }
                    // BORDE SUPERIOR de la paleta izquierda
                    else if (balonY + balonHeight >= paletaIzquierdaY &&                        // Verifica que el borde inferior del balón toque el borde superior de la paleta
                        balonY + radioBalon <= paletaIzquierdaY &&                              // Controla que el borde superior del balón no cruce el borde superior de la paleta
                        balonX + balonWidth >= paletaIzquierdaX &&                              // Asegura que el balón no entre a la paleta por arriba
                        balonX <= paletaIzquierdaX + paletaIzquierdaWidth) {                    // Confirma que el balón esté dentro del ancho de la paleta
                        balonY = paletaIzquierdaY - balonHeight; 
                        veloY = -veloY;                            
                    }
                    // BORDE INFERIOR de la paleta izquierda
                    else if (balonY <= paletaIzquierdaY + paletaIzquierdaHeight &&              // Verifica que el borde superior del balón esté dentro de la altura de la paleta
                        balonY + radioBalon /2 >= paletaIzquierdaY + paletaIzquierdaHeight &&   // Controla que el borde inferior del balón no cruce el borde inferior de la paleta
                        balonX <= paletaIzquierdaX + paletaIzquierdaWidth &&                    // Asegura que el balón no entre a la paleta por abajo
                        balonX + radioBalon /2 < paletaIzquierdaX + paletaIzquierdaWidth) {     // Confirma que el balón esté dentro del ancho de la paleta
                        balonY = paletaIzquierdaY + paletaIzquierdaHeight;
                        veloY = -veloY;                 
                    }
                    
                    /* -------------------- PALETA DERECHA -------------------- */
                    // Vértice SUPERIOR IZQUIERDO de la paleta derecha
                    else if (balonX + balonWidth > paletaDerechaX &&                            // Verifica que el borde derecho del balón esté en el borde izquierdo de la paleta
                        balonX < radioBalon / 2 + paletaDerechaWidth &&                         // Confirma que el balón esté dentro del rango horizontal de la paleta
                        balonY + balonHeight > paletaDerechaY &&                                // Asegura que el borde inferior del balón toque el borde superior de la paleta
                        balonY < paletaDerechaY) {                                              // Confirma que el balón está en la zona superior antes de cruzar el borde superior de la paleta
                        // Rebote en línea recta hacia el borde derecho de cuadroJuego
                        veloX = Math.abs(veloX * 2); // Doble de la velocidad en dirección opuesta
                        veloY = 0; // Rebote en línea recta horizontal
                        balonX = paletaDerechaX - balonWidth; // Posición ajustada para el rebote                             
                    }
                    // Vértice INFERIOR IZQUIERDO de la paleta derecha
                    else if (balonX + balonWidth > paletaDerechaX &&                            // Verifica que el borde derecho del balón esté en el borde izquierdo de la paleta
                        balonX < radioBalon / 2  + paletaDerechaWidth &&                        // Confirma que el balón esté dentro del rango horizontal de la paleta
                        balonY < paletaDerechaY + paletaDerechaHeight &&                        // Asegura que el borde superior del balón esté en el rango vertical de la paleta
                        balonY + balonHeight > paletaDerechaY + paletaDerechaHeight) {          // Confirma que el borde inferior del balón toque el borde inferior de la paleta
                        // Rebote en línea recta hacia el borde derecho de cuadroJuego
                        veloX = Math.abs(veloX * 2); // Doble de la velocidad en dirección opuesta
                        veloY = 0; // Rebote en línea recta horizontal
                        balonX = paletaDerechaX - balonWidth; // Posición ajustada para el rebote                     
                    }
                    // BORDE IZQUIERDO de la paleta derecha
                    else if (balonX + balonWidth > paletaDerechaX &&                          // Verifica que el borde derecho del balón toque el borde izquierdo de la paleta
                        balonX + balonWidth < paletaDerechaX + radioBalon / 2 &&              // Confirma que el balón está fuera de la paleta, en su borde izquierdo
                        balonY + balonHeight > paletaDerechaY &&                              // Verifica que el borde inferior del balón esté dentro del rango vertical de la paleta
                        balonY < paletaDerechaY + paletaDerechaHeight) {                      // Asegura que el borde superior del balón esté dentro del rango vertical de la paleta
                        balonX = paletaDerechaX - balonWidth;
                        veloX = -veloX;                             
                    }
                    // BORDE SUPERIOR de la paleta derecha
                    else if (balonY + balonHeight > paletaDerechaY &&                          // Verifica que el borde inferior del balón toque el borde superior de la paleta
                        balonY < paletaDerechaY &&                                             // Controla que el borde superior del balón no cruce el borde superior de la paleta
                        balonX + balonWidth > paletaDerechaX &&                                // Asegura que el balón esté alineado horizontalmente con la palet
                        balonX < paletaDerechaX + paletaDerechaWidth) {                        // Confirma que el balón esté dentro del ancho de la paleta
                        balonY = paletaDerechaY - balonHeight;
                        veloY = -veloY;                             
                    }
                    // BORDE INFERIOR de la paleta derecha
                    else if (balonY + balonHeight > paletaDerechaY + paletaDerechaHeight &&     // Verifica que el borde inferior del balón toque el borde inferior de la paleta
                        balonY < paletaDerechaY + paletaDerechaHeight &&                        // Controla que el borde superior del balón no cruce el borde inferior de la paleta
                        balonX + balonWidth > paletaDerechaX &&                                 // Asegura que el balón esté alineado horizontalmente con la paleta
                        balonX < paletaDerechaX + paletaDerechaWidth) {                         // Confirma que el balón esté dentro del ancho de la paleta
                        balonY = paletaDerechaY + paletaDerechaHeight;
                        veloY = -veloY;                    
                    }

                    controlVelocidad(); // Controlar la velocidad de balon
                }
            }
        }
    }

    balon.style.transform = `translate(${balonX}px, ${balonY}px)`; // Aplicamos los valores css al balon

    requestAnimationFrame(moverbalon); // Continuar animando
}
