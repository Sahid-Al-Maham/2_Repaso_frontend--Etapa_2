                    /* ---------- REBOTE LIMITES PALETA IZQUIERDA ---------- */
                    // Vértice SUPERIOR DERECHO de la paleta izquierda
                    if (bordes.vertSupDerPi) {
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            // veloX = veloX * -1; // Prioriza el rebote horizontal
                            // Rebote en línea recta hacia el borde izquierdo de cuadroJuego
                            veloX = -Math.abs(veloX * 2);   // Doble de la velocidad en dirección opuesta
                            //veloY = 0;                      // Rebote en línea recta horizontal
                        } else {
                            //veloX = 0;
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth + 2; // Posición ajustada para el rebote  
                        balonY = paletaIzquierdaY - balonHeight - 2;  
                        balon.style.backgroundColor = 'red'; // Cambia el color del balón                              
                    }
                    // Vértice INFERIOR DERECHO de la paleta izquierda
                    if (bordes.vertInfDerPi) { 
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            // veloX = veloX * -1; // Prioriza el rebote horizontal
                            // Rebote en línea recta hacia el borde izquierdo de cuadroJuego
                            veloX = -Math.abs(veloX * 2);   // Doble de la velocidad en dirección opuesta
                            //veloY = 0;                      // Rebote en línea recta horizontal
                        } else {
                            //veloX = 0;
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth;   // Posición ajustada para el rebote 
                        balon.style.backgroundColor = 'green'; // Cambia el color del balón                     
                    }
                    // LADO DERECHO de la paleta izquierda (eje X)
                    if (bordes.ladoDerPi) {
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth + 2;  
                        veloX = -veloX;  
                        balon.style.backgroundColor = `rgb(${109 * Math.floor(Math.random() * 256)}, ${65 * Math.floor(Math.random() * 256)}, ${200 * Math.floor(Math.random() * 256)})`; // Cambia el color del balón   
                    }
                    // LADO SUPERIOR de la paleta izquierda (eje Y)
                    if (bordes.ladoSupPi) { 
                        balonY = paletaIzquierdaY - balonHeight - 1; 
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
                            veloX = Math.abs(veloX * 2);            // Doble de la velocidad en dirección opuesta
                            //veloY = 0;                              // Rebote en línea recta horizontal
                        } else {
                            //veloX = 0; 
                            veloY = (veloY + veloRamdom) * -1; // Prioriza el rebote vertical
                        }
                        balonX = paletaDerechaX - balonWidth;   // Posición ajustada para el rebote  
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
                        balonX = paletaDerechaX - balonWidth;   // Posición ajustada para el rebote   
                        balon.style.backgroundColor = 'blue'; // Cambia el color del balón                       
                    }
                    // LADO IZQUIERDO de la paleta (eje X)
                    if (bordes.ladoDerPi) { 
                        if (Math.abs(veloX) > Math.abs(veloY)) {
                            veloX = (veloX * veloRamdom) * -1;
                        } else {
                            veloY = 0; // Prioriza el rebote vertical 
                        }  
                        balonX = paletaIzquierdaX + paletaIzquierdaWidth + 2;
                        balon.style.backgroundColor = 'lightgreen'; // Cambia el color del balón  
                    }
                    if (bordes.ladoIzqPd) {
                        balonX = paletaDerechaX - balonWidth - 1;
                        veloX = -veloX;                             
                    }
                    // LADO SUPERIOR de la paleta (eje Y)
                    if (bordes.ladoSupPd) {
                        balonY = paletaDerechaY - balonHeight - 1;
                        veloY = -veloY;                             
                    }
                    // LADO INFERIOR de la paleta (eje Y)
                    if (bordes.ladoInfPd) {                             // Confirma que el balón esté dentro del ancho de la paleta
                        balonY = paletaDerechaY + paletaDerechaHeight + 1;
                        veloY = -veloY;                    
                    }

                    controlVelocidad(); // Controlar la velocidad de balon 
                }