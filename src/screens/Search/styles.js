import styled, {css} from 'styled-components/native';

export const Search = styled.ScrollView`
  background-color: #fff;
  padding: 20px;

  flex: 1;
`;

export const Container = styled.View`
  justify-content: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 11px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ButtonCard = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #f1f1f1;

  flex: 1;
  justify-content: center;
  align-items: center;

  ${props =>
    props.active &&
    css`
      border: 2px solid #244efc;
      background-color: #edf1ff;
    `}
`;

export const TitleButton = styled.Text`
  color: #000;
  font-weight: bold;
`;

export const ButtonSearch = styled.TouchableOpacity`
  border-radius: 5px;
  height: 50px;
  width: 100%;
  margin-top: 20px;
  background-color: #edf1ff;
  align-items: center;
  justify-content: center;

  ${props =>
    props.buttonDisabled &&
    css`
      background-color: #dee1ea;
    `}
`;

export const ModalContainer = styled.View`
  padding: 20px;

  flex: 1;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: #000;
`;

export const ModalClosed = styled.TouchableOpacity`
  border: 1px solid;
  border-radius: 100px;
  width: 50px;
  align-items: center;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: #edf1ff;
  margin: 10px 0 0;
  height: 60px;
  justify-content: center;
`;

export const ModalData = styled.Text`
  color: #000;
  font-weight: bold;
  margin: 10px;
`;

export const SearchVehicle = styled.TextInput`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #000;
  border-radius: 5px;
  color: #000;
`;
