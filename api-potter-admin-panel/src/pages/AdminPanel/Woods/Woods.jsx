import React, { useEffect, useState } from "react";

import apiCalls from "../../../utils/apiCalls.js";

import ActionButton from "../../../components/ActionButton/ActionButton.jsx";
import Modal from "../../../components/Modal/Modal";
import Form from "../../../components/Form/Form";

const Woods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWood, setCurrentWood] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const result = await apiCalls.fetchApiList("wood");
      setData(result);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const result = await apiCalls.fetchApiList("language");
        setLanguages(result);
      } catch (error) {
        console.error("Error fetching languages", error);
      }
    };

    fetchData();
    fetchLanguages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apiCalls.fetchApiDelete("wood", id);
      const updatedResult = await apiCalls.fetchApiList("wood");
      setData(Array.isArray(updatedResult) ? updatedResult : []);
    } catch (error) {
      setError(error);
    }
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentWood(null);
    setIsModalOpen(true);
  };
  const handleEditClick = (wood) => {
    setIsEditing(true);
    setCurrentWood(wood);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (FormData) => {
    try {
      if (isEditing) {
        await apiCalls.fetchApiUpdate("wood", currentWood.wood_id, FormData);
      } else {
        await apiCalls.fetchApiCreate("wood", FormData);
      }
      const updatedResult = await apiCalls.fetchApiList("wood");
      setData(Array.isArray(updatedResult) ? updatedResult : []);
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
        <h2>Available Languages</h2>
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
      <section className="woods-container">
        <h1>Woods</h1>
        <ActionButton text="Add" onClick={handleAddClick} />
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <p>{isEditing ? "Edit Wood" : "Create a new Wood"}</p>
            <Form
              item={currentWood || {}}
              onSubmit={handleFormSubmit}
              isEditing={isEditing}
              fields={[
                { name: "name", label: "Name", type: "text", required: true },
                {
                  name: "discover_date",
                  label: "Discover Date",
                  type: "text",
                  required: true,
                },
                {
                  name: "description",
                  label: "Description",
                  type: "text",
                  required: true,
                },
              ]}
            />
          </Modal>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <p>
                  <strong>Wood ID:</strong> {item.wood_id}
                </p>
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Discover Date:</strong> {item.discover_date}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <ActionButton
                  text="Edit"
                  onClick={() => handleEditClick(item)}
                />
                <ActionButton
                  text="Delete"
                  onClick={() => handleDelete(item.wood_id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Woods;
