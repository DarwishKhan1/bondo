import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import firebaseDb from "../Common/firebaseConfig";
import Spinner from "../Common/spinner";
import { Link } from "react-router-dom";
import { Table, Tbody, Thead, Tr, Td, Th } from "react-responsive-list";
import "react-responsive-list/assets/index.css";

const Notes = (props) => {
  const [latLng, setLatLng] = useState({});

  const [notes, setNotes] = useState(null);
  useEffect(() => {
    firebaseDb
      .collection("notes")
      .where("isApproved", "==", true)
      .get()
      .then((snapshot) => {
        const notesList = [];
        snapshot.forEach((doc) => {
          notesList.push({ ...doc.data(), id: doc.id });
        });
        setNotes(notesList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return  notes === null ? (
    <Spinner />
  ) : !(notes.length > 0) ? (
    <h1>There is no Notes</h1>
  ) : (
    <Fragment>
      <div className="container">
        <div className="margin">
          <Table breakPoint={1400}>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Address</Th>
                <Th>Audio</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {notes &&
                notes.map((note, index) => {
                  const { address, title, noteUrl, pic, id } = note; //destructuring

                  return (
                    <Tr key={index}>
                      <Td>
                        <img src={pic} width="50" height="30" alt={title} />
                      </Td>
                      <Td>{title}</Td>
                      <Td>
                        <Link to={`/note/location/${id}`} className="link">
                          {address}
                        </Link>
                      </Td>
                      <Td>
                        <div>
                          <audio controls>
                            <source src={noteUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      </Td>
                      <Td>
                        <Link
                          to={`/note/details/${id}`}
                          className="btn btn-block text-blue"
                        >
                          Details
                        </Link>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </div>
      </div>
    </Fragment>
  );
};

Notes.propTypes = {};

export default Notes;
