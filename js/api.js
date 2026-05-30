const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_URL = 'https://api.themoviedb.org/3';
const LENGUAJE = 'es-ES';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/';

const MOCK_PELICULAS = [
    { id: 1, title: "Dune: Parte Dos", overview: "Paul Atreides se une a Chani y a los Fremen mientras emprende una guerra de venganza contra los conspiradores que destruyeron a su familia.", poster_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop", backdrop_path: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop", vote_average: 8.3 },
    { id: 2, title: "Godzilla x Kong", overview: "Una aventura cinematográfica completamente nueva, que enfrentará al todopoderoso Kong y al temible Godzilla contra una colosal amenaza desconocida.", poster_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop", backdrop_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop", vote_average: 7.2 },
    { id: 3, title: "Kung Fu Panda 4", overview: "Po se prepara para convertirse en el líder espiritual de su Valle de la Paz, pero también necesita a alguien que ocupe su lugar como Guerrero Dragón.", poster_path: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=500&auto=format&fit=crop", backdrop_path: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1200&auto=format&fit=crop", vote_average: 7.1 },
    { id: 4, title: "Civil War", overview: "En un futuro cercano, un equipo de periodistas viaja por los Estados Unidos durante una guerra civil que se intensifica rápidamente.", poster_path: "https://images.unsplash.com/photo-1574267432553-4b462808152a?q=80&w=500&auto=format&fit=crop", backdrop_path: "https://images.unsplash.com/photo-1535016120720-40c7467d5283?q=80&w=1200&auto=format&fit=crop", vote_average: 7.4 },
    { id: 5, title: "Planeta de los Simios", overview: "Años después del reinado de César, un joven simio emprende un viaje que lo llevará a cuestionar todo lo que le han enseñado sobre el pasado.", poster_path: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=500&auto=format&fit=crop", backdrop_path: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1200&auto=format&fit=crop", vote_average: 7.0 },
    { id: 6, title: "Deadpool & Wolverine", overview: "Un apático Wade Wilson se afana en la vida civil. Sus días como el mercenario moralmente flexible, Deadpool, han quedado atrás.", poster_path: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=500&auto=format&fit=crop", backdrop_path: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop", vote_average: 7.7 },
    { id: 7, title: "IntensaMente 2", overview: "Alegría, Tristeza, Furia, Temor y Desagrado no saben cómo sentirse cuando aparece Ansiedad.", poster_path: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=500&auto=format&fit=crop", backdrop_path: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=1200&auto=format&fit=crop", vote_average: 8.5 },
    { id: 8, title: "Furiosa", overview: "Al caer el mundo, la joven Furiosa es arrebatada del Lugar Verde de las Muchas Madres y cae en manos de una gran Horda de Motociclistas.", poster_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop", backdrop_path: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?q=80&w=1200&auto=format&fit=crop", vote_average: 7.8 }
];

const peliculasAPI = {
    obtenerRutaImagen: (ruta, tamano = 'w500') => {
        if (!ruta) return 'https://via.placeholder.com/500x750/1a1a1f/ffffff?text=CineMax';
        if (ruta.startsWith('http')) return ruta;
        return `${IMG_BASE_URL}${tamano}${ruta}`;
    },

    obtenerPopulares: async () => {
        if (!API_KEY) {
            return new Promise(resolve => setTimeout(() => resolve(MOCK_PELICULAS), 800));
        }
        try {
            const respuesta = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LENGUAJE}&page=1`);
            if (!respuesta.ok) throw new Error("Error en la petición a TMDB");
            const datos = await respuesta.json();
            return datos.results;
        } catch (error) {
            return MOCK_PELICULAS;
        }
    },

    obtenerMejorValoradas: async () => {
        if (!API_KEY) {
            return new Promise(resolve => setTimeout(() => resolve([...MOCK_PELICULAS].reverse()), 1000));
        }
        try {
            const respuesta = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${LENGUAJE}&page=1`);
            if (!respuesta.ok) throw new Error("Error en la petición a TMDB");
            const datos = await respuesta.json();
            return datos.results;
        } catch (error) {
            return [...MOCK_PELICULAS].reverse();
        }
    }
};

window.peliculasAPI = peliculasAPI;
