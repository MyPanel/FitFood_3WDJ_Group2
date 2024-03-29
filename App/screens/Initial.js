// import React, { useState, useEffect } from "react";
// import { AppLoading } from "expo";
// import { Asset } from "expo-asset";
// import * as Font from "expo-font";
// import * as Icon from "@expo/vector-icons";
// import { withFirebaseHOC } from "../config/Firebase";

// function Initial({ navigation, firebase }) {
//   const [isAssetsLoadingComplete, setIsAssetsLoadingComplete] = useState(false);

//   useEffect(() => {
//     try {
//       loadLocalAsync();

//       firebase.checkUserAuth(user => {
//         if (user) {
//           // if the user has previously logged in
//           navigation.navigate("App");
//         } else {
//           // if the user has previously logged out from the app
//           navigation.navigate("Auth");
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   async function loadLocalAsync() {
//     return await Promise.all([
//       Asset.loadAsync([
//         require("../assets/flame.png"),
//         require("../assets/icon.png")
//       ]),
//       Font.loadAsync({
//         ...Icon.Ionicons.font
//       })
//     ]);
//   }

//   function handleLoadingError(error) {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error);
//   }

//   function handleFinishLoading() {
//     setIsAssetsLoadingComplete(true);
//   }

//   return (
//     <AppLoading
//       startAsync={loadLocalAsync}
//       onFinish={handleFinishLoading}
//       onError={handleLoadingError}
//     />
//   );
// }

// // class Initial extends Component {
// //   state = {
// //     isAssetsLoadingComplete: false
// //   }

// //   componentDidMount = async () => {
// //     try {
// //       // previously
// //       this.loadLocalAsync()

// //       await this.props.firebase.checkUserAuth(user => {
// //         if (user) {
// //           // if the user has previously logged in
// //           this.props.navigation.navigate('App')
// //         } else {
// //           // if the user has previously signed out from the app
// //           this.props.navigation.navigate('Auth')
// //         }
// //       })
// //     } catch (error) {
// //       console.log(error)
// //     }
// //   }

// //   loadLocalAsync = async () => {
// //     return await Promise.all([
// //       Asset.loadAsync([
// //         require('../assets/flame.png'),
// //         require('../assets/icon.png')
// //       ]),
// //       Font.loadAsync({
// //         ...Icon.Ionicons.font
// //       })
// //     ])
// //   }

// //   handleLoadingError = error => {
// //     // In this case, you might want to report the error to your error
// //     // reporting service, for example Sentry
// //     console.warn(error)
// //   }

// //   handleFinishLoading = () => {
// //     this.setState({ isAssetsLoadingComplete: true })
// //   }

// //   render() {
// //     return (
// //       <AppLoading
// //         startAsync={this.loadLocalAsync}
// //         onFinish={this.handleFinishLoading}
// //         onError={this.handleLoadingError}
// //       />
// //     )
// //   }
// // }

// export default withFirebaseHOC(Initial);

import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Icon from "@expo/vector-icons";
import { withFirebaseHOC } from "../config/Firebase";

function Initial({ navigation, firebase }) {
  const [isAssetsLoadingComplete, setIsAssetsLoadingComplete] = useState(false);

  useEffect(() => {

      loadLocalAsync();


          // if the user has previously logged out from the app
          navigation.navigate("Auth");
 
  }, []);

  async function loadLocalAsync() {
    return await Promise.all([
      Asset.loadAsync([
        require("../assets/flame.png"),
        require("../assets/icon.png")
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font
      })
    ]);
  }

  function handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }

  function handleFinishLoading() {
    setIsAssetsLoadingComplete(true);
  }

  return (
    <AppLoading
      startAsync={loadLocalAsync}
      onFinish={handleFinishLoading}
      onError={handleLoadingError}
    />
  );
}

// class Initial extends Component {
//   state = {
//     isAssetsLoadingComplete: false
//   }

//   componentDidMount = async () => {
//     try {
//       // previously
//       this.loadLocalAsync()

//       await this.props.firebase.checkUserAuth(user => {
//         if (user) {
//           // if the user has previously logged in
//           this.props.navigation.navigate('App')
//         } else {
//           // if the user has previously signed out from the app
//           this.props.navigation.navigate('Auth')
//         }
//       })
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   loadLocalAsync = async () => {
//     return await Promise.all([
//       Asset.loadAsync([
//         require('../assets/flame.png'),
//         require('../assets/icon.png')
//       ]),
//       Font.loadAsync({
//         ...Icon.Ionicons.font
//       })
//     ])
//   }

//   handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error)
//   }

//   handleFinishLoading = () => {
//     this.setState({ isAssetsLoadingComplete: true })
//   }

//   render() {
//     return (
//       <AppLoading
//         startAsync={this.loadLocalAsync}
//         onFinish={this.handleFinishLoading}
//         onError={this.handleLoadingError}
//       />
//     )
//   }
// }

export default withFirebaseHOC(Initial);
