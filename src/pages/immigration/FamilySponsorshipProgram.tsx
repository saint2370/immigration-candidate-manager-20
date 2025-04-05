
import React from 'react';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, AlertCircle, DollarSign, Calendar } from 'lucide-react';

const FamilySponsorshipProgram = () => {
  const { language } = useLanguage();
  
  const headerImage = "/lovable-uploads/25aba192-ae76-469f-be21-d48e46b947ef.png";
  
  const faqItems = [
    {
      question: language === 'fr' 
        ? 'Qui peut être parrainé dans le cadre du parrainage familial ?' 
        : 'Who can be sponsored under family sponsorship?',
      answer: language === 'fr'
        ? 'Vous pouvez parrainer votre époux/épouse, conjoint(e) de fait, partenaire conjugal(e), enfants à charge, parents, grands-parents, et dans certains cas, d\'autres membres de la famille comme des frères, sœurs, neveux, nièces ou petits-enfants orphelins.'
        : 'You can sponsor your spouse, common-law partner, conjugal partner, dependent children, parents, grandparents, and in some cases, other family members such as siblings, nephews, nieces, or orphaned grandchildren.'
    },
    {
      question: language === 'fr' 
        ? 'Quelles sont les conditions pour être répondant ?' 
        : 'What are the requirements to be a sponsor?',
      answer: language === 'fr'
        ? 'Pour être répondant, vous devez : être citoyen canadien, résident permanent ou inscrit comme Indien; avoir au moins 18 ans; résider au Canada; respecter un revenu minimum pour certaines catégories; signer un engagement de parrainage; et ne pas avoir certains empêchements (faillite, aide sociale, etc.).'
        : 'To be a sponsor, you must: be a Canadian citizen, permanent resident, or registered as an Indian; be at least 18 years old; live in Canada; meet minimum income requirements for certain categories; sign a sponsorship agreement; and not have certain impediments (bankruptcy, social assistance, etc.).'
    },
    {
      question: language === 'fr' 
        ? 'Quelle est la durée de l\'engagement de parrainage ?' 
        : 'How long does the sponsorship undertaking last?',
      answer: language === 'fr'
        ? 'La durée varie selon le lien familial : 3 ans pour un époux/conjoint, 10 ans ou jusqu\'à l\'âge de 22 ans pour un enfant (selon ce qui arrive en premier), et 20 ans pour un parent ou grand-parent.'
        : 'The duration varies depending on the family relationship: 3 years for a spouse/partner, 10 years or until age 22 for a child (whichever comes first), and 20 years for a parent or grandparent.'
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? 'Parrainage familial' : 'Family Sponsorship'}
      headerImage={headerImage}
      intro={language === 'fr' 
        ? 'Le programme de parrainage familial permet aux citoyens canadiens et aux résidents permanents de parrainer des membres de leur famille pour qu\'ils s\'établissent au Canada.' 
        : 'The Family Sponsorship Program allows Canadian citizens and permanent residents to sponsor family members to settle in Canada.'}
      faqItems={faqItems}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Processus de parrainage familial' : 'Family Sponsorship Process'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Le programme de parrainage familial est conçu pour réunir les familles au Canada. Il permet aux citoyens canadiens et aux résidents permanents de parrainer certains membres de leur famille pour qu\'ils deviennent résidents permanents du Canada.' 
              : 'The Family Sponsorship Program is designed to reunite families in Canada. It allows Canadian citizens and permanent residents to sponsor certain family members to become permanent residents of Canada.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'fr' ? 'Qui peut être parrainé ?' : 'Who can be sponsored?'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-3">
                {language === 'fr' ? 'Catégories principales :' : 'Main categories:'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Époux, conjoint(e) de fait ou partenaire conjugal(e)' : 'Spouse, common-law or conjugal partner'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Enfants à charge' : 'Dependent children'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Parents et grands-parents' : 'Parents and grandparents'}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-3">
                {language === 'fr' ? 'Autres membres admissibles :' : 'Other eligible members:'}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Enfant orphelin (frère, sœur, neveu, nièce ou petit-enfant)' : 'Orphaned child (brother, sister, nephew, niece, or grandchild)'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Autres parents dans certaines circonstances spéciales' : 'Other relatives in certain special circumstances'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'fr' ? 'Conditions pour être répondant' : 'Requirements to be a sponsor'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'fr' 
              ? 'Pour parrainer un membre de votre famille, vous devez :' 
              : 'To sponsor a family member, you must:'}
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Être citoyen canadien, résident permanent ou une personne inscrite comme Indien au Canada' : 'Be a Canadian citizen, permanent resident, or a person registered as an Indian in Canada'}
              </span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Avoir au moins 18 ans' : 'Be at least 18 years old'}
              </span>
            </li>
            <li className="flex items-start">
              <Check size={18} className "text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Résider au Canada (sauf si vous êtes citoyen canadien et parrainez un époux ou un enfant à charge)' : 'Live in Canada (except if you are a Canadian citizen sponsoring a spouse or dependent child)'}
              </span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Pouvoir subvenir aux besoins financiers de la personne parrainée' : 'Be able to financially support the sponsored person'}
              </span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Signer un engagement de parrainage' : 'Sign a sponsorship undertaking'}
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <AlertCircle className="text-yellow-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'fr' ? 'Empêchements possibles' : 'Possible impediments'}
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              {language === 'fr' 
                ? 'Vous ne pouvez pas parrainer si vous :' 
                : 'You cannot sponsor if you:'}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Êtes en défaut de paiement d\'une pension alimentaire' : 'Are in default of child support payments'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Recevez des prestations d\'aide sociale (sauf pour invalidité)' : 'Receive social assistance (except for disability)'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Avez été reconnu coupable de certaines infractions' : 'Have been convicted of certain offenses'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Êtes en prison' : 'Are in prison'}
                </span>
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Êtes en faillite' : 'Are bankrupt'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <DollarSign className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {language === 'fr' ? 'Engagement financier' : 'Financial undertaking'}
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              {language === 'fr' 
                ? 'En tant que répondant, vous devez :' 
                : 'As a sponsor, you must:'}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Subvenir aux besoins essentiels de la personne parrainée' : 'Provide for the basic needs of the sponsored person'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Veiller à ce que la personne parrainée et sa famille ne demandent pas d\'aide sociale' : 'Ensure the sponsored person and family do not seek social assistance'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Rembourser toute aide sociale reçue par la personne parrainée' : 'Repay any social assistance received by the sponsored person'}
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-700 font-medium">
                {language === 'fr' ? 'Durée de l\'engagement :' : 'Length of undertaking:'}
              </p>
              <ul className="space-y-1 mt-2">
                <li className="flex items-start">
                  <Calendar size={16} className="text-gray-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Époux/conjoint : 3 ans' : 'Spouse/partner: 3 years'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Calendar size={16} className="text-gray-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Enfant : 10 ans ou jusqu\'à 22 ans' : 'Child: 10 years or until age 22'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Calendar size={16} className="text-gray-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' ? 'Parent/grand-parent : 20 ans' : 'Parent/grandparent: 20 years'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {language === 'fr' ? 'Étapes du processus de parrainage' : 'Sponsorship process steps'}
          </h3>
          <ol className="space-y-6">
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Vérifier l\'admissibilité' : 'Check eligibility'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'Assurez-vous que vous et la personne que vous souhaitez parrainer répondez aux critères d\'admissibilité.' 
                    : 'Make sure you and the person you want to sponsor meet the eligibility criteria.'}
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Soumettre une demande de parrainage' : 'Submit a sponsorship application'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'Remplissez et soumettez les formulaires de demande de parrainage et de résidence permanente.' 
                    : 'Complete and submit the sponsorship and permanent residence application forms.'}
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Payer les frais' : 'Pay the fees'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'Payez les frais de traitement, les frais de droit de résidence permanente et les frais de données biométriques si nécessaire.' 
                    : 'Pay the processing fees, permanent residence fees, and biometric fees if required.'}
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">4</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Traitement de la demande' : 'Application processing'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'IRCC examine votre demande pour s\'assurer que vous répondez aux exigences. La personne parrainée peut être convoquée à un entretien.' 
                    : 'IRCC reviews your application to ensure you meet the requirements. The sponsored person may be called for an interview.'}
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="font-bold text-blue-600">5</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {language === 'fr' ? 'Décision finale' : 'Final decision'}
                </h4>
                <p className="text-gray-600 mt-1">
                  {language === 'fr' 
                    ? 'Si approuvée, la personne parrainée recevra une confirmation de résidence permanente et pourra venir au Canada.' 
                    : 'If approved, the sponsored person will receive confirmation of permanent residence and can come to Canada.'}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </ImmigrationPageLayout>
  );
};

export default FamilySponsorshipProgram;
