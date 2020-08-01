const YoutubeEmbed = () => {
  return (
    <div className="hero">
      <div className="hero__textContainer--center">
        <h2 className="hero__title">Trailer KMMB 2020</h2>
        <iframe
          className="hero__description youtubeEmbed"
          src="https://www.youtube.com/embed/5MCNAtp4SxI"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeEmbed;
