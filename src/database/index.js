import { db } from "./config";

export const DB = {
    getUsers,
    signUp
};

function getUsers(getUsersFromFB) {
    db.ref('/users').once('value').then(snapshot => {
        const users = snapshot.val()
        getUsersFromFB(users)
    });
}

function signUp(user, callback) {
    db.ref('/users').orderByChild('phone_number').equalTo(user.phone_number).once('value', snapshot => {
        console.log(snapshot.val());
        if (snapshot.exists()) {
            callback({ message: 'Exist phone number' })
        } else {
            db.ref('users/' + user.phone_number).set(user).then(data => {
                callback({ message: 'Sign up Successful' });
            }).catch(error => {
                console.log(error)
            });
        }
    })
}