import React, {useState, Component} from 'react';
import {StyleSheet, View, Text,TextInput, SafeAreaView, FlatList, TouchableOpacity, Button} from 'react-native';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';
import AsyncStorage from '@react-native-community/async-storage';



async function criarHorario(idUser, data, exThis) {

    if(data.split(' ') < new Date()){
        const notificacao = () => toast.error("Informe uma data valida", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        notificacao();
    }else{

    await api.post('/inserirHorario',{
        id:idUser,
        horario: data
    }).then(function(response){
        if(response.data.status == 200){ 
            const notificacao = () => toast.success("Horario inserido", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            notificacao();
            exThis.props.navigation.navigate('Horarios Disponiveis')
        }else if(response.data.status == 400){
            const notificacao = () => toast.error("Falha ao inserir horari", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            notificacao();
        }
        });
    }
  
  }

export default class CadastrarHorarioScreen extends Component{
    constructor(props){
        super(props);   
        this.state = {
            idUser: 1,
            date: '',
            hour: ''
        }
        AsyncStorage.getItem("ID").then((value) => {
            if (value){     
                this.setState({idUser: value});
            }    
        });
}
  
render(){

    
    const exThis = this;

    return(
     
        <View style={{flex: 1, alignItems: 'center'}}>
            <TextInput style = {{input:{
        borderRadius: 10,
        paddingVertical: 15,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 10,
    },}}
            placeholder = 'Informe a data (AAAA-M-DD)'
            onChangeText={(text) => this.setState({date: text})}
            />
            <TextInput style = {{input:{
        borderRadius: 10,
        paddingVertical: 15,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 10,
    },}}
            placeholder = 'Informe a hora (HH:MM)'
            onChangeText={(text) => this.setState({hour: text})}
            />

            <View style = {{separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },}}/>
            <Button style = {{marginTop : 20, marginLeft: 5, marginRight: 5}}
            title = 'Criar'
            onPress = {() => criarHorario(this.state.idUser, this.state.date + " " + this.state.hour+":00", this)} >
            </Button>

    
            <ToastContainer />
            
        </View>
    );
}

}