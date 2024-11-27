// types.ts
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Publicar: undefined;
  VistaBlog: { postId: number }; // Si tienes un 'postId' en VistaBlog
  Publicacion: { postId?: number }; // Aquí se define el 'postId' como opcional para 'Publicacion'
  Blogs: undefined;
};
