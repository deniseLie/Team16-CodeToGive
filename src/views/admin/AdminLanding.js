import React, { useState } from "react";

export default function AdminLanding() {
  const [landingContent, setLandingContent] = useState({
    heroTitle: "",
    heroSubtitle: "",
    ctaText: "",
    features: [],
  });
  const [heroImage, setHeroImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleContentChange = (e) => {
    setLandingContent({
      ...landingContent,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeroImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setHeroImage({
        file: file,
        url: URL.createObjectURL(file),
        name: file.name,
      });
    }
  };

  const handleGalleryImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setGalleryImages([...galleryImages, ...newImages]);
  };

  const removeGalleryImage = (id) => {
    setGalleryImages(galleryImages.filter((img) => img.id !== id));
  };

  const handleSave = () => {
    console.log("Saving landing content:", landingContent);
    console.log("Hero image:", heroImage);
    console.log("Gallery images:", galleryImages);
    alert("Landing page content saved successfully!");
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
                    Manage Landing Page Content
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto px-4 py-4">
              {/* Content Form */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">
                  Landing Page Content
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      name="heroTitle"
                      value={landingContent.heroTitle}
                      onChange={handleContentChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter hero title"
                    />
                  </div>
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Hero Subtitle
                    </label>
                    <textarea
                      name="heroSubtitle"
                      value={landingContent.heroSubtitle}
                      onChange={handleContentChange}
                      rows="3"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter hero subtitle"
                    />
                  </div>
                  <div>
                    <label className="block text-blueGray-600 text-xs font-bold mb-2">
                      Call to Action Text
                    </label>
                    <input
                      type="text"
                      name="ctaText"
                      value={landingContent.ctaText}
                      onChange={handleContentChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter CTA button text"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Image Upload */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">
                  Hero Background Image
                </h4>
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

              {/* Gallery Images Upload */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-4">Gallery Images</h4>
                <div className="border-2 border-dashed border-blueGray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryImageUpload}
                    className="hidden"
                    id="galleryImageUpload"
                  />
                  <label
                    htmlFor="galleryImageUpload"
                    className="cursor-pointer bg-lightBlue-500 text-white px-4 py-2 rounded hover:bg-lightBlue-600 transition-colors"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload Gallery Images
                  </label>
                </div>

                {galleryImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="relative">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-lg shadow"
                        />
                        <button
                          onClick={() => removeGalleryImage(image.id)}
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
