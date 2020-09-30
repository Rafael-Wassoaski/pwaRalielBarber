import React, {Component,} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import HorariosLivres from './admin/HorariosDisponiveis';
import HorariosReservados from './admin/HorariosReservados';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CadastrarHorario from './admin/CadastrarHorario'


const Tab  = createBottomTabNavigator();

export default class Admin extends Component{
    render(){
        return(
          <Tab.Navigator independent={true}>
            <Tab.Screen name = 'Horarios Disponiveis' component ={HorariosLivres}/>
            <Tab.Screen name = 'Horarios Reservados' component ={HorariosReservados}/>
            <Tab.Screen name = 'Cadastrar Horario' component ={CadastrarHorario}/>
        </Tab.Navigator>
        );
    }
}