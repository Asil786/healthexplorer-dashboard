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
  { epoch: 1, accuracy: 0.68, loss: 0.42, privacyBudget: 0.8, timestamp: "2023-09-01" },
  { epoch: 2, accuracy: 0.72, loss: 0.36, privacyBudget: 0.7, timestamp: "2023-09-02" },
  { epoch: 3, accuracy: 0.75, loss: 0.31, privacyBudget: 0.65, timestamp: "2023-09-03" },
  { epoch: 4, accuracy: 0.79, loss: 0.27, privacyBudget: 0.6, timestamp: "2023-09-04" },
  { epoch: 5, accuracy: 0.82, loss: 0.24, privacyBudget: 0.55, timestamp: "2023-09-05" },
  { epoch: 6, accuracy: 0.84, loss: 0.21, privacyBudget: 0.5, timestamp: "2023-09-06" },
  { epoch: 7, accuracy: 0.86, loss: 0.19, privacyBudget: 0.45, timestamp: "2023-09-07" },
  { epoch: 8, accuracy: 0.88, loss: 0.17, privacyBudget: 0.4, timestamp: "2023-09-08" },
  { epoch: 9, accuracy: 0.89, loss: 0.15, privacyBudget: 0.35, timestamp: "2023-09-09" },
  { epoch: 10, accuracy: 0.91, loss: 0.13, privacyBudget: 0.3, timestamp: "2023-09-10" }
];

export const privacyMetrics = [
  { 
    date: "2023-09-01",
    differentialPrivacy: 0.82,
    informationLeakage: 0.18,
    modelConfusion: 0.75,
    membershipInference: 0.15
  },
  { 
    date: "2023-09-02",
    differentialPrivacy: 0.83,
    informationLeakage: 0.17,
    modelConfusion: 0.77,
    membershipInference: 0.14
  },
  { 
    date: "2023-09-03",
    differentialPrivacy: 0.84,
    informationLeakage: 0.16,
    modelConfusion: 0.78,
    membershipInference: 0.13
  },
  { 
    date: "2023-09-04",
    differentialPrivacy: 0.85,
    informationLeakage: 0.15,
    modelConfusion: 0.80,
    membershipInference: 0.12
  },
  { 
    date: "2023-09-05",
    differentialPrivacy: 0.86,
    informationLeakage: 0.14,
    modelConfusion: 0.82,
    membershipInference: 0.11
  },
  { 
    date: "2023-09-06",
    differentialPrivacy: 0.87,
    informationLeakage: 0.13,
    modelConfusion: 0.83,
    membershipInference: 0.10
  },
  { 
    date: "2023-09-07",
    differentialPrivacy: 0.88,
    informationLeakage: 0.12,
    modelConfusion: 0.85,
    membershipInference: 0.09
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
  { name: "Lung Cancer", accuracy: 0.89, precision: 0.92, recall: 0.86, specificity: 0.93 },
  { name: "Pneumonia", accuracy: 0.92, precision: 0.93, recall: 0.91, specificity: 0.94 },
  { name: "Tuberculosis", accuracy: 0.87, precision: 0.89, recall: 0.82, specificity: 0.90 },
  { name: "COVID-19", accuracy: 0.91, precision: 0.92, recall: 0.90, specificity: 0.93 },
  { name: "Pleural Effusion", accuracy: 0.88, precision: 0.90, recall: 0.85, specificity: 0.91 }
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
    { id: 1, name: "Central Server", type: "server", connections: 8, dataProcessed: 350000 },
    { id: 2, name: "General Hospital", type: "institution", connections: 3, dataProcessed: 125000 },
    { id: 3, name: "University Medical", type: "institution", connections: 2, dataProcessed: 89000 },
    { id: 4, name: "Central Health", type: "institution", connections: 1, dataProcessed: 68400 },
    { id: 5, name: "Pacific Research", type: "institution", connections: 3, dataProcessed: 113700 },
    { id: 6, name: "Mountain View", type: "institution", connections: 2, dataProcessed: 54600 },
    { id: 7, name: "Atlantic Research", type: "institution", connections: 2, dataProcessed: 76300 },
    { id: 8, name: "Riverside Community", type: "institution", connections: 2, dataProcessed: 93200 }
  ],
  links: [
    { source: 1, target: 2, strength: 0.9, dataFlow: 8900 },
    { source: 1, target: 3, strength: 0.85, dataFlow: 7600 },
    { source: 1, target: 4, strength: 0.7, dataFlow: 5100 },
    { source: 1, target: 5, strength: 0.88, dataFlow: 8500 },
    { source: 1, target: 6, strength: 0.75, dataFlow: 6200 },
    { source: 1, target: 7, strength: 0.8, dataFlow: 7100 },
    { source: 1, target: 8, strength: 0.82, dataFlow: 7400 }
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
  packetLoss: [
    { timestamp: "00:00", value: 0.2 },
    { timestamp: "04:00", value: 0.1 },
    { timestamp: "08:00", value: 0.5 },
    { timestamp: "12:00", value: 0.8 },
    { timestamp: "16:00", value: 0.6 },
    { timestamp: "20:00", value: 0.4 },
    { timestamp: "23:59", value: 0.3 }
  ],
  latency: [
    { timestamp: "00:00", value: 12 },
    { timestamp: "04:00", value: 10 },
    { timestamp: "08:00", value: 18 },
    { timestamp: "12:00", value: 24 },
    { timestamp: "16:00", value: 20 },
    { timestamp: "20:00", value: 16 },
    { timestamp: "23:59", value: 14 }
  ],
  bandwidth: [
    { timestamp: "00:00", value: 32 },
    { timestamp: "04:00", value: 28 },
    { timestamp: "08:00", value: 65 },
    { timestamp: "12:00", value: 89 },
    { timestamp: "16:00", value: 75 },
    { timestamp: "20:00", value: 55 },
    { timestamp: "23:59", value: 40 }
  ],
  messageCount: [
    { category: "Authentication", count: 12 },
    { category: "Data Access", count: 8 },
    { category: "Encryption", count: 3 },
    { category: "Network", count: 5 }
  ]
};
