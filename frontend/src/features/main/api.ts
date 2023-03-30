import AddEmployee from './types/AddEmployee';
import Edication from './types/Edication';
import OneCard from './types/OneCard';

export async function loadEmployee() {
  try {
    const data = await fetch('api/Employee');
    return data.json();
  } catch (message) {
    console.error(message);
  }
}
export async function loadEdication() {
  try {
    const data = await fetch('api/Edication');
    return data.json();
  } catch (message) {
    console.error(message);
  }
}

export async function createEdication(content: string): Promise<Edication> {
  try {
    const res = await fetch('/api/Edication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    });
    return res.json();
  } catch (message) {
    console.error(message);
    throw message;
  }
}

export async function createEmployee(AddCard: AddEmployee): Promise<OneCard> {
  try {
    const res = await fetch('/api/Employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ AddCard }),
    });
    return res.json();
  } catch (message) {
    console.error(message);
    throw message;
  }
}

export async function updateEdication(
  changeEdication: Edication,
): Promise<void> {
  try {
    const res = await fetch(
      `/api/Edication/${changeEdication.id}/update-cards`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changeEdication }),
      },
    );
    return res.json();
  } catch (message) {
    console.error(message);
  }
}

export async function updateEmployee(changeEmployee: OneCard): Promise<void> {
  try {
    const res = await fetch(`/api/Employee/${changeEmployee.id}/update-cards`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ changeEmployee }),
    });
    return res.json();
  } catch (message) {
    console.error(message);
  }
}

export async function removeEmployee(id: number): Promise<void> {
  try {
    const data = await fetch(`api/Employee/${id}`, { method: 'delete' });
    return data.json();
  } catch (message) {
    console.error(message);
  }
}

export async function removeEdication(
  id: number,
): Promise<{ error: string; id: number }> {
  try {
    const data = await fetch(`api/Edication/${id}`, { method: 'delete' });
    if (data.status >= 400) {
      const { error } = await data.json();
      throw error;
    }
    return data.json();
  } catch (message) {
    console.error(message);
    throw message;
  }
}
