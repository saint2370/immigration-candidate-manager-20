
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronRight, Calculator, CheckCircle2, AlertTriangle, ArrowDown } from 'lucide-react';

const EligibilityCalculator = () => {
  const { language } = useLanguage();
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form schema definition
  const formSchema = z.object({
    age: z.string().min(1, {
      message: language === 'fr' ? 'Veuillez sélectionner votre âge' : 'Please select your age',
    }),
    education: z.string().min(1, {
      message: language === 'fr' ? 'Veuillez sélectionner votre niveau d\'éducation' : 'Please select your education level',
    }),
    frenchLevel: z.string().min(1, {
      message: language === 'fr' ? 'Veuillez sélectionner votre niveau de français' : 'Please select your French level',
    }),
    englishLevel: z.string().min(1, {
      message: language === 'fr' ? 'Veuillez sélectionner votre niveau d\'anglais' : 'Please select your English level',
    }),
    workExperience: z.string().min(1, {
      message: language === 'fr' ? 'Veuillez sélectionner votre expérience de travail' : 'Please select your work experience',
    }),
    canadianFamily: z.string().min(1, {
      message: language === 'fr' ? 'Veuillez répondre à cette question' : 'Please answer this question',
    }),
  });

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: '',
      education: '',
      frenchLevel: '',
      englishLevel: '',
      workExperience: '',
      canadianFamily: '',
    },
  });

  // Calculate eligibility score
  const calculateEligibility = (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      let totalScore = 0;
      
      // Age scoring
      switch (data.age) {
        case '18-24': totalScore += 10; break;
        case '25-30': totalScore += 15; break;
        case '31-35': totalScore += 12; break;
        case '36-40': totalScore += 8; break;
        case '41-45': totalScore += 5; break;
        case '46-50': totalScore += 3; break;
        default: totalScore += 0;
      }
      
      // Education scoring
      switch (data.education) {
        case 'secondary': totalScore += 5; break;
        case 'post-secondary-1': totalScore += 10; break;
        case 'post-secondary-2': totalScore += 15; break;
        case 'bachelor': totalScore += 20; break;
        case 'master': totalScore += 25; break;
        case 'doctorate': totalScore += 30; break;
        default: totalScore += 0;
      }
      
      // Language scoring - French
      switch (data.frenchLevel) {
        case 'none': totalScore += 0; break;
        case 'basic': totalScore += 5; break;
        case 'intermediate': totalScore += 10; break;
        case 'advanced': totalScore += 15; break;
        case 'fluent': totalScore += 20; break;
        default: totalScore += 0;
      }
      
      // Language scoring - English
      switch (data.englishLevel) {
        case 'none': totalScore += 0; break;
        case 'basic': totalScore += 5; break;
        case 'intermediate': totalScore += 10; break;
        case 'advanced': totalScore += 15; break;
        case 'fluent': totalScore += 20; break;
        default: totalScore += 0;
      }
      
      // Work experience scoring
      switch (data.workExperience) {
        case 'none': totalScore += 0; break;
        case '1-2': totalScore += 10; break;
        case '3-5': totalScore += 15; break;
        case '6-10': totalScore += 20; break;
        case '10+': totalScore += 25; break;
        default: totalScore += 0;
      }
      
      // Canadian family scoring
      if (data.canadianFamily === 'yes') {
        totalScore += 15;
      }
      
      // Set result based on score
      setScore(totalScore);
      
      if (totalScore >= 80) {
        setResult('express-entry');
      } else if (totalScore >= 60) {
        setResult('provincial');
      } else if (totalScore >= 40) {
        setResult('other-programs');
      } else {
        setResult('low-eligibility');
      }
      
      setShowResult(true);
      setLoading(false);
    }, 1500);
  };

  // Reset form and results
  const handleReset = () => {
    form.reset();
    setResult(null);
    setScore(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden mb-10">
            <div className="absolute inset-0 bg-opacity-20 bg-pattern"></div>
            <div className="md:flex items-center">
              <div className="p-8 md:p-12 md:w-1/2 relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {language === 'fr' 
                    ? 'Calculateur d\'éligibilité à l\'immigration' 
                    : 'Immigration Eligibility Calculator'}
                </h1>
                <p className="text-blue-100 text-lg mb-6">
                  {language === 'fr' 
                    ? 'Évaluez rapidement vos chances d\'immigrer au Canada en fonction de votre profil personnel et professionnel.' 
                    : 'Quickly assess your chances of immigrating to Canada based on your personal and professional profile.'}
                </p>
                <div className="flex items-center">
                  <Button 
                    className="bg-white text-blue-700 hover:bg-blue-50 flex items-center"
                    onClick={() => document.getElementById('calculator-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {language === 'fr' ? 'Commencer l\'évaluation' : 'Start Assessment'}
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 p-6 md:p-12 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/11a52f19-da3d-40d6-8a0e-e964633eac3a.png" 
                  alt="Immigration to Canada" 
                  className="max-w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Info section */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {language === 'fr' 
                ? 'Comment fonctionne notre calculateur ?' 
                : 'How does our calculator work?'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'fr' 
                ? 'Notre calculateur utilise un algorithme simplifié basé sur les critères de sélection des principaux programmes d\'immigration canadiens. Veuillez noter que cet outil fournit une évaluation préliminaire et ne remplace pas une consultation avec un professionnel de l\'immigration.' 
                : 'Our calculator uses a simplified algorithm based on the selection criteria of the main Canadian immigration programs. Please note that this tool provides a preliminary assessment and does not replace a consultation with an immigration professional.'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Calculator className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="font-medium text-gray-800">
                      {language === 'fr' ? 'Évaluation rapide' : 'Quick Assessment'}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {language === 'fr'
                      ? 'Répondez à quelques questions simples pour obtenir une évaluation de votre éligibilité en moins de 2 minutes.'
                      : 'Answer a few simple questions to get an assessment of your eligibility in less than 2 minutes.'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="font-medium text-gray-800">
                      {language === 'fr' ? 'Programmes recommandés' : 'Recommended Programs'}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {language === 'fr'
                      ? 'Découvrez quels programmes d\'immigration canadiens correspondent le mieux à votre profil.'
                      : 'Discover which Canadian immigration programs best match your profile.'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <AlertTriangle className="h-5 w-5 text-blue-700" />
                    </div>
                    <h3 className="font-medium text-gray-800">
                      {language === 'fr' ? 'Simple estimation' : 'Simple Estimation'}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {language === 'fr'
                      ? 'Notez que ce calculateur fournit une estimation et ne garantit pas l\'approbation de votre demande.'
                      : 'Note that this calculator provides an estimate and does not guarantee approval of your application.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Calculator Form */}
          <div id="calculator-form" className="mb-12 scroll-mt-32">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">
                  {language === 'fr' ? 'Votre profil d\'immigration' : 'Your Immigration Profile'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {language === 'fr' 
                    ? 'Remplissez tous les champs ci-dessous pour évaluer votre éligibilité' 
                    : 'Fill in all fields below to assess your eligibility'}
                </p>
              </div>
              
              <div className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(calculateEligibility)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Age Field */}
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{language === 'fr' ? 'Âge' : 'Age'}</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={language === 'fr' ? 'Sélectionnez votre âge' : 'Select your age'} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="18-24">18-24</SelectItem>
                                <SelectItem value="25-30">25-30</SelectItem>
                                <SelectItem value="31-35">31-35</SelectItem>
                                <SelectItem value="36-40">36-40</SelectItem>
                                <SelectItem value="41-45">41-45</SelectItem>
                                <SelectItem value="46-50">46-50</SelectItem>
                                <SelectItem value="51+">51+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Education Field */}
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'fr' ? 'Niveau d\'études' : 'Education Level'}
                            </FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={language === 'fr' ? 'Sélectionnez votre niveau d\'études' : 'Select your education level'} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="secondary">
                                  {language === 'fr' ? 'Secondaire (lycée)' : 'Secondary (high school)'}
                                </SelectItem>
                                <SelectItem value="post-secondary-1">
                                  {language === 'fr' ? 'Post-secondaire 1 an' : 'Post-secondary 1 year'}
                                </SelectItem>
                                <SelectItem value="post-secondary-2">
                                  {language === 'fr' ? 'Post-secondaire 2-3 ans' : 'Post-secondary 2-3 years'}
                                </SelectItem>
                                <SelectItem value="bachelor">
                                  {language === 'fr' ? 'Baccalauréat (licence)' : 'Bachelor\'s degree'}
                                </SelectItem>
                                <SelectItem value="master">
                                  {language === 'fr' ? 'Maîtrise (master)' : 'Master\'s degree'}
                                </SelectItem>
                                <SelectItem value="doctorate">
                                  {language === 'fr' ? 'Doctorat (PhD)' : 'Doctorate (PhD)'}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* French Level Field */}
                      <FormField
                        control={form.control}
                        name="frenchLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'fr' ? 'Niveau de français' : 'French Level'}
                            </FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={language === 'fr' ? 'Sélectionnez votre niveau' : 'Select your level'} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">
                                  {language === 'fr' ? 'Aucun' : 'None'}
                                </SelectItem>
                                <SelectItem value="basic">
                                  {language === 'fr' ? 'Débutant (A1-A2)' : 'Basic (A1-A2)'}
                                </SelectItem>
                                <SelectItem value="intermediate">
                                  {language === 'fr' ? 'Intermédiaire (B1-B2)' : 'Intermediate (B1-B2)'}
                                </SelectItem>
                                <SelectItem value="advanced">
                                  {language === 'fr' ? 'Avancé (C1)' : 'Advanced (C1)'}
                                </SelectItem>
                                <SelectItem value="fluent">
                                  {language === 'fr' ? 'Bilingue (C2)' : 'Fluent (C2)'}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* English Level Field */}
                      <FormField
                        control={form.control}
                        name="englishLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'fr' ? 'Niveau d\'anglais' : 'English Level'}
                            </FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={language === 'fr' ? 'Sélectionnez votre niveau' : 'Select your level'} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">
                                  {language === 'fr' ? 'Aucun' : 'None'}
                                </SelectItem>
                                <SelectItem value="basic">
                                  {language === 'fr' ? 'Débutant (A1-A2)' : 'Basic (A1-A2)'}
                                </SelectItem>
                                <SelectItem value="intermediate">
                                  {language === 'fr' ? 'Intermédiaire (B1-B2)' : 'Intermediate (B1-B2)'}
                                </SelectItem>
                                <SelectItem value="advanced">
                                  {language === 'fr' ? 'Avancé (C1)' : 'Advanced (C1)'}
                                </SelectItem>
                                <SelectItem value="fluent">
                                  {language === 'fr' ? 'Bilingue (C2)' : 'Fluent (C2)'}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Work Experience Field */}
                      <FormField
                        control={form.control}
                        name="workExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {language === 'fr' ? 'Expérience professionnelle (années)' : 'Work Experience (years)'}
                            </FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={language === 'fr' ? 'Sélectionnez votre expérience' : 'Select your experience'} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">
                                  {language === 'fr' ? 'Aucune' : 'None'}
                                </SelectItem>
                                <SelectItem value="1-2">1-2</SelectItem>
                                <SelectItem value="3-5">3-5</SelectItem>
                                <SelectItem value="6-10">6-10</SelectItem>
                                <SelectItem value="10+">10+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Canadian Family Field */}
                      <FormField
                        control={form.control}
                        name="canadianFamily"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>
                              {language === 'fr' 
                                ? 'Avez-vous de la famille au Canada (citoyens ou résidents permanents) ?' 
                                : 'Do you have family in Canada (citizens or permanent residents)?'}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="r1" />
                                  <label htmlFor="r1" className="text-sm font-normal">
                                    {language === 'fr' ? 'Oui' : 'Yes'}
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="r2" />
                                  <label htmlFor="r2" className="text-sm font-normal">
                                    {language === 'fr' ? 'Non' : 'No'}
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-4 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleReset}
                      >
                        {language === 'fr' ? 'Réinitialiser' : 'Reset'}
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600"
                        disabled={loading}
                      >
                        {loading 
                          ? (language === 'fr' ? 'Calcul en cours...' : 'Calculating...') 
                          : (language === 'fr' ? 'Évaluer mon éligibilité' : 'Assess My Eligibility')}
                        {!loading && <ChevronRight className="ml-2 h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          {showResult && (
            <div className="mb-12 animate-fade-in">
              <div className={`rounded-xl overflow-hidden border ${
                result === 'express-entry' 
                  ? 'border-green-200 bg-green-50' 
                  : result === 'provincial' 
                    ? 'border-blue-200 bg-blue-50' 
                    : result === 'other-programs' 
                      ? 'border-yellow-200 bg-yellow-50' 
                      : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {language === 'fr' ? 'Résultat de votre évaluation' : 'Your Assessment Result'}
                  </h2>
                  <div className="flex items-center mb-4">
                    <div className={`text-2xl font-bold ${
                      result === 'express-entry' 
                        ? 'text-green-700' 
                        : result === 'provincial' 
                          ? 'text-blue-700' 
                          : result === 'other-programs' 
                            ? 'text-yellow-700' 
                            : 'text-gray-700'
                    }`}>
                      {score} / 100
                    </div>
                    <div className="ml-4 text-gray-600">
                      {language === 'fr' ? 'points d\'éligibilité' : 'eligibility points'}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className={`text-lg font-medium mb-2 ${
                      result === 'express-entry' 
                        ? 'text-green-700' 
                        : result === 'provincial' 
                          ? 'text-blue-700' 
                          : result === 'other-programs' 
                            ? 'text-yellow-700' 
                            : 'text-gray-700'
                    }`}>
                      {result === 'express-entry' 
                        ? (language === 'fr' ? 'Excellente éligibilité' : 'Excellent Eligibility')
                        : result === 'provincial' 
                          ? (language === 'fr' ? 'Bonne éligibilité' : 'Good Eligibility')
                          : result === 'other-programs' 
                            ? (language === 'fr' ? 'Éligibilité moyenne' : 'Average Eligibility')
                            : (language === 'fr' ? 'Éligibilité limitée' : 'Limited Eligibility')}
                    </h3>
                    <p className="text-gray-600">
                      {result === 'express-entry' 
                        ? (language === 'fr' 
                            ? 'Votre profil semble être très compétitif pour le système Entrée express. Vous avez un excellent potentiel pour recevoir une invitation à présenter une demande de résidence permanente.'
                            : 'Your profile appears to be very competitive for the Express Entry system. You have excellent potential to receive an invitation to apply for permanent residence.')
                        : result === 'provincial' 
                          ? (language === 'fr' 
                              ? 'Votre profil semble bien correspondre aux critères de certains programmes des candidats des provinces (PCP). Nous vous recommandons d\'explorer les programmes provinciaux qui correspondent à vos compétences et expériences.'
                              : 'Your profile seems to fit well with the criteria of some Provincial Nominee Programs (PNP). We recommend exploring provincial programs that match your skills and experiences.')
                          : result === 'other-programs' 
                            ? (language === 'fr' 
                                ? 'Bien que vous ne soyez peut-être pas immédiatement admissible aux principaux programmes d\'immigration, vous pourriez explorer d\'autres voies comme les permis d\'études, les permis de travail temporaires, ou des programmes spécifiques adaptés à votre situation.'
                                : 'While you may not be immediately eligible for the main immigration programs, you could explore other pathways such as study permits, temporary work permits, or specific programs tailored to your situation.')
                            : (language === 'fr' 
                                ? 'D\'après les informations fournies, votre éligibilité aux programmes d\'immigration canadiens principaux semble limitée pour le moment. Nous vous recommandons d\'améliorer certains aspects de votre profil pour augmenter vos chances.'
                                : 'Based on the information provided, your eligibility for major Canadian immigration programs seems limited at the moment. We recommend improving certain aspects of your profile to increase your chances.')}
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-3">
                      {language === 'fr' ? 'Programmes recommandés' : 'Recommended Programs'}
                    </h3>
                    <ul className="space-y-3">
                      {result === 'express-entry' && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">
                                {language === 'fr' ? 'Entrée express - Catégorie des travailleurs qualifiés (fédéral)' : 'Express Entry - Federal Skilled Worker Program'}
                              </span>
                              <p className="text-sm text-gray-600">
                                {language === 'fr' 
                                  ? 'Pour les travailleurs ayant une expérience professionnelle qualifiée.'
                                  : 'For workers with skilled work experience.'}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">
                                {language === 'fr' ? 'Entrée express - Catégorie de l\'expérience canadienne' : 'Express Entry - Canadian Experience Class'}
                              </span>
                              <p className="text-sm text-gray-600">
                                {language === 'fr' 
                                  ? 'Si vous avez de l\'expérience de travail au Canada.'
                                  : 'If you have work experience in Canada.'}
                              </p>
                            </div>
                          </li>
                        </>
                      )}
                      
                      {(result === 'express-entry' || result === 'provincial') && (
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">
                              {language === 'fr' ? 'Programme des candidats des provinces (PCP)' : 'Provincial Nominee Program (PNP)'}
                            </span>
                            <p className="text-sm text-gray-600">
                              {language === 'fr' 
                                ? 'Programmes spécifiques aux provinces canadiennes ciblant des compétences particulières.'
                                : 'Programs specific to Canadian provinces targeting particular skills.'}
                            </p>
                          </div>
                        </li>
                      )}
                      
                      {(result === 'provincial' || result === 'other-programs') && (
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">
                              {language === 'fr' ? 'Programme pilote d\'immigration au Canada atlantique' : 'Atlantic Immigration Pilot Program'}
                            </span>
                            <p className="text-sm text-gray-600">
                              {language === 'fr' 
                                ? 'Pour ceux qui souhaitent s\'installer dans une province atlantique.'
                                : 'For those looking to settle in an Atlantic province.'}
                            </p>
                          </div>
                        </li>
                      )}
                      
                      {(result === 'other-programs' || result === 'low-eligibility') && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">
                                {language === 'fr' ? 'Permis d\'études' : 'Study Permit'}
                              </span>
                              <p className="text-sm text-gray-600">
                                {language === 'fr' 
                                  ? 'Étudiez au Canada pour améliorer votre éligibilité future.'
                                  : 'Study in Canada to improve your future eligibility.'}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-gray-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">
                                {language === 'fr' ? 'Permis de travail temporaire' : 'Temporary Work Permit'}
                              </span>
                              <p className="text-sm text-gray-600">
                                {language === 'fr' 
                                  ? 'Acquérez une expérience de travail canadienne pour renforcer votre profil.'
                                  : 'Gain Canadian work experience to strengthen your profile.'}
                              </p>
                            </div>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-500">
                    <p>
                      {language === 'fr' 
                        ? 'Cette évaluation est fournie à titre indicatif uniquement et ne garantit pas l\'admissibilité à un programme d\'immigration. Les programmes et critères peuvent changer. Nous vous recommandons de consulter un conseiller en immigration réglementé pour une évaluation complète.' 
                        : 'This assessment is provided for guidance only and does not guarantee eligibility for any immigration program. Programs and criteria may change. We recommend consulting with a regulated immigration consultant for a comprehensive assessment.'}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleReset} variant="outline">
                      {language === 'fr' ? 'Nouvelle évaluation' : 'New Assessment'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {language === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="font-medium text-gray-800 mb-2">
                  {language === 'fr' 
                    ? 'Cette évaluation est-elle officielle ?' 
                    : 'Is this assessment official?'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr' 
                    ? 'Non, ce calculateur fournit une estimation préliminaire basée sur les informations que vous avez fournies. Il ne remplace pas l\'évaluation officielle d\'Immigration, Réfugiés et Citoyenneté Canada (IRCC) ou d\'un consultant en immigration réglementé.' 
                    : 'No, this calculator provides a preliminary estimate based on the information you provided. It does not replace the official assessment by Immigration, Refugees and Citizenship Canada (IRCC) or a regulated immigration consultant.'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="font-medium text-gray-800 mb-2">
                  {language === 'fr' 
                    ? 'Quelle est la prochaine étape après cette évaluation ?' 
                    : 'What is the next step after this assessment?'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr' 
                    ? 'Si votre évaluation est positive, nous vous recommandons de rechercher les programmes spécifiques pour lesquels vous pourriez être admissible et de consulter un professionnel de l\'immigration pour élaborer une stratégie d\'immigration personnalisée.' 
                    : 'If your assessment is positive, we recommend researching the specific programs you might be eligible for and consulting with an immigration professional to develop a personalized immigration strategy.'}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="font-medium text-gray-800 mb-2">
                  {language === 'fr' 
                    ? 'Puis-je améliorer mon score ?' 
                    : 'Can I improve my score?'}
                </h3>
                <p className="text-gray-600">
                  {language === 'fr' 
                    ? 'Oui, vous pouvez améliorer votre score de plusieurs façons, notamment en améliorant vos compétences linguistiques, en acquérant plus d\'expérience professionnelle, en poursuivant des études supérieures ou en obtenant une offre d\'emploi canadienne.' 
                    : 'Yes, you can improve your score in several ways, including improving your language skills, gaining more work experience, pursuing higher education, or obtaining a Canadian job offer.'}
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'fr' 
                ? 'Besoin d\'une évaluation professionnelle ?' 
                : 'Need a Professional Assessment?'}
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Notre équipe de conseillers en immigration réglementés peut vous aider à naviguer dans le processus d\'immigration et à maximiser vos chances de succès.' 
                : 'Our team of regulated immigration consultants can help you navigate the immigration process and maximize your chances of success.'}
            </p>
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50">
              {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EligibilityCalculator;
