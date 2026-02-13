import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Bedankt voor je bericht. (Demo – er wordt niets verzonden)');
  };

  return (
    <section className="section-container max-w-2xl">
      <h2 className="text-5xl font-display text-glow mb-8">Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-neon-white/80">Naam</Label>
          <Input 
            type="text" 
            id="name" 
            placeholder="Je naam"
            className="bg-surface/50 border-neon-white/20 text-neon-white placeholder:text-neon-white/30"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-neon-white/80">E-mail</Label>
          <Input 
            type="email" 
            id="email" 
            placeholder="naam@voorbeeld.com"
            className="bg-surface/50 border-neon-white/20 text-neon-white placeholder:text-neon-white/30"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-neon-white/80">Bericht</Label>
          <Textarea 
            id="message" 
            placeholder="Je bericht..."
            rows={4}
            className="bg-surface/50 border-neon-white/20 text-neon-white placeholder:text-neon-white/30"
          />
        </div>
        <Button 
          type="submit"
          className="w-full bg-neon-white/10 hover:bg-neon-white/20 text-neon-white border border-neon-white/30"
        >
          Verstuur bericht
        </Button>
      </form>
    </section>
  );
};

export default Contact;