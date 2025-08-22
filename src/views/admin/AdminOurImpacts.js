import React, { useState } from "react";

export default function AdminOurImpacts() {
  const [images, setImages] = useState([]);
  const [impactData, setImpactData] = useState({
    title: "",
    description: "",
    value: "",
    icon: ""
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const handleInputChange = (e) => {
    setImpactData({
      ...impactData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving impact data:", impactData);
    console.log("Images:", images);
    alert("Impact data saved successfully!");
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Manage Our Impacts Content
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto px-4 py-4">
              {/* Impact Data Form */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Impact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={impactData.title}
                      onChange={handleInputChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter impact title"
                    />
                  </div>
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Value
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={impactData.value}
                      onChange={handleInputChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="e.g., 2,500+"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={impactData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter impact description"
                    />
                  </div>
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Icon Class (FontAwesome)
                    </label>
                    <input
                      type="text"
                      name="icon"
                      value={impactData.icon}
                      onChange={handleInputChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="e.g., fas fa-child"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Upload Images</h4>
                <div className="border-2 border-dashed border-blueGray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer bg-lightBlue-500 text-white px-4 py-2 rounded hover:bg-lightBlue-600 transition-colors"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload Images
                  </label>
                  <p className="text-blueGray-500 mt-2">
                    Drag and drop images here or click to browse
                  </p>
                </div>
              </div>

              {/* Display Uploaded Images */}
              {images.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4">Uploaded Images</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-lg shadow"
                        />
                        <button
                          onClick={() => removeImage(image.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                        <p className="text-xs text-blueGray-600 mt-1 truncate">
                          {image.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                >
                  <i className="fas fa-save mr-2"></i>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}