
export const institutionsData = [
  {
    id: 1,
    name: "General Hospital",
    location: "New York, NY",
    dataPoints: 125000,
    status: "active",
    lastSync: "2023-10-15T14:30:25.000Z",
    accuracy: 0.92,
    privacyScore: 0.88
  },
  {
    id: 2,
    name: "University Medical Center",
    location: "Boston, MA",
    dataPoints: 89000,
    status: "active",
    lastSync: "2023-10-15T14:25:18.000Z",
    accuracy: 0.89,
    privacyScore: 0.95
  },
  {
    id: 3,
    name: "Central Health Clinic",
    location: "Chicago, IL",
    dataPoints: 68400,
    status: "inactive",
    lastSync: "2023-10-15T14:15:02.000Z",
    accuracy: 0.78,
    privacyScore: 0.82
  },
  {
    id: 4,
    name: "Pacific Research Institute",
    location: "San Francisco, CA",
    dataPoints: 113700,
    status: "active",
    lastSync: "2023-10-15T14:10:47.000Z",
    accuracy: 0.94,
    privacyScore: 0.91
  },
  {
    id: 5,
    name: "Mountain View Health",
    location: "Denver, CO",
    dataPoints: 54600,
    status: "active",
    lastSync: "2023-10-15T13:45:12.000Z",
    accuracy: 0.85,
    privacyScore: 0.87
  },
  {
    id: 6,
    name: "Atlantic Research Center",
    location: "Miami, FL",
    dataPoints: 76300,
    status: "active",
    lastSync: "2023-10-15T13:30:59.000Z",
    accuracy: 0.88,
    privacyScore: 0.84
  },
  {
    id: 7,
    name: "Riverside Community Hospital",
    location: "Los Angeles, CA",
    dataPoints: 93200,
    status: "active",
    lastSync: "2023-10-15T13:15:35.000Z",
    accuracy: 0.90,
    privacyScore: 0.89
  },
  {
    id: 8,
    name: "Northern Medical Research",
    location: "Seattle, WA",
    dataPoints: 67800,
    status: "inactive",
    lastSync: "2023-10-15T12:45:20.000Z",
    accuracy: 0.81,
    privacyScore: 0.79
  }
];

// For compatibility with existing code
export const institutions = institutionsData;

export const trainingProgress = [
  { epoch: 1, accuracy: 0.68, loss: 0.42, timestamp: "2023-09-01" },
  { epoch: 2, accuracy: 0.72, loss: 0.36, timestamp: "2023-09-02" },
  { epoch: 3, accuracy: 0.75, loss: 0.31, timestamp: "2023-09-03" },
  { epoch: 4, accuracy: 0.79, loss: 0.27, timestamp: "2023-09-04" },
  { epoch: 5, accuracy: 0.82, loss: 0.24, timestamp: "2023-09-05" },
  { epoch: 6, accuracy: 0.84, loss: 0.21, timestamp: "2023-09-06" },
  { epoch: 7, accuracy: 0.86, loss: 0.19, timestamp: "2023-09-07" },
  { epoch: 8, accuracy: 0.88, loss: 0.17, timestamp: "2023-09-08" },
  { epoch: 9, accuracy: 0.89, loss: 0.15, timestamp: "2023-09-09" },
  { epoch: 10, accuracy: 0.91, loss: 0.13, timestamp: "2023-09-10" }
];

export const privacyMetrics = [
  { 
    timestamp: "2023-09-01", 
    differentialPrivacy: 0.82, 
    encryptionLatency: 12, 
    dataLeakageRisk: 0.08,
    homomorphicOperations: 856 
  },
  { 
    timestamp: "2023-09-02", 
    differentialPrivacy: 0.83, 
    encryptionLatency: 11, 
    dataLeakageRisk: 0.07,
    homomorphicOperations: 892 
  },
  { 
    timestamp: "2023-09-03", 
    differentialPrivacy: 0.84, 
    encryptionLatency: 11, 
    dataLeakageRisk: 0.07,
    homomorphicOperations: 921 
  },
  { 
    timestamp: "2023-09-04", 
    differentialPrivacy: 0.85, 
    encryptionLatency: 10, 
    dataLeakageRisk: 0.06,
    homomorphicOperations: 945 
  },
  { 
    timestamp: "2023-09-05", 
    differentialPrivacy: 0.86, 
    encryptionLatency: 10, 
    dataLeakageRisk: 0.06,
    homomorphicOperations: 978 
  },
  { 
    timestamp: "2023-09-06", 
    differentialPrivacy: 0.87, 
    encryptionLatency: 9, 
    dataLeakageRisk: 0.05,
    homomorphicOperations: 1023 
  },
  { 
    timestamp: "2023-09-07", 
    differentialPrivacy: 0.88, 
    encryptionLatency: 9, 
    dataLeakageRisk: 0.05,
    homomorphicOperations: 1056 
  }
];

export const modelComparison = [
  {
    model: "Centralized",
    accuracy: 0.88,
    privacy: 0.62,
    computation: 1.0,
    communication: 1.0
  },
  {
    model: "Federated",
    accuracy: 0.91,
    privacy: 0.87,
    computation: 0.75,
    communication: 0.68
  },
  {
    model: "Differential Privacy",
    accuracy: 0.85,
    privacy: 0.92,
    computation: 0.82,
    communication: 0.71
  },
  {
    model: "Homomorphic",
    accuracy: 0.82,
    privacy: 0.95,
    computation: 0.45,
    communication: 0.65
  }
];

