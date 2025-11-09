
import React, { useState } from 'react';

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    date: '',
    heure: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.email || !formData.date || !formData.heure) {
        setError('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    setError('');
    console.log('Formulaire soumis :', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Merci !</h2>
        <p className="text-slate-700 mb-6">Votre demande de rendez-vous a bien été envoyée. Nous vous contacterons bientôt pour confirmer.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Prendre un autre rendez-vous
        </button>
      </div>
    );
  }

  return (
    <section id="rendezvous" className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">Prendre Rendez-vous</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-slate-700 mb-1">Nom complet *</label>
          <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                <input type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">Date souhaitée *</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
                <label htmlFor="heure" className="block text-sm font-medium text-slate-700 mb-1">Heure souhaitée *</label>
                <input type="time" id="heure" name="heure" value={formData.heure} onChange={handleChange} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message (facultatif)</label>
          <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="text-center">
            <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md">
                Envoyer la demande
            </button>
        </div>
      </form>
    </section>
  );
};

export default AppointmentForm;
