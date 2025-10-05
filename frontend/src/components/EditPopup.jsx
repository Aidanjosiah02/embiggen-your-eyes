import { useState, useEffect } from 'react'
import './styles/EditPopup.css'

export default function EditPopup({ marker, onSave, onClose }) {
    const [name, setName] = useState(marker.name);
    const [description, setDescription] = useState(marker.description);

    function handleSave(e) {
        e.preventDefault();
        onSave({ ...marker, name, description });
        onClose();
    }

    useEffect(() => {
        setName(marker.name)
        setDescription(marker.description)
    }, [marker])

    return (
        <div className='edit-popup'>
            <h3>Edit Marker</h3>
            <form onSubmit={handleSave}>
                <div>
                    <label htmlFor='name'>Name: </ label>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='description'>Description: </ label>
                    <textarea
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    )
}