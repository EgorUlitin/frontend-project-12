import React, { useEffect, useRef } from 'react';
import { useAppSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import {
  Modal, Button, FormLabel, Form,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { useApi } from '../../contexts/ApiProvider';

import { channelsSelector, dataModalSelector } from '../../slices';

const RenameChannelModal = ({ onHide }: { onHide: () => void }) => {
  const { apiRenameChannel } = useApi();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const existingChannelName = useAppSelector(channelsSelector).map(({ name }) => name);
  const currentChannelId = useAppSelector(dataModalSelector);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const onSubmit = ({ name }: { name: string }) => {
    apiRenameChannel({ name, id: currentChannelId });
    onHide();
  };

  return (
    <Modal
      show
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.renameChannelModal.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={object({
            name: string()
              .min(3, t<string>('modals.erorrs.min'))
              .max(20, t<string>('modals.erorrs.max'))
              .notOneOf(existingChannelName, t<string>('modals.erorrs.notOneOf'))
              .required(t<string>('modals.erorrs.required')),
          })}
          onSubmit={onSubmit}
          values
          errors
          isValid
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Control
                name="name"
                id="name"
                className="mb-2"
                onChange={handleChange}
                value={values.name}
                ref={inputRef}
                isInvalid={!!(touched.name && errors.name)}
              />
              <FormLabel
                htmlFor="name"
                className="visually-hidden"
              >
                {t('modals.renameChannelModal.lable')}
              </FormLabel>
              <Form.Control.Feedback type="invalid">
                {!isValid && errors.name}
              </Form.Control.Feedback>
              <div className="d-flex justify-content-end">
                <Button className="me-2 btn-secondary" onClick={onHide}>{t('modals.renameChannelModal.cancel')}</Button>
                <Button type="submit" className="btn-primary">{t('modals.renameChannelModal.send')}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
