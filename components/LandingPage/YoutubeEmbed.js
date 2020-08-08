const YoutubeEmbed = () => {
  return (
    <div className="youtubeEmbed">
      <div className="youtubeEmbed__container">
        <h2 className="youtubeEmbed__title">Trailer KMMB 2020</h2>
        <iframe
          className="youtubeEmbed__video"
          src="https://www.youtube.com/embed/Mxyj8oX6q20"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default YoutubeEmbed;
