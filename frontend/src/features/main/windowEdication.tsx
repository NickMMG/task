import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import {
  changeEdicationMain,
  createEdicationMain,
  loadEdicationMain,
  removeEdicationMain,
} from './mainSlice';
import Edication from './types/Edication';

function WindowEdication(): JSX.Element {
  const [addCard, setAddCard] = useState(false);
  const [changeCard, setChangeCard] = useState(false);
  const [modalChange, setModalChange] = useState(false);
  const [removeCard, setRemoveCard] = useState(false);
  const [edication, setEdication] = useState('');
  const [id, setId] = useState(0);
  const dispath = useAppDispatch();
  const list = useSelector((state: RootState) => state.main.edicationList);
  const error = useSelector((state: RootState) => state.main.error);

  const addCardFn = () => {
    setAddCard((prev) => !prev);
    setChangeCard(false);
    setRemoveCard(false);
  };
  const changeCardFn = () => {
    setChangeCard((prev) => !prev);
    setAddCard(false);
    setRemoveCard(false);
  };
  const removeCardFn = () => {
    setRemoveCard((prev) => !prev);
    setAddCard(false);
    setChangeCard(false);
  };
  const handleAddEdication: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setEdication(event.target.value);
  };

  const onCreateEdication: React.FormEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();
    dispath(createEdicationMain(edication));
    setAddCard(false);
    setEdication('');
  };

  const onChangeEdication: React.FormEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();
    dispath(changeEdicationMain({ id: id, content: edication }));
    setModalChange(false);
    setEdication('');
  };

  const handleChangeCard = (el: Edication) => {
    setModalChange((prev) => !prev);
    setEdication(el.content);
    setId(el.id);
  };

  const handleResetChange = () => {
    setModalChange(false);
    setEdication('');
  };

  const handleRemoveCard = (id: number) => {
    dispath(removeEdicationMain(id));
  };
  useEffect(() => {
    dispath(loadEdicationMain());
  }, [dispath]);

  return (
    <div className="Table">
      <div className="btn">
        <button
          onClick={addCardFn}
          className={addCard ? 'AddCardTrue' : 'AddCardFalse'}
        >
          Добавить
        </button>
        <button
          onClick={changeCardFn}
          className={changeCard ? 'ChangeCardTrue' : 'ChangeCardFalse'}
        >
          Изменить
        </button>
        <button
          onClick={removeCardFn}
          className={removeCard ? 'RemoveCardTrue' : 'RemoveCardFalse'}
        >
          Удалить
        </button>
      </div>
      <div className="mainTable">
        <Table striped bordered hover variant="dark" className="myTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Образование</th>
            </tr>
          </thead>
          <tbody>
            {list.map((el) => (
              <tr
                key={el.id}
                onClick={
                  changeCard
                    ? () => handleChangeCard(el)
                    : removeCard
                    ? () => handleRemoveCard(el.id)
                    : undefined
                }
              >
                <td>{el.id}</td>
                <td>{el.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {modalChange && (
          <Modal show={modalChange} onHide={handleResetChange}>
            <Modal.Header closeButton>
              <Modal.Title>Изменить образование</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={onChangeEdication}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">
                    Образование
                  </Form.Label>
                  <Form.Control
                    id="disabledTextInput"
                    placeholder="Образование"
                    defaultValue={edication}
                    onChange={handleAddEdication}
                  />
                </Form.Group>
                <Button type="submit">Изменить</Button>
              </Form>
            </Modal.Body>
          </Modal>
        )}

        {addCard && (
          <>
            <Modal show={addCard} onHide={addCardFn}>
              <Modal.Header closeButton>
                <Modal.Title>Добавить образование</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={onCreateEdication}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">
                      Образование
                    </Form.Label>
                    <Form.Control
                      id="disabledTextInput"
                      placeholder="Образование"
                      value={edication}
                      onChange={handleAddEdication}
                    />
                  </Form.Group>
                  <Button type="submit">Добавить</Button>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
      {error && <div>Удаление невозможно</div>}
    </div>
  );
}

export default WindowEdication;
