import dayjs from "dayjs";
import type { UserActivity } from "./dashboard";

export type ErrorServer = {
  message: string;
};

export class DateRange {
  public start: Date;
  public end: Date;

  constructor(
    value: number,
    unit?: dayjs.ManipulateType | undefined,
    end: Date = new Date(),
    start?: Date
  ) {
    this.end = end;
    this.start = start ?? dayjs(this.end).subtract(value, unit).toDate();
  }

  public static fromDates(start: Date, end: Date = new Date()): DateRange {
    return new DateRange(0, 'day', end, start);
  }

  public get formattedStart(): string {
    const options: Intl.DateTimeFormatOptions = new Date().getFullYear() == this.start.getFullYear()
      ? { day: "numeric", month: "short" }
      : { day: "numeric", month: "short", year: "numeric" };

    return this.start.toLocaleDateString('fr-FR', options);
  }

  public get formattedEnd(): string {
    const options: Intl.DateTimeFormatOptions = new Date().getFullYear() == this.end.getFullYear()
      ? { day: "numeric", month: "short" }
      : { day: "numeric", month: "short", year: "numeric" };

    return this.end.toLocaleDateString('fr-FR', options);
  }
}


export type BpmActivity = {
  day: "Lun" | "Mar" | "Mer" | "Jeu" | "Ven" | "Sam" | "Dim";
  min: number;
  max: number;
  avg: number;
}

const DAYS_OF_WEEK = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] as const;

/**
 * Convertit une liste de UserActivity en liste de BpmActivity
 * pour une semaine complète (Lun → Dim).
 * Les jours sans activité sont complétés avec des valeurs à 0.
 *
 * @param activities - Liste des activités utilisateur
 */
export function toBpmActivities(activities: UserActivity[]): BpmActivity[] {
  // Grouper les activités par jour de la semaine (0=Lun, 6=Dim)
  const activityByDay = new Map<number, UserActivity[]>();

  for (const activity of activities) {
    const activityDate = new Date(activity.date);
    const dayOfWeek = activityDate.getDay();
    // Convertir : getDay() → 0=Dim, 1=Lun... → on veut 0=Lun, 6=Dim
    const index = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    if (!activityByDay.has(index)) {
      activityByDay.set(index, []);
    }
    activityByDay.get(index)!.push(activity);
  }

  // Générer les 7 jours de la semaine
  return DAYS_OF_WEEK.map((day, index) => {
    const dayActivities = activityByDay.get(index);

    if (!dayActivities || dayActivities.length === 0) {
      return { day, min: 0, max: 0, avg: 0 };
    }

    const min = Math.min(...dayActivities.map((a) => a.heartRate.min));
    const max = Math.max(...dayActivities.map((a) => a.heartRate.max));
    const avg = Math.round(
      dayActivities.reduce((sum, a) => sum + a.heartRate.average, 0) / dayActivities.length
    );

    return { day, min, max, avg };
  });
}

export type KmActivity = {
  week: string;
  km: number;
};

/**
 * Convertit une liste de UserActivity en liste de KmActivity
 * groupées par semaine sur un mois.
 * Les semaines sans activité sont complétées avec km = 0.
 *
 * @param activities - Liste des activités utilisateur
 * @param monthStart - Date de début du mois
 */
export function toKmActivities(activities: UserActivity[], start: Date): KmActivity[] {
  const result: KmActivity[] = [];

  // Parse une date string "YYYY-MM-DD" en date locale (sans décalage UTC)
  const parseLocalDate = (dateStr: string | Date): Date => {
    if (typeof dateStr === "string") {
      const [y, m, d] = dateStr.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date(dateStr);
  };

  // 4 semaines à partir de start
  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(start);
    weekStart.setDate(start.getDate() + i * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const weekActivities = activities.filter((a) => {
      const d = parseLocalDate(a.date as unknown as string);
      return d >= weekStart && d <= weekEnd;
    });

    const totalKm = weekActivities.reduce((sum, a) => sum + a.distance, 0);

    result.push({
      week: `S${i + 1}`,
      km: Math.round(totalKm * 10) / 10,
    });
  }

  return result;
}