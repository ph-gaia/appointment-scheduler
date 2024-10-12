<?php

namespace App\Controller;

use App\Entity\Appointments;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AppointmentsController extends AbstractController
{
    #[Route('/api/appointments', name: 'get_appointments', methods: ['GET'])]
    public function getAppointments(EntityManagerInterface $em): JsonResponse
    {
        $appointments = $em->getRepository(Appointments::class)->findAll();
        return $this->json($appointments);
    }

    #[Route('/api/appointments/{id}', name: 'get_appointment', methods: ['GET'])]
    public function getAppointment(EntityManagerInterface $em, $id): JsonResponse
    {
        $appointment = $em->getRepository(Appointments::class)->find($id);
        if (!$appointment) {
            return $this->json(['message' => 'Appointment not found'], 404);
        }
        return $this->json($appointment);
    }

    #[Route('/api/appointments', name: 'create_appointment', methods: ['POST'])]
    public function createAppointment(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $appointment = new Appointments();
        $appointment->setTitle($data['title']);
        $appointment->setDescription($data['description']);
        $appointment->setDateTime(new \DateTime($data['dateTime']));

        $em->persist($appointment);
        $em->flush();

        return $this->json($appointment, 201);
    }

    #[Route('/api/appointments/{id}', name: 'update_appointment', methods: ['PUT'])]
    public function updateAppointment(Request $request, EntityManagerInterface $em, $id): JsonResponse
    {
        $appointment = $em->getRepository(Appointments::class)->find($id);
        if (!$appointment) {
            return $this->json(['message' => 'Appointment not found'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $appointment->setTitle($data['title'] ?? $appointment->getTitle());
        $appointment->setDescription($data['description'] ?? $appointment->getDescription());
        $appointment->setDateTime(new \DateTime($data['dateTime']) ?? $appointment->getDateTime());

        $em->flush();

        return $this->json($appointment);
    }

    #[Route('/api/appointments/{id}', name: 'delete_appointment', methods: ['DELETE'])]
    public function deleteAppointment(EntityManagerInterface $em, $id): JsonResponse
    {
        $appointment = $em->getRepository(Appointments::class)->find($id);
        if (!$appointment) {
            return $this->json(['message' => 'Appointment not found'], 404);
        }

        $em->remove($appointment);
        $em->flush();

        return $this->json(['message' => 'Appointment deleted']);
    }
}
