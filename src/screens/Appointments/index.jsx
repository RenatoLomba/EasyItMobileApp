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

const Appointments = () => {
    const { state: userState, dispatch: userDispatcher } = useContext(UserContext);
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    useState(() => {
        setShowLoading(true);
        setAppointmentsList(userState.appointments);
        setShowLoading(false);
    }, []);

    const handleRemoveAppointmentButton = async (id, key) => {
        setShowLoading(true);
        try {
            const response = await Api.removeAppointment(id);
            if (response) {
                let appointments = [...userState.appointments];
                // appointments.slice(key, 1);
                appointments.splice(appointments.findIndex(v => v.id === id));

                setAppointmentsList(appointments);

                userDispatcher({
                    type: 'setAppointments',
                    payload: {
                        appointments
                    }
                });
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
                                            <TrashIcon width="20" height="20" fill="#f50045" />
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

