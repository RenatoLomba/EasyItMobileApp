import React, { useContext, useState } from 'react'
import { Modal, useWindowDimensions, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext'
import PropTypes from 'prop-types'
import {
    ButtonConfirm,
    ButtonConfirmText,
    ButtonDelete,
    ButtonDeleteText,
    ModalArea,
    Picture,
    LoadingUpload
} from './styles'
import Api from '../../Api'

const PictureTakeModal = ({ showModal, setShowModal, picture, base64 }) => {
    const windowDimensions = useWindowDimensions()
    const navigator = useNavigation()

    const { userId, avatarDispatch } = useContext(UserContext)
    const [showLoading, setShowLoading] = useState(false)

    async function handleConfirmPicture() {
        setShowLoading(true);
        try {
            const response = await Api.uploadUserAvatar(userId, picture)
            if (response.id) {
                avatarDispatch(response)
                Alert.alert('Sucesso', 'Seu avatar foi salvo com sucesso!!!', [
                    {
                        text: 'OK', style: 'default', onPress: () => {
                            setShowModal(false)
                            navigator.navigate('Profile')
                        }
                    }
                ])
            } else {
                Alert.alert('Erro!', response.error)
            }
        } catch (ex) {
            Alert.alert('Ops, ocorreu um erro!', ex.message)
        } finally {
            setShowLoading(false);
        }
    }

    return (
        <Modal
            transparent={true}
            visible={showModal}
            animationType="fade"
        >
            <ModalArea>
                <Picture
                    pictureWidth={windowDimensions.width - 50}
                    pictureHeight={windowDimensions.height - 50}
                    source={{ uri: picture }} />
                <ButtonDelete onPress={() => setShowModal(false)}>
                    <ButtonDeleteText>
                        Voltar
                    </ButtonDeleteText>
                </ButtonDelete>
                <ButtonConfirm onPress={handleConfirmPicture}>
                    <ButtonConfirmText>
                        Confirmar
                    </ButtonConfirmText>
                </ButtonConfirm>
                {showLoading && <LoadingUpload size="large" color="#FFF" />}
            </ModalArea>
        </Modal>
    )
}

export default PictureTakeModal

PictureTakeModal.displayName = 'PictureTakeModal';
PictureTakeModal.propTypes = {
    picture: PropTypes.string,
    // pictureHeight: PropTypes.number,
    // pictureWidth: PropTypes.number,
    base64: PropTypes.string,
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func
};
