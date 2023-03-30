import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import Card from './Card';
import {
  createEmployeeMain,
  loadEdicationMain,
  loadEmployeeMain,
} from './mainSlice';
import WindowEdication from './windowEdication';

function Main(): JSX.Element {
  const [changeCard, setChangeCard] = useState(false);
  const [removeCard, setRemoveCard] = useState(false);
  const [window, setWindow] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [edicationText, setEdicationText] = useState('не выбрано');
  const [nameLast, setNameLast] = useState('');
  const dispath = useAppDispatch();
  const listEdication = useSelector(
    (state: RootState) => state.main.edicationList,
  );
  const list = useSelector((state: RootState) => state.main.employeeList);

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
  const openAndCloseWimdow = () => {
    setWindow((prev) => !prev);
  };
  const addCardFn = () => {
    setAddCard((prev) => !prev);
    setChangeCard(false);
    setRemoveCard(false);
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

  const onCreateEdication: React.FormEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();
    dispath(createEmployeeMain({ nameLast, edicationText }));
    setAddCard(false);
    setEdicationText('не выбрано');
    setNameLast('');
  };

  useEffect(() => {
    dispath(loadEmployeeMain());
  }, [dispath, listEdication]);

  useEffect(() => {
    dispath(loadEdicationMain());
  }, [dispath]);

  return (
    <div className="Table">
      <div className="btn">
        <button
          onClick={openAndCloseWimdow}
          className={window ? 'WindowCardTrue' : 'WindowCardFalse'}
        >
          Редактор образования
        </button>
        <button
          onClick={addCardFn}
          className={addCard ? 'AddTrue' : 'AddFalse'}
        >
          Добавить
        </button>
        <button
          onClick={changeCardFn}
          className={changeCard ? 'ChangeTrue' : 'ChangeFalse'}
        >
          Изменить
        </button>
        <button
          onClick={removeCardFn}
          className={removeCard ? 'RemoveTrue' : 'RemoveFalse'}
        >
          Удалить
        </button>
      </div>
      <div className="mainTable">
        <Table striped bordered hover variant="dark" className="myTable">
          <thead>
            <tr>
              <th>#</th>
              <th>ФИО</th>
              <th>Образование</th>
            </tr>
          </thead>
          <tbody>
            {list.map((el) => (
              <Card
                key={el.id}
                card={el}
                changeCard={changeCard}
                removeCard={removeCard}
              />
            ))}
          </tbody>
        </Table>
        {addCard && (
          <>
            <Modal show={addCard} onHide={addCardFn}>
              <Modal.Header closeButton>
                <Modal.Title>Добавить карточку</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={onCreateEdication}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">ФИО</Form.Label>
                    <Form.Control
                      id="disabledTextInput"
                      placeholder="ФИО"
                      value={nameLast}
                      onChange={handleChangeNameLast}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledSelect">
                      Образование
                    </Form.Label>
                    <Form.Select
                      id="disabledSelect"
                      value={edicationText}
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
                      Добавить
                    </Button>
                  ) : (
                    <Button type="submit">Добавить</Button>
                  )}
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
      {window && <WindowEdication />}
    </div>
  );
}

export default Main;
