import "./landingPage.css";
import IntroductionLP from "./Introduction/IntroductionLP";

import TestImg from "../../../assets/olivanders-test-img.jpg";

const LandingPage = () => {
  return (
    <div className="lp-wrapper-content">
    <div className="lp-wrapper">
     <IntroductionLP />
    </div>
     <div className="lp-section-1">
        <div className="lp-section-1-difumination">
        </div>
        <div className="lp-section-1-content">
        <img src={TestImg} className="test-img"/>
        </div>
     </div>
    </div>
  );
};

export default LandingPage;
