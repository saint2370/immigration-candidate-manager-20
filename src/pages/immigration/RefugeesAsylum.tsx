
import React from 'react';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, AlertCircle, Clock, MapPin } from 'lucide-react';

const RefugeesAsylum = () => {
  const { language } = useLanguage();
  
  const headerImage = "/lovable-uploads/8723bfa1-a246-4a52-a6aa-e6917ee1059f.png";
  
  const faqItems = [
    {
      question: language === 'fr' 
        ? 'Quelle est la différence entre un réfugié et un demandeur d\'asile ?' 
        : 'What is the difference between a refugee and an asylum seeker?',
      answer: language === 'fr'
        ? 'Un réfugié est une personne qui a déjà été reconnue comme ayant besoin de protection selon la Convention sur les réfugiés, tandis qu\'un demandeur d\'asile est une personne qui demande cette protection mais dont la demande n\'a pas encore été évaluée.'
        : 'A refugee is someone who has already been recognized as needing protection under the Refugee Convention, while an asylum seeker is someone who is seeking that protection but whose claim has not yet been assessed.'
    },
    {
      question: language === 'fr' 
        ? 'Comment faire une demande d\'asile au Canada ?' 
        : 'How do I make an asylum claim in Canada?',
      answer: language === 'fr'
        ? 'Vous pouvez faire une demande d\'asile à un point d\'entrée au Canada (aéroport, port maritime ou poste frontalier terrestre) ou auprès d\'un bureau intérieur d\'Immigration, Réfugiés et Citoyenneté Canada (IRCC) si vous êtes déjà au Canada.'
        : 'You can make an asylum claim at a port of entry to Canada (airport, seaport, or land border crossing) or at an inland Immigration, Refugees and Citizenship Canada (IRCC) office if you are already in Canada.'
    },
    {
      question: language === 'fr' 
        ? 'Combien de temps prend le traitement d\'une demande d\'asile ?' 
        : 'How long does it take to process an asylum claim?',
      answer: language === 'fr'
        ? 'Les délais de traitement varient considérablement, mais la Commission de l\'immigration et du statut de réfugié (CISR) vise à traiter la plupart des demandes d\'asile dans les 60 jours suivant leur réception. Cependant, en raison du volume de demandes, ce délai peut être plus long.'
        : 'Processing times vary significantly, but the Immigration and Refugee Board (IRB) aims to process most asylum claims within 60 days of receiving them. However, due to the volume of claims, this timeframe may be longer.'
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? 'Réfugiés et demandes d\'asile' : 'Refugees and Asylum Claims'}
      headerImage={headerImage}
      intro={language === 'fr' 
        ? 'Le Canada offre protection aux personnes qui craignent avec raison d\'être persécutées ou qui risquent de subir des traitements cruels dans leur pays d\'origine.' 
        : 'Canada offers protection to people who have a well-founded fear of persecution or are at risk of cruel treatment in their home country.'}
      faqItems={faqItems}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Protection des réfugiés au Canada' : 'Refugee Protection in Canada'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Le Canada offre protection aux personnes qui ne peuvent pas retourner dans leur pays d\'origine en raison d\'une crainte fondée de persécution basée sur leur race, religion, nationalité, appartenance à un groupe social particulier ou opinion politique.' 
              : 'Canada offers protection to people who cannot return to their home country because of a well-founded fear of persecution based on race, religion, nationality, membership in a particular social group, or political opinion.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'fr' ? 'Programme de réinstallation des réfugiés' : 'Refugee Resettlement Program'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? 'Le Canada accueille des réfugiés de l\'étranger qui ont été recommandés pour la réinstallation par le HCR ou un autre organisme de recommandation.' 
                : 'Canada welcomes refugees from abroad who have been referred for resettlement by the UNHCR or another referral organization.'}
            </p>
            <h4 className="font-medium text-gray-800 mt-4 mb-2">
              {language === 'fr' ? 'Catégories de réinstallation :' : 'Resettlement categories:'}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programme des réfugiés pris en charge par le gouvernement (RPG)' : 'Government-Assisted Refugees (GAR) Program'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programme de parrainage privé de réfugiés (PPPR)' : 'Private Sponsorship of Refugees (PSR) Program'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programme mixte des réfugiés désignés par un bureau des visas (RDBV)' : 'Blended Visa Office-Referred (BVOR) Program'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Clock className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'fr' ? 'Demande d\'asile au Canada' : 'Asylum Claims in Canada'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? 'Les personnes déjà au Canada ou qui arrivent à un point d\'entrée canadien peuvent demander l\'asile si elles craignent de retourner dans leur pays.' 
                : 'People who are already in Canada or who arrive at a Canadian port of entry can claim asylum if they fear returning to their country.'}
            </p>
            <h4 className="font-medium text-gray-800 mt-4 mb-2">
              {language === 'fr' ? 'Processus de demande d\'asile :' : 'Asylum claim process:'}
            </h4>
            <ol className="space-y-2">
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <span className="text-gray-700 text-xs font-medium">1</span>
                </div>
                <span className="text-gray-700">
                  {language === 'fr' ? 'Soumission d\'une demande d\'asile' : 'Submission of an asylum claim'}
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <span className="text-gray-700 text-xs font-medium">2</span>
                </div>
                <span className="text-gray-700">
                  {language === 'fr' ? 'Détermination de la recevabilité' : 'Eligibility determination'}
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <span className="text-gray-700 text-xs font-medium">3</span>
                </div>
                <span className="text-gray-700">
                  {language === 'fr' ? 'Audience à la Commission de l\'immigration et du statut de réfugié (CISR)' : 'Hearing at the Immigration and Refugee Board (IRB)'}
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <span className="text-gray-700 text-xs font-medium">4</span>
                </div>
                <span className="text-gray-700">
                  {language === 'fr' ? 'Décision sur la demande d\'asile' : 'Decision on the asylum claim'}
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">
                  <span className="text-gray-700 text-xs font-medium">5</span>
                </div>
                <span className="text-gray-700">
                  {language === 'fr' ? 'Possibilité d\'appel ou de révision' : 'Possibility of appeal or review'}
                </span>
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'fr' ? 'Qui peut être reconnu comme réfugié ou personne protégée ?' : 'Who can be recognized as a refugee or protected person?'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'fr' 
              ? 'Pour être reconnu comme réfugié au sens de la Convention ou comme personne à protéger, vous devez démontrer que :' 
              : 'To be recognized as a Convention refugee or a person in need of protection, you must demonstrate that:'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">
                {language === 'fr' ? 'Réfugié au sens de la Convention' : 'Convention refugee'}
              </h4>
              <p className="text-gray-600 mb-3">
                {language === 'fr' 
                  ? 'Vous vous trouvez hors de votre pays d\'origine et avez une crainte fondée de persécution pour l\'un des motifs suivants :' 
                  : 'You are outside your home country and have a well-founded fear of persecution for one of the following reasons:'}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Race' : 'Race'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Religion' : 'Religion'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Nationalité' : 'Nationality'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Appartenance à un groupe social particulier' : 'Membership in a particular social group'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Opinion politique' : 'Political opinion'}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-3">
                {language === 'fr' ? 'Personne à protéger' : 'Person in need of protection'}
              </h4>
              <p className="text-gray-600 mb-3">
                {language === 'fr' 
                  ? 'Vous êtes une personne qui, si elle était renvoyée dans son pays d\'origine, serait exposée à :' 
                  : 'You are a person who, if returned to your home country, would face:'}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Un risque de torture' : 'A risk of torture'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Un risque pour sa vie' : 'A risk to your life'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Un risque de traitements ou peines cruels et inusités' : 'A risk of cruel and unusual treatment or punishment'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
          <div className="flex items-start">
            <div className="mr-4">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {language === 'fr' ? 'Facteurs d\'exclusion' : 'Exclusion factors'}
              </h3>
              <p className="text-gray-600 mb-3">
                {language === 'fr' 
                  ? 'Certaines personnes peuvent être exclues de la protection des réfugiés, même si elles répondent aux définitions ci-dessus :' 
                  : 'Some people may be excluded from refugee protection, even if they meet the definitions above:'}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <AlertCircle size={18} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Personnes ayant commis un crime grave (crime de guerre, crime contre l\'humanité)' : 'People who have committed a serious crime (war crime, crime against humanity)'}
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertCircle size={18} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Personnes ayant commis un crime grave non politique à l\'extérieur du Canada' : 'People who have committed a serious non-political crime outside Canada'}
                  </span>
                </li>
                <li className="flex items-start">
                  <AlertCircle size={18} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Personnes coupables d\'actes contraires aux buts et principes des Nations Unies' : 'People guilty of acts contrary to the purposes and principles of the United Nations'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'fr' ? 'Services et soutien disponibles' : 'Available services and support'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'fr' 
              ? 'Les réfugiés et les demandeurs d\'asile au Canada peuvent avoir accès à divers services et soutiens :' 
              : 'Refugees and asylum seekers in Canada may have access to various services and supports:'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">
                {language === 'fr' ? 'Services d\'établissement' : 'Settlement services'}
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="text-gray-600">
                  {language === 'fr' ? 'Évaluation des besoins' : 'Needs assessment'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Information et orientation' : 'Information and orientation'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Formation linguistique' : 'Language training'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Aide à la recherche d\'emploi' : 'Help finding a job'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Aiguillage vers des ressources communautaires' : 'Referrals to community resources'}
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">
                {language === 'fr' ? 'Programme d\'aide au réétablissement' : 'Resettlement Assistance Program'}
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="text-gray-600">
                  {language === 'fr' ? 'Accueil à l\'aéroport' : 'Airport reception'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Logement temporaire' : 'Temporary housing'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Aide à la recherche d\'un logement permanent' : 'Help finding permanent housing'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Orientation de base' : 'Basic orientation'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Soutien du revenu (pour certains réfugiés)' : 'Income support (for certain refugees)'}
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">
                {language === 'fr' ? 'Aide juridique et autres services' : 'Legal aid and other services'}
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="text-gray-600">
                  {language === 'fr' ? 'Aide juridique pour les demandeurs d\'asile' : 'Legal aid for asylum seekers'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Programme fédéral de santé intérimaire' : 'Interim Federal Health Program'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Services de counseling' : 'Counseling services'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Services d\'aide à l\'emploi' : 'Employment assistance services'}
                </li>
                <li className="text-gray-600">
                  {language === 'fr' ? 'Services spécialisés pour les enfants' : 'Specialized services for children'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ImmigrationPageLayout>
  );
};

export default RefugeesAsylum;
