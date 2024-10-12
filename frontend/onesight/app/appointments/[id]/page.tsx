'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppointmentPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchAppointment(id: string) {
      try {
        const res = await fetch(`http://localhost:8080/api/appointments/${id}`);
        const appointment = await res.json();

        setTitle(appointment.title)
        setDescription(appointment.description)
        setDate(appointment.dateTime)
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchAppointment(params.id);

  }, [params.id]);

  if (error) return <div>Error: {error}</div>;
  if (!title) return <div>Loading...</div>;

  const handleSave = async () => {
    await fetch(`http://localhost:8080/api/appointments/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        dateTime: date,
      }),
    });
    alert('Appointment updated');
    router.push('/appointments');
  };

  const handleListAppointment = () => {
    router.push('/appointments');
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-600 mb-6 text-center">Editar Compromisso</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border text-gray-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border text-gray-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Data:</label>
          <input
            type="datetime"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border text-gray-600 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-2 justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => handleListAppointment()}>
            Voltar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
