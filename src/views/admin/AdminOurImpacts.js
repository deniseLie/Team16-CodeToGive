import React, { useState, useEffect } from "react";

export default function AdminOurImpacts() {
  const [impacts, setImpacts] = useState([]);
  const [editingImpact, setEditingImpact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [impactData, setImpactData] = useState({
    id: null,
    title: "",
    description: "",
    value: "",
    icon: "",
    color: "bg-blue-400",
  });

  // Load impacts from localStorage on component mount
  useEffect(() => {
    console.log("Loading impacts from localStorage...");
    const savedImpacts = localStorage.getItem("projectReachImpacts");
    if (savedImpacts) {
      const parsedImpacts = JSON.parse(savedImpacts);
      console.log("Found saved impacts:", parsedImpacts);
      setImpacts(parsedImpacts);
    } else {
      console.log("No saved impacts found, initializing defaults...");
      const defaultImpacts = [
        {
          id: 1,
          title: "Children Supported",
          value: "2,500+",
          description:
            "Children have received educational support and resources through our programs.",
          icon: "fas fa-child",
          color: "bg-yellow-400",
        },
        {
          id: 2,
          title: "Education Provided",
          value: "500+",
          description: "Education provided to children in low-income families.",
          icon: "fas fa-book",
          color: "bg-green-400",
        },
        {
          id: 3,
          title: "Volunteers Engaged",
          value: "800+",
          description: "Community volunteers actively making a difference.",
          icon: "fas fa-hands-helping",
          color: "bg-blue-400",
        },
        {
          id: 4,
          title: "Campaigns Completed",
          value: "35",
          description: "Successful charity campaigns run since our founding.",
          icon: "fas fa-bullhorn",
          color: "bg-pink-400",
        },
      ];
      setImpacts(defaultImpacts);
      localStorage.setItem(
        "projectReachImpacts",
        JSON.stringify(defaultImpacts)
      );
    }
  }, []);

  // Save impacts to localStorage whenever impacts change
  const saveToLocalStorage = (newImpacts) => {
    console.log("Saving impacts to localStorage:", newImpacts);
    localStorage.setItem("projectReachImpacts", JSON.stringify(newImpacts));
    setImpacts(newImpacts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed - ${name}: ${value}`);
    setImpactData({
      ...impactData,
      [name]: value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault(); // Prevent any form submission
    console.log("Add button clicked - opening modal");
    setImpactData({
      id: null,
      title: "",
      description: "",
      value: "",
      icon: "",
      color: "bg-blue-400",
    });
    setEditingImpact(null);
    setIsModalOpen(true);
    console.log("Modal should now be open:", true);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const handleEdit = (impact, e) => {
    if (e) e.preventDefault(); // Prevent any form submission
    console.log("Edit button clicked for impact:", impact);
    setImpactData({ ...impact }); // Create a copy to avoid reference issues
    setEditingImpact(impact.id);
    setIsModalOpen(true);
    console.log("Modal should now be open for editing:", true);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Save button clicked with data:", impactData);

    // Validate required fields
    if (
      !impactData.title.trim() ||
      !impactData.value.trim() ||
      !impactData.description.trim() ||
      !impactData.icon.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    let newImpacts;
    if (editingImpact) {
      // Update existing impact
      console.log("Updating existing impact with ID:", editingImpact);
      newImpacts = impacts.map((impact) =>
        impact.id === editingImpact
          ? { ...impactData, id: editingImpact }
          : impact
      );
    } else {
      // Add new impact
      const newImpact = {
        ...impactData,
        id: Date.now(), // Simple ID generation
      };
      console.log("Adding new impact:", newImpact);
      newImpacts = [...impacts, newImpact];
    }

    saveToLocalStorage(newImpacts);
    handleModalClose();

    // Show success message
    const message = editingImpact
      ? "Impact updated successfully!"
      : "Impact added successfully!";
    alert(message);
    console.log(message);
  };

  const handleDelete = (id, e) => {
    if (e) e.preventDefault();
    console.log("Delete button clicked for ID:", id);
    if (window.confirm("Are you sure you want to delete this impact?")) {
      const newImpacts = impacts.filter((impact) => impact.id !== id);
      console.log("Deleting impact, new impacts:", newImpacts);
      saveToLocalStorage(newImpacts);
      alert("Impact deleted successfully!");
    }
  };

  const handleModalClose = () => {
    console.log("Modal closed");
    setIsModalOpen(false);
    setImpactData({
      id: null,
      title: "",
      description: "",
      value: "",
      icon: "",
      color: "bg-blue-400",
    });
    setEditingImpact(null);

    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  const colorOptions = [
    { value: "bg-yellow-400", label: "Yellow" },
    { value: "bg-green-400", label: "Green" },
    { value: "bg-blue-400", label: "Blue" },
    { value: "bg-pink-400", label: "Pink" },
    { value: "bg-purple-400", label: "Purple" },
    { value: "bg-red-400", label: "Red" },
    { value: "bg-orange-400", label: "Orange" },
    { value: "bg-indigo-400", label: "Indigo" },
  ];

  console.log(
    "Current state - modal open:",
    isModalOpen,
    "editing:",
    editingImpact
  );

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Manage Our Impacts Content ({impacts.length} impacts)
                  </h3>
                </div>
                <div className="relative w-auto px-4 flex-initial">
                  <button
                    onClick={handleAdd}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150"
                    type="button"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Add New Impact
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto px-4 py-4">
              {/* Impacts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {impacts.map((impact) => (
                  <div
                    key={impact.id}
                    className="bg-blueGray-50 rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-150"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-xl ${impact.color}`}
                      >
                        <i className={impact.icon}></i>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => handleEdit(impact, e)}
                          className="bg-lightBlue-500 text-white px-3 py-1 rounded text-xs hover:bg-lightBlue-600 transition-colors duration-150"
                          type="button"
                          title="Edit Impact"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={(e) => handleDelete(impact.id, e)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors duration-150"
                          type="button"
                          title="Delete Impact"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blueGray-700 mb-2">
                      {impact.value}
                    </div>
                    <div className="text-lg font-semibold text-blueGray-600 mb-2">
                      {impact.title}
                    </div>
                    <div className="text-sm text-blueGray-500">
                      {impact.description}
                    </div>
                  </div>
                ))}
              </div>

              {impacts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-blueGray-400 text-lg mb-4">
                    <i className="fas fa-heart text-4xl mb-4 block"></i>
                    <p>No impacts added yet</p>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="bg-emerald-500 text-white px-6 py-3 rounded font-bold shadow hover:shadow-lg transition-all duration-150"
                    type="button"
                  >
                    Add Your First Impact
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Impact - Fixed positioning and visibility */}
      {/* Modal for Add/Edit Impact - Fixed positioning and visibility */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm"
          style={{
            zIndex: 99999,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
          onClick={(e) => {
            // Close modal if clicking on backdrop
            if (e.target === e.currentTarget) {
              handleModalClose();
            }
          }}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white sticky top-0">
              <h3 className="text-xl font-bold text-gray-700">
                {editingImpact ? "Edit Impact" : "Add New Impact"}
              </h3>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-150 text-2xl"
                type="button"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={impactData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter impact title"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Value *
                </label>
                <input
                  type="text"
                  name="value"
                  value={impactData.value}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2,500+"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={impactData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter impact description"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Icon Class (FontAwesome) *
                </label>
                <input
                  type="text"
                  name="icon"
                  value={impactData.icon}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., fas fa-child"
                  required
                />
                <div className="mt-2 p-2 bg-gray-50 rounded flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Preview:</span>
                  {impactData.icon ? (
                    <i className={`${impactData.icon} text-lg`}></i>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      No icon selected
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Color
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() =>
                        setImpactData({ ...impactData, color: color.value })
                      }
                      className={`w-12 h-12 rounded-lg border-2 transition-all duration-150 ${
                        impactData.color === color.value
                          ? "border-gray-700 scale-110 shadow-lg"
                          : "border-gray-300 hover:border-gray-500"
                      } ${color.value}`}
                      title={color.label}
                    >
                      {impactData.color === color.value && (
                        <i className="fas fa-check text-white text-sm"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-white sticky bottom-0">
              <button
                onClick={handleModalClose}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-150"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-150"
                type="button"
              >
                <i className="fas fa-save mr-2"></i>
                {editingImpact ? "Update" : "Save"} Impact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
