import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`
// export const CameraStyled = styled.Camera`
//     flex: 1;
// `
export const ButtonContainer = styled.View`
    flex: 1;
    background-color: rgba(0,0,0, 0);
    flex-direction: row;
    align-items: flex-end;
    margin: 20px;
`
export const BottonTab = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    height: 100px;
    width: 100%;
    border-radius: 10px;
    padding: 0 20px;
`
export const ButtonTakeRow = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
`
export const ButtonTakePhoto = styled.TouchableOpacity`
    width: 75px;
    height: 75px;
    background-color: #fff;
    border-radius: 50px;
    margin-top: -35px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
export const InsideButtonTake = styled.View`
    background-color: rgba(0,0,0,0);
    border: 1px solid rgba(0,0,0,0.5);
    border-radius: 50px;
    width: 50px;
    height: 50px;
`

export const ButtonFlipRow = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
`
export const Button = styled.TouchableOpacity`
    width: 42px;
    height: 42px;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    /* border: 1px solid red; */
`
// export const ButtonText = styled.Text`
//     font-size: 18px;
//     color: #fff;
// `
