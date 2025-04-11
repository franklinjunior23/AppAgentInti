import React from 'react'
import { useDataSystem } from '@/store/Use-data-system'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StateUsage() {
  const { cpu, ram, disks } = useDataSystem()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-1">Administrador de tareas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-10">
          {/* 🔹 CPU USAGE */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">CPU</h3>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div
                className="absolute w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(#4CAF50 ${cpu * 3.6}deg, #2D3748 0deg)`
                }}
              />
              <div className="absolute w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">{Math.floor(cpu)}%</span>
              </div>
            </div>
          </div>

          {/* 🔹 RAM USAGE */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">RAM</h3>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div
                className="absolute w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(#FF5722 ${ram * 3.6}deg, #2D3748 0deg)`
                }}
              />
              <div className="absolute w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">{Math.floor(ram)}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">💾 Almacenamiento</h2>
          <div className="flex flex-col gap-2">
            {disks.map((disk, index) => {
              const freeSpace = (parseFloat(disk.total) * (100 - parseFloat(disk.used))) / 100
              return (
                <div key={disk.mount} className=" p-4 rounded-lg shadow-lg border  dark:text-white text-black">
                  <div className="flex justify-between  font-medium">
                    <span >📂 {disk.mount}</span>
                    <span >{disk.total} GB</span>
                  </div>
                  <div className="w-full h-3 bg-gray-600 rounded-full mt-2 relative">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${disk.used}%` }}
                    />
                  </div>
                  <span className=" text-sm mt-1 block">
                    {freeSpace.toFixed(1)} GB disponibles de {disk.total} GB
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
