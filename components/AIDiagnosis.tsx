
import React, { useState } from 'react';
import { getAIDiagnosis } from '../services/geminiService';

const AIDiagnosis: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // remove the "data:mime/type;base64," part
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms) {
      setError('Veuillez décrire vos symptômes.');
      return;
    }

    setIsLoading(true);
    setError('');
    setDiagnosis('');

    try {
      let imageBase64: string | null = null;
      let mimeType: string | null = null;
      if (imageFile) {
        imageBase64 = await fileToBase64(imageFile);
        mimeType = imageFile.type;
      }
      const result = await getAIDiagnosis(symptoms, imageBase64, mimeType);
      setDiagnosis(result);
    } catch (err) {
      setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formattedDiagnosis = diagnosis.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-800">$1</strong>')
    .replace(/\n/g, '<br />');

  return (
    <section id="diagnostic" className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800">Pré-diagnostic Dentaire par IA</h2>
        <p className="text-slate-600 mt-2">Décrivez vos symptômes pour recevoir une analyse préliminaire.</p>
      </div>

      <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-md mb-8" role="alert">
        <p className="font-bold">Avertissement Important</p>
        <p>Cet outil fournit une analyse automatisée et ne remplace PAS un diagnostic professionnel par un dentiste qualifié. Consultez toujours un professionnel de la santé pour tout problème médical.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="symptoms" className="block text-lg font-semibold text-slate-800 mb-2">Décrivez vos symptômes *</label>
              <textarea
                id="symptoms"
                rows={8}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Ex: J'ai une douleur aiguë à la molaire supérieure droite quand je mange quelque chose de froid..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-lg font-semibold text-slate-800 mb-2">Ajouter une photo (optionnel)</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
             {imagePreview && (
                <div className="mt-4">
                    <img src={imagePreview} alt="Aperçu" className="max-h-48 rounded-lg mx-auto" />
                </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyse en cours...
                  </>
                ) : (
                  'Obtenir une analyse IA'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
           <h3 className="text-2xl font-bold text-blue-800 mb-4">Résultat de l'analyse</h3>
           <div className="prose max-w-none text-slate-700 h-96 overflow-y-auto p-4 bg-slate-50 rounded-lg border">
            {isLoading && <p>L'IA analyse vos informations, veuillez patienter...</p>}
            {!isLoading && !diagnosis && <p>Le résultat de l'analyse s'affichera ici.</p>}
            {diagnosis && <div dangerouslySetInnerHTML={{ __html: formattedDiagnosis }} />}
           </div>
        </div>
      </div>
    </section>
  );
};

export default AIDiagnosis;
