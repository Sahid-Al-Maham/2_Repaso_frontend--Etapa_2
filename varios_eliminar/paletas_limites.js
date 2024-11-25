//A) Paleta Izquierda
//Borde derecho (balón choca con el lado derecho de la paleta)
(balonX < paletaIzquierdaX + paletaIzquierdaWidth &&
balonY + balonHeight >= paletaIzquierdaY &&
balonY <= paletaIzquierdaY + paletaIzquierdaHeight)
/*Posición del balón:*/ balonX = paletaIzquierdaX + paletaIzquierdaWidth;
//Vértice superior derecho
balonX < paletaIzquierdaX + paletaIzquierdaWidth &&
balonY + balonHeight >= paletaIzquierdaY &&
balonY < paletaIzquierdaY
/*Posición del balón:*/ balonX = paletaIzquierdaX + paletaIzquierdaWidth; "y", balonY = paletaIzquierdaY - balonHeight;
//Vértice inferior derecho
balonX < paletaIzquierdaX + paletaIzquierdaWidth &&
balonY <= paletaIzquierdaY + paletaIzquierdaHeight &&
balonY + balonHeight > paletaIzquierdaY + paletaIzquierdaHeight
/*Posición del balón:*/ balonX = paletaIzquierdaX + paletaIzquierdaWidth; "y", balonY = paletaIzquierdaY + paletaIzquierdaHeight;
//Borde superior
balonY + balonHeight > paletaIzquierdaY &&
balonY < paletaIzquierdaY &&
balonX + balonWidth > paletaIzquierdaX &&
balonX < paletaIzquierdaX + paletaIzquierdaWidth
/*Posición del balón:*/ balonY = paletaIzquierdaY - balonHeight;
//Borde inferior
balonY < paletaIzquierdaY + paletaIzquierdaHeight &&
balonY + balonHeight > paletaIzquierdaY + paletaIzquierdaHeight &&
balonX + balonWidth > paletaIzquierdaX &&
balonX < paletaIzquierdaX + paletaIzquierdaWidth
/*Posición del balón:*/ balonY = paletaIzquierdaY + paletaIzquierdaHeight;
//Borde izquierdo (generalmente no aplica, ya que es el lado fuera de la paleta)
(balonX + balonWidth > paletaIzquierdaX) // en uso
/*Posición del balón:*/ balonX = paletaIzquierdaX - balonWidth;
//Vértice superior izquierdo
balonX + balonWidth > paletaIzquierdaX &&
balonY + balonHeight >= paletaIzquierdaY &&
balonY < paletaIzquierdaY
/*Posición del balón:*/ balonX = paletaIzquierdaX - balonWidth; "y", balonY = paletaIzquierdaY - balonHeight;
//Vértice inferior izquierdo
balonX + balonWidth > paletaIzquierdaX &&
balonY <= paletaIzquierdaY + paletaIzquierdaHeight &&
balonY + balonHeight > paletaIzquierdaY + paletaIzquierdaHeight
/*Posición del balón:*/ balonX = paletaIzquierdaX - balonWidth; "y", balonY = paletaIzquierdaY + paletaIzquierdaHeight;

balonX + balonWidth >= paletaIzquierdaX
balonX < paletaIzquierdaX + paletaIzquierdaWidth
balonY + balonHeight >= paletaIzquierdaY
balonY <= paletaIzquierdaY + paletaIzquierdaHeight

