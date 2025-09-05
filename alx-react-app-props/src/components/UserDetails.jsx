import {useContext} from 'react';
import UserContext from '../UserContext';

function UserDetails(){
    const UserData = useContext(UserContext);

    return(
        <div>
            <p>Name: {UserData.name}</p>
            <p>Email: {UserData.email}</p>
        </div>
    );
}

export default UserDetails;