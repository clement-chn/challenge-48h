import { supabase } from '../api/supabaseClient';

export class GlobalService {
  /**
   * Récupérer toutes les données d'une table donnée
   * @param tableName Nom de la table
   * @returns Tableau d'objets contenant les colonnes `id` et `name`
   */
  static async getAllFromTable(tableName: string): Promise<{ id: number; name: string }[]> {
    try {
      const { data, error } = await supabase.from(tableName).select('*');

      if (error) {
        throw new Error(`Erreur lors de la récupération des données de la table ${tableName} : ${error.message}`);
      }

      return data as { id: number; name: string }[];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erreur interne : ${error.message}`);
      } else {
        throw new Error('Erreur interne inconnue.');
      }
    }
  }
}