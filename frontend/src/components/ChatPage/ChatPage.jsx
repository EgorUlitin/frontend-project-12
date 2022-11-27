import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';

import { fetchData } from '../../slices/fetchData';

import ChannelList from './ChannelList';
import MessageBox from './MessageBox';

function ChatPage() {
  const dispatch = useDispatch();
  const rollbar = useRollbar();

  useEffect(() => {
    dispatch(fetchData()).catch((error) => rollbar.error('Error on fetchData', error));
  }, [dispatch, rollbar]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelList />
        <MessageBox />
      </Row>
    </Container>
  );
}

export default ChatPage;
