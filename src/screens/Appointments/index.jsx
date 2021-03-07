import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text } from 'react-native';
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
    RemoveAppointmentButton,
    LoadingIcon
} from './styles';

import Api from '../../Api';
import TrashIcon from '../../assets/trash.svg';

import configs from '../../appconfigs.json';

const Appointments = () => {
    const { userAppointments, appointmentsDispatch } = useContext(UserContext);
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        setAppointmentsList(userAppointments);
        setShowLoading(false);
    }, []);

    useEffect(() => {
        setShowLoading(true);
        setAppointmentsList(userAppointments);
        setShowLoading(false);
    }, [userAppointments])

    const handleRemoveAppointmentButton = async (id, key) => {
        setShowLoading(true);
        try {
            const response = await Api.removeAppointment(id);
            if (response) {
                let appointments = [...userAppointments];
                // appointments.slice(key, 1);
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

    return (
        <Container>
            <Scroller>
                <Header>
                    <HeaderText>Agendamentos</HeaderText>
                </Header>

                {showLoading && <LoadingIcon size="large" color="#fff" />}

                {appointmentsList.length > 0 &&
                    appointmentsList.map((appointment, key) => {
                        const [date, hour] = appointment.date.split('T');
                        // console.log(date, hour);
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
                }
            </Scroller>
        </Container>
    );
};
Appointments.displayName = 'Appointments';
export default Appointments;

