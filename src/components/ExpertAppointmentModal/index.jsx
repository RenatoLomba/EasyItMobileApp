
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/UserContext';
import {
    Text,
    Platform,
    Alert
} from 'react-native';
import Api from '../../Api';
import {
    Modal,
    ModalArea,
    ModalBody,
    CloseModalButton,
    ModalItem,
    ModalExpertInfo,
    ModalExpertAvatar,
    ModalExpertName,
    ModalServiceInfo,
    ModalServiceName,
    ModalServicePrice,
    FinishAppointmentButton,
    FinishAppointmentButtonText,
    LoadingRegisteringIcon,
    AppointmentDate,
    AppointmentDateArea,
    AppointmentDateTitle,
    DateSelect,
    DateSelectButton,
    DateSelectButtonText,
    DateText,
    HourSelect,
    HourSelectButton,
    HourSelectButtonText,
    HourText
} from './styles';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import ExpandIcon from '../../assets/expand.svg';
import TodayIcon from '../../assets/today.svg';
import ClockIcon from '../../assets/clock.svg';

import configs from '../../appconfigs.json';
import { format, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ExpertAppointmentModal = ({ service, showModal, setShowModal, expertInfo, appointment = null }) => {
    const { userId, userAppointments, appointmentsDispatch } = useContext(UserContext);
    const navigator = useNavigation();

    // const [allowEndAppointment, setAllowEndAppointment] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().setDate(new Date().getDate() + 1));
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    // const [showTimeSelect, setShowTimeSelect] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    function formatAppointmentDate() {
        const appointmentDate = new Date(appointment.date);
        const formattedDate = format(appointmentDate, 'dd/MM', { locale: ptBR })
        const formattedTime = format(appointmentDate, 'hh:MM', { locale: ptBR })
        return `${formattedDate} às ${formattedTime}`;
    }

    function handleChangeDate(event, datetime) {
        if (Platform.OS === 'android') setShowDatePicker(oldState => !oldState)

        if (datetime && isBefore(datetime, new Date())) {
            setSelectedDate(new Date().setDate(new Date().getDate() + 1))
            return Alert.alert('Ops...', 'Escolha uma data no futuro! 📅')
        }

        if (datetime) {
            setSelectedDate(datetime)
            // setShowTimeSelect(true)
        }
    }

    function handleChangeTime(event, datetime) {
        if (Platform.OS === 'android') setShowTimePicker(oldState => !oldState)

        if (datetime) setSelectedTime(datetime)
    }

    async function handleFinishButton() {
        setShowLoading(true);
        const date = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            selectedTime.getHours(),
            selectedTime.getMinutes(),
            selectedTime.getSeconds(),
            selectedTime.getMilliseconds()
        )
        const appointmentCreate = {
            expertId: expertInfo.id,
            userId: userId,
            serviceId: service.id,
            date
        }
        try {
            const response = await Api.registerAppointment(appointmentCreate);
            if (response.id) {
                const newAppointment = { ...response, expert: expertInfo, service }
                const newUserAppointments = [...userAppointments, newAppointment]
                appointmentsDispatch(newUserAppointments)
                navigator.navigate('Appointments')
            } else {
                Alert.alert(response.error)
            }
        } catch (ex) {
            Alert.alert('Ops, ocorreu um erro ao realizar agendamento, tente novamente!')
        } finally {
            setShowLoading(false)
        }
    }

    return (
        <Modal
            transparent={true}
            visible={showModal}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>

                    <CloseModalButton onPress={() => { setShowModal(false) }}>
                        <ExpandIcon width="35" height="35" fill="#000" />
                    </CloseModalButton>

                    <ModalItem>
                        <ModalExpertInfo>
                            <ModalExpertAvatar source={{ uri: expertInfo.avatar.image }} />
                            <ModalExpertName>{expertInfo.name}</ModalExpertName>
                        </ModalExpertInfo>
                    </ModalItem>

                    <ModalItem>
                        <ModalServiceInfo>
                            <ModalServiceName>{service && service.name}</ModalServiceName>
                            <ModalServicePrice>R$ {service && service.price.toFixed(2).toString().replace('.', ',')}</ModalServicePrice>
                        </ModalServiceInfo>
                    </ModalItem>

                    {!appointment &&
                        <ModalItem>
                            <DateSelect>
                                <DateText>
                                    Data: (press to change)
                                </DateText>
                                <DateSelectButton
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <DateSelectButtonText>
                                        {format(selectedDate, 'dd/MM')}
                                    </DateSelectButtonText>
                                    <TodayIcon
                                        width="28"
                                        height="28"
                                        fill={configs.colors['slightly-darker']}
                                    />
                                </DateSelectButton>
                            </DateSelect>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={selectedDate}
                                    mode="date"
                                    display="calendar"
                                    onChange={handleChangeDate}
                                />
                            )}
                        </ModalItem>
                    }

                    {!appointment && // showTimeSelect &&
                        <ModalItem>
                            <HourSelect>
                                <HourText>
                                    Hora: (press to change)
                                </HourText>
                                <HourSelectButton
                                    onPress={() => setShowTimePicker(true)}
                                >
                                    <HourSelectButtonText>
                                        {format(selectedTime, 'HH:mm')}
                                    </HourSelectButtonText>
                                    <ClockIcon
                                        width="24"
                                        height="24"
                                        fill={configs.colors['slightly-darker']}
                                    />
                                </HourSelectButton>
                            </HourSelect>
                            {showTimePicker && (
                                <DateTimePicker
                                    value={selectedTime}
                                    mode="time"
                                    display="clock"
                                    onChange={handleChangeTime}
                                />
                            )}
                        </ModalItem>
                    }

                    {appointment &&
                        (
                            <ModalItem>
                                <AppointmentDateArea>
                                    <AppointmentDateTitle>Data marcada: </AppointmentDateTitle>
                                    <AppointmentDate>
                                        {formatAppointmentDate()}
                                    </AppointmentDate>
                                </AppointmentDateArea>
                            </ModalItem>
                        )
                    }

                    {showLoading && <LoadingRegisteringIcon size="large" color="#FFF" />}

                    {!appointment &&
                        <FinishAppointmentButton
                            // style={{ opacity: !allowEndAppointment ? 0.5 : 1 }}
                            // disabled={!allowEndAppointment}
                            onPress={handleFinishButton}>
                            <FinishAppointmentButtonText>Finalizar Agendamento</FinishAppointmentButtonText>
                        </FinishAppointmentButton>
                    }

                </ModalBody>
            </ModalArea>
        </Modal >
    )
};
export default ExpertAppointmentModal;
ExpertAppointmentModal.displayName = 'ExpertAppointmentModal';
ExpertAppointmentModal.propTypes = {
    service: PropTypes.object,
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    expertInfo: PropTypes.object,
    appointment: PropTypes.object
};
