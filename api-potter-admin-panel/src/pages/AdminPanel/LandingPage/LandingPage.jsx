import ItemContainer from "../../../components/ItemContainer/ItemContainer";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-content">
      <h1 className="landing-page-title">Olivanders admin panel</h1>
      <section className="redirection-container">
        <ItemContainer title="Cores" />
        <ItemContainer title="Woods" />
        <ItemContainer title="Wands" />
        <ItemContainer title="Languages" />
      </section>
    </div>
  );
};

export default LandingPage;
