const YoutubeEmbed = () => {
  return (
    <div className="youtubeEmbed">
      <div className="youtubeEmbed__container">
        <h2 className="youtubeEmbed__title">Trailer KMMB 2020</h2>
        <iframe
          className="youtubeEmbed__video"
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
