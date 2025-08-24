import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function AdminMedia() {
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const newMedia = files.map((file) => ({
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        type: file.type,
        size: file.size,
        url: "https://docs.google.com/document/d/1uy4yngJGVmRbH0nRn00iZQ9aXga7xKhcqteVfPEe0c0/edit?tab=t.0",
        uploadDate: new Date().toLocaleDateString(),
      }));

      setUploadedMedia([...uploadedMedia, ...newMedia]);
      setIsUploading(false);

      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 1500);
  };

  // Handle media selection for social media upload
  const handleMediaSelection = (mediaId) => {
    setSelectedMedia((prev) =>
      prev.includes(mediaId)
        ? prev.filter((id) => id !== mediaId)
        : [...prev, mediaId]
    );
  };

  // Select all media
  const handleSelectAll = () => {
    if (selectedMedia.length === uploadedMedia.length) {
      setSelectedMedia([]);
    } else {
      setSelectedMedia(uploadedMedia.map((media) => media.id));
    }
  };

  // Delete selected media
  const handleDeleteSelected = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedMedia.length} selected media files?`
      )
    ) {
      setUploadedMedia(
        uploadedMedia.filter((media) => !selectedMedia.includes(media.id))
      );
      setSelectedMedia([]);
    }
  };

  // Delete single media
  const handleDeleteSingle = (mediaId) => {
    if (window.confirm("Are you sure you want to delete this media file?")) {
      setUploadedMedia(uploadedMedia.filter((media) => media.id !== mediaId));
      setSelectedMedia(selectedMedia.filter((id) => id !== mediaId));
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Media Upload Management ({uploadedMedia.length} files)
                  </h3>
                </div>
                <div className="relative w-auto px-4 flex-initial">
                  {/* Changed from label to Link */}
                  <Link
                    to="/admin/upload-media"
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none transition-all duration-150 inline-block"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload Media
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto px-4 py-4">
              {/* Upload Progress */}
              {isUploading && (
                <div className="mb-6 bg-blueGray-50 rounded-lg p-4">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lightBlue-500 mr-3"></div>
                    <span className="text-blueGray-600">
                      Uploading media files...
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {uploadedMedia.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-3">
                  <button
                    onClick={handleSelectAll}
                    className="bg-lightBlue-500 text-white px-4 py-2 rounded text-sm hover:bg-lightBlue-600 transition-colors duration-150"
                  >
                    <i className="fas fa-check-square mr-2"></i>
                    {selectedMedia.length === uploadedMedia.length
                      ? "Deselect All"
                      : "Select All"}
                  </button>

                  {selectedMedia.length > 0 && (
                    <>
                      <Link
                        to="/admin/social-media-upload"
                        state={{
                          selectedMedia: uploadedMedia.filter((media) =>
                            selectedMedia.includes(media.id)
                          ),
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors duration-150 inline-flex items-center"
                      >
                        <i className="fas fa-share-alt mr-2"></i>
                        Upload to Social Media ({selectedMedia.length})
                      </Link>

                      <button
                        onClick={handleDeleteSelected}
                        className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition-colors duration-150"
                      >
                        <i className="fas fa-trash mr-2"></i>
                        Delete Selected ({selectedMedia.length})
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Media Grid */}
              {uploadedMedia.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {uploadedMedia.map((media) => (
                    <div
                      key={media.id}
                      className={`bg-white rounded-lg shadow border-2 transition-all duration-150 ${
                        selectedMedia.includes(media.id)
                          ? "border-lightBlue-500 shadow-lg"
                          : "border-blueGray-200 hover:shadow-md"
                      }`}
                    >
                      {/* Selection Checkbox */}
                      <div className="p-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedMedia.includes(media.id)}
                            onChange={() => handleMediaSelection(media.id)}
                            className="form-checkbox h-4 w-4 text-lightBlue-500 rounded focus:ring-lightBlue-500"
                          />
                          <span className="ml-2 text-sm text-blueGray-600 truncate">
                            {media.name}
                          </span>
                        </label>
                      </div>

                      {/* Media Preview */}
                      <div className="relative">
                        {media.type.startsWith("image/") ? (
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-full h-48 object-cover"
                          />
                        ) : media.type.startsWith("video/") ? (
                          <video
                            src={media.url}
                            className="w-full h-48 object-cover"
                            controls
                          />
                        ) : (
                          <div className="w-full h-48 bg-blueGray-100 flex items-center justify-center">
                            <i className="fas fa-file text-4xl text-blueGray-400"></i>
                          </div>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteSingle(media.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-150"
                          title="Delete this media"
                        >
                          <i className="fas fa-times text-xs"></i>
                        </button>
                      </div>

                      {/* Media Info */}
                      <div className="p-3">
                        <div className="text-xs text-blueGray-500 space-y-1">
                          <div>Size: {formatFileSize(media.size)}</div>
                          <div>Uploaded: {media.uploadDate}</div>
                          <div>Type: {media.type}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-blueGray-400 text-lg mb-4">
                    <i className="fas fa-cloud-upload-alt text-6xl mb-4 block"></i>
                    <p>No media files uploaded yet</p>
                  </div>
                  {/* Changed from label to Link */}
                  <Link
                    to="/admin/upload-media"
                    className="bg-emerald-500 text-white px-6 py-3 rounded font-bold shadow hover:shadow-lg transition-all duration-150 inline-block"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload Your First Media File
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
