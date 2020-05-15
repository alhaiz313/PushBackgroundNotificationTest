import { AppRegistry } from 'react-native';
import App, { awaitableResult } from './App';
import { name as appName } from './app.json';
import BackgroundFetch from "react-native-background-fetch";
import PushNotification from 'react-native-push-notification';

let MyHeadlessTask = async (event) => {
    // Get task id from event {}:
    let taskId = event.taskId;
    console.log('[BackgroundFetch HeadlessTask] start: ', taskId);

    // Perform an example HTTP request.
    // Important:  await asychronous tasks when using HeadlessJS.
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

    // Required:  Signal to native code that your task is complete.
    // If you don't do this, your app could be terminated and/or assigned
    // battery-blame for consuming too much time in background.
    BackgroundFetch.finish(taskId);
};

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
