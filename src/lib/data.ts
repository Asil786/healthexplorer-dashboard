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
    { source: 1, target: 2, strength: 0.9, dataFlow: 8900, value: 8900 },
    { source: 1, target: 3, strength: 0.85, dataFlow: 7600, value: 7600 },
    { source: 1, target: 4, strength: 0.7, dataFlow: 5100, value: 5100 },
    { source: 1, target: 5, strength: 0.88, dataFlow: 8500, value: 8500 },
    { source: 1, target: 6, strength: 0.75, dataFlow: 6200, value: 6200 },
    { source: 1, target: 7, strength: 0.8, dataFlow: 7100, value: 7100 },
    { source: 1, target: 8, strength: 0.82, dataFlow: 7400, value: 7400 }
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

export const modelTrainingHistory = [
  { date: "2023-09-01", accuracy: 0.75, loss: 0.35, privacyScore: 0.82 },
  { date: "2023-09-08", accuracy: 0.79, loss: 0.30, privacyScore: 0.84 },
  { date: "2023-09-15", accuracy: 0.83, loss: 0.25, privacyScore: 0.85 },
  { date: "2023-09-22", accuracy: 0.86, loss: 0.22, privacyScore: 0.87 },
  { date: "2023-09-29", accuracy: 0.89, loss: 0.19, privacyScore: 0.88 },
  { date: "2023-10-06", accuracy: 0.91, loss: 0.17, privacyScore: 0.90 },
  { date: "2023-10-13", accuracy: 0.92, loss: 0.15, privacyScore: 0.91 }
];

export const modelsData = [
  {
    id: 1,
    name: "Pneumonia Detection",
    version: "v2.3.1",
    type: "CNN",
    accuracy: 0.92,
    lastTrained: "2023-10-13",
    status: "deployed",
    institutions: 6,
    privacy: 0.91
  },
  {
    id: 2,
    name: "Diabetes Prediction",
    version: "v1.5.2",
    type: "Random Forest",
    accuracy: 0.88,
    lastTrained: "2023-10-10",
    status: "deployed",
    institutions: 8,
    privacy: 0.86
  },
  {
    id: 3,
    name: "Heart Disease Risk",
    version: "v1.2.0",
    type: "Gradient Boosting",
    accuracy: 0.85,
    lastTrained: "2023-10-05",
    status: "training",
    institutions: 5,
    privacy: 0.89
  },
  {
    id: 4,
    name: "Brain Tumor Segmentation",
    version: "v0.9.1",
    type: "U-Net",
    accuracy: 0.83,
    lastTrained: "2023-09-28",
    status: "testing",
    institutions: 4,
    privacy: 0.92
  },
  {
    id: 5,
    name: "Skin Lesion Classifier",
    version: "v1.1.0",
    type: "EfficientNet",
    accuracy: 0.90,
    lastTrained: "2023-10-01",
    status: "deployed",
    institutions: 7,
    privacy: 0.88
  }
];

export const analyticsData = {
  performanceMetrics: [
    { date: "2023-09-15", accuracy: 0.82, precision: 0.84, recall: 0.80, f1Score: 0.82 },
    { date: "2023-09-22", accuracy: 0.84, precision: 0.86, recall: 0.82, f1Score: 0.84 },
    { date: "2023-09-29", accuracy: 0.86, precision: 0.88, recall: 0.84, f1Score: 0.86 },
    { date: "2023-10-06", accuracy: 0.88, precision: 0.89, recall: 0.87, f1Score: 0.88 },
    { date: "2023-10-13", accuracy: 0.91, precision: 0.92, recall: 0.90, f1Score: 0.91 }
  ],
  computationalResources: [
    { date: "2023-09-15", gpuHours: 124, cpuHours: 246, memory: 58 },
    { date: "2023-09-22", gpuHours: 138, cpuHours: 264, memory: 62 },
    { date: "2023-09-29", gpuHours: 156, cpuHours: 285, memory: 67 },
    { date: "2023-10-06", gpuHours: 172, cpuHours: 312, memory: 71 },
    { date: "2023-10-13", gpuHours: 185, cpuHours: 334, memory: 76 }
  ],
  userActivity: [
    { role: "Researchers", count: 42, activeUsers: 38, avgSessionTime: 68 },
    { role: "Clinicians", count: 156, activeUsers: 124, avgSessionTime: 32 },
    { role: "Data Scientists", count: 28, activeUsers: 26, avgSessionTime: 85 },
    { role: "Administrators", count: 14, activeUsers: 12, avgSessionTime: 45 }
  ],
  institutionContributions: [
    { name: "General Hospital", dataPoints: 125000, models: 4, accuracy: 0.92 },
    { name: "University Medical", dataPoints: 89000, models: 3, accuracy: 0.89 },
    { name: "Pacific Research", dataPoints: 113700, models: 5, accuracy: 0.94 },
    { name: "Riverside Community", dataPoints: 93200, models: 3, accuracy: 0.90 },
    { name: "Mountain View", dataPoints: 54600, models: 2, accuracy: 0.85 }
  ]
};

