import { useState} from 'react';

import { 
    useGetAssetNotesQuery,
    useAddAssetNoteMutation,
    useEditAssetNoteMutation,
    useDeleteAssetNoteMutation,


 } from '../../api/apiAssetSlice';

const AssetNoteList = ({asset_id}) => {
    const [newNote, setNewNote] = useState('')
    const [ editNote, setEditNote] = useState(false)

    const {data: asset_notes, isSuccess, refetch } = useGetAssetNotesQuery(asset_id);
    const [editAssetNote] = useEditAssetNoteMutation();
    const [addAssetNote] = useAddAssetNoteMutation();
    const [ deleteAssetNote ] = useDeleteAssetNoteMutation(8)

    const toggleEdit = (i) => {
        editNote === i ? setEditNote('') : setEditNote(i)
    }

    const submitAddNote = async(note) => {
        const edit_data = {
            asset_id,
            note: newNote
        }

        try {
            const submitAdd = await addAssetNote(edit_data)
            setNewNote('')
            refetch()
        } catch(err) {
            alert(err)
        }
    }

    const submitEditNote = async (edit_data) => {
        const {note_id, note} = edit_data
        try {
             const submit = await editAssetNote({note_id, note}).unwrap();
             setEditNote('')
        } catch(err) {
            alert(err)
        }
    }

    const enterEdit = async (event, note_id, note) => {
        if(event.key ==='Enter') {
            const edit_data = {note_id, note};
            await submitEditNote(edit_data);
        }
    }

    const deleteNote = async (note_id) => {
        try {
            await deleteAssetNote(8)
        } catch(err) {
            alert(err)
        }
    }

    return(
        <div className="pa2">
            <h3 className="z-0">Asset Notes</h3>

            {!isSuccess 
                ?
                    <h1>LOADING</h1>
                : 
                    <div className="overflow-visible">
                        <table className="f7 w-100 mw8 center" cellSpacing="0">
                            <thead className="pt">
                                <tr className="stripe-dark">
                                    <th className="fw6 tl pa2 bg-white">Note</th>                        
                                    <th className="fw6 tl pa2 bg-white">Captured</th>
                                </tr>
                            </thead>
                            <tbody className="lh-copy">
                                {asset_notes.map((note,i) => {
                                    return (                            	
                                        <tr
                                            className="stripe-dark pointer"
                                            key={i}
                                            >
                                                { editNote === i 
                                                    ? 
                                                        <td className="pa1 ws-normal w-50">
                                                            <input 
                                                                key={note?.note}
                                                                type="textarea" 
                                                                defaultValue={note?.note}
                                                                onKeyPress={(e) => enterEdit(e, note.note_id, e.target.value)}
                                                                />
                                                        </td>
                                                    :
                                                        <td className="pa1 ws-normal w-50">{note?.note}</td>
                                                }
                                                <td className="pa1">{note?.capture_time}</td>
                                                 <td 
                                                    className="fw6 bold link dim center pointer tc pr2"
                                                    onClick={() => toggleEdit(i)}
                                                    >edit</td>
                                                 <td 
                                                    className="fw6 bold link dim center pointer tc pr2"
                                                    onClick={() => deleteNote(note.note_id)}
                                                    >del</td>
                                            </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <form>
                            <label htmlFor="addnote" className="pr2">Note:</label>
                            <input 
                                type="text"
                                className="mt2 mr2"
                                id="addnote"
                                onChange={event => setNewNote(event.target.value)}
                            />
                            <button 
                                type="button" 
                                name="AddNote"
                                onClick={submitAddNote}
                                    >Add Note</button>
                        </form>
                    </div>
                }
        </div>
    )
}

export default AssetNoteList;