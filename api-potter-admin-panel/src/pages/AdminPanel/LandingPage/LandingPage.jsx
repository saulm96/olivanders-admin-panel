import "./landingPage.css";
import IntroductionLP from "./Introduction/IntroductionLP";

import Wand3DModel from "../LandingPage/Wand3DModel/Wand3DModel";

const LandingPage = () => {
  return (
    <div className="lp-wrapper-content">
      <div className="lp-wrapper">
        <IntroductionLP />
      </div>
      <div className="lp-section-1">
        <div className="lp-section-1-difumination"></div>
        <div className="lp-section-1-content">
          <div className="lp-section-1-model-container">
            <Wand3DModel />
            <p className="lp-section-1-card-text">
              Explore the Poterverse's magical wands with this educational API,
              uncovering secrets of enchanted woods and wandmaking.
            </p>

            <p className="lp-section-1-card-text">
              Our API provides detailed and accurate information about the Harry
              Potter world, focusing on magical wands and their components.
              Discover a collection of wands with details like wood, core, and
              length, explore enchanted materials such as phoenix feathers and
              dragon heartstrings, and learn about master wandmakers like
              Ollivander.
            </p>
            <p className="lp-section-1-card-text">
              There is a real-time translation system so you can enjoy this
              magical experience in your preferred language. With support for
              multiple languages, our system not only translates terms but also
              preserves the accuracy of proper names and unique concepts from
              the magical world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
