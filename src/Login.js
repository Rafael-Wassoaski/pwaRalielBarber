import React, {Component, useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api/api';


async function login(username, password, navigation){
    await api.post('https://ServerRaliel-1.extremegame300.repl.co/login',{
        username: username.text,
        password: password.text
    }).then(function(response){
        if(response.data.status == 200){
            navigation.navigate('Raliel Barber')
        }else if(response.data.status == 400){
            console.log("n cadasto")
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


export default function LoginScreen({navigation}){

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        
        return(
            <View style = {style.container}>
                <View>
                <TextInput
                    style={style.input} 
                    placeholder = "Nome de usuario"   
                    onChangeText={(text) => setUsername({text})}
                    value = {username.text}              
                />

                <TextInput
                    style={style.input} 
                    placeholder = "Senha"
                    onChangeText={(text) => setPassword({text})}
                    value = {password.text}                  
                />

                <Button style = {style.buttonLogin}
                title = 'Login'
                onPress = {()=>login(username,password, navigation)}>
                    
                </Button>

                <Button style = {style.buttonSignUp}
                title = 'Cadastre-se'
                onPress ={()=>navigation.navigate('Cadastro')}>
                    
                </Button>


                </View>

            </View>
        );
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
        flex: 1,
        paddingVertical: 15,
        borderWidth: 1,
        backgroundColor : 'red'
    },
    buttonSignUp:{
        flex: 1,
        paddingVertical: 20,
        borderWidth: 1,
    }

});