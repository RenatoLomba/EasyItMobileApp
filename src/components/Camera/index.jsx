import React, { useState, useEffect, useRef } from 'react'
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
import PictureTakeModal from '../PictureTakeModal';

const CameraComponent = () => {
    const [hasPermission, setHasPermission] = useState(false)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)
    const [isCameraReady, setIsCameraReady] = useState(false)
    const [photoUri, setPhotoUri] = useState('')
    const [photoWidth, setPhotoWidth] = useState(0)
    const [photoHeight, setPhotoHeight] = useState(0)
    const [photoBase64, setPhotoBase64] = useState('')

    const [showModal, setShowModal] = useState(false)

    const cameraRef = useRef(null)

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

    const snap = async () => {
        if (isCameraReady) {
            let photo = await cameraRef.current.takePictureAsync({ base64: true });

            setPhotoUri(String(photo.uri))
            setPhotoWidth(Number(photo.width))
            setPhotoHeight(Number(photo.height))
            setPhotoBase64(String(photo.base64))

            setShowModal(true)
        }
    }

    if (hasPermission === null) {
        return <View><Text>Camera Component</Text></View>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Container>
            <Camera
                ref={cameraRef}
                style={{ flex: 1 }}
                type={cameraType}
                onCameraReady={() => setIsCameraReady(true)}
            >
                <ButtonContainer>
                    <BottonTab>
                        <ButtonTakeRow>
                            <ButtonTakePhoto onPress={snap}>
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

            <PictureTakeModal
                picture={photoUri}
                pictureWidth={photoWidth}
                pictureHeight={photoHeight}
                base64={photoBase64}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </Container>
    )
}
export default CameraComponent
