import { supabase } from '../api/supabaseClient';
import { Event } from '../interface/Events';
import { User } from '../interface/User';
import { GlobalService } from './GlobalService';

export class EventService {
  // Créer un événement (admin)
  static async createEvent(event: Event, currentUser: User): Promise<Event> {
    try {
      if (!currentUser.isAdmin) {
        throw new Error("Vous n'êtes pas autorisé à créer un événement.");
      }

      const { data, error } = await supabase.from('events').insert([event]).select().single();

      if (error) {
        throw new Error(`Erreur lors de la création de l'événement : ${error.message}`);
      }

      return data as Event;
    } catch (error) {
        const err = error as Error; 
        throw new Error(`Erreur interne : ${err.message}`);
    }
  }

  static async getAllThemes(): Promise<{ id: number; name: string }[]> {
    return await GlobalService.getAllFromTable('Theme');
  }

  static async getAllPublics(): Promise<{ id: number; name: string }[]> {
    return await GlobalService.getAllFromTable('Public');
  }

  static async getAllEventTypes(): Promise<{ id: number; name: string }[]> {
    return await GlobalService.getAllFromTable('EventType');
  }

  static async getAllSchoolLevels(): Promise<{ id: number; name: string }[]> {
    return await GlobalService.getAllFromTable('SchoolLevel');
  }

  // Modifier un événement (admin)
  static async updateEvent(eventId: number, updatedEvent: Partial<Event>, currentUser: User): Promise<Event> {
    try {
      if (!currentUser.isAdmin) {
        throw new Error("Vous n'êtes pas autorisé à modifier un événement.");
      }

      const { data, error } = await supabase.from('events').update(updatedEvent).eq('id', eventId).select().single();

      if (error) {
        throw new Error(`Erreur lors de la modification de l'événement : ${error.message}`);
      }

      return data as Event;
    } catch (error) {
        const err = error as Error; 
        throw new Error(`Erreur interne : ${err.message}`);
    }
  }

  // Supprimer un événement (admin)
  static async deleteEvent(eventId: number, currentUser: User): Promise<void> {
    try {
      if (!currentUser.isAdmin) {
        throw new Error("Vous n'êtes pas autorisé à supprimer un événement.");
      }

      const { error } = await supabase.from('events').delete().eq('id', eventId);

      if (error) {
        throw new Error(`Erreur lors de la suppression de l'événement : ${error.message}`);
      }
    } catch (error) {
        const err = error as Error; 
        throw new Error(`Erreur interne : ${err.message}`);
    }
  }

  // Rejoindre un événement (Tous)
  static async joinEvent(eventId: number, currentUser: User): Promise<void> {
    try {
      const { data: existingRegistration, error: checkError } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('event_id', eventId)
        .eq('user_id', currentUser.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw new Error(`Erreur lors de la vérification de l'inscription : ${checkError.message}`);
      }

      if (existingRegistration) {
        throw new Error("Vous êtes déjà inscrit à cet événement.");
      }

      const { error } = await supabase.from('event_registrations').insert([
        { event_id: eventId, user_id: currentUser.id },
      ]);

      if (error) {
        throw new Error(`Erreur lors de l'inscription à l'événement : ${error.message}`);
      }
    } catch (error) {
      const err = error as Error; 
      throw new Error(`Erreur interne : ${err.message}`);
    }
  }
}