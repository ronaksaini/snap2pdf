import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { MdCancel } from "react-icons/md";
import { TbSettingsStar } from "react-icons/tb";
import { useState } from "react";

const PreviewPage = () => {
  const location = useLocation();
  const { imageUrls } = location.state || {}; // Retrieve image URLs from the passed state
  const [inputFiles, setInputFiles] = useState(imageUrls);
  console.log(imageUrls);

  const handleConvertToPDF = async () => {
    if (!imageUrls || imageUrls.length === 0) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4", // A4 size page
    });

    for (const imageUrl of imageUrls) {
      // Create an HTML element to render the image
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.style.width = "100%";
      imgElement.style.maxWidth = "600px"; // Ensure it fits within a reasonable width

      // Create a container element to wrap the image
      const container = document.createElement("div");
      container.style.width = "600px"; // Set container width to a reasonable size
      container.appendChild(imgElement);
      document.body.appendChild(container);

      // Use html2canvas to capture the image as a canvas
      const canvas = await html2canvas(container);
      document.body.removeChild(container); // Clean up

      // Convert the canvas to an image and then to PDF
      const imgData = canvas.toDataURL("image/jpeg");
      const imgWidth = 190; // Image width, slightly less than PDF width to fit margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
      pdf.addPage(); // Add a new page for each image
    }

    pdf.save("images.pdf");
  };
  const handleRemoveItems = (index:number) => {
    const newInputs = inputFiles.filter((_,idx:number)=>idx!==index);
    setInputFiles(newInputs);
  };

  if (!imageUrls || imageUrls.length === 0) {
    return <p>No images to preview</p>;
  }

  return (
    <>
      <div className="w-full flex justify-center pt-24 px-8">
        <div className="text-center px-16 rounded-md  py-8 flex justify-between">
          <div className="mt-4 flex flex-wrap justify-center gap-8 basis-4/6">
            {inputFiles.map((url: string, index: number) => (
              <div className="bg-white px-4 rounded-md py-8 relative">
                <img
                  key={index}
                  src={url}
                  alt={`Selected JPG ${index}`}
                  className="w-40 h-40 object-contain my-2"
                />
                <MdCancel
                  className="absolute top-2 right-2 size-6 cursor-pointer text-red-600"
                  onClick={()=>handleRemoveItems(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white fixed right-0 top-[100px] h-[100vh] px-12 py-12 w-[400px]">
        <h2 className="font-semibold text-xl text-center">
          Image to PDF options
        </h2>
        <p className="text-left mt-12">Choose Orientation</p>
        <div className="flex gap-4 justify-start mt-2">
          <Button>Portrait</Button>
          <Button>Landscape</Button>
        </div>
        <div>
          <Button
            className=" flex items-center gap-3 mt-6 bg-[#ff6060] fixed bottom-12 w-[240px] text-xl py-6 "
            onClick={handleConvertToPDF}
          >
            Convert to PDF
            <TbSettingsStar />
          </Button>
        </div>
      </div>
      </div>

    </>
  );
};

export default PreviewPage;
