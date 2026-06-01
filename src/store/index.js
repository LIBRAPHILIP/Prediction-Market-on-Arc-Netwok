import { create } from 'zustand';

const useAppStore = create((set) => ({
  // UI State
  isSidebarOpen: true,
  isDepositModalOpen: false,
  isWalletModalOpen: false,
  activeTab: 'markets',
  
  // Notification
  notifications: [],
  
  // Actions
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setDepositModalOpen: (open) => set({ isDepositModalOpen: open }),
  setWalletModalOpen: (open) => set({ isWalletModalOpen: open }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { id: Date.now(), ...notification }],
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id),
  })),
}));

export default useAppStore;
