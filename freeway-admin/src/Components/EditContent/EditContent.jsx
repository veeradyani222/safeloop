import React, { useState, useEffect } from 'react';
import './EditContent.css';

const EditContent = () => {
  const [contentList, setContentList] = useState([]);
  const [editContent, setEditContent] = useState({});

  useEffect(() => {
    // Fetch content when the component mounts
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:4000/allContent');
        const data = await response.json();
        setContentList(data);
        // Initialize editContent with the fetched data
        const initialEditContent = data.reduce((acc, content) => {
          acc[content._id] = content;
          return acc;
        }, {});
        setEditContent(initialEditContent);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  // Handle changes to editable fields
  const handleChange = (id, field, value) => {
    setEditContent({
      ...editContent,
      [id]: {
        ...editContent[id],
        [field]: value
      }
    });
  };

  // Handle update submission
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/updateContent/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editContent[id]),
      });

      const result = await response.json();

      if (result.success) {
        alert('Content updated successfully!');
      } else {
        alert('Failed to update content');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating content.');
    }
  };

  return (
    <div className="edit-content-container">
      <h1>Edit Content</h1>
      {contentList.length > 0 ? (
        contentList.map((content) => (
          <div key={content._id} className="content-item">
            <h2>{content.title}</h2>
            <div className="content-fields">
              {/* Display editable fields for each content */}
              {Object.keys(content).map((key) => {
                if (key !== '_id' && key !== 'title') { // Exclude non-editable fields like _id
                  return (
                    <div key={key} className="field-group">
                      <label>{key}</label>
                      <input
                        type="text"
                        value={editContent[content._id][key] || ''}
                        onChange={(e) => handleChange(content._id, key, e.target.value)}
                      />
                    </div>
                  );
                }
                return null;
              })}
              <button onClick={() => handleUpdate(content._id)}>Update</button>
            </div>
          </div>
        ))
      ) : (
        <p>No content available.</p>
      )}
    </div>
  );
};

export default EditContent;

