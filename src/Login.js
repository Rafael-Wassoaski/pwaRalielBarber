import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api/api';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInputMask } from 'react-native-masked-text'


async function login(username, password, navigation){
    await api.post('/login',{
        username: username,
        password: password
    }).then(async function(response){
        if(response.data.status == 200){ 
            if(!response.data.super){
                await AsyncStorage.setItem('ID', response.data.id);
                await AsyncStorage.setItem('NOME', response.data.nome);
                navigation.navigate('Raliel Barber');
            }else{
                await AsyncStorage.setItem('ID', 1);
                navigation.navigate('Administrador');
            }
        
        }else if(response.data.status == 400){
            const notificacao = () => toast.error("Usuario ou senha incorretos", {
                position: "bottom-center",
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

export default class LoginScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    

    render(){
        return(
            <View style = {style.container}>
                <View> 
                <TextInput
                    style={style.input} 
                    placeholder = "Numero de telefone"   
                    keyboardType = "phone-pad"
                    onChangeText={(text) => this.setState({username: text})}
                    value = {this.state.username.text}              
                />

                <TextInput
                    style={style.input} 
                    placeholder = "Senha"
                    secureTextEntry = {true}
                    onChangeText={(text) => this.setState({password: text})}
                    value = {this.state.password.text}                  
                />

                <Button 
                style = {style.buttonLogin}
                title = 'Login'
                onPress = {()=>login(this.state.username,this.state.password, this.props.navigation)}>
                    
                </Button>

                <View style={style.separator} />

                <Button
                title = 'Cadastre-se'
                onPress ={()=>this.props.navigation.navigate('Cadastro')}>
                    
                </Button>
                <ToastContainer />
                </View>

            </View>
        );
    }
}

const style = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#5e5e5e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        borderRadius: 10,
        paddingVertical: 15,
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 10,
    },

    buttonLogin:{
        paddingVertical: 15,
        borderWidth: 1,
        marginBottom: 10,
    },
    buttonSignUp:{
        paddingVertical: 20,
        borderWidth: 1,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },

});