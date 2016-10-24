
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAv1y4UcoLgm2TCJ5crsfTr_Hceq2ioVo",
    authDomain: "application-bd063.firebaseapp.com",
    databaseURL: "https://application-bd063.firebaseio.com",
    storageBucket: "application-bd063.appspot.com",
    messagingSenderId: "637698045686"
  };
  firebase.initializeApp(config);


    /**
     * Function called when clicking the Login/Logout button.
     */
    // [START buttoncallback]
    function facebookSignIn() {
      if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.FacebookAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('user_birthday');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // [START_EXCLUDE]
          document.getElementById('quickstart-oauthtoken').textContent = token;
          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
        // [END signin]
      } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      }
      // [START_EXCLUDE]
      document.getElementById('fbsign-in').disabled = true;
      // [END_EXCLUDE]
    }
    // [END buttoncallback]
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("welcome");
          // [START_EXCLUDE]
         
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
         
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
       
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('fbsign-in').addEventListener('click', facebookSignIn, false);
    }
    window.onload = function() {
      initApp();
    };