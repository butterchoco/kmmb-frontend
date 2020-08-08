import CloudVector from "../Vector/CloudVector";
import { Link } from "@material-ui/core";

const HeroHeader = (props) => {
  return (
    <div className="heroHeader">
      <CloudVector />
      <div className="heroHeader__image">
        <img src="/images/logo_KMMB.png"/>
      </div>
      <div className="heroHeader__textContainer">
        <div className="heroHeader__cto">
          {props.user.uid == undefined ? (
            <button
              className="primary"
              onClick={() => props.setRegisterShow(true)}
            >
              Daftar Sekarang
            </button>
          ) : null}
          <Link href="http://bit.ly/BookletKMMB2020" style={{margin: "0 10px"}}>
            <button className="secondary">Lihat Booklet</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
