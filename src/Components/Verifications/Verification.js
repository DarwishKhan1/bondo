import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import firebaseDb from "../Common/firebaseConfig";
import { Table, Tbody, Thead, Tr, Td, Th } from "react-responsive-list";
import "react-responsive-list/assets/index.css";
import Spinner from "../Common/spinner";

const Verification = (props) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    firebaseDb
      .collection("notes")
      .where("isApproved", "==", false)
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

  const updateNote = (id) => {
    firebaseDb
      .collection("notes")
      .doc(id)
      .update({ isApproved: true })
      .then((snapshot) => {
        firebaseDb
          .collection("notes")
          .where("isApproved", "==", false)
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteNote = (id) => {
    firebaseDb
      .collection("notes")
      .doc(id)
      .delete()
      .then((snapshot) => {
        firebaseDb
          .collection("notes")
          .where("isApproved", "==", false)
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return !(notes.length > 0) ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <table className="table table-bordered my-5">
        <thead className="thead-light">
          <tr>
            <th>
              <div className="px-2">Image</div>
            </th>
            <th>Title</th>
            <th>Address</th>
            <th>Audio</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {notes &&
            notes.map((note, index) => {
              console.log(note);

              const { address, title, noteUrl, pic, id } = note; //destructuring

              return (
                <tr key={index}>
                  <td>
                    <div>
                      <img src={pic} width="50" height="30" alt={title} />
                    </div>
                  </td>
                  <td>
                    <div>{title}</div>
                  </td>
                  <td>{address}</td>
                  <td>
                    <audio controls>
                      <source src={noteUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </td>
                  <td>
                    <button
                      className="btn text-blue"
                      onClick={() => updateNote(id)}
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn text-blue"
                      onClick={() => deleteNote(id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table> */}
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
                    <Td>{address}</Td>
                    <Td>
                      <div>
                        <audio controls>
                          <source src={noteUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </Td>
                    <Td>
                      <button
                        className="btn btn-block text-blue"
                        onClick={() => updateNote(id)}
                      >
                        Approve
                      </button>
                    </Td>
                    <Td>
                      <button
                        className="btn btn-block text-blue"
                        onClick={() => deleteNote(id)}
                      >
                        Reject
                      </button>
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

Verification.propTypes = {};

export default Verification;
