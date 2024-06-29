import React, { useState } from 'react';

function Ai() {
    const [inputText, setInputText] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleGenerateClick = async () => {
        const payload = {
            text_prompts: [
                {
                    text: inputText,
                    weight: 1
                }
            ],
            sampler: "K_EULER_ANCESTRAL",
            steps: 2,
            seed: 0
        };

        setLoading(true);
        try {
            const response = await fetch('http://localhost:9000/imagegenerate', {
                method: "post",
                body: JSON.stringify(payload),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            const imageBase64 = responseData.artifacts[0].base64;  // Assuming artifacts array is present and has a base64 key
            const imageUrl = `data:image/jpeg;base64,${imageBase64}`;  // Prefixing with data URI scheme needed for base64 images

            setImageUrl(imageUrl);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching image:', error);
            setLoading(false);
        }
    };


    return (
        <div className='ai'>
            <h1>Customize your own Custom</h1>
            <div className='about'>
                <input
                    type='search'
                    placeholder='Search....'
                    value={inputText}
                    onChange={handleInputChange}
                />
                <button onClick={handleGenerateClick} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </div>
            {imageUrl && <img src={imageUrl} alt="Generated" />}

        </div>
    );
}

export default Ai;
