import CloudVector from "../Vector/CloudVector";
import Link from "next/link";

const HeroHeader = ({ setRegisterShow }) => {
  return (
    <div className="heroHeader">
      <CloudVector />
      <div className="heroHeader__textContainer">
        <h1 className="heroHeader__title">KMMB 2020</h1>
        <h4 className="heroHeader__tag">#BreakOurBoundaries!</h4>
        <div className="heroHeader__cto">
          <button className="primary" onClick={() => setRegisterShow(true)}>Daftar Sekarang</button>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
