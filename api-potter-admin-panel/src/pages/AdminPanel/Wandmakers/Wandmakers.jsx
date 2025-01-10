import { useEffect, useState } from "react";


import apiCalls from "../../../utils/apiCalls";

import ActionButton from "../../../components/ActionButton/ActionButton";
import Modal from "../../../components/Modal/Modal"; // Corrección en la importación de Modal
import Form from "../../../components/Form/Form";

const Wandmakers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWandmaker, setCurrentWandmaker] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const result = await apiCalls.fetchApiList("wandmaker");
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
      await apiCalls.fetchApiDelete("wandmaker", id);
      const updatedResult = await apiCalls.fetchApiList("wandmaker");
      setData(Array.isArray(updatedResult) ? updatedResult : []);
    } catch (error) {
      setError(error);
    }
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentWandmaker(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (wandmaker) => {
    setIsEditing(true);
    setCurrentWandmaker(wandmaker);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (FormData) => {
    try {
      if (isEditing) {
        await apiCalls.fetchApiUpdate(
          "wandmaker",
          currentWandmaker.wandmaker_id,
          FormData
        );
      } else {
        await apiCalls.fetchApiCreate("wandmaker", FormData);
      }
      const updatedResult = await apiCalls.fetchApiList("wandmaker");
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
      <section className="Wandmakers-container">
        <h1>Wandmakers</h1>
        <ActionButton text="Add" onClick={handleAddClick} />
        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <p>{isEditing ? "Edit Core" : "Create a new Core"}</p>
            <Form
              item={currentWandmaker || {}}
              onSubmit={handleFormSubmit}
              isEditing={isEditing}
              fields={[
                { name: "name", label: "Name", type: "text", required: true },
                {
                  name: "last_name",
                  label: "Last Name",
                  type: "text",
                  required: true,
                },
                {
                  name: "specialty",
                  label: "Specialty",
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
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <p>
                  <strong>Wandmaker ID: </strong> {item.wandmaker_id}
                </p>
                <p>
                  <strong>Name: </strong> {item.name}
                </p>
                {item.last_name && (
                  <p>
                    <strong>Last Name: </strong> {item.last_name}
                  </p>
                )}
                <p>
                  <strong>Specialty: </strong> {item.specialty}
                </p>
                <ActionButton
                  text="Edit"
                  onClick={() => handleEditClick(item)}
                />
                <ActionButton
                  text="Delete"
                  onClick={() => handleDelete(item.wandmaker_id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Wandmakers;
