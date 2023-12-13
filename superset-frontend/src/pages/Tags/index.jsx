import React, { useState, useEffect } from 'react';
import shortid from 'shortid';

function GreyBackgroundPage() {
  const [showCreateCategoryPopup, setShowCreateCategoryPopup] = useState(false);
  const [showDashboardSelectionPopup, setShowDashboardSelectionPopup] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [dashboards, setDashboards] = useState([]);
  const [selectedDashboards, setSelectedDashboards] = useState([]);

  const [showDeleteCategoryPopup, setShowDeleteCategoryPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dashboardCategoryAssociations, setDashboardCategoryAssociations] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]); // Track available categories

  const [categoryCreatedMessage, setCategoryCreatedMessage] = useState('');
  const [dashboardRemovedMessage, setDashboardRemovedMessage] = useState('');

  useEffect(() => {
    fetch('/api/v1/dashboard/')
      .then(response => response.json())
      .then(data => setDashboards(data.result))
      .catch(error => console.error('Error fetching dashboards:', error));

    const fetchExistingAssociations = () => {
      const cid = shortid.generate();
      const postPayload = {
        client_id: cid,
        database_id: 1,
        json: true,
        runAsync: false,
        schema: "softroniclabs_db",
        sql: `SELECT * FROM folder_bin;`,
        sql_editor_id: "1",
        tab: "Folder_bin",
        tmp_table_name: "",
        select_as_cta: false,
        ctas_method: "TABLE",
        queryLimit: 1000,
        expand_data: true
      };
  
      fetch('/api/v1/sqllab/execute/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postPayload)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response from API:', data);
  
        if (data && Array.isArray(data.data)) {
          setDashboardCategoryAssociations(data.data);
          const categories = [...new Set(data.data.map(assoc => assoc.category_name))];
          setAvailableCategories(categories);
        } else {
          console.error('Expected an array for dashboardCategoryAssociations, received:', data);
        }
      })
      .catch(error => console.error('Error fetching data when dropdown menu clicked:', error));
    };
  
    fetchExistingAssociations();
  }, []);

  const showCategoryCreatedMessage = (categoryName) => {
    setCategoryCreatedMessage(`Category "${categoryName}" has been created.`);
  };

  const hideCategoryCreatedMessage = () => {
    setCategoryCreatedMessage('');
  };

  const showDashboardRemovedMessage = (dashboardName, categoryName) => {
    setDashboardRemovedMessage(`Dashboard "${dashboardName}" removed from category "${categoryName}".`);
  };

  const hideDashboardRemovedMessage = () => {
    setDashboardRemovedMessage('');
  };

  const handleCreateCategory = () => {
    setShowCreateCategoryPopup(true);
  };

  const handleCategorySubmit = () => {
    setShowCreateCategoryPopup(false);
    setShowDashboardSelectionPopup(true);
    showCategoryCreatedMessage(categoryName);

    setTimeout(() => {
      hideCategoryCreatedMessage();
    }, 3000); // 3 seconds
  };

  const handleDashboardSelectionSubmit = () => {
    setShowDashboardSelectionPopup(false);
    selectedDashboards.forEach(dashboard => {
      const cid = shortid.generate();
      const postPayload = {
        client_id: cid,
        database_id: 1,
        json: true,
        runAsync: false,
        schema: "softroniclabs_db",
        sql: `INSERT INTO folder_bin (id, dashboard_name, category_name) VALUES ('${dashboard.id}', '${dashboard.dashboard_title}', '${categoryName}');
              SELECT * FROM folder_bin;`,
        sql_editor_id: "1",
        tab: "Folder_bin",
        tmp_table_name: "",
        select_as_cta: false,
        ctas_method: "TABLE",
        queryLimit: 1000,
        expand_data: true
      };

      fetch('/api/v1/sqllab/execute/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postPayload)
      })
      .then(response => response.json())
      .then(updatedResponse => {
        console.log('Category created successfully:', updatedResponse);
        setDashboardCategoryAssociations(updatedResponse.data); // Update the dashboard-category associations
        
        setAvailableCategories(prevCategories => [...prevCategories, categoryName]);
      })
      .catch(error => {
        console.error('Error creating category:', error);
      });
    });
    setCategoryName('');
    setSelectedDashboards([]);
  };

  const handleCheckboxChange = (dashboard) => {
    setSelectedDashboards(prev => {
      if (prev.find(d => d.id === dashboard.id)) {
        return prev.filter(d => d.id !== dashboard.id);
      }
        return [...prev, dashboard];
    });
  };

  const handleDeleteCategory = () => {
    setShowDeleteCategoryPopup(true);
  };

  const handleDeleteCategorySubmit = () => {
    const dashboardsToRemove = dashboardCategoryAssociations
      .filter(assoc => assoc.category_name === selectedCategory && assoc.isChecked);
    setTimeout(() => {
      window.location.reload();
    }, 2500);

    dashboardsToRemove.forEach(association => {
      const deletePayload = {
        client_id: shortid.generate(),
        database_id: 1,
        json: true,
        runAsync: false,
        schema: "softroniclabs_db",
        sql: `DELETE FROM folder_bin WHERE id = '${association.id}' AND category_name = '${selectedCategory}';`,
        sql_editor_id: "1",
        tab: "Folder_bin",
        tmp_table_name: "",
        select_as_cta: false,
        ctas_method: "TABLE",
        queryLimit: 1000,
        expand_data: true
      };

      fetch('/api/v1/sqllab/execute/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deletePayload)
      })
      .then(response => response.json())
      .then(data => {
        console.log(`Dashboard ${association.dashboard_name} removed from category:`, data);
        showDashboardRemovedMessage(association.dashboard_name, selectedCategory);

        setTimeout(() => {
          hideDashboardRemovedMessage();
        }, 3000); // 3 seconds
      })
      .catch(error => console.error('Error deleting dashboard from category:', error));
    });

    setDashboardCategoryAssociations(prev => prev.filter(assoc => !dashboardsToRemove.includes(assoc)));

    setAvailableCategories(prevCategories => prevCategories.filter(category => category !== selectedCategory));

    setShowDeleteCategoryPopup(false);
  };

  const handleAssociationCheckboxChange = (associationId) => {
    setDashboardCategoryAssociations(prev => prev.map(assoc => assoc.id === associationId ? { ...assoc, isChecked: !assoc.isChecked } : assoc));
  };

  return (
    <div>
      <button
        type="button"
        style={{
          backgroundColor: '#007bff',
          color: '#ffffff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px',
        }}
        onClick={handleCreateCategory}
      >
        Create Category
      </button>
      <button
        type="button"
        style={{
          backgroundColor: '#dc3545',
          color: '#ffffff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleDeleteCategory}
      >
        Delete Category
      </button>

      {showCreateCategoryPopup && (
        <div>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{
              padding: '5px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            type="button"
            onClick={() => setShowCreateCategoryPopup(false)}
            style={{ marginRight: '10px' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCategorySubmit}
            style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            OK
          </button>
        </div>
      )}

      {showDashboardSelectionPopup && (
        <div>
          {dashboards.map((dashboard) => (
            <div key={dashboard.id} style={{ margin: '10px 0' }}>
              <input
                type="checkbox"
                checked={selectedDashboards.find((d) => d.id === dashboard.id)}
                onChange={() => handleCheckboxChange(dashboard)}
                style={{ marginRight: '5px' }}
              />
              <span>{dashboard.dashboard_title}</span>
            </div>
          ))}
          <button
            type="button"
            onClick={handleDashboardSelectionSubmit}
            style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Create
          </button>
        </div>
      )}

      {showDeleteCategoryPopup && (
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '5px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            {availableCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {dashboardCategoryAssociations
            .filter((assoc) => assoc.category_name === selectedCategory)
            .map((association) => (
              <div key={association.id} style={{ margin: '10px 0' }}>
                <input
                  type="checkbox"
                  checked={association.isChecked || false}
                  onChange={() => handleAssociationCheckboxChange(association.id)}
                  style={{ marginRight: '5px' }}
                />
                <span>{association.dashboard_name}</span>
              </div>
            ))}
          <button
            type="button"
            onClick={handleDeleteCategorySubmit}
            style={{
              backgroundColor: '#dc3545',
              color: '#ffffff',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Done
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteCategoryPopup(false)}
            style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {categoryCreatedMessage && (
        <div className="notification" style={{ color: 'green', margin: '10px 0' }}>
          {categoryCreatedMessage}
        </div>
      )}

      {dashboardRemovedMessage && (
        <div className="notification" style={{ color: 'red', margin: '10px 0' }}>
          {dashboardRemovedMessage}
        </div>
      )}
    </div>
  );
}

export default GreyBackgroundPage;
