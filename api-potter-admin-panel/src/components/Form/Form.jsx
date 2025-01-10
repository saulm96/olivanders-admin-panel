import React, { useState, useEffect } from "react";
import "./Form.css";

const Form = ({ item, onSubmit, isEditing, fields }) => {
  const [formData, setFormData] = useState(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
<form onSubmit={handleSubmit} className="generic-form">
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label>{field.label}</label>
          {field.name === "description" || field.name === "specialty" ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className={`${field.type}-input`}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className={`${field.type}-input`}
            />
          )}
        </div>
      ))}
      <button type="submit">{isEditing ? "Update" : "Create"}</button>
    </form>
  );
};

export default Form;
