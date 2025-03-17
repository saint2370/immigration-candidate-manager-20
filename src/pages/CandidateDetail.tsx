import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { Link } from 'react-router-dom';
import { Pencil, ArrowLeft } from 'lucide-react';

// Define a type for the documents with the nested document_types
type DocumentWithTypeName = Database['public']['Tables']['documents']['Row'] & {
  document_types: {
    nom: string;
    required: boolean;
  } | null;
};

const CandidateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Database['public']['Tables']['candidates']['Row'] | null>(null);
  const [documents, setDocuments] = useState<DocumentWithTypeName[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCandidate();
      fetchDocuments();
    }
  }, [id]);

  const fetchCandidate = async () => {
    setIsLoading(true);
    try {
      // Fix the type issue with the id parameter
      const { data: candidate, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', id as unknown as string)
        .single();

      if (error) {
        console.error("Error fetching candidate:", error);
      }

      if (candidate) {
        setCandidate(candidate);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      // Fix the type issue with the candidate_id parameter
      const { data, error } = await supabase
        .from('documents')
        .select('*, document_types(nom, required)')
        .eq('candidate_id', id as unknown as string);

      if (error) {
        console.error("Error fetching documents:", error);
      }

      if (data) {
        setDocuments(data as DocumentWithTypeName[]);
      }
    } catch (error) {
      console.error("Unexpected error fetching documents:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!candidate) {
    return <div>Candidate not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <Link to="/candidates" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
          <ArrowLeft className="h-5 w-5" />
          Back to Candidates
        </Link>
        <Link to={`/candidates/edit/${id}`} className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
          <Pencil className="h-4 w-4" />
          Edit
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">{candidate.prenom} {candidate.nom}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p><strong>Date of Birth:</strong> {candidate.date_naissance}</p>
          <p><strong>Passport Number:</strong> {candidate.numero_passport}</p>
          <p><strong>Visa Type:</strong> {candidate.visa_type}</p>
          {/* Display other candidate details here */}
        </div>
        <div>
          <p><strong>Email:</strong> {candidate.email}</p>
          <p><strong>Phone:</strong> {candidate.telephone}</p>
          <p><strong>Status:</strong> {candidate.status}</p>
          {/* Display other candidate details here */}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Documents</h2>
        {documents.length > 0 ? (
          <ul className="list-disc pl-5">
            {documents.map(doc => (
              <li key={doc.id} className="mb-2">
                {doc.document_types?.nom || 'Unknown Document'}
                {doc.file_path && (
                  <a href={`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/documents/${doc.file_path}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="ml-2 text-blue-500 hover:text-blue-700">
                    View File
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents found for this candidate.</p>
        )}
      </div>
    </div>
  );
};

export default CandidateDetail;
