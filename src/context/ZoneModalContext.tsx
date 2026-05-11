import React, { createContext, useContext, useState } from 'react';

type SelectedZone = {
  key: string;
  title: string;
} | null;

type ZoneModalContextType = {
  modalVisible: boolean;
  selectedZone: SelectedZone;
  mode: 'add' | 'edit';

  openAddModal: () => void;
  openEditModal: (zone: NonNullable<SelectedZone>) => void;
  closeModal: () => void;
};

const ZoneModalContext = createContext<ZoneModalContextType | null>(null);

export const ZoneModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedZone, setSelectedZone] = useState<SelectedZone>(null);

  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const openAddModal = () => {
    setMode('add');
    setSelectedZone(null);
    setModalVisible(true);
  };

  const openEditModal = (zone: NonNullable<SelectedZone>) => {
    setMode('edit');
    setSelectedZone(zone);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedZone(null);
    setMode('add');
  };

  return (
    <ZoneModalContext.Provider
      value={{
        modalVisible,
        selectedZone,
        mode,
        openAddModal,
        openEditModal,
        closeModal,
      }}
    >
      {children}
    </ZoneModalContext.Provider>
  );
};

export const useZoneModalContext = () => {
  const context = useContext(ZoneModalContext);

  if (!context) {
    throw new Error('useZoneModalContext must be used inside provider');
  }

  return context;
};
