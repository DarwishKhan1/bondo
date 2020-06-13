import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import firebaseDb from "../Common/firebaseConfig";
import Spinner from "../Common/spinner";
import GoogleMap from './GoogleMap'

const Location = ({match}) => {
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
        !(note) ? <Spinner /> :  <Fragment>
          <h4 className="mb-3">Location</h4>
          <GoogleMap latitude= {note.lat} longitude={note.long}/>
        </Fragment>
    )
}

Location.propTypes = {

}

export default Location
