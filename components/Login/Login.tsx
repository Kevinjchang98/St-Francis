import { useEffect } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import styles from './Login.module.css';
import { firebase } from '../../firebase/firebase';
import 'firebase/compat/auth';

interface ProfileProps {
    isSignedIn: boolean;
    setIsSignedIn: Function;
}

function Login({ isSignedIn, setIsSignedIn }: ProfileProps) {
    // Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false,
        },
    };

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user: any) => {
                setIsSignedIn(!!user);
            });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return !isSignedIn ? (
        <div className={styles.wrapper}>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    ) : (
        <div className={styles.wrapper}>
            <p>Signed in</p>
            <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
        </div>
    );
}

export default Login;