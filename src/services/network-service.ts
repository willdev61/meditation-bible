// Service de détection réseau simplifié
// TODO: Installer @react-native-community/netinfo pour une vraie détection
class NetworkService {
  private listeners: Array<(isConnected: boolean) => void> = []
  private _isConnected: boolean = true

  // S'abonner aux changements de connexion
  subscribe(callback: (isConnected: boolean) => void): () => void {
    this.listeners.push(callback)

    // Retourner une fonction de désabonnement
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback)
    }
  }

  // Vérifier la connexion (simplifié - retourne toujours true pour l'instant)
  async isConnected(): Promise<boolean> {
    return this._isConnected
  }

  // Initialiser l'écoute des changements de connexion
  initialize(): void {
    // TODO: Implémenter avec @react-native-community/netinfo
    console.log('Network service initialized (simplified mode)')
  }

  // Méthode pour simuler un changement de connexion (pour tests)
  setConnected(connected: boolean): void {
    this._isConnected = connected
    this.listeners.forEach((callback) => callback(connected))
  }
}

export default new NetworkService()
