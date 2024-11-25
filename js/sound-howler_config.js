import { Howl, Howler } from 'howler';


class AudioManager {
    constructor() {
      // Cargar todos los sonidos
      this.sounds = {
        backgroundMusic: new Howl({
          src: ['path/to/background_music.mp3'], // Ruta relativa en el backend
          loop: true, // La música se repite
          volume: 0.5
        }),
        bounceSound: new Howl({
          src: ['path/to/bounce_sound.mp3'],
          volume: 1.0
        })
      };
  
      // Inicializar el estado de la música
      this.isBackgroundPlaying = false;
    }
  
    // Método para reproducir la música de fondo
    playBackgroundMusic() {
      if (!this.isBackgroundPlaying) {
        this.sounds.backgroundMusic.play();
        this.isBackgroundPlaying = true;
      }
    }
  
    // Método para detener la música de fondo
    stopBackgroundMusic() {
      if (this.isBackgroundPlaying) {
        this.sounds.backgroundMusic.stop();
        this.isBackgroundPlaying = false;
      }
    }
  
    // Método para reproducir un efecto de sonido, como el rebote
    playBounceSound() {
      this.sounds.bounceSound.play();
    }
  
    // Método para ajustar el volumen general
    setVolume(volumeLevel) {
      Howler.volume(volumeLevel); // Controla el volumen global de todos los sonidos
    }
  }
  
  export default new AudioManager();