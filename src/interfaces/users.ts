export interface UserState {
  userData: {
    uid: string;
    // email?: string;
    // fullName?: string;
  } | null;
      isLoading: boolean;
    displayedName: string | null;

}