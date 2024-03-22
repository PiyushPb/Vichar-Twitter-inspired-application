import React, { useState, useContext, createContext } from "react";

const CreatePostModelContext = createContext();

export const CreatePostModelProvider = ({ children }) => {
  const [showCreatePostModel, setShowCreatePostModel] = useState(false);

  const openCreatePostModel = () => {
    setShowCreatePostModel(true);
  };

  const closeCreatePostModel = () => {
    setShowCreatePostModel(false);
  };

  return (
    <CreatePostModelContext.Provider
      value={{ showCreatePostModel, openCreatePostModel, closeCreatePostModel }}
    >
      {children}
    </CreatePostModelContext.Provider>
  );
};

export const useCreatePostModel = () => {
  const context = useContext(CreatePostModelContext);
  if (!context) {
    throw new Error(
      "useCreatePostModel must be used within a CreatePostModelProvider"
    );
  }
  return context;
};
