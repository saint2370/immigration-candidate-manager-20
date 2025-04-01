
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const body = await req.json();
    const { candidateId, adminId } = body;

    if (!candidateId) {
      return new Response(
        JSON.stringify({ error: "L'ID du candidat est requis" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get candidate details
    const { data: candidate, error: candidateError } = await supabase
      .from("candidates")
      .select("*")
      .eq("id", candidateId)
      .single();

    if (candidateError || !candidate) {
      return new Response(
        JSON.stringify({ error: "Candidat non trouvé", details: candidateError }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Update the candidate status to "approuvé"
    const { error: updateError } = await supabase
      .from("candidates")
      .update({ status: "Approuvé" })
      .eq("id", candidateId);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: "Erreur lors de la mise à jour du statut", details: updateError }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create history entry
    const historyEntry = {
      candidate_id: candidateId,
      action: "Profil approuvé et email envoyé",
      date: new Date().toISOString(),
      user_id: adminId || "Système"
    };
    
    await supabase.from("history").insert(historyEntry as any);

    // Send email
    const emailUser = Deno.env.get("EMAIL_USER") || "";
    const emailPassword = Deno.env.get("EMAIL_PASSWORD") || "";
    
    if (!emailUser || !emailPassword) {
      return new Response(
        JSON.stringify({ error: "Configuration email manquante" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: emailUser,
          password: emailPassword,
        },
      },
    });

    // Prepare HTML content for the email
    const emailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #e11d48; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; border: 1px solid #ddd; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>IRCC Canada</h1>
            </div>
            <div class="content">
              <p>M./Mme ${candidate.nom},</p>
              
              <p>La création de votre compte au portail de l'IRCC Canada a bien été analysée et validée. Après vérification, vous pouvez entamer toutes les démarches pour immigrer et vivre au Canada. Voici votre numéro d'immatriculation pour suivre vos procédures : <strong>${candidate.identification_number}</strong>.</p>
              
              <p>Seuls les employeurs sélectionnés pourront nous faire parvenir des contrats de travail et tout autre document lié à l'emploi au Canada, conformément aux normes en vigueur. De même, seuls les consultants en immigration agréés par l'État canadien, selon l'article A73.2 du code LIPR, peuvent soumettre des documents au nom des candidats.</p>
              
              <p>Lorsque vos documents seront disponibles, vous pourrez les téléverser directement sur votre portail : <a href="https://irccstatut.ca/portal">https://irccstatut.ca/portal</a>.</p>
              
              <p>Cordialement,<br>IRCC Canada</p>
            </div>
            <div class="footer">
              <p>Ceci est un message automatique, veuillez ne pas y répondre.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send the email
    await client.send({
      from: emailUser,
      to: candidate.email,
      subject: "Approbation de votre compte IRCC Canada",
      html: emailContent,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true, message: "Email envoyé avec succès" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erreur:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'envoi de l'email", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
