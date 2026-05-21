// run : createUser.js <email> <role>
import {createUser} from "./../models/userroles.model.js"
const email = process.argv[2]
const role = process.argv[3]

if (!email || !role) {
    console.error('Usage: node createUser.js <email> <role>')
    process.exit(1)
}

createUser(email, role)
    .then(user => {
        console.log('User created:', user)
        process.exit(0)
    })
    .catch(error => {
        console.error('Error creating user:', error)
        process.exit(1)
    })