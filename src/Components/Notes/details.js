import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import firebaseDb from "../Common/firebaseConfig";
import GoogleMap from './GoogleMap'

const Details = ({match}) => {
    const id = match.params.id;
    const [note, setNote] = useState({});
    useEffect(() => {
      firebaseDb
        .collection("notes")
        .doc(id)
        .get()
        .then((snapshot) => {
          setNote(snapshot.data())
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    return (
        note && <div>
          <h4 className="mb-3">Details</h4>
        </div>
    )
}

Details.propTypes = {

}

export default Details