//B) Paleta Derecha
//Borde izquierdo (balón choca con el lado izquierdo de la paleta)
balonX + balonWidth > paletaDerechaX &&
balonY + balonHeight >= paletaDerechaY &&
balonY <= paletaDerechaY + paletaDerechaHeight
/*Posición del balón:*/ balonX = paletaDerechaX - balonWidth;
//Vértice superior izquierdo
balonX + balonWidth > paletaDerechaX &&
balonY + balonHeight >= paletaDerechaY &&
balonY < paletaDerechaY
/*Posición del balón:*/ balonX = paletaDerechaX - balonWidth; "y", balonY = paletaDerechaY - balonHeight;
//Vértice inferior izquierdo
balonX + balonWidth > paletaDerechaX &&
balonY <= paletaDerechaY + paletaDerechaHeight &&
balonY + balonHeight > paletaDerechaY + paletaDerechaHeight
/*Posición del balón:*/ balonX = paletaDerechaX - balonWidth; "y", balonY = paletaDerechaY + paletaDerechaHeight;
//Borde superior
balonY + balonHeight > paletaDerechaY &&
balonY < paletaDerechaY &&
balonX + balonWidth > paletaDerechaX &&
balonX < paletaDerechaX + paletaDerechaWidth
/*Posición del balón:*/ balonY = paletaDerechaY - balonHeight;
//Borde inferior
balonY < paletaDerechaY + paletaDerechaHeight &&
balonY + balonHeight > paletaDerechaY + paletaDerechaHeight &&
balonX + balonWidth > paletaDerechaX &&
balonX < paletaDerechaX + paletaDerechaWidth
/*Posición del balón:*/ balonY = paletaDerechaY + paletaDerechaHeight;
//Borde derecho (generalmente no aplica, ya que es el lado fuera de la paleta)
balonX < paletaDerechaX + paletaDerechaWidth
/*Posición del balón:*/ balonX = paletaDerechaX + paletaDerechaWidth;
//Vértice superior derecho
balonX < paletaDerechaX + paletaDerechaWidth &&
balonY + balonHeight >= paletaDerechaY &&
balonY < paletaDerechaY
/*Posición del balón:*/ balonX = paletaDerechaX + paletaDerechaWidth; "y", balonY = paletaDerechaY - balonHeight;
//Vértice inferior derecho
balonX < paletaDerechaX + paletaDerechaWidth &&
balonY <= paletaDerechaY + paletaDerechaHeight &&
balonY + balonHeight > paletaDerechaY + paletaDerechaHeight
/*Posición del balón:*/ balonX = paletaDerechaX + paletaDerechaWidth; "y", balonY = paletaDerechaY + paletaDerechaHeight;


                    /*
                    // Colisión en el borde izquierdo de la paleta (eje X)
                    if (centroBalonX + radioBalon > paletaIzquierdaX) {
                        if (centroBalonY > paletaIzquierdaY && centroBalonY < paletaIzquierdaY + paletaIzquierdaHeight) {
                            balonX = paletaIzquierdaX - balonWidth; // Mantiene el balón fuera de la paleta en X
                        }
                    }
                    */

                    /*if (balonX < paletaIzquierdaX + paletaIzquierdaWidth && // Balón a la izquierda del borde derecho de la paleta
                        balonY + balonHeight >= paletaIzquierdaY && // Balón por debajo del borde superior de la paleta
                        balonY <= paletaIzquierdaY + paletaIzquierdaHeight && // Balón por encima del borde inferior de la paleta
                        balonX + balonWidth > paletaIzquierdaX) { // Balón a la derecha del borde izquierdo de la paleta
                        
                            
                            // Calcular distancias a los bordes de la paleta
                            const deltaYTop = centroBalonY - paletaIzquierdaY; // Distancia al borde superior
                            const deltaYBottom = (paletaIzquierdaY + paletaIzquierdaHeight) - centroBalonY; // Distancia al borde inferior
                            const deltaXLeft = centroBalonX - paletaIzquierdaX; // Distancia al borde izquierdo
                            const deltaXRight = (paletaIzquierdaX + paletaIzquierdaWidth) - centroBalonX; // Distancia al borde derecho




                    }*/
                    /*
                    // Paleta derecha
                    if (balonX + balonWidth > paletaDerechaX && balonY + balonHeight >= paletaDerechaY && 
                        balonY <= paletaDerechaY + paletaDerechaHeight) {
                        balonX = paletaDerechaX - balonWidth; // Coloca el balón justo al lado de la paleta
                    }*/


            // Movimiento con rebote
          /*  balonX += veloX;
            balonY += veloY;
            veloRamdom = Math.floor(Math.random() * 10) + 1;

            // Colisión con paleta izquierda
            if (balonX <= paletaIzquierdaRect.right - rect.left &&
                balonY + balonHeight > paletaIzquierdaRect.top - rect.top &&
                balonY < paletaIzquierdaRect.bottom - rect.top) {
                balonX = paletaIzquierdaRect.right - rect.left;
                veloX = (Math.abs(veloX) + veloRamdom);
            }
            // Colisión con paleta derecha
            else if (balonX + balonWidth >= paletaDerechaRect.left - rect.left &&
                     balonY + balonHeight > paletaDerechaRect.top - rect.top &&
                     balonY < paletaDerechaRect.bottom - rect.top) {
                balonX = paletaDerechaRect.left - rect.left - balonWidth;
                veloX = -(Math.abs(veloX) + veloRamdom);
            }

            // Rebote en el límite superior
            if (balonY <= 0) {
                balonY = 0;
                veloY = (Math.abs(veloY) + veloRamdom);
            }
            // Rebote en el límite inferior
            else if (balonY >= rect.height - balonHeight - (bordeRect * 2)) {
                balonY = rect.height - balonHeight - (bordeRect * 2);
                veloY = -(Math.abs(veloY) + veloRamdom);
            }

            controlVelocidad(); // Controlar la velocidad de balon
           */ 


            centroBalonX - radioBalon < paletaIzquierdaX + paletaIzquierdaWidth &&
                        centroBalonY > paletaIzquierdaY &&
                        centroBalonY < paletaIzquierdaY + paletaIzquierdaHeight