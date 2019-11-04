import firebase from "../../Firebase";
import React from 'react';


//Call this code to create users and save in the database user relevant info

// firebase.auth()
//     .createUserWithEmailAndPassword(email.value, password.value)
//     .then(authUser => {
//         return firebase.database().ref('users/' + authUser.user.uid)
//             .set({
//                 fullName: fullName.value,
//                 email: email.value,
//                 role: role.value,
//             });
//     });


const SignUp = () => {
    //To be implemented
    const handleSignUp = () => {};

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Full Name
                    <input name="fullName" type="fullName" placeholder="Full Name"/>
                </label>
                <label>
                    User Role
                    <input name="userRole" type="fullName" placeholder="User Role"/>
                </label>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email"/>
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password"/>
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;