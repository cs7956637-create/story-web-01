import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Story() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const getDocument = async () => {
      try {
        const response = await axios.get(
          `https://story-app-backend-hlrp.onrender.com/documents/${id}`
        );

        setDocument(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDocument();
  }, [id]);

  return (
    <div className="bg-black w-full h-full rounded-lg">
     <div className="text-white ">
         <h1 className="text-center text-2xl font-extrabold uppercase mt-9 pt-3  underline">{document?.title}</h1>
      <p className="p-9">{document?.content}</p>
     </div>
    </div>
  );
}

export default Story;