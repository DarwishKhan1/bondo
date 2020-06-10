import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import firebaseDb from '../Common/firebaseConfig'

const Dashboard = props => {
    const [notes, setNotes] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        firebaseDb.collection('users')
            .get()
            .then(snapshot => {
                setUsers(snapshot.size);
                firebaseDb.collection('notes').get().then(snapshot => {
                    setNotes(snapshot.size)
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        (notes && users) &&  <div className="container mt-5">
        <div className="row">
            <div className="col-md-4">
                <div className="card bg-light m-1">
                    <div className="card-body text-center">
                        <p className="card-text">
                            <i className="fa fa-user fa-2x" />  {users}
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card bg-ligt m-1">
                    <div className="card-body text-center">
                        <p className="card-text">
                            <i className="fa fa-music fa-2x" /> {notes}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
