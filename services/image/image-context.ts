import React from 'react';

export type ImageContextType = {
  imageUri: string | null;
  open: () => void;
  reset: () => void;
  saveImage: (uri: string) => Promise<string | null>;
};

export const ImageContext = React.createContext<ImageContextType>({
  imageUri: null,
  open: () => {},
  reset: () => {},
  saveImage: async () => null,
});
