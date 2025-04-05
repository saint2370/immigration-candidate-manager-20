
import React from 'react';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, AlertCircle, Calendar, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const VisitorVisa = () => {
  const { language } = useLanguage();
  
  const headerImage = "/lovable-uploads/6741185c-18b1-4058-a6ab-670479ba19e7.png";
  
  const faqItems = [
    {
      question: language === 'fr' 
        ? 'Qui a besoin d\'un visa de visiteur pour venir au Canada ?' 
        : 'Who needs a visitor visa to come to Canada?',
      answer: language === 'fr'
        ? 'La plupart des voyageurs ont besoin d\'un visa ou d\'une autorisation de voyage électronique (AVE) pour voyager au Canada. Les exceptions incluent les citoyens américains et les résidents permanents des États-Unis. Vous pouvez vérifier si vous avez besoin d\'un visa sur le site Web officiel d\'IRCC.'
        : 'Most travelers need a visa or an Electronic Travel Authorization (eTA) to travel to Canada. Exceptions include U.S. citizens and U.S. permanent residents. You can check if you need a visa on the official IRCC website.'
    },
    {
      question: language === 'fr' 
        ? 'Quelle est la différence entre un visa de visiteur et une AVE ?' 
        : 'What is the difference between a visitor visa and an eTA?',
      answer: language === 'fr'
        ? 'Un visa de visiteur est un document officiel apposé dans votre passeport qui indique que vous respectez les conditions d\'entrée au Canada. Une AVE est une autorisation électronique requise pour les voyageurs dispensés de visa qui arrivent par avion. L\'AVE est liée électroniquement à votre passeport.'
        : 'A visitor visa is an official document stamped in your passport showing you meet the requirements to enter Canada. An eTA is an electronic authorization required for visa-exempt travelers arriving by air. The eTA is electronically linked to your passport.'
    },
    {
      question: language === 'fr' 
        ? 'Combien de temps puis-je rester au Canada en tant que visiteur ?' 
        : 'How long can I stay in Canada as a visitor?',
      answer: language === 'fr'
        ? 'La plupart des visiteurs peuvent rester au Canada jusqu\'à 6 mois. La date exacte jusqu\'à laquelle vous pouvez rester est déterminée par l\'agent des services frontaliers à votre arrivée. Vous pouvez demander une prolongation de votre séjour si nécessaire.'
        : 'Most visitors can stay in Canada for up to 6 months. The exact date until which you can stay is determined by the border services officer upon your arrival. You can apply for an extension of your stay if needed.'
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? 'Visiter le Canada' : 'Visit Canada'}
      headerImage={headerImage}
      intro={language === 'fr' 
        ? 'Découvrez comment obtenir un visa de visiteur ou une autorisation de voyage électronique (AVE) pour visiter le Canada à des fins touristiques, familiales ou d\'affaires.' 
        : 'Learn how to obtain a visitor visa or Electronic Travel Authorization (eTA) to visit Canada for tourism, family visits, or business purposes.'}
      faqItems={faqItems}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Venir au Canada en tant que visiteur' : 'Coming to Canada as a visitor'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Pour entrer au Canada temporairement, comme touriste, pour rendre visite à de la famille ou à des amis, ou pour affaires, vous pourriez avoir besoin d\'un visa de visiteur ou d\'une autorisation de voyage électronique (AVE), selon votre pays d\'origine.' 
              : 'To enter Canada temporarily, as a tourist, to visit family or friends, or for business, you may need a visitor visa or an Electronic Travel Authorization (eTA), depending on your country of origin.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Globe className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'fr' ? 'Visa de visiteur' : 'Visitor Visa'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? 'Document officiel que nous apposons dans votre passeport pour montrer que vous remplissez les conditions d\'entrée au Canada en tant que visiteur temporaire.' 
                : 'Official document that we place in your passport to show you meet the requirements to enter Canada as a temporary visitor.'}
            </p>
            <h4 className="font-medium text-gray-800 mt-4 mb-2">
              {language === 'fr' ? 'Qui en a besoin?' : 'Who needs it?'}
            </h4>
            <p className="text-gray-600 mb-3">
              {language === 'fr'
                ? 'Les citoyens de nombreux pays et territoires ont besoin d\'un visa pour visiter ou transiter par le Canada.'
                : 'Citizens from many countries and territories need a visa to visit or transit through Canada.'}
            </p>
            <Link to="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/exigences-admission-selon-pays.html" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="mt-2 w-full">
                {language === 'fr' ? 'Vérifier si vous avez besoin d\'un visa' : 'Check if you need a visa'}
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Globe className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'fr' ? 'Autorisation de voyage électronique (AVE)' : 'Electronic Travel Authorization (eTA)'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? 'Exigence d\'entrée pour les voyageurs dispensés de visa qui volent vers le Canada. Elle est liée électroniquement à votre passeport.' 
                : 'Entry requirement for visa-exempt travelers flying to Canada. It is electronically linked to your passport.'}
            </p>
            <h4 className="font-medium text-gray-800 mt-4 mb-2">
              {language === 'fr' ? 'Qui en a besoin?' : 'Who needs it?'}
            </h4>
            <p className="text-gray-600 mb-3">
              {language === 'fr'
                ? 'Les citoyens de pays dispensés de visa qui entrent au Canada par avion ont besoin d\'une AVE. Cela inclut les voyageurs qui transitent par un aéroport canadien.'
                : 'Citizens from visa-exempt countries entering Canada by air need an eTA. This includes travelers transiting through a Canadian airport.'}
            </p>
            <Link to="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/ave/demande.html" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="mt-2 w-full">
                {language === 'fr' ? 'Demander une AVE' : 'Apply for an eTA'}
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'fr' ? 'Comment faire une demande de visa de visiteur' : 'How to apply for a visitor visa'}
          </h3>
          <ol className="space-y-6">
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Vérifiez si vous êtes admissible' : 'Check if you are eligible'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'Assurez-vous que vous répondez aux critères d\'admissibilité de base : avoir un passeport valide, être en bonne santé, avoir des liens avec votre pays d\'origine, et avoir assez d\'argent pour votre séjour.' 
                    : 'Make sure you meet the basic eligibility criteria: having a valid passport, being in good health, having ties to your home country, and having enough money for your stay.'}
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Rassemblez les documents requis' : 'Gather the required documents'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'Préparez votre formulaire de demande, photos, passeport, preuve de situation financière, itinéraire de voyage, et autres documents selon votre situation.' 
                    : 'Prepare your application form, photos, passport, proof of financial status, travel itinerary, and other documents depending on your situation.'}
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Soumettez votre demande en ligne ou sur papier' : 'Submit your application online or on paper'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'La plupart des demandes peuvent être soumises en ligne. Si vous ne pouvez pas faire une demande en ligne, vous pouvez soumettre une demande papier.' 
                    : 'Most applications can be submitted online. If you cannot apply online, you can submit a paper application.'}
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Fournissez vos données biométriques (si nécessaire)' : 'Provide your biometrics (if required)'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'La plupart des demandeurs doivent fournir leurs empreintes digitales et une photo. Vous recevrez une lettre d\'instructions pour le faire après avoir soumis votre demande.' 
                    : 'Most applicants need to give their fingerprints and a photo. You will receive an instruction letter to do this after you submit your application.'}
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">5</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Passez un examen médical (si nécessaire)' : 'Get a medical exam (if required)'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'Vous pourriez avoir besoin d\'un examen médical selon votre pays d\'origine et la durée prévue de votre séjour au Canada.' 
                    : 'You might need a medical exam depending on your country of origin and how long you plan to stay in Canada.'}
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">6</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Attendez la décision' : 'Wait for the decision'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'Le délai de traitement varie selon votre pays de résidence et d\'autres facteurs. Vous pouvez vérifier les délais de traitement en ligne.' 
                    : 'Processing time varies depending on your country of residence and other factors. You can check processing times online.'}
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'fr' ? 'Documents généralement requis' : 'Documents generally required'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">
                {language === 'fr' ? 'Documents personnels' : 'Personal documents'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Passeport valide' : 'Valid passport'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Formulaire de demande dûment rempli' : 'Completed application form'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Photos conformes aux spécifications' : 'Photos that meet specifications'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Preuve de situation financière' : 'Proof of financial status'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Frais de demande' : 'Application fee'}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-3">
                {language === 'fr' ? 'Documents de voyage' : 'Travel documents'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Itinéraire de voyage' : 'Travel itinerary'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Lettre d\'invitation (si applicable)' : 'Letter of invitation (if applicable)'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Preuve d\'hébergement' : 'Proof of accommodation'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Preuve de liens avec votre pays d\'origine' : 'Proof of ties to your home country'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Assurance voyage (recommandé)' : 'Travel insurance (recommended)'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <AlertCircle className="text-yellow-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'fr' ? 'Motifs possibles de refus' : 'Possible reasons for refusal'}
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              {language === 'fr' 
                ? 'Votre demande pourrait être refusée si :' 
                : 'Your application may be refused if:'}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Vous représentez un risque pour la sécurité' : 'You pose a security risk'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Vous avez des problèmes de santé sérieux' : 'You have serious health issues'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Vous avez un casier judiciaire' : 'You have a criminal record'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Vous avez fourni de faux documents' : 'You provided false documents'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Vous n\'avez pas assez de fonds' : 'You don't have enough funds'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'L\'agent n\'est pas convaincu que vous quitterez le Canada à la fin de votre séjour' : 'The officer is not convinced you will leave Canada at the end of your stay'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Clock className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'fr' ? 'Informations utiles' : 'Useful information'}
              </h3>
            </div>
            <ul className="space-y-3">
              <li>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Délais de traitement' : 'Processing times'}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {language === 'fr' 
                    ? 'Les délais varient selon le bureau de traitement. Vérifiez les délais actuels sur le site d\'IRCC.' 
                    : 'Times vary by processing office. Check current times on the IRCC website.'}
                </p>
                <Link to="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/verifier-delais-traitement.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline mt-1 inline-block">
                  {language === 'fr' ? 'Vérifier les délais de traitement' : 'Check processing times'}
                </Link>
              </li>
              <li>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Frais' : 'Fees'}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {language === 'fr' 
                    ? 'Visa de visiteur : 100 CAD par personne (non remboursable). Biométrie : 85 CAD par personne.' 
                    : 'Visitor visa: CAD 100 per person (non-refundable). Biometrics: CAD 85 per person.'}
                </p>
              </li>
              <li>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Durée de validité' : 'Validity period'}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {language === 'fr' 
                    ? 'Un visa de visiteur peut être valide pour jusqu\'à 10 ans ou jusqu\'à un mois avant l\'expiration de votre passeport, selon la première éventualité.' 
                    : 'A visitor visa can be valid for up to 10 years or one month before your passport expires, whichever comes first.'}
                </p>
              </li>
              <li>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Prolongation de séjour' : 'Extending your stay'}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {language === 'fr' 
                    ? 'Si vous souhaitez rester plus longtemps, vous devez demander une prolongation au moins 30 jours avant l\'expiration de votre statut.' 
                    : 'If you want to stay longer, you must apply for an extension at least 30 days before your status expires.'}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'fr' ? 'Vous êtes prêt à faire une demande?' : 'Ready to apply?'}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Visitez le site officiel d\'Immigration, Réfugiés et Citoyenneté Canada pour commencer votre demande.' 
              : 'Visit the official Immigration, Refugees and Citizenship Canada website to begin your application.'}
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link to="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/demande-visa-visiteur.html" target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full bg-red-700 hover:bg-red-800">
                {language === 'fr' ? 'Demander un visa de visiteur' : 'Apply for a visitor visa'}
              </Button>
            </Link>
            <Link to="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/ave/demande.html" target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                {language === 'fr' ? 'Demander une AVE' : 'Apply for an eTA'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ImmigrationPageLayout>
  );
};

export default VisitorVisa;