export const diagnosticMetrics = [
  { name: "Lung Cancer", auc: 0.91, accuracy: 0.89, recall: 0.86, precision: 0.92 },
  { name: "Pneumonia", auc: 0.94, accuracy: 0.92, recall: 0.91, precision: 0.93 },
  { name: "Tuberculosis", auc: 0.88, accuracy: 0.87, recall: 0.82, precision: 0.89 },
  { name: "COVID-19", auc: 0.93, accuracy: 0.91, recall: 0.90, precision: 0.92 },
  { name: "Pleural Effusion", auc: 0.89, accuracy: 0.88, recall: 0.85, precision: 0.90 }
];

export const dataDistribution = [
  { category: "X-Ray", count: 45600 },
  { category: "CT Scan", count: 28700 },
  { category: "MRI", count: 18900 },
  { category: "Ultrasound", count: 12500 },
  { category: "Lab Results", count: 56300 }
];

export const networkData = {
  nodes: [
    { id: "central", name: "Central Server", type: "server", connections: 8, dataProcessed: 350000 },
    { id: "hospital1", name: "General Hospital", type: "institution", connections: 3, dataProcessed: 125000 },
    { id: "hospital2", name: "University Medical", type: "institution", connections: 2, dataProcessed: 89000 },
    { id: "hospital3", name: "Central Health", type: "institution", connections: 1, dataProcessed: 68400 },
    { id: "hospital4", name: "Pacific Research", type: "institution", connections: 3, dataProcessed: 113700 },
    { id: "hospital5", name: "Mountain View", type: "institution", connections: 2, dataProcessed: 54600 },
    { id: "hospital6", name: "Atlantic Research", type: "institution", connections: 2, dataProcessed: 76300 },
    { id: "hospital7", name: "Riverside Community", type: "institution", connections: 2, dataProcessed: 93200 },
    { id: "hospital8", name: "Northern Medical", type: "institution", connections: 1, dataProcessed: 67800 }
  ],
  links: [
    { source: "central", target: "hospital1", strength: 0.9, dataFlow: 8900 },
    { source: "central", target: "hospital2", strength: 0.85, dataFlow: 7600 },
    { source: "central", target: "hospital3", strength: 0.7, dataFlow: 5100 },
    { source: "central", target: "hospital4", strength: 0.88, dataFlow: 8500 },
    { source: "central", target: "hospital5", strength: 0.75, dataFlow: 6200 },
    { source: "central", target: "hospital6", strength: 0.8, dataFlow: 7100 },
    { source: "central", target: "hospital7", strength: 0.82, dataFlow: 7400 },
    { source: "central", target: "hospital8", strength: 0.65, dataFlow: 4800 },
    { source: "hospital1", target: "hospital2", strength: 0.6, dataFlow: 3200 },
    { source: "hospital1", target: "hospital4", strength: 0.7, dataFlow: 4100 },
    { source: "hospital2", target: "hospital7", strength: 0.55, dataFlow: 2800 },
    { source: "hospital4", target: "hospital6", strength: 0.65, dataFlow: 3500 },
    { source: "hospital5", target: "hospital6", strength: 0.5, dataFlow: 2200 },
    { source: "hospital7", target: "hospital5", strength: 0.45, dataFlow: 1900 }
  ]
};

export const systemHealth = [
  { timestamp: "2023-10-15 09:00", cpuUsage: 42, memoryUsage: 38, networkLatency: 12 },
  { timestamp: "2023-10-15 10:00", cpuUsage: 45, memoryUsage: 40, networkLatency: 14 },
  { timestamp: "2023-10-15 11:00", cpuUsage: 48, memoryUsage: 42, networkLatency: 15 },
  { timestamp: "2023-10-15 12:00", cpuUsage: 52, memoryUsage: 45, networkLatency: 18 },
  { timestamp: "2023-10-15 13:00", cpuUsage: 47, memoryUsage: 43, networkLatency: 16 },
  { timestamp: "2023-10-15 14:00", cpuUsage: 41, memoryUsage: 39, networkLatency: 13 },
  { timestamp: "2023-10-15 15:00", cpuUsage: 38, memoryUsage: 36, networkLatency: 11 }
];

export const networkMetricsData = {
  bandwidthUsage: [
    { time: "00:00", value: 32 },
    { time: "04:00", value: 28 },
    { time: "08:00", value: 65 },
    { time: "12:00", value: 89 },
    { time: "16:00", value: 75 },
    { time: "20:00", value: 55 },
    { time: "23:59", value: 40 }
  ],
  packetLoss: [
    { time: "00:00", value: 0.2 },
    { time: "04:00", value: 0.1 },
    { time: "08:00", value: 0.5 },
    { time: "12:00", value: 0.8 },
    { time: "16:00", value: 0.6 },
    { time: "20:00", value: 0.4 },
    { time: "23:59", value: 0.3 }
  ],
  latency: [
    { time: "00:00", value: 12 },
    { time: "04:00", value: 10 },
    { time: "08:00", value: 18 },
    { time: "12:00", value: 24 },
    { time: "16:00", value: 20 },
    { time: "20:00", value: 16 },
    { time: "23:59", value: 14 }
  ],
  securityEvents: [
    { category: "Authentication", count: 12 },
    { category: "Data Access", count: 8 },
    { category: "Encryption", count: 3 },
    { category: "Network", count: 5 }
  ]
};
