'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Appointment = {
  id: number;
  title: string;
  description: string;
  dateTime: string;
};

async function fetchAppointments(): Promise<Appointment[]> {
  const res = await fetch('http://localhost:8080/api/appointments');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadAppointments() {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (err) {
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    }

    loadAppointments();
  }, []);

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`http://localhost:8080/api/appointments/${id}`, {
        method: 'DELETE',
      });
      router.push('/appointments');
      if (!res.ok) throw new Error('Failed to delete appointment');
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleNewAppointment = () => {
    router.push('/appointments/new');
  };

  const handleEditAppointment = (id: number) => {
    router.push(`/appointments/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Your Appointments</h1>
        <button
          onClick={handleNewAppointment}
          className="text-sm bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          New Appointment
        </button>
      </div>

      <ul className="space-y-4">
        {appointments.map((appointment) => (
          <li key={appointment.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-600">{appointment.title}</h2>
              <p className="text-gray-600">Description: {appointment.description}</p>
              <p className="text-gray-600">Date: {appointment.dateTime}</p>
            </div>
            <div className="flex space-x-2">
              <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => handleEditAppointment(appointment.id)}>
                Edit
              </button>
              <button className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => handleDelete(appointment.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
