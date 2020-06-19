import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import firebaseDb from "../Common/firebaseConfig";
import Spinner from "../Common/spinner";
import { Table, Tbody, Thead, Tr, Td, Th } from "react-responsive-list";
import "react-responsive-list/assets/index.css";

const Details = ({ match }) => {
  const id = match.params.id;
  const [note, setNote] = useState(null);
  const [replyies, setReplies] = useState(null);

  useEffect(() => {
    firebaseDb
      .collection("notes")
      .doc(id)
      .get()
      .then((snapshot) => {
        setNote(snapshot.data());
        firebaseDb
          .collection("notes")
          .doc(id)
          .collection("reply")
          .get()
          .then((snap) => {
            const replyList = [];
            snap.forEach((doc) => {
              replyList.push({ ...doc.data(), id: doc.id });
            });
            setReplies(replyList);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (replyies && note) === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <h3 className="text-center my-3">Details</h3>
        <div className="row">
          <div className="col-md-4">
            <img src={note.pic} width="100%" height="200px" />
          </div>
          <div className="col-md-4 mt-2">
            <p>
              <strong>Title:</strong> {note.title}
            </p>
            <p>
              <strong>Address:</strong> {note.address}
            </p>
            <p>
              <strong>Favourites:</strong> {note.fav}
            </p>
            <p>
              <strong>Likes:</strong> {note.likes}
            </p>
            <div>
              <audio controls style={{ border: "1px solid black" }}>
                <source src={note.noteUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
        <hr className="my-1" />
        {!(replyies.length > 0) ? (
          <h3>There is no replies</h3>
        ) : (
          <Fragment>
            <h4 className="text-center my-5">Replies</h4>

            {replyies.map((reply, index) => {
              const { address, title, pic } = reply; //destructuring
              return (
                <Fragment key={index}>
                  <div class="row">
                    <div className="col-sm-3">
                      <div className="my-auto">
                        <img
                          className="rounded-circle ml-5"
                          src={pic}
                          height="100rem"
                          width="100rem"
                        />
                      </div>
                    </div>
                    <div className="col-sm-9">
                      <p>
                        <strong>Title:</strong> {title}
                      </p>
                      <p>
                        <strong>Address:</strong> {address}
                      </p>
                      <audio controls style={{ border: "1px solid black" }}>
                        <source src={note.noteUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                  <hr width="100%" />
                </Fragment>
              );
            })}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Details.propTypes = {};

export default Details;
