import styled, {css} from 'styled-components/native';

export const Result = styled.ScrollView`
  background-color: #fff;
  padding: 20px;
  flex: 1;
`;

export const ContainerValue = styled.View`
  margin-top: 20px;
  background-color: #edf1ff;
  align-self: center;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 70%;
  border-radius: 5px;
`;

export const TextHeader = styled.Text`
  color: #000;
  font-size: 24px;
  font-weight: bold;
`;

export const ContainerInformation = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;

export const ResultIcon = styled.View`
  background-color: #edf1ff;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const ResultTitle = styled.Text`
  color: rgba(19, 60, 85, 0.5);
  font-size: 15px;
  line-height: 18px;
`;

export const ResultInformation = styled.Text`
  font-weight: bold;
  color: #133c55;
  font-size: 18px;
  line-height: 21px;

  ${props =>
    props.word_break &&
    css`
      max-width: 90%;
    `}
`;

export const ButtonBack = styled.TouchableOpacity`
  border-radius: 5px;
  height: 50px;
  width: 100%;
  margin-top: 40px;
  background-color: #edf1ff;
  align-items: center;
  justify-content: center;
`;

export const TitleButtonBack = styled.Text`
  color: #000;
  font-weight: bold;
`;
