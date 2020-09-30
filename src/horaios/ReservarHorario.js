import React, {useState, Component} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';


async function reserver(nome, telefone, corte, data, id, idUser, exThis){
    await api.post('/reservarHorario',{
        id: id,
        data: data,
        idUser: idUser,
        telefone: telefone,
        nome: nome,
        corte: corte,
    }).then(function(response){
        exThis.props.navigation.navigate('Raliel Barber')
    })
    
}
export default class ReserverHoraScreen extends Component{

    constructor(props){
        super(props)     
        
        this.state = {
            nome: '',
            telefone: '',
            corte: '1',
            hora: this.props.route.params.horario,
            id: this.props.route.params.idCabe,
            idUser:'',
        }

        AsyncStorage.getItem("ID").then((value) => {
            if (value){     
                this.setState({idUser: value});
            }    
        });

        AsyncStorage.getItem("NOME").then((value) => {
            if (value){     
                this.setState({nome: value});
            }    
        });
    }

    

    render(){  

    return(

        <View>
            <TextInput
            style ={{marginLeft: 2}}
            placeholder='Nome'
            value = {this.state.nome}
            onChangeText={(text)=>this.setState({nome:text})}/>
 <View style={{ marginVertical: 8,
                        }} />

            <TextInput
            style ={{marginLeft: 2}}
            placeholder='Telefone'
           onChangeText={(text)=>this.setState({telefone:text})}/>
 <View style={{ marginVertical: 8,
                        }} />

            <Picker
            onValueChange={(itemValue, itemIndex) =>
                this.setState({corte:itemValue})
            }>
            <Picker.Item label = 'Social - 30 min' value = '1' />
            <Picker.Item label = 'Degrade - 30 min' value = '2'/>
            <Picker.Item label = 'Navalhado - 45 min' value = '3'/>
            <Picker.Item label = 'Sobrancelha na pinca - 10 min' value = '4'/>
            <Picker.Item label = 'Sobrancelha na Na navalha - 5 min' value = '5'/>
            <Picker.Item label = 'Barba 15 min' value = '6'/>
            </Picker>

            <View style={{ marginVertical: 8,
                        }} />

            <Button
            title = 'Reservar'
            onPress = {()=>reserver(this.state.nome, this.state.telefone, this.state.corte,
                this.state.hora, this.state.id, this.state.idUser, this)}>
            </Button>

            <View style={{ marginVertical: 8,
                        borderBottomColor: '#737373',
                        borderBottomWidth: StyleSheet.hairlineWidth}} />

            <Button
            title = 'Cancelar'
            onPress = {()=> this.props.navigation.navigate('Raliel Barber')}>
            </Button>
      

        </View>


    );
}

}