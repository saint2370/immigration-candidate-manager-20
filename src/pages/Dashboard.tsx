
import { 
  Users, Briefcase, Plane, CreditCard, 
  Clock, AlertCircle 
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import StatusChart from '@/components/dashboard/StatusChart';
import CandidateTable from '@/components/dashboard/CandidateTable';
import DeadlineCard from '@/components/dashboard/DeadlineCard';
import { Button } from '@/components/ui/button';

// Mock data
const statusData = [
  { name: 'En cours', value: 42, color: '#3B82F6' },
  { name: 'Approuvé', value: 25, color: '#10B981' },
  { name: 'En attente', value: 18, color: '#F59E0B' },
  { name: 'Rejeté', value: 5, color: '#EF4444' },
  { name: 'Complété', value: 10, color: '#8B5CF6' }
];

const visaTypeData = [
  { name: 'Travail', value: 38, color: '#3B82F6' },
  { name: 'Visiteur', value: 27, color: '#F59E0B' },
  { name: 'Résidence', value: 35, color: '#10B981' }
];

const deadlines = [
  { 
    id: '1', 
    candidateName: 'Jean Dupont', 
    document: 'Permis de travail - Renouvellement', 
    dueDate: '20 mai 2023', 
    daysLeft: 2 
  },
  { 
    id: '2', 
    candidateName: 'Marie Lambert', 
    document: 'Visa visiteur - Documents complémentaires', 
    dueDate: '25 mai 2023', 
    daysLeft: 7 
  },
  { 
    id: '3', 
    candidateName: 'Ahmed Hassan', 
    document: 'Résidence permanente - Examen médical', 
    dueDate: '3 juin 2023', 
    daysLeft: 16 
  }
];

const recentCandidates = [
  {
    id: '1',
    name: 'Sophie Martin',
    nationality: 'France',
    visaType: 'Travail',
    submissionDate: '12 avril 2023',
    status: 'En cours',
    bureau: 'Paris'
  },
  {
    id: '2',
    name: 'Mohamed Ali',
    nationality: 'Maroc',
    visaType: 'Visiteur',
    submissionDate: '5 avril 2023',
    status: 'En attente',
    bureau: 'Rabat'
  },
  {
    id: '3',
    name: 'John Smith',
    nationality: 'USA',
    visaType: 'Résidence Permanente',
    submissionDate: '2 avril 2023',
    status: 'Approuvé',
    bureau: 'New York'
  },
  {
    id: '4',
    name: 'Aisha Patel',
    nationality: 'Inde',
    visaType: 'Travail',
    submissionDate: '28 mars 2023',
    status: 'En cours',
    bureau: 'Mumbai'
  },
  {
    id: '5',
    name: 'Carlos Rodriguez',
    nationality: 'Mexique',
    visaType: 'Résidence Permanente',
    submissionDate: '25 mars 2023',
    status: 'Rejeté',
    bureau: 'Mexico'
  },
  {
    id: '6',
    name: 'Yuki Tanaka',
    nationality: 'Japon',
    visaType: 'Visiteur',
    submissionDate: '20 mars 2023',
    status: 'Complété',
    bureau: 'Tokyo'
  },
  {
    id: '7',
    name: 'Elena Petrova',
    nationality: 'Russie',
    visaType: 'Travail',
    submissionDate: '15 mars 2023',
    status: 'En attente',
    bureau: 'Moscou'
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tableau de bord</h2>
          <p className="text-gray-500 mt-1">Vue d'ensemble de vos candidats et demandes</p>
        </div>
        <Button className="bg-ircc-blue hover:bg-ircc-dark-blue btn-hover">
          Ajouter un candidat
        </Button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total des candidats" 
          value="120" 
          icon={<Users size={20} className="text-ircc-blue" />}
          trend={{ value: "12%", isPositive: true }}
          description="vs mois précédent"
        />
        <StatCard 
          title="Visas Travail" 
          value="45" 
          icon={<Briefcase size={20} className="text-blue-500" />}
          description="38% du total"
        />
        <StatCard 
          title="Visas Visiteur" 
          value="32" 
          icon={<Plane size={20} className="text-yellow-500" />}
          description="27% du total"
        />
        <StatCard 
          title="Résidence Permanente" 
          value="43" 
          icon={<CreditCard size={20} className="text-green-500" />}
          description="35% du total"
        />
      </div>
      
      {/* Middle section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CandidateTable candidates={recentCandidates} title="Candidats récents" />
        </div>
        <div>
          <DeadlineCard deadlines={deadlines} />
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusChart data={statusData} title="Répartition par statut" />
        <StatusChart data={visaTypeData} title="Répartition par type de visa" />
      </div>
      
      {/* Alerts */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start animate-slide-up">
        <AlertCircle size={20} className="text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-orange-800">Attention</h4>
          <p className="text-sm text-orange-700 mt-1">
            5 candidats ont des documents qui expireront dans les 30 prochains jours. 
            <a href="#" className="underline ml-1 font-medium">Consulter la liste</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
