import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/useWallet"

export function WalletConnect() {
  const { address, isConnected, connect, disconnect } = useWallet()

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <Button variant="outline" onClick={() => disconnect()}>
            Desconectar
          </Button>
        </div>
      ) : (
        <Button onClick={() => connect()}>
          Conectar Wallet
        </Button>
      )}
    </div>
  )
} 