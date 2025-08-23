import React, { useState } from "react";

export default function AdminAboutUs() {
  const [aboutContent, setAboutContent] = useState({
    title: "",
    mission: "",
    vision: "",
    description: ""
  });
  const [heroImage, setHeroImage] = useState(null);
  const [teamImages, setTeamImages] = useState([]);

  const handleContentChange = (e) => {
    setAboutContent({
      ...aboutContent,
      [e.target.name]: e.target.value
    });
  };

  const handleHeroImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setHeroImage({
        file: file,
        url: URL.createObjectURL(file),
        name: file.name
      });
    }
  };

  const handleTeamImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setTeamImages([...teamImages, ...newImages]);
  };

  const removeTeamImage = (id) => {
    setTeamImages(teamImages.filter(img => img.id !== id));
  };

  const handleSave = () => {
    console.log("Saving about content:", aboutContent);
    console.log("Hero image:", heroImage);
    console.log("Team images:", teamImages);
    alert("About Us content saved successfully!");
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
                    Manage About Us Content
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto px-4 py-4">
              {/* Content Form */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">About Us Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Page Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={aboutContent.title}
                      onChange={handleContentChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter page title"
                    />
                  </div>
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Mission Statement
                    </label>
                    <textarea
                      name="mission"
                      value={aboutContent.mission}
                      onChange={handleContentChange}
                      rows="3"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter mission statement"
                    />
                  </div>
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Vision Statement
                    </label>
                    <textarea
                      name="vision"
                      value={aboutContent.vision}
                      onChange={handleContentChange}
                      rows="3"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter vision statement"
                    />
                  </div>
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={aboutContent.description}
                      onChange={handleContentChange}
                      rows="4"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter detailed description"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Image Upload */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Hero Image</h4>
                <div className="border-2 border-dashed border-blueGray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                    className="hidden"
                    id="heroImageUpload"
                  />
                  <label
                    htmlFor="heroImageUpload"
                    className="cursor-pointer bg-lightBlue-500 text-white px-4 py-2 rounded hover:bg-lightBlue-600 transition-colors"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload Hero Image
                  </label>
                </div>
                {heroImage && (
                  <div className="mt-4">
                    <img
                      src={heroImage.url}
                      alt="Hero"
                      className="w-full h-48 object-cover rounded-lg shadow"
                    />
                  </div>
                )}
              </div>

              {/* Team Images Upload */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Team Images</h4>
                <div className="border-2 border-dashed border-blueGray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleTeamImageUpload}
                    className="hidden"
                    id="teamImageUpload"
                  />
                  <label
                    htmlFor="teamImageUpload"
                    className="cursor-pointer bg-lightBlue-500 text-white px-4 py-2 rounded hover:bg-lightBlue-600 transition-colors"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload Team Images
                  </label>
                </div>
                
                {teamImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {teamImages.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-lg shadow"
                        />
                        <button
                          onClick={() => removeTeamImage(image.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

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