import React, {Component,} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HoraiosLivres from './horaios/HorariosLivres';
import MeusHorarios from './horaios/MeusHorarios';

const Tab  = createBottomTabNavigator();

export default class HorariosScreen extends Component{
    render(){
    return(
      <Tab.Navigator independent={true}>
        <Tab.Screen name = 'Horarios Livres' component ={HoraiosLivres}/>
        <Tab.Screen name = 'Meus Horarios ' component ={MeusHorarios}/>
    </Tab.Navigator>
    );
    }
}