import React from 'react';
import { YellowBox, View, Text, Platform } from 'react-native';
// 1. Import the modules.
import BackgroundFetch from 'react-native-background-fetch';
import PushNotification from 'react-native-push-notification';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Warning:']);//ignore yellow box messages that starts with "Wraning:"
    console.disableYellowBox = true;
    //scheduleNextPrayer();
    //backgroundServiceForAlarams();
  }

  componentDidMount = async () => {
    // Push notifications setup (recommend extracting into separate file)
    PushNotification.configure({
      // onNotification is called when a notification is to be emitted
      onNotification: notification => console.log(notification),

      // Permissions to register for iOS
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios'
    });

    // Background fetch setup (recommend extracting into separate file)
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 20, // fetch interval in minutes
        forceAlarmManager: true, // <-- Set true to bypass JobScheduler.
        stopOnTerminate: false,
        enableHeadless:true,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
      },
      async taskId => {
        console.log('Received background-fetch event: ', taskId);
        //alert("I was called");
        // 3. Insert code you want to run in the background, for example:
        const result = await awaitableResult();

        if (result) {
          // 4. Send a push notification
          PushNotification.localNotification({
            title: 'Test',
            message: 'Test',
            playSound: true,
            soundName: 'default',
          });
        }

        // Call finish upon completion of the background task
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.error('RNBackgroundFetch failed to start.');
      },
    );

  }

  render() {
    return (<View><Text>Hello</Text></View>);
  }
}

export const awaitableResult = () => {
  return Promise.resolve(true);
};
