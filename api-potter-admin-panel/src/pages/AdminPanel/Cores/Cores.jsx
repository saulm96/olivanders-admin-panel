import React, { useEffect, useState } from "react";
import apiCalls from "../../../utils/apiCalls.js";
import ActionButton from "../../../components/ActionButton/ActionButton";
import Modal from "../../../components/Modal/Modal";
import Form from "../../../components/Form/Form";

const Cores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCore, setCurrentCore] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const result = await apiCalls.fetchApiList("core");
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
      await apiCalls.fetchApiDelete("core", id);
      const updatedResult = await apiCalls.fetchApiList("core");
      setData(Array.isArray(updatedResult) ? updatedResult : []);
    } catch (error) {
      setError(error);
    }
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentCore(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (core) => {
    setIsEditing(true);
    setCurrentCore(core);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (isEditing) {
        await apiCalls.fetchApiUpdate("core", currentCore.core_id, formData);
      } else {
        await apiCalls.fetchApiCreate("core", formData);
      }
      const updatedResult = await apiCalls.fetchApiList("core");
      setData(Array.isArray(updatedResult) ? updatedResult : []);
    } catch {
      console.error(
        "Something went wrong while creating/updating the new core"
      );
    }
    setIsModalOpen(false);
  };

  const handleLanguageClick = async (languageId) => {
    try {
      await apiCalls.fetchApiUpdateUserLanguage({ language_id: languageId });
      await fetchData();
    } catch (error) {
      console.error("Error updating user language", error);
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
      <section className="Cores-container">
      <h1>Cores</h1>
      <ActionButton text="Add" onClick={handleAddClick} />
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <p>{isEditing ? "Edit Core" : "Create a new Core"}</p>
          <Form
            item={currentCore || {}}
            onSubmit={handleFormSubmit}
            isEditing={isEditing}
            fields={[
              { name: "name", label: "Name", type: "text", required: true },
              {
                name: "discover_date",
                label: "Discover Date:",
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
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <p>
              <strong>Core ID:</strong> {item.core_id}
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
            <ActionButton text="Edit" onClick={() => handleEditClick(item)} />
            <ActionButton
              text="Delete"
              onClick={() => handleDelete(item.core_id)}
            />
          </li>
        ))}
      </ul>
    </section>
    </div>
  );
};

export default Cores;
