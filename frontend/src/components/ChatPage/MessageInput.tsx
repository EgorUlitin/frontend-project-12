import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Form, InputGroup, Button } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useAuth } from '../../contexts/AuthProvider';
import { useApi } from '../../contexts/ApiProvider';
import { currentChannelIdSelector } from '../../slices';

const schema = yup.object().shape({
  message: yup.string().min(1).required(),
});

const MessageInput = () => {
  const [isDisabled, toggleDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const { user: { username } } = useAuth();
  const { createNewMessage } = useApi();
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const currentChannelId: number = useAppSelector(currentChannelIdSelector);

  const handleChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    schema.validate({ message: value })
      .then(() => toggleDisabled(false))
      .catch(() => toggleDisabled(true));

    setMessage(filter.clean(value));
  };

  const handleSubmit = () => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message) {
      const data = { body: message, channelId: currentChannelId, username };
      createNewMessage(data);
      setMessage('');
      toggleDisabled(true);
    }

    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit()} noValidate className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            id="message"
            name="message"
            value={message}
            onChange={handleChange()}
            ref={inputRef}
            className="border-0 p-0 ps-2 form-control"
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
          />
          <Button disabled={isDisabled} type="submit" className="btn-group-vertical border-0" variant="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
            <span className="visually-hidden">{t('messageInput.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageInput;
