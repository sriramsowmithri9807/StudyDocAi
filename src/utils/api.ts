import { toast } from "@/components/ui/sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Types
export interface UserData {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  institution: string;
  fieldOfStudy: string;
  studentId?: string;
  token?: string;
}

export interface Schedule {
  title: string;
  tasks: {
    name: string;
    completed: boolean;
    duration: number;
    priority: string;
  }[];
  createdAt?: Date;
}

export interface StudyRoom {
  name: string;
  subject: string;
  environment: string;
  duration: number;
  createdAt?: Date;
}

export interface MusicPreferences {
  volume: number;
  genre: string;
  autoplay: boolean;
}

// User API
export const registerUser = async (userData: UserData): Promise<UserData | null> => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Registration failed");
      return null;
    }

    // Save user to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Register error:", error);
    toast.error("An error occurred during registration");
    return null;
  }
};

export const loginUser = async (email: string, password: string): Promise<UserData | null> => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Login failed");
      return null;
    }

    // Save user to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Login error:", error);
    toast.error("An error occurred during login");
    return null;
  }
};

export const getUserProfile = async (): Promise<any | null> => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    
    if (!userInfo.token) {
      return null;
    }

    const response = await fetch(`${API_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Failed to get profile");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Get profile error:", error);
    toast.error("An error occurred while getting profile");
    return null;
  }
};

export const updateUserProfile = async (userData: Partial<UserData>): Promise<UserData | null> => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    
    if (!userInfo.token) {
      toast.error("You must be logged in");
      return null;
    }

    const response = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Failed to update profile");
      return null;
    }

    // Update localStorage with new user data
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Update profile error:", error);
    toast.error("An error occurred while updating profile");
    return null;
  }
};

// Schedules API
export const saveUserSchedules = async (schedules: Schedule[]): Promise<Schedule[] | null> => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    
    if (!userInfo.token) {
      toast.error("You must be logged in");
      return null;
    }

    const response = await fetch(`${API_URL}/users/schedules`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schedules }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Failed to save schedules");
      return null;
    }

    return data.schedules;
  } catch (error) {
    console.error("Save schedules error:", error);
    toast.error("An error occurred while saving schedules");
    return null;
  }
};

// Study Rooms API
export const saveUserStudyRooms = async (studyRooms: StudyRoom[]): Promise<StudyRoom[] | null> => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    
    if (!userInfo.token) {
      toast.error("You must be logged in");
      return null;
    }

    const response = await fetch(`${API_URL}/users/study-rooms`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studyRooms }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Failed to save study rooms");
      return null;
    }

    return data.studyRooms;
  } catch (error) {
    console.error("Save study rooms error:", error);
    toast.error("An error occurred while saving study rooms");
    return null;
  }
};

// Music Preferences API
export const saveUserMusicPreferences = async (musicPreferences: MusicPreferences): Promise<MusicPreferences | null> => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    
    if (!userInfo.token) {
      toast.error("You must be logged in");
      return null;
    }

    const response = await fetch(`${API_URL}/users/music-preferences`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicPreferences }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Failed to save music preferences");
      return null;
    }

    return data.musicPreferences;
  } catch (error) {
    console.error("Save music preferences error:", error);
    toast.error("An error occurred while saving music preferences");
    return null;
  }
};

// Logout function
export const logoutUser = (): void => {
  localStorage.removeItem("userInfo");
}; 