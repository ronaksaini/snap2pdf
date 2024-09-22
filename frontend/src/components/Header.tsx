import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
    setFiles(selectedFiles);

    // Redirect to the preview page with the image URLs
    const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
    navigate("/preview", { state: { imageUrls } });
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("select-img");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="w-full flex justify-center py-16 min-h-[90vh]">
      <div className="text-center">
        <h2 className="font-bold text-4xl">JPG to PDF</h2>
        <p className="my-4">
          Convert JPG images to PDF in seconds. Easily adjust orientation and
          margins.
        </p>

        <Button
          className="px-4 py-3 bg-[#ff6060] text-xl"
          onClick={triggerFileInput}
        >
          Select JPG Images
        </Button>

        <input
          type="file"
          id="select-img"
          accept="image/jpeg, image/jpg"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Header;
