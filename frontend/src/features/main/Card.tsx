import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { changeEmployeeMain, removeEmployeeMain } from './mainSlice';
import OneCard from './types/OneCard';

type oneCardProps = {
  card: OneCard;
  changeCard: boolean;
  removeCard: boolean;
};

function Card({ card, changeCard, removeCard }: oneCardProps): JSX.Element {
  const [modalChange, setModalChange] = useState(false);
  const [edicationText, setEdicationText] = useState('не выбрано');
  const [nameLast, setNameLast] = useState('');
  const dispath = useAppDispatch();
  const listEdication = useSelector(
    (state: RootState) => state.main.edicationList,
  );

  const handleChangeCard = () => {
    setModalChange((prev) => !prev);
    setNameLast(card.name);
    setEdicationText(card.edication.content);
  };
  const handleRemoveCard = () => {
    dispath(removeEmployeeMain(card.id));
  };

  const handleChangeNameLast: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setNameLast(event.target.value);
  };

  const handleChangeEdication: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    setEdicationText(event.target.value);
  };

  const handleResetChange = () => {
    setModalChange(false);
    setEdicationText('не выбрано');
    setNameLast('');
  };

  const onChangeEdication: React.FormEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();
    const id = listEdication.find((el) => el.content === edicationText)?.id;
    dispath(
      changeEmployeeMain({
        id: card.id,
        name: nameLast,
        edication_id: id!,
        edication: { id: id!, content: edicationText },
      }),
    );
    handleResetChange();
  };

  return (
    <>
      <tr
        onClick={
          changeCard
            ? handleChangeCard
            : removeCard
            ? handleRemoveCard
            : undefined
        }
      >
        <td>{card.id}</td>
        <td>{card.name}</td>
        <td>{card.edication.content}</td>
      </tr>
      {modalChange && (
        <Modal show={modalChange} onHide={handleResetChange}>
          <Modal.Header closeButton>
            <Modal.Title>Изменить карточку</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onChangeEdication}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">ФИО</Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  placeholder="Disabled input"
                  defaultValue={nameLast}
                  onChange={handleChangeNameLast}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Образование</Form.Label>
                <Form.Select
                  id="disabledSelect"
                  defaultValue={edicationText}
                  onChange={handleChangeEdication}
                >
                  {[{ id: 0, content: 'не выбрано' }, ...listEdication].map(
                    (el) => (
                      <option key={el.id}>{el.content}</option>
                    ),
                  )}
                </Form.Select>
              </Form.Group>
              {edicationText === 'не выбрано' ? (
                <Button type="submit" disabled>
                  Сохранить
                </Button>
              ) : (
                <Button type="submit">Сохранить</Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default Card;
