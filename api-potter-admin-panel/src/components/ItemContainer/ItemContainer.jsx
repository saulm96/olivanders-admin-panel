import { useNavigate } from "react-router-dom";
import "./itemContainer.css";

const ItemContainer = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="item-container" onClick={() => navigate(`${title.toLowerCase()}`)}>
      <h2 className="item-container-title">{title}</h2>
    </div>
  );
};

export default ItemContainer;