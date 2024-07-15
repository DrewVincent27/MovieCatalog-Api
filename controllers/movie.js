const Movie = require('../models/Movie');
const { updateOne } = require('../models/User');





module.exports.addMovie = (req, res) => { 

    const { title, director, year, description, genre } = req.body

    return Movie.findOne({ title: title }).then(sameMovieTitle => {
    
    if(sameMovieTitle) {
        return res.status(500).send({ error: 'The movie that you are trying to create already exists'})
    }
    
    let newMovie = new Movie({

        title,
        director,
        year,
        description,
        genre

        
    })

    return newMovie.save().then( movie => res.status(201).send(movie)).catch(saveErr =>{

        console.log('Error in saving movie: ', saveErr);
        res.status(500).send({ error: 'Error in save'})
    })

})
};

module.exports.deleteMovie = async (req, res) => {

    const {movieId} = req.params;

    try {

        const movie = await Movie.findByIdAndDelete(movieId);
        if(!movie) {
            return res.status(404).send({ message: 'Movie not found '});
        }

        return res.status(200).send({ message: 'Movie deleted successfully'});

    } catch (err) {
        return res.status(500).send({ error: 'Error deleting the movie', details: err.message });
    }

}

module.exports.updateMovie = async (req, res) => {

    const { title, director, year, description, genre } = req.body
    const {movieId} = req.params

    try {
    const movie = await Movie.findById( movieId );
    if(!movie) {
        return res.status(404).send({ message: 'Movie not found '});
    }

    movie.title = title;
    movie.director = director;
    movie.year = year;
    movie.description = description;
    movie.genre = genre;

    const updatedMovie = await movie.save();
    return res.status(200).send({
        message: 'Movie updated successfully',
        updatedMovie
    })

}catch (err) {
    return res.status(500).send({ error: 'Error updating the movie', details: err.message });
}


};


module.exports.addComment = async (req, res) => {

    const {comment} = req.body;
    const {movieId} = req.params;
    // console.log(userId);
    try {

        const foundMovie =  await Movie.findById(movieId);
        if(!foundMovie) {
            return res.status(404).send({ message: 'Movie not found '});
        }

        foundMovie.comments.push({
            userId: req.user.id,
            comment: comment
        })

        const updateMovie = await foundMovie.save();

        return res.status(200).send({
            message: "comment added successfully",
            updateMovie
        })





    } catch (err) {
    return res.status(500).send({ error: 'Error updating the movie', details: err.message });
}

};

module.exports.getComments = async (req, res) => {

    const {movieId} = req.params;
    try {

        const movie = await Movie.findById(movieId);
        if(!movie) {
            return res.status(404).send({ message: 'Movie not found '});
        }

        const comments = movie.comments

        console.log(comments);
        return res.status(200).send({
            comments
        })

    } catch (err) {
    return res.status(500).send({ error: 'Error updating the movie', details: err.message });
}

};

module.exports.getMovie = async (req, res) => {

    const {movieId} = req.params;
    try{

        const movie = await Movie.findById(movieId);
        if(!movie) {
            return res.status(404).send({ message: 'Movie not found '});
        }

        return res.status(200).send(
            movie
        )



    }catch (err) {
    return res.status(500).send({ error: 'Error getting the movie', details: err.message });
    }

};

module.exports.getMovies = async (req, res) => {

    try {

        const movies = await Movie.find();
        if(!movies) {
            return res.status(404).send({ message: 'Movie not found '});
        }
        return res.status(200).send({
            movies
        })
    }catch (err) {
    return res.status(500).send({ error: 'Error getting the movie', details: err.message });
    }
}


