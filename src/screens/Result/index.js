import React from 'react';

import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as R from './style';

import {useRoute, useNavigation} from '@react-navigation/core';

export default function Result() {
  const route = useRoute();
  const navigation = useNavigation();

  const routeParams = route.params;

  function handleNavigateBack() {
    navigation.navigate('Search');
  }

  return (
    <>
      <R.Result>
        <R.ContainerValue>
          <R.TextHeader>{routeParams.Valor}</R.TextHeader>
        </R.ContainerValue>

        <R.ContainerInformation>
          <R.ResultIcon>
            {routeParams.TipoVeiculo === 1 ? (
              <FontAwesome5 name="car-alt" size={28} color="#071136" />
            ) : null}
            {routeParams.TipoVeiculo === 2 ? (
              <Fontisto name="motorcycle" size={28} color="#071136" />
            ) : null}
            {routeParams.TipoVeiculo === 3 ? (
              <Fontisto name="truck" size={28} color="#071136" />
            ) : null}
          </R.ResultIcon>
          <View>
            <R.ResultTitle>Marca/Modelo</R.ResultTitle>
            <R.ResultInformation word_break={routeParams.Modelo.length > 10}>
              {routeParams.Marca + '/' + routeParams.Modelo}
            </R.ResultInformation>
          </View>
        </R.ContainerInformation>

        <R.ContainerInformation>
          <R.ResultIcon>
            <MaterialCommunityIcons name="fuel" size={28} color="#071136" />
          </R.ResultIcon>

          <View>
            <R.ResultTitle>Combustível</R.ResultTitle>
            <R.ResultInformation>{routeParams.Combustivel}</R.ResultInformation>
          </View>
        </R.ContainerInformation>
        <R.ContainerInformation>
          <R.ResultIcon>
            <FontAwesome5 name="calendar-alt" size={28} color="#071136" />
          </R.ResultIcon>

          <View>
            <R.ResultTitle>Ano</R.ResultTitle>
            <R.ResultInformation>
              {routeParams.AnoModelo === 32000
                ? 'ZERO KM'
                : routeParams.AnoModelo}
            </R.ResultInformation>
          </View>
        </R.ContainerInformation>

        <R.ContainerInformation>
          <R.ResultIcon>
            <FontAwesome5 name="calendar-day" size={28} color="#071136" />
          </R.ResultIcon>

          <View>
            <R.ResultTitle>Data da Consulta</R.ResultTitle>
            <R.ResultInformation
              word_break={routeParams.DataConsulta.length > 28}>
              {routeParams.DataConsulta}
            </R.ResultInformation>
          </View>
        </R.ContainerInformation>

        <R.ContainerInformation>
          <R.ResultIcon>
            <FontAwesome name="gear" size={28} color="#071136" />
          </R.ResultIcon>

          <View>
            <R.ResultTitle>Código Fipe</R.ResultTitle>
            <R.ResultInformation>{routeParams.CodigoFipe}</R.ResultInformation>
          </View>
        </R.ContainerInformation>

        <R.ButtonBack onPress={handleNavigateBack}>
          <R.TitleButtonBack>Voltar</R.TitleButtonBack>
        </R.ButtonBack>
      </R.Result>
    </>
  );
}
