import React from 'react';

/**
 * ViolationLogger - Komponen untuk menampilkan log pelanggaran secara real-time
 */
export default function ViolationLogger({ logs = [], maxDisplay = 10 }) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500 italic">Belum ada pelanggaran tercatat</p>
      </div>
    );
  }

  const recentLogs = logs.slice(-maxDisplay).reverse();

  const getLevelColor = (level) => {
    switch (level) {
      case 'RINGAN':
        return 'text-yellow-600 bg-yellow-50';
      case 'SEDANG':
        return 'text-orange-600 bg-orange-50';
      case 'BERAT':
        return 'text-red-600 bg-red-50';
      case 'ADMIN_FLAG':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'RINGAN':
        return '⚠️';
      case 'SEDANG':
        return '⚠️';
      case 'BERAT':
        return '🚨';
      case 'ADMIN_FLAG':
        return '🚩';
      default:
        return '•';
    }
  };

  return (
    <div>
      <div className="space-y-3">
        {recentLogs.map((log, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg text-sm border-l-4 ${getLevelColor(log.level)} shadow-sm hover:shadow-md transition`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getLevelIcon(log.level)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm px-2 py-1 rounded" style={{
                    backgroundColor: log.level === 'BERAT' ? '#fee2e2' : 
                                    log.level === 'SEDANG' ? '#fed7aa' : '#fef3c7',
                    color: log.level === 'BERAT' ? '#991b1b' : 
                           log.level === 'SEDANG' ? '#9a3412' : '#92400e'
                  }}>
                    {log.level}
                  </span>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {new Date(log.ts).toLocaleTimeString('id-ID', { 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    })}
                  </span>
                </div>
                <div className="text-gray-800 font-medium mb-1">{log.reason}</div>
                {log.duration && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">
                    <span>⏱️</span>
                    <span>Durasi: {Math.round(log.duration)}ms</span>
                  </div>
                )}
                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    {log.metadata.key && <span className="mr-2">Key: {log.metadata.key}</span>}
                    {log.metadata.ctrlKey && <span className="mr-2">Ctrl: ✓</span>}
                    {log.metadata.shiftKey && <span className="mr-2">Shift: ✓</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {logs.length > maxDisplay && (
        <div className="mt-4 pt-3 border-t text-xs text-gray-500 text-center bg-yellow-50 p-2 rounded">
          ⚠️ Menampilkan {Math.min(maxDisplay, logs.length)} dari {logs.length} log terakhir
        </div>
      )}
    </div>
  );
}
