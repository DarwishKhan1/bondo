import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import firebaseDb from "../Common/firebaseConfig";
import Spinner from "../Common/spinner";
import { Table, Tbody, Thead, Tr, Td, Th } from "react-responsive-list";
import "react-responsive-list/assets/index.css";

const Details = ({ match }) => {
  const id = match.params.id;
  const [note, setNote] = useState({});
  const [replyies, setReplies] = useState([]);

  useEffect(() => {
    firebaseDb
      .collection("notes")
      .doc(id)
      .get()
      .then((snapshot) => {
        setNote(snapshot.data());
        firebaseDb
          .collection("replies")
          .where("token", "==", snapshot.data().token)
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
  return !(replyies.length > 0 && note) ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <h3 className="text-center my-3">Details</h3>
        <div className="row">
          <div className="col-md-6">
            <img src={note.pic} width="100%" height="400px" />
          </div>
          <div className="col-md-6 mt-5">
            <h5>Title: {note.title}</h5>
            <p>Address: {note.address}</p>
            <p>Favourites: {note.fav}</p>
            <p>Likes: {note.likes}</p>
          </div>
        </div>
        <h4 className="text-center my-5">Replies</h4>
        <Table breakPoint={768}>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Title</Th>
              <Th>Address</Th>
            </Tr>
          </Thead>
          <Tbody>
            {replyies &&
              replyies.map((reply, index) => {
                const { address, title, pic } = reply; //destructuring

                return (
                  <Tr key={index}>
                    <Td>
                      <img src={pic} width="50" height="30" alt={title} />
                    </Td>
                    <Td>{title}</Td>
                    <Td>{address}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </div>
    </Fragment>
  );
};

Details.propTypes = {};

export default Details;
