
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarCheck, Clock, FolderOpen, Users } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import StatusChart from '@/components/dashboard/StatusChart';
import CandidateTable from '@/components/dashboard/CandidateTable';
import DeadlineCard from '@/components/dashboard/DeadlineCard';

// Sample data for the dashboard
const statusChartData = [
  { name: 'En cours', value: 32, color: '#0E65C9' },
  { name: 'En attente', value: 18, color: '#FFC107' },
  { name: 'Approuvé', value: 45, color: '#4CAF50' },
  { name: 'Rejeté', value: 5, color: '#F44336' },
];

const visaTypeChartData = [
  { name: 'Travail', value: 40, color: '#3F51B5' },
  { name: 'Visiteur', value: 35, color: '#FF9800' },
  { name: 'Résidence Permanente', value: 25, color: '#9C27B0' },
];

// Transform recentCandidates to match the expected Candidate interface
const recentCandidates = [
  {
    id: '1', 
    name: 'Jean Tremblay', 
    nationality: 'France', 
    visaType: 'Travail', 
    submissionDate: '2023-05-15', 
    status: 'En cours', 
    bureau: 'Paris',
    identificationNumber: 'IMM-2023-A1B2C3'
  },
  {
    id: '2', 
    name: 'Raj Patel', 
    nationality: 'Inde', 
    visaType: 'Résidence Permanente', 
    submissionDate: '2023-06-10', 
    status: 'En attente', 
    bureau: 'New Delhi',
    identificationNumber: 'IMM-2023-D4E5F6'
  },
  {
    id: '3', 
    name: 'Ana Martinez', 
    nationality: 'Mexique', 
    visaType: 'Visiteur', 
    submissionDate: '2023-07-25', 
    status: 'Approuvé', 
    bureau: 'Mexico',
    identificationNumber: 'IMM-2023-G7H8I9'
  },
  {
    id: '4', 
    name: 'Wei Chen', 
    nationality: 'Chine', 
    visaType: 'Travail', 
    submissionDate: '2023-08-05', 
    status: 'En cours', 
    bureau: 'Beijing',
    identificationNumber: 'IMM-2023-J0K1L2'
  },
  {
    id: '5', 
    name: 'Marta Kowalski', 
    nationality: 'Pologne', 
    visaType: 'Résidence Permanente', 
    submissionDate: '2023-09-18', 
    status: 'En cours', 
    bureau: 'Warsaw',
    identificationNumber: 'IMM-2023-M3N4O5'
  }
];

const upcomingDeadlines = [
  {
    id: '1',
    candidateName: 'Jean Tremblay',
    deadline: '2023-12-15',
    description: 'Expiration du permis de travail',
    daysLeft: 14,
    type: 'Travail'
  },
  {
    id: '2',
    candidateName: 'Ana Martinez',
    deadline: '2023-12-18',
    description: 'Date limite pour soumission des documents',
    daysLeft: 17,
    type: 'Visiteur'
  },
  {
    id: '3',
    candidateName: 'Raj Patel',
    deadline: '2023-12-05',
    description: 'Entrevue au bureau d\'immigration',
    daysLeft: 4,
    type: 'Résidence Permanente'
  },
  {
    id: '4',
    candidateName: 'Wei Chen',
    deadline: '2023-11-30',
    description: 'Date d\'expiration du visa',
    daysLeft: -1,
    type: 'Travail'
  }
];

const Dashboard = () => {
  // These stats would typically come from API calls
  const statCards = [
    {
      title: "Total de candidats",
      icon: <Users className="h-5 w-5 text-white" />,
      value: "586",
      description: "Augmentation de 12% depuis le mois dernier",
      trend: { value: "12%", isPositive: true },
      color: "bg-ircc-blue",
    },
    {
      title: "Dossiers actifs",
      icon: <FolderOpen className="h-5 w-5 text-white" />,
      value: "423",
      description: "68 nouveaux dossiers ce mois-ci",
      trend: { value: "68", isPositive: true },
      color: "bg-[#FB8C00]", // Orange
    },
    {
      title: "Temps moyen de traitement",
      icon: <Clock className="h-5 w-5 text-white" />,
      value: "47 jours",
      description: "Augmentation de 3 jours par rapport à la normale",
      trend: { value: "3 jours", isPositive: false },
      color: "bg-[#E53935]", // Red
    },
    {
      title: "Dossiers complétés",
      icon: <CalendarCheck className="h-5 w-5 text-white" />,
      value: "163",
      description: "12% de plus que le mois dernier",
      trend: { value: "12%", isPositive: true },
      color: "bg-[#43A047]", // Green
    },
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            icon={stat.icon}
            value={stat.value}
            description={stat.description}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status distribution chart */}
        <StatusChart 
          data={statusChartData} 
          title="Répartition par status"
        />

        {/* Visa type distribution chart */}
        <StatusChart 
          data={visaTypeChartData} 
          title="Répartition par type de visa"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent candidates */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Candidats récents</CardTitle>
            <CardDescription>
              Les 5 dossiers les plus récemment mis à jour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CandidateTable candidates={recentCandidates} title="Candidats récents" />
          </CardContent>
        </Card>

        {/* Upcoming deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Échéances à venir</CardTitle>
            <CardDescription>
              Prochaines dates importantes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <DeadlineCard
                key={deadline.id}
                candidateName={deadline.candidateName}
                deadline={deadline.deadline}
                description={deadline.description}
                daysLeft={deadline.daysLeft}
                type={deadline.type}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
