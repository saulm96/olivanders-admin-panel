import { useEffect, useState } from "react";

import apiCalls from "../../../utils/apiCalls";

import "./wands.css";

import ActionButton from "../../../components/ActionButton/ActionButton";
import Modal from "../../../components/Modal/Modal";
import Form from "../../../components/Form/Form";

const Wands = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWand, setCurrentWand] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const result = await apiCalls.fetchApiList("wand");
      setData(result);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const result = await apiCalls.fetchApiList("language");
        setLanguages(result);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
    fetchLanguages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiCalls.fetchApiDelete("wand", id);
      const updatedResult = await apiCalls.fetchApiList("wand");
      setData(Array.isArray(updatedResult) ? updatedResult : []);
    } catch (error) {
      setError(error);
    }
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentWand(null);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setCurrentWand(currentWand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (FormData) => {
    try {
      if (isEditing) {
        await apiCalls.fetchApiUpdate("wand", currentWand.wand_id, FormData);
      } else {
        await apiCalls.fetchApiCreate("wand", FormData);
      }
      const updateResult = await apiCalls.fetchApiList("wand");
      setData(Array.isArray(updateResult) ? updateResult : []);
    } catch (error) {
      setError(error);
    }
    setIsModalOpen(false);
  };

  const handleLanguageClick = async (languageId) => {
    setLoading(true);
    try {
      await apiCalls.fetchApiUpdateUserLanguage({ language_id: languageId });
      await fetchData();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <section className="available-languages-container">
        <div>
          {languages.map((language) => (
            <button
              key={language.language_id}
              onClick={() => handleLanguageClick(language.language_id)}
            >
              {language.name}
            </button>
          ))}
        </div>
      </section>
      <section className="wands-container">
        <h1>Wands</h1>
        <ActionButton text="Add" onClick={handleAddClick} />
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <h2 className="modal-title">
              {isEditing ? "Edit Wand" : "Create a new Wand"}
            </h2>
            <Form
              item={currentWand || {}}
              onSubmit={handleFormSubmit}
              isEditing={isEditing}
              fields={[
                {
                  name: "wandmaker.name",
                  label: "Wandmaker Name:",
                  type: "text",
                  required: true,
                },
                {
                  name: "wandmaker.last_name",
                  label: "Wandmaker Last Name:",
                  type: "text",
                  required: true,
                },
                {
                  name: "wood_name",
                  label: "Wood Type:",
                  type: "text",
                  required: true,
                },
                {
                  name: "core_name",
                  label: "Core Type:",
                  type: "text",
                  required: true,
                },
                {
                  name: "length",
                  label: "Length:",
                  type: "number",
                  required: true,
                },
                {
                  name: "flexibility",
                  label: "Flexibility:",
                  type: "text",
                  required: true,
                },
                {
                  name: "name",
                  label: "Wand Name:",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  label: "Description:",
                  type: "textfield",
                  required: true,
                },
              ]}
            />
          </Modal>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="wands-list">
            {data.map((item, index) => (
              <li key={index} className="wand-item">
                <div className="wand-item-content">
                  <p>
                    <strong>Wand ID: </strong> {item.wand_id}
                  </p>
                  <p>
                    <strong>Wand Name: </strong> {item.name}
                  </p>
                  <p>
                    <strong>Wood Type: </strong> {item.wood_name}
                  </p>
                  <p>
                    <strong>Core Type: </strong> {item.core_name}
                  </p>
                  <p>
                    <strong>Length: </strong> {item.length}
                  </p>
                  <p>
                    <strong>Flexibility: </strong> {item.flexibility}
                  </p>
                  <p>
                    <strong>Description: </strong> {item.description}
                  </p>
                  <p>
                    <strong>Wandmaker Name: </strong> {item["wandmaker.name"]}
                  </p>
                  <p>
                    <strong>Wandmaker Last Name: </strong>{" "}
                    {item["wandmaker.last_name"]}
                  </p>
                </div>
                <div className="action-buttons">
                  <ActionButton
                    text="Edit"
                    onClick={() => handleEditClick(item)}
                  />
                  <ActionButton
                    text="Delete"
                    onClick={() => handleDelete(item.wand_id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
export default Wands;
