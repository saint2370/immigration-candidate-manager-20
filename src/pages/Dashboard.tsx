
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CalendarDays, Clock, Flag, Users, AlertTriangle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatCard from '@/components/dashboard/StatCard';
import DeadlineCard from '@/components/dashboard/DeadlineCard';
import StatusChart from '@/components/dashboard/StatusChart';
import CandidateTable from '@/components/dashboard/CandidateTable';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    activeCases: 0,
    completedCases: 0,
    pendingDocuments: 0
  });
  
  const [recentCandidates, setRecentCandidates] = useState<any[]>([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch total candidates
        const { count: totalCount } = await supabase
          .from('candidates')
          .select('*', { count: 'exact', head: true });
        
        // Fetch active cases (status = 'En cours' or 'En attente')
        const { count: activeCount } = await supabase
          .from('candidates')
          .select('*', { count: 'exact', head: true })
          .in('status', ['En cours', 'En attente']);
        
        // Fetch completed cases (status = 'Approuvé' or 'Complété')
        const { count: completedCount } = await supabase
          .from('candidates')
          .select('*', { count: 'exact', head: true })
          .in('status', ['Approuvé', 'Complété']);
        
        // Set statistics
        setStats({
          totalCandidates: totalCount || 0,
          activeCases: activeCount || 0,
          completedCases: completedCount || 0,
          pendingDocuments: 12 // Hardcoded for now as an example
        });
        
        // Fetch recent candidates
        const { data: recentData } = await supabase
          .from('candidates')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (recentData) {
          setRecentCandidates(recentData.map(candidate => ({
            id: candidate.id,
            name: `${candidate.prenom} ${candidate.nom}`,
            nationality: candidate.nationalite,
            visaType: candidate.visa_type,
            submissionDate: format(new Date(candidate.date_soumission), 'dd MMMM yyyy', { locale: fr }),
            status: candidate.status,
            bureau: candidate.bureau,
            identificationNumber: candidate.identification_number
          })));
        }

        // For illustration, let's create some upcoming deadlines
        setUpcomingDeadlines([
          {
            id: 1,
            candidate: "Marie Dupont",
            deadline: "28 Nov 2023",
            description: "Date limite pour documents additionnels",
            daysLeft: 3,
            type: "warning"
          },
          {
            id: 2,
            candidate: "Jean Martin",
            deadline: "5 Dec 2023",
            description: "Expiration du permis de travail",
            daysLeft: 10,
            type: "danger"
          },
          {
            id: 3,
            candidate: "Sophie Tremblay",
            deadline: "15 Dec 2023",
            description: "Entrevue programmée",
            daysLeft: 20,
            type: "info"
          }
        ]);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Distribution by visa type data
  const visaTypeData = [
    { name: 'Travail', value: 35 },
    { name: 'Visiteur', value: 40 },
    { name: 'Résidence Permanente', value: 25 }
  ];
  
  // Distribution by country/nationality data
  const nationalityData = [
    { name: 'France', value: 20 },
    { name: 'Maroc', value: 15 },
    { name: 'Algérie', value: 12 },
    { name: 'Tunisie', value: 10 },
    { name: 'Côte d\'Ivoire', value: 8 },
    { name: 'Sénégal', value: 7 },
    { name: 'Cameroun', value: 6 },
    { name: 'Autres', value: 22 }
  ];
  
  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF6B6B', '#4ECDC4', '#9B88CB'];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1">Vue d'ensemble de vos dossiers de candidats</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button className="bg-red-700 hover:bg-red-800">
            Ajouter un candidat
          </Button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total des candidats" 
          value={stats.totalCandidates}
          icon={<Users className="h-6 w-6 text-blue-600" />}
          description="Tous dossiers confondus"
          trend="up"
          trendValue="12%"
        />
        
        <StatCard 
          title="Dossiers actifs" 
          value={stats.activeCases}
          icon={<Clock className="h-6 w-6 text-yellow-600" />}
          description="En cours de traitement"
          trend="up"
          trendValue="5%"
        />
        
        <StatCard 
          title="Dossiers complétés" 
          value={stats.completedCases}
          icon={<Flag className="h-6 w-6 text-green-600" />}
          description="Approuvés ou terminés"
          trend="up"
          trendValue="8%"
        />
        
        <StatCard 
          title="Documents en attente" 
          value={stats.pendingDocuments}
          icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
          description="Nécessitant une attention"
          trend="down"
          trendValue="3%"
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Répartition par statut</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <StatusChart />
          </CardContent>
        </Card>
        
        {/* Visa Type Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Répartition par type de visa</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={visaTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {visaTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} dossiers`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Nationality Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Répartition par nationalité</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={nationalityData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value) => `${value} dossiers`} />
                <Bar dataKey="value" fill="#8884d8" barSize={20} radius={[0, 4, 4, 0]}>
                  {nationalityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Updates & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Updates Table */}
        <div className="lg:col-span-2">
          <CandidateTable 
            candidates={recentCandidates} 
            title="Dossiers récemment mis à jour" 
          />
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="flex items-center">
              Voir tous les candidats
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-red-700" />
                <span>Dates limites à venir</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <DeadlineCard 
                  key={deadline.id}
                  candidateName={deadline.candidate}
                  deadline={deadline.deadline}
                  description={deadline.description}
                  daysLeft={deadline.daysLeft}
                  type={deadline.type}
                />
              ))}
              
              <Button variant="outline" className="w-full flex items-center justify-center mt-4">
                Voir toutes les échéances
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
