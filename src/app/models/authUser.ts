export interface FirebaseUser {
  uid: string;
  photoURL: string;
  displayName: string;
  email: string;
  [key: string]: any;
}
