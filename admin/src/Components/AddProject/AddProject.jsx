import React, { useState } from 'react';
import './AddProject.css';
import '../Modal/Modal.css'; 
import upload_area from '../../assets/upload_area.svg';
import Modal from '../Modal/Modal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'; 

const AddProject = () => {
    // States for handling images, product details, and error/confirmation messages
    const [images, setImages] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [productDetails, setProductDetails] = useState({
        title: "",
        description: "",
        image: "",
        client_link: "",
        status: "shown"
    });
    const [error, setError] = useState(""); // To handle error messages
    const [confirmation, setConfirmation] = useState(""); // To handle confirmation messages

    // Handler for updating the description state
    const descriptionHandler = (e) => {
        setProductDetails({ ...productDetails, description: e.target.value });
    };

     // Handler for setting image files
    const imageHandler = (e) => {
        setImages(Array.from(e.target.files));
        setMainImageIndex(0); 
    };

    // General change handler for product details (e.g., title, client link)
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    // Function to handle image upload process
    const handleImageUpload = async () => {
        try {
            let imageUrls = [];
            for (let i = 0; i < images.length; i++) {
                let formData = new FormData();
                formData.append('project', images[i]);

                const uploadResponse = await fetch('http://localhost:4000/upload', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                    },
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload images');
                }

                const responseData = await uploadResponse.json();
                if (responseData.success) {
                    imageUrls.push(responseData.image_url);
                } else {
                    throw new Error('Failed to upload image');
                }
            }

            return imageUrls;
        } catch (error) {
            console.error('Error during image upload:', error);
            alert(error.message);
            return [];
        }
    };
// Function to handle adding the project
    const addProduct = async () => {
        if (!productDetails.title || !productDetails.description || !productDetails.client_link) {
            setError("Toate câmpurile sunt obligatorii!");
            return;
        }

        try {
            const imageUrls = await handleImageUpload();

            const product = {
                ...productDetails,
                image: imageUrls[0] || "", // Use the first image URL if available
            };

            const addProductResponse = await fetch('http://localhost:4000/addproject', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!addProductResponse.ok) {
                throw new Error('Failed to add project');
            }

            const productData = await addProductResponse.json();
            if (productData.success) {
                setConfirmation("Proiect adăugat cu succes!"); // Setăm mesajul de confirmare
                setProductDetails({
                    title: "",
                    description: "",
                    image: "",
                    client_link: "",
                    status: "shown"
                });
                setImages([]);
                setError("");
            } else {
                alert("Failed to add project");
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div className='addproduct'>
            {error && (
                <Modal 
                    message={error}
                    onClose={() => setError("")} 
                />
            )}
            {confirmation && (
                <ConfirmationModal 
                    message={confirmation}
                    onClose={() => setConfirmation("")} 
                />
            )}
            <div className="addproduct-itemfield">
                <p>Titlu</p>
                <input 
                    value={productDetails.title} 
                    onChange={changeHandler} 
                    type="text" 
                    name='title' 
                    placeholder='Scrie aici...' 
                />
            </div>
            <div className="addproduct-itemfield">
                <p>Descriere</p>
                <textarea
                    value={productDetails.description}
                    onChange={descriptionHandler}
                    name="description"
                    rows="6"
                    placeholder="Adaugă o descriere..."
                />
            </div>
            <div className="addproduct-itemfield">
                <p>Link Client</p>
                <input 
                    value={productDetails.client_link} 
                    onChange={changeHandler} 
                    type="text" 
                    name="client_link" 
                    placeholder='Scrie aici...' 
                />
            </div>
            <div className="addproduct-itemfield">
                <p>Status</p>
                <select 
                    value={productDetails.status} 
                    onChange={changeHandler} 
                    name="status" 
                    className='add-product-selector'
                >
                    <option value="shown">Afișat</option>
                    <option value="hidden">Ascuns</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img 
                        src={images.length ? URL.createObjectURL(images[mainImageIndex]) : upload_area} 
                        className='addproduct-thumnail-img' 
                        alt="Upload Area" 
                    />
                </label>
                <input 
                    onChange={imageHandler} 
                    type="file" 
                    name='images' 
                    id='file-input' 
                    multiple 
                    hidden 
                />
                <div className="image-previews">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`preview ${index}`}
                            className={`image-preview ${index === mainImageIndex ? 'selected' : ''}`}
                            onClick={() => setMainImageIndex(index)}
                        />
                    ))}
                </div>
            </div>
            <button onClick={addProduct} className='addproduct-btn'>Add Project</button>
        </div>
    );
};

export default AddProject;
