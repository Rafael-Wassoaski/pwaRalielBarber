import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button, SafeAreaView, FlatList} from 'react-native';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';

var meses = new Map();

export default function HorariosLivresScreen({navigation}){

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
    meses.set('112', 'Dezembro');


    const [data, setData] = useState('');

    async function getHorarios(){
        await api.get('/')
        .then(function(response){
            setData(response.data.horarios);
        });
    }

    getHorarios();

    const Item = ({hora}) =>{
        const horarioPuro = hora.split(' ');
        const dataFormatada = horarioPuro[0].split('-');
        const horaFormatada = horarioPuro[1].split(':');

        return(
        <View>
            <Text>{`${dataFormatada[2]} de ${meses.get(dataFormatada[1])} de ${dataFormatada[0]} ` }</Text>
            <Text>{`${horaFormatada[0]}:${horaFormatada[1]}` }</Text>
            <Button
            title='Reservar'/>
        </View>
        )
    }

    const renderItem = ({ item }) => (
        <Item hora={item.hora} />
      );

    return(

      <SafeAreaView>
          <FlatList
          data = {data}
          renderItem ={renderItem}
          keyExtractor = {item => item.hora}/>
      </SafeAreaView>
    );
}