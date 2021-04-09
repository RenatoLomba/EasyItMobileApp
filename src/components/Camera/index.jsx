import React, { useState, useEffect } from 'react'
import { Camera } from 'expo-camera'
import { Text, View } from 'react-native'
import {
    Container,
    // CameraStyled,
    ButtonContainer,
    Button,
    // ButtonText,
    BottonTab,
    ButtonTakeRow,
    ButtonTakePhoto,
    InsideButtonTake,
    ButtonFlipRow
} from './styles';

import FlipIcon from '../../assets/flip.svg'

const CameraComponent = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)

    const requestPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted')
    }

    useEffect(() => {
        requestPermission();
    }, [])

    const handleCameraButton = () => {
        setCameraType(cameraType === Camera.Constants.Type.back ?
            Camera.Constants.Type.front :
            Camera.Constants.Type.back);
    }

    if (hasPermission === null) {
        return <View><Text>Camera Component</Text></View>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Container>
            <Camera style={{ flex: 1 }} type={cameraType}>
                <ButtonContainer>
                    <BottonTab>
                        <ButtonTakeRow>
                            <ButtonTakePhoto>
                                <InsideButtonTake />
                            </ButtonTakePhoto>
                        </ButtonTakeRow>

                        <ButtonFlipRow>
                            <Button
                                onPress={handleCameraButton}
                            >
                                <FlipIcon width="28" height="28" fill="#fff" />
                            </Button>
                        </ButtonFlipRow>
                    </BottonTab>
                </ButtonContainer>
            </Camera>
        </Container>
    )
}
export default CameraComponent
