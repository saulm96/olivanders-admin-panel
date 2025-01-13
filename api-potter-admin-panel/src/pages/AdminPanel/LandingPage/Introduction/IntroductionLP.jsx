import loginBg2 from "../../../../assets/dementhor-2.png";
import loginBg3 from "../../../../assets/dementhor-1.png";

import ScrollLogo from "../../../../components/ScrollLogo/ScrollLogo";

import "./introductionLP.css";

const IntroductionLP = () => {
  return (
    <>
      <div className="lp-header">
        <div className="lp-logo-holder"></div>

        <div className="lp-logo-holder-bg1"></div>

        <div className="lp-logo-holder-bg2">
          <img src={loginBg2} alt="dementhor" />
        </div>

        <div className="lp-logo-holder-bg3">
          <div className="lp-header-title-holder">
            <h1 className="lp-header-title">Olivanders</h1>
            <p className="lp-header-subtitle">
              Your magical API apprenticeship awaits
            </p>
          </div>
        </div>

        <div className="lp-logo-holder-bg4">
          <img src={loginBg3} alt="dementhor" />
        </div>
      </div>

      <div className="lp-introduction-holder">
        <div className="lp-introduction-1">
          <p className="lp-introduction-text-1">
            "Discover the magic of coding with our Harry Potter-inspired Wand
            API! Perfect for learning how to cast your first spell with APIs."
          </p>
        </div>
      </div>
      <div className="lp-introduction-2">
        <p className="lp-introduction-text-2">Scroll</p>
        <ScrollLogo />
        <p className="lp-introduction-text-3">for more</p>
      </div>
    </>
  );
};

export default IntroductionLP;