export const privacyData = {
  privacyScores: [
    { date: "2023-08-15", score: 0.78, threshold: 0.75 },
    { date: "2023-08-22", score: 0.79, threshold: 0.75 },
    { date: "2023-08-29", score: 0.82, threshold: 0.75 },
    { date: "2023-09-05", score: 0.84, threshold: 0.80 },
    { date: "2023-09-12", score: 0.85, threshold: 0.80 },
    { date: "2023-09-19", score: 0.87, threshold: 0.80 },
    { date: "2023-09-26", score: 0.89, threshold: 0.85 },
    { date: "2023-10-03", score: 0.90, threshold: 0.85 },
    { date: "2023-10-10", score: 0.91, threshold: 0.85 }
  ],
  privacyAudits: [
    { date: "2023-10-10", status: "passed", issues: 0, score: 0.91, auditor: "PrivacyShield Inc." },
    { date: "2023-09-10", status: "passed", issues: 1, score: 0.87, auditor: "PrivacyShield Inc." },
    { date: "2023-08-10", status: "warning", issues: 3, score: 0.81, auditor: "PrivacyShield Inc." },
    { date: "2023-07-10", status: "warning", issues: 5, score: 0.76, auditor: "PrivacyShield Inc." },
    { date: "2023-06-10", status: "failed", issues: 8, score: 0.72, auditor: "PrivacyShield Inc." }
  ],
  epsilonValues: [
    { model: "Pneumonia Detection", epsilon: 0.5, date: "2023-10-13" },
    { model: "Diabetes Prediction", epsilon: 0.8, date: "2023-10-10" },
    { model: "Heart Disease Risk", epsilon: 0.6, date: "2023-10-05" },
    { model: "Brain Tumor Segmentation", epsilon: 0.4, date: "2023-09-28" },
    { model: "Skin Lesion Classifier", epsilon: 0.7, date: "2023-10-01" }
  ],
  complianceStatus: [
    { regulation: "HIPAA", status: "compliant", lastVerified: "2023-10-05", score: 0.94 },
    { regulation: "GDPR", status: "compliant", lastVerified: "2023-10-05", score: 0.92 },
    { regulation: "CCPA", status: "compliant", lastVerified: "2023-10-05", score: 0.95 },
    { regulation: "PIPEDA", status: "monitoring", lastVerified: "2023-09-22", score: 0.88 },
    { regulation: "HITECH", status: "compliant", lastVerified: "2023-10-05", score: 0.93 }
  ]
};

export const infrastructureData = {
  serverStatus: [
    { name: "Primary Federation Server", status: "operational", uptime: "99.98%", load: 42, region: "US-East" },
    { name: "Backup Federation Server", status: "standby", uptime: "99.99%", load: 5, region: "US-West" },
    { name: "European Data Center", status: "operational", uptime: "99.95%", load: 38, region: "EU-Central" },
    { name: "Asian Data Center", status: "operational", uptime: "99.92%", load: 36, region: "APAC-East" },
    { name: "Research Compute Cluster", status: "maintenance", uptime: "98.74%", load: 0, region: "US-Central" }
  ],
  resourceUtilization: [
    { timestamp: "2023-10-15 09:00", cpu: 42, memory: 38, storage: 56, network: 32 },
    { timestamp: "2023-10-15 10:00", cpu: 45, memory: 41, storage: 56, network: 38 },
    { timestamp: "2023-10-15 11:00", cpu: 51, memory: 46, storage: 57, network: 45 },
    { timestamp: "2023-10-15 12:00", cpu: 62, memory: 52, storage: 57, network: 58 },
    { timestamp: "2023-10-15 13:00", cpu: 58, memory: 49, storage: 58, network: 52 },
    { timestamp: "2023-10-15 14:00", cpu: 47, memory: 44, storage: 58, network: 41 },
    { timestamp: "2023-10-15 15:00", cpu: 38, memory: 36, storage: 58, network: 34 }
  ],
  storageUsage: [
    { category: "Model Weights", size: 1250, growth: 3.2 },
    { category: "Training Data", size: 4500, growth: 5.8 },
    { category: "Validation Data", size: 850, growth: 2.1 },
    { category: "System Logs", size: 320, growth: 6.4 },
    { category: "Backup Archives", size: 2800, growth: 1.9 }
  ],
  securityEvents: [
    { date: "2023-10-14", type: "Authentication", severity: "low", count: 3, status: "resolved" },
    { date: "2023-10-12", type: "Access Control", severity: "medium", count: 1, status: "resolved" },
    { date: "2023-10-08", type: "Data Transfer", severity: "low", count: 2, status: "resolved" },
    { date: "2023-10-01", type: "System Update", severity: "info", count: 4, status: "completed" },
    { date: "2023-09-28", type: "Network Latency", severity: "medium", count: 1, status: "resolved" }
  ]
};
