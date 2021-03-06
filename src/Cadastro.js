import React, {useState, Component} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api/api';

async function cadastro(username, password, phone, navigation){
        
    await api.post('/register', {
        username: username,
        password: password,
        phone: phone,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://ServerRaliel-1.extremegame300.repl.co'
        }
    }).then(function(response){
        if(response.data.status == 200){
            const notificacao = () => toast.success("Usuario cadastrado com sucesso", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            notificacao();
            navigation.navigate('Login')
        }else if(response.data.status == 202){
            console.log("n cadasto")
            const notificacao = () => toast.error("Usuario ja cadastrado", {
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

export default  class CadastroScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            phone: ''
        }
    }

    render(){
        return(
            <View style = {style.container}>
                <View>
                <TextInput
                    style={style.input} 
                    placeholder = "Nome de usuario"   
                    onChangeText={(text) => this.setState({username:text})}            
                />

                <TextInput
                    style={style.input} 
                    placeholder = "Senha"
                    secureTextEntry = {true}
                    onChangeText={(text) => this.setState({password:text})}               
                />

                <TextInput
                    style={style.input} 
                    placeholder = "Telefone" 
                    keyboardType = "phone-pad"
                    onChangeText={(text) => this.setState({phone:text})}                
                />

                <Button style = {style.buttonLogin}
                    title = "Cadastrar-se"
                    onPress = {() => cadastro(this.state.username, this.state.password, this.state.phone.toString(), this.props.navigation) }
                >
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
        flex: 1,
        paddingVertical: 15,
        borderWidth: 1,
        backgroundColor : 'red'
    },
    buttonSignUp:{
        flex: 1,
        paddingVertical: 15,
        borderWidth: 1,
    }

});