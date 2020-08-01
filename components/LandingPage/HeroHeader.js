const HeroHeader = () => {
  return (
    <div className="heroHeader">
      <div className="heroHeader__textContainer">
        <h1 className="heroHeader__title">KMMB 2020</h1>
        <p className="heroHeader__tag">#BreakOurBoundaries!</p>
        <div className="heroHeader__cto">
          <button className="primary">Daftar Sekarang</button>
          <button className="secondary">Download booklet</button>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
