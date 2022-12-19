// import { useAuthState } from "react-firebase-hooks/auth";
// import {  getAuth, getIdToken } from 'firebase/auth';



// async function callApi() {

//     const auth = getAuth();
//     const [user, loading] = useAuthState(auth);

//     const token = await user.getIdToken();
//     console.log(token);

//     const echoEndpoint = "";
//     const requestInfo = {
//         headers: {
//             Authorization: "Bearer " + token,
//         },
//     }
//     const response = await fetch(echoEndpoint, requestInfo);
//     const responseBody = await response.json();
    
//     return (
//         console.log(responseBody)
//     )

// }  

// export default callApi
