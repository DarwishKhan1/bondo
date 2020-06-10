import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import firebaseDb from '../Common/firebaseConfig'
import { Table, Tbody, Thead, Tr, Td, Th } from 'react-responsive-list'
import 'react-responsive-list/assets/index.css'

const Notes = props => {

    const [notes, setNotes] = useState([]);
    useEffect(() => {
        firebaseDb.collection('notes').where('isApproved', '==', true)
            .get()
            .then(snapshot => {
                const notesList = [];
                snapshot.forEach(doc => {
                    notesList.push({ ...doc.data(), id: doc.id })
                });
                setNotes(notesList)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <table className="table table-bordered my-5">
            <thead className="thead-light">
                <tr>
                    <th><div className="px-2">Image</div></th>
                    <th>Title</th>
                    <th>Address</th>
                    <th>Audio</th>
                </tr>
            </thead>
            <tbody>
                {
                    notes && notes.map((note, index) => {
                        console.log(note);

                        const { address, title, noteUrl, pic, id } = note //destructuring

                        return <tr key={index}>
                            <td>
                                <div>
                                    <img src={pic} width="50" height="30" alt={title} />
                                </div>
                            </td>
                            <td>
                                <div>
                                    {title}
                                </div>
                            </td>
                            <td>{address}</td>
                            <td>
                                <audio controls>
                                    <source src={noteUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.</audio>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

Notes.propTypes = {

}

export default Notes
