import Firebase from 'firebase'
import config from './config'

const firebaseApp = Firebase.initializeApp(config)
export default firebaseApp.database()
