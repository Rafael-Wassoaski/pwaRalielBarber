import React, {useState, Component} from 'react';
import {StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';
import AsyncStorage from '@react-native-community/async-storage';
import { XCircleFill, PlusSquareFill, AlignBottom } from 'react-bootstrap-icons';

var meses = new Map();

async function cofirmaCancelamento(idUser, data, exThis) {

    if(confirm('Deseja cancelar este horario? (Clique em Ok para cancelar)')){
        cancelarHorario(idUser, data, exThis)
      }
}

async function getHorarios(exThis){
    await api.get('/')
    .then(function(response){
        exThis.setState({horarios: response.data.horarios});
    });
}

async function cancelarHorario(idUser, data, exThis) {

    await api.post('/deletarHorario',{
        id:idUser,
        data: data
    }).then(function(response){
        getHorarios(exThis);
        });

  
  }

export default class HorariosLivresScreen extends Component{
    constructor(props){
        super(props);   
        this.state = {
            horarios: '',
            idUser: 1,
        }
        AsyncStorage.getItem("ID").then((value) => {
            if (value){     
                this.setState({idUser: value});
            }    
        });
}
  
render(){

    meses.set('1', 'Janeiro');
    meses.set('2', 'Fevereiro');
    meses.set('3', 'Marco');
    meses.set('4', 'Abril');
    meses.set('5', 'Maio');
    meses.set('6', 'Junho');
    meses.set('7', 'Julho');
    meses.set('8', 'Agosto');
    meses.set('9', 'Setembro');
    meses.set('10', 'Outubro');
    meses.set('11', 'Novembro');
    meses.set('12', 'Dezembro'); 
    
    const exThis = this;
    getHorarios(exThis);
    const Item = ({hora, id}) =>{
        
        const horarioPuro = hora.split(' ');
        const dataFormatada = horarioPuro[0].split('-');
        const horaFormatada = horarioPuro[1].split(':');
    
        return(
        <View style = {{borderRadius: 2, borderWidth: 1, borderColor: "#20232a", flex: 1, flexDirection:'column', marginTop : 5, marginLeft: 5}}>
             <View>
            <Text>{`${dataFormatada[2]} de ${meses.get(dataFormatada[1])} de ${dataFormatada[0]} ` }</Text>
            <Text style = {{marginTop: 5}}>{`${horaFormatada[0]}:${horaFormatada[1]}` }</Text>
            </View>
            <View style = {{marginLeft: 30}}>
            <TouchableOpacity style = {{marginTop: 5, alignSelf: 'flex-end'}}
             onPress={()=>cofirmaCancelamento(this.state.idUser, hora, this)}>
            <XCircleFill
            size = {18}/>
            </TouchableOpacity>
            </View>
        </View>
        )
    }

    const renderItem = ({ item }) => (
        <Item hora={item.hora}
        id = {item.id}/>
      );

      function getView (horarios) {

        if(horarios.length === 0){
    
            return(
                <View>
                    <Text style = {{borderRadius: 2, borderWidth: 1, borderColor: "#20232a", flex: 1, flexDirection:'row', marginTop : 5, marginLeft: 5}}>Sem horarios livres</Text>
                </View>
            );
                
        }else{
    
            return(
                <View>
                <SafeAreaView>
                    <FlatList
                    data = {horarios}
                    renderItem ={renderItem}
                    keyExtractor = {item => item.hora}/>
                </SafeAreaView>
                </View>
            );
    
        }
        
    }

    return(
        getView(this.state.horarios)
    );
}

}