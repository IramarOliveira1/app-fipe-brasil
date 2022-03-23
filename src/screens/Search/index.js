import React, {useState} from 'react';
import {FlatList, Modal} from 'react-native';

import {useNavigation} from '@react-navigation/core';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';

import axios from '../../services/api';

import * as S from './styles';

export default function Search() {
  const navigation = useNavigation();

  const [valueTypeVehicle, setValueTypeVehicle] = useState(null);

  const [valueBrands, setValueBrands] = useState(null);
  const [valueSearchBrands, setValueSearchBrands] = useState(null);

  const [valueModels, setValueModels] = useState(null);
  const [valueSearchModels, setValueSearchModels] = useState(null);

  const [valueYearFuels, setValueYearFuels] = useState(null);
  const [valueSearchYearFuels, setValueSearchYearFuels] = useState(null);

  const [brands, setBrands] = useState([]);
  const [filterBrands, setFilterBrands] = useState([]);

  const [models, setModels] = useState([]);
  const [filterModels, setFilterModels] = useState([]);

  const [yearFuels, setYearFuels] = useState([]);
  const [filterYearFuels, SetFilterYearFuels] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYearFuel, setSelectedYearFuel] = useState(null);

  const [modalBrand, setModalBrand] = useState(false);
  const [modalModel, setModalModel] = useState(false);
  const [modalYearFuels, setModalYearFuel] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  async function handleBrand(value) {
    let formData = new FormData();
    formData.append('codigoTabelaReferencia', 279);
    formData.append('codigoTipoVeiculo', value);

    await axios
      .post('/ConsultarMarcas', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(({data}) => {
        setBrands(data);
        setFilterBrands(data);
        setSelectedBrand(null);
        setSelectedModel(null);
        setSelectedYearFuel(null);
        setButtonDisabled(true);
        setValueSearchBrands(null);
        setValueSearchModels(null);
        setValueSearchYearFuels(null);
        setFilterModels([]);
        SetFilterYearFuels([]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function handleModel({Value}) {
    let formData = new FormData();
    formData.append('codigoTabelaReferencia', 279);
    formData.append('codigoTipoVeiculo', valueTypeVehicle);
    formData.append('codigoMarca', Value);
    await axios
      .post('/ConsultarModelos', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(({data}) => {
        setModels(data.Modelos);
        setFilterModels(data.Modelos);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function handleYearFuel({Value}) {
    let formData = new FormData();
    formData.append('codigoTabelaReferencia', 279);
    formData.append('codigoTipoVeiculo', valueTypeVehicle);
    formData.append('codigoMarca', valueBrands);
    formData.append('codigoModelo', Value);
    await axios
      .post('/ConsultarAnoModelo', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(({data}) => {
        const newArr = data.reduce((acc, item) => {
          acc.push({
            label: item.Label.includes('32000') ? 'ZERO KM' : item.Label,
            value: item.Value,
          });
          return acc;
        }, []);
        setYearFuels(newArr);
        SetFilterYearFuels(newArr);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function handleGetData() {
    const split = valueYearFuels.split('-');
    let formData = new FormData();
    formData.append('codigoTabelaReferencia', 279);
    formData.append('codigoTipoVeiculo', valueTypeVehicle);
    formData.append('codigoMarca', valueBrands);
    formData.append('codigoModelo', valueModels);
    formData.append('ano', valueYearFuels);
    formData.append('anoModelo', split[0]);
    formData.append('codigoTipoCombustivel', split[1]);
    formData.append('tipoConsulta', 'tradicional');

    await axios
      .post('/ConsultarValorComTodosParametros', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(({data}) => {
        const {
          AnoModelo,
          Autenticacao,
          CodigoFipe,
          Combustivel,
          DataConsulta,
          Marca,
          MesReferencia,
          Modelo,
          SiglaCombustivel,
          TipoVeiculo,
          Valor,
        } = data;

        navigation.push('Result', {
          AnoModelo,
          Autenticacao,
          CodigoFipe,
          Combustivel,
          DataConsulta,
          Marca,
          MesReferencia,
          Modelo,
          SiglaCombustivel,
          TipoVeiculo,
          Valor,
        });

        setValueTypeVehicle(null);
        setSelectedBrand(null);
        setSelectedModel(null);
        setSelectedYearFuel(null);
        setButtonDisabled(true);
        setValueSearchBrands(null);
        setValueSearchModels(null);
        setValueSearchYearFuels(null);
        setFilterBrands([]);
        setFilterModels([]);
        SetFilterYearFuels([]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleFilterBrand(item) {
    setValueSearchBrands(item);
    const filtered = brands.filter(brand =>
      brand.Label.toLowerCase().includes(item.toLowerCase()),
    );
    setFilterBrands(filtered);
  }

  function handleFilterModel(item) {
    setValueSearchModels(item);
    const filtered = models.filter(model =>
      model.Label.toLowerCase().includes(item.toLowerCase()),
    );
    setFilterModels(filtered);
  }

  function handleFilterYear(item) {
    setValueSearchYearFuels(item);
    const filtered = yearFuels.filter(yearFuel =>
      yearFuel.label.toLowerCase().includes(item.toLowerCase()),
    );

    SetFilterYearFuels(filtered);
  }

  const renderBrand = ({item}) => {
    return (
      <>
        <S.ModalButton
          onPress={() => {
            setSelectedBrand(item);
            setModalBrand(false);
            setValueBrands(item.Value);
            handleModel(item);
          }}>
          <S.ModalData key={item.Value}>{item.Label}</S.ModalData>
        </S.ModalButton>
      </>
    );
  };

  const renderModel = ({item}) => {
    return (
      <>
        <S.ModalButton
          onPress={() => {
            setSelectedModel(item);
            setModalModel(false);
            setValueModels(item.Value);
            handleYearFuel(item);
          }}>
          <S.ModalData key={item.Value}>{item.Label}</S.ModalData>
        </S.ModalButton>
      </>
    );
  };

  const renderYear = ({item}) => {
    return (
      <>
        <S.ModalButton
          onPress={() => {
            setSelectedYearFuel(item);
            setModalYearFuel(false);
            setValueYearFuels(item.value);
            setButtonDisabled(false);
          }}>
          <S.ModalData key={item.value}>{item.label}</S.ModalData>
        </S.ModalButton>
      </>
    );
  };

  return (
    <>
      <S.Search>
        <Modal animationType="slide" visible={modalBrand}>
          <S.ModalContainer>
            <S.ModalHeader>
              <S.ModalTitle>Selecione uma Marca</S.ModalTitle>
              <S.ModalClosed onPress={() => setModalBrand(false)}>
                <S.ModalTitle>X</S.ModalTitle>
              </S.ModalClosed>
            </S.ModalHeader>

            <S.SearchVehicle
              value={valueSearchBrands}
              onChangeText={handleFilterBrand}
            />

            <FlatList
              data={filterBrands}
              renderItem={renderBrand}
              keyExtractor={item => item.Value}
            />
          </S.ModalContainer>
        </Modal>

        <Modal animationType="slide" visible={modalModel}>
          <S.ModalContainer>
            <S.ModalHeader>
              <S.ModalTitle>Selecione um Modelo</S.ModalTitle>

              <S.ModalClosed onPress={() => setModalModel(false)}>
                <S.ModalTitle>X</S.ModalTitle>
              </S.ModalClosed>
            </S.ModalHeader>

            <S.SearchVehicle
              value={valueSearchModels}
              onChangeText={handleFilterModel}
            />

            <FlatList
              data={filterModels}
              renderItem={renderModel}
              keyExtractor={item => item.Value}
            />
          </S.ModalContainer>
        </Modal>

        <Modal animationType="slide" visible={modalYearFuels}>
          <S.ModalContainer>
            <S.ModalHeader>
              <S.ModalTitle>Selecione o ano</S.ModalTitle>

              <S.ModalClosed onPress={() => setModalYearFuel(false)}>
                <S.ModalTitle>X</S.ModalTitle>
              </S.ModalClosed>
            </S.ModalHeader>

            <S.SearchVehicle
              value={valueSearchYearFuels}
              onChangeText={handleFilterYear}
            />

            <FlatList
              data={filterYearFuels}
              renderItem={renderYear}
              keyExtractor={item => item.value}
            />
          </S.ModalContainer>
        </Modal>

        <S.Title> Tipo de Veiculo</S.Title>
        <S.Container>
          <S.ButtonCard
            active={valueTypeVehicle === 1}
            onPress={() => {
              setValueTypeVehicle(1);
              handleBrand(1);
            }}>
            <FontAwesome5 name="car-alt" size={30} color="#071136" />
            <S.Title style={{color: '#071136'}}>Carro</S.Title>
          </S.ButtonCard>

          <S.ButtonCard
            active={valueTypeVehicle === 2}
            style={{marginHorizontal: 20}}
            onPress={() => {
              setValueTypeVehicle(2);
              handleBrand(2);
            }}>
            <Fontisto name="motorcycle" size={30} color="#071136" />
            <S.Title style={{color: '#071136'}}>Moto</S.Title>
          </S.ButtonCard>

          <S.ButtonCard
            active={valueTypeVehicle === 3}
            onPress={() => {
              setValueTypeVehicle(3);
              handleBrand(3);
            }}>
            <Fontisto name="truck" size={30} color="#071136" />
            <S.Title style={{color: '#071136'}}>Caminhão</S.Title>
          </S.ButtonCard>
        </S.Container>

        <S.ButtonSearch onPress={() => setModalBrand(true)}>
          <S.TitleButton>
            {selectedBrand ? selectedBrand.Label : 'Selecione uma marca'}
          </S.TitleButton>
        </S.ButtonSearch>

        <S.ButtonSearch onPress={() => setModalModel(true)}>
          <S.TitleButton>
            {selectedModel ? selectedModel.Label : 'Selecione um modelo'}
          </S.TitleButton>
        </S.ButtonSearch>

        <S.ButtonSearch onPress={() => setModalYearFuel(true)}>
          <S.TitleButton>
            {selectedYearFuel ? selectedYearFuel.label : 'Selecione um ano'}
          </S.TitleButton>
        </S.ButtonSearch>

        <S.ButtonSearch
          disabled={buttonDisabled}
          buttonDisabled={buttonDisabled === true}
          onPress={() => handleGetData()}>
          <S.TitleButton>Pesquisar</S.TitleButton>
        </S.ButtonSearch>
      </S.Search>
    </>
  );
}
