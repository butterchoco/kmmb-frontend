import CloudVector from "../Vector/CloudVector";

const HeroHeader = ({ registerShow, setRegisterShow }) => {
  return (
    <div className="heroHeader">
      <CloudVector />
      <div className="heroHeader__textContainer">
        <h1 className="heroHeader__title">KMMB 2020</h1>
        <h4 className="heroHeader__tag">#BreakOurBoundaries!</h4>
        {registerShow ? (
          <div className="heroHeader__cto">
            <button className="primary" onClick={() => setRegisterShow(true)}>
              Daftar Sekarang
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HeroHeader;
