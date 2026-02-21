export type HeartRate = {
  min: number;
  max: number;
  average: number;
};

export type UserActivity = {
  date: Date;
  distance: number;
  duration: number;
  heartRate: HeartRate;
  caloriesBurned: number;
};

export type Statistics = {
  totalDistance: string;
  totalSessions: number;
  totalDuration: number;
  totalcaloriesBurned: number;
  totalDayOff: number;
};

export type ProfileInfo = {
  firstName: string;
  lastName: string;
  createdAt: Date;
  age: number;
  weight: number;
  height: number;
  profilePicture: string;
  gender: "female" | "male";
};

export type UserInfo = {
  profile: ProfileInfo;
  statistics: Statistics;
};
