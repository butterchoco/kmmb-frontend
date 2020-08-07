import CloudVector from "../Vector/CloudVector";
import Link from "next/link";

const HeroHeader = () => {
  return (
    <div className="heroHeader">
      <CloudVector />
      <div className="heroHeader__textContainer">
        <h1 className="heroHeader__title">KMMB 2020</h1>
        <h4 className="heroHeader__tag">#BreakOurBoundaries!</h4>
        <div className="heroHeader__cto">
          <Link href="/auth/register" replace><button className="primary">Daftar Sekarang</button></Link>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
