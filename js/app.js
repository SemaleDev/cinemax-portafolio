document.addEventListener('DOMContentLoaded', () => {
    const heroFondo = document.getElementById('hero-fondo');
    const heroTitulo = document.getElementById('hero-titulo');
    const heroDescripcion = document.getElementById('hero-descripcion');
    
    const carruselPopulares = document.getElementById('carrusel-populares');
    const cuadriculaValoradas = document.getElementById('cuadricula-valoradas');
    
    const btnPrev = document.getElementById('btn-prev-populares');
    const btnNext = document.getElementById('btn-next-populares');
    
    const encabezado = document.querySelector('.encabezado');

    async function inicializarApp() {
        renderizarEsqueletos(carruselPopulares, 5);
        renderizarEsqueletos(cuadriculaValoradas, 8);

        try {
            const [populares, valoradas] = await Promise.all([
                window.peliculasAPI.obtenerPopulares(),
                window.peliculasAPI.obtenerMejorValoradas()
            ]);
            
            if (populares.length > 0) {
                renderizarHero(populares[0]);
                renderizarCarrusel(populares);
            }
            
            if (valoradas.length > 0) {
                renderizarCuadricula(valoradas);
            }
        } catch (error) {
            heroTitulo.textContent = "Error al cargar";
            heroDescripcion.textContent = "Lo sentimos, hubo un problema al cargar el contenido.";
        }
    }

    function renderizarHero(pelicula) {
        const rutaFondo = window.peliculasAPI.obtenerRutaImagen(pelicula.backdrop_path, 'original');
        
        const imagenTemporal = new Image();
        imagenTemporal.src = rutaFondo;
        imagenTemporal.onload = () => {
            heroFondo.style.backgroundImage = `url('${rutaFondo}')`;
        };

        heroTitulo.textContent = pelicula.title;
        heroDescripcion.textContent = pelicula.overview || "Una increíble película que no te puedes perder.";
    }

    function crearTarjeta(pelicula) {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta');
        
        const posterUrl = window.peliculasAPI.obtenerRutaImagen(pelicula.poster_path, 'w500');
        
        tarjeta.innerHTML = `
            <img src="${posterUrl}" alt="Póster de ${pelicula.title}" class="tarjeta__imagen" loading="lazy">
            <div class="tarjeta__info">
                <h3 class="tarjeta__titulo">${pelicula.title}</h3>
                <div class="tarjeta__metadatos">
                    <span class="tarjeta__calificacion">
                        <i class="fa-solid fa-star"></i> ${pelicula.vote_average.toFixed(1)}
                    </span>
                </div>
            </div>
        `;
        
        tarjeta.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            renderizarHero(pelicula);
        });

        return tarjeta;
    }

    function renderizarCarrusel(peliculas) {
        carruselPopulares.innerHTML = '';
        peliculas.slice(1).forEach(pelicula => {
            carruselPopulares.appendChild(crearTarjeta(pelicula));
        });
    }

    function renderizarCuadricula(peliculas) {
        cuadriculaValoradas.innerHTML = '';
        peliculas.slice(0, 8).forEach(pelicula => {
            cuadriculaValoradas.appendChild(crearTarjeta(pelicula));
        });
    }

    function renderizarEsqueletos(contenedor, cantidad) {
        contenedor.innerHTML = '';
        for (let i = 0; i < cantidad; i++) {
            const esqueleto = document.createElement('div');
            esqueleto.classList.add('tarjeta', 'esqueleto');
            esqueleto.innerHTML = '<div class="tarjeta__imagen"></div>';
            contenedor.appendChild(esqueleto);
        }
    }

    btnNext.addEventListener('click', () => {
        carruselPopulares.scrollBy({ left: 300, behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
        carruselPopulares.scrollBy({ left: -300, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            encabezado.classList.add('encabezado--scrolled');
        } else {
            encabezado.classList.remove('encabezado--scrolled');
        }
    });

    inicializarApp();
});
