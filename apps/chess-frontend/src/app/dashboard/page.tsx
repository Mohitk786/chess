import React, {useState} from 'react'

export const BASE_URL = 'http://localhost:8000/api';

const page = () => {
    const [color, setColor] = useState('white');

    const submitHandler = async () => {
        try {
            const res = await fetch(BASE_URL+'/game/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({color}),
            });
            if (!res.ok) {
                throw new Error('Failed to create game');
            }
            const data = res.json();
            console.log(data);
        }
        catch (err) {
            console.error(err);
        }   
    }

  return (
    <div>
        <h1>Create game</h1>
        <div>
            <select onChange={(e) => setColor(e.target.value)} value={color}>    
                <option value="white">White</option>
                <option value="black">Black</option>
            </select>
            <button onClick={submitHandler}>Create</button>
        </div>

    </div>
  )
}

export default page