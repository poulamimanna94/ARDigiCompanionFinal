import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTaskList from './MyTaskList';
import CreateTask from '../TaskManagement/CreateTask';
import SelectAssets from '../TaskManagement/SelectAssets';



const AuthStack = createStackNavigator();

const MyTask = () => {

    return (
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen name="MyTaskList" options={{ title: 'Task Manager' }} component={MyTaskList} />
                <AuthStack.Screen name="CreateTask" options={{ title: 'Create New Task' }} component={CreateTask} />
                <AuthStack.Screen name="SelectAssets" options={{ title: 'Select Asset' }} component={SelectAssets} />
                {/* <AuthStack.Screen name="ViewTask" options={{ title: 'Task Name' }} component={ViewTask} /> */}
            </AuthStack.Navigator>
        </NavigationContainer>
    )

}


export default MyTask;