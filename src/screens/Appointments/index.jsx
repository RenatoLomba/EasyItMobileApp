import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text, Alert } from 'react-native';
import {
    Container,
    Scroller,
    Header,
    HeaderText,
    Area,
    Avatar,
    InfoArea,
    UserName,
    SeeProfileButton,
    SeeProfileButtonText,
    ServiceName,
    Date,
    CardHeader,
    LoadingIcon,
    RemoveAppointmentButton
} from './styles';

import Api from '../../Api';
import ExpertItem from '../../components/ExpertItem';

import configs from '../../appconfigs.json';
import Screen from '../../components/ScreenGlobal';
import { ListArea } from '../Home/styles';
import ExpertAppointmentModal from '../../components/ExpertAppointmentModal';

const Appointments = () => {
    const { userAppointments, appointmentsDispatch } = useContext(UserContext);
    const [appointmentsList, setAppointmentsList] = useState(userAppointments);
    const [showLoading, setShowLoading] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(userAppointments[0]);
    const [showModal, setShowModal] = useState(false);
    const [appointmentKey, setAppointmentKey] = useState(null);

    useEffect(() => {
        setShowLoading(true);
        setAppointmentsList(userAppointments);
        setShowLoading(false);
    }, [userAppointments])

    const removeAppointment = async (id, key) => {
        setShowLoading(true);
        try {
            const response = await Api.removeAppointment(id);
            if (response) {
                let appointments = [...userAppointments];
                appointments.splice(appointments.findIndex(v => v.id === id));

                setAppointmentsList(appointments);
                appointmentsDispatch(appointments);

                alert('Agendamento removido com sucesso.');
            } else {
                alert('Ocorreu um erro, o agendamento não foi removido');
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setShowLoading(false);
        }
    }

    const handleRemoveAppointmentButton = (id, key) => {
        Alert.alert(
            'Remover Agendamento',
            'Tem certeza que deseja remover o agendamento?',
            [
                { text: "Cancel", onPress: () => console.log('cancelled'), style: 'cancel' },
                { text: "OK", onPress: () => removeAppointment(id, key) },
            ]
        );
    }

    const handleSeeDetailsButton = (appointment, key) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    }

    return (
        <Screen>
            <Scroller>
                <Header>
                    <HeaderText>Agendamentos</HeaderText>
                </Header>

                {showLoading && <LoadingIcon size="large" color="#fff" />}

                <ListArea>
                    {appointmentsList.length > 0 && appointmentsList.sort(() => .5 - Math.random()).map((item, key) => {
                        return <ExpertItem
                            key={`expert__${key}`}
                            data={item.expert}
                            service={item.service}
                            modalShowDetail={() => handleSeeDetailsButton(item, key)}
                            removeAppointment={() => handleRemoveAppointmentButton(item.id, key)}
                        />;
                    })}
                </ListArea>

                <ExpertAppointmentModal
                    service={selectedAppointment.service}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    expertInfo={selectedAppointment.expert}
                    appointment={selectedAppointment}
                />

                {/* {appointmentsList.length > 0 &&
                    appointmentsList.map((appointment, key) => {
                        const [date, hour] = appointment.date.split('T');
                        return (
                            <Area key={key}>
                                <Avatar source={{
                                    uri: appointment.expert.avatar
                                }} />
                                <InfoArea>
                                    <CardHeader>
                                        <UserName>{appointment.expert.name}</UserName>
                                        <RemoveAppointmentButton
                                            onPress={() => handleRemoveAppointmentButton(appointment.id, key)}
                                        >
                                            <TrashIcon width="20" height="20" fill={configs.colors['red-wine']} />
                                        </RemoveAppointmentButton>
                                    </CardHeader>
                                    <ServiceName>{appointment.service.name}</ServiceName>
                                    <Date>{`Data: ${date.replace('-', '/').replace('-', '/')} ${hour}`}</Date>
                                    <SeeProfileButton>
                                        <SeeProfileButtonText>Detalhes</SeeProfileButtonText>
                                    </SeeProfileButton>
                                </InfoArea>
                            </Area>
                        )
                    })
                } */}
            </Scroller>
        </Screen>
    );
};
Appointments.displayName = 'Appointments';
export default Appointments;

